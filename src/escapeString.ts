export default function escapeString(str: string | unknown) {
	if (typeof str !== "string") return str;
	// At some point JSON.stringify is faster.
	// 64 works well here for now.
	if (str.length > 64) return JSON.stringify(str);

	let escaped = "";

	// Append possibly many characters at once by tracking the index of the last character added.
	let last = 0;
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		if (char === 34 || char === 92) {
			escaped += str.slice(last, i) + "\\";
			last = i + 1;
		}
		// https://github.com/tc39/proposal-well-formed-stringify
		else if (char >= 0xd800 && char <= 0xdfff) {
			escaped += str.slice(last, i) + "\\u" + char.toString(16);
			last = i + 1;
		}
	}

	// Return early without iterating over the rest of the string if no characters were escaped.
	if (escaped.length === 0) return '"' + str + '"';

	return '"' + escaped + str.slice(last) + '"';
}

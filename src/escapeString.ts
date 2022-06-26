const regex = /[\u0000-\u001f"\\]/g;

export default function escapeString(str: string) {
	return str.replace(regex, (c) => {
		switch (c) {
			case '"':
				return '\\"';
			case "\\":
				return "\\\\";
			case "\b":
				return "\\b";
			case "\f":
				return "\\f";
			case "\n":
				return "\\n";
			case "\r":
				return "\\r";
			case "\t":
				return "\\t";
			default:
				return c;
		}
	});
}

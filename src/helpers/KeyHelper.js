import shortid from "shortid";

class KeyHelper {
	static generateKey() {
		return shortid.generate();
	}
}

export default KeyHelper;
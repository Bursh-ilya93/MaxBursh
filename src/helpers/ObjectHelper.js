import _ from "lodash";

class ObjectHelper {
	static toggle(obj, key, value = true) {
		const out = {...obj};
		if ( _.has(out, key) ) {
			delete out[key];
		} else {
			out[key] = value;
		}

		return out;
	}

	static add(obj, key, value = true) {
		const out = {...obj};
		if ( !_.has(out, key) ) {
			out[key] = value;
		}

		return out;
	}

	static delete(obj, key) {
		const out = {...obj};
		if ( _.has(out, key) ) {
			delete out[key];
		}

		return out;
	}
}

export default ObjectHelper;
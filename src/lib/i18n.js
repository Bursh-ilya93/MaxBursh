export default class I18n {

	_map = {};

	_options = {};

	constructor(options = {}) {
		this.setOptions(options)
	}

	setMap(map = {}) {
		for(let key in map){
			this._map[key.replace(/\s/g, '').toLowerCase().replace("ё", "е")] = map[key];
		}

		return this;
	}

	setOptions(value) {
		this._options = {...this._options, ...value};

		const {alias = '__', enableAlias = true, language = 'ru', default_language = 'ru', makeGlobal = true} = this._options;

		let g = (typeof window !== 'undefined') ? window : global;

		if ( enableAlias ) {
			g[alias] = (...args) => this.translate(...args);
		}

		g['language'] = language;
		g['default_language'] = default_language;
		g['main_uri'] = language === default_language ? '' : `/${language}`;

		if ( makeGlobal ) {
			g['_i18n'] = this;
		}

		return this;
	}

	translate(index, placeholders = null) {
		let translation = index;

		if(index == null){
			return '';
		}

		var string = index.replace(/\s/g, '').toLowerCase().replace("ё", "е");

		if ( this._map.hasOwnProperty(string) ) {
			translation = this._map[string];
		}

		if ( placeholders === null ) {
			return translation;
		}

		for ( let key in placeholders ) {
			if ( placeholders.hasOwnProperty(key.replace(/\s/g, '').toLowerCase().replace("ё", "е")) ) {
				translation = translation.replace(new RegExp(`%${key}%`, 'g'), placeholders[key.replace(/\s/g, '').toLowerCase().replace("ё", "е")]);
			}
		}

		return translation;
	}
}
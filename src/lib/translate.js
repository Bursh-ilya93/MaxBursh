import I18n from "./i18n";

const i18n = new I18n({enableAlias : true});

let globalObject = (typeof window !== 'undefined') ? window : global;

globalObject['i18n']           = i18n;
globalObject['setTranslation'] = function (translation, options = null) {
	i18n.setMap(translation);

	if ( options !== null ) {
		i18n.setOptions(options);
	}
};

export const t = globalObject['__'];
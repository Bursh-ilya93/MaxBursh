import React from "react";
import {connect} from "react-redux";
import {changeLanguage} from "../../redux/data/action";
import {Dropdown, Label} from "semantic-ui-react";
import ReactSVG from "react-svg";

const langOptions = [
	{key: "ru", value: "ru", flag: "ru", text: "Русский"},
	{key: "by", value: "by", flag: "by", text: "Белорусский"},
	{key: "en", value: "en", flag: "gb", text: "Английский"},
];

const LanguageWidgetComponent = ({lang, onchangeLanguage}) => {
	return (
		<div className={`tools-language`}>
			<Label>Язык</Label>
			<Dropdown value={lang} options={langOptions} onChange={(e, data) => onchangeLanguage(data.value)} />
			<ReactSVG className={`icon`} src={require('../../assets/images/arrow.svg')}/>
		</div>
	)
};

export const LanguageWidget = connect(
	state => ({
		lang: state.data.lang
	}),
	dispatch => ({
		onchangeLanguage: (value) => dispatch(changeLanguage(value))
	}),
)(LanguageWidgetComponent);
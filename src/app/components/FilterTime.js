import React from "react";
import {connect} from 'react-redux';
import {changeFilter} from "../../redux/line/menu/main/actions";
import {Dropdown} from "semantic-ui-react";

const options = [
	{key: "0", value: "0", text: "За все время"},
	{key: "6", value: "6", text: "за 30 минут"},
	{key: "1", value: "1", text: "за 1 час"},
	{key: "2", value: "2", text: "за 3 часа"},
	{key: "3", value: "3", text: "за 6 часов"},
	{key: "4", value: "4", text: "за 12 часов"},
	{key: "5", value: "5", text: "за 24 часов"},
];

export const FilterComponent = ({onchangeFilter}) => {
	return (
		<Dropdown className={`input-filter`} placeholder={`За все время`} options={options} selection onChange={(e, data) => onchangeFilter(data.value)} />
	);
};

export default connect(
	state => ({}),
	dispatch => ({
		onchangeFilter: (period) => dispatch(changeFilter(period))
	}),
)(FilterComponent);
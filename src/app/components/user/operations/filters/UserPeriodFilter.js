import React from "react";
import {Dropdown} from "semantic-ui-react";

const options = [
	{key: "0", value: "0", text: "За последние 3 суток"},
	{key: "1", value: "1", text: "За последнюю неделю"},
	{key: "2", value: "2", text: "За последний месяц"},
	{key: "5", value: "5", text: "Неразыгранные ставки"},
	{key: "6", value: "6", text: "За текущий год"},
];

const UserPeriodFilter = ({changePeriod, value}) => {
	return (
		<Dropdown
			className={`input-filter period-filter result__filter-calendar`}
			options={options}
			selection
			value={value}
			onChange={(e, data) => changePeriod(data.value)}
		/>
	);
};

export default UserPeriodFilter;



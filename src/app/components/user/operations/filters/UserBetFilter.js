import React from "react";
import {Dropdown} from "semantic-ui-react";

const options = [
    {key: "-1", value: "-1", text: "Все ставки"},
    {key: "0", value: "0", text: "Линия"},
    {key: "1", value: "1", text: "Live"},
];

const UserBetFilter = ({changeTypeOfBet, value}) => {
    return (
        <Dropdown
            className={`input-filter bet-filter result__filter-calendar`}
            options={options}
            selection
            onChange={(e, data) => changeTypeOfBet(data.value)}
            value={value}
        />
    );
};

export default UserBetFilter;
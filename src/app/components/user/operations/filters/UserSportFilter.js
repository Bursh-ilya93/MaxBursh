import React from "react";
import {Dropdown} from "semantic-ui-react";

const UserSportFilter = ({changeTypeOfSport, sortedSports, value}) => {
    const options = [{id: '-1', name: 'Все виды спорта'}, ...sortedSports]
        .map(sport => ({
            key: sport.id,
            value: sport.id,
            text: sport.name
        }));

    return (
        <Dropdown
            className={`sport-filter input-filter`}
            options={options}
            value={value}
            onChange={(e, data) => changeTypeOfSport(data.value)}
        />
    );
};

export default UserSportFilter;
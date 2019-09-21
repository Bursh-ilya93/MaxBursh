import {Table} from "semantic-ui-react";
import {connect} from "react-redux";
import React from "react";

const TableStatisticsComponent = ({}) => {
	return (
		<Table.Row className={`stat`} >
			<Table.HeaderCell colSpan='4'>
				statistic
			</Table.HeaderCell>
		</Table.Row>
	)
};

export const TableStatistics = connect(
	state => ({}),
	dispatch => ({})
)(TableStatisticsComponent);
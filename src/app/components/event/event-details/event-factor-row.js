import React from "react";
import {Table} from "semantic-ui-react";
import Factor from "../../Factor/Factor";

export const EventFactorRow = ({columns, row, rowSpan = 2, style= {}}) => {
	return columns.map((col, index) => {
		if ( col.includes('Ф') || col.includes('Т') ) {
			return
		}

		return (
			<Table.Cell style={style} key={`koeff-${index}`} className={`event-table__koeff`} rowSpan={rowSpan}>
				<Factor className={`factor`} item={row[col]} type={"live"}/>
			</Table.Cell>
		)
	});
};
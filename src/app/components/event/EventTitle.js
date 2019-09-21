import React from "react";
import {Table} from "semantic-ui-react";
import {t} from "@lib/translate";

export const EventTitle = ({titles}) => {
	const filterTitles = titles.filter(title => !title.includes('K') && !title.includes('Т'));
	const titlesCount = titles.length;

	return (
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell className={'event-table__widgets'} width={1}></Table.HeaderCell>
				<Table.HeaderCell className={'event-table__teams'} width={6} textAlign={'left'}>
					<p>{t('Название события')}</p>
				</Table.HeaderCell>
				<Table.HeaderCell className={'event-table__rect'} width={1}></Table.HeaderCell>
				{filterTitles.map((title, index) => <Table.HeaderCell className={'event-table__koeff'} style={{width:`${100 / titlesCount}%`}} key={index}>{title}</Table.HeaderCell>)}
			</Table.Row>
		</Table.Header>
	)
};
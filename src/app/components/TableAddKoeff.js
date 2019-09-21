import React, {Component} from "react";
import {Button, Label, Table} from "semantic-ui-react";
import Factor from "./Factor/Factor";
import _ from "lodash";

const Navigation = ({change, currValue}) => {
	return (
		<div className={`navigation`}>
			<div className="navigation__column">
				<Button onClick={() => change(0)}>Все исходы</Button>
			</div>
			<div className="navigation__column">
				<Button onClick={() => change(2)}>Инд.тотал</Button>
			</div>
			<div className="navigation__column">
				<Button onClick={() => change(3)}>Форы</Button>
			</div>
			<div className="navigation__column">
				<Button onClick={() => change(1)}>Тоталы</Button>
			</div>
		</div>
	)
};

const divideArray = (array, divider) => {
	let i, j, temp = [];
	for ( i = 0, j = array.length; i < j; i += divider ) {
		temp.push(array.slice(i, i + divider));
	}

	return temp;
};

const Content = ({factors, activeTab, type}) => {
	const countCol = 10;

	const dopKeys = {
		0 : [0],
		1 : [4, 8],
		2 : [5],
		3 : [3]
	};

	let fType = 0;
	let i = 0;

	//иду по форам
	return Object.entries(factors).map(([key, value]) => {
		const sorted = Object.keys(value).sort();

		// несколько типов фор
		const group = sorted.map(typeName => {
			let points = value[typeName];
			//например форы -1 +2 +3 -4

			let pointsKeys = Object.keys(points).sort();

			const headCols = [];

			//нужно установить общий заголовок, ищу у кого больше 2
			const indexProtoCell = pointsKeys.find(point => points[point].length >= 2) || pointsKeys[0];

			if ( dopKeys[3].includes(points[indexProtoCell][0].factor.t) && indexProtoCell !== 0 ) {
				headCols.push(<Table.HeaderCell key={i++}>{points[indexProtoCell][0].text}</Table.HeaderCell>);
				headCols.push(<Table.HeaderCell key={i++}>{points[(-1) * indexProtoCell][0].text}</Table.HeaderCell>);
			} else {
				points[indexProtoCell].forEach(item => headCols.push(
					<Table.HeaderCell key={i++}>{item.text}</Table.HeaderCell>));
			}

			if ( points[indexProtoCell][0].isIndividual ) {
				headCols.splice(2);
				headCols.unshift(<Table.HeaderCell key={i++} className="empty"/>);
			}

			if ( dopKeys[3].includes(points[indexProtoCell][0].factor.t) ) {
				const attempt = {};
				Object.keys(points).forEach(key => {
					if ( !attempt[Math.abs(key)] ) {
						attempt[Math.abs(key)] = [];
					}
					attempt[Math.abs(key)] =
						[...attempt[Math.abs(key)], ...points[key].map(item => ({...item, point : key}))];
				});
				pointsKeys = Object.keys(attempt).sort();
				points = attempt;
			}

			const bodyCols = pointsKeys.map(point => {
				let prevTeam = '';

				const items = points[point];
				const sortedItems = _.sortBy(items, item => item.factor.i);
				let cols = [];

				sortedItems.forEach((item) => {
					fType = item.factor.t;

					if ( item.isIndividual && item.team !== prevTeam ) {
						cols.push(
							<Table.Cell key={item.team} className={`name-team`}><strong>{item.team}</strong></Table.Cell>);
						prevTeam = item.team;
					}

					cols.push(
						<Table.Cell key={i++} className={`cols cols-${headCols.length}`}>
							<Factor item={item.factor} type={type}/>
						</Table.Cell>
					);
				});

				if ( sortedItems.length > 2 ) {
					cols = divideArray(cols, headCols.length < countCol ? headCols.length : countCol);
				} else {
					cols = [cols];
				}

				return cols.map(cells => <Table.Row key={i++}>{cells}</Table.Row>);
			});

			const tables = [];
			let tmpHeadCols = [];

			headCols.forEach((col, index) => {
				tmpHeadCols.push(headCols[index]);

				if ( index > 0 && (index + 1) % countCol === 0 || (index + 1) === headCols.length ) {
					const tmpIndex = tables.length;

					tables.push(
						<Table key={`head-cols-${index}`} className={"table-koeff"}>
							<Table.Header>
								<Table.Row>
									{tmpHeadCols}
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{bodyCols[0][tmpIndex]}
							</Table.Body>
						</Table>
					);
					tmpHeadCols = [];
				}
			});

			return (
				<React.Fragment key={i++}>
					<div className="factor-name">
						<Label>{typeName}</Label>
					</div>

					{tables}
				</React.Fragment>
			);
		});

		return (
			<div key={i++} className={`add-factors ${(dopKeys[activeTab].includes(fType) || activeTab === 0) && 'active'}`}>
				{group}
			</div>
		);
	});
};

class TableAddKoeff extends Component {

	state = {
		activeTab : 0
	};

	changeNavigation = (activeTab) => {
		this.setState({activeTab});
	};

	render() {
		const {factors, type} = this.props;
		const {activeTab} = this.state;

		return (
			<div className="table-add-factors">
				<Navigation change={this.changeNavigation} currValue={activeTab}/>
				<Content factors={factors} activeTab={activeTab} type={type}/>
			</div>
		);
	}
}

export default TableAddKoeff;

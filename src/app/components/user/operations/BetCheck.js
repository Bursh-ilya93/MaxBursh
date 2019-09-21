import React, {Component} from "react";
import _ from "lodash";
import MomentDate from "../../../components/MomentDate";
import EventHelper from "../../../../helpers/EventHelper";

class BetCheck extends Component {
	render() {
		const logo = {
			margin     : "auto",
			marginTop  : "15px",
			display    : 'block'
		};
		const title = {
			fontWeight : 'bold',
			fontSize   : 24,
			color      : '#129A48',
			width      : '100%',
			textAlign  : 'center'
		};

		const check = {
			padding    : '20px',
			fontFamily : 'Roboto, sans-serif'
		};
		const p = {
			margin     : '5px',
		};
		const table = {
			borderCollapse : 'collapse',
			width          : '100%',
			borderBottom   : '1px solid #C4C4C4',
		};
		const thead = {
			background : '#51BF7D'
		};
		const td = {
			padding       : 3,
			fontWeight    : 'bold',
			textAlign     : 'center',
			verticalAlign : 'top',
			color         : '#fff',
		};
		const tdBody = {
			verticalAlign : 'top',
			padding       : 8,
			borderRight   : '1px solid #C4C4C4',
		};
		const pBody = {
			fontSize: '14px',
			margin  : 0,
			padding : 0,
		};
		const spanBody = {
			fontWeight : 'bold',
		};
		const spanBodyRed = {
			color : 'red',
		};
		const divBody = {
			padding : '0 0 10px 0'
		};

		const info = {
			fontSize    : '14px',
			lineHeight  : 'normal',
			marginBottom: '10px',
			marginTop   : '20px'
		};

		const {bet, events} = this.props;
		const {details} = bet;

		let isLive = false;
		const dt = details.map((detail, index) => {
			const event = _.first(events.filter((event) => {return parseInt(event.id) === detail.event_id}));

			if ( +event.type === 1 ) {
				isLive = true;
			}

			const teams = EventHelper.parseTeams(event.team1, event.team2);

			return (
				<div key={index} style={divBody}>
					<p style={pBody}>
						<span style={spanBody}>Дата:&nbsp;</span>
						<MomentDate date={event.time} isFormatDate={true}/>
					</p>
					<p style={pBody}>
						<span style={spanBody}>Событие:&nbsp;</span>
						<span>{teams}</span>
					</p>
					<p style={pBody}>
						<span style={spanBody}>Выбор:&nbsp;</span>
						<span>{detail.bet_name}: {detail.value}</span>
					</p>
				</div>
			)
		});

		return (
			<div style={check}>
				<img style={logo} src={require('../../../../assets/images/logo-check.png')} alt="logo"/>
				<p style={title}>Ваша ставка принята, спасибо</p>
				<table style={table}>
					<thead style={thead}>
						<tr>
							<td style={td}>Описание ставки</td>
							<td style={td}>Описание выбора</td>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td style={tdBody}>
								<p style={pBody}><span style={spanBody}>Номер ставки:</span> {bet.number}</p>
								<p style={pBody}>
									<span style={spanBody}>Тип ставки:&nbsp;</span>
									{isLive && <span style={spanBodyRed}> Live </span>}
									{bet.type} {bet.count_bets > 1 && `(K=${bet.value.toFixed(2)})`}

								</p>
								<p style={pBody}><span style={spanBody}>Сумма ставки:</span> {bet.amount} BYN</p>
								<p style={pBody}>
									<span style={spanBody}>Потенциальная выплата:&nbsp;</span>
									<span>{(bet.amount * bet.value).toFixed(2)} BYN</span>
								</p>
								<p style={pBody}><span style={spanBody}>СККСУИ:</span></p>
							</td>
							<td style={{padding: 8, verticalAlign : 'top'}}>
								{dt}
							</td>
						</tr>
					</tbody>
				</table>
				<div style={info}>
					<p style={p}>ООО "Финансово-инвестиционная компания "ИНХО"</p>
					<p style={p}>УНП 191318808 г.Витебск, пр. Строителей, д. 10</p>
					<p style={p}>
						<strong>Дата:&nbsp;</strong>
						<MomentDate date={bet.ts.toString()} isFormatDate={true}/>
					</p>
					<p style={p}><strong>Количество ставок:&nbsp;</strong>{bet.count_bets}</p>
				</div>
			</div>
		);
	}
}

export default BetCheck;
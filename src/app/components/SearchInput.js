import React, {Component} from "react";
import ReactSVG from "react-svg";
import {Accordion, Input, List} from "semantic-ui-react";
import {connect} from "react-redux";

const EventComponent = ({event}) => {
	const {team1, team2, time} = event;
	return (
		<div className={`search-input__event`}>
			<div className={`left`}>
				<p className="teams">{`${team1}-${team2}`}</p>
				<p className="time">{time}</p>
			</div>
			<div className={`right`}>
				<p><span className={`koeff-title`}>1</span><span className={`koeff-value`}>3.72</span></p>
				<p><span className={`koeff-title`}>X</span><span className={`koeff-value`}>3.72</span></p>
				<p><span className={`koeff-title`}>2</span><span className={`koeff-value`}>3.72</span></p>
			</div>
		</div>
	)
};

const Event = connect(
	(state, props) => ({}),
	dispatch => ({})
)(EventComponent);


const events = [
	{league_id: "1", team1: "Айнтрахт Франкфурт", team2: "Боруссия Дортмунд", time: "02 jan 2019"},
	{league_id: "1", team1: "Айнтрахт Франкфурт", team2: "Боруссия Дортмунд", time: "02 jan 2019"},
	{league_id: "1", team1: "Айнтрахт Франкфурт", team2: "Боруссия Дортмунд", time: "02 jan 2019"},
	{league_id: "1", team1: "Айнтрахт Франкфурт", team2: "Боруссия Дортмунд", time: "02 jan 2019"},
	{league_id: "2", team1: "Айнтрахт Франкфурт", team2: "Боруссия Дортмунд", time: "02 jan 2019"},
	{league_id: "2", team1: "Айнтрахт Франкфурт", team2: "Боруссия Дортмунд", time: "02 jan 2019"},
];

class LeagueComponent extends Component {
	state = {
		active: false,
	};

	render() {
		const {league, events} = this.props;
		const {active} = this.state;

		return (
			<Accordion>
				<Accordion.Title className={active && "active" || ""} onClick={() => this.setState({active: !active})}>
					<span>{league.name}</span>
				</Accordion.Title>
				<Accordion.Content active={active}>
					{events.map((event, index) => <Event key={index} event={event}/>)}
				</Accordion.Content>
			</Accordion>
		)
	}
}

const League = connect(
	(state, props) => ({
		events: events.filter(event => props.league.id === event.league_id)
	}),
	dispatch => ({
	})
)(LeagueComponent);

class SearchInputComponent extends Component {
	leagues = [
		{id: "1", name: "Боруссия Дортмунд"},
		{id: "2", name: "Боруссия Менхенгландбах"}
	];

	state = {
		active: false,
	};

	hideContent = () => {
		const {active} = this.state;

		if (active) {
			this.setState({
				active: false
			});
		}
	};

	render() {
		const {active} = this.state;

		return (
			<Accordion className={'search-input'}>
				<Accordion.Title>
					<input id='search-btn' type='checkbox' onChange={this.hideContent}/>
					<ReactSVG id={'search-icon'} src={require(`../../assets/images/search2.svg`)}/>
					<Input onClick={() => this.setState({active: !active})} id='search-bar' type='text' placeholder='Поиск'/>
				</Accordion.Title>
				<Accordion.Content active={active}>
					{this.leagues.map((league, index) => <League key={index} league={league}/>)}
				</Accordion.Content>
			</Accordion>
		)
	}
}

export const SearchInput = connect(
	state => ({
	}),
	dispatch => ({
	})
)(SearchInputComponent);



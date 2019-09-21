import React, {Component, Fragment} from "react";
import {Sidebar, Button, Accordion, Header, Loader} from 'semantic-ui-react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {getLeagues, getLine} from "../../../redux/line/menu/main/actions";
import {SportIcon} from "../SportIcon";
import ReactSVG from "react-svg";
import _ from "lodash";
import PopularMenu from "../PopularMenu";
import FilterTime from "../FilterTime";
import {withRouter} from "react-router";

const LongLeagues = ({leagues}) => {
	if (leagues.length === 0 ) {
		return false;
	}

	return (
		<Fragment>
			<Header>Долгосрочные</Header>
			{leagues.map((l) => <LeagueComponentSimple key={l.id} league={l}/>)}
		</Fragment>
	)
};

const LeagueComponentSimple = ({league}) => {
	return (<Link className={'league'} to={{pathname : `/line-leagues/${league.id}`}}>{league.name}</Link>)
};


class SportComponent extends Component {
	state = {
		showAccordion: false
	};

	handleAccordion = () => {
		const {onGetLeagues} = this.props;
		const {sport, leagues} = this.props;

		if (!leagues.length) {
			onGetLeagues(sport.id);
		}

		this.setState(prevState => ({
			showAccordion: !prevState.showAccordion
		}));
	};

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		const {leagues} = nextProps;
		const {showAccordion} = nextState;
		if (showAccordion === this.state.showAccordion && JSON.stringify(leagues) === JSON.stringify(this.props.leagues)) {
			return false;
		}
		return true;
	}

	render() {
		const {sport, leagues, fetching} = this.props;
		const {showAccordion} = this.state;

		return (
			<Accordion className={`sport ${showAccordion ? "open" : ""}`} styled>
				<Accordion.Title>
					<SportIcon id={sport.id}/>
					<span><Link to={`/line-sport/${sport.alias}`}>{sport.name}</Link></span>
					{fetching == sport.id && <Loader/> ||
					<ReactSVG onClick={this.handleAccordion} className={'icon-dropdown'} src={require(`../../../assets/images/arrow.svg`)}/>}
				</Accordion.Title>
				<Accordion.Content active={showAccordion}>
					{leagues
						.filter((l) => l.type == 0)
						.map((l) =>
						<LeagueComponentSimple key={l.id} league={l}/>
					)}
					{<LongLeagues leagues={leagues.filter((l) => l.type == 1)}/>}
				</Accordion.Content>
			</Accordion>
		);
	}
}

const Sport = connect(
	(state, props) => ({
		leagues  : state.line.menu.main.leagues[props.sport.id] || [],
		fetching : state.line.menu.main.fetching
	}),
	dispatch => ({
		onGetLeagues: (id) => dispatch(getLeagues(id))
	})
)(SportComponent);


class LeftSidebar extends Component {
	componentDidMount() {
		const {onfetchLine} = this.props;
		onfetchLine();
	}

	changeFilter = (url) => {
		this.props.history.push(url);
	};

	render() {
		const {sports} = this.props;
console.log('sports',sports);
		return (
			<Sidebar visible={true} className="sidebar-left">
				<Header>Виды спорта</Header>
				{!window.location.href.includes('line') && <FilterTime />}
				<Button.Group>
					<Button className={!window.location.href.includes('line') ? "no-active" : ""} onClick={() => this.changeFilter('/line')}>
						<span>Все события</span>
					</Button>
					<Button className={!window.location.href.includes('live') ? "no-active" : ""} onClick={() => this.changeFilter('/live')}>
						<span>LIVE</span>
					</Button>
				</Button.Group>
				<PopularMenu/>
				<Header>Категории (А-Я)</Header>
				{_.sortBy(sports, 'name').map(item => <Sport key={item.id} sport={item} />)}
			</Sidebar>
		)
	}
}

export default withRouter(connect(
	(state) => ({
		sports     : state.line.menu.main.sports,
		fetching   : state.line.menu.main.fetching,
	}),
	dispatch => ({
		onfetchLine: () => dispatch(getLine())
	}))(LeftSidebar));




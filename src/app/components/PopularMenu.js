import React, {Component} from "react";
import {connect} from "react-redux";
import {getPopular} from "../../redux/line/menu/popular/actions";
import {Accordion, Header, Loader} from "semantic-ui-react";
import _ from "lodash";
import {SportIcon} from "./SportIcon";
import {Link} from "react-router-dom";
import ReactSVG from "react-svg";

const League = ({league}) => (
	<Link className='league' to={{pathname : `/line-leagues/${league.slug}`}}>{league.name}</Link>
);

class PopularComponent extends Component {
	state = {
		showAccordion: false
	};

	render() {
		const {popular, sport} = this.props;
		let {leagues} = this.props;
		const {showAccordion} = this.state;

		leagues = leagues.filter(v => v.popular_id == this.props.popular.id && v.sport_id == this.props.popular.sport_id);

		return (
			<Accordion className={showAccordion ? "open" : ""}>
				<Accordion.Title>
					<span><Link to={`/popular/${sport.slug}/${popular.slug}`}>{popular.name}</Link></span>
					<ReactSVG className={'icon-dropdown'} src={require('../../assets/images/arrow.svg')}  onClick={() => this.setState({showAccordion: !showAccordion})}/>
				</Accordion.Title>
				<Accordion.Content active={showAccordion}>
					{leagues.map(v => <League league={v} key={v.id}/>)}
				</Accordion.Content>
			</Accordion>
		)
	}
}

const Popular = connect(
	(state) => ({
		leagues  : state.line.menu.popular.leagues
	})
, {})(PopularComponent);


class SportComponent extends Component {
	state = {
		showAccordion: false
	};

	render() {
		let {sport, populars} = this.props;
		const {showAccordion} = this.state;
		populars = populars.filter(v => v.sport_id == sport.id);
		return (
			<React.Fragment>
				<Accordion className={`sport animated popular-sport ${showAccordion ? "open" : ""}`} styled>
					<Accordion.Title>
						<SportIcon id={sport.id}/>
						<span>{sport.name}</span>
						<ReactSVG className={'icon-dropdown'} src={require('../../assets/images/arrow.svg')}  onClick={() => this.setState({showAccordion: !showAccordion})}/>
					</Accordion.Title>
					<Accordion.Content  className={`transition`}  active={showAccordion}>
						{populars.map(v => <Popular popular={v} sport={sport} key={v.id}/>)}
					</Accordion.Content>
				</Accordion>
			</React.Fragment>
		);
	}
}

const Sport = connect(
	(state) => ({
		populars : state.line.menu.popular.populars
	}),
	dispatch => ({}))(SportComponent);


class PopularMenu extends Component {
	intervalId = -1;
	
	componentDidMount() {
		const {onfetchPopularMenu} = this.props;
		onfetchPopularMenu();
		// this.intervalId = setInterval(function () {
		// 	onfetchPopularMenu();
		// }, 12000);
	}

	componentWillUnmount() {
		if ( this.interval ) {
			clearInterval(this.intervalId);
		}
	}

	shouldComponentUpdate(nextProps, nextState, nextContext) {
		const {sports} = nextProps;
		if (JSON.stringify(sports) === JSON.stringify(this.props.sports)) {
			return false;
		}
		return true;
	}

	render() {
		const {sports} = this.props;

		return (
			<div className='popular-menu'>
				<Header></Header>
				{/*{fetching && <Loader/>}*/}
				{sports.map(v => <Sport sport={v} key={v.id}/>)}
			</div>
		)
	}
}

export default connect(
	state => ({
		sports      : state.line.menu.popular.sports || [],
	}),
	dispatch => ({
		onfetchPopularMenu: () => dispatch(getPopular())
	})
)(PopularMenu);

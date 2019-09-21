import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {Accordion, Checkbox, Loader} from "semantic-ui-react";
import ReactSVG from "react-svg";
import {FilterComponent} from "../FilterTime";
import {
	getLine,
	resetSelectedSport,
	selectSportLine,
	showAllSport,
	showSelectedSport
} from "../../../redux/line/main/action";


const FilterSportItemComponent = ({sport, onselectSportLine, checked}) => {
	return (
		<div className={`item`}>
			<Checkbox checked={checked} onChange={() => onselectSportLine(sport.id)} label={sport.name}/>
		</div>
	)
};

const FilterSportItem = connect(
	(state, props) => ({
		checked: state.line.main.selectedSports.includes(props.sport.id)
	}),
	dispatch => ({
		onselectSportLine: (id) => dispatch(selectSportLine(id))
	})
)(FilterSportItemComponent);

const FilterTime = connect(
	(state, props) => ({
		sports     : state.line.main.sports
	}),
	dispatch => ({
		onchangeFilter: (period) => dispatch(getLine(period))
	})
)(FilterComponent);

class FilterLineComponent extends Component {
	state = {
		isshowAccordion: true,
	};

	render() {
		const {onshowAllSport, onresetSelectedSport, onshowSelectedSport} = this.props;
		const {sports, fetching} = this.props;
		const {isshowAccordion} = this.state;

		return (
			<Accordion className={`sport popular sport-live line-filter ${isshowAccordion ? "open" : ""}`} styled>
				<Accordion.Title>
					<ReactSVG onClick={() => this.setState({isshowAccordion: !isshowAccordion})} className={'icon-dropdown'} src={require(`../../../assets/images/arrow.svg`)} />
					<span className="caption">
						<span className="name">Все события</span>
					</span>
				</Accordion.Title>
				<Accordion.Content className={`line-filter__content`} active={isshowAccordion}>
					{fetching && <Loader/>}
					<div className={`filter-list`}>
						{_.sortBy(sports, sport => sport.name).map((sport, index) => <FilterSportItem key={index} sport={sport}/>)}
					</div>
					<div className={`last-block`}>
						<p className={`filter-time-title`}>События за:</p>
						<FilterTime/>
						<button className={`button button-show-selected`}
						        onClick={onshowSelectedSport}>Показать отмеченные</button>
						<button className={`button button-show-all`}
						        onClick={onshowAllSport}>Показать все</button>
						<button className={`button button-delete-all`}
						        onClick={onresetSelectedSport}>Очистить все</button>
					</div>
				</Accordion.Content>
			</Accordion>
		)
	}
}

export default connect(
	state => ({
		sports        : state.line.main.sports,
		fetching      : state.line.main.fetching,
	}),
	dispatch => ({
		onresetSelectedSport: () => dispatch(resetSelectedSport()),
		onshowSelectedSport : () => dispatch(showSelectedSport()),
		onshowAllSport      : () => dispatch(showAllSport()),
	})
)(FilterLineComponent);

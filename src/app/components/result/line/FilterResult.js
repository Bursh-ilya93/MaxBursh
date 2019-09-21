import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {Accordion, Checkbox, Loader} from "semantic-ui-react";
import ReactSVG from "react-svg";
import {
    changeDateAsync, fetchResultsFromMaraphon, fetchSportsFilter,
    resetSelectedSport,
    selectSportResultLine,
    showAllSport
} from "../../../../redux/result/line/actions";

import DatePicker, {registerLocale} from "react-datepicker";
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);


const FilterSportItemComponent = ({sport, onselectSportLine, checked}) => {
    return (
        <div className={`item`}>
            <Checkbox checked={checked} onChange={() => onselectSportLine(sport.id)} label={sport.name}/>
        </div>
    )
};

const FilterSportItem = connect(
    (state, props) => ({
        checked: state.result.resultLine.selectedSports.includes(props.sport.id)
    }),
    dispatch => ({
        onselectSportLine: (id) => dispatch(selectSportResultLine(id))
    })
)(FilterSportItemComponent);


class FilterLineComponent extends Component {
    state = {
        isshowAccordion: true,
    };

    componentDidMount() {
        let {onFetchSportsFilter} = this.props;
        onFetchSportsFilter();
    }

    render() {
        const {selectedSports, sports, fetching, moment, onChangeDateAsync, popular} = this.props;
        const {onresetSelectedSport, onshowAllSport, onFetchResultFromMaraphon} = this.props;
        const {isshowAccordion} = this.state;
        const BlockButtons = () =>
            (<div className={`last-block`}>
                <p className={`filter-time-title`}>События за:</p>
                <DatePicker selected={moment}
                            dateFormat="YYYY-MM-DD"
                            locale="ru"
                            className="hasDatepicker"
                            onChange={(date) => onChangeDateAsync(date, sports.map(s => s.id))}/>
                <button className={`button button-show-selected`}
                        onClick={() => onFetchResultFromMaraphon(moment, selectedSports)}>Показать отмеченные</button>
                <button className={`button button-show-all`}
                        onClick={() => onshowAllSport()}>Показать все</button>
                <button className={`button button-delete-all`}
                        onClick={() => onresetSelectedSport()}>Очистить все</button>
            </div>);

        return (
            <Accordion className={`sport popular sport-live line-filter ${isshowAccordion ? "open" : ""}`} styled>
                <Accordion.Title>
                    <ReactSVG onClick={() => this.setState({isshowAccordion: !isshowAccordion})} className={'icon-dropdown'}  src={require(`../../../../assets/images/arrow.svg`)}/>
                    <span className="caption">
						<span className="name">Результаты</span>
					</span>
                </Accordion.Title>

                <Accordion.Content className={`line-filter__content`} active={!isshowAccordion}>
                    <div className={`filter-list`}>
                        {_.sortBy(sports, sport => sport.name).filter(s => popular.includes(parseInt(s.id))).map((sport, index) => <FilterSportItem key={index} sport={sport}/>)}
                    </div>
                    {BlockButtons()}
                </Accordion.Content>

                <Accordion.Content className={`line-filter__content`} active={isshowAccordion}>
                    <div className={`filter-list`}>
                        {_.sortBy(sports, sport => sport.name).map((sport, index) => <FilterSportItem key={index} sport={sport}/>)}
                    </div>
                    {BlockButtons()}
                    {fetching && <Loader/>}
                </Accordion.Content>
            </Accordion>
        )
    }
}

export default connect(
    state => ({
        selectedSports: state.result.resultLine.selectedSports,
        sports        : state.result.resultLine.sports,
        fetching      : state.result.resultLine.fetching,
        moment        : state.result.resultLine.moment,
        popular       : state.result.resultLine.popular,
    }),
    dispatch => ({
        onFetchSportsFilter : () => dispatch(fetchSportsFilter()),
        onresetSelectedSport: () => dispatch(resetSelectedSport()),

        onFetchResultFromMaraphon: (time, sports) => dispatch(fetchResultsFromMaraphon(time, sports)),

        onshowAllSport      : () => dispatch(showAllSport()),
        onChangeDateAsync   : (moment, ids) => dispatch(changeDateAsync(moment, ids)),
    })
)(FilterLineComponent);

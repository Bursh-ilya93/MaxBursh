import React, {Component} from "react";
import {connect} from "react-redux";
import moment from "moment";
import {FilterSport} from "../../FilterSport";
import Breadcrumbs from "../../Breadcrumbs";
import Filter from "./FilterResult";
import {fetchResult, fetchResultsFromMaraphon, toogleAdd} from "../../../../redux/result/line/actions";
import ReactSVG from "react-svg";

const DopComponent = ({event, isActive, onToogleAdd}) => {
    return (
        <div className='add'>
            {event.hasOwnProperty('additional') && event.additional !== "" &&
                <div className="dop">
                    <span className="show-dop" onClick={() => onToogleAdd(event.name)}>
                        <ReactSVG src={require('../../../../assets/images/arrow.svg')}/>
                    </span>
                    <div className={'dop-koefs' + (isActive ? ' active' : ' none')}>
                        <div style={{textAlign: "left", marginTop: "10px"}} dangerouslySetInnerHTML={{__html: event.additional}}/>
                    </div>
                </div>
            ||
                <span className="dop-koef">Нет</span>
            }
        </div>
    )
};


const Dop = connect(
    (state, props) => ({
        isActive : state.result.resultLine.activeDop.includes(props.event.name)
    }),
    dispatch => ({
        onToogleAdd: (id) => dispatch(toogleAdd(id))
}))(DopComponent);


const Result = ({event}) => {
    return (
        <p className="result">
            {event.hasOwnProperty('score')
                ?
                <span className="scores">
        			{event.score !== undefined && event.score !== ''
                        ? <span className="bold">{event.score}</span>
                        : <span className="bold">{event.sportId}</span>
                    }
                </span>
                :
                <span>&nbsp;</span>
            }
        </p>
    )
};

const Event = ({event}) => {
    return (
        <div className="events-body" key={event.id}>
            <div className="event">
                <p className="time">{moment(new Date(event.date * 1000)).format("hh:mm")}</p>
                <p className="name-event" dangerouslySetInnerHTML={{__html: event.name}}/>
                <Result event={event}/>
                <Dop event={event}/>
            </div>
        </div>
    )
};

const LeagueComponent = ({league, events}) => {
    let key = 2000;

    return (
        <div className={'league results-league'}>
            <div className="league-name name">
                <p>{league.fullName}</p>
                <div className="result-events">
                    <div className="events-head">
                        <p className="time">Время</p>
                        <p className="event">Событие</p>
                        <p className="result">Результат</p>
                        <p className="dop">Доп</p>
                    </div>
                    {events.map(v => <Event event={v} key={key++}/>)}
                </div>
            </div>
        </div>
    )
};

const League = connect(
    (state, props) => ({
        events : state.result.resultLine.events[props.league.fullName] || [],
    }),
    dispatch => ({})
)(LeagueComponent);

class ResultLine extends Component {
    getBreadcumbs = () => {
        let data = [];
        data.push({key : '/', value : 'Главная'});
        data.push({key : '', value : 'Результаты'});
        data.push({key : '', value : 'Линия'});
        return data;
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const {onFetchResultFromMaraphon, moment, sports} = nextProps;

        if (sports !== this.props.sports) {
            if (sports.length > 0) {
                onFetchResultFromMaraphon(moment, sports.map(sport => sport.id));
            }
        }
    }

    render() {
        const {leagues} = this.props;
        let key = 200;

        return (
            <div className="results-line">
                <FilterSport/>
                <Breadcrumbs data={this.getBreadcumbs()}/>
                <Filter/>
                <div className="content">
                    {leagues.map((v) => <League key={key++} league={v}/>)}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        moment     : state.result.resultLine.moment,
        leagues    : state.result.resultLine.leagues,
        sports     : state.result.resultLine.sports,
        isshowSelected : state.result.resultLine.isshowSelected,
        selectedSports : state.result.resultLine.selectedSports,
    }),
    dispatch => ({
        onFetchResultFromMaraphon: (time, sports) => dispatch(fetchResultsFromMaraphon(time, sports)),
    }),
)(ResultLine);

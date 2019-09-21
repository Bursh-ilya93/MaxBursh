import React, {Component} from "react";
import {connect} from "react-redux";
import {FilterSport} from "../../FilterSport";
import Breadcrumbs from "../../Breadcrumbs";
import {fetchResultsLive} from "../../../../redux/result/live/actions";
import {Loader} from "semantic-ui-react";

const Event = ({events}) => {
    return events.map((e) => {
        return (
            <div className='event' key={e.id}>
                <p className="time">{e.time}</p>
                <p className="name-event">{e.name}</p>
                <div className={"result" + (e.finished ? ' black' : '')}>
                    <span className="general">{e.results.general} </span>
                    <span className="periods">{e.results.periods !== '' ? '(' + e.results.periods + ')' : ''}</span>
                </div>
            </div>
        )
    })
};

const LeagueComponent = ({events, sport, league}) => {
    return (
        <div className={'league results-league'}>
            <div className="league-name name">
                <p>{sport.name}.{league.name}</p>
                <div className="result-events">
                    <div className="events-head">
                        <p className="time">Время</p>
                        <p className="event">Событие</p>
                        <p className="result">Результат</p>
                    </div>
                    <div className="events-body">
                        {events.length != 0 ? <Event events={events}/> : ''}
                    </div>
                </div>
            </div>
        </div>
    )
};

const League = connect(
    (state, props) => ({
        events : state.result.resultLive.events[props.league.id] || []
    }),
null)(LeagueComponent);


const SportComponent = ({sport, leagues}) => {
    return leagues.map((l) => <League key={l.id} sport={sport} league={l}/>)
};

const Sport = connect(
    (state, props) => ({
        leagues : state.result.resultLive.leagues[props.sport.id] || []
    }),
null)(SportComponent);


class ResultLive extends Component {
    interval;

    getBreadcumbs = () => {
        let data = [];
        data.push({key : '/', value : 'Главная'});
        data.push({key : '', value : 'Результаты'});
        data.push({key : '', value : 'Live'});
        return data;
    };

    componentDidMount() {
        const {onFetchResultsLive} = this.props;

        onFetchResultsLive();

        // this.interval = setInterval(function () {
        //     onFetchResultsLive();
        // // }, 4000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {sports, fetching} = this.props;

        return (
            <div className="results-live">
                <FilterSport/>
                <Breadcrumbs data={this.getBreadcumbs()}/>
                {fetching && <Loader/>}
                <div className="content">
                    {sports.map((s) => <Sport key={s.id} sport={s}/>)}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        moment     : state.result.resultLive.moment,
        sports     : state.result.resultLive.sports,
        fetching   : state.result.resultLive.fetching,
    }),
    dispatch => ({
        onFetchResultsLive: () => dispatch(fetchResultsLive()),
    }),
)(ResultLive);

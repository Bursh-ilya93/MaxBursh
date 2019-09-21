import React, {Component} from "react";
import {connect} from "react-redux";
import {getHistorySession} from "../../../redux/user/history-session/actions";
import UserHeader from "./UserHeader";
import {TimeFilter} from "./sessions/filters/TimeFilter";
import moment from 'moment';
import 'moment/locale/ru';

class HistorySession extends Component {
    componentWillMount() {
        this.setState({
            from: new Date (new Date().getTime() - 7 * 24 * 3600 * 1000),
            to  : new Date().getTime()
        });
    }

    componentDidMount() {
        const {onGetHistorySession} = this.props;
        onGetHistorySession();
        this.intervalId = setInterval(() => {onGetHistorySession()}, 10000);
    };

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    changePeriod(type, event) {
        let date = moment(event.valueOf()).format('YYYY-MM-DD');
        date = type === "from" ? `${date} 00:00` : `${date} 23:59`;

        this.setState(() => ({
            [type] : new Date(date).getTime()
        }));
    }

    render() {
        const {value} = this.props;
        const {from, to} = this.state;

        const sortData = value.filter(item => {
            return item.time * 1000 >= from &&  item.time * 1000 <= to
        });

        return(
            <div className="user-page">
                <div className="content">
                    <div className="history-session">
                        <UserHeader text={'История сеансов'}/>
                        <div className="content">
                            <div className="commonFilter">
                                <div className="filter">
                                    <label>C: </label>
                                    <TimeFilter value={from} changePeriod={() => this.changePeriod.bind(this, "from")} />
                                </div>
                                <div className="filter">
                                    <label>По: </label>
                                    <TimeFilter value={to} changePeriod={() => this.changePeriod.bind(this, "to")} />
                                </div>
                            </div>
                            <div className="body">
                                <table>
                                    <thead>
                                    <tr>
                                        <th className="time">Время/Дата входа</th>
                                        <th className="ip">IP адрес</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {sortData.map((item, index) => (
                                        <tr key={index}>
                                            <td className="time"><span>{moment(item.time * 1000).format('DD MMM HH:mm')}</span></td>
                                            <td className="ip"><span>{item.ip}</span></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        value    : state.user.history_session.value,
    }),
    dispatch => ({
        onGetHistorySession: () => dispatch(getHistorySession())
    })
)(HistorySession);


import React, {Component} from "react";
import {connect} from "react-redux";
import _ from "lodash";
import {getHistoryBonus} from "../../../redux/user/history-bonus/actions";
import UserHeader from "./UserHeader";

class HistoryBonus extends Component {
    componentWillMount() {
        const {onGetHistoryBonus} = this.props;
        onGetHistoryBonus();
    }

    render() {
        const {value} = this.props;
        const sortedValue = _.sortBy(value, (x)=> {return x.time}).reverse();

        return (
            <div className="user-page">
                <div className="history-bonus">
                    <UserHeader text={`История бонусных зачислений`}/>
                    <div className="body">
                        <table>
                            <thead>
                            <tr>
                                <th className="time">Время/Дата</th>
                                <th className="action">Тип</th>
                                <th className="amount">Сумма</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedValue.map((item) =>
                                <tr>
                                    <td className="time"><span>{item.time}</span></td>
                                    <td className="action">
                                        <span>{`${+item.type === 101 ? 'Зачисление' : 'Списание'}`}</span>
                                    </td>
                                    <td className="amount"><span>{item.amount} {item.currency}</span></td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        value: state.user.bonus.value,
    }),
    dispatch => ({
        onGetHistoryBonus: () => dispatch(getHistoryBonus())
    })
)(HistoryBonus);
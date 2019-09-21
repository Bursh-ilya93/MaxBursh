import React, {Component} from "react";
import {connect} from "react-redux";
import {Loader} from "semantic-ui-react";
import {getCashBack, payCashBack} from "../../../redux/user/cashback/actions";
import UserHeader from "./UserHeader";

class UserCashBack extends Component {

    componentWillMount() {
        const {onGetCashBack} = this.props;
        onGetCashBack();
    }

    render() {
        const {value, isNeedPay, onPayCashBack, loading, messages} = this.props;
        const {date, result} = value;
        const {success, errors} = messages;

        return (
            <div className="user-page">
                <div className="cashback">
                    <UserHeader text={'Текущий кэшбэк'}/>
                    <div className="body">
                        <div className={'content'}>
                            <div className={'accountInfo'}>
                                <div className={'info'}>{result.toFixed(2)} BYN</div>
                                <div className={'dateTime'}>За {date}</div>
                            </div>
                            {isNeedPay && !loading && <div className={'get'} onClick={() => onPayCashBack()}>
                                <button className='button'>Получить</button>
                            </div>}
                            {loading && <Loader/>}
                            {success.length > 0 && <span className={'green'}>{success}</span>}
                            {errors.length > 0 && <span className={'red'}>{errors}</span>}
                        </div>
                    </div>
                    <UserHeader text={'История выплат'}/>
                    <div className="body">
                        <table>
                            <thead>
                            <tr>
                                <th className="time">Время/Дата</th>
                                <th className="amount">Сумма</th>
                            </tr>
                            </thead>
                            {value.logs.map((item) =>
                                <tbody>
                                <tr>
                                    <td className="time"><span>{item.date}</span></td>
                                    <td className="action">{item.amount} BYN</td>
                                </tr>
                                </tbody>)}

                        </table>
                    </div>
                </div>
            </div>
        );
    }
}


export default connect(
    state => ({
        value     : state.user.cashback.value,
        isNeedPay : state.user.cashback.isNeedPay,
        loading   : state.user.cashback.loading,
        messages  : state.user.cashback.messages
    }),
    dispatch => ({
        onGetCashBack: () => dispatch(getCashBack()),
        onPayCashBack: () => dispatch(payCashBack())
    })
)(UserCashBack);
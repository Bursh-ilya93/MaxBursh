import React, {Component} from "react";
import UserHeader from "./UserHeader";
import {connect} from "react-redux";
import {cancelPayment, getPayments} from "../../../redux/user/history-payments/actions";
import PAYMENTS from "../../../constans/payments";
import PROVIDERS from "../../../constans/payments";
import ReactDOM from "react-dom";
import Check from "./payments/Check";
import MomentDate from "../MomentDate";
import {Loader} from "semantic-ui-react";

class UserPayments extends Component {
    types = {
        [PAYMENTS.T_IN]  : 'Пополнение',
        [PAYMENTS.T_OUT] : 'Выплата',
        [PAYMENTS.T_DEL] : ''
    };

    methods = {
        [PAYMENTS.M_CASH]        : 'Касса',
        [PAYMENTS.M_ERIP]        : 'ЕРИП',
        [PAYMENTS.M_EASYPAY]     : 'EasyPay',
        [PAYMENTS.M_BELARUSBANK] : 'Беларусбанк',
        [PAYMENTS.M_BELGAZBANK]  : 'Белгазпромбанк',
        [PAYMENTS.M_NEW_ERIP]    : 'Банк',
        [PAYMENTS.M_EASYPAY_NEW] : 'EasyPay',
        [PAYMENTS.M_QIWI]        : 'QIWI',
        [PAYMENTS.M_MOBILE]      : 'Моб. тел.',
    };

    statuses = {
        [PAYMENTS.S_ORDERED]  : 'Заказано',
        [PAYMENTS.S_RESOLVED] : 'Подтверждено',
        [PAYMENTS.S_REPAID]   : 'Выплачено',
        [PAYMENTS.S_RETURN]   : 'Отменено',
        [PAYMENTS.S_DURING]   : 'В процессе',
    };

    componentWillMount() {
        this.props.onGetPayments(4);
    }

    getInfo(payment) {
        const myWindow = window.open('', 'print check', 'width=780, height=450');
        myWindow.onload = () => {
            const div = myWindow.document.createElement('div'),
                    body = myWindow.document.body;

            body.style.background = '#F7F7F7';
            body.style.margin = '0';
            ReactDOM.render(<Check payment={payment}/>, div);
            body.insertBefore(div, body.firstChild);
        };
    }

    cancelPayment(payment_id) {
        this.props.onPaymentCancel(payment_id);
    }

    render() {
        const paymentsStorage = this.props.payments;
        const {payments, cancel} = paymentsStorage;

        return (
            <div className="user-page">
                <div className="payments-operation">
                    <UserHeader text={'История платежей'}/>
                    {/*лоадер добавить       */}
                    <div className="body">
                        <table>
                            <thead>
                            <tr>
                                <th className="time">Время</th>
                                <th className="action">Операция</th>
                                <th className="amount">Сумма</th>
                                <th className="method">Метод</th>
                            </tr>
                            </thead>
                            <tbody>
                            {payments.map((payment) => {
                                    const json = payment.json !== "" && payment.json !== undefined ? JSON.parse(payment.json) : {};

                                    return (
                                        <tr key={payment.id} >
                                            <td className="time">
                                                <MomentDate date={payment.time} isFormatDate={true}/>
                                            </td>
                                            <td className="action">
                                                <span>{this.types[parseInt(payment.type)]}</span>
                                                <span className="cl-gray">
                                                    {parseInt(payment.type) !== PAYMENTS.T_IN && <span className={"_" + payment.status}>{`(${this.statuses[parseInt(payment.status)]})`}</span>}
                                                    {parseInt(payment.type) !== PAYMENTS.T_IN && parseInt(payment.status) === PAYMENTS.S_REPAID &&
                                                    <span className="info-link" onClick={this.getInfo.bind(this, payment)}>Информация</span>}
                                                    {parseInt(payment.status) === PAYMENTS.S_ORDERED &&
                                                    <span className="info-link" onClick={this.cancelPayment.bind(this, payment.id)}>Отменить</span>}
                                                    {/*показываем сообщения при отмене выплаты*/}
                                                    {parseInt(payment.status) === PAYMENTS.S_ORDERED && cancel.hasOwnProperty('messages') &&
                                                    <span className="error">{cancel.messages}</span>}
                                                </span>
                                            </td>
                                            <td className="amount">{payment.amount} {payment.currency}</td>
                                            <td className="method">
                                                {this.methods[parseInt(payment.method)]}
                                                {+payment.method === 13 && <span>&nbsp;{PROVIDERS[+json.provider]} {json.phone}</span>}
                                            </td>
                                    </tr>);
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        payments : state.user.history_payments
    }),
    dispatch => ({
        onGetPayments   : (period) => dispatch(getPayments(period)),
        onPaymentCancel : (payment_id) => dispatch(cancelPayment(payment_id))
    }),
)(UserPayments);

import React from "react";
import OrderForm from "./form/OrderForm";
import Xhr from "../../../../helpers/Xhr";
import TakeMoneyHeader from "./TakeMoneyTitle";


class BelinvestCash extends OrderForm {
    static defaultProps = {
        minAmount : 10
    };

    state = {
        amount : this.props.minAmount,
        toPay  : this.props.minAmount * 0.96,
        nalog  : this.props.minAmount * 0.04,
        phone  : ''
    };

    onSubmit() {
        this.clickForm = true;
        this.forceUpdate();
        const data = {
            amount : this.state.amount,
            phone  : this.state.phone
        };

        if ( !this.hasErrors ) {
            console.log('типо нет ошибок', data);
            // Xhr.cashOutInvestbank(data).then((resp) => {
            //     this.setState({
            //         messages : resp.messages
            //     });
            // });
        }
    }

    render() {
        return (
            <div className="take-money take-money-operation__cash">
                <TakeMoneyHeader text={'Заказать на снятие денег наличными в Белинвестбанке'}>
                    <img className={`belivest`} src={require('../../../../assets/images/belinvestbank.svg')} alt="visa"/>
                </TakeMoneyHeader>
                <div className="body take-money__body">
                    <div className={'take-money__attention attention-data'}>
                        <p className="info">Минимальная сумма для вывода - 10 BYN</p>
                    </div>
                    {/*Сумма заказа*/}
                    {this.getAmountRow()}

                    {/*Сумма к выплате*/}
                    {this.getToPayRow()}

                    {/*Налог*/}
                    {this.getNalogRow()}

                    {/*Номер телефона*/}
                    {this.getPhoneRow()}

                    {this.getOrderButton()}

                    {this.state.messages !== '' &&
                    <div className="description__order-item">
                        <div></div>
                        <div className="message message-error active">{this.state.messages}</div>
                        <div></div>
                    </div>}
                </div>
            </div>
        );
    }
}

export default BelinvestCash;

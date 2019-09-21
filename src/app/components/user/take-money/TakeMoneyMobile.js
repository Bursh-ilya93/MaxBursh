import React, {Component} from "react";
import OrderForm from "./form/OrderForm";
import Xhr from "../../../../helpers/Xhr";
import TakeMoneyHeader from "./TakeMoneyTitle";


class ByMobile extends OrderForm {
    static defaultProps = {
        minAmount : 1,
        maxAmount : 50.00
    };

    providerOptions = [
             {text: 'MTS', value: '100', key: '100'},
             {text: 'Velcom', value: '101', key: '101'},
             {text: 'Life', value: '102', key: '102'},
    ];

    state = {
        amount   : this.props.minAmount,
        toPay    : this.props.minAmount * 0.96,
        nalog    : this.props.minAmount * 0.04,
        phone    : '',
        providerOptions: this.providerOptions,
        selectedProvider : null
    };

    onSubmit() {
        this.clickForm = true;
        this.forceUpdate();
        if (this.hasErrors ) {return;}
        const data = {
            amount   : this.state.amount,
            phone    : this.state.phone,
            provider : this.state.provider
        };

        if ( this.state.amount > this.props.maxAmount ) {
            alert(`Максимальная сумма заказа - ${this.props.maxAmount} BYN!`);
            return;
        }

        console.log('типо нет ошибок', data);

        // Xhr.cashOutMobile(data).then((resp) => {
        //     this.setState({
        //         messages : resp.messages
        //     });
        // });
    }

    render() {
        return (
            <div className="take-money take-money-operation__cash">
                <TakeMoneyHeader text={'Заказ на снятие денег ППС'}>
                    <img className={`mts`} src={require('../../../../assets/images/mts.svg')} alt="visa"/>
                    <img className={`velcom`} src={require('../../../../assets/images/velcom.svg')} alt="visa"/>
                    <img className={`life`} src={require('../../../../assets/images/life.svg')} alt="visa"/>
                </TakeMoneyHeader>
                <div className="body take-money__body">
                    <div className={'take-money__attention attention-data'}>
                        <p className="info">Минимальная сумма для вывода - 1 BYN</p>
                    </div>
                    {/*Сумма заказа*/}
                    {this.getAmountRow()}

                    {/*Сумма к выплате*/}
                    {this.getToPayRow()}

                    {/*Налог*/}
                    {this.getNalogRow()}

                    {/*Провайдер*/}
                    {this.getProviderRow()}

                    {/*Номер телефона*/}
                    {this.getPhoneRow()}

                    {this.getOrderButton()}

                    {this.state.messages !== '' &&
                    <div className="wrap-input">
                        <div></div>
                        <div className="message message-error active">{this.state.messages}</div>
                        <div></div>
                    </div>}
                </div>
            </div>
        );
    }
}

export default ByMobile;

import React, {Component} from "react";
import TakeMoneyHeader from "./TakeMoneyTitle";
import OrderForm from "./form/OrderForm";
import Xhr from "../../../../helpers/Xhr";

class Cash extends OrderForm {
    cashes = [
        {
            id      : 1003,
            city    : "г.Брест",
            address : "ул. Дзержинского, д. 50, к. 15"
        },
        {
            id      : 1017,
            city    : "г.Витебск",
            address : "ул. Замковая, 5/2"
        },
        {
            id      : 1004,
            city    : "г.Гродно",
            address : "пр. Клецкова, д. 21б пом. 23/2"
        },
        {
            id      : 1007,
            city    : "г.Гомель",
            address : "ул. Красноармейская 7, помещение 7"
        },
        {
            id      : 1008,
            city    : "г.Бобруйск",
            address : "ул. Ульяновская д. 70Б"
        },
        {
            id      : 1009,
            city    : "г.Барановичи",
            address : "ул. Гагарина д. 2"
        },
        {
            id      : 1013,
            city    : "г.Могилев",
            address : "пер. Пожарный, 11 (2-й этаж)"
        },
        {
            id      : 1014,
            city    : "г.Минск",
            address : "пр-т Независимости, 179А (здание ТЦ \"Спектр\", всего в нескольких шагах от ст. метро \"Уручье\")"
        },
        {
            id      : 1015,
            city    : "г.Мозырь",
            address : "ул. Пролетарская, 81"
        },
        {
            id      : 1016,
            city    : "г.Новополоцк",
            address : "ул. Молодежная, 169/1-1"
        }
    ];

    static defaultProps = {
        minAmount : 1
    };

    state = {
        selectedCash : null,
        amount       : this.props.minAmount,
        toPay        : this.props.minAmount * 0.96,
        nalog        : this.props.minAmount * 0.04,
        cashOptions  : this.cashes.map(c => ({text: `${c.city} ${c.address}`, value: c.id, key: c.id})),
        messages     : ''
    };

    onSubmit() {
        this.clickForm = true;
        this.forceUpdate();
        if ( this.hasErrors ) {return}
        const data = {
            amount : this.state.amount,
            cash   : this.state.selectedCash
        };

        console.log('типо нет ошибок', data);

        // Xhr.cashOut(data).then((resp) => {
        //     this.setState({
        //         messages : resp.messages
        //     });
        // });
    }

    render() {
        return (
            <div className="take-money take-money-operation__cash">
                <TakeMoneyHeader text={'Заказ на снятие денег ППС'}>
                    <img className={`pps`} src={require('../../../../assets/images/logo.svg')} alt="visa"/>
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

                    {/*ППС*/}
                    {this.getPpsRow()}

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

export default Cash;

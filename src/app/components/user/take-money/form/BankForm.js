import React from "react";
import OrderForm from "./OrderForm";
import Xhr from "../../../../../helpers/Xhr";

class FormByBank extends OrderForm {
    static defaultProps = {
        minAmount : 10
    };

    setDefaultState = (props) => ({
        selectedCash   : null,
        amount         : props.minAmount,
        toPay          : props.minAmount * 0.96,
        nalog          : props.minAmount * 0.04,

        bank           : props.bank,
        officesOptions : props.bank.offices.map(item => ({key: item.id, value: item, text: `${item.id} ${item.name}`})),
        selectedOffice : {
            mfo: '',
            unn: '',
        },

        selectedType   : {id: ''},
        typesOptions   : props.bank.type.map(item => ({key: item.id, text: item.name, value: item})),
        messages       : ''
    });

    state = {
        ...this.setDefaultState(this.props)
    };

    componentWillReceiveProps(nextProps, nextContext) {
        const {bank} = nextProps;

        if (JSON.stringify(bank) !== JSON.stringify(this.props.bank)) {
            this.setState({
                ...this.setDefaultState(nextProps)
            });
        }
    }

    onSubmit = () => {
        this.forceUpdate();
        this.clickForm = true;
        if (this.hasErrors ) {return }

        const {bank} = this.props;
        const {selectedOffice, selectedType} = this.state;

        const data = {
            amount     : this.state.amount,
            bank       : 1,
            mfo        : selectedOffice.mfo,
            unn        : selectedOffice.unn,
            account    : this.state.iban,
            type       : selectedType.id,
            numberMail : this.state.phone,
            bankId     : bank.id
        };

        console.log('типо нет ошибок', data);

        // Xhr.bankOut(data).then((resp) => {
        //     this.setState({
        //         messages : resp.messages
        //     });
        // });
    };

    render() {

        return (
            <div className="description__order">
                {/*Сумма заказа*/}
                {this.getAmountRow()}

                {/*Сумма к выплате*/}
                {this.getToPayRow()}

                {/*Налог*/}
                {this.getNalogRow()}

                {/*Оффис*/}
                {this.getNumberOffice()}

                {/*Мфо*/}
                {this.getMfoBankRow()}

                {/*Унн*/}
                {this.getUnnBankRow()}

                {/*Номер счета (IBAN) в банке*/}
                {this.getAccountNumberBank()}

                {/*Номер счета (IBAN) в банке*/}
                {this.getTypeAccount()}

                {/*Телефон*/}
                {this.getPhoneRow()}

                {this.getOrderButton()}

                {this.state.messages !== '' &&
                <div className="wrap-input">
                    <div className="message message-error active">{this.state.messages}</div>
                </div>}
            </div>
        );
    }
}

export default FormByBank;
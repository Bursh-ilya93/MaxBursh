import React, {Component} from "react";

class Check extends Component {
    render() {
        const logo = {
            margin     : "auto",
            marginTop  : "15px",
            display    : 'block'
        };
        const check = {
            padding    : '20px',
            fontFamily : 'Roboto, sans-serif'
        };
        const title = {
            fontWeight : 'bold',
            fontSize   : 24,
            color      : '#129A48',
            width      : '100%',
            textAlign  : 'center'
        };
        const pStyle = {
            margin     : '15px',
            fontSize   : '14px',
        };

        const {payment} = this.props;

        const amount = (payment.amount * 1.00).toFixed(2);
        const nalog = (payment.amount * 0.04).toFixed(2);
        const toPay = (payment.amount * 0.96).toFixed(2);

        return (
            <div style={check}>
                <img style={logo} src={require('../../../../assets/images/logo-check.png')} alt="logo"/>
                <p style={title}>Документ, подтверждающий выплату</p>
                <div>
                    <p style={pStyle}>ООО "Финансово-инвестиционная компания "ИНХО"</p>
                    <p style={pStyle}>УНП 191318808</p>
                </div>
                <div>
                    <p style={pStyle}>Выплата выигрыша</p>
                    <p style={pStyle}>№ платежного поручения (транзакции) {payment.id}</p>
                    <p style={pStyle}>Сумма выигрыша {amount} рублей</p>
                    <p style={pStyle}>Сумма подоходного налога {nalog} рублей</p>
                    <p style={pStyle}>Сумма к выплате {toPay} рублей</p>
                    <p style={pStyle}>ФИО (участника букмекерской игры) </p>
                </div>
            </div>
        );
    }
}

export default Check;
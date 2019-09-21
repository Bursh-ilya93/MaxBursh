import OrderForm from "./form/OrderForm";
import React from "react";
import TakeMoneyHeader from "./TakeMoneyTitle";
import Xhr from "../../../../helpers/Xhr";

class Card extends OrderForm {
    static defaultProps = {
        minAmount : 30
    };

    state = {
        selectedCash   : null,
        amount         : this.props.minAmount,
        toPay          : this.props.minAmount * 0.96,
        nalog          : this.props.minAmount * 0.04,

        cards          : [],
        cardsOptions   : [],
        selectedCard  : null,
        messages       : ''
    };

    componentDidMount() {
        Xhr.getCardsList().then(resp => {
           const cards = resp.data.cards;

           this.setState({
               cards,
               cardsOptions: cards.map(c => ({text: c.cardNumber, value: c, key: c.id}))
           });
        });
    }

    onSubmit = () => {
        this.clickForm = true;
        this.forceUpdate();
        if (this.hasErrors) {return}
        const {amount, selectedCard} = this.state;
        const data = {
            amount     : amount,
            card       : selectedCard.id,
            cardNumber : selectedCard.cardNumber

        };

        if ( !this.hasErrors ) {
            console.log('типо нет ошибок', data);
            // Xhr.cardOut(data).then((resp) => {
            //     this.setState({
            //         messages : resp.messages
            //     });
            // });
        }
    };

    render() {
        return(
            <div className="take-money take-money-operation__card">
                 <TakeMoneyHeader text={'Заказ на снятие денег Visa/MasterCard (Быстрые выплаты)'}>
                     <img className={`visa`} src={require('../../../../assets/images/visa.svg')} alt="visa"/>
                     <img className={`visa`} src={require('../../../../assets/images/mastercard.svg')} alt="mastercard"/>
                 </TakeMoneyHeader>
                <div className="body take-money__body">
                    <div className={'take-money__attention attention-data'}>
                         <div>
                             <p className="info">Минимальная сумма заказа - 30 BYN</p>
                             <p className="info">Максимальная сумма заказа зависит от типа банковской карты:</p>
                         </div>
                         <div>
                             <p className="info">Visa:</p>
                             <p className="info">Не более 1000 BYN на одну операцию;</p>
                             {/*<p className="info">Не более 4000 BYN в сутки;  </p>*/}
                             <p className="info">Не более 6000 BYN суммарно за 4 суток.</p>
                         </div>
                         <div>
                             <p className="info">MasterCard: Не более 5000 BYN на одну операцию.</p>
                         </div>
                    </div>
                    {/*Сумма заказа*/}
                    {this.getAmountRow()}

                    {/*Сумма к выплате*/}
                    {this.getToPayRow()}

                    {/*Налог*/}
                    {this.getNalogRow()}

                    {/*Карты*/}
                    {this.getCardsRow()}

                    {this.getOrderButton()}

                    {this.state.messages !== '' &&
                    <div className="description__order-item">
                        <div></div>
                        <div className="message message-error active">{this.state.messages}</div>
                        <div></div>
                    </div>}
                </div>

            </div>
        )
    }
}

export default Card;


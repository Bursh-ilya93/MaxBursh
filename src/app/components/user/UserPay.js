import React from "react";
import UserHeader from "./UserHeader";
import {Checkbox, Loader} from "semantic-ui-react";
import Xhr from "../../../helpers/Xhr";
import {Link} from "react-router-dom";
import ReactSVG from "react-svg";

class UserPay extends React.Component {
    state = {
        acceptRules : false,
        amount      : 0,
        messages    : '',
        fetching    : false,
        error       : false,
    };

    changeAmount(value) {
        const amount = value;
        const messages = [];
        let error = false;
        if ( +amount < 2 || amount === '' ) {
            messages.push('Минимальная сумма пополнения - 2 BYN!');
            error = true;
        }
        else {
            messages.splice(0, messages.length);
            error = false;
        }

        this.setState({
            error    : error,
            messages : messages,
            amount   : value
        });
    }

    onSubmit(event) {
        event.preventDefault();

        if (this.state.error) {
            return;
        }
        this.setState({fetching : !this.state.fetching});
        Xhr.cashIn(this.state.amount).then((resp) => {
            if ( resp.status === 'ok' && resp.hasOwnProperty('data') ) {
                return document.location.href = resp.data.link;
            }

            this.setState({
                messages : resp && resp.messages || '',
                fetching : false
            });
        });
    }

    render () {
        return (
            <div className="user-page">
                <div className="pay-operation">
                    <UserHeader text={'Пополнить счёт'}/>
                    <div className={'body'}>
                        <div className={'body__row'}>
                            <h3 className={'body__col-1'}>Пополнить счет через Visa/MasterCard</h3>
                            <div className={'body__col-2 images'}>
                                <ReactSVG src={require('../../../assets/images/visa.svg')}/>
                                <ReactSVG src={require('../../../assets/images/mastercard.svg')}/>
                            </div>
                        </div>
                        <form onSubmit={(e) => this.onSubmit(e)}>
                            <div className={'body__row'}>
                                <label className={'body__col-1'}>Сумма:</label>
                                <input
                                    className={'input body__col-2'}
                                    name="XML"
                                    type="text"
                                    value={this.state.amount == 0 ? '' : this.state.amount}
                                    onChange={(e) => this.changeAmount(e.target.value)}
                                />
                            </div>
                            <div className={'body__row'}>
                                <Checkbox
                                    name="acceptRules"
                                    checked={this.state.acceptRules}
                                    onChange={() => this.setState(prevState => ({acceptRules: !prevState.acceptRules}))}
                                    label={'Я подтверждаю, что данная карта зарегистрирована на мое имя:'}
                                />
                            </div>
                            <div className={'body__row'}>
                                <Link className={'body__col-1 link'} to={{pathname : 'page/payments'}}>Другие способы пополнения</Link>
                                <button disabled={!this.state.acceptRules} className="button body__col-2">Пополнить</button>
                            </div>
                        </form>
                        {this.state.messages.length > 0 &&
                        <div className="body__row">
                            <i className="warning body__col-1">
                                {this.state.messages}
                            </i>
                        </div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default UserPay;
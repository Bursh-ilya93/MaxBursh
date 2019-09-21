import React, {Component} from "react";
import MoneyInput from "./MoneyInput";
import MaskedInput from "react-maskedinput";
import {Dropdown} from "semantic-ui-react";

class OrderForm extends Component {
	clickForm = false;
	hasErrors = true;
	requiredText = 'Поле обязательно для заполнения!';

	constructor(props) {
		super(props);
	}

	isEmpty(data) {
		if ( data == undefined || data === '' || data === null || data === 0 ) {
			return this.hasErrors = true;
		}

		return this.hasErrors = false;
	}

	isAmountValid() {
		if ( this.state.amount < this.props.minAmount ) {
			this.hasErrors = true;
			return false;
		}

		if ( this.props.maxAmount !== undefined && this.state.amount > this.props.maxAmount ) {
			this.hasErrors = true;
			return false;
		}

		this.hasErrors = false;
		return true;
	}

	amountChange(values) {
		this.setState({
			amount : values.value,
			toPay  : values.value * 0.96,
			nalog  : values.value * 0.04
		});
	}

	amountBlur() {
		if ( this.state.amount < this.props.minAmount ) {
			this.setState({
				amount : this.props.minAmount
			});
		}
	}

	inputChange(e) {
		const stateChange = {
			[e.target.name] : e.target.value
		};

		this.setState({...this.state, ...stateChange})
	}

	dropdownChange = (name, data) => {
		this.setState({
			[name]: data
		});
	};

	// ПОЛЯ
	getAmountRow() {
		return (
			<div className="wrap-input">
				<label htmlFor="amount">Сумма заказа:</label>
				<MoneyInput name="amount"
							onBlur={this.amountBlur.bind(this)}
							onValueChange={this.amountChange.bind(this)}
							value={this.state.amount}/>
				<p className={`message message-error attention ${this.clickForm && 'active'}`}>
					{this.isEmpty(this.state.amount) && this.requiredText}
					{!this.isAmountValid() && `Минимальная сумма заказа ${this.props.minAmount} BYN!`}
					{!this.isAmountValid() && this.props.maxAmount !== undefined && this.state.amount > this.props.maxAmount && `Максимальная сумма заказа ${this.props.maxAmount} BYN!`}
				</p>
			</div>
		);
	}

	getToPayRow() {
		return (
			<div className="wrap-input">
				<label>Сумма к выплате: </label>
				<MoneyInput name="toPay" value={this.state.toPay} disabled={true}/>
			</div>
		);
	}

	getNumberOffice() {
		return (
			<div className="wrap-input">
				<label>Номер филиала: </label>
				<Dropdown
					onChange={(e, data) => this.dropdownChange(data.name, data.value)}
					name={'selectedOffice'}
					className={'input-filter'}
					options={this.state.officesOptions}
				/>
				<p className={`message message-error attention ${this.clickForm && 'active'}`}>
                    {this.isEmpty(this.state.selectedOffice) && this.requiredText}
                </p>
			</div>
		);
	}

	getMfoBankRow() {
		return (
			<div className="wrap-input">
				<label>МФО банка: </label>
				<input name="mfo" value={this.state.selectedOffice.mfo} disabled={true}/>
			</div>
		);
	}

	getUnnBankRow() {
		return (
			<div className="wrap-input">
				<label>Унн банка: </label>
				<input name="mfo" value={this.state.selectedOffice.unn} disabled={true}/>
			</div>
		);
	}

	getNalogRow() {
		return (
			<div className="wrap-input">
				<label>Налог: </label>
				<MoneyInput name="nalog" value={this.state.nalog} disabled={true}/>
			</div>
		);
	}

	getPhoneRow() {
		return (
			<div className="wrap-input">
				<label htmlFor="phone">Номер телефона: </label>
				<MaskedInput id="phone"
					name="phone"
					mask="(11) 111-11-11"
					onChange={this.inputChange.bind(this)}/>
				<p className={`message message-error attention ${this.clickForm && 'active'}`}>
					{this.isEmpty(this.state.phone) && this.requiredText}
				</p>
			</div>
		);
	}

	getAccountNumberBank() {
		return(
			<div className="wrap-input">
				<label htmlFor="iban">Номер счета (IBAN) в банке:</label>
				<MaskedInput id="iban"
							 name="iban"
							 mask={`BY11${this.state.bank.ibanPrefix} #### #### #### #### ####`}
							 formatCharacters={{'A' : null}}
							 size="28"
							 onChange={this.inputChange.bind(this)}
							 value={this.state.iban}
				/>
				<p className={`message message-error attention ${this.clickForm && 'active'}`}>
					{this.isEmpty(this.state.iban) && this.requiredText}
				</p>
			</div>
		)
	}

	getTypeAccount() {
		return (
			<div className="wrap-input">
				<label>Тип счёта: </label>
				<Dropdown
					onChange={(e, data) => this.dropdownChange(data.name, data.value)}
					name={'selectedType'}
					className={'input-filter'}
					options={this.state.typesOptions}
				/>
				<p className={`message message-error attention ${this.clickForm && 'active'}`}>
                    {this.isEmpty(this.state.selectedType) && this.requiredText}
                </p>
			</div>
		);
	}

	getPpsRow() {
		return (
			<div className="wrap-input">
				<label>ППС: </label>
				<Dropdown
					onChange={(e, data) => this.dropdownChange(data.name, data.value)}
					name={'selectedCash'}
					className={'input-filter'}
					options={this.state.cashOptions}
				/>
				<p className={`message message-error attention ${this.clickForm && 'active'}`}>
					{this.isEmpty(this.state.selectedCash) && this.requiredText}
				</p>
			</div>
		);
	}

	getCardsRow() {
		return (
			<div className="wrap-input">
				<label>Номер филиала: </label>
				<Dropdown
					onChange={(e, data) => this.dropdownChange(data.name, data.value)}
					name={'selectedCard'}
					className={'input-filter'}
					options={this.state.cardsOptions}
				/>
				<p className={`message message-error attention ${this.clickForm && 'active'}`}>
					{this.isEmpty(this.state.selectedCard) && this.requiredText}
				</p>
			</div>
		);
	}

	getProviderRow() {
		return (
			<div className="wrap-input">
				<label>Провайдер: </label>
				<Dropdown
					onChange={(e, data) => this.dropdownChange(data.name, data.value)}
					name={'selectedProvider'}
					className={'input-filter'}
					options={this.state.providerOptions}
				/>
				<p className={`message message-error attention ${this.clickForm && 'active'}`}>
					{this.isEmpty(this.state.selectedProvider) && this.requiredText}
				</p>
			</div>
		);
	}

	getOrderButton() {
		return (
			<div className="wrap-input">
				<label>&nbsp;</label>
				<button className='button' onClick={this.onSubmit.bind(this)}>
					Заказать на выплату
				</button>
			</div>
		);
	}

	onSubmit() {

	}
}

export default OrderForm;
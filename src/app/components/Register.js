import React, {Component} from "react";
import COUNTRIES from "../../constans/countries";
import ReCAPTCHA from "react-google-recaptcha";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import Button from 'react-validation/build/button';
import validator from 'validator';
import Xhr from "../../helpers/Xhr";
import {Header} from "semantic-ui-react";
import Breadcrumbs from "./Breadcrumbs";
import UploadFile from "./user/UploadFile";

class Register extends Component {
	state = {
		email       : '',
		password    : '',
		last_name   : '',
		first_name  : '',
		middle_name : '',
		country     : 'Беларусь',
		address     : '',
		acceptRules : false,
		recaptcha   : null,
		phone       : '',
		messages    : []
	};

	acceptRules() {
		this.setState({
			acceptRules : !this.state.acceptRules
		});
	}

	onCaptchaChange(response) {
		console.log(response);

		this.setState({
			recaptcha : response
		});
	}

	inputChange(e) {
		const value = e.target.value;
		const name = e.target.name;

		this.setState({[name] : value});
	}

	errorBox(message) {
		return <div className="error">{message}</div>
	}

	required(value) {
		if ( validator.isEmpty(value) ) {
			return this.errorBox('Поле обязательно для заполнения!');
		}
	};

	email(value) {
		if ( !validator.isEmail(value) ) {
			return this.errorBox('Введите корректный E-mail!');
		}
	};

	password(value) {
		if ( value.toString().trim().length < 6 ) {
			return this.errorBox('Пароль должен быть не менее 6 символов!')
		}
	}

	fio(value) {
		if ( value.toString().trim().length < 2 ) {
			return this.errorBox('Не менее 2 символов!');
		}
	}

	phone(value) {
		if ( value.toString().trim().length > 0 && (value.toString().trim().length > 18 || value.toString().trim().length < 6) ) {
			return this.errorBox('От 6 до 18 символов!');
		}
	}

	onSubmit(event) {
		event.preventDefault();
		this.form.validateAll();
		const values = this.form.getValues();
		const data = {...values, currency : 'BYN'};

		console.log('not validayte');

		Xhr.register(data).then((resp) => {
			if ( resp.code === 200 ) {
				const textSuccess = 'Ваш аккаунт успешно зарегистрирован. Для его активации пройдите по ссылке, отправленной на Ваш электронный адрес.';
				alert(textSuccess);

				this.setState({
					messages : [textSuccess]
				});
			}
			else {
				this.setState({
					messages : ['Ошибка']
				});
			}
		});
	}

	getBreadcumbs = () => {
		let data = [];
		data.push({key : '/', value : 'Главная'});
		data.push({key : '', value : 'Регистрация'});
		return data;
	};

	render() {
		const countries = COUNTRIES;

		return (
			<div className="register">
				<Breadcrumbs data={this.getBreadcumbs()}/>
				<Header className={`register__title-site`}>Регистрация</Header>
				<div className="register__data">
					<Form ref={c => { this.form = c }} onSubmit={this.onSubmit.bind(this)}>
						{/*E-mail*/}
						<div className="register__data-input_row">
							<div className="data">
								<Input type="text"
									   className={'input'}
								       name="email"
								       id="email"
								       placeholder="E-mail *"
								       validations={[this.required.bind(this), this.email.bind(this)]}
								       onChange={this.inputChange.bind(this)}/>
							</div>
							<div className="comment">На Ваш e-mail будет выслано письмо для активации аккаунта</div>
						</div>

						{/*Пароль*/}
						<div className="register__data-input_row password">
							<div className="data">
								<Input type="password"
								       name="password"
								       id="password"
								       className={`password`}
								       placeholder="Пароль *"
								       onChange={this.inputChange.bind(this)}
								       validations={[this.required.bind(this), this.password.bind(this)]}/>
							</div>
							<div className="comment">Используйте буквы английского алфавита и цифры для максимальной защиты аккаунта.</div>
						</div>

						{/*Фамилия*/}
						<div className="register__data-input_row lastname">
							<div className="data">
								<Input type="text"
									   className={'input'}
								       id="lastname"
								       name="last_name"
								       placeholder="Фамилия *"
								       onChange={this.inputChange.bind(this)}
								       validations={[this.required.bind(this), this.fio.bind(this)]}/>
							</div>
							<div className="comment">
								{/*<div className={'attention-data'}>*/}
								{/*	Для успешной идентификации личности при выплатах необходимы ваши фамилия, имя и отчество полностью,*/}
								{/*	на русском языке, а так же просим загрузить скан/фотографию 31,33 страниц паспорта.*/}
								{/*</div>*/}
								{/*<UploadFile/>*/}
							</div>
						</div>

						{/*Имя*/}
						<div className="register__data-input_row">
							<div className="data">
								<Input type="text"
									   className={'input'}
								       id="firstname"
								       name="first_name"
								       placeholder="Имя *"
								       onChange={this.inputChange.bind(this)}
								       validations={[this.required.bind(this), this.fio.bind(this)]}/>
							</div>
						</div>

						{/*Отчество*/}
						<div className="register__data-input_row">
							<div className="data">
								<Input type="text"
									   className={'input'}
								       id="middlename"
								       name="middle_name"
								       placeholder="Отчество *"
								       onChange={this.inputChange.bind(this)}
								       validations={[this.required.bind(this), this.fio.bind(this)]}/>
							</div>
						</div>

						{/*Страна*/}
						<div className="register__data-input_row">
							<div className="data">
								<Select id="country"
										className={'input'}
								        value={this.state.country}
								        name="country"
								        placeholder="Страна *"
								        onChange={this.inputChange.bind(this)}
								        validations={[this.required.bind(this)]}>
										{countries.map((country, index) =>
											<option key={index} value={country}>{country}</option>)}
								</Select>
							</div>
						</div>

						{/*Город*/}
						<div className="register__data-input_row">
							<div className="data">
								<Input type="text"
									   className={'input'}
								       id="city"
								       name="address"
								       placeholder="Город *"
								       onChange={this.inputChange.bind(this)}
										validations={[this.required.bind(this)]}/>
							</div>
						</div>

						{/*Мобила*/}
						<div className="register__data-input_row mobile">
							<div className="data">
								<Input type="text"
									   className={'input'}
								       id="phone"
								       name="phone"
								       placeholder="Телефон *"
								       onChange={this.inputChange.bind(this)}
										validations={[this.phone.bind(this)]}/>
							</div>
							<div className="comment">
								<div><p>От 6 до 18 цифр (без знака +)</p></div>
								<div className="data checkbox accept-rules">
									<input type="checkbox"
									       name="acceptRules"
									       id="acceptRules"
									       checked={this.state.acceptRules}
									       onChange={this.acceptRules.bind(this)}/>

									<p className="test">
										Я подтверждаю достоверность
										указанных мною данных.
										Согласен с условиями
										и принимаю <a href="http://maxline.by/assets/files/rules-new.pdf?4">«Правила приема ставок»</a>
									</p>
								</div>
							</div>
						</div>
						<div className="register__data-captcha">
							<p>
								<ReCAPTCHA sitekey="6LdCrEcUAAAAAOA5n2VGCOaXzsXas5DRD6l9QJyK"
								           ref="recaptcha"
								           onChange={this.onCaptchaChange.bind(this)}/>
							</p>
						</div>

						<div className="register__data-buttons buttons">
							<Button
								disable={!this.state.acceptRules || !this.state.recaptcha}
								className={!this.state.acceptRules || !this.state.recaptcha ? 'disable' : ''} >Зарегистрироваться</Button>
							{/*{this.state.acceptRules && this.state.recaptcha !== null &&}*/}
							<div className="register__data-messages">
								{this.state.messages}
							</div>
						</div>
					</Form>
				</div>
			</div>
		)
	}
}

export default Register;
import validator from 'validator';
import moment from 'moment';

export default class Validate {
	_errors  = [];
	_balance = 0;
	_data    = {};

	constructor(data, balance = 0) {
		this.setData(data);
		this.setBalance(balance);
	}

	setData(data) {
		this._data = data;
	}

	getData(field = false) {
		if ( field ) {
			return this._data[field];
		}
		return this._data;
	}

	setBalance(data) {
		this._balance = data;
	}

	getBalance() {
		return this._balance;
	}

	setErrorData(error) {
		this._errors.push(error);
	}

	getErrorData() {
		return this._errors;
	}

	isNoNegative(field) {
		const value = this.getData(field);

		const data = {
			field
		};

		if (value < 0) {
			data.message ='Поле обязательно для заполнения или выбора';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	// поле обязательно для заполнения
	isRequire(field) {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( validator.isEmpty(!value ? '' : value.toString()) ) {
			data.message = 'Поле обязательно для заполнения или выбора';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	//Проверка даты для огроничения пользователя. не менее шести месяцев от текущей даты
	isValidDateSelfLimited(field) {
		const value          = this.getData(field);
		const minDateBlocked = moment().add(6, 'months').format('YYYY-MM-DD');

		const data = {
			field
		};

		if ( !moment(value).isSameOrAfter(minDateBlocked) ) {
			data.message = 'Дата ограничения пользователя должна быть минимум шесть месяцев от текущей';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	// Проверка даты
	isValidDate(field) {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !moment(value).isValid() ) {
			data.message = 'Поле должно содержать правильную дату';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	// поле содержит только цифры
	isNumber(field) {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !validator.isNumeric(!value ? '' : value.toString()) ) {
			data.message = 'Поле содержит только цифры';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	// поле содержит только цифры с точкой в денежном формате
	isNumberAmount(field) {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !validator.isNumeric(!value ? '' : value.toString().replace(/\./g, '')) ) {
			data.message = 'Поле содержит только цифры';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	// Поле должно содержать только латинские символы
	isAlpha(field) {
		const value = this.getData(field);

        const data = {
        	field
        };

        if ( /^[A-Za-z]+$/.test(value) === false ) {
        	data.message = 'Содержит только буквы латинского алфавита';
        	this.setErrorData(data);
        	return false;
        }
	}

	// поле содержит только цифры, буквы латинского алфавита
	isNumberAlpha(field) {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !validator.isAlphanumeric(!value ? '' : value.toString()) ) {
			data.message = 'Содержит только цифры и буквы (латинского алфавита)';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	// поле содержит только цифры в формате 1111 1111 1111 1111
	isNumberVisaCard(field) {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !validator.matches(!value ? '' : value.toString(), /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/) ) {
			data.message = 'Номер должен быть вида' + ' (1111 1111 1111 1111)';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	// поле содержит только цифры в формате 01/20
	isVisaCardExpiry(field) {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !validator.matches(!value ? '' : value.toString(), /^\d{2}\/\d{2}$/) ) {
			data.message = 'Номер должен быть вида' + ' 01/20';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	// поле содержит от 10 до 255 символов
	isVisaCardAddress(field) {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !validator.isLength(!value ? '' : value.toString(), {min : 10, max : 255}) ) {
			data.message = 'Поле должно содержать от ' + ' 10 - 255 ' + 'символов';
			this.setErrorData(data);
			return false;
		}

		if ( !validator.matches(!value ? '' : value.toString(), /^[\s\-_a-zA-Z0-9,.]{10,255}$/i) ) {
			data.message = 'Поле содержит только цифры и буквы (латинского алфавита)';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	// поле содержит формат номера телефона +375 (25) 123-45-67
	isPhone(field) {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !validator.matches(!value ? '' : value.toString(), /^\+\d{2,4}\s{1}?\(\d{2,4}\)\s{1}?\d{3}[\s\-]\d{2}[\s\-]\d{2}$/) ) {
			data.message = 'Номер должен быть вида' + ' +375251234567';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	// поле содержит от 6 до 100 символов
	isPassword(field) {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !validator.isLength(!value ? '' : value.toString(), {min : 6, max : 100}) ) {
			data.message = 'Поле должно содержать от ' + ' 6 - 100 ' + 'символов';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	isPasswordEquals(field, field_confirm) {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !validator.equals(value.toString(), this.getData(field_confirm).toString()) ) {
			data.message = 'Пароли не совпадают';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	isEmail(field) {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !validator.isEmail(!value ? '' : value.toString()) ) {
			data.message = 'Введён некорректный E-mail';
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	isMinimum(field, min, type = 'рублей') {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !validator.isFloat(!value ? '' : value.toString(), {min : min}) ) {
			data.message = `Минимальная сумма пополнения ${min} ${type}`;
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	isMaximum(field, max, type = 'рублей') {
		const value = this.getData(field);

		const data = {
			field
		};

		if ( !validator.isFloat(!value ? '' : value.toString(), {max : max}) ) {
			data.message = `Максимальная сумма пополнения ${max} ${type}`;
			this.setErrorData(data);
			return false;
		}

		return true;
	}

	// поле содержит только цифры, буквы латинского алфавита и обязательно для заполнения
	isNumberAlphaAndRequire(field) {
		return (this.isRequire(field) && this.isNumberAlpha(field))
	}

	// поле содержит только цифры и обязательно для заполнения
	isNumberAndRequire(field) {
		return (this.isRequire(field) && this.isNumber(field))
	}

	// поле содержит только цифры с точкой в денежном формате и обязательно для заполнения
	isNumberAmountAndRequire(field) {
		return (this.isRequire(field) && this.isNumberAmount(field))
	}

	// поле содержит только цифры с точкой в денежном формате max и min значение и обязательно для заполнения
	isNumberAmountAndMinimumAndRequire(field, value, type = 'BYN') {
		return (this.isRequire(field) && this.isNumberAmount(field) && this.isMinimum(field, value, type))
	}

	isNumberAmountAndMinMaxAndRequire(field, value, type = 'рублей') {
		return (this.isRequire(field) && this.isNumberAmount(field) && this.isMinimum(field, value, type) && this.isMaximum(field, 99.99, type))
	}


	// поле содержит формат номера телефона +375 (25) 123-45-67 и обязательно для заполнения
	isPhoneAndRequire(field) {
		return (this.isRequire(field));
			// && this.isPhone(field))
	}

	// поле содержит только цифры, пробелы, в формате 1111 1111 1111 1111 и обязательно для заполнения
	isNumberVisaCardAndRequire(field) {
		return (this.isRequire(field) && this.isNumberVisaCard(field))
	}

	// поле содержит только цифры, пробелы, в формате 01/20 и обязательно для заполнения
	isVisaCardExpiryAndRequire(field) {
		return (this.isRequire(field) && this.isVisaCardExpiry(field))
	}

	// поле содержит от 10 до 255 символов и обязательно для заполнения
	isVisaCardAddressAndRequire(field) {
		return (this.isRequire(field) && this.isVisaCardAddress(field))
	}

	// проверка поля (новый пароль) для смены пароля и восстонавления пароля
	isValidPasswordAndRequire(field) {
		return (this.isRequire(field) && this.isPassword(field))
	}

	// проверка поля (повторите пароль) для смены пароля и восстонавления пароля
	isValidPasswordConfirmAndRequire(field, field_confirm) {
		return (this.isRequire(field) && this.isPasswordEquals(field, field_confirm))
	}
}
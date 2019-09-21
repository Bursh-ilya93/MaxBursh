import React, {Component} from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import validator from "validator";
import UserHeader from "./UserHeader";
import Xhr from "../../../helpers/Xhr";
import {Loader} from "semantic-ui-react";

class UserPassword extends Component {
    state = {
        form     : {
            csrf             : '',
            password         : '',
            password_confirm : '',
            password_current : '',
        },
        messages : '',
        fetching : false,
        status   : '',
    };

    componentWillMount() {
        Xhr.changePassword().then((resp) => this.setState({form : {...resp.data.form}}));
    }

    errorBox(message) {
        return <div className="error">{message}</div>
    }

    required(value) {
        if ( value === null || validator.isEmpty(value) ) {
            return this.errorBox('Поле обязательно для заполнения!');
        }
    };

    passEquals(value) {
        if ( value.toString().trim() !== this.state.form.password.toString().trim() ) {
            return this.errorBox('Пароли не совпадают!');
        }
    }

    minLength(value) {
        if ( value.toString().trim().length < 6 ) {
            return this.errorBox('Минимум 6 букв и/или цифр!')
        }
    }

    inputChange(e) {
        const stateChange = {
            [e.target.name] : e.target.value
        };

        this.setState({form : {...this.state.form, ...stateChange}});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({fetching : true});
        Xhr.changePasswordPost(this.state.form).then((resp) => this.setState({
            messages : resp.data.messages || '',
            status   : resp.status,
            fetching : false
        }))
    }


    render() {
        return (
            <div className="user-page">
                <div className="change-password">
                    <UserHeader text={'Изменение пароля'}/>
                    <Form ref={c => { this.form = c }} onSubmit={this.onSubmit.bind(this)}>
                        <div className="change-password">
                            <div className={'change-password__input'}>
                                <label>Текущий пароль</label>
                                <Input type="password"
                                       label='Текущий пароль'
                                       name="password_current"
                                       validations={[this.required.bind(this), this.minLength.bind(this)]}
                                       onChange={this.inputChange.bind(this)}
                                       value={this.state.form.password_current || ''}
                                 />
                            </div>
                            <div className={'change-password__input'}>
                                <label>Новый пароль</label>
                                <Input type="password"
                                       text='Новый пароль'
                                       name="password"
                                       validations={[this.required.bind(this), this.minLength.bind(this)]}
                                       onChange={this.inputChange.bind(this)}
                                       value={this.state.form.password || ''}
                                />
                            </div>
                            <div className={'change-password__input'}>
                                <label>Повторите пароль</label>
                                <Input type="password"
                                       label='Повторите пароль'
                                       name="password_confirm"
                                       validations={[this.required.bind(this), this.minLength.bind(this),
                                           this.passEquals.bind(this)]}
                                       onChange={this.inputChange.bind(this)}
                                       value={this.state.form.password_confirm || ''}
                                />
                            </div>
                            <div className={'change-password__input'}>
                                <label>&nbsp;</label>
                                <Button className="buttons__show button">Обновить пароль</Button>
                            </div>
                        </div>
                        <div className={`change-password__messages ${this.state.status === 'error' && 'error'}`}>
                            {this.state.fetching ? <Loader/> : this.state.messages}
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default UserPassword;
import React, {Component} from "react";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Button from 'react-validation/build/button';
import validator from "validator";
import Xhr from "../../../helpers/Xhr";
import {Loader} from "semantic-ui-react";
import UserHeader from "./UserHeader";
import Breadcrumbs from "../Breadcrumbs";

class UserForgot extends Component {
    state = {
        fetching    : false,
        forgotValue : '',
        response    : {}
    };

    changeForgotValue(e) {
        this.setState({
            forgotValue : e.target.value,
        });
    }

    errorBox(message) {
        return <div className="error">{message}</div>
    }

    required(value) {
        if ( validator.isEmpty(value) ) {
            return this.errorBox('Поле обязательно для заполнения!');
        }
    };

    recoveryPassword(e) {
        e.preventDefault();
        const data = {
            value : this.state.forgotValue
        };

        this.setState({fetching : true});
        Xhr.forgotPassword(data).then((resp) => this.setState({response : resp.data || '', fetching : false}));
    }

    getBreadcumbs = () => {
        let data = [];
        data.push({key : '/', value : 'Главная'});
        data.push({key : '', value : 'Восстановление пароля'});
        return data;
    };

    render() {
        return (
            <div className="full-page user-page">
                <div className={`user-page__main`}>
                    <div className={`user-page__main-left`}/>
                    <div className={`user-page__main-right`}>
                        <Breadcrumbs data={this.getBreadcumbs()}/>
                        <div className="content">
                            <div className="user-forgot">
                                <UserHeader text={'Восстановление пароля'}/>
                                <div className="content">
                                    <Form ref={c => { this.form = c }} onSubmit={this.recoveryPassword.bind(this)}>
                                        <div className="wrap-input">
                                            <label htmlFor="forgot-input">
                                                Для смены пароля укажите свой Номер счета, Логин или E-mail, указанный при регистрации:
                                            </label>
                                            <Input id="forgot-input" type="text" placeholder="Номер счета, логин или e-mail"
                                                   validations={[this.required.bind(this)]}
                                                   onChange={this.changeForgotValue.bind(this)}
                                                   value={this.state.forgotValue}/>
                                            <div className="error-request">{this.state.response.messages}</div>
                                        </div>
                                        <div className="wrap-input">
                                            <label>&nbsp;</label>
                                            <Button className="button">Восстановить</Button>
                                        </div>
                                        <div className="wrap-input">{this.state.fetching && <Loader/>}</div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserForgot;
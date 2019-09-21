import React, {Component} from "react";
import Breadcrumbs from "../Breadcrumbs";
import {Link} from "react-router-dom";
import UserInfo from "./UserInfo";
import {Redirect, Route, Switch} from "react-router";
import HistoryOperations from "./HistoryOperations";
import HistoryPayments from "./HistoryPayments";
import HistorySession from "./HistorySession";
import UserPassword from "./UserPassword";
import UserSettings from "./UserSettings";
import UserCashBack from "./UserCashBack";
import HistoryBonus from "./HistoryBonus";
import UserPay from "./UserPay";
import UserData from "./UserData";
import UserTakeMoney from "./UserTakeMoney";
import UserForgot from "./UserResetPassword";

const Menu = () => {
    const [details] = window.location.href.split('/').reverse();

    return (
        <div className="about-page__menu page__menu">
            <Link className={`page__menu-item ${details === 'history' || details === 'user' ? 'active' : ''}`} to={`/user/history`}>История операций</Link>
            <Link className={`page__menu-item ${details === 'payments' ? 'active' : ''}`} to={`/user/payments`}>Платежи</Link>
            <Link className={`page__menu-item ${details === 'data' ? 'active' : ''}`} to={`/user/data`}>Личные данные</Link>
            <Link className={`page__menu-item ${details === 'pay' ? 'active' : ''}`} to={`/user/pay`}>Пополнить счёт</Link>
            <Link className={`page__menu-item ${details === 'take-money' ? 'active' : ''}`} to={`/user/take-money`}>Заказать на выплату</Link>
            <Link className={`page__menu-item ${details === 'password' ? 'active' : ''}`} to={`/user/password`}>Изменение пароля</Link>
            <Link className={`page__menu-item ${details === 'settings' ? 'active' : ''}`} to={`/user/settings`}>Настройки аккаунта</Link>
            <Link className={`page__menu-item ${details === 'history-session' ? 'active' : ''}`} to={`/user/history-session`}>История сеансов</Link>
            <Link className={`page__menu-item ${details === 'history-bonus' ? 'active' : ''}`} to={`/user/history-bonus`}>История бонусных зачислений</Link>
            <Link className={`page__menu-item ${details === 'cash-back' ? 'active' : ''}`} to={`/user/cash-back`}>Cashback</Link>
        </div>
    )
};


class UserArea extends Component {
    getBreadcumbs = () => {
        let data = [];
        data.push({key : '/', value : 'Главная'});
        data.push({key : '', value : 'Личный кабинет'});
        return data;
    };

    render() {
        return (
            <div className="full-page user-page">
                <div className={`user-page__main`}>
                    <div className={`user-page__main-left`}>
                        <UserInfo/>
                        <Menu details={this.props.match.params.details}/>
                    </div>
                    <div className={`user-page__main-right`}>
                        <Breadcrumbs data={this.getBreadcumbs()}/>
                        <Switch>
                            <Route path={`/user/history`} component={HistoryOperations}/>
                            <Route path={`/user/payments`} component={HistoryPayments}/>
                            <Route path={`/user/history-session`} component={HistorySession}/>
                            <Route path={`/user/password`} component={UserPassword}/>
                            <Route path={`/user/settings`} component={UserSettings}/>
                            <Route path={`/user/cash-back`} component={UserCashBack}/>
                            <Route path={`/user/history-bonus`} component={HistoryBonus}/>
                            <Route path={`/user/pay`} component={UserPay}/>
                            <Route path={`/user/data`} component={UserData}/>
                            <Route path={`/user/take-money`} component={UserTakeMoney}/>
                            <Redirect to={`/user/history`}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserArea;
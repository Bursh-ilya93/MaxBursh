import React, {Component} from "react";
import Breadcrumbs from "../Breadcrumbs";
import {Link} from "react-router-dom";
import {Redirect, Route, Switch} from "react-router";
import BFK from "./partners/BFK";
import FKVitebsk from "./partners/FKVitebsk";
import FKSlavia from "./partners/FKSlavia";

const Menu = () => {
    const [details] = window.location.href.split('/').reverse();

    return (
        <div className="partner-page__menu page__menu">
            <Link className={`page__menu-item bfk ${details === 'bfk' || details === 'user' ? 'active' : ''}`} to={`/page/partner/bfk`}>
                <span>Ассоцияция Федерация Хоккея Беларуси</span>
            </Link>
            <Link className={`page__menu-item fk-vitebsk ${details === 'fk-vitebsk' ? 'active' : ''}`} to={`/page/partner/fk-vitebsk`}><span>ФК Витебск</span></Link>
            <Link className={`page__menu-item fk-slavia ${details === 'fk-slavia' ? 'active' : ''}`} to={`/page/partner/fk-slavia`}><span>ФК Славия</span></Link>
        </div>
    )
};

class UserArea extends Component {
    getBreadcumbs = () => {
        let data = [];
        data.push({key : '/', value : 'Главная'});
        data.push({key : '', value : 'Партнёры'});
        return data;
    };

    render() {
        return (
            <div className="full-page user-page partner-page">
                <div className={`user-page__main`}>
                    <div className={`user-page__main-left`}>
                        <Menu details={this.props.match.params.details}/>
                    </div>
                    <div className={`user-page__main-right`}>
                        <Breadcrumbs data={this.getBreadcumbs()}/>
                        <Switch>
                            <Route path={`/page/partner/bfk`} component={BFK}/>
                            <Route path={`/page/partner/fk-vitebsk`} component={FKVitebsk}/>
                            <Route path={`/page/partner/fk-slavia`} component={FKSlavia}/>
                            <Redirect to={'/page/partner/bfk'}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserArea;
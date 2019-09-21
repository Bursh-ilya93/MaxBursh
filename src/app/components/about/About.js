import React, {Component} from "react";
import Breadcrumbs from "../Breadcrumbs";
import {Redirect, Route, Switch, withRouter} from "react-router";
import CompanyMoreInfo from "./CompanyMoreInfo";
import PPS from "./PPS";
import CompanyContacts from "./CompanyContacts";
import {Link} from "react-router-dom";

const ABOUT_PATH = {
    main    : 'about',
    more    : 'more',
    address : 'address',
    contacts: 'contacts',
};

const Menu = ({details}) => {
    return (
      <div className="about-page__menu page__menu">
          <Link to={`/${ABOUT_PATH.main}/${ABOUT_PATH.more}`} className={`page__menu-item  about-page__menu-item ${details === ABOUT_PATH.more ? 'active' : ''}`}>О нас</Link>
          <Link to={`/${ABOUT_PATH.main}/${ABOUT_PATH.address}`} className={`page__menu-item about-page__menu-item ${details === ABOUT_PATH.address ? 'active' : ''} `}>Адреса</Link>
          <Link to={`/${ABOUT_PATH.main}/${ABOUT_PATH.contacts}`} className={`page__menu-item about-page__menu-item ${details === ABOUT_PATH.contacts ? 'active' : ''}`}>Конакты</Link>
      </div>
    )
};

class AboutPage extends Component {
    getBreadcumbs = () => {
        let data = [];
        data.push({key : '/', value : 'Главная'});
        data.push({key : '', value : 'О компании'});
        return data;
    };

    render() {
        return (
            <div className="full-page about-page">

                <div className={`about-page__main`}>
                    <Menu details={this.props.match.params.details}/>
                    <div>
                        <Breadcrumbs data={this.getBreadcumbs()}/>
                        <Switch>
                            <Route path={`/${ABOUT_PATH.main}/${ABOUT_PATH.more}`} component={CompanyMoreInfo}/>
                            <Route path={`/${ABOUT_PATH.main}/${ABOUT_PATH.address}`} component={PPS}/>
                            <Route path={`/${ABOUT_PATH.main}/${ABOUT_PATH.contacts}`} component={CompanyContacts}/>
                            <Redirect to={`/${ABOUT_PATH.main}/${ABOUT_PATH.more}`}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(AboutPage);
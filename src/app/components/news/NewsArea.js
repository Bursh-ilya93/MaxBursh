import React, {Component} from "react";
import Breadcrumbs from "../Breadcrumbs";
import {Link} from "react-router-dom";
import {Route, Switch} from "react-router";
import NewsContainer from "./NewsContainer";
import NewsFull from "./NewsFull";

const Menu = ({match}) => {
    const {type} = match;

    return (
        <div className="news-page__menu page__menu">
            <Link className={`page__menu-item ${type === 'site' ? 'active' : ''}`} to={`/news/type/site`}>Новости сайта</Link>
            <Link className={`page__menu-item ${type === 'sport' ? 'active' : ''}`} to={`/news/type/sport`}>Новости спорта</Link>
            <Link className={`page__menu-item ${type === 'analyst' ? 'active' : ''}`} to={`/news/type/analyst`}>Аналитика</Link>
        </div>
    )
};

class NewsArea extends Component {
    getBreadcumbs = () => {
        let data = [];
        data.push({key : '/', value : 'Главная'});
        data.push({key : '', value : 'Новости'});
        return data;
    };


    render() {
        return (
            <div className="full-page news-page">
                <div className={`news-page__content`}>
                    <Menu match={this.props.match.params}/>
                    <div>
                        <Breadcrumbs data={this.getBreadcumbs()}/>
                        <Switch>
                            <Route exact path="/news/type/:type" component={({match}) => <NewsContainer type={match.params.type}/>}/>
                            <Route exact path="/news/:type/:slug" component={({match}) =>
                                <NewsFull type={match.params.type} slug={match.params.slug}/>}/>
                        </Switch>
                    </div>
                </div>
            </div>
        )
    }

}

export default NewsArea;
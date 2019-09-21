import React, {Component} from "react";
import Breadcrumbs from "../Breadcrumbs";
import {connect} from "react-redux";
import {loadBonus} from "../../../redux/bonuses/actions";
import UserHeader from "../user/UserHeader";

class Bonus extends Component {
    getBreadcumbs = () => {
        let data = [];
        data.push({key : '/', value : 'Главная'});
        data.push({key : '', value : 'Бонусы'});
        return data;
    };

    componentWillMount() {
        const {onLoadBonus} = this.props;
        onLoadBonus();
    }

    render() {
        const {bonuses} = this.props;

        return (
            <div className="full-page user-page">
                <div className={`user-page__main`}>
                    <div className={`user-page__main-left`}/>
                    <div className={`user-page__main-right`}>
                        <Breadcrumbs data={this.getBreadcumbs()}/>
                        <UserHeader text={'Бонусы'}/>
                        <div className="content">
                            <div className="bonus__page">
                                <div className={'bonus__page__content'}>
                                    {bonuses.map(line =>

                                        <div className={'bonus__page__content__line'}>
                                            {line.map((item) => {
                                                const [img] = item.img.split('/').reverse();
                                                return (
                                                    <a href={item.href} className={'animated zoomIn'}>
                                                        <div className={'bonus__page__content__line__item'}>
                                                            <a href={item.href}><img src={require(`../../../assets/images/bonuses/${img}`)}/></a>
                                                            <div className="splash">
                                                                <div className={'splash__line'}>
                                                                    <img src={require('../../../assets/images/bonuses/line-splash.png')} alt=""/>
                                                                </div>
                                                                <div className={'splash__text move-right'}><a href={item.href}>Подробнее</a></div>
                                                            </div>
                                                        </div>
                                                    </a>)
                                                }
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        bonuses : state.bonus.bonuses,
        loading : state.bonus.loading
    }),
    dispatch => ({
        onLoadBonus: () => dispatch(loadBonus())
    }),
)(Bonus);
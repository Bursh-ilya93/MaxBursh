import React, {Component} from 'react';
import Carousel from "../../../scripts/carousel";
import ImageLoading from "../ImageLoading";
import ImageLoader from 'react-imageloader';

//pps images
import baranovichi_1 from "../../../assets/images/pps/baranovichi/1.jpg";
import baranovichi_2 from "../../../assets/images/pps/baranovichi/2.jpg";
import baranovichi_3 from "../../../assets/images/pps/baranovichi/3.jpg";
import baranovichi_4 from "../../../assets/images/pps/baranovichi/4.jpg";
import baranovichi_5 from "../../../assets/images/pps/baranovichi/5.jpg";

import bobruisk_1 from "../../../assets/images/pps/bobruisk/1.jpg";
import bobruisk_2 from "../../../assets/images/pps/bobruisk/2.jpg";
import bobruisk_3 from "../../../assets/images/pps/bobruisk/3.jpg";
import bobruisk_4 from "../../../assets/images/pps/bobruisk/4.jpg";
import bobruisk_5 from "../../../assets/images/pps/bobruisk/5.jpg";

import brest_1 from "../../../assets/images/pps/brest/1.jpg";
import brest_2 from "../../../assets/images/pps/brest/2.jpg";
import brest_3 from "../../../assets/images/pps/brest/3.jpg";
import brest_4 from "../../../assets/images/pps/brest/4.jpg";

import vitebsk_1 from "../../../assets/images/pps/vitebsk/1.jpg";
import vitebsk_2 from "../../../assets/images/pps/vitebsk/2.jpg";
import vitebsk_3 from "../../../assets/images/pps/vitebsk/3.jpg";
import vitebsk_4 from "../../../assets/images/pps/vitebsk/4.jpg";
import vitebsk_5 from "../../../assets/images/pps/vitebsk/5.jpg";

import gomel_1 from "../../../assets/images/pps/gomel/1.jpg";
import gomel_2 from "../../../assets/images/pps/gomel/2.jpg";
import gomel_3 from "../../../assets/images/pps/gomel/3.jpg";
import gomel_4 from "../../../assets/images/pps/gomel/4.jpg";

import grodno_1 from "../../../assets/images/pps/grodno/1.png";
import grodno_2 from "../../../assets/images/pps/grodno/2.png";
import grodno_3 from "../../../assets/images/pps/grodno/3.png";
import grodno_4 from "../../../assets/images/pps/grodno/4.png";

import minsk_1 from "../../../assets/images/pps/minsk/1.jpg";
import minsk_2 from "../../../assets/images/pps/minsk/2.jpg";
import minsk_3 from "../../../assets/images/pps/minsk/3.jpg";
import minsk_4 from "../../../assets/images/pps/minsk/4.jpg";
import minsk_5 from "../../../assets/images/pps/minsk/5.jpg";
import minsk_6 from "../../../assets/images/pps/minsk/6.jpg";
import minsk_7 from "../../../assets/images/pps/minsk/7.jpg";

import mozyr_1 from "../../../assets/images/pps/mozyr/1.jpg";
import mozyr_2 from "../../../assets/images/pps/mozyr/2.jpg";
import mozyr_3 from "../../../assets/images/pps/mozyr/3.jpg";
import mozyr_4 from "../../../assets/images/pps/mozyr/4.jpg";
import mozyr_5 from "../../../assets/images/pps/mozyr/5.jpg";

import mogilev_1 from "../../../assets/images/pps/mogilev/1.jpg";
import mogilev_2 from "../../../assets/images/pps/mogilev/2.jpg";
import mogilev_3 from "../../../assets/images/pps/mogilev/3.jpg";
import mogilev_4 from "../../../assets/images/pps/mogilev/4.jpg";

import novopolotsk_1 from "../../../assets/images/pps/novopolotsk/1.jpg";
import novopolotsk_2 from "../../../assets/images/pps/novopolotsk/2.jpg";
import novopolotsk_3 from "../../../assets/images/pps/novopolotsk/3.jpg";
import novopolotsk_4 from "../../../assets/images/pps/novopolotsk/4.jpg";
import novopolotsk_5 from "../../../assets/images/pps/novopolotsk/5.jpg";

import molodechno_1 from "../../../assets/images/pps/molodechno/1.png";
import molodechno_2 from "../../../assets/images/pps/molodechno/2.png";
import molodechno_3 from "../../../assets/images/pps/molodechno/3.png";
import molodechno_4 from "../../../assets/images/pps/molodechno/4.png";
import molodechno_5 from "../../../assets/images/pps/molodechno/5.png";

import minskAl_1 from "../../../assets/images/pps/minskAl/1.png";
import minskAl_2 from "../../../assets/images/pps/minskAl/2.png";
import minskAl_3 from "../../../assets/images/pps/minskAl/3.png";
import minskAl_4 from "../../../assets/images/pps/minskAl/4.png";
import minskAl_5 from "../../../assets/images/pps/minskAl/5.png";

import borisov_1 from "../../../assets/images/pps/borisov/1.png";
import borisov_2 from "../../../assets/images/pps/borisov/2.png";
import borisov_3 from "../../../assets/images/pps/borisov/3.png";
import borisov_4 from "../../../assets/images/pps/borisov/4.png";
import borisov_5 from "../../../assets/images/pps/borisov/5.png";

import slonim_1 from "../../../assets/images/pps/slonim/11.png";
import slonim_2 from "../../../assets/images/pps/slonim/22.png";
import slonim_3 from "../../../assets/images/pps/slonim/33.png";
import slonim_4 from "../../../assets/images/pps/slonim/44.png";
import slonim_5 from "../../../assets/images/pps/slonim/55.png";

import grodnoV_1 from "../../../assets/images/pps/grodnoV/1.png";
import grodnoV_2 from "../../../assets/images/pps/grodnoV/2.png";
import grodnoV_3 from "../../../assets/images/pps/grodnoV/3.png";
import grodnoV_4 from "../../../assets/images/pps/grodnoV/4.png";
import grodnoV_5 from "../../../assets/images/pps/grodnoV/5.png";

import soligorsk_1 from "../../../assets/images/pps/soligorskSH/1.png";
import soligorsk_2 from "../../../assets/images/pps/soligorskSH/2.png";
import soligorsk_3 from "../../../assets/images/pps/soligorskSH/3.png";
import soligorsk_4 from "../../../assets/images/pps/soligorskSH/4.png";
import soligorsk_5 from "../../../assets/images/pps/soligorskSH/5.png";

import baranovichi_map from "../../../assets/images/pps/baranovichi.png";
import bobruisk_map from "../../../assets/images/pps/bob.png";
import brest_map from "../../../assets/images/pps/brest.png";
import gomel_map from "../../../assets/images/pps/gomel.png";
import grodno_map from "../../../assets/images/pps/grodno.png";
import minsk_map from "../../../assets/images/pps/minsk.png";
import mogilev_map from "../../../assets/images/pps/mogilev.png";
import mozir_map from "../../../assets/images/pps/mozir.png";
import novopolotsk_map from "../../../assets/images/pps/novopolotsk.png";
import vitebsk_map from "../../../assets/images/pps/vitebsk.png";
import borisov_map from "../../../assets/images/pps/borisov.png";
import grodnoV_map from "../../../assets/images/pps/grodnoV.png";
import minskA_map from "../../../assets/images/pps/minskA.png";
import molodechno_map from "../../../assets/images/pps/molodechno.png";
import slonim_map from "../../../assets/images/pps/slonim.png";
import soligorsk_map from "../../../assets/images/pps/soligorsk.png";

import wifi from "../../../assets/images/pps/wifi.svg";
import coffe from "../../../assets/images/pps/coffe.svg";
import tvImg from "../../../assets/images/pps/tv.svg";
// import sputnikImg from "../../../assets/images/pps/sputnik.svg";
import PpsImages from "./PpsImages";
import FullMap from "./FullMap";
import * as _ from "lodash";
import {connect} from "react-redux";
import ModalComment from "./ModalComment";

class PageTitle extends Component {
    render() {
        return (
            <div className="page__title">{this.props.text}</div>
        );
    }
}

class Comfort extends Component {
    render() {
        const {tv} = this.props;
        const {change} = this.props;

        return (
            <div className={'comfort'}>
                <img className={'comfort__item'} src={wifi} title={'Wi-Fi'}/>
                <img className={'comfort__item'} src={coffe} title={'Чай/Кофе'}/>
                {tv && <img className={'comfort__item'} src={tvImg} title={'TV'}/>}
                {/*{sputnik && <img className={'comfort__item'} src={sputnikImg} title={'Спутниковое TV'}/>}*/}
                <button className={'button'} onClick={change}>Оставить отзыв</button>
            </div>
        );
    }
}


class ButtonCommentComponent extends Component{
    render() {
        return (
            <div>Оставить отзыв</div>
        )
    }
}


// const ButtonComment = connect(
//     state => ({}),
//     dispatch => ({
//         // onSendComment : () => dispatch
// }))(ButtonCommentComponent);

class PPS extends Component {
    state = {
        activeTab    : 0,
        activeImages : [],
        activeMap    : '',
        activeComment: false
    };

    cashes =
        [
            {
                city        : 'Барановичи',
                address     : 'ул. Гагарина д. 2',
                workingTime : '11:00 - 22:00, перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CBeKqCX~LA',
                images      : [baranovichi_1, baranovichi_2, baranovichi_3, baranovichi_4, baranovichi_5],
                map         : baranovichi_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Бобруйск',
                address     : 'ул. Ульяновская д. 70Б',
                workingTime : '11:00 - 22:00, перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CBeKqGXB3A',
                images      : [bobruisk_1, bobruisk_2, bobruisk_3, bobruisk_4, bobruisk_5],
                map         : bobruisk_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Брест',
                address     : 'ул. Дзержинского, д. 50, к. 15',
                workingTime : '11:00 - 22:00, перерыв: 15:00 - 15:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CBeKqKgO2C',
                images      : [brest_1, brest_2, brest_3, brest_4],
                map         : brest_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Витебск',
                address     : 'ул. Замковая, 5/2',
                workingTime : '11:00 - 24:00, перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CBuAFZchpC',
                images      : [vitebsk_1, vitebsk_2, vitebsk_3, vitebsk_4, vitebsk_5],
                map         : vitebsk_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Гомель',
                address     : 'ул. Красноармейская, д. 7, помещение № 7',
                workingTime : '11:00 - 22:00, перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CBeKqOtZGD',
                images      : [gomel_1, gomel_2, gomel_3, gomel_4],
                map         : gomel_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Гродно',
                address     : 'пр. Клецкова, д. 21б-2, часть № 2, помещение № 23',
                workingTime : '11:00 - 22:00, перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CBeKqSTDWA',
                images      : [grodno_1, grodno_2, grodno_3, grodno_4],
                map         : grodno_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Минск',
                address     : 'пр-т Независимости, 179А (здание ТЦ "Спектр")',
                workingTime : '10:00 - 22:00, перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CBeKqDXGpC',
                images      : [minsk_1, minsk_2, minsk_3, minsk_4, minsk_5, minsk_6, minsk_7],
                map         : minsk_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Мозырь',
                address     : 'ул. Пролетарская, 81',
                workingTime : '11:00 - 22:00, перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CBeKqLEPoD',
                images      : [mozyr_1, mozyr_2, mozyr_3, mozyr_4, mozyr_5],
                map         : mozir_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Могилев',
                address     : 'пер. Пожарный 11, 2-й этаж',
                workingTime : '11:00 - 22:00; перерыв: 17:00 - 17:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CBeKqFxB8C',
                images      : [mogilev_1, mogilev_2, mogilev_3, mogilev_4],
                map         : mogilev_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Новополоцк',
                address     : 'ул.Молодежная, 169/1-1',
                workingTime : '11:00 - 22:00; перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CBeKqPtZWC',
                images      : [novopolotsk_1, novopolotsk_2, novopolotsk_3, novopolotsk_4, novopolotsk_5],
                map         : novopolotsk_map,
                tv          : true,
                sputnik     : false
            },

            {
                city        : 'Молодечно',
                address     : 'ул. Волынца, 12М-2',
                workingTime : '11:00 - 22:00; перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CCehATp1',
                images      : [molodechno_1, molodechno_2, molodechno_3, molodechno_4, molodechno_5],
                map         : molodechno_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Минск',
                address     : 'ул. Алибегова, 12Б, помещение 10',
                workingTime : '11:00 - 22:00; перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CBeKqPtZWC',
                images      : [minskAl_1, minskAl_2, minskAl_3, minskAl_4, minskAl_5],
                map         : minskA_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Борисов',
                address     : 'пр. Революции, 16, помещение №1',
                workingTime : '11:00 - 22:00; перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CCehECpH',
                images      : [borisov_1, borisov_2, borisov_3, borisov_4, borisov_5],
                map         : borisov_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Слоним',
                address     : 'ул. Красноармейская, 90, помещение №23',
                workingTime : '11:00 - 22:00; перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CCehELKK',
                images      : [slonim_1, slonim_2, slonim_3, slonim_4, slonim_5],
                map         : slonim_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Гродно',
                address     : 'ул. Виленская, 2, помещение №19',
                workingTime : '11:00 - 22:00; перерыв: 15:00 - 15:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CCehIMnP',
                images      : [grodnoV_1, grodnoV_2, grodnoV_3, grodnoV_4, grodnoV_5],
                map         : grodnoV_map,
                tv          : true,
                sputnik     : false
            },
            {
                city        : 'Солигорск',
                address     : 'бульвар Шахтеров, 5А',
                workingTime : '11:00 - 22:00; перерыв: 16:00 - 16:30',
                dayOff      : 'Без выходных',
                mapLink     : 'https://yandex.by/map-widget/v1/-/CCehIJPd',
                images      : [soligorsk_1, soligorsk_2, soligorsk_3, soligorsk_4, soligorsk_5],
                map         : soligorsk_map,
                tv          : true,
                sputnik     : false
            }
        ];

    sortedCashes = _.sortBy(this.cashes, 'city');

    setActiveTab(index) {
        this.setState({
            activeTab : index
        });
    }

    componentDidMount() {
        Carousel.myCarousel('.pps-carousel');
    }

    componentWillReceiveProps(nextProps) {
    }

    preloader() {
        return <ImageLoading/>;
    }

    changeActiveImages(images) {
        this.setState({
            activeImages : images
        })
    }

    clearActiveImages() {
        this.setState({
            activeImages : []
        })
    }

    changeActiveMap(mapLink) {
        this.setState({
            activeMap : mapLink
        })
    }

    clearActiveMap() {
        this.setState({
            activeMap : ''
        })
    }

    changeVisibleModalComment = (city) => {
        this.setState({
            activeComment : city
        })
    };

   clearVisibleModalComment = () => {
       this.setState({
           activeComment : false
       });
   };

    render() {
        return (
            <div className={'page page-pps'}>
                <div className="page__data">
                    <div className="pps">
                        {this.sortedCashes.map((cash, index) =>

                            <div key={index} className={`tabs__tab show`}>
                                <div className="pps__address">
                                    <div key={index} className="pps__address-left">
                                        <img src={cash.images[0]} onClick={this.changeActiveImages.bind(this, cash.images)}/>
                                        <div className={'countImg'}>
                                            1/{cash.images.length}
                                        </div>
                                        <ImageLoader src={''} preloader={this.preloader}/>
                                    </div>
                                    <div className="pps__address-center">
                                        <div className="top">{cash.city}, {cash.address}</div>
                                        <div className={'middle'}>
                                            <div className={'top'}>Время работы:</div>
                                            <div>{cash.workingTime}</div>
                                            <div>{cash.dayOff}</div>
                                        </div>
                                        <Comfort change={() => this.changeVisibleModalComment(cash.city)} tv={cash.tv}/>
                                    </div>
                                    <div className="pps__map">
                                        <img src={cash.map} onClick={this.changeActiveMap.bind(this, cash.mapLink)}/>
                                        <ImageLoader src={''} preloader={this.preloader}/>
                                    </div>
                                </div>
                            </div>)
                        }


                        {this.state.activeImages.length > 0 &&
                        <PpsImages images={this.state.activeImages} close={this.clearActiveImages.bind(this)}/>}

                        {this.state.activeMap !== '' &&
                        <FullMap mapLink={this.state.activeMap} close={this.clearActiveMap.bind(this)}/>}

                        {this.state.activeComment &&
                        <ModalComment city={this.state.activeComment} close={this.clearVisibleModalComment.bind(this)}/>}

                        {this.state.activeImages.length > 0 &&
                        <div id="splash" onClick={this.clearActiveImages.bind(this)}></div>}

                        {this.state.activeMap !== '' &&
                        <div id="splash" onClick={this.clearActiveMap.bind(this)}></div>}

                        {this.state.activeComment  &&
                        <div id="splash" onClick={this.clearVisibleModalComment.bind(this)}></div>}
                    </div>
                </div>
            </div>
        )
    }
}

export default PPS;
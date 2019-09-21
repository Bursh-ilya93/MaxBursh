import React, {Component} from "react";

import mts from "./../../../assets/images/about_company/mts.svg";
import velcom from "./../../../assets/images/about_company/velcom.svg";
import whatsapp from "./../../../assets/images/about_company/whatsapp.svg";
import viber from "./../../../assets/images/about_company/viber.svg";
import telegram from "./../../../assets/images/about_company/telegram.svg";
import mail from "./../../../assets/images/about_company/mail.svg";
import vk from "./../../../assets/images/about_company/vk.svg";
import insta from "./../../../assets/images/about_company/instagram.svg";
import ok from "./../../../assets/images/about_company/ok.svg";
import twitter from "./../../../assets/images/about_company/twitter.svg";
import youtube from "./../../../assets/images/about_company/youtube.svg";
import ReactSVG from "react-svg";

class CompanyContacts extends Component {
    render() {
        return (
            <div className={'about-contacts'}>
                <div className={'content'}>
                    <div className={'content__item'}>
                        <div className={'content__item__info'}>
                            <div className="content__item__info__title">
                                <p>Служба поддержки:</p>
                            </div>
                            <div className="content__item__info__block">
                                <p>Горячая линия</p>
                                <p>Время работы: Круглосуточно</p>
                            </div>
                        </div>
                        <div className={'content__item__phone'}>
                            <p><img src={mts} alt="" title={'MTS'}/>
                                <img src={velcom} alt="" title={'Velcom'}/>
                                <img src={whatsapp} alt="" title={'WhatsApp'}/>
                                <img src={viber} alt="" title={'Viber'}/>
                                <img src={telegram} alt="" title={'Telegram'}/>520 7777</p>
                        </div>
                        <div className={'content__item__mail'}>
                            <a target="_blank" href="mailto:support@maxline.by"><img src={mail}/>E-mail:
                                support@maxline.by</a>
                            <a target="_blank" href="mailto:passport@maxline.by"><img src={mail}/>E-mail:
                                passport@maxline.by</a>
                        </div>
                    </div>

                    <div className={'content__item'}>
                        <div className={'content__item__info'}>
                            <div className="content__item__info__title">
                                <p>Маркетинг</p>
                            </div>
                            <div className="content__item__info__block">
                                <p>Отдел развития и рекламы</p>
                            </div>
                        </div>
                        <div className={'content__item__phone'}>
                            <p><img src={mts} alt="" title={'MTS'}/>
                                <img src={whatsapp} alt="" title={'WhatsApp'}/>
                                <img src={viber} alt="" title={'Viber'}/>
                                <img src={telegram} alt="" title={'Telegram'}/>571 5555</p>
                        </div>
                        <div className={'content__item__mail'}>
                            <a target="_blank" href="mailto:marketing@maxline.by"><img src={mail}/>E-mail:
                                marketing@maxline.by</a>
                        </div>
                    </div>

                    <div className={'content__item'}>
                        <div className={'content__item__info'}>
                            <div className="content__item__info__title">
                                <p>Бухгалтерия:</p>
                            </div>
                            <div className="content__item__info__block">
                                <p>Для уточнения вопросов, связанных с </p>
                                <p>выплатами, с 9:00 до 16:00</p>
                            </div>
                        </div>
                        <div className={'content__item__phone'}>
                            <p><img src={mts} alt="" title={'MTS'}/>752 5555</p>
                        </div>
                        <div className={'content__item__mail'}>
                        </div>
                    </div>
                    <div className={'content__item'}>
                        <div className={'content__item__info'}>
                            <div className="content__item__info__title">
                                <p>Мы в социальных сетях:</p>
                            </div>
                        </div>
                        <div className={'content__item__phone social'}>
                            <a target="_blank" href="https://www.youtube.com/channel/UC9PLwT3BtDbbZAuExTA5RFQ">
                                <ReactSVG className={`social-icon`} src={youtube}></ReactSVG>
                            </a>
                            <a target="_blank" href="https://vk.com/maxlineby">
                                <ReactSVG className={`social-icon`} src={vk}></ReactSVG>
                            </a>
                            <a target="_blank" href="https://twitter.com/Maxline_by">
                                <ReactSVG className={`social-icon`} src={twitter}></ReactSVG>
                            </a>
                            <a target="_blank" href="https://www.instagram.com/maxlineofficial/">
                                <ReactSVG className={`social-icon`} src={insta}></ReactSVG>
                            </a>
                            <a target="_blank" href="https://ok.ru/maxlinesport">
                                <ReactSVG className={`social-icon`} src={ok}></ReactSVG>
                            </a>
                        </div>
                        <div className={'content__item__phone'}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompanyContacts;
import React from "react";
import ReactSVG from "react-svg";

const FKSlavia = () => {
    return(
        <div className={'partner fk-slavia'}>
            <div className={'partner__image '}>
                <img className={'bg'} src={require('../../../../assets/images/partners/partner-fk-vitebsk.jpg')} alt=""/>
                <ReactSVG className={'logo'} src={require('../../../../assets/images/partners/fk-slavia-logo.svg')}/>
            </div>
            <div className={'partner__text text'}>
                <div className={'partner__text-head text-head'}>
                    <p><strong>Год основания: </strong>1987</p>
                    <p><strong>Место дислокации: </strong>Мозырь, Республика Беларусь</p>
                    <p><strong>Стадион: </strong>"Юность", вмещает 5 133 зрител</p>
                </div>
                <div className={'partner__text-main text-main'}>
                    <p>
                        <strong>«Славия»</strong> — белорусский футбольный клуб, выступающий в Высшей лиге чемпионата Беларуси с 1995 года (с перерывами).
                        В сезоне-2017/18 футбольный клуб не проиграл в чемпионате Первой лиги ни одной игры.
                    </p>
                    <p><strong>Достижения:</strong></p>
                    <ul>
                        <li>Серебряный призёр Первой лиги 1993, 1994, 2014 годов;</li>
                        <li>Обладатель Кубка Полесья 1994 и 2005 годов;</li>
                        <li>Серебряный призёр чемпионата Беларуси 1995 и 1999 годов;</li>
                        <li> Победитель Первой лиги 1995, 2011, 2018 годов;</li>
                        <li>Чемпион Беларуси 1996 и 2000 годов;</li>
                        <li> Обладатель Кубка Беларуси 1996 и 2000 годов;</li>
                        <li>Финалист Кубка Беларуси 1999 и 2001 годов;</li>
                        <li>Бронзовый призер Кубка чемпионов Содружества стран СНГ и Балтии 2001 года.</li>
                    </ul>
                </div>
                <div className={'partner__text-link text-link'}>
                    <p><strong>Официальный сайт партнера - </strong><a href="http://fcslavia.by/ru">http://fcslavia.by/ru</a></p>
                </div>
            </div>
        </div>
    )
};

export default FKSlavia;
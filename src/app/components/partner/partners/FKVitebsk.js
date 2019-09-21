import React from "react";
import ReactSVG from "react-svg";

const FKVitebsk = () => {
    return(

        <div className={'partner fk-vitebsk'}>
            <div className={'partner__image '}>
                <img className={'bg'} src={require('../../../../assets/images/partners/partner-fk-vitebsk.jpg')} alt=""/>
                <ReactSVG className={'logo'} src={require('../../../../assets/images/partners/fk-vitebsk-logo.svg')}/>
            </div>
            <div className={'partner__text text'}>
                <div className={'partner__text-head text-head'}>
                    <p><strong>Год основания: </strong>1960</p>
                    <p><strong>Место дислокации: </strong>Витебск, Республика Беларусь</p>
                    <p><strong>Стадион: </strong>ЦСК «Витебский», вмещает 8 144 зрителей</p>
                </div>
                <div className={'partner__text-main text-main'}>
                    <p>
                        <strong>«Витебск»</strong> —белорусский футбольный клуб, выступающий в Высшей лиге с первого чемпионата (кроме 2003, 2005, 2012-2014).
                        Самые крупные победы в чемпионатах: 6:1 («Свислочь - Кровля», 1999), 5:0 («Гомсельмаш», 1992, 1994/95; «Коммунальник", 1997).
                    </p>
                    <p>Дважды футбольный клуб играл в европейских кубках (Кубок обладателей кубков УЕФА 1998/99 и Кубок Интертото 1999).</p>
                    <p>В сезоне-2017/18 чемпионата Беларуси «Витебск» занял 4 место.</p>
                    <p><strong>Достижения:</strong></p>
                    <ul>
                        <li>Серебряный призёр чемпионата Беларуси 1993 и 1995 годов;</li>
                        <li> Бронзовый призёр чемпионата Беларуси 1994 и 1997 годов;</li>
                        <li>Обладатель Кубка Беларуси 1998 года;</li>
                        <li>Победитель первенства Первой лиги 2003 года;</li>
                        <li>Серебряный призёр первенства Первой лиги 2005 года;</li>
                        <li>Финалист Кубка Ассоциации «Белорусская федерация футбола» 2007 года.</li>
                    </ul>
                </div>
                <div className={'partner__text-link text-link'}>
                    <p><strong>Официальный сайт партнера - </strong><a href="http://www.fc.vitebsk.by">http://www.fc.vitebsk.by</a></p>
                </div>
            </div>
        </div>
    )
};

export default FKVitebsk;
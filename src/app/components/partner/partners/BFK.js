import React from "react";
import ReactSVG from "react-svg";

const BFK = () => {
    return(

        <div className={'partner bfk'}>
            <div className={'partner__image '}>
                <img className={'bg'} src={require('../../../../assets/images/partners/partner-bfk.jpg')} alt=""/>
                <ReactSVG svgClassName={'logo'} src={require('../../../../assets/images/partners/bfk-logo.svg')}/>
            </div>
            <div className={'partner__text text'}>
                <div className={'partner__text-head text-head'}>
                        <p><strong>Год основания: </strong>6 марта 1992 года</p>
                        <p><strong>Место дислокации:</strong> Минск, Республика Беларусь</p>
                </div>
                <div className={'partner__text-main text-main'}>
                    <p>
                        <strong>Федерация хоккея Республики Беларусь</strong> — организация,
                        занимающаяся проведением на территории Беларуси
                        соревнований по хоккею с шайбой.
                    </p>
                    <p>
                        В структуру чемпионата Беларуси, который проводит Федерация хоккея, входит
                        Экстралига профессиональных хоккейных команд и Высшая лига, в которой играют фарм-клубы команд Экстралиги
                        Также ежегодно с сезона-2002/03 проводится Кубок Республики Беларусь по хоккею с шайбой.
                    </p>
                    <p>
                        Федерация хоккея Беларуси и Федерация хоккея Латвии получили право
                        на совместное проведение чемпионата мира по хоккею в 2021 году. Матчи
                        групповой стадии и по два четвертьфинальных поединка примут столицы обоих
                        государств, а полуфинальные матчи, игры за бронзу и золото состоятся в Минске.
                    </p>
                    <p>
                        С 7 марта 2019 года наша компания и Белорусская федерация хоккея начали плотное
                        сотрудничество в целях популяризации белорусского хоккея. Интерес к игре неотделим
                        от эмоций и азарта, а значит, немыслим без
                        мира ставок, в который предлагает погрузиться наша компания.
                    </p>
                    <p>
                        Мы предлагаем расширенную линию ставок на матчи
                        отечественного чемпионата, а теперь обещаем радовать поклонников хоккея специальной линией на игры
                        с участием наших команд – как сборной, так и белорусских клубов.
                    </p>
                    <p>
                        Также ради приумножения аудитории белорусского хоккея планируется проведение
                        всевозможных мероприятий и акций. В частности, в наших с БФХ планах – разработка и реализация
                        совместного проекта по увеличению посещаемости матчей Экстралиги и национальной сборной.
                    </p>
                </div>
                <div className={'partner__text-link text-link'}>
                    <p><strong>Официальный сайт партнера - </strong><a href=" https://www.hockey.by"> https://www.hockey.by</a></p>
                </div>
            </div>
        </div>
    )
};


export default BFK;
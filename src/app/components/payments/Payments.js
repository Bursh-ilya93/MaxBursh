import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

export class PageTitle extends Component {
    render() {
        return (
            <div className="payments-page__main-title">{this.props.text}</div>
        );
    }
}

class Payments extends Component {

    state = {
        activeIndex : 0
    };

    setActiveItem(index) {
        const result = index === this.state.activeIndex ? 0 : index;
        this.setState({activeIndex : result});
    }

    render() {
        const classes_in = [
            {
                key   : 'Visa/MasterCard',
                value : 'visa-master'
            },
            {
                key   : 'Qiwi',
                value : 'qiwi'
            },
            {
                key   : 'ЕРИП',
                value : 'erip'
            },
            {
                key   : 'IPay',
                value : 'ipay'
            },
            {
                key   : 'ППС',
                value : 'pps'
            },
        ];
        const classes_out = [
            {
                key   : 'ППС',
                value : 'out_pps'
            },
            {
                key   : 'Наличными в Белинвестбанке',
                value : 'belinvestbank'
            },
            {
                key   : 'Беларусбанк',
                value : 'belarusbank'
            },
            {
                key   : 'Белагропромбанк',
                value : 'belagro'
            },
            {
                key   : 'Приорбанк',
                value : 'priorbank'
            },
            {
                key   : 'БПС-Сбербанк',
                value : 'bps-bank'
            },
            {
                key   : 'Технобанк',
                value : 'techno-bank'
            },
            {
                key   : 'Белинвестбанк',
                value : 'belinvestbank'
            },
            {
                key   : 'Белвэб банк',
                value : 'belweb'
            },
            {
                key   : 'МТБанк',
                value : 'mtbank'
            },
            {
                key   : 'Белгазпромбанк',
                value : 'belgazprombank'
            },
            {
                key   : 'Банк Решение',
                value : 'bank-solution'
            },
            {
                key   : 'Паритетбанк',
                value : 'paritetbank'
            },
            {
                key   : 'Москва-Минск',
                value : 'moscow-minsk'
            },
        ];

        const itemClass = 'payments__items__item';

        return (
            <div className='payments-page__main-content'>
                <PageTitle text={'Способы пополнения игровых счетов'}/>
                <div className="page__data payments">
                    <div className="payments__items">
                        <div className={`${itemClass} ${this.state.activeIndex === 1 ? 'active' : ''}`}>
                            <div className="title visa-master" onClick={this.setActiveItem.bind(this, 1)}>
                                <p>Visa/Mastercard</p>
                            </div>
                            <div className="hidden">
                                <p>
                                    Вы должны зайти в раздел нашего сайта <Link to={'/user/pay'}>«Пополнить счёт»</Link>,
                                    сформировать счёт для оплаты в системе iPay (с указанием суммы платежа) через
                                    банковскую карту и подтвердить его. После
                                    чего произойдёт перенаправление на защищенную страницу оплаты, где Вы должны будете
                                    заполнить данные о своей банковской карте. Затем введите пароль «3-D Secure»
                                    (получение
                                    посредством интернет-банкинга или через SMS на привязанный к карте номер мобильного
                                    телефона).
                                </p>
                            </div>
                            <div className="attention-data hidden">
                                <p>
                                    Карта, при помощи которой Вы желаете пополнить игровой счет, должна быть изготовлена
                                    банком Республики Беларусь. Кроме того, используется технология <strong>"3-D
                                    Secure"</strong>.
                                </p>
                                <ul>
                                    <li>Минимальная сумма - 2 руб.;</li>
                                    <li>Комиссия - 0%;</li>
                                    <li>Время зачисления на игровой счёт - 5 минут.</li>
                                </ul>
                            </div>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 2 ? 'active' : ''}`}>
                            <div className="title qiwi" onClick={this.setActiveItem.bind(this, 2)}>
                                <p>Qiwi-терминал</p>
                            </div>
                            <div className="hidden">
                                <p>
                                    Вы можете пополнить свой игровой счет с помощью Qiwi терминала. Вам следует войти в
                                    раздел "Оплата услуг", затем Вы переходите в "Букмекеры, игры и лотереи", далее
                                    выбираем "Maxline". В открывшемся окне вам следует ввести номер вашего игрового
                                    счета. Далее нажимаете клавишу "Вперед". Вам осталось лишь вставить купюры в
                                    купюроприемник и подтвердить указанную сумму.
                                </p>
                                <p>
                                    <a href="https://www.youtube.com/watch?v=71wlaZSGayg" target="_blank">Видеоинструкция</a>
                                </p>
                            </div>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 3 ? 'active' : ''}`}>
                            <div className="title agava" onClick={this.setActiveItem.bind(this, 3)}>
                                <p>Agava-терминал</p>
                            </div>
                            <div className="hidden">
                                <p>Вы можете пополнить свой игровой счет с помощью Agava-терминала.
                                    Обращаем Ваше внимание, что не во всех терминалах есть возможность внесения суммы
                                    монетами.</p>
                                <p>Maxline оплачивает комиссию за Вас в 236 платежных терминалах.
                                    <a href="/assets/files/agava_terminals.pdf" target="_blank">Список платежных
                                        терминалов</a>
                                </p>
                                <ul>
                                    <li>Комиссия до 4-х рублей - 0,5 руб;</li>
                                    <li>Комиссия от 4-х рублей - 0%;</li>
                                    <li>Минимальная сумма - 0,5 руб;</li>
                                    <li>Максимальная сумма - 999 руб.</li>
                                </ul>
                            </div>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 4 ? 'active' : ''}`}>
                            <div className="title erip" onClick={this.setActiveItem.bind(this, 4)}>
                                <p>«Расчет» (ЕРИП)</p>
                            </div>
                            <div className="hidden">
                                <p>Вы можете оплачивать услуги в 27 банках Республики Беларусь, воспользоваться свыше
                                    15553
                                    пунктов банковского обслуживания: кассы банка, банкоматы, инфокиоски, устройства
                                    приема
                                    наличных денег (cash-in). Наибольшие удобства система «Расчет» создает для
                                    пользователей
                                    Интернет-банка и для систем электронных денег.
                                </p>
                            </div>
                            <div className="hidden">
                                <p>Игровой счёт можно пополнить в пунктах банковского обслуживания:</p>
                                <ul>
                                    <li>ОАО «Белагропромбанк»</li>
                                    <li>«Приорбанк» ОАО</li>
                                    <li>ОАО «БПС-Сбербанк»</li>
                                    <li>ОАО «Белинвестбанк»</li>
                                    <li>ОАО «Технобанк»</li>
                                    <li>ОАО «Паритетбанк»</li>
                                    <li>ОАО «Белгазпромбанк»</li>
                                    <li>ЗАО «Идея Банк»</li>
                                    <li>ЗАО «РРБ-Банк»</li>
                                    <li>ЗАО «МТБанк»</li>
                                    <li>ЗАО «Трастбанк»</li>
                                    <li>ЗАО «Дельта Банк»</li>
                                    <li>ОАО «Банк БелВЭБ»</li>
                                    <li>ЗАО «ИнтерПэйБанк»</li>
                                    <li>ЗАО «БТА Банк»</li>
                                    <li>ОАО «АСБ Беларусбанк»</li>
                                    <li>ОАО «Банк Дабрабыт»</li>
                                    <li>ОАО «Хоум Кредит Банк»</li>
                                    <li>ЗАО «Банк ВТБ» (Беларусь)</li>
                                    <li>ОАО «БНБ-Банк»</li>
                                    <li>«Франсабанк» ОАО</li>
                                    <li>ЗАО «Евробанк»</li>
                                    <li>ЗАО «Цептер Банк»</li>
                                    <li>ЗАО «АБСОЛЮТБАНК»</li>
                                    <li>ЗАО «БСБ Банк»</li>
                                    <li>ЗАО «Альфа-Банк»</li>
                                    <li>«Евроторгинвестбанк» ОАО</li>
                                </ul>
                                <div className="note">
                                    <div>
                                        При пополнении игрового счета платежной карточкой или наличными деньгами в кассе
                                        одного
                                        из вышеперечисленных банков.
                                        Вы должны сообщить кассиру о необходимости проведения оплаты услуги «maxline.by
                                        -
                                        Ставки» через систему «Расчет» (ЕРИП),
                                        а затем назвать:
                                    </div>
                                    <ul>
                                        <li>Номер вашего игрового счета на нашем сайте;</li>
                                        <li>Фамилию, И.О.;</li>
                                        <li>Сумму.</li>
                                    </ul>
                                </div>
                                <h4>Инфокиоски, банкоматы, WebMoney, iPay, BelQI</h4>
                                <p>В разделе "Платежи" выберите пункты: Система "Расчет" (ЕРИП), затем
                                    "Интернет-магазины /
                                    сервисы - Букмекерские конторы - Maxline.by ставки".</p>
                                <p>Ведите номер Вашего игрового счета и сумму.</p>

                                <ul>
                                    <li>Минимальная сумма - 0.50 руб.;</li>
                                    <li>Комиссия - 0%;</li>
                                    <li>Время зачисления на игровой счёт - 5 минут.</li>
                                </ul>
                            </div>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 5 ? 'active' : ''}`}>
                            <div className="title sviaznoi" onClick={this.setActiveItem.bind(this, 5)}>
                                <p>Связной</p>
                            </div>
                            <div className="hidden">
                                <p>Вы можете пополнить свой игровой счёт <b>Maxline</b> можно в салонах сотовой связи
                                    "Связной" посредством платежных терминалов или обратившись к кассиру.</p>
                            </div>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 6 ? 'active' : ''}`}>
                            <div className="title evroset" onClick={this.setActiveItem.bind(this, 6)}>
                                <p>Евросеть</p>
                            </div>
                            <div className="hidden">
                                <p>Вы можете пополнить свой игровой счёт <b>Maxline</b> можно в салонах сотовой связи
                                    "Евросеть" посредством платежных терминалов или обратившись к кассиру.</p>
                            </div>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 7 ? 'active' : ''}`}>
                            <div className="title ipay" onClick={this.setActiveItem.bind(this, 7)}>
                                <p>iPay</p>
                            </div>
                            <div className="hidden">
                                <p>
                                    Для оплаты с мобильного телефона отправьте СМС-сообщение на номер 553 с текстом:
                                    750 &lt;Номер счета&gt;&nbsp;&lt;Сумма платежа&gt; Пример СМС-сообщения: "750 10001
                                    1".

                                </p>

                                <div className="note">
                                    Обратите внимание:

                                    <ul>
                                        <li>
                                            Разделитель между параметрами в СМС - символ пробела;
                                            Сумма заказа будет списана с баланса мобильного телефона;
                                            По правилам системы iPay после оплаты на Вашем балансе должно остаться не
                                            менее 0.10
                                            бел. руб. для абонентов МТС и Velcom, не менее 0.50 бел. руб. - для
                                            абонентов
                                            life:);
                                            Отправка СМС на номер 553 бесплатна для абонентов МТС и life:), с абонентов
                                            Velcom
                                            взымается плата в размере 0.10 бел. руб.;
                                        </li>
                                        <li>
                                            Для оплаты через сайт системы iPay для абонентов МТС перейдите на сайт iPay
                                            по
                                            ссылке <a href="https://mts.ipay.by:4443/pls/iPay/!iSOU.Login?srv_no=19533">ipay.by</a>
                                        </li>
                                        <li>
                                            Для оплаты через сайт системы iPay для абонентов life:) перейдите на сайт
                                            iPay по
                                            ссылке <a href="http://gate.besmart.by/ipaylife/!iSOU.Login?srv_no=19533&opt=1">ipay.by</a>
                                        </li>
                                        <li>
                                            Для оплаты через сайт системы iPay для абонентов Velcom перейдите на сайт
                                            iPay по
                                            ссылке <a href="https://velcom.ipay.by/ipay_velcom/!iSOU.Login?srv_no=19533">ipay.by</a>
                                        </li>
                                    </ul>

                                    <p>
                                        Для оплаты через сайт системы iPay после входа в личный кабинет в разделе
                                        "Перечень
                                        услуг" выберите систему "Расчет" (ЕРИП), затем "Интернет-магазины / сервисы" и в
                                        алфавите на букву "M" выберите "maxline.by - Ставки". Введите номер Вашего
                                        игрового
                                        счета и сумму.
                                    </p>
                                    <p>Минимальная сумма - 0.50 руб.;</p>
                                    <p>Минимальная сумма - 0.50 руб.;</p>
                                </div>
                            </div>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 8 ? 'active' : ''}`}>
                            <div className="title pps" onClick={this.setActiveItem.bind(this, 8)}>
                                <p>Пункты приёма ставок</p>
                            </div>
                            <div className="hidden">
                                <p>
                                    Игровой счет на сайте будет пополнен моментально.
                                </p>
                                <p>
                                    {/*Минимальная сумма - 1.00 руб.;*/}
                                    Комиссия - 0%;
                                    Время зачисления на игровой счёт - моментально.
                                </p>
                                <div className="note">
                                    Список ППС:
                                    <ul>
                                        <li>г. Барановичи ул. Гагарина д. 2</li>
                                        <li>г. Бобруйск ул. Ульяновская д. 70Б</li>
                                        <li>г. Брест ул. Дзержинского, д. 50, к. 15</li>
                                        <li>г. Витебск ул. Замковая, 5/2</li>
                                        <li>г. Гомель ул. Красноармейская, д. 7, помещение № 7</li>
                                        <li>г. Гродно пр. Клецкова, д. 21б-2, часть № 2, помещение № 23</li>
                                        <li>г. Минск пр-т Независимости, 179А (здание ТЦ "Спектр")</li>
                                        <li>г. Мозырь ул. Пролетарская, 81</li>
                                        <li>г. Могилев пер. Пожарный 11, 2-й этаж</li>
                                        <li>г. Новополоцк ул.Молодежная, 169/1-1</li>
                                        <li>г. Молодечно, ул. Волынца, 12М-2;</li>
                                        <li>г. Минск, ул. Алибегова, 12Б, помещение 10;</li>
                                        <li>г. Борисов, пр. Революции, 16, помещение №1;</li>
                                        <li>г. Слоним, ул. Красноармейская, 90, помещение №23;</li>
                                        <li>г. Гродно, ул. Виленская, 2, помещение №19;</li>
                                        <li>г. Солигорск, бульвар Шахтеров, 5А.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <PageTitle text={'Способы получения выигрыша'}/>

                <div className="page__data payments">
                    <div className="payments__items">
                        <div className={`${itemClass} ${this.state.activeIndex === 9 ? 'active' : ''}`}>
                            <div className="title visa-master" onClick={this.setActiveItem.bind(this, 9)}>
                                <p>Visa/MasterCard</p>
                            </div>
                            <div className="hidden">
                                <p>Для получения выигрыша клиент должен сделать заказ на получение денег на сайте
                                    букмекерской конторы. Выплаты производятся только на карты, которые были привязаны к
                                    игровому счёту путем пополнения игрового счета
                                    на <a href="https://maxline.by/">maxline.by</a>.
                                    Выводить денежные средства возможно только на карту, которая открыта на
                                    владельца игрового счёта, 3 раза в течение 24 часов.
                                </p>
                                <p><a href="https://maxline.by/page/fast-payment">Подробная информация о быстрых
                                    выплатах</a></p>
                                <p><span className="red">*</span> В связи с тем, что срок зачисления денежных средств на
                                    карту
                                    устанавливает банк, выплаты на карту МТБанка могут производиться в течение 3-х
                                    банковских дней.</p>
                            </div>
                            <div className="hidden">
                                <ul>
                                    <li>Минимальная сумма: 30 BYN;</li>
                                    <li>Максимальная сумма заказа зависит от типа банковской карты:</li>
                                </ul>

                                <br/>
                                <p><b>Visa:</b></p>
                                <ul>
                                    <li>Не более 1000 BYN на одну операцию;</li>
                                    <li>Не более 6000 BYN суммарно за 4 суток.</li>
                                </ul>

                                <br/>
                                <p><b>MasterCard:</b></p>
                                <ul>
                                    <li>Не более 5000 BYN на одну операцию.</li>
                                </ul>

                                <br/>
                                <p>В случае, если Вы хотите вывести сумму, превышающую максимальную, Вам необходимо
                                    воспользоваться стандартной формой заказа на выплату. Выплаты осуществляются
                                    круглосуточно.<br/>
                                    Комиссию банка за перевод оплачивает Maxline.<br/>
                                    Время зачисления: от нескольких минут до 12 часов.
                                </p>
                            </div>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 10 ? 'active' : ''}`}>
                            <div className="title pps out_pps" onClick={this.setActiveItem.bind(this, 10)}>
                                <p>Пункты приёма ставок</p>
                            </div>
                            <div className="hidden">
                                <p>
                                    Для получения выигрыша клиент должен сделать заказ на получение денег на сайте
                                    букмекерской конторы. Получить заказанную сумму можно в пунктах приемах ставок,
                                    указанных на сайте сразу после подтверждения заказа. При получении денег необходимо
                                    предъявить паспорт.
                                </p>
                            </div>
                            <div className="hidden">
                                <p>Минимальная сумма - 1.00 руб.;</p>
                                <p>Комиссия - 0%;</p>
                                <p>Время зачисления - 24 часа.</p>

                                <div className="note">
                                    Список ППС:
                                    <ul>
                                        <li>г. Барановичи ул. Гагарина д. 2</li>
                                        <li>г. Бобруйск ул. Ульяновская д. 70Б</li>
                                        <li>г. Брест ул. Дзержинского, д. 50, к. 15</li>
                                        <li>г. Витебск ул. Замковая, 5/2</li>
                                        <li>г. Гомель ул. Красноармейская, д. 7, помещение № 7</li>
                                        <li>г. Гродно пр. Клецкова, д. 21б-2, часть № 2, помещение № 23</li>
                                        <li>г. Минск пр-т Независимости, 179А (здание ТЦ "Спектр")</li>
                                        <li>г. Мозырь ул. Пролетарская, 81</li>
                                        <li>г. Могилев пер. Пожарный 11, 2-й этаж</li>
                                        <li>г. Новополоцк ул.Молодежная, 169/1-1</li>
                                    </ul>
                                </div>

                            </div>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 11 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 11)}>
                            <div className="title ipay">
                                <p>Мобильный телефон (IPay)</p>
                            </div>
                            <div className="hidden">
                                <p>
                                    Для получения выигрыша клиент должен сделать заказ на получение денег на сайте
                                    букмекерской конторы.
                                </p>

                                <p>
                                    Букмекерская контора вправе потребовать паспорт (отсканированную копию по
                                    электронной почте) для подтверждения личности игрока, получающего выигрыш через
                                    Белинвестбанк.
                                </p>
                                <p>Минимальная сумма - 1.00 руб.;</p>
                                <p>Максимальная сумма - 50.00 руб.;</p>
                                <p>Время зачисления на счёт сотового оператора - мгновенно.</p>
                                <p>Список доступных операторов:</p>
                                <ul>
                                    <li>МТС</li>
                                    <li>Velcom</li>
                                    <li>Life</li>
                                </ul>
                            </div>

                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 12 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 12)}>
                            <div className="title belinvestbank">
                                <p>Наличными в Белинвестбанке</p>
                            </div>
                            <div className="hidden">
                                <p>
                                    Вам следует заказать в Вашем личном кабинете выплату в Белинвестбанке (выплата
                                    наличными в Белинвестбанке), Посетить любое отделение Белинвестбанка, сообщить
                                    кассиру, что на Ваше имя поступили денежные средства, предъявить паспорт и забрать
                                    деньги! Для заказа денежных средств Вам не обязательно быть клиентом Белинвестбанка,
                                    удобство доступно для каждого нашего игрока. Деньги будут перечислены в течение 3-х
                                    часов с момента подтверждения выплаты.
                                </p>
                                <p>
                                    <a href="https://www.belinvestbank.by/geo/" target="_blank">Список подразделений
                                        Белинвестбанка</a>
                                </p>
                                <div className="note">
                                    Обращаем Ваше внимание, что некоторые подразделения осуществляют исключительно
                                    валютно-обменные операции, получить свои деньги в подобных подразделениях не
                                    представляется возможным.
                                </div>
                                <p>
                                    Букмекерская контора вправе потребовать паспорт (отсканированную копию по
                                    электронной почте) для подтверждения личности игрока, получающего выигрыш через
                                    Белинвестбанк.
                                </p>
                                <p>Минимальная сумма - 10.00 руб.;</p>
                                <p>Комиссия - 0%;</p>
                                <p>Время зачисления в течение 1-2 банковских дней.</p>

                            </div>

                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 13 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 13)}>
                            <div className="title belarusbank">
                                <p>Беларусбанк</p>
                            </div>
                            <div className="hidden">
                                <p>
                                    Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в
                                    личном
                                    кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                                </p>
                                <p>
                                    Букмекерская контора вправе потребовать паспорт (отсканированную копию по
                                    электронной
                                    почте) для подтверждения личности игрока, получающего выигрыш через Беларусбанк.
                                </p>
                                <ul>
                                    <li>Минимальная сумма - 10.00 руб.;</li>
                                    <li>Комиссия - 0%;</li>
                                    <li>Время зачисления в течение 1-2 банковских дней.</li>
                                </ul>
                            </div>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 14 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 14)}>
                            <div className="title belagro">
                                <p>Белагропромбанк</p>
                            </div>
                            <p className="hidden">
                                Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в личном
                                кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                            </p>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 15 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 15)}>
                            <div className="title priorbank">
                                <p>Приорбанк</p>
                            </div>
                            <p className="hidden">
                                Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в личном
                                кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                            </p>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 16 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 16)}>
                            <div className="title bps-bank">
                                <p>БПС-Сбербанк</p>
                            </div>
                            <p className="hidden">
                                Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в личном
                                кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                            </p>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 17 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 17)}>
                            <div className="title techno-bank">
                                <p>Технобанк</p>
                            </div>
                            <p className="hidden">
                                Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в личном
                                кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                            </p>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 18 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 18)}>
                            <div className="title belinvestbank">
                                <p>Белинвестбанк</p>
                            </div>
                            <p className="hidden">
                                Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в личном
                                кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                            </p>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 19 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 19)}>
                            <div className="title belweb">
                                <p>Белвэб банк</p>
                            </div>
                            <p className="hidden">
                                Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в личном
                                кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                            </p>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 20 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 20)}>
                            <div className="title mtbank">
                                <p>МТБанк</p>
                            </div>
                            <p className="hidden">
                                Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в личном
                                кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                            </p>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 21 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 21)}>
                            <div className="title belgazprombank">
                                <p>Белгазпромбанк</p>
                            </div>
                            <p className="hidden">
                                Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в личном
                                кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                            </p>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 22 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 22)}>
                            <div className="title bank-solution">
                                <p>Банк Решение</p>
                            </div>
                            <p className="hidden">
                                Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в личном
                                кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                            </p>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 23 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 23)}>
                            <div className="title paritetbank">
                                <p>Паритетбанк</p>
                            </div>
                            <p className="hidden">
                                Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в личном
                                кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                            </p>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 24 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 24)}>
                            <div className="title dabrabit">
                                <p>Банк Дабрабыт</p>
                            </div>
                            <p className="hidden">
                                Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в личном
                                кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                            </p>
                        </div>

                        <div className={`${itemClass} ${this.state.activeIndex === 25 ? 'active' : ''}`}
                             onClick={this.setActiveItem.bind(this, 25)}>
                            <div className="title alfa">
                                <p>Альфа-Банк</p>
                            </div>
                            <p className="hidden">
                                Для получения выигрыша клиент должен оформить заказ, заполнив форму в разделе в личном
                                кабинете пользователя. Заказ будет выполнен в течение 1-2 банковских дней.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => ({
        role : state.user.main.info.role,
    }),
    dispatch => ({})
)(Payments);

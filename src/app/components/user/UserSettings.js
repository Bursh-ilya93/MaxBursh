import React, {Component} from "react";
import UserHeader from "./UserHeader";
import {Checkbox, Dropdown} from "semantic-ui-react";

const options = [
    {key: "OFF", value: "OFF", text: "Отключена"},
    {key: "TEXT_COLOR", value: "TEXT_COLOR", text: "Изменение цвета коэффициента"},
    {key: "ARROW", value: "ARROW", text: "Стрелки"},
];

class UserSettings extends Component {
    key_dop = 'live_opened_dop';
    key_balance = 'balance_unshow';
    key_koeff = 'change_koeff';

    state = {
        live_opened_dop    : false,
        balance_unshow     : false,
        change_koeff       : false,
    };

    componentWillMount() {
        this.setState(() => ({
            live_opened_dop    : localStorage.getItem(this.key_dop) === null,
            balance_unshow     : localStorage.getItem(this.key_balance) === null,
            change_koeff       : localStorage.getItem(this.key_koeff) === null ? "OFF" : localStorage.getItem(this.key_koeff)
        }));
    }

    changeResult(key) {
        const value = localStorage.getItem(key);
        if ( value !== null ) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, "1");
        }

        this.setState(() => ({
            [key] : localStorage.getItem(key) === null
        }));
    }

    changeIndicateKoeff(key, eventValue) {
        const value = localStorage.getItem(key);
        if ( value !== null && eventValue === "OFF" ) {
            localStorage.removeItem(key);
        } else if ( eventValue !== "OFF" ) {
            localStorage.setItem(key, eventValue);
        }

        this.setState(() => ({
            [key] : localStorage.getItem(key)
        }));
    }


    render() {
        return (
            <div className="user-page">
                <div className="user-settings">
                    <UserHeader text={`Настройки аккаунта`}/>
                    <div className="settings">
                        <Checkbox
                            label={'Дополнительные исходы Live свёрнуты:'}
                            checked={!this.state.live_opened_dop}
                            onChange={() => this.changeResult(this.key_dop)}
                        />
                        <Checkbox
                            label={'Баланс не показывать:'}
                            checked={!this.state.balance_unshow}
                            onChange={() => this.changeResult(this.key_balance)}
                        />
                        <div className="filter-container">
                            <label>Индикация изменения коэффициентов:</label>
                            <Dropdown className={`input-filter`} options={options} selection onChange={(e, data) => this.changeIndicateKoeff(this.key_koeff, data.value)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserSettings;
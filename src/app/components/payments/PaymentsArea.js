import React, {Component} from "react";
import Breadcrumbs from "../Breadcrumbs";
import Payments from "./Payments";

const Menu = ({match}) => {
    return (
        <div className="payments-page__menu page__menu"/>
    )
};

class PaymentsArea extends Component {
    getBreadcumbs = () => {
        let data = [];
        data.push({key : '/', value : 'Главная'});
        data.push({key : '', value : 'Платежи'});
        return data;
    };

    render() {
        return (
            <div className="full-page payments-page">
                <div className={`payments-page__main`}>
                    <Menu/>
                    <div>
                        <Breadcrumbs data={this.getBreadcumbs()}/>
                        <Payments/>
                    </div>
                </div>
            </div>
        )
    }

}

export default PaymentsArea;
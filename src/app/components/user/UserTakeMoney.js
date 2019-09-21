import React from "react";
import UserHeader from "./UserHeader";
import Card from './take-money/TakeMoneyCard';
import Cash from './take-money/TakeMoneyCash';
import BelinvestCash from './take-money/TakeMoneyBelinvest';
import Mobile from './take-money/TakeMoneyMobile';
import TakeMoneyBank from "./take-money/TakeMoneyBank";

const UserTakeMoney = () => {
    return (
        <div className="user-page">
            <div className="take-money-operation">
                <UserHeader text={`Заказать выплату`}/>
                <div className="body">
                    <Card/>
                    <TakeMoneyBank/>
                    <Cash/>
                    <BelinvestCash/>
                    <Mobile/>
                </div>
            </div>
        </div>
    );
};

export default UserTakeMoney;
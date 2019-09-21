import React from "react";
import BANKS from '../../../../constans/banks';
import TakeMoneyHeader from "./TakeMoneyTitle";
import BankForm from "./form/BankForm";

const  TabBarBank = ({changeBank, activeBank}) => {
    const listBanks = BANKS.map(item => ({id: item.id, name: item.name}));

    return (
        <div className={'banks-toolbar'}>
            {listBanks
                .map(bank => {
                    return (
                        <div key={bank.id} className={`banks-toolbar__item ${bank.id == activeBank ? 'active' : '' }`} title={bank.name} onClick={() => changeBank(bank.id)}>
                            <img src={require(`../../../../assets/images/banks/${bank.id}.svg`)}/>
                        </div>
                    )
                })}
        </div>
    )
};


class TakeMoneyBank extends React.Component {
    state = {
        currBank    : 1,
    };

    changeBank = (id) => {
        this.setState({
            currBank: id
        });
    };

    render() {
        const {currBank} = this.state;
        const bankInfo = BANKS.find(i => i.id == currBank);

        return (
            <div className={'take-money take-money-operation__banks'}>
                <TakeMoneyHeader text={'Выберите ваш банк'}>
                    <img className={`bank`} src={require('../../../../assets/images/bank.svg')} alt="visa"/>
                </TakeMoneyHeader>
                <div className="body">
                    <div className={'take-money__attention attention-data'}>
                        <p className="info">Минимальная сумма для вывода - 10 BYN</p>
                    </div>
                    <TabBarBank activeBank={currBank} changeBank={(id) => this.changeBank(id)}/>
                    <BankForm bank={bankInfo}/>
                </div>
            </div>
        )
    }
}

export default TakeMoneyBank;
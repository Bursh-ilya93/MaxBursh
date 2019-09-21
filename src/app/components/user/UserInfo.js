import React from 'react';
import {connect} from "react-redux";

const UserInfo = ({user}) => {
  return (
      <div className='user-info'>
          <p className='user-info__item'><span className="title">Доступный баланс:</span><span className="bold">{user.money} {user.currency}</span></p>
          <p className='user-info__item'><span className="title">Бонус:</span><span className="bold">0 {user.currency}</span></p>
          <p className='user-info__item'><span className="title">№ счёта</span><span className="bold">{user.id}</span></p>
      </div>
  )
};

export default connect(
    state =>  ({
        user:  state.user.main.info
    }),
    dispatch =>  ({}),
)(UserInfo)
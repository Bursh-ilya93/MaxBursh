const PAYMENTS = {
    T_IN  : 1,
    T_OUT : 2,
    T_DEL : 3,

    S_ORDERED  : 1, // заказано
    S_RESOLVED : 2, // подтверждено
    S_REPAID   : 3, // выплачено
    S_RETURN   : 4, // возврат
    S_DURING   : 5, // в процессе

    M_CASH        : 1,
    M_ERIP        : 2,
    M_EASYPAY     : 3,
    M_BELARUSBANK : 8,
    M_BELGAZBANK  : 9,
    M_NEW_ERIP    : 10,
    M_EASYPAY_NEW : 11,
    M_QIWI        : 12,
    M_MOBILE      : 13
};

export default PAYMENTS;
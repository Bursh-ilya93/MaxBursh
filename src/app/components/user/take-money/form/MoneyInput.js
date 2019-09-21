import React from 'react';
import NumberFormat from "react-number-format";

class MoneyInput extends React.Component {

	static defaultProps = {
		decimalScale      : 2,
		fixedDecimalScale : true,
		decimalSeparator  : '.',
		thousandSeparator : ' ',
		suffix            : ' BYN'
	};

	render() {
		return (
			<NumberFormat {...this.props} />
		);
	}
}

export default MoneyInput;
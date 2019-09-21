import React, {Component} from "react";
import PropTypes from "prop-types";

class TakeMoneyHeader extends Component {
    static defaultProps = {
        text : ''
    };

    static propTypes = {
        text : PropTypes.string.isRequired,
    };

    render() {
        const {children} = this.props;

        return (
            <div className={`take-money__title`}>
                <div className={`take-money__title-text`}>{this.props.text}</div>
                <div className={`take-money__title-imgs`}>
                    {children}
                </div>
            </div>
        );
    }
}

export default TakeMoneyHeader;
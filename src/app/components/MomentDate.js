import React, {Component} from "react";
import PropTypes from "prop-types";
import moment from "moment";

// 1, 2-4, 5-20
const localize = {
	day    : ['день', 'дня', 'дней'],
	month  : ['месяц', 'месяца', 'месяцев'],
	year   : ['год', 'года', 'лет'],
	hour   : ['час', 'часа', 'часов'],
	minute : ['минута', 'минуты', 'минут'],
	second : ['секунда', 'секунды', 'секунд']
};

function parse(number, postfix) {
	const modulo = number > 20 ? number % 10 : number;
	if ( modulo === 1 ) {
		return `${number} ${postfix[0]}`;
	}
	if ( modulo >= 2 && modulo <= 4 ) {
		return `${number} ${postfix[1]}`;
	}
	if ( modulo > 4 ) {
		return `${number} ${postfix[2]}`;
	}
}

moment.updateLocale('en', {
	relativeTime : {
		future : "через %s",
		past   : "%s назад",
		s      : 'несколько секунд',
		ss     : function (number, withoutSuffix, key, isFuture) { return parse(number, localize.second); },
		m      : "минута",
		mm     : function (number, withoutSuffix, key, isFuture) { return parse(number, localize.minute); },
		h      : "час",
		hh     : function (number, withoutSuffix, key, isFuture) { return parse(number, localize.hour); },
		d      : "день",
		dd     : function (number, withoutSuffix, key, isFuture) { return parse(number, localize.day); },
		M      : "месяц",
		MM     : function (number, withoutSuffix, key, isFuture) { return parse(number, localize.month); },
		y      : "год",
		yy     : function (number, withoutSuffix, key, isFuture) { return parse(number, localize.year); },
	}
});

class MomentDate extends Component {
	/**
	 * date - дата по умолчанию
	 * isParseAll - парсить все даты, а не только "позавчера, вчера, сегодня, завтра, послезавтра"
	 * isLive - лайв событие или нет
	 * withTime - добавлять время после "сегодня" или "завтра". Напр.: "сегодня в 10:00", "завтра в 12:30". Работает только если isParseAll = false
	 * isFormatDate - просто вывести дату в формате "день.месяц.год часы.минуты"
	 *
	 * @type {{date: *|moment.Moment, isParseAll: boolean, isLive: boolean, withTime: boolean}}
	 */
	static defaultProps = {
		date                 : moment(),
		isParseAll           : true,
		isLive               : false,
		withTime             : false,
		withTitle            : false,
		isFormatDate         : false,
		parseTimeFromSeconds : false,
	};

	static propTypes = {
		date                 : PropTypes.string.isRequired,
		isParseAll           : PropTypes.bool,
		isLive               : PropTypes.bool,
		withTime             : PropTypes.bool,
		withTitle            : PropTypes.bool,
		isFormatDate         : PropTypes.bool,
		parseTimeFromSeconds : PropTypes.bool
	};

	static parseDate(props) {
		const {date, isParseAll, isLive, withTime, isFormatDate, parseTimeFromSeconds, isShortDate} = props;

		const dateMoment = !isNaN(date) ? moment.unix(date) : moment(date);

		if ( !dateMoment.isValid() ) {
			return 'Неверный формат даты!';
		}

		if ( isFormatDate ) {
			return dateMoment.format('DD.MM.YYYY HH:mm');
		}

		if (parseTimeFromSeconds) {
			const timeToSeconds = dateMoment.unix();
			const minutes = parseInt(timeToSeconds / 60);
			const seconds = timeToSeconds % 60;
			return (minutes < 10 ? `0${minutes}` : minutes) + ":" + (seconds < 10 ? `0${seconds}` : seconds);
		}

		if ( isParseAll && !isLive ) {
			return dateMoment.locale("en").fromNow();
		}

		if ( !isLive ) {
			if (isShortDate) {
				return dateMoment.format('DD.MM HH:mm');
			}

			const isBeforeYesterday = dateMoment.isSame(moment().subtract(2, 'days'), 'day');
			const isYesterday = dateMoment.isSame(moment().subtract(1, 'days'), 'day');
			const isToday = dateMoment.isSame(moment(), 'day');
			const isTomorrow = dateMoment.isSame(moment().add(1, 'days'), 'day');
			const isAfterTomorrow = dateMoment.isSame(moment().add(2, 'days'), 'day');

			if ( isToday && !withTime ) {
				return dateMoment.fromNow();
			}

			const postfixTime = withTime ? ` в ${dateMoment.format('HH:mm')}` : '';

			switch ( true ) {
				case isToday:
					return 'сегодня' + postfixTime;
				case isBeforeYesterday:
					return 'позавчера' + postfixTime;
				case isYesterday:
					return 'вчера' + postfixTime;
				case isTomorrow:
					return 'завтра' + postfixTime;
				case isAfterTomorrow:
					return 'послезавтра' + postfixTime;
			}
		}

		return isLive ? dateMoment.format('HH:mm') : dateMoment.format('DD.MM HH:mm');
	}

	withTitle() {
		const props = Object.assign({}, this.props);
		props['isFormatDate'] = false;
		props['isLive'] = false;

		return MomentDate.parseDate(props);
	}

	render() {
		const {withTitle} = this.props;
		// const title = withTitle ? this.withTitle() : '';
		const out = MomentDate.parseDate(this.props);

		return (
			<React.Fragment>{out}</React.Fragment>
		)
	}
}

export default MomentDate;
class BetHelper {
	isIssetBetInCoupon(data) {
		const result = {};

		data.forEach((item) => {
			if ( !result.hasOwnProperty(item.idEvent) ) {
				result[item.idEvent] = {};
			}

			if (!result[item.idEvent].hasOwnProperty(item.f)) {
				result[item.idEvent][item.f] = true;
			}
		});

		return result;
	}

	static isSelected(issetFactors, eventId, factorHash) {
		return issetFactors.hasOwnProperty(eventId) &&  issetFactors[eventId].hasOwnProperty(factorHash);
	}
}

export default BetHelper;
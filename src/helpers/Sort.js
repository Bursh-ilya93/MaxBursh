class Sort {
	static order(a, b) {
		const compA = a.name.toUpperCase();
		const compB = b.name.toUpperCase();
		return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
	}

	static orderByTeam(a, b) {
		const compA = a.team1.toUpperCase();
		const compB = b.team1.toUpperCase();
		return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
	}

	static orderByTime(a, b) {
		if (a.hasOwnProperty('time') && b.hasOwnProperty('time')) {
			const compA = a.time.toUpperCase();
			const compB = b.time.toUpperCase();
			return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
		}

		const compA = a.date.toUpperCase();
		const compB = b.date.toUpperCase();
		return (compA < compB) ? -1 : (compA > compB) ? 1 : 0;
	}
}

export default Sort;
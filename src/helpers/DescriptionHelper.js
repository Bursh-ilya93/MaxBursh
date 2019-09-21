class DescriptionHelper {
	data = {};

	constructor(data) {
		if ( data === '' ) {
			return;
		}
		const description = JSON.parse(data);

		this.data = {...description};
	}

	getData() {
		return this.data;
	}

	getTv() {
		return !this.isEmpty('tv') ? this.data['tv'] : '';
	}

	getVideoOnline() {
		return !this.isEmpty('video-online') ? this.data['video-online'] : '';
	}

	getTracker() {
		return !this.isEmpty('tracker') ? this.data['tracker'] : '';
	}

	getStatistic() {
		return !this.isEmpty('stat') ? this.data['stat'] : '';
	}

	isEmpty(prop) {
		if ( this.data.hasOwnProperty(prop)) {
			const item = this.data[prop];
			switch (typeof item){
				case "string":
					if (item.trim() !== '' )
						return false;
					break;
				case "number":
					if (item !== 0)
						return false;
					break;
			}
		}

		return true;
	}

}

export default DescriptionHelper;
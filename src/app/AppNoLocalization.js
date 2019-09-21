import React, {Component, Fragment} from "react";

class AppNoLocalization extends Component {
	render() {
		return (
			<Fragment>
				<div>Ошибка при загрузке приложения! Попробуйте обновить страницу или обратитесь в службу поддержки!</div>
				<div>Error loading app! Try to refresh the page or contact customer support!</div>
			</Fragment>
		);
	}
}

export default AppNoLocalization;
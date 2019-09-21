import React, {Component} from "react";
import {connect} from "react-redux";
import {Checkbox} from "semantic-ui-react";

class FilterSportComponent extends Component {
	render() {
		return (
			<section className={`main-page__filters`}>
				<Checkbox label={"Категории"} onChange={() => console.log('Категории')}/>
				<Checkbox label={"Виды спорта"} onChange={() => console.log('Виды спорта')}/>
			</section>
		)
	}
}

export const FilterSport = connect(
	state => ({}),
	dispatch => ({}),
)(FilterSportComponent);
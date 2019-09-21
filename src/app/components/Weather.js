import React, {Component} from "react";

const WeatherItem = class WeatherItemComponent extends Component {
    render() {
        const {img, value, units, name} = this.props;

        return (
            <div className={'weather__item'} title={name}>
                {img !== '' &&
                <div className={'weather__item__img'}>
                    <img src={require(`../../assets/images/weather/white/${img}.svg`)}/>
                </div>
                }
                <div className={'weather__item__value'}>
                    {value} {units}
                </div>
            </div>
        );
    }
};

class Weather extends Component {
    render() {
        const {data} = this.props;

        console.log(data);

        if ( Object.keys(data).length === 0 ) {
            return null;
        }

        const strings = [
            `${data.temp.name} ${data.temp.value > 0 ? `+${data.temp.value}` : data.temp.value} ${data.temp.units}`,
            `${data.humidity.name} ${data.humidity.value} ${data.humidity.units}`,
            `${data.wind.name} ${data.wind.speed} ${data.wind.units}`,
            `${data.pressure.name} ${data.pressure.value} ${data.pressure.units}`,
        ];

        const str = strings.join(', ');

        return (
            <div className={'weather'} title={str}>
                {/*<img src={'/assets/weather/green/info.svg'} alt={str}/>*/}
                <WeatherItem img="temperature" value={data.temp.value > 0 ? `+${data.temp.value}` : data.temp.value} units={data.temp.units} name={data.temp.name}/>
                <WeatherItem img="humidity" value={data.humidity.value} units={data.humidity.units} name={data.humidity.name}/>
                <WeatherItem img="wind" value={data.wind.speed} units={data.wind.units} name={data.wind.name}/>
                <WeatherItem img="pressure" value={data.pressure.value} units={data.pressure.units} name={data.pressure.name}/>
            </div>
        );
    }
}

export default Weather;
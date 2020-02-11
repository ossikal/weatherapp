import React from "react";

// ForecastCardSingle defines the content of a single forecast card

class ForecastCardSingle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
        };
       
    }

    render() {

        const date = new Date(this.props.time);
        let minutes = date.getMinutes();
        minutes = ("0" + minutes).slice(-2);


        return ( 
               <div className="forecastCard">
                    <p className="forecastTime">{date.getHours() + ":" + minutes}</p>
                   <img src={"http://openweathermap.org/img/wn/" + this.props.icon + ".png"} className="forecastWeatherIcon" alt="Weather icon"></img>
                   <p className="forecastTemp">{(this.props.temp  - 273.15).toFixed(0)} °C</p>
                   <div className="forecastExtra">
                        <p>{this.props.wind} m/s</p>
                        <p>{this.props.humidity} %</p>
                        <p>{this.props.rain} mm</p>
                   </div>
               </div>
        )
    }
}
  
export default ForecastCardSingle;


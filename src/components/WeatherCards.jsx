import React from "react";
import CurrentWeather from "./CurrentWeather"
import ForecastCards from "./ForecastCards"

// WeatherCards calls the right weather cards

class WeatherCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
       
    }


    render() {
        return ( 
            <div>
                {this.props.location !== "Kaikki" &&
                    <div>
                    <CurrentWeather 
                    location={this.props.location}
                    />
                    <ForecastCards
                    location={this.props.location}
                    />
                    </div>
                }

                {this.props.location === "Kaikki" &&
                    <div>
                        <CurrentWeather 
                        location={"Helsinki"}
                        />
                        <ForecastCards 
                        location={"Helsinki"}
                        />

                        <CurrentWeather 
                        location={"Jyväskylä"}
                        />
                        <ForecastCards 
                        location={"Jyväskylä"}
                        />

                        <CurrentWeather 
                        location={"Kuopio"}
                        />
                        <ForecastCards 
                        location={"Kuopio"}
                        />

                        <CurrentWeather 
                        location={"Tampere"}
                        />
                        <ForecastCards 
                        location={"Tampere"}
                        />
                    </div>
                }

                <div className="forecasts">

                </div>

            </div>



        )
    }
}
  
export default WeatherCards;


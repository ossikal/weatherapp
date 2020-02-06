import React from "react";
import CurrentWeather from "./CurrentWeather"

class WeatherCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
       
    }


    render() {
        return ( 
            <div>
                {this.props.location !== "Kaikki" &&
                    <CurrentWeather 
                    location={this.props.location}
                    />
                }

                {this.props.location === "Kaikki" &&
                    <div>
                        <CurrentWeather 
                        location={"Helsinki"}
                        />
                        <CurrentWeather 
                        location={"Jyväskylä"}
                        />
                        <CurrentWeather 
                        location={"Kuopio"}
                        />
                        <CurrentWeather 
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


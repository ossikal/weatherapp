import React from "react";
import ForecastCardSingle from "./ForecastCardSingle";


class ForecastCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            loading:true
        };
       
    }

    getCityId(location) {
        switch (location) {
            case 'Helsinki':
                return 658225;
            case 'Jyväskylä':
                return 655195;
            case 'Kuopio':
                return 650225;
            case 'Tampere':
                return 634964;
            default:
                return null;
        }
    }

    componentDidMount() {
        this.getData(this.getCityId(this.props.location))
    }

    componentDidUpdate(prevProps) {
        // Compare props or this creates an infinite loop
        if (this.props.location !== prevProps.location) {
            this.getData(this.getCityId(this.props.location))
        }
    }

     //Check HTTP status for fetch
     checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response

        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    getData(city_id) {
        const url = "http://api.openweathermap.org/data/2.5/forecast?id=" + city_id + "&APPID=" + process.env.REACT_APP_API_KEY;

        fetch(url)
            .then(this.checkStatus)
            .then(
                (response) => {return response.json()}
            )

            //Successful fetch
            .then(function(data) {
                this.setState({
                    results: data,
                    loading:false
                })
                console.log(this.state.results)
            }.bind(this))


            //Error handling
            .catch(function(error) {
                console.log(error)
                this.setState({
                    results: [],
                })
            }.bind(this))
    }


    render() {

    

        return ( 
            <div>
                    {this.state.loading === false &&
                    <div className="forecastCards">
                        
                    <ForecastCardSingle 
                        time={this.state.results.list[0].dt_txt}
                        icon={this.state.results.list[0].weather[0].icon}
                        temp={this.state.results.list[0].main.temp}
                        wind={this.state.results.list[0].wind.speed}
                        humidity={this.state.results.list[0].main.humidity}
                        rain={this.state.results.list[0].rain != null ? this.state.results.list[0].rain["3h"] : "0"}
                    />
                   
                    
                    <ForecastCardSingle 
                        time={this.state.results.list[1].dt_txt}
                        icon={this.state.results.list[1].weather[0].icon}
                        temp={this.state.results.list[1].main.temp}
                        wind={this.state.results.list[1].wind.speed}
                        humidity={this.state.results.list[1].main.humidity}
                        rain={this.state.results.list[1].rain != null ? this.state.results.list[1].rain["3h"] : "0"}
                    />

                    <ForecastCardSingle 
                        time={this.state.results.list[2].dt_txt}
                        icon={this.state.results.list[2].weather[0].icon}
                        temp={this.state.results.list[2].main.temp}
                        wind={this.state.results.list[2].wind.speed}
                        humidity={this.state.results.list[2].main.humidity}
                        rain={this.state.results.list[2].rain != null ? this.state.results.list[2].rain["3h"] : "0"}
                    />

                    <ForecastCardSingle 
                        time={this.state.results.list[3].dt_txt}
                        icon={this.state.results.list[3].weather[0].icon}
                        temp={this.state.results.list[3].main.temp}
                        wind={this.state.results.list[3].wind.speed}
                        humidity={this.state.results.list[3].main.humidity}
                        rain={this.state.results.list[3].rain != null ? this.state.results.list[3].rain["3h"] : "0"}
                    />

                    <ForecastCardSingle 
                        time={this.state.results.list[4].dt_txt}
                        icon={this.state.results.list[4].weather[0].icon}
                        temp={this.state.results.list[4].main.temp}
                        wind={this.state.results.list[4].wind.speed}
                        humidity={this.state.results.list[4].main.humidity}
                        rain={this.state.results.list[4].rain != null ? this.state.results.list[4].rain["3h"] : "0"}
                    />
                    
                    </div>
                    }
                
            </div>
        )
    }
}
  
export default ForecastCards;


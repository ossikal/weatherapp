import React from "react";
import ForecastCardSingle from "./ForecastCardSingle";


// ForecastCards renders the right amount of individual forecast cards

class ForecastCards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            loading:true
        };
       
    }

    // Get cityid for specified locations (needed in the API request)
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

    // API Fetch
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

                    {this.state.results.list.slice(0,5).map((value, index) => {
                            return (
                                <ForecastCardSingle 
                                time={this.state.results.list[index].dt_txt}
                                icon={this.state.results.list[index].weather[0].icon}
                                temp={this.state.results.list[index].main.temp}
                                wind={this.state.results.list[index].wind.speed}
                                humidity={this.state.results.list[index].main.humidity}
                                rain={this.state.results.list[index].rain != null ? this.state.results.list[index].rain["3h"] : "0"}
                            />
                            )
                    })}
        
                    </div>
                    }
                
            </div>
        )
    }
}
  
export default ForecastCards;


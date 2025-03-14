import React from "react";

// CurrentWeather renders individual current weather-cards

class CurrentWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            loading:true,
            currentTime: new Date()
        };  
        this.getData = this.getData.bind(this);
        this.getCityId = this.getCityId.bind(this);
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

    // Call getData function when component mounts
    componentDidMount() {
        this.getData(this.getCityId(this.props.location))
    }

    // Call getData function when component updates
    componentDidUpdate(prevProps) {
        // Compare props or this creates an infinite loop
        if (this.props.location !== prevProps.location) {
            this.getData(this.getCityId(this.props.location))
        }
    }

     // Check HTTP status for fetch
     checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response

        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    // API fetch
    getData(city_id) {
        // API request url, key comes from the .env file
        const url = "http://api.openweathermap.org/data/2.5/weather?id=" + city_id + "&APPID=" + process.env.REACT_APP_API_KEY;

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

        const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
        ];
        let minutes = this.state.currentTime.getMinutes();
        minutes = ("0" + minutes).slice(-2);

        return ( 
            <div>
                {this.state.loading === false &&
                <div className="currentWeather"> 
                    <div className="half">
                        <div className="top">
                            <h1 className="currentLocation">{this.props.location}</h1>
                            <span className="description">{this.state.results.weather[0].description}</span>
                        </div>

                        <div>
                            <span className="currentDate">{monthNames[this.state.currentTime.getMonth()] + " " + this.state.currentTime.getDate()}</span>
                            <span className="currentTime">{this.state.currentTime.getHours() + ":" + minutes}</span>
                        </div>
                    </div>

                    <div className="half">
                        <div className="top">
                            <img src={"http://openweathermap.org/img/wn/" + this.state.results.weather[0].icon + "@2x.png"} className="weatherIcon" alt="Weather icon"></img>
                            <h1 className="currentTemperature">{(this.state.results.main.temp - 273.15).toFixed(0)} °C</h1>
                        </div>

                        <div>
                            <p className="extraInfo">Wind: {this.state.results.wind.speed} m/s<br/>Humidity: {this.state.results.main.humidity}%</p>
                            <p className="extraInfo">Precipitation (3h): {(this.state.results.rain && typeof this.state.results.rain["3h"] !== "undefined") ? this.state.results.rain["3h"] : "0"} mm</p>
                        </div>
                    </div>
                </div>
                }
                
            </div>
        
        )
    }
}
  
export default CurrentWeather;




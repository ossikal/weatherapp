import React from "react";

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
        const url = "http://api.openweathermap.org/data/2.5/weather?id=" + city_id + "&APPID=" + process.env.REACT_APP_API_KEY;

        fetch(url)
            .then(this.checkStatus)
            .then(
                (response) => {return response.json()}
            )

            //Successful fetch
            .then(function(data) {
                console.log(data.name)
                this.setState({
                    results: data,
                    loading:false
                })
                console.log(this.state.results.weather[0].description)
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

        return ( 
            <div>
                {this.state.loading === false &&
                <div className="currentWeather"> 
                    <div>
                        <div className="top">
                            <h1 className="currentLocation">{this.props.location}</h1>
                            <span className="description">{this.state.results.weather[0].description}</span>
                        </div>

                        <div>
                            <span className="currentDate">{monthNames[this.state.currentTime.getMonth()] + " " + this.state.currentTime.getDate()}</span>
                            <span className="currentTime">{this.state.currentTime.getHours() + ":" + this.state.currentTime.getMinutes()}</span>
                        </div>
                    </div>

                    <div>
                        <div className="top">
                            <img src={"http://openweathermap.org/img/wn/" + this.state.results.weather[0].icon + "@2x.png"} className="weatherIcon" alt="Weather icon"></img>
                            <h1 className="currentTemperature">{(this.state.results.main.temp - 273.15).toFixed(0)} °C</h1>
                        </div>

                        <div>
                            <p className="extraInfo">Wind: {this.state.results.wind.speed} m/s<br/>Humidity: {this.state.results.main.humidity}%</p>
                            {this.state.results.rain && <p>Precipitation (3h): {this.state.results.rain.rain}</p>}
                        </div>
                    </div>
                </div>
                }
                
            </div>
        
        )
    }
}
  
export default CurrentWeather;




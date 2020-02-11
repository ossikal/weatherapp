import React from "react";
import WeatherCards from "./WeatherCards";

// Content calls the city select dropdown and the WeatherCards component

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "Kaikki",
        };
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(event) {
        this.setState({location: event.target.value});
    }

    render() {
        return ( 
            <div>
                <div className="cityselect">
                    <select value={this.state.location} onChange={this.handleChange}>
                        <option value="Kaikki" defaultValue>Kaikki kaupungit</option>
                        <option value="Helsinki">Helsinki</option>
                        <option value="Jyväskylä">Jyväskylä</option>
                        <option value="Kuopio">Kuopio</option>
                        <option value="Tampere">Tampere</option>
                    </select>
                </div>

                <WeatherCards 
                    location={this.state.location}
                />
                
            </div>


        )
    }
}
  
export default Content;


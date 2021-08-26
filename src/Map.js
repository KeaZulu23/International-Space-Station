// we will be using a Google Map React npm package. It is a component that was written over a small set of Google Maps API, and is perfect for our little project.

import React from 'react'
import GoogleMapReact from 'google-map-react'


//getting our coordinates.
const ISS_URL = "http://api.open-notify.org/iss-now.json"

const MAP_KEY = process.env.REACT_APP_MAP_KEY

// create a small component that is our icon and define it on top of the file; as well as define a variable img that is our ISS icon.
const img = <img src = "./iss.svg" alt = "iss" height = "30px"/>

const SpaceStation = ({ img }) => <div>{img}</div>

//a function to fetch latitude and longitude and save them into state.
class Map extends React.Component {
    state = {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 1
    }

    //fetch below
    componentDidMount(){
        this.getCoordinates()
        this.interval = setInterval(this.getCoordinates, 3000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    getCoordinates = () => {
        fetch(ISS_URL)
            .then(res => res.json())
            .then(data => this.setState({
                center: {
                    lat: data.iss_position.latitude,
                    lng: data.iss_position.longitude
                }
            }))
    }

    render(){
        console.log("LAT:", this.state.center.lat)
        console.log("LNG:", this.state.center.lng)
        
        // let’s add the SpaceStation component to the map and let's add latitude and longitude on top of the page to see the numbers change as the ISS travels:
        return(
            <div>
                <p>Latitude: {this.state.center.lat}</p>
                <p>Longitude: {this.state.center.lng}</p>
                <div className = "map" style={{ height: '100vh', width: '100%' }}>
                    <GoogleMapReact className = "map"
                        bootstrapURLKeys={{key: MAP_KEY }}
                        center={this.state.center}
                        zoom={this.state.zoom}
                    >
                    <SpaceStation

                        lat = {this.state.center.lat}
                        lng = {this.state.center.lng}
                        img = {img}
                    />
                    </GoogleMapReact>
                </div>
            </div>
        )
    }
}

export default Map
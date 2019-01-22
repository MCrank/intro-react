import React, { Component } from 'react';
import L from 'leaflet';
import {
  Map, TileLayer, Marker, Popup, Circle,
} from 'react-leaflet';

// import { Button } from 'reactstrap';
// import logo from './logo.svg';
import './App.scss';

const myIcon = L.icon({
  iconUrl:
    'data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDQ4NS4yMTMgNDg1LjIxMiIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDg1LjIxMyA0ODUuMjEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTQyNC41NjIsMzk0LjIzN2MwLDYyLjUxNi05NC4zMjEsOTAuOTc2LTE4MS45NTUsOTAuOTc2Yy04Ny42MjksMC0xODEuOTU2LTI4LjQ2LTE4MS45NTYtOTAuOTc2ICAgYzAtNTEuNzExLDY0LjU2Mi04MC4wNDksMTM2LjQ2NS04OC4zNDN2MzAuNzcxYy02MS4zNzUsNy43NTYtMTA2LjEzOSwzMC40NDMtMTA2LjEzOSw1Ny41NzIgICBjMCwzMy40OTEsNjcuODY0LDYwLjY0OSwxNTEuNjI5LDYwLjY0OWM4My43NTEsMCwxNTEuNjI4LTI3LjE1OCwxNTEuNjI4LTYwLjY0OWMwLTI3LjEyOS00NC43NzUtNDkuODE2LTEwNi4xMzktNTcuNTcydi0zMC43NzEgICBDMzU5Ljk5NywzMTQuMTg4LDQyNC41NjIsMzQyLjUyNiw0MjQuNTYyLDM5NC4yMzd6IE0yNDIuNjA2LDBjLTU4LjYwOSwwLTEwNi4xMzksNDcuNTMyLTEwNi4xMzksMTA2LjE0MSAgIGMwLDUzLjQyNCwzOS42MSw5Ny4xOTYsOTAuOTc2LDEwNC41OTh2MTgzLjQ5OGgzMC4zMjdWMjEwLjczOWM1MS4zNTItNy40MDIsOTAuOTgtNTEuMTc0LDkwLjk4LTEwNC41OTggICBDMzQ4Ljc1LDQ3LjUzMiwzMDEuMjE1LDAsMjQyLjYwNiwweiBNMjEyLjI3OSw5MC45NzhjLTE2Ljc2MiwwLTMwLjMyNC0xMy41NjUtMzAuMzI0LTMwLjMyN3MxMy41NjItMzAuMzI0LDMwLjMyNC0zMC4zMjQgICBjMTYuNzY0LDAsMzAuMzI3LDEzLjU2MiwzMC4zMjcsMzAuMzI0UzIyOS4wNDMsOTAuOTc4LDIxMi4yNzksOTAuOTc4eiIgZmlsbD0iIzAwNkRGMCIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=',
  iconSize: [25, 42],
  iconAnchor: [12.5, 42],
  popupAnchor: [0, -41],
  // shadowUrl: 'my-icon-shadow.png',
  // shadowSize: [68, 95],
  // shadowAnchor: [22, 94],
});

class App extends Component {
  state = {
    position: {
      lat: 51.505,
      lng: -0.09,
    },
    haveUsersLocation: false,
    zoom: 2,
    searchRadius: 24140
  };

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.setState({
            position: {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            },
            haveUsersLocation: true,
            zoom: 13,
          });
        },
        () => {
          fetch('https://ipapi.co/json')
            .then(res => res.json())
            .then((location) => {
              this.setState({
                position: {
                  lat: location.latitude,
                  lng: location.longitude,
                },
                haveUsersLocation: true,
                zoom: 13,
              });
            });
        },
        {
          enableHighAccuracy: true,
          timeout: 3000,
        },
      );
    } else {
      console.log('Geolocation is not supported by this browser');
    }
  }

  render() {
    const { position, zoom, searchRadius } = this.state;
    // const { zoom } = this.state;
    return (
      <div className="App">
        <Map className="map" center={position} zoom={zoom}>
          <TileLayer
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a></a>'
            url="http://{s}.tiles.wmflabs.org/hikebike/{z}/{x}/{y}.png"
            // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // attribution='<a href="https://www.maptiler.com/license/maps/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>'
            // url="https://maps.tilehosting.com/styles/streets/{z}/{x}/{y}@2x.png?key=r1rOorA2ZmP18dQLp6Dc"
          />
          {this.state.haveUsersLocation ? (
            <Marker position={position} icon={myIcon} location>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          ) : (
            ''
          )}
          <Circle center={position} fillColor="blue" radius={searchRadius} />
        </Map>
      </div>
    );
  }
}

export default App;

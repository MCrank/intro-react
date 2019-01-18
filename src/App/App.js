import React from 'react';
import {
  Map, GoogleApiWrapper, InfoWindow, Marker,
} from 'google-maps-react';
import LocationSearch from '../components/LocationSearch/LocationSearch';
import apiKeys from '../helpers/apiKeys';

import './App.scss';

const googleApiKey = apiKeys.googleMaps.apiKey;

const mapStyles = {
  width: '100%',
  height: '80vh',
};

class App extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    currentLocation: {
      lat: '',
      lng: '',
    },
  };

  componentDidMount() {
    if (navigator.geolocation) {
      console.log('Gelocation is supported');
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos;
        console.log('Navigator', coords);
        this.setState({
          currentLocation: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        });
      });
    } else {
      console.log('Geolocation is not supported by this browser');
    }
  }

  onMarkerClick = (props, marker, e) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
  });

  onMarkerHover = (props, marker, e) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
  });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div className="search-box container">
          <LocationSearch/>
          {/* <div className="input-group my-5">
            <input type="text" className="form-control" placeholder="Enter Address" />
            <div className="input-group-append">
              <span className="input-group-text" id="basic-addon2">
                Search
              </span>
            </div>
          </div> */}
        </div>
        <div className="container">
          <Map
            className="main-map container"
            google={this.props.google}
            onClick={this.onMapClicked}
            zoom={10}
            style={mapStyles}
            initialCenter={{ lat: 36.16784, lng: -86.77816 }}
          >
            <Marker
              className="marker"
              onMouseover={this.onMarkerHover}
              onClick={this.onMarkerClick}
              name={'Home'}
              position={{ lat: 36.0237, lng: -86.751671 }}
              icon={{
                url:
                  'http://www.enworld.org/forum/attachment.php?attachmentid=62508&amp;d=1404384554&amp;stc=1',
                anchor: new this.props.google.maps.Point(16, 16),
                scaledSize: new this.props.google.maps.Size(32, 32),
              }}
            />
            <Marker
              className="marker"
              onMouseover={this.onMarkerHover}
              onClick={this.onMarkerClick}
              name={'NSS'}
              position={{ lat: 36.13271, lng: -86.75657 }}
              icon={{
                url:
                  'https://cdn.nashvillepost.com/files/base/scomm/nvp/image/2016/08/640w/Nashville_Software_School.57acc5d422220.jpg',
                anchor: new this.props.google.maps.Point(16, 16),
                scaledSize: new this.props.google.maps.Size(32, 32),
              }}
            />
            <InfoWindow
              marker={this.state.activeMarker}
              visible={this.state.showingInfoWindow}
              onClose={this.onClose}
            >
              <div>
                <h3>{this.state.selectedPlace.name}</h3>
              </div>
            </InfoWindow>
          </Map>
        </div>
      </div>
    );
  }
}

// export default App;
export default GoogleApiWrapper({ apiKey: googleApiKey })(App);

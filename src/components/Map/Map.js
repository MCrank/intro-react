import React from 'react';
import './Map.scss';

class Map extends React.Component {
  componentDidMount() {
    this.loadMap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const { maps } = google;
    }
  }

  render() {
    return (
      <div className="Map">
        <h3>Loading Map...</h3>
      </div>
    );
  }
}

export default Map;

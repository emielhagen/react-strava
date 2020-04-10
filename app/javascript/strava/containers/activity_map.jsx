import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

class ActivityMap extends Component {
  determineCenter = () => {
    const { selectedActivity } = this.props
    if(!selectedActivity){
      return [5.2913, 52.1326]
    } else {
      return [selectedActivity.start_lng, selectedActivity.start_lat]
    }
  }

  componentDidMount() {
    // See .env for accesstoken, still to fix process.env undefined issue
    mapboxgl.accessToken = ''
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [5.2913, 52.1326],
      zoom: 6
    });
  }

  componentDidUpdate() {
    this.map.flyTo({
      zoom: 10,
      center: this.determineCenter(),
      essential: true
    })
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} className="mapContainer"></div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedActivity: state.selectedActivity
  }
}

export default connect(mapStateToProps)(ActivityMap);


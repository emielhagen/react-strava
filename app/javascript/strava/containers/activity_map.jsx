import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import mapboxgl from 'mapbox-gl';

const polyline = require('@mapbox/polyline');

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
    // TODO: Fix process.env undefined issue, in the meantime empty to prevent pushing api key to github
    mapboxgl.accessToken = '';
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [5.2913, 52.1326],
      zoom: 4
    });
    this.map.scrollZoom.disable();
  }

  componentDidUpdate() {
    if(this.props.selectedActivity.polyline) {
      const polylineArray = polyline.decode(this.props.selectedActivity.polyline);

      if(this.map.getSource('route')) {
        this.map.removeLayer('route');
        this.map.removeSource('route');
      }

      this.map.flyTo({
        zoom: 10,
        center: this.determineCenter(),
        essential: true
      })

      this.map.addSource('route', {
        'type': 'geojson',
        'data': {
          'type': 'Feature',
          'properties': {},
          'geometry': {
            'type': 'LineString',
            'coordinates': polylineArray.map(coord => [coord[1], coord[0]])
          }
        }
      });
      this.map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
          'line-join': 'round',
          'line-cap': 'round'
        },
        'paint': {
          'line-color': '#FF0000',
          'line-width': 2
        }
      });

      const boundsArray = polylineArray.map(coord => [coord[1], coord[0]]);
      const bounds = boundsArray.reduce(function(bounds, coord) {
          return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(boundsArray[0], boundsArray[0]));

        this.map.fitBounds(bounds, {
          padding: 20
      });
    } else {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    }
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


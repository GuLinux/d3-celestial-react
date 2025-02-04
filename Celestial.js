import React from 'react';
import * as d3 from './libs/d3.min';
import { createCelestial } from './libs/celestial';
import { get } from 'lodash';
require('./libs/d3.geo.projection.js');

const hour2CelestialDegree = (ra) => ra > 12 ? (ra - 24) * 15 : ra * 15;

const sanitize = config => ({
    ...config,
    center: config && config.center && [hour2CelestialDegree(config.center[0]), config.center[1], config.center[2] || 0],
});

export class Celestial extends React.Component {
    constructor(props) {
        super(props);
        this.celestial = createCelestial(d3);
        this.featuresCollections = [];
    }

    addFeaturesCollection = fc => this.featuresCollections.push(fc);

    componentDidMount = () => setTimeout(() => {
        this.containerMounted = new Date().getTime();
        this.featuresCollections.forEach(fc => fc(this.celestial));
        const { config, zoom } = this.props;
        this.celestial.display(sanitize(config));
        if(zoom > 0) {
            this.zoom(zoom);
        }
    }, 500);

    zoom = ratio => this.celestial.zoomBy(ratio);

    zoomTo = level => this.zoom(level / this.zoom());

    updateConfig = (prevConfig, nextConfig) => {
        if(this.updateConfigTimer) {
            clearTimeout(this.updateConfigTimer);
        }
        this.updateConfigTimer = setTimeout(() => {
            this.updateConfigTimer = null;
            this.celestial.apply(sanitize(nextConfig));
            if(
                get(prevConfig, 'stars.data') != get(nextConfig, 'stars.data') ||
                get(prevConfig, 'dsos.data') != get(nextConfig, 'dsos.data')
            ) {
                this.celestial.reload(sanitize(nextConfig));
            }
        }, 1000);
    }

    shouldComponentUpdate= (nextProps) => {
        const { config, zoom } = this.props;
        if(nextProps.config != config) {
            this.updateConfig(config, nextProps.config);
        }
        return false;
    }

    render = () => (
        <div id='celestial-map'>
            {React.Children.map(this.props.children, c => React.cloneElement(c, {addFeaturesCollection: this.addFeaturesCollection}))}
        </div>
    )
}


class CelestialFeaturesCollection extends React.PureComponent {
    constructor(props) {
        super(props);
        this.features = [];
    }

    addFeature = feature => this.features.push(feature);

    componentDidMount = () => {
        this.props.addFeaturesCollection(this.addToCelestial);
    }

    addToCelestial = celestial => celestial.add({
        type: 'raw',
        callback: () => this.celCallback(celestial),
        redraw: () => this.celRedraw(celestial),
    });

    celCallback = celestial => {
        const json = {
            type: 'FeatureCollection',
            features: this.features,
        }

        celestial.container.selectAll(`.${this.props.objectsClass}`)
            .data(json.features)
            .enter().append("path")
            .attr("class", this.props.objectsClass); 
        celestial.redraw();
    }

    celRedraw = celestial => {
        // Select the added objects by class name as given previously
        celestial.container.selectAll(`.${this.props.objectsClass}`).each( d => {
        // If point is visible (this doesn't work automatically for points)
            if (celestial.clip(d.geometry.coordinates)) {
                // get point coordinates
                let pt = celestial.mapProjection(d.geometry.coordinates);
                // object radius in pixel, could be varable depending on e.g. magnitude
                let r = this.props.absoluteSize ? d.properties.size : Math.pow(parseInt(d.properties.size) * 0.25, 0.5);
                // draw on canvas
                // Set object styles
                celestial.setStyle(this.props.symbolStyle);
                // Start the drawing path
                celestial.context.beginPath();
                // Thats a circle in html5 canvas
                celestial.context.arc(pt[0], pt[1], r, 0, 2 * Math.PI);
                // Finish the drawing path
                celestial.context.closePath();
                // Draw a line along the path with the prevoiusly set stroke color and line width      
                celestial.context.stroke();
                // Fill the object path with the prevoiusly set fill color
                celestial.context.fill();     
                // Set text styles       
                celestial.setTextStyle(this.props.textStyle);
                // and draw text on canvas
                celestial.context.fillText(d.properties.name, pt[0]+r, pt[1]+r);
            }
        });
    }

    render = () => React.Children.map(this.props.children, c => React.cloneElement(c, {addFeature: this.addFeature}));
}

class CelestialComponentPoint extends React.Component {
    componentDidMount = () => {
        const { ra, dec, id, ...properties } = this.props;
        this.props.addFeature({
            type: 'Feature',
            id,
            properties,
            geometry: {
                type: 'Point',
                coordinates: [hour2CelestialDegree(ra), dec],
            }
        });
    }
    render = () => null;
} 

Celestial.FeaturesCollection = CelestialFeaturesCollection;
Celestial.Point = CelestialComponentPoint;

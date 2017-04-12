import React from 'react';
import SafetyBulletin from './SafetyBulletin';
import PhotoGallery from './PhotoGallery';

class VehicleDashboard extends React.Component {

    render() {
        return (
        <div>
            <PhotoGallery make={this.props.match.params.make} model={this.props.match.params.model} year={this.props.match.params.year} />
            <SafetyBulletin id={this.props.match.params.id} />
        </div>
        )
    }
}

export default VehicleDashboard;
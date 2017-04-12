import React from 'react';
import SafetyBulletin from './SafetyBulletin';
import PhotoGallery from './PhotoGallery';
import ReviewContainer from './ReviewContainer';
import DashboardTitle from './DashboardTitle';
class VehicleDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        window.location.href = `/vehicle/maintenance/${this.props.match.params.id}`;
    }

    render() {
        return (
        <div>
            <DashboardTitle make={this.props.match.params.make} model={this.props.match.params.model} year={this.props.match.params.year}/>
            <PhotoGallery make={this.props.match.params.make} model={this.props.match.params.model} year={this.props.match.params.year} />
            <button id="btnMaintenance" onClick={this.onClick}>View Maintenance</button>
            <ReviewContainer make={this.props.match.params.make} model={this.props.match.params.model} year={this.props.match.params.year} />
            <SafetyBulletin id={this.props.match.params.id} />
        </div>
        )
    }
}

export default VehicleDashboard;
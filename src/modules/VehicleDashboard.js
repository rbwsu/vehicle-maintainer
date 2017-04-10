import React from 'react';
import SafetyBulletin from './SafetyBulletin';

class VehicleDashboard extends React.Component {

    render() {
        return (
        <div>
            <SafetyBulletin id={this.props.match.params.id} />
        </div>
        )
    }
}

export default VehicleDashboard;
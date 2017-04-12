import React from 'react';

class DashboardTitle extends React.Component {
    render() {
        return (
            <h1 className="dashboardTitle">{this.props.year} {this.props.make} {this.props.model}</h1>
        )
    }
}

export default DashboardTitle;
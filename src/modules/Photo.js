import React from 'react';

class Photo extends React.Component {
    render() {
        return (
            <div className="vehiclePhoto">
                <img src={this.props.imgSrc} />
            </div>
        )
    }
}
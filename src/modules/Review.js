import React from 'react';

class Review extends React.Component {
    render() {
        return (
            <div className="reviewDiv">
                <h4 className="reviewTitle">{this.props.title} - Rating: {this.props.rating}</h4>
                <p className="createDate">Created: {this.props.createDate}</p>
                <p className="review">{this.props.reviewText}</p>
            </div>
        )
    }
}

export default Review;
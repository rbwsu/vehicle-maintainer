import React from 'react';
import { reviewList } from '../services/vehicleService';
import Review from './Review';

class ReviewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            avgRating: ''
        }
    }

    componentDidMount() {
        reviewList(this.props.make,this.props.model,this.props.year)
            .then(res => {
                console.log(res);
                this.setState({
                    reviews: res.reviews,
                    avgRating: res.averageRating
                })
            })
    }

    render() {
        return (
            <div className="reviewContainer">
                <h3>Recent Reviews - Average Rating: {Math.round(this.state.avgRating * 10) / 10}</h3>
                {this.state.reviews.map(review => <Review rating={Math.round(review.userRating * 10) / 10 } title={review.title} reviewText={review.text} createDate={new Date(review.created).toLocaleDateString()} />)}
            </div>
        )
    }
}

export default ReviewContainer;
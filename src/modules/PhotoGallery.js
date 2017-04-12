import React from 'react';
import { photoList, findPhotoLink } from '../services/vehicleService';

class PhotoGallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: []
        }
    }
    
    componentDidMount() {
            photoList(this.props.make,this.props.model,this.props.year)
            .then(res => {
                console.log(res);
                this.setState({
                    photos: res.photos
                })
            }) 
    }

    render() {
        return (
        <div>
            <img className="vehiclePhoto" src={findPhotoLink(this.state.photos)} alt="" />
        </div>
        )
    }
}

export default PhotoGallery;
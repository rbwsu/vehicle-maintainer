import React from 'react';
import {safetyBulletin} from '../services/vehicleService.js';

class SafetyBulletin extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            safetyNotices: []
        }
    }

    componentDidMount() {
        console.log("id: " + this.props.id);
        safetyBulletin(this.props.id)
            .then(res => {
                this.setState({
                    safetyNotices: res.serviceBulletinHolder.filter(service => {
                        const thisYear = new Date().getFullYear();
                        const bulletinYear = new Date(service.bulletinDate).getFullYear();
                        return 2016 === bulletinYear;
                    })
                })
                console.log(res);
            })
    }

    render() {
        console.log(this.state.safetyNotices);
        return (
            <div>
                {this.state.safetyNotices.map(notice => `<h4 class="safetyNotice">Safety Notice: ${notice.bulletinNumber} Description: ${notice.componentDescription}</h4>`)}
            </div>
        )
    }
}

export default SafetyBulletin;
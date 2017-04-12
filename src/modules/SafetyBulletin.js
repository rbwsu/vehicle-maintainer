import React from 'react';
import {recallList} from '../services/vehicleService.js';

class SafetyBulletin extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            safetyNotices: []
        }
    }

    componentDidMount() {
        console.log("id: " + this.props.id);
        recallList(this.props.id)
            .then(res => {
                this.setState({
                    safetyNotices: res.recallHolder.filter(recall => recall.modelYear.indexOf(this.props.id) >= 0)
                })
                console.log(res);
            })
    }

    render() {
        console.log(this.state.recallList);
         return (
            <div className="recall">
                <h3>Vehicle Recalls</h3>
                {this.state.safetyNotices.map(notice => 
                    <span className="safetyNotice">Recall Notice: {notice.recallNumber} Description: {notice.defectDescription}</span>)}
            </div>
        )
    }
}

export default SafetyBulletin;
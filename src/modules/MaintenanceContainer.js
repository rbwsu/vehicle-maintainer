import React from 'react';
import { maintenanceList, convertMaintenanceList } from '../services/vehicleService';

class MaintenanceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            maintenance: [],
            actionHolder: []
        }
    }

    componentDidMount() {
        maintenanceList(this.props.match.params.id)
            .then(res => {
                this.setState({
                    actionHolder: res,
                    maintenance: convertMaintenanceList(res)
                })
                console.log(this.state.actionHolder);
                console.log(this.state.maintenance);
            })
    }

    render() {
        if (this.maintenance) {
            return (
                <div>
                    <h2>Recommended Maintenance</h2>
                    <ul>
                    {this.state.maintenance.map(m => {
                        console.log(m);
                        return (
                            <li>
                                <div>
                                    <p>Test Maintenance</p>
                                </div>
                            </li>
                        ) 

                    })}
                    </ul>
                </div>
            )
        } else {
            return (
                <h3>Loading...</h3>
            )
        }
    }
}

export default MaintenanceContainer
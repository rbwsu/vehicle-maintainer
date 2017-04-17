import React from 'react';
import { maintenanceList, convertMaintenanceList } from '../services/vehicleService';

class MaintenanceContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onBlur = this.onBlur.bind(this);
        this.state = {
            maintenance: [],
            originalMaintenance: []
        }
    }

    onBlur() {
        const inFilter = document.querySelector("#filterMiles");
        if (inFilter && inFilter.value) {
            const filterVal = inFilter.value;
            if (filterVal) {
                this.setState({
                    maintenance: this.state.originalMaintenance.filter(m => m.miles >= filterVal)
                })
            }
        }
    }

    componentDidMount() {
        maintenanceList(this.props.match.params.id)
            .then(res => {
                this.setState({
                    originalMaintenance: convertMaintenanceList(res),
                    maintenance: convertMaintenanceList(res)
                })
            })
    }

    render() {
            return (
                <div>
                    <h2>Recommended Maintenance</h2>
                    <label htmlFor="filterMiles">Filter by mileage: </label>
                    <input id="filterMiles" type="number" onBlur={this.onBlur} />
                    <ul>
                        {this.state.maintenance.map(m => {
                            return (
                                <li className="maintenanceItem">
                                    <div>
                                        <p className="itemTitle">{m.action} {m.item}</p>
                                        <p className="itemText">{m.miles} miles {m.months ? `or ${m.months} months` : ``}</p>
                                    </div>
                                </li>
                            )

                        })}
                    </ul>
                </div>
            )
    }
}

export default MaintenanceContainer
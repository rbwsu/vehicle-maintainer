import React from 'react';
import { Redirect } from 'react-router-dom';
import { makeList, findModelsByMake, findYearsByModelAndMake, findNiceMake, findNiceModel } from '../services/vehicleService';

class SelectVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.onMakeChange = this.onMakeChange.bind(this);
        this.onModelChange = this.onModelChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.state = {
            vehicleData: [],
            makes: [],
            models: [],
            years: [],
            isModelHidden: true,
            isYearHidden: true,
            isBtnHidden: true,
            make: "",
            model: "",
            year: 0,
            id: 0,
            redirect: false
        }
    }


    onMakeChange() {
        const selectMake = document.querySelector("#selectMake").value
        if (selectMake) {
            this.setState({
                models: findModelsByMake(this.state.vehicleData, selectMake),
                isModelHidden: false,
                isYearHidden: true,
                isBtnHidden: true
            })
        } else {
            this.setState({
                isModelHidden: true,
                isYearHidden: true,
                isBtnHidden: true
            })
        }
    }

    onModelChange() {
        const selectMake = document.querySelector("#selectMake").value
        const selectModel = document.querySelector("#selectModel").value
        if (selectMake && selectModel) {
            this.setState({
                years: findYearsByModelAndMake(this.state.vehicleData, selectMake, selectModel),
                isYearHidden: false,
                isBtnHidden: true
            })
        } else {
            this.setState({
                isYearHidden: true,
                isBtnHidden: true
            })
        }
    }

    onYearChange() {
        const selectMake = document.querySelector("#selectMake").value
        const selectModel = document.querySelector("#selectModel").value
        const selectYear = document.querySelector("#selectYear").value

        if (selectMake && selectModel && selectYear) {
            this.setState({
                isBtnHidden: false
            })
        } else {
            this.setState({
                isBtnHidden: true
            })
        }
    }

    onClick() {
        const selectMake = document.querySelector("#selectMake").value
        const selectModel = document.querySelector("#selectModel").value
        const selectYear = document.querySelector("#selectYear").value

        const modelYearId = this.state.vehicleData.filter(make => make.name === selectMake)
            .map(make => make.models)
            .map(models => models.filter(model => model.name === selectModel))
            .reduce((prev, curr, i) => curr)
            .map(model => model.years)
            .map(years => years.filter(year => year.year === parseInt(selectYear, 0)))
            .reduce((prev, curr, i) => curr)
            .reduce((prev, curr, i) => curr).id
        console.log(`Model/Year ID: ${modelYearId}`);
        const niceMake = findNiceMake(this.state.vehicleData, selectMake);
        const niceModel = findNiceModel(this.state.vehicleData, selectMake, selectModel);
        this.setState({
            make: niceMake,
            model: niceModel,
            year: selectYear,
            id: modelYearId,
            redirect: true
        })
    }

    componentDidMount() {
        makeList()
            .then(res => {
                this.setState({
                    vehicleData: res.makes,
                    makes: res.makes.map(make => make.name)
                })
            })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={`/vehicle/${this.state.make}/${this.state.model}/${this.state.year}/${this.state.id}`}/>
        } else if (this.state.makes.length > 0) {
            return (
                <div>
                    <div className="selectForm">
                        <div>
                            <label htmlFor="selectMake">Make:</label>
                            <select id="selectMake" onChange={this.onMakeChange}>
                                <option key=""></option>
                                {this.state.makes.map(make => <option key={make} value={make}>{make}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="selectModel" className={this.state.isModelHidden ? "hidden" : ""}>Model:</label>
                            <select id="selectModel" onChange={this.onModelChange} className={this.state.isModelHidden ? "hidden" : ""}>
                                <option key=""></option>
                                {this.state.models.map(model => <option key={model} value={model}>{model}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="selectYear" className={this.state.isYearHidden ? "hidden" : ""}>Year:</label>
                            <select id="selectYear" onChange={this.onYearChange} className={this.state.isYearHidden ? "hidden" : ""}>
                                <option key=""></option>
                                {this.state.years.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                        <button onClick={this.onClick} className={this.state.isBtnHidden ? "hidden" : ""}>Select</button>
                    </div>
                </div>
            )
        } else {
            return (<p>Loading...</p>)
        }
    }
}

export default SelectVehicle;
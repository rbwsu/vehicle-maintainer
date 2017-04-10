import React from 'react';
import { makeList, styleList } from '../services/vehicleService';

class SelectVehicle extends React.Component {
    constructor(props) {
        super(props);
        this.onMakeChange = this.onMakeChange.bind(this);
        this.onModelChange = this.onModelChange.bind(this);
        this.onYearChange = this.onYearChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onStyleChange = this.onStyleChange.bind(this);
        this.state = {
            vehicleData: [],
            makes: [],
            models: [],
            years: [],
            styles: [],
            isModelHidden: true,
            isYearHidden: true,
            isStyleHidden: true,
            isBtnHidden: true
        }
    }

    onMakeChange() {
        const selectMake = document.querySelector("#selectMake").value
        if (selectMake) {
            this.setState({
                models: this.state.vehicleData.filter(make => make.name === selectMake)
                    .map(make => make.models)
                    .map(models => models.map(model => model.name))
                    .reduce((prev, curr, i) => curr),
                isModelHidden: false,
                isYearHidden: true,
                isStyleHidden: true,
                isBtnHidden: true
            })
        } else {
            this.setState({
                isModelHidden: true,
                isYearHidden: true,
                isStyleHidden: true,
                isBtnHidden: true
            })
        }
    }

    onModelChange() {
        const selectMake = document.querySelector("#selectMake").value
        const selectModel = document.querySelector("#selectModel").value
        if (selectMake && selectModel) {
            this.setState({
                years: this.state.vehicleData.filter(make => make.name === selectMake)
                    .map(make => make.models)
                    .map(models => models.filter(model => model.name === selectModel))
                    .reduce((prev, curr, i) => curr)
                    .map(model => model.years)
                    .map(years => years.map(year => year.year))
                    .reduce((prev, curr, i) => curr),
                isYearHidden: false,
                isStyleHidden: true,
                isBtnHidden: true
            })
        } else {
            this.setState({
                isYearHidden: true,
                isStyleHidden: true,
                isBtnHidden: true
            })
        }
    }

    onYearChange() {
        const selectMake = document.querySelector("#selectMake").value
        const selectModel = document.querySelector("#selectModel").value
        const selectYear = document.querySelector("#selectYear").value

        if (selectMake && selectModel && selectYear) {
            styleList(selectMake, selectModel, selectYear)
                .then(res =>
                this.setState({
                    styles: res.styles,
                    isStyleHidden: false,
                    isBtnHidden: true
                }))
        } else {
            this.setState({
                isStyleHidden: true,
                isBtnHidden: true
            })
        }
    }

    onStyleChange() {
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

        window.location.href = `/vehicle/${modelYearId}`;
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
        if (this.state.makes.length > 0) {
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
                        <div>
                            <label htmlFor="selectStyle" className={this.state.isStyleHidden ? "hidden" : ""}>Style:</label>
                            <select id="selectStyle" onChange={this.onStyleChange} className={this.state.isStyleHidden ? "hidden" : ""}>
                                <option key=""></option>
                                {this.state.styles.map(style => <option key={style.name} value={style.name}>{style.name}</option>)}
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
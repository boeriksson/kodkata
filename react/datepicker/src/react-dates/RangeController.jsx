import React, { Component } from 'react';
import { DayPickerRangeController } from 'react-dates';
import moment from 'moment';
import './reactDates.css';

const RightArrow = () => (
    <div>
        <i style={{
            border: "solid black",
            borderWidth: "0 3px 3px 0",
            display: "inline-block",
            padding: "3px",
            transform: "rotate(-45deg)",
            WebkitTransform: "rotate(-45deg)"
        }}></i>
    </div>
);
const LeftArrow = () => (
    <div>
        <i style={{
            border: "solid black",
            borderWidth: "0 3px 3px 0",
            display: "inline-block",
            padding: "3px",
            transform: "rotate(135deg)",
            WebkitTransform: "rotate(135deg)"
        }}></i>
    </div>
);
const START_DATE = 'startDate';
const END_DATE = 'endDate';

class RangeController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            focusedInput: props.autoFocusEndDate ? END_DATE : START_DATE,
            startDate: props.initialStartDate,
            endDate: props.initialEndDate,
        };
        moment.locale('sv_SE');

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    onDatesChange({ startDate, endDate }) {
        const dateToMilli = (momentDate) => momentDate ? momentDate.valueOf() : null;
        const oldStartDate = dateToMilli(this.state.startDate);
        const oldEndDate = dateToMilli(this.state.endDate);
        const sDate = dateToMilli(startDate);
        const eDate = dateToMilli(endDate);

        if (sDate !== null && sDate === oldStartDate && this.state.focusedInput === START_DATE) {
            this.setState({
                startDate: startDate,
                endDate: null,
                focusedInput: START_DATE
            });
        } else if (sDate < oldStartDate && (eDate || oldEndDate)) {
            const localEndDate = endDate || this.state.endDate;
            this.setState({
                startDate,
                endDate: localEndDate,
                focusedInput: START_DATE,
            });
        } else if (sDate < oldStartDate && eDate === null) {
            this.setState({
                startDate,
                endDate: this.state.startDate,
                focusedInput: START_DATE
            })
        } else if (oldEndDate && sDate > oldEndDate) {
            this.setState({
                startDate: this.state.startDate,
                endDate: startDate,
                focusedInput: END_DATE
            })
        } else {
            this.setState({ startDate, endDate });
         }
    }

    onFocusChange(focusedInput) {
        this.setState({
            focusedInput: !focusedInput ? START_DATE : focusedInput,
        });
    }

    render() {
        const { focusedInput, startDate, endDate } = this.state;
        //console.log(`startDate: ${startDate}, endDate: ${endDate}, focusedInput: ${focusedInput}`);
        return (
            <div>
                <LeftArrow/>
                <RightArrow/>
                <DayPickerRangeController
                    startDate={ startDate }
                    endDate={ endDate }
                    onDatesChange={ this.onDatesChange }
                    focusedInput={ focusedInput }
                    onFocusChange={ this.onFocusChange }
                    navPrev={ <LeftArrow/> }
                    navNext={ <RightArrow/> }
                />
            </div>
        );
    }
}

RangeController.defaultProps = {
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,
};

export default RangeController;

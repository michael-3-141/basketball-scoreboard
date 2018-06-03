import React, { Component } from 'react';

class Timer extends Component {

    constructor() {
        super();

        this.formatMinutes = this.formatMinutes.bind(this);
        this.formatSeconds = this.formatSeconds.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clockClass = this.clockClass.bind(this);
    }

    formatMinutes() {
        return Math.floor(this.props.time > 6000 ? this.props.time/6000 : this.props.time/100).toString().padStart(2, '0');
    }

    formatSeconds() {
        let secs = Math.floor((this.props.time < 6000 && this.props.full) ? this.props.time%100 : (this.props.time%6000)/100);
        // if(!this.props.full && this.props.time < 100) {
        //     secs = this.props.time;
        // }
        return secs.toString().padStart(2, '0');
    }

    handleChange() {
        let mins = this.props.full ? Number.parseInt(this.refs.minutes.value, 10) : 0;
        let seconds = Number.parseInt(this.refs.seconds.value, 10);
        this.props.onChange((this.props.time > 6000 ? mins*6000 : mins*100) + ((this.props.time < 6000 && this.props.full) ? seconds : seconds*100));
    }

    clockClass() {
        return "timer" + ((!this.props.full && this.props.time === 0) ? " shot-clock-done" : "");
    }

    render() {
        return (
            <div id={this.props.id} className="timer-container">
                {this.props.full && [<input type="number" ref="minutes" className="timer" value={this.formatMinutes()} onChange={this.handleChange} />, <span>:</span>]}
                <input type="number" ref="seconds" className={this.clockClass()} value={this.formatSeconds()} onChange={this.handleChange}/>
            </div>
        );
    }
}

export default Timer;

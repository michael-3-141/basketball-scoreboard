import React, { Component } from 'react';
import './App.css';
import Timer from './Timer.js';
import {PointCount, PenaltyCount} from './PointCount.js'

class App extends Component {
    constructor() {
        super();

        this.state = {
            time: 60000,
            shotClock: 2400,
            paused: true,
            team1Points: 0,
            team2Points: 0,
            team1Penalty: 0,
            team2Penalty: 0
        }

        this.pause = this.pause.bind(this);
        this.resume = this.resume.bind(this);
        this.tick = this.tick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleClockChange = this.handleClockChange.bind(this);
        this.handlePenaltyChange = this.handlePenaltyChange.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keyup", this.handleKeyUp, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleKeyUp, false);
        if(!this.state.paused) this.pause();
    }

    pause() {
        this.setState({paused: true});
        clearInterval(this.timerId);
    }

    resume() {
        this.setState({paused: false});
        this.timerId = setInterval(this.tick, 10);
    }

    tick() {
        if(this.state.time > 0) {
            this.setState({time: this.state.time - 1});
        }
        if(this.state.shotClock > 0) {
            this.setState({shotClock: this.state.shotClock - 1});
        }
    }

    handleKeyUp(e) {
        if(document.activeElement.tagName === "INPUT") return;
        if(e.key === ' ') {
            if(this.state.paused) {
                this.resume();
            }
            else {
                this.pause();
            }
        }
        else if(e.key === 'w') {
            this.setState({shotClock: 2400});
        }
        else if(e.key === 's') {
            this.setState({shotClock: 1400});
        }
        else if(e.key === 'x' && (this.state.paused || this.state.time === 0)) {
            this.setState({time: 60000});
        }
        else if(e.key === 'a') {
            this.setState({team1Points: this.state.team1Points+1});
        }
        else if(e.key === 'd') {
            this.setState({team2Points: this.state.team2Points+1});
        }
        else if(e.key === 'z') {
            this.setState({team1Points: this.state.team1Points-1});
        }
        else if(e.key === 'c') {
            this.setState({team2Points: this.state.team2Points-1});
        }
        else if(e.key === 'q') {
            this.setState({team1Penalty: (this.state.team1Penalty+1) < 5 ? (this.state.team1Penalty+1) : 5});
        }
        else if(e.key === 'e') {
            this.setState({team2Penalty: (this.state.team2Penalty+1) < 5 ? (this.state.team2Penalty+1) : 5});
        }
        else if(e.key === '1') {
            this.setState({team1Penalty: (this.state.team1Penalty-1) >= 0 ? (this.state.team1Penalty-1) : 0});
        }
        else if(e.key === '3') {
            this.setState({team2Penalty: (this.state.team2Penalty-1) >= 0 ? (this.state.team2Penalty-1) : 0});
        }
    }

    handlePointChange(team, e) {
        let newState = {};
        newState['team' + team + 'Points'] = Number.parseInt(e.target.value, 10);
        this.setState(newState);
    }

    handlePenaltyChange(team, e) {
        let newState = {};
        newState['team' + team + 'Penalty'] = Number.parseInt(e.target.value, 10) < 5 ? Number.parseInt(e.target.value, 10) : 5;
        this.setState(newState);
    }

    handleTimeChange(newTime) {
        this.setState({time : newTime});
    }

    handleClockChange(newTime) {
        this.setState({shotClock : newTime});
    }

    render() {
        return (
            <div className="content">
                <PenaltyCount id="team-1-penalty" points={this.state.team1Penalty} onChange={this.handlePenaltyChange.bind(this, 1)} />
                <PointCount id="team-1-points" points={this.state.team1Points} onChange={this.handlePointChange.bind(this, 1)} />
                <input type="text" id="team-1-name" className="team-name" />
                <Timer id="game-time" time={this.state.time} full={true} onChange={this.handleTimeChange}/>
                <Timer id="shot-clock" time={this.state.shotClock} full={false} onChange={this.handleClockChange}/>
                <input type="text" id="team-2-name" className="team-name" />
                <PointCount id="team-2-points" points={this.state.team2Points} onChange={this.handlePointChange.bind(this, 2)} />
                <PenaltyCount id="team-2-penalty" points={this.state.team2Penalty} onChange={this.handlePenaltyChange.bind(this, 2)} />
            </div>
        );
    }
}

export default App;

import React, {Component} from 'react';

class PointCount extends Component {
    render() {
        return (
            <input type="number" id={this.props.id} className="point-count" value={this.props.points.toString().padStart(2, '0')} onChange={this.props.onChange} />
        );
    }
}

class PenaltyCount extends Component {
    render() {
        return (
            <input type="number" id={this.props.id} className="penalty-count" value={this.props.points} onChange={this.props.onChange} />
        );
    }
}

export {PointCount, PenaltyCount};
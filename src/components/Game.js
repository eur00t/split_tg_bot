import React from 'react';

const Countdown = ({ value }) => {
    return (
        <div className="countdown">
            {value}
        </div>
    );
};

const Answer = ({ onWrong, onCorrect }) => {
    return (
        <div className="answer">
            <div className="button" onClick={onCorrect}>
                Correct
            </div>
            <div className="button" onClick={onWrong}>
                Wrong
            </div>
        </div>
    );
};

const Puzzle = ({ isCorrect, data }) => {
    return (
        <div className="puzzle">
            {isCorrect ? '+' : '-'}
        </div>
    );
};

const Score = ({ value }) => {
    return (
        <div className="current-score">
            <h1>
                Your score: {value}
            </h1>
        </div>
    );
};

export default class extends React.PureComponent {
    constructor(props) {
        super(props);

        this.processCorrect = this.processCorrect.bind(this);
        this.processWrong = this.processWrong.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countdown === 0 && nextProps.active) {
            this.props.onFinish(this.props.id, this.props.score);
        }
    }

    processCorrect() {
        if (this.props.puzzle.isCorrect) {
            this.props.onCorrect();
        } else {
            this.props.onWrong();
        }
    }

    processWrong() {
        if (!this.props.puzzle.isCorrect) {
            this.props.onCorrect();
        } else {
            this.props.onWrong();
        }
    }

    getPuzzle(puzzle) {
        if (puzzle == null) {
            return null;
        }

        return <Puzzle {...puzzle} />;
    }

    getAnswer(puzzle) {
        if (puzzle == null) {
            return null;
        }

        return (
            <Answer
                onCorrect={this.processCorrect}
                onWrong={this.processWrong}
            />
        );
    }

    render() {
        const { countdown } = this.props;

        return (
            <div className="game">
                <Score value={this.props.score} />
                {this.getPuzzle(this.props.puzzle)}
                {this.getAnswer(this.props.puzzle)}
                <Countdown value={countdown} />
            </div>
        );
    }
}

import '../scss/puzzle.scss';
import '../scss/game.scss';
import React from 'react';

import { MAX_COUNTDOWN } from '../config';

const Countdown = ({ value, max }) => {
    return (
        <div className="countdown">
            <div className="cell" style={{ width: value / max * 100 + '%' }} />
        </div>
    );
};

const Answer = ({ onWrong, onCorrect }) => {
    return (
        <div className="answer">
            <div className="button correct" onClick={onCorrect}>
                Correct
            </div>
            <div className="button wrong" onClick={onWrong}>
                Wrong
            </div>
        </div>
    );
};

const Matrix = ({ m, size }) => {
    return (
        <div className="matrix">
            {m.map((row, i) => {
                const content = row.map((isFilled, j) => {
                    return (
                        <div
                            key={j}
                            className={'cell' + (isFilled ? ' filled' : '')}
                        />
                    );
                });

                return (
                    <div key={i} className="row">
                        {content}
                    </div>
                );
            })}
        </div>
    );
};

const Puzzle = ({ isCorrect, data: { size, m1, m2, res } }) => {
    return (
        <div className="puzzle">
            <div className="content">
                <div className="left">
                    <Matrix m={m1} size={size} />
                </div>
                ∪
                <div className="right">
                    <Matrix m={m2} size={size} />
                </div>
                =
                <div className="result">
                    <Matrix m={res} size={size} />
                </div>
            </div>
        </div>
    );
};

const Score = ({ value }) => {
    return (
        <div className="current-score">
            <h1>
                Score: {value}
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
                <Countdown value={countdown} max={MAX_COUNTDOWN} />
            </div>
        );
    }
}

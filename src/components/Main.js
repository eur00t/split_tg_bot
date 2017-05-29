import '../scss/main.scss';
import {
    requestHighScores,
    startGame,
    finishGame,
    gameCorrectAnswer,
    gameWrongAnswer
} from '../actions';
import React from 'react';

import HighScores from './HighScores';
import Game, { Puzzle } from './Game';

function wrapPage(key, ...elements) {
    return (
        <div key={key}>
            {elements}
        </div>
    );
}

class WrongAnswers extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false
        };

        this.expand = this.expand.bind(this);
    }

    expand() {
        this.setState(() => ({ expanded: true }));
    }

    render() {
        const { puzzles } = this.props;
        const { expanded } = this.state;

        let content;
        if (expanded) {
            content = (
                <div className="puzzles">
                    {puzzles.map((puzzle, i) => {
                        return (
                            <Puzzle
                                key={i}
                                {...puzzle}
                                showDisruptions={true}
                            />
                        );
                    })}
                </div>
            );
        }

        return (
            <div className="wrong-answers">
                <span onClick={this.expand} className="wrong-answers-btn">
                    Show wrong answers
                </span>
                {content}
            </div>
        );
    }
}

export default class extends React.PureComponent {
    constructor(props) {
        super(props);

        this.startGame = this.startGame.bind(this);
        this.finishGame = this.finishGame.bind(this);
        this.answerCorrect = this.answerCorrect.bind(this);
        this.answerWrong = this.answerWrong.bind(this);
        this.shareScore = this.shareScore.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(requestHighScores(this.props.game.userData));
    }

    startGame() {
        this.props.dispatch(startGame());
    }

    finishGame(id, score) {
        this.props.dispatch(finishGame(id, score, this.props.game.userData));
    }

    answerCorrect() {
        this.props.dispatch(gameCorrectAnswer());
    }

    answerWrong() {
        this.props.dispatch(gameWrongAnswer());
    }

    shareScore() {
        TelegramGameProxy.shareScore();
    }

    getStartButton(text) {
        return (
            <div
                className="button block"
                key="startButton"
                onClick={this.startGame}
            >
                {text}
            </div>
        );
    }

    getCurrentScore() {
        let shareButton;
        if (this.props.game.canShare) {
            shareButton = (
                <div className="button" onClick={this.shareScore}>
                    Share
                </div>
            );
        }

        return (
            <div key="currentScore" className="current-score">
                <h1>
                    Your score: {this.props.game.score}
                    {shareButton}
                </h1>
            </div>
        );
    }

    getContent(section) {
        switch (section) {
            case 'highScores':
                return wrapPage(
                    'highScores',
                    <HighScores key="highScores" {...this.props.highScores} />,
                    this.getStartButton('Start')
                );
            case 'game':
                return wrapPage(
                    'game',
                    <Game
                        key="game"
                        onFinish={this.finishGame}
                        onCorrect={this.answerCorrect}
                        onWrong={this.answerWrong}
                        {...this.props.game}
                    />
                );
            case 'gameOver':
                return wrapPage(
                    'gameResult',
                    this.getCurrentScore(),
                    <HighScores key="highScores" {...this.props.highScores} />,
                    this.getStartButton('Try again'),
                    <WrongAnswers
                        key="wrongAnswers"
                        puzzles={this.props.game.wrongAnswers}
                    />
                );
            default:
                return null;
        }
    }

    render() {
        return (
            <div className="main">
                {this.getContent(this.props.ui.section)}
            </div>
        );
    }
}

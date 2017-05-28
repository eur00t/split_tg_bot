import {
    requestHighScores,
    startGame,
    finishGame,
    gameCorrectAnswer,
    gameWrongAnswer
} from '../actions';
import React from 'react';

import HighScores from './HighScores';
import Game from './Game';

function wrapPage(key, ...elements) {
    return (
        <div key={key}>
            {elements}
        </div>
    );
}

export default class extends React.PureComponent {
    constructor(props) {
        super(props);

        this.startGame = this.startGame.bind(this);
        this.finishGame = this.finishGame.bind(this);
        this.answerCorrect = this.answerCorrect.bind(this);
        this.answerWrong = this.answerWrong.bind(this);
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

    getStartButton() {
        return (
            <div className="button" key="startButton" onClick={this.startGame}>
                Start
            </div>
        );
    }

    getCurrentScore() {
        return (
            <div key="currentScore" className="current-score">
                <h1>
                    Your score: {this.props.game.score}
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
                    this.getStartButton()
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
                    this.getStartButton()
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

import React from "react";
import "./App.css";
import { tsParenthesizedType } from "@babel/types";

const challenges = [
  {
    question: { id: 1, text: "Is the sky blue?" },
    rightAnswer: 3,
    answers: [
      { id: 1, text: "yes" },
      { id: 2, text: "no" },
      { id: 3, text: "sometimes" },
      { id: 4, text: "I don't know exactly." }
    ]
  }
];

class Assessment extends React.Component {
  render() {
    return (
      <>
        {challenges.map(challenge => (
          <Challenge data={challenge} />
        ))}
      </>
    );
  }
}
class Challenge extends React.Component {
  state = {
    selectedAnswer: null
  };
  changeState = id => {
    console.log(id);
    this.setState({ selectedAnswer: id }, () => {
      console.log(this.state.selectedAnswer);
    });
  };

  checkAnswer = id => {
    if (this.state.selectedAnswer) {
      if (this.props.data.rightAnswer === id) {
        return "correct";
      } else {
        return "incorrect";
      }
    } else {
      return "neutral";
    }
  };
  render() {
    const { question, rightAnswer, answers } = this.props.data;
    return (
      <>
        <Question singleQuestion={question} />
        <div>Selected answer: {this.state.selectedAnswer}</div>
        <div className="challengeBox">
          {answers.map(answer => (
            <Answer
              singleAnswer={answer}
              status={this.checkAnswer(answer.id)}
              changeStateProp={this.changeState}
            />
          ))}
        </div>
      </>
    );
  }
}
class Answer extends React.Component {
  handleClick = () => {
    const { id } = this.props.singleAnswer;
    // if (this.props.status === "neutral") {
    // return
    this.props.changeStateProp(id);
    // }
  };
  render() {
    console.log(this.props);
    const { singleAnswer, status } = this.props;
    return (
      <>
        <div className={`answerBox ${status}`} onClick={this.handleClick}>
          {singleAnswer.text}
        </div>
      </>
    );
  }
}
class Question extends React.Component {
  render() {
    const { singleQuestion } = this.props;
    return (
      <>
        <div className="questionBox">{singleQuestion.text}</div>
      </>
    );
  }
}
export default Assessment;

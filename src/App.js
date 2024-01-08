import logo from './logo.svg';
import Loading from './Assets/loading.gif'
import Restart from './views/Restart';
import Next from './views/Next';


import { useEffect, useState } from 'react';

import './App.css';

function App() {

  const [questions, setQuestions] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [inputValue, setInputValue] = useState([])
  const [score , setScore] = useState(0)
  const [quizStart , setQuizStart] = useState(true)



  useEffect(function () {
    getDataFromAPI()
  }, [])

  function getDataFromAPI() {
    fetch('https://the-trivia-api.com/v2/questions')
      .then(res => res.json())
      .then(res => {
        res.map(function (item) {
          item.options = [...item.incorrectAnswers, item.correctAnswer]
          item.options = shuffle(item.options)

        })

        setQuestions(res)
        // console.log(questions);
      })



  }
  if (!questions.length) {
    return <div className='loading-div'><img className='loading-img' src={Loading} /></div>

  }

  function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
  function startQuiz() {
    setQuizStart(false)
  }

 
  const currentQuestion = questions[currentIndex]
  function next() {
    setCurrentIndex(currentIndex + 1)
    if (currentQuestion.correctAnswer === inputValue) {
      setScore(score + 5)
      
    }
    
    
  }
  function restart() {
    setCurrentIndex(0)
    setScore(0)
    
  }
  function inpVal(e) {
    const value = e.target.value
    setInputValue(value)
  }

  const quizEnded = currentIndex === questions.length
  const passFail = score >= 50  
  const percentage = score / 50 * 100 

  return (
    
    <div className="App">

      <p className='news'><marquee>Welcome to QUIZ APP!  Each Question carry 5 Marks</marquee></p>
      <header className="App-header">

        {quizStart ? <div>
          <button className='bn632-hover bn23' onClick={startQuiz}>START QUIZ</button>
          </div>
        :
        <div className='main-div'> 
          <div><h2 className='quiz-head'>Quiz App</h2></div>
          <p>
          {!quizEnded ? <div>
            <h3 className='h3'>Question {currentIndex + 1} :</h3>
            <h2>{currentQuestion.question.text}</h2>
 
            {currentQuestion.options.map(function (item) {
              return <div>
                <input type='radio' value={item} name='u' onChange={inpVal} checked={inputValue === item} />
                <label>{item}</label>
              </div>
              
            })}
            <br />

            <Next next={next} /> 
          </div>
            :
            <div>
              <h2 className='h3'>Result</h2>
              { passFail ?
              <h3>Congrats! You Got {score} out of 100</h3>
              :
              <h3>Try Again! You Got {score} out of 100</h3>}
              <h3>Percentage : ({percentage})%</h3>

              <Restart restart = {restart} />

            </div>}
        </p>
        </div>}
        {/* <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
    </div>
  );

}

export default App;

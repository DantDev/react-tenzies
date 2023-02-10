import React from "react";
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies , setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  const diceElements = dice.map(die => (
    <Die 
    key={die.id} 
    value={die.value} 
    holdDice={() => holdDice(die.id)} 
    isHeld={die.isHeld} 
    id={die.id} 
    />
  ))

  function randomValue() {
    return Math.ceil(Math.random() * 6)
  }

  function allNewDice() {
    const newArray = []
    for(let i = 0 ; i < 10 ; i++){
      newArray.push({
        value: randomValue() ,
        isHeld: false,
        id: nanoid()
      })
    }
    return newArray
  }

  function rollDice() {
    if(!tenzies){
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : {
          value: randomValue(),
          id: nanoid(),
          isHeld: false
      }
    }))
  }else{
    setDice(allNewDice())
    setTenzies(false)
  }
  }

  function holdDice(id){
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld:!die.isHeld}: die
    }))
  }
 
  return (
  <main>    
    {tenzies && <Confetti />}
    <h1 className="title">Tenzies</h1>
    <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className="container">
      {diceElements}
    </div>
      <button className="die--roll" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  );
}

export default App;

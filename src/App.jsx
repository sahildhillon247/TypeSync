import { useEffect, useRef, useState } from 'react'
import './App.css'

const sentences = [
  "aaaaaaaa",
  "sssssss",
  "erfdfegege",
  "wrthgeqrgerg"
]

function App(){
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [result, setResult] = useState(null);
  const [resultHistory, setResultHistory] = useState([]);
  const [timer, setTimer] = useState(60);

  const inputRef = useRef(null); //ye input 

   useEffect(() => {
    resetTest();
  }, []);

  useEffect(() => {
    let interval;
    if (startTime && !endTime && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    if (timer === 0 && !result) {
      calculateResult(startTime, new Date(), true);
    }
    return () => clearInterval(interval);
  }, [startTime, timer, endTime, result])
  

  const resetTest = () => {
    const random = sentences[Math.floor(Math.random() * sentences.length)];
    setText(random);
    setInput("");
    setStartTime(null);
    setEndTime(null);
    setTimer(60);
    inputRef.current.focus();
  }

    const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);

    if (!startTime && val.length > 0) {
      const now = new Date();
      setStartTime(now);
    }
    if (val === text) {
      const end = new Date();
      setEndTime(end);
      calculateResult(startTime, end)
    }
  }

 
   return (
   <>
  
 <h1> Typing Speed Tester</h1>
    <div className='container'>
      
      <p className='timer'>Time Left : {timer}s</p>

      
       
        
    
    </div>
    </>
  )
}

export default App


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

  const calculateResult = (start, end, isTimeout = false) => {
    const timeTaken = (end - start) / 1000;
    const words = text.trim().split(" ").length;
    const speed = Math.round((words / timeTaken) * 60);
    const correctChars = input.split("").filter((ch, i) => ch === text[i]).length;
    const accuracy = Math.round((correctChars / text.length) * 100);

    const res = {
      speed: isTimeout ? 0 : speed,
      accuracy,
      time: isTimeout ? 60 : timeTaken.toFixed(2),
    };

    setResult(res);
    setResultHistory((prev) => [res, ...prev]);
  };


 
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


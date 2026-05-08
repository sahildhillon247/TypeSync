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
  

  const resetTest = () => {
    const random = sentences[Math.floor(Math.random() * sentences.length)];
    setText(random);
    setInput("");
    setStartTime(null);
    setEndTime(null);
    setTimer(60);
    inputRef.current.focus();
  }
}

export default App
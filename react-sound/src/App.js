import React, {useState} from "react";
import vmsg from "vmsg";
import "./App.css";


const recorder = new vmsg.Recorder({
  wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm"
});
 
const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [isRecording, setRecording] = useState(false);
  const [recordings, setRecordingList] = useState([]);



const record = async () => {
  setLoading(true);
   
    if (isRecording) {
      const blob = await recorder.stopRecording();
      setLoading(false);
      setRecording(false);
      setRecordingList(prevRecordings => prevRecordings.concat(URL.createObjectURL(blob)));
      console.log("recordings",recordings)
    } 
    else {
      try {
        await recorder.initAudio();
        await recorder.initWorker();
        recorder.startRecording();
        setLoading(false);
        setRecording(true)
        
      } catch (e) {
        console.error(e);
        setLoading(false)
      }
    }
  };
 
    return (
      <>
        <button disabled={isLoading} onClick={()=>record()}>
          {isRecording ? "Stop" : "Record"}
        </button>
        <ul style={{ listStyle: "none", padding: 0 }}>
        {recordings.map((recordingUrl, index) => (
          <li key={index}>
            <audio src={recordingUrl} controls />
          </li>
        ))}
        </ul>
      </>
    );
  
}


export default App;

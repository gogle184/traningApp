import React,{ useEffect, useState }from "react";
import { execTest } from './lib/api/text';

function App() {
  const [message, setMessage] = useState("");

  const handleExecTest = async () => {
    const res = await execTest();

    if(res.status===200){
      setMessage(res.data.message);
    }
  };
  
  useEffect(() =>{
    handleExecTest();
  }, []);

  return (
    <h1>{message}</h1>
  );
}

export default App;

import './App.css'

import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import Main from './View/Main'

const socket = io('http://localhost:3300/')
const defaultCode = `#include <iostream>
using namespace std;

int main(void)
{
    //write code here 
}`

function App() {
  const [, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [submission, setSubmission] = useState({
    code: localStorage.code || defaultCode,
    input: localStorage.input || ''
  })
  const [output, setOutput] = useState(null)

  const setCode = (code) => {
    setSubmission({ ...submission, code })
  }
  const setInput = (input) => {
    setSubmission({ ...submission, input })
  }

  const submitCode = () => {
    socket.emit('codeSumbission', submission)
  }

  useEffect(() => {
    socket.on('connect', (e) => {
      console.log(e, socket)
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })
    socket.on('verdict', (result) => {
      const verdict = result.stdout || result.stderr
      setLoading(false)
      setOutput(verdict)
      // console.table(output);
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
    }
  }, [])

  return (
    <Main
      submission={submission}
      output={output}
      setCode={setCode}
      setInput={setInput}
      submitCode={submitCode}
      loading={loading}
      setLoading={setLoading}
    />
  )
}

export default App

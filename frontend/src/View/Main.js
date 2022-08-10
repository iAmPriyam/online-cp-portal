import React from 'react'
import * as Styled from './Main.styled'
import CodeEditor from '../Components/CodeEditor.js/CodeEditor'
import WindowHeader from '../Components/WindowHeader/WindowHeader'

export default function Main({
  submission,
  output,
  setCode,
  setInput,
  submitCode,
  loading,
  setLoading
}) {
  return (
    <Styled.MainPage>
      <Styled.Header>
        <span>Code Editor</span>
        <input
          type='submit'
          value='Run'
          onClick={(e) => {
            e.preventDefault()
            localStorage.setItem('code', submission.code)
            localStorage.setItem('input', submission.input)
            setLoading(true)
            submitCode()
          }}
        />
      </Styled.Header>
      <Styled.CodeWrapper>
        <WindowHeader title={'Code Editor'} />
        <CodeEditor code={submission.code} setCode={setCode} />
      </Styled.CodeWrapper>
      <Styled.InputWrapper>
        <WindowHeader title='Input' />

        <Styled.Input
          value={submission.input}
          onChange={(e) => setInput(e.target.value)}
        />
      </Styled.InputWrapper>
      <Styled.OutputWrapper>
        <WindowHeader title='Output' />

        <Styled.Output>
          <pre>{loading ? 'Processing....' : output}</pre>
        </Styled.Output>
      </Styled.OutputWrapper>
    </Styled.MainPage>
  )
}

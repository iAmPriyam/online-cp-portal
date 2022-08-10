import React from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { cpp } from '@codemirror/lang-cpp'

export default function CodeEditor({ code, setCode }) {
  return (
    <CodeMirror
      value={code}
      options={{ lineNumbers: true }}
      onChange={(value) => {
        setCode(value)
      }}
      extensions={cpp()}
      width='100%'
      height='100%'
      style={{
        flex: '1'
      }}
    />
  )
}

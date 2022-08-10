import logo from './logo.svg'
import './App.css'

import Editor, { useMonaco } from '@monaco-editor/react'

const defaultCode = `#include <iostream>
using namespace std;

int main(void)
{
    //write code here
  cout<<"Priyam rocks!";
}`

function App() {
  return (
    <Editor
      defaultValue={defaultCode}
      height={'100vh'}
      defaultLanguage='C++'
      width={'50vw'}
      theme={'vs-dark'}
    />
  )
}

export default App

import styled from 'styled-components'

export const MainPage = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  grid-template-areas:
    'header code code code code code code code code code code input input input  '
    'header code code code code code code code code code code input input input  '
    'header code code code code code code code code code code input input input  '
    'header code code code code code code code code code code input input input  '
    'header code code code code code code code code code code output output output'
    'header code code code code code code code code code code output output output'
    'header code code code code code code code code code code output output output'
    'header code code code code code code code code code code output output output';
`

export const Header = styled.header`
  height: 100%;
  width: 100%;
  grid-area: header;
  display: flex;
  background-color: #333;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  & span {
    color: white;
    margin-top: 2rem;
    font-size: 1.2em;
  }
  & input {
    margin-bottom: 2rem;
    text-align: center;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    align-content: center;
    font-weight: 600;
    cursor: pointer;
  }
`

export const CodeWrapper = styled.div`
  display: grid;
  grid-template-rows: 1.6rem auto;
  height: 100%;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  grid-area: code;
  overflow: scroll;
  margin-top: 0;
  height: 100%;
  position: relative;
`

export const InputWrapper = styled.div`
  grid-area: input;
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1.6rem auto;
`

export const Input = styled.textarea`
  all: unset;
  flex: 1;
  background-color: #333;
  color: white;
  -webkit-box-shadow: inset 0px 0px 53px -28px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px 0px 53px -28px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px 0px 53px -28px rgba(0, 0, 0, 0.75);
  padding: 1rem;
`
export const Output = styled.div`
  /* -webkit-box-shadow: inset 0px 0px 53px -28px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset 0px 0px 53px -28px rgba(0, 0, 0, 0.75);
  box-shadow: inset 0px 0px 53px -28px rgba(0, 0, 0, 0.75); */
  padding: 1rem;
  background-color: #333;
  color: white;
`

export const OutputWrapper = styled(InputWrapper)`
  grid-area: output;
  max-width: 100%;
  max-height: 100%;
  & pre {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`

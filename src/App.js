/** @jsx jsx */
import { BrowserRouter } from "react-router-dom"
import MainRouter from "./MainRouter"
import { css, jsx, Global } from '@emotion/core'

function App() {
  return (
    <BrowserRouter>
      <Global
        styles={{
          body: {
            margin: 0,
            padding: 0
          }
        }}
      />
      <div 
        css={css`
          height: 100%;
          text-align: center;
          max-width: 1240px;
          margin: 0 auto;
        `}
      >
        <MainRouter />    
      </div>
    </BrowserRouter>
  )
}

export default App

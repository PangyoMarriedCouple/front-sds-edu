import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SignInSide from './pages/SignInSide.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FlipCardPage from './pages/FlipCardPage.jsx'
import SignUpPage from './pages/SignUpPage.tsx'
import ResultPage from './pages/ResultPage.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    // <>
    //   <div>
    //     <a href="https://vite.dev" target="_blank">
    //       <img src={viteLogo} className="logo" alt="Vite logo" />
    //     </a>
    //     <a href="https://react.dev" target="_blank">
    //       <img src={reactLogo} className="logo react" alt="React logo" />
    //     </a>
    //   </div>
    //   <h1>Vite + React</h1>
    //   <div className="card">
    //     <button onClick={() => setCount((count) => count + 1)}>
    //       count is {count}
    //     </button>
    //     <p>
    //       Edit <code>src/App.jsx</code> and save to test HMR
    //     </p>
    //   </div>
    //   <p className="read-the-docs">
    //     Click on the Vite and React logos to learn more
    //   </p>
    // </>
    <>
    <Router>
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route path="/flipcardpage" element={<FlipCardPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
    </>

  )
}

export default App

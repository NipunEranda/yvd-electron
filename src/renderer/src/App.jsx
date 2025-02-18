// import Versions from './components/Versions'
import Index from './pages/index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div className="bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white min-h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
          </Routes>
        </Router>
      </div>
      {/* <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div> */}
      {/* <Versions></Versions> */}
    </>
  )
}

export default App

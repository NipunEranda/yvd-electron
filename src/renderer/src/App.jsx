// import Versions from './components/Versions'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div>
        Hello
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

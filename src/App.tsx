import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import ObjectMenu from "components/ObjectMenu"
import Window from "titan/Window"
import AssetManagerMenu from 'components/AssetManagerMenu';

function App() {
  const canvasWrapper = useRef(null)
  const [gameLoaded, setGameLoaded] = useState(false)

  const setGameWindowLoaded = () => {
    setGameLoaded(true)
  }

  const saveGame = () => {
    Window.getScene().save()
  }

  const exportGame = () => {
    Window.getScene().export()
  }

  const importGame = () => {
    Window.getScene().import()
  }

  useEffect(() => {
    if(!canvasWrapper.current) return
    let window = Window.get()
    Window.resizable = true;
    window.addListener("loaded", setGameWindowLoaded)
    Window.attachCanvas(canvasWrapper.current as HTMLDivElement)
    if(!gameLoaded) window.run()

    return () => {
      window.removeListener("loaded", setGameWindowLoaded);
    }

  }, [canvasWrapper,gameLoaded])
    return (
      <div className="flex w-screen h-screen flex-col bg-background text-white">
        <div className="flex absolute top-2 right-2 px-2 gap-2 rounded-full bg-white text-black">
          <button onClick={saveGame}>Save</button>
          <button onClick={exportGame}>Export</button>
          <button onClick={importGame}>Import</button>
        </div>
      <div className="absolute top-4 left-4 px-2 rounded-full bg-white text-black" id='fps'></div>
      <div className="flex flex-row justify-start items-start h-3/4 max-h-[700px]">
        <div ref={canvasWrapper} className="flex flex-col justify-start items-center w-3/4 h-full overflow-hidden rounded-br-md">
        </div>
          <div className="flex flex-col justify-start items-start w-1/4 min-w-[250px] p-base max-h-full overflow-y-auto">
          <ObjectMenu />
        </div>
      </div>
      <AssetManagerMenu />
    </div>
  );
}

export default App;

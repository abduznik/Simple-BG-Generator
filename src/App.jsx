import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import CanvasPreview from './components/CanvasPreview'
import Footer from './components/Footer'

function App() {
  const [settings, setSettings] = useState({
    width: 1920,
    height: 1080,
    preset: '1080p',
    color1: '#0f172a',
    color2: '#38bdf8',
    pattern: 'checkerboard',
    gridSize: 50,
    inverted: false,
    shapeType: 'triangle', // for geometric
    lineType: 'sine', // for lines
    lineWidth: 2,
    lineFrequency: 0.05,
    lineAmplitude: 20,
    shapeRotation: 0,
    useOffset: false,
    offsetAmount: 0,
    postProcessing: {
      pixelate: false,
      pixelSize: 10,
      scanlines: false,
      scanlineIntensity: 0.3,
      noise: false,
      noiseIntensity: 0.1,
    }
  })


  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-primary-500/30">
      <Header />

      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden p-4 lg:p-6 gap-6">
        <Sidebar settings={settings} setSettings={setSettings} />
        <div className="flex-1 flex flex-col gap-4 min-h-[400px]">
          <CanvasPreview settings={settings} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App

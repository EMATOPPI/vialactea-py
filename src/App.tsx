import { useState } from 'react'
import { APODViewer } from './components/APODViewer'
import { NEOViewer } from './components/NEOViewer'
import { FireballViewer } from './components/FireballViewer'
import { SatellitePasses } from './components/SatellitePasses'
import { SolarActivity } from './components/SolarActivity'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

function App() {
  const [activeTab, setActiveTab] = useState('apod')

  return (
    <div className="min-h-screen">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {activeTab === 'apod' && <APODViewer />}
        {activeTab === 'neo' && <NEOViewer />}
        {activeTab === 'fireballs' && <FireballViewer />}
        {activeTab === 'satellites' && <SatellitePasses />}
        {activeTab === 'solar' && <SolarActivity />}
      </main>

      <Footer />
    </div>
  )
}

export default App

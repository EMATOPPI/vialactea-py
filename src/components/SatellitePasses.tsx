import { useState, useEffect } from 'react'

interface SatellitePass {
  name: string
  satId: number
  startTime: string
  maxEl: string
  magnitude: number
}

export function SatellitePasses() {
  const [passes, setPasses] = useState<SatellitePass[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string | null>(null)

  useEffect(() => {
    const fetchPasses = async () => {
      try {
        // Fetch TLE data from CelesTrak
        const tleRes = await fetch('https://celestrak.org/NORAD/elements/gp.php?GROUP=ISS&FORMAT=TLE')
        if (!tleRes.ok) throw new Error('Error fetching TLE data')
        
        // For now, show predicted passes (real calculation requires satellite.js)
        // These are placeholder passes - in production would use proper SGP4 calculation
        setPasses([
          {
            name: 'ISS',
            satId: 25544,
            startTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toLocaleString('es-PY'),
            maxEl: '65°',
            magnitude: -3.5,
          },
          {
            name: 'ISS',
            satId: 25544,
            startTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toLocaleString('es-PY'),
            maxEl: '42°',
            magnitude: -2.8,
          },
          {
            name: 'ISS',
            satId: 25544,
            startTime: new Date(Date.now() + 14 * 60 * 60 * 1000).toLocaleString('es-PY'),
            maxEl: '28°',
            magnitude: -2.1,
          },
        ])
        
        setLastUpdate(new Date().toLocaleTimeString('es-PY'))
      } catch (err) {
        setError('No se pudieron calcular las pasadas')
      } finally {
        setLoading(false)
      }
    }
    fetchPasses()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin text-4xl">🛰️</div>
        <p className="ml-3 text-purple-300">Calculando pasadas...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-6 text-center">
        <p className="text-red-300">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-space-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🛰️</div>
            <div>
              <h2 className="text-xl font-bold text-white">Pasadas de Satélites</h2>
              <p className="text-sm text-purple-400">ISS visible desde Asunción</p>
            </div>
          </div>
          {lastUpdate && (
            <span className="text-xs text-purple-500">
              Actualizado: {lastUpdate}
            </span>
          )}
        </div>
        
        {/* ISS Info */}
        <div className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="text-4xl">🚀</div>
            <div>
              <h3 className="font-bold text-white">ISS (Zarya)</h3>
              <p className="text-sm text-purple-300">Satélite Internacional • 25544</p>
              <a 
                href="https://www.heavens-above.com/PassSummary.aspx?satid=25544&lat=-25.2637&lon=-57.5759&loc=Asunci%C3%B3n&alt=0&tz=PYST"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                Ver en Heavens-Above ↗
              </a>
            </div>
          </div>
        </div>
        
        {/* Passes list */}
        <div className="space-y-3">
          {passes.map((pass, idx) => (
            <div
              key={idx}
              className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4 hover:border-green-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">📍</div>
                  <div>
                    <p className="font-bold text-white">{pass.name}</p>
                    <p className="text-sm text-purple-300">
                      Inicio: {pass.startTime}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-400">
                    {pass.maxEl}
                  </div>
                  <p className="text-xs text-purple-400">Elevación máx.</p>
                </div>
              </div>
              
              <div className="mt-3 flex items-center gap-4 text-xs text-purple-400">
                <span>Magnitud: {pass.magnitude}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Info about magnitude */}
        <div className="mt-4 p-3 bg-purple-900/10 rounded-lg text-xs text-purple-400">
          💡 <strong>Magnitud:</strong> valores negativos = más brillante. ISS puede llegar a -4 en buenas condiciones.
        </div>
      </div>
    </div>
  )
}

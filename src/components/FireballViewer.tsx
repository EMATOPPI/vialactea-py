import { useState, useEffect } from 'react'

interface Fireball {
  id: string
  date: string
  lat: number
  lon: number
  lat_dir: string
  lon_dir: string
  alt: number
  velocity: number
  energy: number
}

export function FireballViewer() {
  const [fireballs, setFireballs] = useState<Fireball[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchFireballs = async () => {
      try {
        const res = await fetch(
          'https://ssd-api.jpl.nasa.gov/fireballs.api?limit=50'
        )
        if (!res.ok) throw new Error('Error fetching fireballs')
        const data = await res.json()
        
        // Filtrar por Latinoamérica y reciente
        const filtered = data.data.filter((fb: Fireball) => {
          const lat = fb.lat_dir === 'S' ? -fb.lat : fb.lat
          const lon = fb.lon_dir === 'W' ? -fb.lon : fb.lon
          // Filtrar: lat entre -60 y 15 (América del Sur), lon entre -80 y -30
          const inRegion = lat >= -60 && lat <= 15 && lon >= -80 && lon <= -30
          return inRegion
        })
        
        setFireballs(filtered.slice(0, 20))
      } catch (err) {
        setError('No se pudieron cargar los bólidos')
      } finally {
        setLoading(false)
      }
    }
    fetchFireballs()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin text-4xl">🔥</div>
        <p className="ml-3 text-purple-300">Buscando bólidos...</p>
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

  if (fireballs.length === 0) {
    return (
      <div className="bg-space-card rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">🌙</div>
        <h3 className="text-xl font-bold text-white mb-2">Sin bólidos recientes</h3>
        <p className="text-purple-300">
          No se detectaron bólidos en la región lately. Sigue así.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-space-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">🔥</div>
          <div>
            <h2 className="text-xl font-bold text-white">Bólidos Detectados</h2>
            <p className="text-sm text-purple-400">Datos de NASA/JPL • Región Sudamericana</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {fireballs.map((fb) => {
            const energyMt = (fb.energy / 4.184e15).toFixed(2)
            const dateObj = new Date(fb.date)
            
            return (
              <div
                key={fb.id}
                className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4 hover:border-orange-500/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white">
                        {dateObj.toLocaleDateString('es-PY')}
                      </h3>
                      <span className="px-2 py-0.5 bg-orange-600/80 text-xs rounded-full text-white">
                        {fb.alt} km altura
                      </span>
                    </div>
                    
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-purple-400">Ubicación</span>
                        <p className="text-white font-medium">
                          {Math.abs(fb.lat).toFixed(2)}°{fb.lat_dir}, {Math.abs(fb.lon).toFixed(2)}°{fb.lon_dir}
                        </p>
                      </div>
                      <div>
                        <span className="text-purple-400">Velocidad</span>
                        <p className="text-white font-medium">{fb.velocity} km/s</p>
                      </div>
                      <div>
                        <span className="text-purple-400">Energía</span>
                        <p className="text-white font-medium">{energyMt} Mt TNT</p>
                      </div>
                      <div>
                        <span className="text-purple-400">Energía (kilotons)</span>
                        <p className="text-white font-medium">{(fb.energy / 4.184e12).toFixed(2)} kt</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

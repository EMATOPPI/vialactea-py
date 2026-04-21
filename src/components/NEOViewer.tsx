import { useState, useEffect } from 'react'

interface NeoObject {
  id: string
  name: string
  estimated_diameter: {
    meters: { estimated_diameter_min: number; estimated_diameter_max: number }
  }
  close_approach_data: Array<{
    close_approach_date_full: string
    relative_velocity: { kilometers_per_hour: string }
    miss_distance: { astronomical: string; lunar: string; kilometers: string }
    orbiting_body: string
  }>
  is_potentially_hazardous_asteroid: boolean
}

export function NEOViewer() {
  const [neos, setNeos] = useState<NeoObject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNeo = async () => {
      try {
        // NASA NeoW API - próximo mes
        const today = new Date()
        const endDate = new Date(today)
        endDate.setDate(endDate.getDate() + 7)
        
        const formatDate = (d: Date) => d.toISOString().split('T')[0]
        
        const res = await fetch(
          `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formatDate(today)}&end_date=${formatDate(endDate)}&api_key=DEMO_KEY`
        )
        if (!res.ok) throw new Error('Error fetching NEO')
        const data = await res.json()
        
        // Filtrar solo los potencialmente peligrosos o cercanos
        const allNeos = data.near_earth_objects
        const flattened = Object.values(allNeos).flat() as NeoObject[]
        const filtered = flattened.filter(
          (neo) => neo.is_potentially_hazardous_asteroid
        )
        setNeos(filtered.slice(0, 20)) // top 20
      } catch (err) {
        setError('No se pudieron cargar los asteroides')
      } finally {
        setLoading(false)
      }
    }
    fetchNeo()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin text-4xl">☄️</div>
        <p className="ml-3 text-purple-300">Buscando objetos cercanos...</p>
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

  if (neos.length === 0) {
    return (
      <div className="bg-space-card rounded-2xl p-8 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold text-white mb-2">Sin amenazas próximas</h3>
        <p className="text-purple-300">No hay asteroides peligrosos cerca de la Tierra esta semana</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-space-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">☄️</div>
          <div>
            <h2 className="text-xl font-bold text-white">Asteroides Cercanos a la Tierra</h2>
            <p className="text-sm text-purple-400">Próximos 7 días</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {neos.map((neo) => {
            const approach = neo.close_approach_data[0]
            const diameter = Math.round(
              (neo.estimated_diameter.meters.estimated_diameter_min +
                neo.estimated_diameter.meters.estimated_diameter_max) /
                2
            )
            const distance = parseFloat(approach.miss_distance.kilometers).toLocaleString()
            const velocity = parseFloat(approach.relative_velocity.kilometers_per_hour).toLocaleString()
            
            return (
              <div
                key={neo.id}
                className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm">
                        {neo.name.replace(/[()]/g, '')}
                      </h3>
                      {neo.is_potentially_hazardous_asteroid && (
                        <span className="px-2 py-0.5 bg-red-600/80 text-xs rounded-full text-white">
                          ⚠️ Peligroso
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-purple-400">Diámetro</span>
                        <p className="text-white font-medium">{diameter} m</p>
                      </div>
                      <div>
                        <span className="text-purple-400">Distancia</span>
                        <p className="text-white font-medium">{distance} km</p>
                      </div>
                      <div>
                        <span className="text-purple-400">Velocidad</span>
                        <p className="text-white font-medium">{velocity} km/h</p>
                      </div>
                      <div>
                        <span className="text-purple-400">Fecha</span>
                        <p className="text-white font-medium">
                          {new Date(approach.close_approach_date_full).toLocaleDateString('es-PY')}
                        </p>
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

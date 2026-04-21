import { useState, useEffect } from 'react'

interface SolarEvent {
  id: string
  classType: string
  startTime: string
  sourceLocation: string
  activityId: string
}

export function SolarActivity() {
  const [events, setEvents] = useState<SolarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [KpIndex, setKpIndex] = useState<number>(0)

  useEffect(() => {
    const fetchSolarData = async () => {
      try {
        // NASA DONKI API - space weather
        const res = await fetch(
          'https://api.nasa.gov/DONKI/FLR?startDate=2026-04-01&endDate=2026-04-21&api_key=DEMO_KEY'
        )
        if (!res.ok) throw new Error('Error fetching solar data')
        const data = await res.json()
        
        // Tomar últimos 10 eventos
        setEvents(data.slice(0, 10))
        
        // Kp index simulado (en producción usaría NOAA SWPC)
        setKpIndex(Math.floor(Math.random() * 6))
      } catch (err) {
        setError('No se pudieron cargar datos solares')
      } finally {
        setLoading(false)
      }
    }
    fetchSolarData()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin text-4xl">☀️</div>
        <p className="ml-3 text-purple-300">Observando el sol...</p>
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

  const getSolarIntensity = (kp: number) => {
    if (kp <= 2) return { label: 'Quiet', color: 'text-green-400', bg: 'bg-green-900/30' }
    if (kp <= 4) return { label: 'Active', color: 'text-yellow-400', bg: 'bg-yellow-900/30' }
    if (kp <= 6) return { label: 'Storm', color: 'text-orange-400', bg: 'bg-orange-900/30' }
    return { label: 'Severe Storm', color: 'text-red-400', bg: 'bg-red-900/30' }
  }

  const intensity = getSolarIntensity(KpIndex)

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-space-card rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="text-4xl">☀️</div>
          <div>
            <h2 className="text-xl font-bold text-white">Actividad Solar</h2>
            <p className="text-sm text-purple-400">Índice Kp y eyecciones de masa coronal</p>
          </div>
        </div>
        
        {/* Kp Index */}
        <div className={`${intensity.bg} border border-${intensity.color.split('-')[1]}-700/30 rounded-xl p-6 mb-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-400 mb-1">Índice Kp Actual</p>
              <div className={`text-5xl font-bold ${intensity.color}`}>
                {KpIndex}
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${intensity.color}`}>
                {intensity.label}
              </div>
              <p className="text-xs text-purple-400 mt-1">
                Afecta comunicaciones HF en Paraguay
              </p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-purple-400">Condiciones:</span>
            {KpIndex <= 2 ? (
              <span className="px-2 py-1 bg-green-600/50 text-xs rounded text-white">✓ Sin efectos</span>
            ) : KpIndex <= 4 ? (
              <span className="px-2 py-1 bg-yellow-600/50 text-xs rounded text-white">⚠ Mínimos</span>
            ) : (
              <span className="px-2 py-1 bg-red-600/50 text-xs rounded text-white">⚠ Escasez en comunicaciones</span>
            )}
          </div>
        </div>
        
        {/* Recent Events */}
        <h3 className="text-lg font-bold text-white mb-4">Eyecciones Solares Recientes</h3>
        
        {events.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">😌</div>
            <p className="text-purple-300">Sin eyecciones solares recientes</p>
            <p className="text-xs text-purple-500 mt-1">El sol está tranquilo</p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-purple-900/20 border border-purple-700/30 rounded-xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-orange-600/80 text-xs rounded text-white">
                        {event.classType}
                      </span>
                      <span className="text-xs text-purple-400">
                        {new Date(event.startTime).toLocaleDateString('es-PY')}
                      </span>
                    </div>
                    <p className="text-sm text-purple-300 mt-1">
                      Ubicación: {event.sourceLocation || 'No especificada'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Impact info */}
        <div className="mt-6 p-4 bg-purple-900/10 rounded-xl text-sm text-purple-300">
          <h4 className="font-bold text-white mb-2">📡 Impacto en Paraguay</h4>
          <ul className="space-y-1 text-xs">
            <li>• <strong>Kp 0-2:</strong> Condiciones normales — radio HF funciona sin problemas</li>
            <li>• <strong>Kp 3-4:</strong> Posibles interrupciones menores en HF</li>
            <li>• <strong>Kp 5+:</strong> Interrupciones en GPS y comunicaciones HF</li>
            <li>• <strong>Kp 7+:</strong> Aurora visible desde latitudes medias (Paraguay raramente la ve)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

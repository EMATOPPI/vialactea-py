import { useState, useEffect } from 'react'

interface APODData {
  date: string
  title: string
  explanation: string
  url: string
  hdurl: string
  media_type: string
  copyright?: string
}

export function APODViewer() {
  const [apod, setApod] = useState<APODData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showHD, setShowHD] = useState(false)

  useEffect(() => {
    const fetchAPOD = async () => {
      try {
        // NASA API - DEMO_KEY tiene límite, pero funciona para desarrollo
        const res = await fetch(
          'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'
        )
        if (!res.ok) throw new Error('Error fetching APOD')
        const data = await res.json()
        setApod(data)
      } catch (err) {
        setError('No se pudo cargar la imagen del día')
      } finally {
        setLoading(false)
      }
    }
    fetchAPOD()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin text-4xl">🌌</div>
        <p className="ml-3 text-purple-300">Cargando imagen del cosmos...</p>
      </div>
    )
  }

  if (error || !apod) {
    return (
      <div className="bg-red-900/30 border border-red-700/50 rounded-xl p-6 text-center">
        <p className="text-red-300">{error || 'Sin datos'}</p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Image Card */}
      <div className="bg-space-card rounded-2xl overflow-hidden">
        {apod.media_type === 'image' ? (
          <>
            <div className="relative">
              <img
                src={apod.url}
                alt={apod.title}
                className="w-full max-h-[70vh] object-contain cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => setShowHD(true)}
              />
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={() => setShowHD(true)}
                  className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg text-sm font-medium transition-colors"
                >
                  HD ↗
                </button>
              </div>
            </div>
            
            {/* HD Modal */}
            {showHD && (
              <div 
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                onClick={() => setShowHD(false)}
              >
                <img
                  src={apod.hdurl}
                  alt={apod.title}
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
                <button
                  onClick={() => setShowHD(false)}
                  className="absolute top-4 right-4 w-10 h-10 bg-purple-600 hover:bg-purple-500 rounded-full text-xl"
                >
                  ✕
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="aspect-video bg-purple-900/30 flex items-center justify-center">
            <p className="text-purple-300">Video del día — no disponible en esta versión</p>
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="bg-space-card rounded-2xl p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-purple-400 uppercase tracking-wider">
              {apod.date}
            </p>
            <h2 className="text-2xl font-bold text-white mt-1">
              {apod.title}
            </h2>
            {apod.copyright && (
              <p className="text-sm text-purple-300 mt-1">
                © {apod.copyright}
              </p>
            )}
          </div>
          
          <div className="flex-shrink-0 text-4xl">🌟</div>
        </div>
        
        <p className="text-purple-200 leading-relaxed text-sm lg:text-base">
          {apod.explanation}
        </p>
        
        <div className="pt-4 border-t border-purple-900/30">
          <a
            href={apod.hdurl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
          >
            Ver en alta resolución ↗
          </a>
          <span className="mx-2 text-purple-700">|</span>
          <a
            href="https://apod.nasa.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 text-sm transition-colors"
          >
            NASA APOD ↗
          </a>
        </div>
      </div>
    </div>
  )
}

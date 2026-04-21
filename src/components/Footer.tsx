export function Footer() {
  return (
    <footer className="border-t border-purple-900/30 mt-12 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-purple-400">
          <div className="flex items-center gap-2">
            <span>🌌</span>
            <span>Vía Láctea Py</span>
            <span className="mx-2">•</span>
            <span>Datos: NASA APIs</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="https://api.nasa.gov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-purple-300 transition-colors"
            >
              NASA APIs ↗
            </a>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-purple-300 transition-colors"
            >
              GitHub ↗
            </a>
          </div>
          
          <p className="text-xs text-purple-600">
            2026 • Paraguay
          </p>
        </div>
      </div>
    </footer>
  )
}

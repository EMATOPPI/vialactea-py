interface Tab {
  id: string
  label: string
  icon: string
}

const tabs: Tab[] = [
  { id: 'apod', label: 'APOD', icon: '🌟' },
  { id: 'neo', label: 'Asteroides', icon: '☄️' },
  { id: 'fireballs', label: 'Bólidos', icon: '🔥' },
  { id: 'satellites', label: 'Satélites', icon: '🛰️' },
  { id: 'solar', label: 'Solar', icon: '☀️' },
]

interface HeaderProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export function Header({ activeTab, setActiveTab }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-space-card border-b border-purple-900/30 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🌌</div>
            <div>
              <h1 className="text-lg font-bold text-white">Vía Láctea Py</h1>
              <p className="text-xs text-purple-300">Paraguay Space Monitor</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-purple-300 hover:text-white hover:bg-purple-900/30'
                }`}
              >
                <span className="mr-1">{tab.icon}</span>
                <span className="hidden lg:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Mobile nav */}
        <nav className="md:hidden flex overflow-x-auto pb-2 gap-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-300 hover:text-white hover:bg-purple-900/30'
              }`}
            >
              <span className="mr-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}

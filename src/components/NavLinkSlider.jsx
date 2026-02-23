import React, { useEffect, useState } from 'react'

const defaultLinks = [
  { label: 'Analysis', href: '#image-analysis' },
  { label: 'AgriBot', href: '#agribot' }
]

const NavLinkSlider = ({ links = defaultLinks, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash
      const index = links.findIndex((link) => link.href === hash)
      if (index >= 0) setActiveIndex(index)
    }

    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [links])

  return (
    <nav className={className}>
      <div className="flex items-center gap-3">
        {links.map((link, index) => {
          const isActive = index === activeIndex
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActiveIndex(index)}
              className={`rounded-md border px-4 py-1.5 text-center text-sm font-medium transition-colors ${
                isActive
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {link.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}

export default NavLinkSlider

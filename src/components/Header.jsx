import NavLinkSlider from './NavLinkSlider'

const Header = () => {
  return (
    // ========Sticky site header==========
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      {/* ====Header content container =======*/}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* ===Brand title ===*/}
        <h1 className="text-lg font-bold text-slate-900">RCND Detector</h1>
        {/* ====Desktop navigation links===== */}
        <NavLinkSlider className="hidden md:block" />
      </div>
    </header>
  )
}

export default Header

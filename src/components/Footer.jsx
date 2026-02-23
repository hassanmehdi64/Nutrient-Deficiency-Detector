import NavLinkSlider from './NavLinkSlider'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 text-center text-sm text-slate-600">
        <NavLinkSlider />
        <p>(c) {new Date().getFullYear()} RCND Frontend. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer

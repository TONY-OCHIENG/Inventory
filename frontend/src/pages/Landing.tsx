import { Link } from "react-router-dom"
import { Bell, PackageMinus, RotateCcw, Truck, ShoppingCart, Boxes } from "lucide-react"

// Add to index.html:
// <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Figtree:wght@400;500&display=swap" rel="stylesheet">
const display = { fontFamily: "'Bricolage Grotesque', system-ui, sans-serif" }
const body = { fontFamily: "'Figtree', system-ui, sans-serif" }

const SHELF = [
  { name: "Blue Widget", sku: "WIDGET-BLU", qty: 4, max: 40, low: true },
  { name: "Steel Bracket 20mm", sku: "BRK-020", qty: 62, max: 80, low: false },
  { name: "Packing Tape", sku: "TAPE-48", qty: 28, max: 60, low: false },
  { name: "Shipping Box M", sku: "BOX-M", qty: 9, max: 50, low: true },
]
const FEATURES = [
  { icon: Bell,         title: "Low-stock alerts", text: "Get told once when an item drops to its reorder level, in the app or at your own webhook URL.", tone: "text-red-600 bg-red-100" },
  { icon: Boxes,        title: "Live stock levels", text: "Every sale, purchase and return updates the count straight away.",                              tone: "text-green-600 bg-green-100" },
  { icon: ShoppingCart, title: "Purchases",         text: "Record what you buy and watch the shelf fill back up.",                                          tone: "text-blue-600 bg-blue-100" },
  { icon: Truck,        title: "Suppliers",         text: "Keep contacts and order history next to the products they supply.",                              tone: "text-amber-600 bg-amber-100" },
  { icon: RotateCcw,    title: "Returns",           text: "Log returned items and put them back in stock or write them off.",                               tone: "text-purple-600 bg-purple-100" },
  { icon: PackageMinus, title: "Reorder levels",    text: "Set a level per product, so fast movers and slow movers get the right warning.",                 tone: "text-teal-600 bg-teal-100" },
]

const STEPS = [
  "Set a reorder level on each product.",
  "Sell, adjust or return stock as normal.",
  "When a count falls to the level, you get one alert.",
  "Record the purchase and the alert resets.",
]

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#EDF0F3] text-[#1B2430]" style={body}>
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link to="/" className="text-lg font-extrabold tracking-tight" style={display}>
          Stockroom
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          <Link to="/login" className="rounded-md px-4 py-2 hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#1B2430]">
            Log in
          </Link>
          <Link to="/signup" className="rounded-md bg-[#1B2430] px-4 py-2 text-white hover:bg-[#2b3748] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2430]">
            Create account
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-6xl h-[100vh] items-center gap-12 px-6 pb-20 pt-10 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl" style={display}>
            Know what's running out before it does.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-[#4a5666]">
            Stockroom tracks your products, purchases, suppliers and returns, and alerts you the moment an item hits its reorder level.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/signup" className="rounded-md bg-[#F5B700] px-6 py-3 text-sm font-bold text-[#1B2430] hover:bg-[#e0a700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2430]">
              Start tracking stock
            </Link>
            <Link to="/login" className="rounded-md border border-[#1B2430]/25 px-6 py-3 text-sm font-medium hover:bg-white/70">
              Log in
            </Link>
          </div>
        </div>

        {/* Shelf preview: the page's one memorable element */}
        <div className="rounded-lg border-t-2 border-t-white bg-white/80 p-5 shadow-sm" aria-label="Example stock list">
          <div className="mb-3 flex items-center justify-between text-xs text-[#4a5666]">
            <span className="font-bold" style={display}>Stock</span>
            <span>2 items need reordering</span>
          </div>
          <ul className="divide-y divide-[#1B2430]/10">
            {SHELF.map((p) => (
              <li key={p.sku} className="py-3">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className={p.low ? "font-bold text-[#a56d00]" : "text-[#4a5666]"}>
                    {p.qty} left
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-sm bg-[#1B2430]/10">
                  <div
                    className={`h-full ${p.low ? "bg-[#F5B700]" : "bg-[#1B2430]"}`}
                    style={{ width: `${(p.qty / p.max) * 100}%` }}
                  />
                </div>
                {p.low && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-[#a56d00]">
                    <Bell className="h-3.5 w-3.5" /> Alert sent: below reorder level
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white/60 py-20 md:h-[100vh]">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-center font-extrabold text-3xl md:text-5xl font-serif text-gray-800 ">Core Features</h1>
          <h2 className="font-serif text-gray-500 mt-2  text-sm text-center" style={display}>
            Everything that moves through your stockroom, in one place
          </h2>
          <div className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, text, tone }) => (
              <div key={title} className="flex flex-col gap-4 rounded-md p-4 shadow-md">
                <Icon
                  className={`mt-1 h-15 w-15 p-4 rounded-md shrink-0 ${tone}`}
                  aria-hidden
                />
                <div>
                  <h3 className="font-bold font-serif" style={display}>{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#4a5666]">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How alerts work (a real sequence, so numbered) */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={display}>
          One alert per shortage, not one per sale
        </h2>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s} className="border-l-4 border-[#F5B700] pl-4">
              <span className="text-sm font-bold text-[#a56d00]" style={display}>Step {i + 1}</span>
              <p className="mt-1 text-sm leading-relaxed">{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="flex flex-col items-start justify-between gap-6 rounded-lg bg-[#1B2430] p-10 text-white sm:flex-row sm:items-center">
          <h2 className="max-w-md text-2xl font-bold sm:text-3xl" style={display}>
            Set up your first product in a few minutes.
          </h2>
          <Link to="/signup" className="rounded-md bg-[#F5B700] px-6 py-3 text-sm font-bold text-[#1B2430] hover:bg-[#e0a700] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Create account
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#1B2430]/10 py-6 text-center text-xs text-[#4a5666]">
        © {new Date().getFullYear()} Stockroom
      </footer>
    </div>
  )
}
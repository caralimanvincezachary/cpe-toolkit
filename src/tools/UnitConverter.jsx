import { useState } from 'react'

const categories = {
  Length: {
    units: ['mm', 'cm', 'm', 'km', 'in', 'ft', 'mi'],
    toBase: { mm: 0.001, cm: 0.01, m: 1, km: 1000, in: 0.0254, ft: 0.3048, mi: 1609.344 }
  },
  Mass: {
    units: ['mg', 'g', 'kg', 'lb', 'oz'],
    toBase: { mg: 0.000001, g: 0.001, kg: 1, lb: 0.453592, oz: 0.0283495 }
  },
  Frequency: {
    units: ['Hz', 'kHz', 'MHz', 'GHz'],
    toBase: { Hz: 1, kHz: 1e3, MHz: 1e6, GHz: 1e9 }
  },
  Data: {
    units: ['bit', 'byte', 'KB', 'MB', 'GB', 'TB'],
    toBase: { bit: 1, byte: 8, KB: 8192, MB: 8388608, GB: 8589934592, TB: 8796093022208 }
  },
}

export default function UnitConverter() {
  const [cat, setCat] = useState('Length')
  const [from, setFrom] = useState('m')
  const [to, setTo] = useState('ft')
  const [val, setVal] = useState('')

  function changeCategory(c) {
    setCat(c)
    setFrom(categories[c].units[0])
    setTo(categories[c].units[1])
    setVal('')
  }

  const n = parseFloat(val)
  const valid = !isNaN(n)
  const result = valid
    ? (n * categories[cat].toBase[from]) / categories[cat].toBase[to]
    : null

  const fmt = x => parseFloat(x.toPrecision(6)).toString()

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-1">Unit converter</h2>
      <p className="text-sm text-gray-500 mb-4">Common engineering unit conversions</p>
      <div className="flex gap-2 flex-wrap mb-4">
        {Object.keys(categories).map(c => (
          <button key={c} onClick={() => changeCategory(c)}
            className={cat === c
              ? 'px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-medium'
              : 'px-3 py-1 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50'}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-sm text-gray-500">From</label>
          <select value={from} onChange={e => setFrom(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none">
            {categories[cat].units.map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-500">To</label>
          <select value={to} onChange={e => setTo(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none">
            {categories[cat].units.map(u => <option key={u}>{u}</option>)}
          </select>
        </div>
      </div>
      <input type="number" value={val} onChange={e => setVal(e.target.value)}
        placeholder="Enter value"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400" />
      {valid && result !== null && (
        <div className="mt-4 bg-gray-50 rounded-xl p-4">
          <p className="text-sm text-gray-500">{n} {from} =</p>
          <p className="text-2xl font-medium text-gray-900 mt-1">{fmt(result)} {to}</p>
        </div>
      )}
    </div>
  )
}
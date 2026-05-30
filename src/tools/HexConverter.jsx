import { useState } from 'react'

export default function HexConverter() {
  const [dec, setDec] = useState('')
  const [hex, setHex] = useState('')

  function fromDec(val) {
    setDec(val)
    const n = parseInt(val, 10)
    setHex(isNaN(n) || n < 0 ? '' : n.toString(16).toUpperCase())
  }

  function fromHex(val) {
    setHex(val)
    const n = parseInt(val, 16)
    setDec(isNaN(n) ? '' : n.toString(10))
  }

  const n = parseInt(dec, 10)
  const valid = !isNaN(n) && n >= 0

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-1">Decimal ↔ Hex converter</h2>
      <p className="text-sm text-gray-500 mb-4">Type in either field to convert</p>
      <label className="text-sm text-gray-500">Decimal</label>
      <input type="number" value={dec} onChange={e => fromDec(e.target.value)}
        placeholder="e.g. 255"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm my-2 focus:outline-none focus:border-blue-400" />
      <div className="text-center text-gray-400 text-lg my-1">⇅</div>
      <label className="text-sm text-gray-500">Hexadecimal</label>
      <input type="text" value={hex} onChange={e => fromHex(e.target.value)}
        placeholder="e.g. FF"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm my-2 focus:outline-none focus:border-blue-400" />
      {valid && (
        <div className="mt-4 space-y-2">
          {[['Binary', n.toString(2)], ['Octal', n.toString(8)], ['HTML color', '#' + n.toString(16).toUpperCase().padStart(6,'0').slice(-6)]].map(([label, val]) => (
            <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <span className="text-sm text-gray-500">{label}</span>
              <span className="font-mono text-sm font-medium text-gray-900">{val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
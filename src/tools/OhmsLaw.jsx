import { useState } from 'react'

export default function OhmsLaw() {
  const [v, setV] = useState('')
  const [i, setI] = useState('')
  const [r, setR] = useState('')
  const [p, setP] = useState('')

  const vals = [v, i, r, p].map(x => x === '' ? NaN : parseFloat(x))
  const filled = vals.filter(x => !isNaN(x))
  const count = filled.length

  let rv = vals[0], ri = vals[1], rr = vals[2], rp = vals[3]

  if (count >= 2) {
    if (!isNaN(rv) && !isNaN(ri)) { rr = rv / ri; rp = rv * ri }
    else if (!isNaN(rv) && !isNaN(rr)) { ri = rv / rr; rp = rv * rv / rr }
    else if (!isNaN(ri) && !isNaN(rr)) { rv = ri * rr; rp = ri * ri * rr }
    else if (!isNaN(rv) && !isNaN(rp)) { ri = rp / rv; rr = rv * rv / rp }
    else if (!isNaN(ri) && !isNaN(rp)) { rv = rp / ri; rr = rp / (ri * ri) }
    else if (!isNaN(rr) && !isNaN(rp)) { ri = Math.sqrt(rp / rr); rv = Math.sqrt(rp * rr) }
  }

  const valid = count >= 2 && rv > 0 && ri > 0 && rr > 0 && rp > 0
  const fmt = x => isNaN(x) ? '—' : parseFloat(x.toFixed(4)).toString()

  const fields = [
    { label: 'Voltage V', unit: 'V', val: v, set: setV, result: rv },
    { label: 'Current I', unit: 'A', val: i, set: setI, result: ri },
    { label: 'Resistance R', unit: 'Ω', val: r, set: setR, result: rr },
    { label: 'Power P', unit: 'W', val: p, set: setP, result: rp },
  ]

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-1">Ohm's law calculator</h2>
      <p className="text-sm text-gray-500 mb-4">Enter any two values — the rest are calculated</p>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {fields.map(f => (
          <div key={f.label}>
            <label className="text-sm text-gray-500">{f.label} ({f.unit})</label>
            <input type="number" value={f.val}
              onChange={e => f.set(e.target.value)}
              placeholder="e.g. 12"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-blue-400" />
          </div>
        ))}
      </div>
      {valid && (
        <div className="space-y-2 border-t border-gray-100 pt-4">
          {fields.map(f => (
            <div key={f.label} className="flex justify-between items-center py-1">
              <span className="text-sm text-gray-500">{f.label}</span>
              <span className="font-mono text-sm font-medium text-gray-900">{fmt(f.result)} {f.unit}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
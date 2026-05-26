import { useState } from 'react'

export default function BinaryConverter() {
  const [input, setInput] = useState('')

  function convert(val) {
    setInput(val)
  }

  const n = parseInt(input, 10)
  const valid = input !== '' && !isNaN(n) && n >= 0

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-1">Binary converter</h2>
      <p className="text-sm text-gray-500 mb-4">Enter a decimal number to convert</p>
      <input
        type="number"
        value={input}
        onChange={e => convert(e.target.value)}
        placeholder="e.g. 255"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:border-blue-400"
      />
      {valid && (
        <div className="space-y-2">
          {[['Decimal', n.toString(10)], ['Binary', n.toString(2)], ['Hexadecimal', '0x' + n.toString(16).toUpperCase()], ['Octal', n.toString(8)]].map(([label, val]) => (
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
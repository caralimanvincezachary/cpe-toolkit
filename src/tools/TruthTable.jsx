import { useState } from 'react'

function getVars(expr) {
  const matches = expr.toUpperCase().match(/\b[A-D]\b/g)
  return matches ? [...new Set(matches)].sort() : []
}

function evaluate(expr, vars, vals) {
  let e = expr.toUpperCase()
  let prev = ''
  while (prev !== e) {
    prev = e
    e = e.replace(/\b([A-D])\s+NAND\s+([A-D])\b/g, '(!($1&&$2))')
    e = e.replace(/\b([A-D])\s+NOR\s+([A-D])\b/g, '(!($1||$2))')
  }
  e = e.replace(/\bNOT\b\s*/g, '!')
  e = e.replace(/\bAND\b/g, '&&')
  e = e.replace(/\bOR\b/g, '||')
  e = e.replace(/\bXOR\b/g, '^')
  try {
    const fn = new Function(...vars, `return !!(${e})`)
    return fn(...vals.map(v => v ? 1 : 0))
  } catch {
    return null
  }
}

export default function TruthTable() {
  const [expr, setExpr] = useState('A AND B')

  const vars = getVars(expr)
  const rows = vars.length > 0 ? Math.pow(2, vars.length) : 0

  const table = []
  for (let i = 0; i < rows; i++) {
    const vals = vars.map((_, j) => Boolean((i >> (vars.length - 1 - j)) & 1))
    const result = evaluate(expr, vars, vals)
    table.push({ vals, result })
  }

  const valid = rows > 0 && table.every(r => r.result !== null)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-1">Truth table generator</h2>
      <p className="text-sm text-gray-500 mb-4">
        Use A, B, C, D with AND, OR, NOT, XOR, NAND, NOR
      </p>
      <input
        type="text"
        value={expr}
        onChange={e => setExpr(e.target.value)}
        placeholder="e.g. A AND B"
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-blue-400"
      />
      <div className="flex gap-2 flex-wrap mb-4">
        {['A AND B', 'A OR B', 'NOT A', 'A XOR B', '(A AND B) OR C'].map(ex => (
          <button key={ex} onClick={() => setExpr(ex)}
            className="px-2 py-1 text-xs border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
            {ex}
          </button>
        ))}
      </div>
      {valid ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                {vars.map(v => (
                  <th key={v} className="py-2 px-4 text-center font-medium text-gray-700">{v}</th>
                ))}
                <th className="py-2 px-4 text-center font-medium text-blue-600">
                  {expr.toUpperCase()}
                </th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  {row.vals.map((v, j) => (
                    <td key={j} className="py-2 px-4 text-center font-mono text-gray-600">
                      {v ? '1' : '0'}
                    </td>
                  ))}
                  <td className="py-2 px-4 text-center font-mono font-medium">
                    <span className={row.result ? 'text-green-600' : 'text-red-500'}>
                      {row.result ? '1' : '0'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        expr && <p className="text-sm text-red-500">Invalid expression. Try: A AND B</p>
      )}
    </div>
  )
}
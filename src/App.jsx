import { useState } from 'react'
import BinaryConverter from './tools/BinaryConverter'
import HexConverter from './tools/HexConverter'
import OhmsLaw from './tools/OhmsLaw'
import UnitConverter from './tools/UnitConverter'
import TruthTable from './tools/TruthTable'

const tools = [
  { id: 'binary', label: 'Binary', component: BinaryConverter },
  { id: 'hex', label: 'Hex', component: HexConverter },
  { id: 'ohm', label: "Ohm's Law", component: OhmsLaw },
  { id: 'unit', label: 'Units', component: UnitConverter },
  { id: 'truth', label: 'Truth Table', component: TruthTable },
]

export default function App() {
  const [active, setActive] = useState('binary')
  const Tool = tools.find(t => t.id === active).component
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">CpE Toolkit</h1>
        <div className="flex gap-2 mb-6 flex-wrap">
          {tools.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={active === t.id
                ? 'px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium'
                : 'px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50'}>
              {t.label}
            </button>
          ))}
        </div>
        <Tool />
      </div>
    </div>
  )
}
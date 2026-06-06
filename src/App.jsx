import { useState, useEffect } from 'react'
import BinaryConverter from './tools/BinaryConverter'
import HexConverter from './tools/HexConverter'
import OhmsLaw from './tools/OhmsLaw'
import UnitConverter from './tools/UnitConverter'
import TruthTable from './tools/TruthTable'
import LogicGate from './tools/LogicGate'
import NumberQuiz from './tools/NumberQuiz'
import CPUVisualizer from './tools/CPUVisualizer'
import CircuitNotes from './tools/CircuitNotes'

const tools = [
  { id: 'binary', label: 'Binary', component: BinaryConverter },
  { id: 'hex', label: 'Hex', component: HexConverter },
  { id: 'ohm', label: "Ohm's Law", component: OhmsLaw },
  { id: 'unit', label: 'Units', component: UnitConverter },
  { id: 'truth', label: 'Truth Table', component: TruthTable },
  { id: 'logic', label: 'Logic Gates', component: LogicGate },
  { id: 'quiz', label: 'Quiz', component: NumberQuiz },
  { id: 'cpu', label: 'CPU', component: CPUVisualizer },
  { id: 'notes', label: 'Notes', component: CircuitNotes },
]

export default function App() {
  const [active, setActive] = useState('binary')
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')
  const Tool = tools.find(t => t.id === active).component

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-6 transition-colors duration-200">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">CpE Toolkit</h1>
          <button onClick={() => setDark(d => !d)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            {dark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        <div className="flex gap-2 mb-6 flex-wrap">
          {tools.map(t => (
            <button key={t.id} onClick={() => setActive(t.id)}
              className={active === t.id
                ? 'px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium'
                : 'px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors'}>
              {t.label}
            </button>
          ))}
        </div>
        <Tool />
      </div>
    </div>
  )
}
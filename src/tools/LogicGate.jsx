import { useState } from 'react'

const gates = {
  AND:  (a, b) => a && b,
  OR:   (a, b) => a || b,
  NAND: (a, b) => !(a && b),
  NOR:  (a, b) => !(a || b),
  XOR:  (a, b) => a !== b,
  XNOR: (a, b) => a === b,
  NOT:  (a) => !a,
  BUFFER: (a) => a,
}

const gateDescriptions = {
  AND:  'Output is 1 only when ALL inputs are 1',
  OR:   'Output is 1 when ANY input is 1',
  NAND: 'Opposite of AND — output is 0 only when all inputs are 1',
  NOR:  'Opposite of OR — output is 1 only when all inputs are 0',
  XOR:  'Output is 1 when inputs are DIFFERENT',
  XNOR: 'Output is 1 when inputs are the SAME',
  NOT:  'Inverts the input — 1 becomes 0, 0 becomes 1',
  BUFFER: 'Output equals the input — used for signal strength',
}

function GateSymbol({ gate, a, b, output }) {
  const on = 'text-green-500'
  const off = 'text-red-400'
  const wire = (v) => v ? on : off

  return (
    <svg viewBox="0 0 200 100" className="w-full max-w-xs mx-auto">
      {gate !== 'NOT' && gate !== 'BUFFER' && (
        <>
          <line x1="20" y1="35" x2="70" y2="35" stroke={a ? '#22c55e' : '#f87171'} strokeWidth="2.5"/>
          <line x1="20" y1="65" x2="70" y2="65" stroke={b ? '#22c55e' : '#f87171'} strokeWidth="2.5"/>
          <text x="8" y="39" fontSize="12" fill={a ? '#22c55e' : '#f87171'} fontFamily="monospace">{a ? '1' : '0'}</text>
          <text x="8" y="69" fontSize="12" fill={b ? '#22c55e' : '#f87171'} fontFamily="monospace">{b ? '1' : '0'}</text>
        </>
      )}
      {(gate === 'NOT' || gate === 'BUFFER') && (
        <>
          <line x1="20" y1="50" x2="70" y2="50" stroke={a ? '#22c55e' : '#f87171'} strokeWidth="2.5"/>
          <text x="8" y="54" fontSize="12" fill={a ? '#22c55e' : '#f87171'} fontFamily="monospace">{a ? '1' : '0'}</text>
        </>
      )}

      {gate === 'AND' && <path d="M70,25 L110,25 Q135,25 135,50 Q135,75 110,75 L70,75 Z" fill="none" stroke="#6366f1" strokeWidth="2"/>}
      {gate === 'OR' && <path d="M70,25 Q85,25 100,25 Q125,25 135,50 Q125,75 100,75 Q85,75 70,75 Q82,50 70,25Z" fill="none" stroke="#6366f1" strokeWidth="2"/>}
      {gate === 'NAND' && <><path d="M70,25 L110,25 Q135,25 135,50 Q135,75 110,75 L70,75 Z" fill="none" stroke="#6366f1" strokeWidth="2"/><circle cx="140" cy="50" r="5" fill="none" stroke="#6366f1" strokeWidth="2"/></>}
      {gate === 'NOR' && <><path d="M70,25 Q85,25 100,25 Q125,25 135,50 Q125,75 100,75 Q85,75 70,75 Q82,50 70,25Z" fill="none" stroke="#6366f1" strokeWidth="2"/><circle cx="140" cy="50" r="5" fill="none" stroke="#6366f1" strokeWidth="2"/></>}
      {gate === 'XOR' && <><path d="M70,25 Q85,25 100,25 Q125,25 135,50 Q125,75 100,75 Q85,75 70,75 Q82,50 70,25Z" fill="none" stroke="#6366f1" strokeWidth="2"/><path d="M63,25 Q75,50 63,75" fill="none" stroke="#6366f1" strokeWidth="2"/></>}
      {gate === 'XNOR' && <><path d="M70,25 Q85,25 100,25 Q125,25 135,50 Q125,75 100,75 Q85,75 70,75 Q82,50 70,25Z" fill="none" stroke="#6366f1" strokeWidth="2"/><path d="M63,25 Q75,50 63,75" fill="none" stroke="#6366f1" strokeWidth="2"/><circle cx="140" cy="50" r="5" fill="none" stroke="#6366f1" strokeWidth="2"/></>}
      {gate === 'NOT' && <><path d="M70,30 L130,50 L70,70 Z" fill="none" stroke="#6366f1" strokeWidth="2"/><circle cx="135" cy="50" r="5" fill="none" stroke="#6366f1" strokeWidth="2"/></>}
      {gate === 'BUFFER' && <path d="M70,30 L130,50 L70,70 Z" fill="none" stroke="#6366f1" strokeWidth="2"/>}

      <line x1={['NAND','NOR','XNOR'].includes(gate) ? 145 : gate === 'NOT' ? 140 : 135} y1="50" x2="185" y2="50" stroke={output ? '#22c55e' : '#f87171'} strokeWidth="2.5"/>
      <text x="187" y="54" fontSize="12" fill={output ? '#22c55e' : '#f87171'} fontFamily="monospace">{output ? '1' : '0'}</text>

      <text x="100" y="95" fontSize="11" fill="#6366f1" textAnchor="middle" fontFamily="sans-serif">{gate}</text>
    </svg>
  )
}

export default function LogicGate() {
  const [gate, setGate] = useState('AND')
  const [a, setA] = useState(false)
  const [b, setB] = useState(false)

  const needsTwo = !['NOT', 'BUFFER'].includes(gate)
  const output = needsTwo ? gates[gate](a, b) : gates[gate](a)

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-1">Logic gate simulator</h2>
      <p className="text-sm text-gray-500 mb-4">Toggle inputs and see the output in real time</p>

      <div className="flex gap-2 flex-wrap mb-5">
        {Object.keys(gates).map(g => (
          <button key={g} onClick={() => setGate(g)}
            className={gate === g
              ? 'px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-medium'
              : 'px-3 py-1 rounded-lg border border-gray-200 text-xs text-gray-600 hover:bg-gray-50'}>
            {g}
          </button>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <GateSymbol gate={gate} a={a} b={b} output={output} />
      </div>

      <div className="flex gap-3 mb-4 justify-center">
        <button onClick={() => setA(!a)}
          className={`w-24 py-2 rounded-lg text-sm font-medium border transition-all ${a ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-600 border-gray-200'}`}>
          A = {a ? '1' : '0'}
        </button>
        {needsTwo && (
          <button onClick={() => setB(!b)}
            className={`w-24 py-2 rounded-lg text-sm font-medium border transition-all ${b ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-600 border-gray-200'}`}>
            B = {b ? '1' : '0'}
          </button>
        )}
      </div>

      <div className={`text-center py-3 rounded-xl text-sm font-medium ${output ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
        Output = {output ? '1 (HIGH)' : '0 (LOW)'}
      </div>

      <p className="text-xs text-gray-400 text-center mt-3">{gateDescriptions[gate]}</p>
    </div>
  )
}
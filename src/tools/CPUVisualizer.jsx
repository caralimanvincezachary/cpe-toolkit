import { useState, useEffect } from 'react'

const steps = [
  {
    id: 'fetch',
    label: 'Fetch',
    color: 'bg-blue-100 border-blue-400 text-blue-700',
    active: 'bg-blue-500 text-white border-blue-500',
    description: 'The CPU fetches the next instruction from memory using the Program Counter (PC).',
    detail: 'PC → MAR → Memory → MDR → IR',
    components: ['Program Counter (PC)', 'Memory Address Register (MAR)', 'Memory', 'Memory Data Register (MDR)', 'Instruction Register (IR)'],
  },
  {
    id: 'decode',
    label: 'Decode',
    color: 'bg-purple-100 border-purple-400 text-purple-700',
    active: 'bg-purple-500 text-white border-purple-500',
    description: 'The Control Unit decodes the instruction to determine what operation to perform.',
    detail: 'IR → Control Unit → Signals',
    components: ['Instruction Register (IR)', 'Control Unit (CU)', 'Opcode Decoder', 'Control Signals'],
  },
  {
    id: 'execute',
    label: 'Execute',
    color: 'bg-green-100 border-green-400 text-green-700',
    active: 'bg-green-500 text-white border-green-500',
    description: 'The ALU performs the operation (add, subtract, compare, etc.) on the data.',
    detail: 'ALU ← Registers → Result → Registers',
    components: ['Arithmetic Logic Unit (ALU)', 'Registers (R0–R7)', 'Flags Register', 'Accumulator'],
  },
  {
    id: 'writeback',
    label: 'Write Back',
    color: 'bg-orange-100 border-orange-400 text-orange-700',
    active: 'bg-orange-500 text-white border-orange-500',
    description: 'The result is written back to a register or memory. The PC increments for the next cycle.',
    detail: 'Result → Register / Memory, PC++',
    components: ['Result Register', 'Memory (if store)', 'Program Counter (PC)', 'Status Flags'],
  },
]

const instructions = [
  { name: 'ADD R1, R2', description: 'Adds R1 and R2, stores result in R1' },
  { name: 'LOAD R1, 0x10', description: 'Loads value from address 0x10 into R1' },
  { name: 'STORE R1, 0x20', description: 'Stores R1 value into memory address 0x20' },
  { name: 'JMP 0x04', description: 'Jumps to instruction at address 0x04' },
  { name: 'CMP R1, R2', description: 'Compares R1 and R2, sets flags' },
]

export default function CPUVisualizer() {
  const [current, setCurrent] = useState(0)
  const [running, setRunning] = useState(false)
  const [cycle, setCycle] = useState(0)
  const [selectedInstr, setSelectedInstr] = useState(0)

  useEffect(() => {
    if (!running) return
    const timer = setInterval(() => {
      setCurrent(c => {
        if (c + 1 >= steps.length) {
          setCycle(cy => cy + 1)
          return 0
        }
        return c + 1
      })
    }, 1200)
    return () => clearInterval(timer)
  }, [running])

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-1">CPU visualizer</h2>
      <p className="text-sm text-gray-500 mb-5">See how a CPU executes instructions step by step</p>

      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Select an instruction:</p>
        <div className="flex gap-2 flex-wrap">
          {instructions.map((inst, i) => (
            <button key={i} onClick={() => { setSelectedInstr(i); setRunning(false); setCurrent(0) }}
              className={selectedInstr === i
                ? 'px-3 py-1 rounded-lg bg-gray-900 text-white text-xs font-mono'
                : 'px-3 py-1 rounded-lg border border-gray-200 text-xs font-mono text-gray-600 hover:bg-gray-50'}>
              {inst.name}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">{instructions[selectedInstr].description}</p>
      </div>

      <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-2">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
            <div className={`px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all duration-300 ${i === current ? step.active : step.color}`}>
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <div className={`text-lg transition-all duration-300 ${i < current ? 'text-gray-600' : 'text-gray-300'}`}>→</div>
            )}
          </div>
        ))}
      </div>

      <div className={`rounded-xl border-2 p-4 mb-4 transition-all duration-300 ${steps[current].color}`}>
        <p className="font-medium text-sm mb-1">{steps[current].label} stage</p>
        <p className="text-sm mb-2">{steps[current].description}</p>
        <p className="font-mono text-xs bg-white bg-opacity-60 rounded-lg px-3 py-1 inline-block">{steps[current].detail}</p>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <p className="text-xs font-medium text-gray-500 mb-2">Active components:</p>
        <div className="flex flex-wrap gap-2">
          {steps[current].components.map(c => (
            <span key={c} className="text-xs bg-white border border-gray-200 rounded-lg px-2 py-1 text-gray-700">{c}</span>
          ))}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button onClick={() => { setRunning(r => !r) }}
          className={`flex-1 py-2 rounded-lg text-sm font-medium ${running ? 'bg-red-500 text-white' : 'bg-blue-600 text-white'}`}>
          {running ? 'Pause' : 'Run cycle'}
        </button>
        <button onClick={() => { setRunning(false); setCurrent(c => (c + 1) % steps.length) }}
          className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
          Step →
        </button>
        <button onClick={() => { setRunning(false); setCurrent(0); setCycle(0) }}
          className="px-4 py-2 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50">
          Reset
        </button>
      </div>
      <p className="text-xs text-gray-400 text-center mt-3">Cycles completed: {cycle}</p>
    </div>
  )
}
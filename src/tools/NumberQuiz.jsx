import { useState } from 'react'

const questions = [
  { q: 'What is 10 in binary?', a: '1010', hint: 'Convert 10 to base 2' },
  { q: 'What is 0xFF in decimal?', a: '255', hint: '15×16 + 15 = ?' },
  { q: 'What is 11111111 in decimal?', a: '255', hint: 'That is 8 ones in binary' },
  { q: 'What is 255 in hexadecimal?', a: 'FF', hint: '255 ÷ 16 = 15 remainder 15' },
  { q: 'What is 8 in binary?', a: '1000', hint: '8 = 2³' },
  { q: 'What is 0b1100 in decimal?', a: '12', hint: '8 + 4 = ?' },
  { q: 'What is 16 in hex?', a: '10', hint: '16 in base 16 is like 10 in base 10' },
  { q: 'What is 0o17 in decimal?', a: '15', hint: '1×8 + 7 = ?' },
  { q: 'What is 64 in binary?', a: '1000000', hint: '64 = 2⁶' },
  { q: 'What is 0xA in decimal?', a: '10', hint: 'A is the hex digit for 10' },
  { q: 'What is 255 in binary?', a: '11111111', hint: '8 ones = 2⁸ - 1' },
  { q: 'What is 0b1111 in decimal?', a: '15', hint: '8+4+2+1 = ?' },
  { q: 'What is 32 in hex?', a: '20', hint: '32 = 2×16' },
  { q: 'What is 0o10 in decimal?', a: '8', hint: 'Octal 10 = one group of 8' },
  { q: 'What is 100 in binary?', a: '1100100', hint: '64+32+4 = 100' },
]

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

export default function NumberQuiz() {
  const [qs, setQs] = useState(() => shuffle(questions).slice(0, 5))
  const [current, setCurrent] = useState(0)
  const [input, setInput] = useState('')
  const [status, setStatus] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [results, setResults] = useState([])

  function check() {
    if (!input.trim()) return
    const correct = input.trim().toUpperCase() === qs[current].a.toUpperCase()
    setStatus(correct ? 'correct' : 'wrong')
    setResults(r => [...r, { q: qs[current].q, your: input.trim(), correct: qs[current].a, ok: correct }])
    if (correct) setScore(s => s + 1)
  }

  function next() {
    if (current + 1 >= qs.length) { setDone(true) }
    else { setCurrent(c => c + 1); setInput(''); setStatus(null); setShowHint(false) }
  }

  function restart() {
    setQs(shuffle(questions).slice(0, 5)); setCurrent(0); setInput('')
    setStatus(null); setScore(0); setDone(false); setShowHint(false); setResults([])
  }

  if (done) return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Quiz complete!</h2>
      <div className={`text-4xl font-bold text-center my-4 ${score === qs.length ? 'text-green-500' : score >= 3 ? 'text-blue-500' : 'text-red-500'}`}>
        {score} / {qs.length}
      </div>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-5">
        {score === qs.length ? '🎉 Perfect score!' : score >= 3 ? 'Good job! Keep practicing.' : 'Keep studying — you got this!'}
      </p>
      <div className="space-y-2 mb-5">
        {results.map((r, i) => (
          <div key={i} className={`p-3 rounded-xl text-sm ${r.ok ? 'bg-green-50 dark:bg-green-900' : 'bg-red-50 dark:bg-red-900'}`}>
            <p className="font-medium text-gray-700 dark:text-gray-200">{r.q}</p>
            {!r.ok && <p className="text-red-500 dark:text-red-300 text-xs mt-1">Your answer: {r.your} — Correct: {r.correct}</p>}
            {r.ok && <p className="text-green-500 dark:text-green-300 text-xs mt-1">Correct! ✓</p>}
          </div>
        ))}
      </div>
      <button onClick={restart} className="w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">Try again</button>
    </div>
  )

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">Number system quiz</h2>
        <span className="text-sm text-gray-400 dark:text-gray-500">{current + 1} / {qs.length}</span>
      </div>
      <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-5">
        <div className="bg-blue-500 h-1.5 rounded-full transition-all" style={{ width: `${((current) / qs.length) * 100}%` }} />
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
        <p className="text-base font-medium text-gray-800 dark:text-white">{qs[current].q}</p>
      </div>
      <input type="text" value={input} onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && (status ? next() : check())}
        placeholder="Your answer..."
        disabled={status !== null}
        className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-blue-400 disabled:bg-gray-50 dark:disabled:bg-gray-700" />
      {status === 'correct' && <div className="bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-xl px-4 py-3 text-sm font-medium mb-3">✓ Correct!</div>}
      {status === 'wrong' && <div className="bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-xl px-4 py-3 text-sm mb-3">✗ Wrong — the answer is <span className="font-mono font-bold">{qs[current].a}</span></div>}
      {showHint && !status && <div className="bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 rounded-xl px-4 py-3 text-sm mb-3">💡 {qs[current].hint}</div>}
      <div className="flex gap-2">
        {!status && (
          <>
            <button onClick={check} className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">Check</button>
            <button onClick={() => setShowHint(true)} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">Hint</button>
          </>
        )}
        {status && <button onClick={next} className="flex-1 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">{current + 1 >= qs.length ? 'See results' : 'Next question →'}</button>}
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3">Score: {score} correct so far</p>
    </div>
  )
}
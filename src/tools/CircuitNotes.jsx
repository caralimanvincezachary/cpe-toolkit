import { useState, useEffect } from 'react'

const categories = ['General', 'Resistors', 'Capacitors', 'Logic', 'Amplifiers', 'Other']

export default function CircuitNotes() {
  const [notes, setNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem('circuit-notes')) || [] } catch { return [] }
  })
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [cat, setCat] = useState('General')
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState(null)

  useEffect(() => { localStorage.setItem('circuit-notes', JSON.stringify(notes)) }, [notes])

  function save() {
    if (!title.trim() || !body.trim()) return
    if (editing !== null) {
      setNotes(ns => ns.map((n, i) => i === editing ? { ...n, title, body, cat } : n))
      setEditing(null)
    } else {
      setNotes(ns => [...ns, { title, body, cat, date: new Date().toLocaleDateString() }])
    }
    setTitle(''); setBody(''); setCat('General')
  }

  function del(i) { setNotes(ns => ns.filter((_, idx) => idx !== i)) }
  function edit(i) { setTitle(notes[i].title); setBody(notes[i].body); setCat(notes[i].cat); setEditing(i) }

  const filtered = notes.filter(n =>
    (filter === 'All' || n.cat === filter) &&
    (n.title.toLowerCase().includes(search.toLowerCase()) || n.body.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Circuit notes</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Save notes about circuits, formulas, and components</p>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-5">
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}
          placeholder="Note title..."
          className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-blue-400" />
        <textarea value={body} onChange={e => setBody(e.target.value)}
          placeholder="Write your note... formulas, pin configs, observations"
          rows={4}
          className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-700 dark:text-white rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-blue-400 resize-none" />
        <div className="flex gap-2 flex-wrap mb-2">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={cat === c ? 'px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-medium' : 'px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-600 text-xs text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700'}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={save} className="w-full py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">
          {editing !== null ? 'Update note' : 'Save note'}
        </button>
        {editing !== null && (
          <button onClick={() => { setEditing(null); setTitle(''); setBody(''); setCat('General') }}
            className="w-full py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400 mt-2">
            Cancel edit
          </button>
        )}
      </div>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)}
        placeholder="Search notes..."
        className="w-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:border-blue-400" />
      <div className="flex gap-2 flex-wrap mb-4">
        {['All', ...categories].map(c => (
          <button key={c} onClick={() => setFilter(c)}
            className={filter === c ? 'px-3 py-1 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs' : 'px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}>
            {c}
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center py-6">
          {notes.length === 0 ? 'No notes yet — save your first one above.' : 'No notes match your search.'}
        </p>
      )}
      <div className="space-y-3">
        {filtered.map((n, i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
            <div className="flex justify-between items-start mb-1">
              <p className="font-medium text-sm text-gray-900 dark:text-white">{n.title}</p>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-lg ml-2 flex-shrink-0">{n.cat}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap mb-2">{n.body}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 dark:text-gray-500">{n.date}</span>
              <div className="flex gap-2">
                <button onClick={() => edit(notes.indexOf(n))} className="text-xs text-blue-500 hover:text-blue-700">Edit</button>
                <button onClick={() => del(notes.indexOf(n))} className="text-xs text-red-400 hover:text-red-600">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
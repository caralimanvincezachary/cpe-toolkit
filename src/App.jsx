import BinaryConverter from './tools/BinaryConverter'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">CpE Toolkit</h1>
        <BinaryConverter />
      </div>
    </div>
  )
}
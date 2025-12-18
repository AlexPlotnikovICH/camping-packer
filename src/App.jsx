import { useState, useEffect } from 'react'
import { initialItems } from './data/initialItems'
import { categoryNames } from './data/categories'
import Item from './components/Item'
import AddItemForm from './components/AddItemForm'
import { ThemeToggle } from './components/ThemeToggle'
// import styles from './App.module.css' // <-- УДАЛЯЕМ ЭТО, нам не нужны старые CSS модули
import './App.css' // Убедись, что тут лежат только 3 директивы @tailwind

function App() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('camping-data')
    if (saved) {
      return JSON.parse(saved)
    }
    return initialItems
  })

  useEffect(() => {
    localStorage.setItem('camping-data', JSON.stringify(items))
  }, [items])

  const handleToggleItem = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isPacked: !item.isPacked } : item
      )
    )
  }

  const handleAddItem = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now().toString(),
      isPacked: false,
    }
    setItems((prev) => [item, ...prev])
  }

  const handleDeleteItem = (id) => {
    if (window.confirm('Удалить этот предмет?')) {
      setItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  // Функция для формата веса
  const formatWeight = (weight) => {
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(2)} кг`
    }
    return `${weight} г`
  }

  // Подсчеты
  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  const packedWeight = items.reduce(
    (sum, item) => (item.isPacked ? sum + item.weight : sum),
    0
  )
  const categories = [...new Set(items.map((item) => item.category))]

  const progressPercentage =
    totalWeight > 0 ? (packedWeight / totalWeight) * 100 : 0

  return (
    <div className="min-h-screen transition-colors duration-300 bg-surface-50 text-slate-900 dark:bg-surface-950 dark:text-slate-100 relative pb-20">
      {/* HEADER */}
      <header className="sticky top-0 z-10 bg-surface-50/90 backdrop-blur-md dark:bg-surface-950/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 pt-4 pb-4 px-4 shadow-sm">
        <div className="max-w-md mx-auto">
          {' '}
          {/* Ограничитель ширины для красоты */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-black uppercase tracking-tight text-primary dark:text-slate-100">
              Camping<span className="text-action">Packer</span>
            </h1>

            <div className="flex items-center gap-3">
              <div className="px-3 py-1 rounded-lg text-sm font-mono font-bold bg-surface-100 text-slate-700 dark:bg-surface-800 dark:text-slate-200">
                {formatWeight(packedWeight)} / {formatWeight(totalWeight)}
              </div>
              <ThemeToggle />
            </div>
          </div>
          {/* Progress Bar */}
          <div className="h-3 bg-surface-200 dark:bg-surface-800 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-500 ease-out rounded-full shadow-[0_0_10px_rgba(77,124,15,0.5)]"
              style={{
                width: `${progressPercentage}%`,
                backgroundColor:
                  progressPercentage === 100 ? '#4d7c0f' : '#ea580c', // Используем цвета из конфига (hardcoded hex для динамики)
              }}
            />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-md mx-auto px-4 mt-6">
        <AddItemForm onAdd={handleAddItem} />

        {categories.map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 mt-6 ml-1 border-b border-slate-200 dark:border-slate-800 pb-1">
              {categoryNames[category] || category}
            </h2>
            <div className="flex flex-col gap-3">
              {items
                .filter((item) => item.category === category)
                .map((item) => (
                  <Item
                    key={item.id}
                    item={item}
                    onToggle={handleToggleItem}
                    onDelete={handleDeleteItem}
                  />
                ))}
            </div>
          </div>
        ))}

        {/* RESET BUTTON */}
        <div className="flex justify-center mt-12 mb-20">
          <button
            onClick={() => {
              if (window.confirm('Снять галочки со всех предметов?')) {
                setItems((prevItems) =>
                  prevItems.map((item) => ({ ...item, isPacked: false }))
                )
              }
            }}
            className="
    flex items-center gap-3
    px-8 py-4 
    font-mono font-bold text-red-500 uppercase tracking-widest text-sm
    border-2 border-red-500/50 rounded-xl
    hover:bg-red-500 hover:text-white hover:border-red-500
    transition-all duration-300
    active:scale-95
  "
          >
            <span>⚠️ Разобрать рюкзак</span>
          </button>
        </div>
      </main>
    </div>
  )
}

export default App

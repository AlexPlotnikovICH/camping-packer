import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { initialItems } from './data/initialItems'
import { categoryNames } from './data/categories'
import Item from './components/Item'
import AddItemForm from './components/AddItemForm'
import { ThemeToggle } from './components/ThemeToggle'
import styles from './App.module.css'
import './App.css'

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

  const handleReset = () => {
    if (window.confirm('Вы точно хотите разобрать рюкзак?')) {
      setItems((prevItems) =>
        prevItems.map((item) => ({ ...item, isPacked: false }))
      )
    }
  }

  const totalWeight = items.reduce((sum, item) => sum + item.weight, 0)
  const packedWeight = items.reduce(
    (sum, item) => (item.isPacked ? sum + item.weight : sum),
    0
  )
  const categories = [...new Set(items.map((item) => item.category))]

  const formatWeight = (weight) => {
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(2)} кг`
    }
    return `${weight} г`
  }

  const progressPercentage =
    totalWeight > 0 ? (packedWeight / totalWeight) * 100 : 0

  return (
    <div
      className={`${styles.container} min-h-screen transition-colors duration-300 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 relative`}
    >
      <header
        className={`${styles.header} bg-slate-50/90 backdrop-blur-sm dark:bg-slate-950/90 dark:text-white transition-colors duration-300 pt-4 pb-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <h1 className={`${styles.title} text-slate-900 dark:text-slate-100`}>
            Camping Packer
          </h1>
          <div className="flex items-center gap-4">
            <div className="px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors">
              {formatWeight(packedWeight)} / {formatWeight(totalWeight)}
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden transition-colors">
          <div
            className="h-full transition-all duration-500 ease-out rounded-full"
            style={{
              width: `${progressPercentage}%`,
              backgroundColor:
                progressPercentage === 100 ? '#10b981' : '#3b82f6',
            }}
          />
        </div>
      </header>

      <AddItemForm onAdd={handleAddItem} />

      {categories.map((category) => (
        <div key={category} className={styles.categoryGroup}>
          <h2 className="text-lg font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 mt-8 ml-1">
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

      <div className={styles.resetButtonContainer}>
        <button onClick={handleReset} className={styles.resetButton}>
          <Trash2 size={20} />
          Разобрать рюкзак
        </button>
      </div>
    </div>
  )
}

export default App

import { useState, useEffect } from 'react'
import { Trash2 } from 'lucide-react'
import { initialItems } from './data/initialItems'
import Item from './components/Item'
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
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <h1 className={styles.title}>Camping Packer</h1>
          <div className={styles.stats}>
            {formatWeight(packedWeight)} / {formatWeight(totalWeight)}
          </div>
        </div>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{
              width: `${progressPercentage}%`,
              backgroundColor:
                progressPercentage === 100 ? '#4caf50' : '#2196f3',
            }}
          />
        </div>
      </header>

      {categories.map((category) => (
        <div key={category} className={styles.categoryGroup}>
          <h2 className={styles.categoryTitle}>{category}</h2>
          <div className={styles.itemsList}>
            {items
              .filter((item) => item.category === category)
              .map((item) => (
                <Item key={item.id} item={item} onToggle={handleToggleItem} />
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

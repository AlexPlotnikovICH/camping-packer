import { useState, useEffect } from 'react'
import { initialItems } from './data/initialItems'
import Item from './components/Item'
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
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <header style={{ marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <h1>Camping Packer</h1>
          <div
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#e3f2fd',
              padding: '8px 12px',
              borderRadius: '8px',
              color: '#1565c0',
            }}
          >
            Рюкзак: {formatWeight(packedWeight)} / {formatWeight(totalWeight)}
          </div>
        </div>
        <div
          style={{
            height: '10px',
            backgroundColor: '#eee',
            borderRadius: '5px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPercentage}%`,
              backgroundColor: '#4caf50',
              transition: 'width 0.3s ease-in-out',
            }}
          />
        </div>
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <button
            onClick={handleReset}
            style={{
              padding: '8px 16px',
              backgroundColor: '#ff5252',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            Сбросить
          </button>
        </div>
      </header>

      {categories.map((category) => (
        <div key={category} style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: '20px',
              borderBottom: '2px solid #eee',
              paddingBottom: '8px',
              marginBottom: '12px',
              color: '#444',
            }}
          >
            {category}
          </h2>
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              border: '1px solid #eee',
            }}
          >
            {items
              .filter((item) => item.category === category)
              .map((item) => (
                <Item key={item.id} item={item} onToggle={handleToggleItem} />
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default App

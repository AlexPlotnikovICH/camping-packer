import { useState } from 'react'
import { Plus } from 'lucide-react'
import styles from './AddItemForm.module.css'

const CATEGORIES = [
  'Shelter',
  'Kitchen',
  'Clothing',
  'Hygiene',
  'Electronics',
  'Other',
]

function AddItemForm({ onAdd }) {
  const [name, setName] = useState('')
  const [weight, setWeight] = useState('')
  const [category, setCategory] = useState('Other')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim() || !weight) return

    onAdd({
      name: name.trim(),
      weight: parseInt(weight, 10),
      category,
    })

    setName('')
    setWeight('')
    setCategory('Other')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Название"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <div className={styles.row}>
        <input
          type="number"
          placeholder="Вес (г)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={styles.input}
          style={{ flex: 1 }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={styles.select}
          style={{ flex: 1 }}
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className={styles.addButton}>
        <Plus size={20} />
        Добавить
      </button>
    </form>
  )
}

export default AddItemForm

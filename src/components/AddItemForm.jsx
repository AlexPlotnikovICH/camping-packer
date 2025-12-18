import { useState } from 'react'
import { Plus } from 'lucide-react'
import { categoryNames } from '../data/categories'
import styles from './AddItemForm.module.css'

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
    <form
      className={`${styles.form} bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg dark:shadow-none mb-6 flex flex-col gap-4 transition-colors duration-300`}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Название (например, Топор)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={`${styles.input} w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
      />
      <div className={styles.row}>
        <input
          type="number"
          placeholder="Вес (г)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className={`${styles.input} w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
          style={{ flex: 1 }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`${styles.select} w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
          style={{ flex: 1 }}
        >
          {Object.entries(categoryNames).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <button className="w-full !py-3.5 text-lg font-black text-white uppercase tracking-[0.2em] transition-all transform shadow-lg rounded-xl bg-action hover:bg-action-hover active:scale-95 hover:shadow-xl">
        + Добавить
      </button>
    </form>
  )
}

export default AddItemForm

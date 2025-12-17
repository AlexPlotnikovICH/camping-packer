import { CheckCircle, Circle, X } from 'lucide-react'
import styles from './Item.module.css'

function Item({ item, onToggle, onDelete }) {
  const formatWeight = (weight) => {
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(1)} кг`
    }
    return `${weight} г`
  }

  return (
    <div
      className={`${styles.item} flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-transparent dark:border-slate-700/50`}
      onClick={() => onToggle(item.id)}
    >
      {item.isPacked ? (
        <CheckCircle
          className={`${styles.iconChecked} text-emerald-500`}
          size={24}
        />
      ) : (
        <Circle
          className={`${styles.icon} text-slate-300 dark:text-slate-600`}
          size={24}
        />
      )}
      <div className={styles.content}>
        <span
          className={`${styles.name} text-slate-800 dark:text-slate-100 font-medium`}
        >
          {item.name}
        </span>
        <span
          className={`${styles.weight} text-xs bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300 font-medium`}
        >
          {formatWeight(item.weight)}
        </span>
      </div>
      <button
        className={`${styles.deleteButton} text-slate-400 dark:text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors`}
        onClick={(e) => {
          e.stopPropagation()
          onDelete(item.id)
        }}
      >
        <X size={18} />
      </button>
    </div>
  )
}

export default Item

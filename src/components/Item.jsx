import { CheckCircle, Circle } from 'lucide-react'
import styles from './Item.module.css'

function Item({ item, onToggle }) {
  const formatWeight = (weight) => {
    if (weight >= 1000) {
      return `${(weight / 1000).toFixed(1)} кг`
    }
    return `${weight} г`
  }

  return (
    <div
      className={`${styles.item} ${item.isPacked ? styles.packed : ''}`}
      onClick={() => onToggle(item.id)}
    >
      {item.isPacked ? (
        <CheckCircle className={styles.iconChecked} size={24} />
      ) : (
        <Circle className={styles.icon} size={24} />
      )}
      <div className={styles.content}>
        <span className={styles.name}>{item.name}</span>
        <span className={styles.weight}>{formatWeight(item.weight)}</span>
      </div>
    </div>
  )
}

export default Item

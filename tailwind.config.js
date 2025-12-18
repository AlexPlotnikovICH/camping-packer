/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Оставляем ручное переключение
  theme: {
    extend: {
      // Настраиваем "Тактическую палитру"
      colors: {
        // Основной цвет (зеленый/олива) - для шапки, активных галочек
        primary: {
          DEFAULT: '#4d7c0f', // lime-700 (Глубокий оливковый)
          hover: '#3f6212', // lime-800
          light: '#84cc16', // lime-500 (для темной темы текст)
        },
        // Цвет "Действия" (Оранжевый) - для кнопки Добавить
        action: {
          DEFAULT: '#ea580c', // orange-600 (Safety Orange)
          hover: '#c2410c', // orange-700
        },
        // Фоны (Камень/Металл)
        surface: {
          50: '#fafaf9', // stone-50
          100: '#f5f5f4', // stone-100 (карточки светлая тема)
          800: '#292524', // stone-800 (карточки темная тема - "оружейный металл")
          900: '#1c1917', // stone-900 (фон страницы темная тема)
          950: '#0c0a09', // stone-950 (глубокий черный)
        },
      },
      // Шрифты
      fontFamily: {
        // Для цифр будем использовать mono (как на приборах)
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      // Скругления (делаем их строже)
      borderRadius: {
        DEFAULT: '0.375rem', // 6px (стандарт)
        lg: '0.5rem', // 8px (карточки)
        xl: '0.75rem', // 12px (максимум)
        // Убрали 2xl и 3xl, чтобы не было "мыла"
      },
    },
  },
  plugins: [],
}

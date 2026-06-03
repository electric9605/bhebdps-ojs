const editor = document.getElementById('editor');
const STORAGE_KEY = 'editor-content';

// Восстанавливаем текст из localStorage при загрузке
const savedContent = localStorage.getItem(STORAGE_KEY);
if (savedContent !== null) {
  editor.value = savedContent;
}

// Сохраняем текст при каждом изменении
editor.addEventListener('input', () => {
  localStorage.setItem(STORAGE_KEY, editor.value);
});

// очистка
const clearBtn = document.getElementById('clear-btn');

clearBtn.addEventListener('click', () => {
  editor.value = '';
  localStorage.removeItem(STORAGE_KEY);
});
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store/index';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>
);

// TODO
// 1) починить драг энд дроп
// 2) добавить сохранение состояния (кеш или простой бэк)
// 3) добавить регистрацию пользователей
// 4) добавить функционал ближе к трелло:
//    - добавление / удаление столбцов, перестановка местами,
//    - улучшить визуальную стилизацию
//    - добавить кастомизацию фона

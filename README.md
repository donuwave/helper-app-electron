# 🗂️ Helper App — пакетная конвертация Excel в PDF

Десктопное приложение для автоматизации рутины с документами. Берёт папку с Excel-файлами заказов, конвертирует каждый в PDF, ставит на документ подпись-картинку, добавляет поля и раскладывает готовые файлы по папкам. Работа, которая вручную занимала часы, делается одной кнопкой.

## Возможности

- Выбор папки с исходными `.xls` / `.xlsx`, папки для результата и картинки с подписью через нативные диалоги ОС
- Пакетная конвертация всех Excel-файлов из папки в PDF
- Конвертация через сам Microsoft Excel (COM-автоматизация), поэтому PDF выглядит один в один как документ в Excel: с форматированием, границами и разметкой страниц
- Автоматическое имя файла по данным из таблицы: `<код> <наименование> Заказ <номер>.pdf`
- Раскладка PDF по подпапкам по коду из документа, папки создаются автоматически
- Вставка изображения подписи в правый верхний угол первой страницы
- Добавление боковых отступов на всех страницах

## Как устроено

- **Main process** (Electron) открывает Excel через `winax`, читает нужные ячейки, экспортирует книгу в PDF и дорабатывает результат через `pdf-lib`: вставляет подпись и расширяет страницы
- **Preload** через `contextBridge` пробрасывает в интерфейс безопасное API: выбор папок и файлов, запуск конвертации
- **Renderer** — интерфейс на React + Ant Design, общается с main-процессом через IPC (`ipcRenderer.invoke` / `ipcMain.handle`)

## Стек

![Electron](https://img.shields.io/badge/Electron-47848F?style=flat&logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React_18-20232A?style=flat&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant_Design-0170FE?style=flat&logo=antdesign&logoColor=white)
![styled-components](https://img.shields.io/badge/styled--components-DB7093?style=flat&logo=styled-components&logoColor=white)

- Electron + electron-vite, сборка через electron-builder
- React 18, TypeScript, React Router
- Ant Design, styled-components
- winax (COM-автоматизация Excel), pdf-lib
- Архитектура интерфейса по FSD (`app` / `pages` / `features` / `shared`)

## Запуск

> [!IMPORTANT]
> Приложение работает только на **Windows** с установленным **Microsoft Excel**: конвертация идёт через COM-интерфейс Excel.

```bash
git clone https://github.com/donuwave/helper-app-electron.git
cd helper-app-electron
npm install

# режим разработки
npm run dev

# сборка установщика для Windows
npm run build:win
```

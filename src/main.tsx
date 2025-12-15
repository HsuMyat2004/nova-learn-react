import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CourseContextProvider from "./context/CourseContextProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <CourseContextProvider>
          <App />
      </CourseContextProvider>
  </StrictMode>,
)

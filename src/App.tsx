import './App.css'
import AppRoutes from './routes'


function App() {
  if (localStorage.getItem('theme') === 'dark'){
    document.documentElement.classList.add('dark')
  }

  return (
    <AppRoutes />
  )
}

export default App

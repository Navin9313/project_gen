import './App.css'
import Register from './register_Page/register'
import LoginPage from './register_Page/login'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from './dashboard/dashboard'
import CRUD from './testinterview/crud'

function AppContent(){
  
  
  return(
    <div>
      <Routes>
        <Route path='/' element={ <Register /> } />
        <Route path='/login' element={ <LoginPage /> } />
        <Route path='/dashboard' element={ <CRUD /> } />
      </Routes>
    </div>
  )
}


function App() {

  return (
    <>
      <BrowserRouter>
          <AppContent />
      </BrowserRouter>
    </>
  )
}

export default App

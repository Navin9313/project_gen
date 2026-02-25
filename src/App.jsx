import './App.css'
import Register from './register_Page/register'
import LoginPage from './register_Page/login'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from './dashboard/dashboard'
import CRUD from './testinterview/crud'
import ImageCrud from './testinterview/imagecrud'
import Asider from './asider'

function AppContent(){
  
  
  return(
    <div>
      <Routes>
        <Route path='/' element={ <Register /> } />
        <Route path='/login' element={ <LoginPage /> } />

        <div className="grid grid-cols-[30%_auto]">
            <div>
              <Asider />
            </div>
            <div>
              <Route path='/dashboard' element={ <Dashboard /> } />
              <Route path='/crud' element={ <CRUD /> } />
              <Route path='/image' element={ <ImageCrud /> } />
            </div>
        </div>

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

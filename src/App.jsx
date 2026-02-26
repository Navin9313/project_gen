import './App.css'
import Register from './register_Page/register'
import LoginPage from './register_Page/login'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Dashboard from './dashboard/dashboard'
import CRUD from './testinterview/crud'
import ImageCrud from './testinterview/imagecrud'
import Asider from './asider'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { verifyUser } from './slice'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from './dashboardlayout'

function AppContent(){
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUser());
  },[]);
  
  return(
    <div>
      <Routes>
        <Route path='/' element={ <Register /> } />
        <Route path='/login' element={ <LoginPage /> } />
        <Route element={ <PrivateRoute> <DashboardLayout /> </PrivateRoute> }>
          <Route path='/dashboard' element={ <Dashboard /> } />
          <Route path='/crud' element={ <CRUD /> } />
          <Route path='/image' element={ <ImageCrud /> } />
        </Route>
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

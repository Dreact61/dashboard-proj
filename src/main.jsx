import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import App from './App.jsx'
import Settings from './components/settings.jsx'
import { Navigate } from 'react-router'
import {Balance} from './components/balance.tsx'

const root = document.getElementById('root')

ReactDOM.createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        
        <Route path='/settings' element={<Settings />}></Route>
        
        <Route path='/balance' element={<Balance />}></Route>

        <Route path='*' element={<Navigate to='/' replace/>}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

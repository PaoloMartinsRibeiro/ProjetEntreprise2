import './App.css'
import Login from './Pages/Login/Login'
import Salarie from '../src/Pages/Salaries/Salaries'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/GetAllSalarie" element={<Salarie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

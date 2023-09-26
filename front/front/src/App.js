import './App.css'
import Login from './Pages/Login/Login'
import Salarie from '../src/Pages/Salaries/Salaries'
import Home from './Pages/Home/Home'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/GetAllSalarie" element={<Salarie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

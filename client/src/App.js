import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import Update from './pages/Update';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path='/add' element={<Add />} />
          <Route path='/update/:id' element={<Update />} />
          <Route exact path='/' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

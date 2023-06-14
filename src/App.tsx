import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import "./App.css"

function App() {
  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
        </Routes>
        <div className='background'></div>
      </Router> 
    </div>
  );
}

export default App;

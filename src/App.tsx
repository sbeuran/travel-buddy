import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import "./App.css"

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
      </Routes>
      <div className='background'></div>
    </div>
  );
}

export default App;

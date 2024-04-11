import { useState, useEffect } from 'react';
import './styles/app.scss';
import axios from 'axios';
import { HashRouter } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import All from './components/people/All';
import Person from './components/people/Person';

function App() {
  const Home = () => {
    return (
      <>
        <Link to="/people/all">
          <div className="back-link">See all people</div>
        </Link>
      </>
    );
  };

  return (
    <div className="app-wrapper">
      <HashRouter basename="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people/all" element={<All />} />
          <Route path="/people/:id" element={<Person />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

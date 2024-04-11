import { useState, useEffect } from 'react';
import './styles/app.scss';
import axios from 'axios';
import { HashRouter } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import All from './components/people/All';
import Person from './components/people/Person';
import Create from './components/Create';
import Delete from './components/delete/Delete';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

function App() {
  const Home = () => {
    return (
      <div className="home-wrapper">
        <Link to="/people/all">
          <div className="link">/people/all</div>
        </Link>

        <Link to="/person/create">
          <div className="link">/person/create</div>
        </Link>

        <Link to="/person/delete">
          <div className="link">/person/delete</div>
        </Link>
      </div>
    );
  };

  return (
    <div className="app-wrapper">
      <HashRouter basename="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/person/create" element={<Create />} />
          <Route path="/person/delete" element={<Delete />} />

          <Route path="/people/all" element={<All />} />
          <Route path="/people/:id" element={<Person />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

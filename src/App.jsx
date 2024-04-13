import { HashRouter } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { MdMenu } from 'react-icons/md';
import All from './components/people/All';
import Person from './components/people/Person';
import Create from './components/create/Create';
import Delete from './components/delete/Delete';
// import 'primereact/resources/themes/viva-light/theme.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import './styles/app.scss';
import { AiFillHome } from 'react-icons/ai';
import { PrimeReactProvider } from 'primereact/api';
import { Ripple } from 'primereact/ripple';
import { Card } from 'primereact/card';
import people from './assets/people.jpeg';
import people2 from './assets/people2.jpeg';
import { useState, useEffect } from 'react';
import axios from 'axios';
const Home = () => {
  const [count, setCount] = useState();

  useEffect(() => {
    axios.get('https://test.epdet.org/api/applicant').then((response) => {
      setCount(response.data.length);
    });
  }, []);

  const header = (
    <img
      alt="Card"
      // src="https://primefaces.org/cdn/primereact/images/usercard.png"
      src={people2}
    />
  );

  return (
    <>
      <div className="home-wrapper">
        

        <Link to="/people/all">
          <div className="link p-ripple">
            Search
            <Ripple />
          </div>
        </Link>

        <Link to="/person/create">
          <div className="link p-ripple">
            Create
            <Ripple />
          </div>
        </Link>

        <Link to="/person/delete">
          <div className="link p-ripple">
            Delete
            <Ripple />
          </div>
        </Link>

        <Card
          className="the-card p-ripple"
          title={count}
          subTitle="People"
          header={header}
          style={{
            maxWidth: '200px',
            border: '1px solid black',
            // paddingTop: '1rem',
            boxShadow: 'none'
          }}
        />
      </div>
    </>
  );
};
const App = () => {
  const value = {
    ripple: true
  };

  return (
    <PrimeReactProvider value={value}>
      <HashRouter basename="">
        <nav>
          <Link to="/">
            <div className="menu-wrapper p-ripple">
              <AiFillHome className="menu-icon" />
              <div>Home</div>
              <Ripple />
            </div>
          </Link>
        </nav>
        <div className="app-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/person/create" element={<Create />} />
            <Route path="/person/delete" element={<Delete />} />

            <Route path="/people/all" element={<All />} />
            <Route path="/people" element={<Person />} />
          </Routes>
        </div>
      </HashRouter>
    </PrimeReactProvider>
  );
};

export default App;

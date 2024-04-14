import { HashRouter } from 'react-router-dom';
import { Route, Link } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import All from './components/people/All';
import Person from './components/people/Person';
import Create from './components/create/Create';
import Delete from './components/delete/Delete';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import './styles/app.scss';
import { AiFillHome } from 'react-icons/ai';
import { PrimeReactProvider } from 'primereact/api';
import { Ripple } from 'primereact/ripple';
import { Card } from 'primereact/card';
import people2 from './assets/people2.jpeg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import sleep from './functions/sleep';
import { IoIosAdd } from 'react-icons/io';
import { AiOutlineSearch, AiOutlineDelete, AiOutlineHome } from 'react-icons/ai';
import { IoAddSharp } from 'react-icons/io5';

const Home = () => {
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function onMount() {
      await sleep(1000);
      axios.get('https://test.epdet.org/api/applicant').then((response) => {
        setCount(response.data.length);
        setLoading(false);
      });
    }
    onMount();
  }, []);

  const header = <img alt="Card" src={people2} />;

  return (
    <div className="home-wrapper">
      {!loading ? (
        <>
        {/* <p>Internal Tool</p> */}
          <Link to="/people/all">
            <div className="link p-ripple">
              <AiOutlineSearch className="link-icon" />
              Search
              <Ripple />
            </div>
          </Link>

          <Link to="/person/create">
            <div className="link p-ripple">
              {/* <IoIosAdd className="link-icon" /> */}
              <IoAddSharp className="link-icon"/>
              Create
              <Ripple />
            </div>
          </Link>

          <Link to="/person/delete">
            <div className="link p-ripple">
              <AiOutlineDelete className="link-icon" />
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
              boxShadow: 'none'
            }}
          />
        </>
      ) : (
        <ProgressSpinner
          style={{ width: '40px', height: '40px' }}
          strokeWidth="6"
          animationDuration=".5s"
        />
      )}
    </div>
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
              <AiOutlineHome className="menu-icon" />
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

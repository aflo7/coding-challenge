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
const Home = () => {
  return (
    <div className="home-wrapper">
      <Link to="/people/all">
        <div className="link p-ripple">Search<Ripple/></div>
        
      </Link>

      <Link to="/person/create">
        <div className="link p-ripple">Create<Ripple/></div>
      </Link>

      <Link to="/person/delete">
        <div className="link p-ripple">Delete<Ripple/></div>
      </Link>
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
              <AiFillHome className="menu-icon" />
              <div>Home</div>
              <Ripple/>
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

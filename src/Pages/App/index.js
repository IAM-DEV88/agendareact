/**
 * The above code is a JavaScript function that sets up the routes for a React application using React
 * Router.
 * @returns The App component is being returned.
 */
import { useRoutes, BrowserRouter } from 'react-router-dom';
import { AppProvider } from '../../Context';
import NavigationMenu from '../../Components/NavigationMenu';
import About from '../About';
import Agenda from '../Agenda';
import Ledger from '../Ledger';
import NotFound from '../NotFound';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const AppRoutes = () => {

  const routes = useRoutes([
    { path: '/', element: <About /> },
    { path: '/agenda', element: <Agenda /> },
    { path: '/ledger', element: <Ledger /> },
    { path: '/*', element: <NotFound /> },
  ]);

  return routes;
};

function App() {
  return (
    <>
      <AppProvider>
        <BrowserRouter>
          <NavigationMenu/>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </>
  );
}

export default App;
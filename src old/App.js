import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./component/Menu";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
} from "react-router-dom";
import Agenda from "./pages/Agenda";
import Ledger from "./pages/Ledger";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { AppProvider } from "./Utils";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Agenda />,
  },
  {
    path: "/archivo",
    element: <Ledger />,
  }
]);
function App() {
  return (
    <>
      <AppProvider>
        <Router>
          <Menu />
        </Router>
        <RouterProvider router={router} />
      </AppProvider>
    </>
  );
}
export default App;
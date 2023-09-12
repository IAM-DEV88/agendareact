import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Menu from "./component/Menu";
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter as Router,
} from "react-router-dom";
import Agenda from "./routes/agenda";
import Archivo from "./routes/archivo";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { AppProvider } from "./Utils";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Agenda />,
    },
    {
      path: "/archivo",
      element: <Archivo />,
    },
  ]);
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

// REACT ROUTER IMPORT
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// COMPONENT IMPORT
import Signup from "./Components/Authentication/Signup";
import Login from "./Components/Authentication/Login";
import CreateTask from "./Components/CreateTask";
import Home from "./Components/Home";
import UpdateTask from "./Components/UpdateTask";
import Errorpage from "./Components/Errorpage";
function App() {
  // Routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route index element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="create" element={<CreateTask />} />
        <Route path="home" element={<Home />} />
        <Route path="update" element={<UpdateTask />} />
        <Route path="*" element={<Errorpage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;

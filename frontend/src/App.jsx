import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import ImportantTask from "./Pages/ImportantTask";
import AllTask from "./Pages/AllTask";
import CompletedTask from "./Pages/CompletedTask";
import IncompletedTask from "./Pages/IncompletedTask";
import Login from "./Pages/auth/Login";
import Signup from "./Pages/auth/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthcontext } from "./Context/AuthContext";

function App() {
  const {authUser} = useAuthcontext();
  return (
    <div className="bg-gray-900 text-white h-screen p-4">
      <Router>
        <Routes>
          <Route exact path='/' element={authUser ? <Home /> :<Navigate to={'/login'}/>}>
            <Route index element={<AllTask />} />
            <Route path='/important' element={<ImportantTask />} />
            <Route path='/complete' element={<CompletedTask />} />
            <Route path='/incomplete' element={<IncompletedTask />} />
          </Route>
          <Route path="/login" element={authUser ? <Navigate to={'/'}/> :<Login />}></Route>
          <Route path="/signup" element={authUser ? <Navigate to={'/'}/> :<Signup />}></Route>
        </Routes>
      </Router>
      <Toaster/>
    </div>
  );
}

export default App;

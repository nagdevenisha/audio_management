import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Dashboard from "./Components/Dashboard";
import TaskBar from "./Components/TaskBar";
import Teams from "./Components/Teams";
import Workspace from "./Components/Workspace";
import ProtectedRoute from "./Route/ProtectedRoute";
import Unauthorized from "./Authentication/Unauthorized";
import NotFound from "./Authentication/NotFound";
import LeadSpace from "./Components/LeadSpace";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/unauthorized" element={<Unauthorized/>}></Route>
          <Route path="/leadspace" element={<LeadSpace/>}></Route>
         <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/taskbar"  element={
              <ProtectedRoute roles={["member"]}>
                <TaskBar/>
              </ProtectedRoute>
            }></Route>
          <Route 
            path="/teams" 
            element={
              <ProtectedRoute roles={["Team Lead"]}>
                <Teams />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/workspace" element={<Workspace/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      {/* <Switch>
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/signup" render={(props) => <SignUp {...props} />} />
        <Redirect from="/" to="/signup" />
        <Redirect to="/signup" />
      </Switch> */}
      {/* ====================================================== */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/*" element={<Navigate to="/signup" />} />
      </Routes>
    </div>
  );
}

export default App;

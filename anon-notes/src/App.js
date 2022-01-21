import {BrowserRouter as Router, Routes, Route, Redirect} from "react-router-dom";
import Livrabil from "./pages/Livrabil";
import Proiecte from "./pages/Proiecte";
import Project from "./pages/Project";
import Login from "./pages/Login";

import Navigation from "./components/Navigation";
import CreateProject from "./pages/CreateProject";
import CreateLivrabil from "./pages/CreateLivrabil";

function App() {
  return (
    <div className="App">
      <Router>
        {/* bara de navigare */}
        <Navigation/>
        {/* rutarea */}
        <Routes>
          {/* view livrabil, + votare */}
          <Route exact path="/livrabil/:projectId/:id" element={<Livrabil/>}></Route>
          {/* view proiect */}
          <Route exact path="/project/:id" element={<Project/>}></Route>
          {/* view proiecte */}
          <Route exact path="/proiecte" element={<Proiecte/>}></Route>
          {/* login */}
          <Route exact path="/login" element={<Login/>}></Route>
          {/* create proiect */}
          <Route exact path="/createproject" element={<CreateProject/>}></Route>
          {/* create livrabil */}
          <Route exact path="/createlivrabil" element={<CreateLivrabil/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

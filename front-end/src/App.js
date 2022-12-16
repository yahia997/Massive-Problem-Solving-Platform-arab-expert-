import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useEffect, useState } from "react";


// components //
import { Home, Nav } from "./home";
import { Challenges } from "./challenges";
import { Code } from "./code";
import { Auth } from "./auth";
import { UserPage } from "./user-page";
import { Top } from "./toper";
import { Info } from "./info";
import { First, ManageChallenge } from "./admin";
import { ManageArticle } from "./blog";
import { Articles, SingleArticle} from "./articles";
import { Forgot } from "./forgot-password";

// css //
import "./styles/main.css";
import "./styles/editor-color.css";

// not found 404
import NotFound from "./404";

const AdminPanel = () => {
  const [ifAdmin, setIfAdmin] = useState(false);
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data) {
      if (data.userName === "admin1" && data.password === "www@$WWW_gtav5532759") {
        setIfAdmin(true);
      }
    }
  }, []);

  if (ifAdmin) {
    return <>
    <div className="w-100 space-bottom"></div>
    <section className="admin-p w-100">
      <div className="container">
        <div className="row justify-content-center py-2">
          <a href="/admin" className="col-6 signin text-center py-2 text-decoration-none fw-bold">To Admin Page</a>
        </div>
      </div>
    </section>
  </>
  }else {
    return null;
  }
}

function App() {
  return (<>
    <Router>
      <Nav/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/challenge" element={<Challenges/>}/>
        <Route path="/challenge/:id" element={<Code/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/user/:id" element={<UserPage/>}/>
        <Route path="/top" element={<Top/>}/>
        <Route path="/info" element={<Info/>}/>
        <Route path="/admin" element={<First/>}/>
        <Route path="/admin/add" element={<ManageChallenge addOrUpadate="add" />}/>
        <Route path="/admin/update/:id" element={<ManageChallenge addOrUpadate="update"/>}/>
        <Route path="/admin/blog/add" element={<ManageArticle addOrUpadate="add"/>}/>
        <Route path="/admin/blog/update/:id" element={<ManageArticle addOrUpadate="update"/>}/>
        <Route path="/articles" element={<Articles/>}/>
        <Route path="/articles/:id" element={<SingleArticle/>}/>
        <Route path="/forgotPassword" element={<Forgot/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <AdminPanel/>
    </Router>
  </>);
}

export default App;

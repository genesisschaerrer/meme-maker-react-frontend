import React from "react";
import ReactDOM from "react-dom";
import { useRoutes, A} from "hookrouter"


import App from "./components/app";

import Meme from "./components/memeForm"
import MemeForm from "./components/memeForm";

import Logo from "../static/assets/images/logo.svg"
import "./style/main.scss";


const routes = {
  "/": () => <App /> ,
  "/form": () => <MemeForm />,
  "/form/:id":  ({id}) => <MemeForm id={id} />
}

function Main() {
 return(
   <div className="main-container">
      <div className="navbar">
        <A href="/"><img className="logo" src={Logo} /></A>
      </div>
      
     {useRoutes(routes)}
   </div>
 )
}

ReactDOM.render(<Main />, document.querySelector(".app-wrapper"));


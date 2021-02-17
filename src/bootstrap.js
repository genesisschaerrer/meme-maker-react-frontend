import React from "react";
import ReactDOM from "react-dom";
import { useRoutes, A} from "hookrouter"


import App from "./components/app";
import "./style/main.scss";
import Meme from "./components/memeForm"
import MemeForm from "./components/memeForm";

import Logo from "../static/assets/images/logo.svg"


const routes = {
  "/": () => <App /> ,
  "/form": () => <MemeForm />,
  "/form/:id":  ({id}) => <MemeForm id={id} />
}

function Main() {
 return(
   <div>
     <div className="navbar">
        <A style={{"backgroundColor": "yellow"}} href="/"><img className="logo" src={Logo} /></A>
        <A href="/form">Form</A>
     </div>
      <A href="/form">get started</A>
     {useRoutes(routes)}
   </div>
 )
}

ReactDOM.render(<Main />, document.querySelector(".app-wrapper"));


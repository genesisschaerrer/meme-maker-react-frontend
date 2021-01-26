import React from "react";
import ReactDOM from "react-dom";
import { useRoutes, A} from "hookrouter"


import App from "./components/app";
import "./style/main.scss";
import Meme from "./components/memeForm"
import MemeForm from "./components/memeForm";

const routes = {
  "/": () => <App /> ,
  "/form": () => <MemeForm />
}

function Main() {
 return(
   <div>
     <div className="navbar">
        <A href="/">Home</A>
        <A href="/form">Form</A>
     </div>

     {useRoutes(routes)}
   </div>
 )
}

ReactDOM.render(<Main />, document.querySelector(".app-wrapper"));


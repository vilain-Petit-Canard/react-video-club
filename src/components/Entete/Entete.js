import { NavLink } from 'react-router-dom';
import './Entete.css';
import { useContext } from "react";
import { AppContext } from "../App/App";
import { useEffect } from 'react';

function Entete(props) {
  const context = useContext(AppContext)

  useEffect(() => {
    const estLogin = sessionStorage.getItem("estLogin");
    if (estLogin) {
      props.setLogging({ estLog: true, usager: estLogin });
    }
  }, []);
  return (
   <header className='header'>
    <NavLink to="/" className="siteName"><h1 >Video-CLub</h1></NavLink>
    <nav className='mainMenu'>
      <NavLink to="/liste-films" className="menuItem"><h1>{'catalogue'.toUpperCase()}</h1></NavLink>
      { context.estLog ? <NavLink className="adminTag" to="/admin">Admin</NavLink> : ""}
        { context.estLog ? <button onClick={props.handleLogout}>Logout</button> :  
        <form onSubmit={(e) => props.handleLogin(e)}>
          <input type="text" name ="usager" placeholder="Username"></input>
          <button>Login</button>
        </form> }
    </nav>
   </header>
  );
}

export default Entete;

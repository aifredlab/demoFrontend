import styled from 'styled-components';
import logo from '../images/logo.png'
import { Link } from 'react-router-dom';



export default function Header() {

  
    return (
        <div><Link to="/"><img src={logo} width="150" height="50"></img></Link></div>
    );
}
  
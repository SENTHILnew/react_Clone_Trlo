import React from "react";

import "./haderComp.scss";
import logo from "../../public/images/cloneHelmet.png";
import {
  Link
} from "react-router-dom";
export default props => {
  let classforSide=['menuBg'];
  let menuBd=null;
  if(props.issdieOpen){
    classforSide.push('show');
    menuBd=(<div className="backdrop"></div>)
  }
  return (
    <React.Fragment>
      <div className="hederCOmp">
        <ul className="list">
          {props.headers.map((obj, index) => (
            <li key={index + obj.title} className="title" onClick={()=>{props.onMnOptClick(obj.title)}}>{
              obj.link?<Link to={obj.link} style={{ textDecoration: 'none',color:'white' }}>{obj.title}</Link> :<label style={{ textDecoration: 'none',color:'white',cursor:'pointer' }}>{obj.title}</label>
            } 
            </li>
          ))}
        </ul>
        <div
          className={props.classList.join(" ")}
          onClick={()=>{props.addActiveClass()}}
        >
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </div>
        <img src={logo} className="logo-class" alt="app-logo"></img>
      </div>
      {menuBd}
      <div className={classforSide.join(' ')}>
          <ul className="listTp">{props.headers.map((obj, index) => (
            <li key={index + obj.title} className="lis" onClick={()=>{props.addActiveClass();props.onMnOptClick(obj.title)}}>{
              obj.link? <Link to={obj.link}  style={{ textDecoration: 'none'}}>{obj.title}</Link> :<label  style={{ textDecoration: 'none',cursor:'pointer'}}>{obj.title}</label>
            }
            </li>
          ))}</ul>
        </div>
    </React.Fragment>
  );
};

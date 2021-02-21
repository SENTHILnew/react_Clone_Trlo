import React from "react";
import "./popup.scss";
import FadeBack from '../fadedBack/fadedBack';

export default (props) =>{ 
    let defaultClass='modelCus';
    let fadeClass=props.fadeClass?props.fadeClass:"";
    if(props.classses) defaultClass=`${defaultClass} ${props.classses}`;
    let out= (<div className={defaultClass} style={props.styleObj}>
    <div className="modelCusHead">{props.title}<i className="fas fa-times clcBtn" onClick={()=>{props.onModelClose()}}></i></div>
    <div className="modelCusBody">{props.children}</div>
    <div className="modelCusFoot"></div>
  </div>)
    if(props.showBackdrop){
      return (<FadeBack fadeClass={fadeClass}>
       {out}
      </FadeBack>
    ) 
    }
    else{
      return ( <React.Fragment>{out}</React.Fragment>)
    }
 ;}

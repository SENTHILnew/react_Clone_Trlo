import React from "react";
import Card from '../boardCard/boardcard';
import "./boards.scss";

export default props => {
   let starred=[];
   let personal=[];
   props.boards.forEach((element,index) => {
      if(element.star){
         starred.push(<Card className="bNewcard" onClick={()=>{props.openEdit(element,index)}} key={element.title+index} ind={index} starBoard={props.changeStar} element={element}/>)
      }
      personal.push(<Card className="bNewcard" onClick={()=>{props.openEdit(element,index)}} key={element.title+index} ind={index} starBoard={props.changeStar} element={element}/>)
   });
   if(starred.length>0){
   starred=<div className="boardcontainer">{starred}</div>;
   starred= <React.Fragment><div className="boardTitle"><i className="far fa-star marg"></i>Starred Boards</div>{starred}</React.Fragment>
   }
   personal=<div className="boardcontainer">{personal} <div className="bNewcard"  onClick={()=>{props.createNewBoard()}}>Create new board</div></div>;
   personal= <React.Fragment><div className="boardTitle"><i className="fas fa-user-secret marg"></i>Personal Boards</div>{personal}</React.Fragment>
    return( <React.Fragment>
       {starred}{personal}
    </React.Fragment>)
}
import React from "react";

import "./boardcard.scss";


function card(props){
        return (
            <div className={props.className} onClick={props.onClick} style={{backgroundImage: `url(${props.element.bgImg})`,backgroundColor:props.element.bgColor}} ><div className="carTil">{props.element.title}</div><i onClick={(e)=>{props.starBoard(props.ind,e)}} className={props.element.star?'far fa-star btmStar yellowStr':'far fa-star btmStar hide'}></i></div>
        )
}


export default card;
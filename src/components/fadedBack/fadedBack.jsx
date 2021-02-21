import React from 'react';

import './fadedBack';


export default (props)=>{
        let classes= props.fadeClass+" fadeBack";
        return(
                <div className={classes}>
                    {props.children}
                </div>
        )
}
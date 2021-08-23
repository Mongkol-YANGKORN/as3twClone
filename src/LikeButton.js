import React, { useState } from 'react'


export default function LikeButton() {

    const [count, setCount] = useState(0);

    function LikeText (){
        setCount(count+1);
    }
    
    return(
        <div>
            
            <button onClick={LikeText}>
            click me
            </button>
            <p>Like {count} </p>
        </div>
    )
}

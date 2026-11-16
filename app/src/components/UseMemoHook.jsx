import React, {useState,useEffect,useRef,useMemo} from 'react'

function UseMemoHook(){

    const [number,setNumber] = useState(0);
    const [dark,setDark] = useState(false)

    const doubleNumber = useMemo(()=>{
        return slowFunction(number)
    },[number])

    const themeStyle= useMemo(()=>{
       
           return{
            backgroundColor:dark?'black':'white',
            color:dark?'white':'black',
           }
            
           
        
    },[dark])

    useEffect(()=>{
        console.log('theme changed')
    },[themeStyle])


    return(
        <>
        <div>
            <p>useMemoHook</p>

            <input type="number" value={number} onChange={e=>setNumber(parseInt(e.target.value))} />
            <button onClick={()=>setDark((prevDark)=>!prevDark)}>Change Theme</button>

            <div style={themeStyle}>{doubleNumber}</div>
        </div>
            
        </>
    )
}

function slowFunction(num){
    for(let i=0; i<1000; i++){}
    return num*2
}

export default UseMemoHook
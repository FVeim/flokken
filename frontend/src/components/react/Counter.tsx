import { useState, useCallback } from 'react';
import './Counter.css';

export default function Counter({ initialCount=0, min=Number.MIN_SAFE_INTEGER, max=Number.MAX_SAFE_INTEGER, step=1, onChange }:{initialCount?:number,min?:number,max?:number,step?:number,onChange?: (n:number)=>void}){
  const [count,setCount]=useState(initialCount);
  const update=(n:number)=>{const c=Math.min(Math.max(n,min),max); setCount(c); onChange?.(c)};
  return (
    <div className="counter">
      <button onClick={()=>update(count-step)} aria-label="Decrease">-</button>
      <span>{count}</span>
      <button onClick={()=>update(count+step)} aria-label="Increase">+</button>
    </div>
  )
}

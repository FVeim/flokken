import { useState } from 'react';
import type { DogProfile } from '@/types/app';
import './DogCard.css';

export default function DogCard({ dog, onSwipe }:{dog:DogProfile,onSwipe:(d:'left'|'right')=>void}){
  const [startX,setStartX]=useState(0);
  const [offset,setOffset]=useState(0);
  const [idx,setIdx]=useState(0);
  const handleTouchStart=(e:React.TouchEvent)=>setStartX(e.touches[0].clientX);
  const handleTouchMove=(e:React.TouchEvent)=>setOffset(e.touches[0].clientX-startX);
  const handleTouchEnd=()=>{ if(Math.abs(offset)>100){ onSwipe(offset>0?'right':'left'); } setOffset(0); };
  return (
    <div className="dog-card" style={{transform:`translateX(${offset}px) rotate(${offset*0.06}deg)`}} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <div className="dog-images">
        {dog.images[idx] ? (
          <img src={dog.images[idx]} alt={dog.name} />
        ) : (
          <span>🐕</span>
        )}
      </div>
      <div className="dog-info-overlay">
        <div className="primary-info">
          <h2>{dog.name}, {dog.age}y</h2>
          <p className="breed">{dog.breed} • 📍 {dog.location}</p>
        </div>
        <div className="dog-details">
          <div className="tags">{dog.sports.map(s=> <span key={s} className="tag sport">{s}</span>)}{dog.training.map(t=> <span key={t} className="tag training">{t}</span>)}</div>
          <p className="bio">{dog.bio}</p>
        </div>
        <div className="owner-info">
          {dog.owner.image ? (
            <img className="owner-image" src={dog.owner.image} alt={dog.owner.name} />
          ) : (
            <div className="owner-image placeholder">👤</div>
          )}
          <span>Handled by {dog.owner.name}</span>
        </div>
      </div>
      <div className="action-buttons">
        <button className="action-btn dismiss" onClick={()=>onSwipe('left')} aria-label="Pass">✕</button>
        <button className="action-btn like" onClick={()=>onSwipe('right')} aria-label="Like">♥</button>
      </div>
    </div>
  )
}

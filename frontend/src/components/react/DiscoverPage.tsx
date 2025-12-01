import { useState } from 'react';
import DogCard from './DogCard';
import './DiscoverPage.css';
import type { DogProfile } from '@/types/app';

const mockDogs: DogProfile[] = [
  { id: '1', name: 'Luna', breed: 'Border Collie', age:2, sports:['Agility','Frisbee'], training:['Clicker'], location:'Stockholm', images:['/dogs/luna1.jpg','/dogs/luna2.jpg'], bio:'Energetic agility dog.', owner:{id:'o1',name:'Emma',image:'/profiles/emma.jpg'} }
];

export default function DiscoverPage(){
  const [index,setIndex]=useState(0);
  const handleSwipe=(d:'left'|'right')=>{ console.log('swipe',d); setIndex(i=>i+1); }
  return (
    <div className="discover-page">
      <header className="discover-header"><h1>Discover</h1></header>
      <div className="cards-container">
        { index < mockDogs.length ? <DogCard dog={mockDogs[index]} onSwipe={handleSwipe} /> : <div className="no-more-dogs"><h2>No More Dogs</h2><p>Come back later</p></div> }
      </div>
    </div>
  )
}

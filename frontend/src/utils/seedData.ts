import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const testDogs = [
  {
    name: 'Luna',
    breed: 'Border Collie',
    age: 2,
    sports: ['Agility', 'Frisbee'],
    training: ['Clicker', 'Positive Reinforcement'],
    location: 'Stockholm',
    images: ['https://placedog.net/500/500?id=1'],
    bio: 'High-energy agility champion. Loves to jump and run!',
    owner: { id: 'test_user_1', name: 'Emma', image: '' }
  },
  {
    name: 'Max',
    breed: 'German Shepherd',
    age: 4,
    sports: ['Obedience', 'Rally'],
    training: ['Schutzhund', 'Traditional'],
    location: 'Gothenburg',
    images: ['https://placedog.net/500/500?id=2'],
    bio: 'Disciplined working dog with excellent focus.',
    owner: { id: 'test_user_2', name: 'Johan', image: '' }
  },
  {
    name: 'Bella',
    breed: 'Golden Retriever',
    age: 3,
    sports: ['Dock Diving', 'Retriever Training'],
    training: ['Positive Reinforcement'],
    location: 'Malmö',
    images: ['https://placedog.net/500/500?id=3'],
    bio: 'Water-loving retriever. Champion dock diver!',
    owner: { id: 'test_user_3', name: 'Sofia', image: '' }
  },
  {
    name: 'Rocky',
    breed: 'Australian Shepherd',
    age: 5,
    sports: ['Herding', 'Agility'],
    training: ['Clicker', 'Voice Commands'],
    location: 'Uppsala',
    images: ['https://placedog.net/500/500?id=4'],
    bio: 'Smart herding dog with incredible stamina.',
    owner: { id: 'test_user_4', name: 'Anders', image: '' }
  },
  {
    name: 'Daisy',
    breed: 'Jack Russell Terrier',
    age: 1,
    sports: ['Flyball', 'Nosework'],
    training: ['Positive Reinforcement', 'Play-based'],
    location: 'Stockholm',
    images: ['https://placedog.net/500/500?id=5'],
    bio: 'Tiny but mighty! Speed demon in flyball.',
    owner: { id: 'test_user_5', name: 'Lisa', image: '' }
  },
  {
    name: 'Zeus',
    breed: 'Belgian Malinois',
    age: 3,
    sports: ['Protection', 'Obedience', 'Tracking'],
    training: ['Schutzhund', 'IPO'],
    location: 'Stockholm',
    images: ['https://placedog.net/500/500?id=6'],
    bio: 'Elite protection dog. Serious but loving.',
    owner: { id: 'test_user_6', name: 'Marcus', image: '' }
  }
];

export async function seedTestData() {
  const dogsRef = collection(db, 'dogs');
  
  console.log('Adding test dogs to Firestore...');
  
  for (const dog of testDogs) {
    try {
      const docRef = await addDoc(dogsRef, dog);
      console.log(`✓ Added ${dog.name} (${docRef.id})`);
    } catch (error) {
      console.error(`✗ Failed to add ${dog.name}:`, error);
    }
  }
  
  console.log('Done seeding test data!');
}

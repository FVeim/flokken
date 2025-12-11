import { seedTestData } from './utils/seedData';

// Add to window for easy console access
if (typeof window !== 'undefined') {
  (window as any).seedTestData = seedTestData;
}

export { seedTestData };

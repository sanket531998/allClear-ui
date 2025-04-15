
export type Subcategory = {
  name: string;
  path: string;
};

export type Category = {
  name: string;
  path: string;
  subcategories: Subcategory[];
};

// Category data with subcategories
export const categories: Category[] = [
  {
    name: 'Sports',
    path: '/category/sports',
    subcategories: [
      { name: 'Football', path: '/category/sports/football' },
      { name: 'Basketball', path: '/category/sports/basketball' },
      { name: 'Tennis', path: '/category/sports/tennis' },
      { name: 'Cricket', path: '/category/sports/cricket' },
    ],
  },
  {
    name: 'Politics',
    path: '/category/politics',
    subcategories: [
      { name: 'National', path: '/category/politics/national' },
      { name: 'International', path: '/category/politics/international' },
      { name: 'Elections', path: '/category/politics/elections' },
      { name: 'Policy', path: '/category/politics/policy' },
    ],
  },
  {
    name: 'Middle Class',
    path: '/category/middle-class',
    subcategories: [
      { name: 'Economy', path: '/category/middle-class/economy' },
      { name: 'Education', path: '/category/middle-class/education' },
      { name: 'Housing', path: '/category/middle-class/housing' },
      { name: 'Personal Finance', path: '/category/middle-class/finance' },
    ],
  },
  {
    name: 'Technology',
    path: '/category/technology',
    subcategories: [
      { name: 'Gadgets', path: '/category/technology/gadgets' },
      { name: 'Software', path: '/category/technology/software' },
      { name: 'AI', path: '/category/technology/ai' },
      { name: 'Startups', path: '/category/technology/startups' },
    ],
  },
];

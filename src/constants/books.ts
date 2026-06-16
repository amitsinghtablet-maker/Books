export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  category: string;
  price: number;
  condition: 'New' | 'Like New' | 'Good' | 'Acceptable';
  sellerName: string;
  inStock: boolean;
  rating: number;
  description: string;
  color: string; // Theme color representation for details page background gradient
}

export const CATEGORIES = ['All', 'Fiction', 'Self-Help', 'Sci-Fi', 'Biography', 'Business', 'Rare'];

export const MOCK_BOOKS: Book[] = [
  {
    id: '1',
    title: 'The Midnight Library (First Edition)',
    author: 'Matt Haig',
    coverUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    category: 'Fiction',
    price: 45.00,
    condition: 'Like New',
    sellerName: 'Vintage Books NYC',
    inStock: true,
    rating: 4.8,
    description: 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices... Would you have done anything different, if you had the chance to undo your regrets?',
    color: '#3B3B7A',
  },
  {
    id: '2',
    title: 'Atomic Habits (Used - Highlighted)',
    author: 'James Clear',
    coverUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    category: 'Self-Help',
    price: 12.50,
    condition: 'Acceptable',
    sellerName: 'Student Reads',
    inStock: true,
    rating: 4.9,
    description: 'No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
    color: '#8A583C',
  },
  {
    id: '3',
    title: 'Dune (1965 Vintage Paperback)',
    author: 'Frank Herbert',
    coverUrl: 'https://images.unsplash.com/photo-1531988042231-d39a9cc12a9a?auto=format&fit=crop&q=80&w=400',
    category: 'Sci-Fi',
    price: 85.00,
    condition: 'Good',
    sellerName: 'SciFi Collectibles',
    inStock: true,
    rating: 4.7,
    description: 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness. Coveted across the known universe, melange is a prize worth killing for...',
    color: '#A06E28',
  },
  {
    id: '4',
    title: 'The Alchemist (Signed Copy)',
    author: 'Paulo Coelho',
    coverUrl: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    category: 'Fiction',
    price: 120.00,
    condition: 'New',
    sellerName: 'Rare Finds Books',
    inStock: false,
    rating: 4.6,
    description: 'Paulo Coelho\'s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different--and far more satisfying--than he ever imagined. Santiago\'s journey teaches us about the essential wisdom of listening to our hearts, of recognizing opportunity and learning to read the omens strewn along life\'s path, and, most importantly, to follow our dreams.',
    color: '#2E7A6B',
  },
  {
    id: '5',
    title: 'Educated (Hardcover)',
    author: 'Tara Westover',
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400',
    category: 'Biography',
    price: 18.00,
    condition: 'Good',
    sellerName: 'Readers Corner',
    inStock: true,
    rating: 4.5,
    description: 'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University. Educated is an account of the struggle for self-invention. It is a story of fierce family loyalty, and of the grief that comes from severing one\'s closest ties.',
    color: '#286E8A',
  },
  {
    id: '6',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    coverUrl: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&q=80&w=400',
    category: 'Business',
    price: 14.99,
    condition: 'Like New',
    sellerName: 'Thrift Books',
    inStock: true,
    rating: 4.4,
    description: 'In the international bestseller, Thinking, Fast and Slow, Daniel Kahneman, the renowned psychologist and winner of the Nobel Prize in Economics, takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical.',
    color: '#555555',
  },
];

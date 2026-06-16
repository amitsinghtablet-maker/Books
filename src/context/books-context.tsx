import React, { createContext, useContext, useState } from 'react';
import { Book, MOCK_BOOKS } from '@/constants/books';

export interface CartItem {
  book: Book;
  quantity: number;
}

interface BooksContextType {
  books: Book[];
  cart: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const BooksContext = createContext<BooksContextType | undefined>(undefined);

export function BooksProvider({ children }: { children: React.ReactNode }) {
  // Books catalog
  const [books] = useState<Book[]>(MOCK_BOOKS);
  
  // Shopping cart
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (book: Book) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.book.id === book.id);
      if (existing) {
        return prevCart.map(item =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId: string) => {
    setCart(prevCart => prevCart.filter(item => item.book.id !== bookId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.book.price * item.quantity, 0);

  return (
    <BooksContext.Provider value={{ books, cart, addToCart, removeFromCart, clearCart, cartTotal }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BooksContext);
  if (context === undefined) {
    throw new Error('useBooks must be used within a BooksProvider');
  }
  return context;
}

import React from 'react';
import { Image } from 'expo-image';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { Book } from '@/constants/books';

interface BookCardProps {
  book: Book;
  onPress: () => void;
}

export function BookCard({ book, onPress }: BookCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <ThemedView type="backgroundElement" style={styles.container}>
        <ThemedView style={styles.imageContainer}>
          <Image source={{ uri: book.coverUrl }} style={styles.cover} contentFit="cover" transition={300} />
          <ThemedView style={styles.conditionBadge}>
            <ThemedText style={styles.conditionText}>{book.condition}</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.infoContainer} type="backgroundElement">
          <ThemedText style={styles.title} numberOfLines={2}>
            {book.title}
          </ThemedText>
          <ThemedText style={styles.author} themeColor="textSecondary" numberOfLines={1}>
            {book.author}
          </ThemedText>
          
          <ThemedView style={styles.footerRow} type="backgroundElement">
            <ThemedText style={styles.price} type="default">
              ₹{book.price.toFixed(2)}
            </ThemedText>
            <ThemedText style={styles.category} type="small" themeColor="textSecondary">
              {book.category}
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.stockRow} type="backgroundElement">
            {book.inStock ? (
              <ThemedText style={styles.inStockText} type="small">In Stock</ThemedText>
            ) : (
              <ThemedText style={styles.outOfStockText} type="small">Out of Stock</ThemedText>
            )}
            <ThemedText style={styles.sellerText} type="small" themeColor="textSecondary">
              Sold by: {book.sellerName}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.three,
    borderRadius: Spacing.three,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  container: {
    flexDirection: 'row',
    padding: Spacing.two,
    borderRadius: Spacing.three,
  },
  imageContainer: {
    position: 'relative',
    width: 85,
    height: 125,
  },
  cover: {
    width: '100%',
    height: '100%',
    borderRadius: Spacing.two,
    backgroundColor: '#ccc',
  },
  conditionBadge: {
    position: 'absolute',
    bottom: Spacing.one,
    right: Spacing.one,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  conditionText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    marginLeft: Spacing.three,
    justifyContent: 'center',
    gap: Spacing.one,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  author: {
    fontSize: 14,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.one,
  },
  price: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  category: {
    fontSize: 12,
  },
  stockRow: {
    marginTop: Spacing.one,
    flexDirection: 'column',
    gap: 2,
  },
  inStockText: {
    color: '#10b981',
    fontWeight: 'bold',
  },
  outOfStockText: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
  sellerText: {
    fontSize: 11,
  },
});

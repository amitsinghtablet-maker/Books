import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { Book } from '@/constants/books';

interface FeaturedBookCardProps {
  book: Book;
  onPress: () => void;
}

export function FeaturedBookCard({ book, onPress }: FeaturedBookCardProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <ThemedView style={styles.container} type="backgroundElement">
        <ThemedView style={[styles.imageContainer, { backgroundColor: book.color }]}>
          <Image
            source={{ uri: book.coverUrl }}
            style={styles.coverImage}
            contentFit="cover"
            transition={300}
          />
          <ThemedView style={styles.conditionBadge}>
            <ThemedText style={styles.conditionText}>{book.condition}</ThemedText>
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.infoContainer} type="backgroundElement">
          <ThemedText type="smallBold" themeColor="textSecondary" style={styles.category}>
            {book.category.toUpperCase()}
          </ThemedText>
          <ThemedText type="default" style={styles.title} numberOfLines={2}>
            {book.title}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.author}>
            {book.author}
          </ThemedText>
          <ThemedView style={styles.priceRow}>
            <ThemedText type="default" style={styles.price}>
              ₹{book.price.toFixed(2)}
            </ThemedText>
            {book.inStock ? (
              <ThemedText type="small" style={styles.inStock}>In Stock</ThemedText>
            ) : (
              <ThemedText type="small" style={styles.outOfStock}>Out of Stock</ThemedText>
            )}
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Spacing.four,
    borderRadius: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  container: {
    flexDirection: 'row',
    borderRadius: Spacing.four,
    overflow: 'hidden',
    padding: Spacing.three,
    gap: Spacing.four,
  },
  imageContainer: {
    width: 100,
    height: 150,
    borderRadius: Spacing.two,
    overflow: 'hidden',
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  conditionBadge: {
    position: 'absolute',
    top: Spacing.one,
    left: Spacing.one,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: 4,
  },
  conditionText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.one,
  },
  category: {
    fontSize: 10,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    lineHeight: 22,
  },
  author: {
    fontSize: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.two,
  },
  price: {
    fontSize: 18,
    color: '#3b82f6',
  },
  inStock: {
    color: '#10b981',
    fontWeight: 'bold',
  },
  outOfStock: {
    color: '#ef4444',
    fontWeight: 'bold',
  },
});

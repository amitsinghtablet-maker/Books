import React from 'react';
import { Image } from 'expo-image';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { Book } from '@/constants/books';
import { useTheme } from '@/hooks/use-theme';
import { useBooks } from '@/context/books-context';

interface BookDetailsModalProps {
  book: Book | null;
  visible: boolean;
  onClose: () => void;
}

export function BookDetailsModal({ book, visible, onClose }: BookDetailsModalProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const { addToCart, cart } = useBooks();

  if (!book) return null;

  const handleAddToCart = () => {
    addToCart(book);
    onClose();
  };

  const isInCart = cart.some(item => item.book.id === book.id);

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <ThemedView style={styles.container}>
          {/* Header Bar */}
          <ThemedView style={[styles.headerGradient, { backgroundColor: book.color }]} type="backgroundElement">
            <ThemedView style={styles.glassOverlay} />
            <ThemedView style={[styles.headerRow, { paddingTop: Math.max(12, insets.top) }]}>
              <Pressable onPress={onClose} style={styles.iconButton}>
                <ThemedText style={styles.backIcon} lightColor="#ffffff" darkColor="#ffffff">✕ Close</ThemedText>
              </Pressable>
              <ThemedText type="smallBold" lightColor="#ffffff" darkColor="#ffffff">
                Book Details
              </ThemedText>
              <ThemedView style={styles.placeholder} />
            </ThemedView>

            <ThemedView style={styles.bookHeaderContainer}>
              <Image source={{ uri: book.coverUrl }} style={styles.coverImage} contentFit="cover" transition={300} />
              <ThemedView style={styles.headerDetails}>
                <ThemedText style={styles.title} lightColor="#ffffff" darkColor="#ffffff">
                  {book.title}
                </ThemedText>
                <ThemedText style={styles.author} lightColor="rgba(255,255,255,0.8)" darkColor="rgba(255,255,255,0.8)">
                  {book.author}
                </ThemedText>
                <ThemedView style={styles.badgeRow}>
                  <ThemedView style={styles.ratingBadge} lightColor="rgba(255,255,255,0.2)" darkColor="rgba(255,255,255,0.15)">
                    <ThemedText type="code" style={styles.ratingText} lightColor="#ffffff" darkColor="#ffffff">
                      ★ {book.rating.toFixed(1)}
                    </ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.ratingBadge} lightColor="rgba(255,255,255,0.2)" darkColor="rgba(255,255,255,0.15)">
                    <ThemedText type="code" style={styles.categoryText} lightColor="#ffffff" darkColor="#ffffff">
                      {book.category}
                    </ThemedText>
                  </ThemedView>
                </ThemedView>
              </ThemedView>
            </ThemedView>
          </ThemedView>

          {/* Scrollable Body */}
          <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false}>
            
            <ThemedView style={styles.purchaseSection} type="backgroundElement">
              <ThemedView style={styles.priceRow}>
                <ThemedText style={styles.priceText}>₹{book.price.toFixed(2)}</ThemedText>
                <ThemedView style={styles.conditionBadge}>
                  <ThemedText style={styles.conditionText}>{book.condition}</ThemedText>
                </ThemedView>
              </ThemedView>
              <ThemedText style={styles.sellerText} themeColor="textSecondary">
                Sold by: {book.sellerName}
              </ThemedText>
              
              <Pressable
                style={[styles.addToCartButton, (!book.inStock || isInCart) && styles.disabledButton]}
                onPress={handleAddToCart}
                disabled={!book.inStock || isInCart}
              >
                <ThemedText style={styles.addToCartText} lightColor="#ffffff" darkColor="#ffffff">
                  {!book.inStock ? 'Out of Stock' : isInCart ? 'Added to Cart' : 'Add to Cart'}
                </ThemedText>
              </Pressable>
            </ThemedView>

            {/* About / Description */}
            <ThemedView style={styles.section} type="backgroundElement">
              <ThemedText type="smallBold" style={styles.sectionTitle}>
                Synopsis
              </ThemedText>
              <ThemedText style={styles.descriptionText} themeColor="textSecondary">
                {book.description}
              </ThemedText>
            </ThemedView>
          </ScrollView>
        </ThemedView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  headerGradient: {
    paddingBottom: Spacing.four,
    borderBottomLeftRadius: Spacing.four,
    borderBottomRightRadius: Spacing.four,
    position: 'relative',
    overflow: 'hidden',
  },
  glassOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.three,
    paddingVertical: 12,
  },
  iconButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  backIcon: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 60,
  },
  bookHeaderContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    alignItems: 'center',
    gap: Spacing.four,
  },
  coverImage: {
    width: 100,
    height: 150,
    borderRadius: Spacing.two,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  headerDetails: {
    flex: 1,
    gap: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 28,
  },
  author: {
    fontSize: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.two,
    marginTop: Spacing.one,
  },
  ratingBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollBody: {
    padding: Spacing.four,
    gap: Spacing.four,
  },
  purchaseSection: {
    borderRadius: Spacing.three,
    padding: Spacing.four,
    gap: Spacing.two,
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
  },
  priceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  conditionBadge: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: Spacing.one,
  },
  conditionText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  sellerText: {
    fontSize: 14,
    marginBottom: Spacing.two,
  },
  addToCartButton: {
    backgroundColor: '#3b82f6',
    width: '100%',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#94a3b8',
  },
  addToCartText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: Spacing.one,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
  },
});


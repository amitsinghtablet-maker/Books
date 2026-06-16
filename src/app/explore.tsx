import React, { useState, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Book } from '@/constants/books';
import { useBooks } from '@/context/books-context';
import { BookDetailsModal } from '@/components/ui/book-details-modal';

export default function ExploreScreen() {
  const theme = useTheme();
  
  // Connect to shared books context
  const { books, addToCart, cart } = useBooks();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selected book and modal state
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Filtering based on search query
  const filteredCatalog = useMemo(() => {
    if (!searchQuery) return books;
    return books.filter(book =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.condition.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  const handleBookPress = (book: Book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  // Editor's Choices (Top 3 books)
  const editorsChoices = useMemo(() => {
    return books.slice(0, 3);
  }, [books]);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        {/* Header Section */}
        <ThemedView style={styles.header}>
          <ThemedView type="backgroundElement" style={styles.logoBadge}>
            <ThemedText style={styles.logoEmoji}>🧭</ThemedText>
          </ThemedView>
          <ThemedView style={styles.headerTitleColumn}>
            <ThemedText type="small" themeColor="textSecondary">
              SEARCH & DISCOVER
            </ThemedText>
            <ThemedText style={styles.headerTitle} type="title">
              Catalog
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>

          {/* Search Input Bar */}
          <ThemedView style={styles.searchSection} type="backgroundElement">
            <ThemedText style={styles.searchIcon}>🔍</ThemedText>
            <TextInput
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Search by title, author, condition..."
              placeholderTextColor={theme.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')} style={styles.clearButton}>
                <ThemedText style={styles.clearButtonText}>✕</ThemedText>
              </Pressable>
            )}
          </ThemedView>

          {!searchQuery ? (
            <>
              {/* Horizontal Editor's Spotlight Carousel */}
              <ThemedView style={styles.carouselHeader}>
                <ThemedText type="smallBold">Curated Collections</ThemedText>
                <ThemedText type="code" themeColor="textSecondary">
                  MUST READS 🔥
                </ThemedText>
              </ThemedView>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.carouselContainer}
                style={styles.carouselScrollView}>
                {editorsChoices.map(book => (
                  <Pressable
                    key={book.id}
                    onPress={() => handleBookPress(book)}
                    style={({ pressed }) => [
                      styles.carouselCard,
                      pressed && styles.pressed,
                      { backgroundColor: book.color },
                    ]}>
                    <ThemedView style={styles.glassOverlay} />
                    <Image source={{ uri: book.coverUrl }} style={styles.carouselCover} contentFit="cover" transition={300} />
                    <ThemedView style={styles.carouselInfo} type="backgroundElement">
                      <ThemedText style={styles.carouselCategory} type="code">
                        {book.category.toUpperCase()}
                      </ThemedText>
                      <ThemedText style={styles.carouselTitle} numberOfLines={1}>
                        {book.title}
                      </ThemedText>
                      <ThemedText style={styles.carouselAuthor} numberOfLines={1}>
                        {book.author}
                      </ThemedText>
                    </ThemedView>
                  </Pressable>
                ))}
              </ScrollView>

              {/* Browse Catalog Header */}
              <ThemedView style={styles.shelfHeader}>
                <ThemedText type="smallBold">All Books</ThemedText>
                <ThemedText type="code" themeColor="textSecondary">
                  {filteredCatalog.length} TOTAL
                </ThemedText>
              </ThemedView>
            </>
          ) : (
            <ThemedView style={styles.shelfHeader}>
              <ThemedText type="smallBold">Search Results</ThemedText>
              <ThemedText type="code" themeColor="textSecondary">
                {filteredCatalog.length} {filteredCatalog.length === 1 ? 'MATCH' : 'MATCHES'}
              </ThemedText>
            </ThemedView>
          )}

          {/* Catalog Listing */}
          {filteredCatalog.length > 0 ? (
            filteredCatalog.map(book => {
              const isInCart = cart.some(item => item.book.id === book.id);

              return (
                <Pressable
                  key={book.id}
                  onPress={() => handleBookPress(book)}
                  style={({ pressed }) => [styles.catalogItem, pressed && styles.pressed]}>
                  <ThemedView type="backgroundElement" style={styles.catalogContainer}>
                    <Image source={{ uri: book.coverUrl }} style={styles.catalogCover} contentFit="cover" transition={300} />
                    <ThemedView style={styles.catalogInfo} type="backgroundElement">
                      <ThemedView style={styles.catalogHeaderRow} type="backgroundElement">
                        <ThemedText style={styles.catalogTitle} numberOfLines={2}>
                          {book.title}
                        </ThemedText>
                        {isInCart && (
                          <ThemedView style={styles.addedBadge} lightColor="#E2F0D9" darkColor="#1B4D3E">
                            <ThemedText type="code" style={styles.addedBadgeText} lightColor="#385723" darkColor="#8FDC9A">
                              IN CART
                            </ThemedText>
                          </ThemedView>
                        )}
                      </ThemedView>
                      
                      <ThemedText style={styles.catalogAuthor} themeColor="textSecondary" numberOfLines={1}>
                        {book.author}
                      </ThemedText>
                      
                      <ThemedView style={styles.catalogFooterRow} type="backgroundElement">
                        <ThemedText style={styles.catalogPrice} type="small">
                          ₹{book.price.toFixed(2)}
                        </ThemedText>
                        <ThemedText style={styles.catalogCondition} type="small" themeColor="textSecondary">
                          {book.condition}
                        </ThemedText>
                      </ThemedView>
                      
                      {!isInCart && book.inStock && (
                        <Pressable onPress={() => addToCart(book)} style={({pressed}) => [styles.addButtonBadge, pressed && {opacity: 0.7}]}>
                          <ThemedText type="code" style={styles.addButtonText}>
                            + Add to cart
                          </ThemedText>
                        </Pressable>
                      )}
                      {!book.inStock && (
                        <ThemedView style={[styles.addButtonBadge, {backgroundColor: 'rgba(0,0,0,0.05)'}]} type="backgroundSelected">
                          <ThemedText type="code" style={[styles.addButtonText, {color: '#888'}]}>
                            Out of stock
                          </ThemedText>
                        </ThemedView>
                      )}
                    </ThemedView>
                  </ThemedView>
                </Pressable>
              );
            })
          ) : (
            <ThemedView style={styles.emptyResults} type="backgroundElement">
              <ThemedText style={styles.emptyResultsEmoji}>🔍</ThemedText>
              <ThemedText style={styles.emptyResultsText} type="smallBold" themeColor="textSecondary">
                No catalog matches found
              </ThemedText>
              <ThemedText style={styles.emptyResultsSubtext} type="small" themeColor="textSecondary">
                Double-check spelling or try different search terms!
              </ThemedText>
            </ThemedView>
          )}

        </ScrollView>
      </SafeAreaView>

      {/* Book Details Modal */}
      <BookDetailsModal
        book={selectedBook}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.three,
    gap: Spacing.three,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: {
    fontSize: 22,
  },
  headerTitleColumn: {
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  scrollContent: {
    paddingBottom: BottomTabInset + Spacing.six,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Spacing.three,
    paddingHorizontal: Spacing.three,
    height: 48,
    marginBottom: Spacing.four,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: Spacing.two,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: '100%',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  clearButtonText: {
    color: '#888',
    fontSize: 12,
  },
  carouselHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
    paddingHorizontal: Spacing.one,
  },
  carouselScrollView: {
    marginBottom: Spacing.five,
  },
  carouselContainer: {
    gap: Spacing.three,
    paddingRight: Spacing.four,
  },
  carouselCard: {
    width: 220,
    height: 160,
    borderRadius: Spacing.three,
    padding: Spacing.three,
    justifyContent: 'space-between',
    overflow: 'hidden',
    position: 'relative',
  },
  glassOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  carouselCover: {
    width: 60,
    height: 90,
    borderRadius: Spacing.one,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    alignSelf: 'flex-start',
  },
  carouselInfo: {
    backgroundColor: 'transparent',
    gap: 2,
  },
  carouselCategory: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 0.5,
  },
  carouselTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  carouselAuthor: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
  },
  shelfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
    paddingHorizontal: Spacing.one,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
    opacity: 0.95,
  },
  catalogItem: {
    marginBottom: Spacing.three,
    borderRadius: Spacing.three,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  catalogContainer: {
    flexDirection: 'row',
    padding: Spacing.two,
    borderRadius: Spacing.three,
  },
  catalogCover: {
    width: 85,
    height: 125,
    borderRadius: Spacing.two,
    backgroundColor: '#ccc',
  },
  catalogInfo: {
    flex: 1,
    marginLeft: Spacing.three,
    justifyContent: 'center',
    gap: Spacing.one,
  },
  catalogHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.one,
  },
  catalogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    flex: 1,
  },
  addedBadge: {
    paddingHorizontal: Spacing.two,
    paddingVertical: 2,
    borderRadius: 4,
  },
  addedBadgeText: {
    fontSize: 8,
    fontWeight: 'bold',
  },
  catalogAuthor: {
    fontSize: 14,
  },
  catalogFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.one,
  },
  catalogPrice: {
    color: '#3b82f6',
    fontWeight: 'bold',
    fontSize: 14,
  },
  catalogCondition: {
    fontSize: 12,
  },
  addButtonBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.two,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: Spacing.two,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  addButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  emptyResults: {
    borderRadius: Spacing.three,
    padding: Spacing.five,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  emptyResultsEmoji: {
    fontSize: 28,
  },
  emptyResultsText: {
    fontSize: 14,
  },
  emptyResultsSubtext: {
    fontSize: 11,
    textAlign: 'center',
  },
});

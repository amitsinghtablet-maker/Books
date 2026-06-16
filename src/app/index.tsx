import React, { useState, useMemo } from 'react';
import {
  ScrollView,
  StyleSheet,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { Book, CATEGORIES } from '@/constants/books';
import { BookCard } from '@/components/ui/book-card';
import { FeaturedBookCard } from '@/components/ui/featured-book-card';
import { BookDetailsModal } from '@/components/ui/book-details-modal';
import { useBooks } from '@/context/books-context';

export default function HomeScreen() {
  const theme = useTheme();

  // Shared context books state
  const { books } = useBooks();
  
  // Filter & Search states
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Selected book state for the detailed modal
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Statistics calculation / Spotlight
  const featuredBook = useMemo(() => {
    // Spotlight a special book, e.g. signed copy
    return books.find(b => b.title.includes('Signed Copy')) || books[0];
  }, [books]);

  // Filtering books for the shelf
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // Exclude featured book from list if we want, but let's keep it simple
      const matchesCategory =
        selectedCategory === 'All' || book.category === selectedCategory;
      return matchesCategory;
    });
  }, [books, selectedCategory]);

  const handleBookPress = (book: Book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        
        {/* Header Title Section */}
        <ThemedView style={styles.header}>
          <ThemedView type="backgroundElement" style={styles.logoBadge}>
            <ThemedText style={styles.logoEmoji}>📚</ThemedText>
          </ThemedView>
          <ThemedView style={styles.headerTitleColumn}>
            <ThemedText type="small" themeColor="textSecondary">
              VINTAGE & RARE FINDS
            </ThemedText>
            <ThemedText style={styles.headerTitle} type="title">
              Old Books Store
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>

          {/* Dynamic Spotlight: Featured Book */}
          <ThemedView style={styles.shelfHeader} type="background">
            <ThemedText type="smallBold">Spotlight Deal</ThemedText>
            <ThemedText type="code" themeColor="textSecondary">
              DON'T MISS OUT
            </ThemedText>
          </ThemedView>
          
          {featuredBook && (
            <FeaturedBookCard
              book={featuredBook}
              onPress={() => handleBookPress(featuredBook)}
            />
          )}

          {/* Categories Horizontal Chip Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContent}>
            {CATEGORIES.map(category => {
              const isSelected = selectedCategory === category;
              return (
                <Pressable
                  key={category}
                  onPress={() => setSelectedCategory(category)}
                  style={[
                    styles.categoryChip,
                    isSelected ? styles.categoryChipSelected : { backgroundColor: theme.backgroundElement },
                  ]}>
                  <ThemedText
                    type="code"
                    style={[
                      styles.categoryChipText,
                      isSelected ? styles.categoryChipTextSelected : { color: theme.textSecondary },
                    ]}>
                    {category}
                  </ThemedText>
                </Pressable>
              );
            })}
          </ScrollView>

          {/* Books Shelf List */}
          <ThemedView style={styles.shelfHeader} type="background">
            <ThemedText type="smallBold">Recently Added</ThemedText>
            <ThemedText type="code" themeColor="textSecondary">
              {filteredBooks.length} available
            </ThemedText>
          </ThemedView>

          {filteredBooks.length > 0 ? (
            filteredBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                onPress={() => handleBookPress(book)}
              />
            ))
          ) : (
            <ThemedView style={styles.emptyShelf} type="backgroundElement">
              <ThemedText style={styles.emptyShelfEmoji}>📚</ThemedText>
              <ThemedText style={styles.emptyShelfText} type="smallBold" themeColor="textSecondary">
                No matching books found
              </ThemedText>
              <ThemedText style={styles.emptyShelfSubtext} type="small" themeColor="textSecondary">
                Try a different category!
              </ThemedText>
            </ThemedView>
          )}

        </ScrollView>
      </SafeAreaView>

      {/* Book Details Interactive Modal */}
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
  categoryScroll: {
    marginBottom: Spacing.four,
  },
  categoryContent: {
    gap: Spacing.two,
  },
  categoryChip: {
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.two / 1.5,
    borderRadius: Spacing.four,
  },
  categoryChipSelected: {
    backgroundColor: '#3b82f6',
  },
  categoryChipText: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  categoryChipTextSelected: {
    color: '#ffffff',
  },
  shelfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
    paddingHorizontal: Spacing.one,
  },
  emptyShelf: {
    borderRadius: Spacing.three,
    padding: Spacing.five,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
  },
  emptyShelfEmoji: {
    fontSize: 28,
  },
  emptyShelfText: {
    fontSize: 14,
  },
  emptyShelfSubtext: {
    fontSize: 11,
    textAlign: 'center',
  },
});

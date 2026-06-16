import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useBooks } from '@/context/books-context';

export default function CartScreen() {
  const { cart, removeFromCart, cartTotal, clearCart } = useBooks();

  const handleCheckout = () => {
    Alert.alert(
      "Checkout",
      `Are you sure you want to purchase these items for ₹${cartTotal.toFixed(2)}?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          onPress: () => {
            clearCart();
            Alert.alert("Success", "Thank you for your purchase!");
          }
        }
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
        {/* Header Section */}
        <ThemedView style={styles.header}>
          <ThemedView type="backgroundElement" style={styles.logoBadge}>
            <ThemedText style={styles.logoEmoji}>🛒</ThemedText>
          </ThemedView>
          <ThemedView style={styles.headerTitleColumn}>
            <ThemedText type="small" themeColor="textSecondary">
              YOUR ITEMS
            </ThemedText>
            <ThemedText style={styles.headerTitle} type="title">
              Shopping Cart
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>

          {cart.length > 0 ? (
            <>
              <ThemedView style={styles.shelfHeader}>
                <ThemedText type="smallBold">Cart Contents</ThemedText>
                <ThemedText type="code" themeColor="textSecondary">
                  {cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'}
                </ThemedText>
              </ThemedView>

              {cart.map((item) => (
                <ThemedView key={item.book.id} type="backgroundElement" style={styles.cartItem}>
                  <Image source={{ uri: item.book.coverUrl }} style={styles.cartCover} contentFit="cover" />
                  <ThemedView style={styles.cartInfo} type="backgroundElement">
                    <ThemedView style={styles.cartHeaderRow} type="backgroundElement">
                      <ThemedText style={styles.cartTitle} numberOfLines={2}>
                        {item.book.title}
                      </ThemedText>
                      <Pressable onPress={() => removeFromCart(item.book.id)} style={({pressed}) => [styles.removeButton, pressed && {opacity: 0.7}]}>
                        <ThemedText style={styles.removeText}>✕</ThemedText>
                      </Pressable>
                    </ThemedView>
                    
                    <ThemedText style={styles.cartAuthor} themeColor="textSecondary" numberOfLines={1}>
                      {item.book.author}
                    </ThemedText>
                    
                    <ThemedView style={styles.cartFooterRow} type="backgroundElement">
                      <ThemedText style={styles.cartPrice} type="default">
                        ₹{item.book.price.toFixed(2)}
                      </ThemedText>
                      <ThemedText style={styles.cartCondition} type="small" themeColor="textSecondary">
                        Condition: {item.book.condition}
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>
                </ThemedView>
              ))}

              {/* Checkout Section */}
              <ThemedView style={styles.checkoutSection} type="backgroundElement">
                <ThemedView style={styles.totalRow} type="backgroundElement">
                  <ThemedText type="default">Total:</ThemedText>
                  <ThemedText style={styles.totalPrice} type="title">
                    ₹{cartTotal.toFixed(2)}
                  </ThemedText>
                </ThemedView>
                
                <Pressable onPress={handleCheckout} style={({pressed}) => [styles.checkoutButton, pressed && {opacity: 0.9}]}>
                  <ThemedText style={styles.checkoutButtonText} lightColor="#ffffff" darkColor="#ffffff">
                    Proceed to Checkout
                  </ThemedText>
                </Pressable>
              </ThemedView>
            </>
          ) : (
            <ThemedView style={styles.emptyCart} type="backgroundElement">
              <ThemedText style={styles.emptyCartEmoji}>🛒</ThemedText>
              <ThemedText style={styles.emptyCartText} type="smallBold" themeColor="textSecondary">
                Your cart is empty
              </ThemedText>
              <ThemedText style={styles.emptyCartSubtext} type="small" themeColor="textSecondary">
                Looks like you haven't added any books to your cart yet.
                Go to the Store or Search to find some rare reads!
              </ThemedText>
            </ThemedView>
          )}

        </ScrollView>
      </SafeAreaView>
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
  shelfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.three,
    paddingHorizontal: Spacing.one,
  },
  cartItem: {
    flexDirection: 'row',
    padding: Spacing.two,
    borderRadius: Spacing.three,
    marginBottom: Spacing.three,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cartCover: {
    width: 70,
    height: 105,
    borderRadius: Spacing.two,
    backgroundColor: '#ccc',
  },
  cartInfo: {
    flex: 1,
    marginLeft: Spacing.three,
    justifyContent: 'center',
    gap: Spacing.one,
  },
  cartHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.one,
  },
  cartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    flex: 1,
  },
  removeButton: {
    padding: 4,
  },
  removeText: {
    fontSize: 16,
    color: '#888',
  },
  cartAuthor: {
    fontSize: 14,
  },
  cartFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.one,
  },
  cartPrice: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  cartCondition: {
    fontSize: 12,
  },
  checkoutSection: {
    marginTop: Spacing.four,
    padding: Spacing.four,
    borderRadius: Spacing.three,
    gap: Spacing.four,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  checkoutButton: {
    backgroundColor: '#3b82f6',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyCart: {
    borderRadius: Spacing.three,
    padding: Spacing.five,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.one,
    marginTop: Spacing.six,
  },
  emptyCartEmoji: {
    fontSize: 48,
    marginBottom: Spacing.two,
  },
  emptyCartText: {
    fontSize: 18,
  },
  emptyCartSubtext: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: Spacing.one,
    lineHeight: 20,
  },
});

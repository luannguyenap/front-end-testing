// 1.cart.test.ts
import { calculateTotalPrice, Product } from '../utils/1.cart';
describe('calculateTotalPrice', () => {
  it('should calculate the total price for a cart with multiple products', () => {
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 2 },
      { product_id: 2, price: 50, quantity: 3 },
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(350); // 100*2 + 50*3
  });

  it('should return 0 for an empty cart', () => {
    const products: Product[] = [];
    const result = calculateTotalPrice(products);
    expect(result).toBe(0);
  });

  it('should handle products with zero quantity', () => {
    const products: Product[] = [
      { product_id: 1, price: 100, quantity: 0 },
      { product_id: 2, price: 50, quantity: 2 },
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(100); // 0*100 + 50*2
  });

  it('should handle products with zero price', () => {
    const products: Product[] = [
      { product_id: 1, price: 0, quantity: 5 },
      { product_id: 2, price: 50, quantity: 2 },
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(100); // 0*5 + 50*2
  });

  it('should handle products with negative price or quantity', () => {
    const products: Product[] = [
      { product_id: 1, price: -100, quantity: 2 },
      { product_id: 2, price: 50, quantity: -3 },
    ];
    const result = calculateTotalPrice(products);
    expect(result).toBe(-350); // -100*2 + 50*(-3)
  });
});
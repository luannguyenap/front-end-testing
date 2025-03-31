import { calculateDiscount } from '../utils/6.discount';

describe('calculateDiscount', () => {
  it('should return 0 if price is less than or equal to 0', () => {
    expect(calculateDiscount(0)).toBe(0);
    expect(calculateDiscount(-100)).toBe(0);
  });

  describe('discount based on customer class', () => {
    it('should apply 10% discount for VIP customers', () => {
      expect(calculateDiscount(1000, { customerClass: 'VIP' })).toBe(100);
    });

    it('should apply 5% discount for PREMIUM customers', () => {
      expect(calculateDiscount(1000, { customerClass: 'PREMIUM' })).toBe(50);
    });

    it('should apply 0% discount for NORMAL customers', () => {
      expect(calculateDiscount(1000, { customerClass: 'NORMAL' })).toBe(0);
    });

    it('should apply 0% discount if customerClass is undefined', () => {
      expect(calculateDiscount(1000, {})).toBe(0);
    });
  });

  describe('discount based on voucher code', () => {
    it('should apply an additional 10% discount for WELCOME10 voucher', () => {
      expect(calculateDiscount(1000, { discountVoucherCode: 'WELCOME10' })).toBe(100);
    });

    it('should apply an additional 30% discount for BLACKFRIDAY voucher', () => {
      expect(calculateDiscount(1000, { discountVoucherCode: 'BLACKFRIDAY' })).toBe(300);
    });

    it('should apply 0% discount for an unrecognized voucher code', () => {
      expect(calculateDiscount(1000, { discountVoucherCode: 'INVALID' })).toBe(0);
    });
  });

  describe('default discount for orders over 2 million without voucher', () => {
    it('should apply an additional 5% discount if price > 2 million and no voucher', () => {
      expect(calculateDiscount(3000000)).toBe(150000); // 5% of 3,000,000
    });

    it('should not apply additional discount if price <= 2 million and no voucher', () => {
      expect(calculateDiscount(2000000)).toBe(0);
    });
  });

  describe('combined discounts', () => {
    it('should combine customer class and voucher discounts', () => {
      expect(calculateDiscount(1000, { customerClass: 'VIP', discountVoucherCode: 'WELCOME10' })).toBe(200); // 10% + 10%
      expect(calculateDiscount(1000, { customerClass: 'PREMIUM', discountVoucherCode: 'BLACKFRIDAY' })).toBe(350); // 5% + 30%
    });

    it('should not exceed the total price', () => {
      expect(calculateDiscount(1000, { customerClass: 'VIP', discountVoucherCode: 'BLACKFRIDAY' })).toBe(400); // 10% + 30% = 40%, but max discount = 1000
    });
  });
});
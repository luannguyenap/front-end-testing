type CustomerClass = 'VIP' | 'PREMIUM' | 'NORMAL';

type DiscountOptions = {
  customerClass?: CustomerClass;
  discountVoucherCode?: string;
}

/**
 * Hàm tính toán số tiền giảm giá dựa trên giá trị đơn hàng và tỷ lệ giảm giá.
 * Đối với khách hàng VIP, giảm giá 10% trên tổng giá trị đơn hàng.
 * Đối với khách hàng PREMIUM, giảm giá 5% trên tổng giá trị đơn hàng.
 * Đối với khách hàng NORMAL, giảm giá 0% trên tổng giá trị đơn hàng.
 * Discount voucher code "WELCOME10" sẽ giảm thêm 10% trên tổng giá trị đơn hàng.
 * Discount voucher code "BLACKFRIDAY" sẽ giảm thêm 30% trên tổng giá trị đơn hàng.
 * Nếu không có discount voucher code nào, sẽ giảm chiết khấu 5% trên tổng giá trị đơn hàng nếu đơn hàng lớn hơn 2 triệu đồng.
 * Tổng giá trị giảm giá không được vượt quá giá trị đơn hàng.
 * @param price nguyên giá trị đơn hàng
 * @param discountOptions các tùy chọn giảm giá
 * @returns số tiền giảm giá
 */

// export function calculateDiscount(price: number, discountOptions: DiscountOptions = {}): number {
//   if (price <= 0) return 0;

//   const { customerClass, discountVoucherCode } = discountOptions;

//   let discountRate = 0;
//   switch (customerClass) {
//     case 'VIP':
//       discountRate = 0.1; // 10%
//       break;
//     case 'PREMIUM':
//       discountRate = 0.05; // 5%
//       break;
//     case 'NORMAL':
//       discountRate = 0; // 0%
//       break;
//     default:
//       discountRate = 0; // 0%
//   }

//   if (discountVoucherCode === 'WELCOME10') {
//     discountRate += 0.1; // 10%
//   } else if (discountVoucherCode === 'BLACKFRIDAY') {
//     discountRate += 0.3; // 30%
//   } else if (!discountVoucherCode && price > 2000000) {
//     discountRate += 0.05; // 5%
//   }

//   const discount = price * discountRate;

//   return discount > price ? price : discount;
// }
export function calculateDiscount(price: number, discountOptions: DiscountOptions = {}): number {
  if (price <= 0) return 0;

  const { customerClass, discountVoucherCode } = discountOptions;

  // Define discount rates for customer classes
  const customerClassDiscountRates: Record<CustomerClass, number> = {
    VIP: 0.1, // 10%
    PREMIUM: 0.05, // 5%
    NORMAL: 0, // 0%
  };

  // Calculate base discount rate based on customer class
  const baseDiscountRate = customerClass ? customerClassDiscountRates[customerClass] : 0;

  // Additional discount based on voucher code
  const voucherDiscountRates: Record<string, number> = {
    WELCOME10: 0.1, // 10%
    BLACKFRIDAY: 0.3, // 30%
  };
  const voucherDiscountRate = discountVoucherCode ? voucherDiscountRates[discountVoucherCode] || 0 : 0;

  // Default discount for orders over 2 million without a voucher
  const defaultDiscountRate = !discountVoucherCode && price > 2000000 ? 0.05 : 0;

  // Calculate total discount rate
  const totalDiscountRate = baseDiscountRate + voucherDiscountRate + defaultDiscountRate;

  // Calculate discount amount
  const discount = price * totalDiscountRate;

  // Ensure discount does not exceed the price
  return Math.min(discount, price);
}

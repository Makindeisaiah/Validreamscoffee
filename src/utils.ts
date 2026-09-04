/**
 * Format a number as Nigerian Naira (NGN)
 * e.g., 24500 -> "₦24,500"
 */
export function formatNaira(amount: number): string {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
}

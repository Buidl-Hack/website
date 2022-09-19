export function shorten(address: string): string {
  return `${address.slice(0, 5)}...${address.slice(
    address.length - 3,
    address.length,
  )}`;
}

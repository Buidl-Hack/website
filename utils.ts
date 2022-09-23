export function shorten(address: string, chars = 3): string {
  return `${address.slice(0, 2 + chars)}...${address.slice(
    address.length - chars,
    address.length,
  )}`;
}

function formatPrice(num: number) {
  return Intl.NumberFormat('de-DE').format(num || 0);
}

export default formatPrice;

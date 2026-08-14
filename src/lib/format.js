export const formatPrice = (price) => {
  if (price === 0) return 'Contact for Price';
  return new Intl.NumberFormat('en-US').format(price) + ' ETB';
};

export const formatMileage = (mileage) => {
  if (mileage === 0) return 'Brand New';
  return new Intl.NumberFormat('en-US').format(mileage) + ' km';
};

export const formatArea = (area) => {
  return new Intl.NumberFormat('en-US').format(area) + ' sqm';
};

export const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  return 'Just now';
};

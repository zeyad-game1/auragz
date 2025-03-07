
/**
 * Generates a consistent color based on a username
 */
export function getUsernameColor(username: string): string {
  // An array of vibrant colors
  const colors = [
    '#8B5CF6', // Indigo
    '#EC4899', // Pink
    '#F97316', // Orange
    '#22C55E', // Green
    '#06B6D4', // Cyan
    '#3B82F6', // Blue
    '#D946EF', // Fuchsia
    '#F59E0B', // Amber
    '#64748B', // Slate
  ];
  
  // Calculate a consistent hash value from the username
  let hashValue = 0;
  for (let i = 0; i < username.length; i++) {
    hashValue += username.charCodeAt(i);
  }
  
  // Use the hash to select a color
  const colorIndex = hashValue % colors.length;
  return colors[colorIndex];
}

/**
 * Returns the first character of the username or a default
 */
export function getUserInitial(username: string): string {
  if (!username || username.length === 0) return "?";
  return username.charAt(0).toUpperCase();
}

/**
 * Creates a data URL for an SVG avatar with the first letter of the username
 */
export function generateAvatarUrl(username: string): string {
  const initial = getUserInitial(username);
  const backgroundColor = getUsernameColor(username);
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
      <rect width="80" height="80" fill="${backgroundColor}" />
      <text x="50%" y="50%" dy=".1em" 
        fill="white" 
        font-size="40" 
        font-weight="bold" 
        text-anchor="middle" 
        dominant-baseline="middle"
        font-family="Arial, sans-serif">
        ${initial}
      </text>
    </svg>
  `;
  
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

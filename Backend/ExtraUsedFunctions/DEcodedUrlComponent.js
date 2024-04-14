// Function to decode category from URL
const decodeCategoryFromURL = (encodedCategory) => {
  // Decode the URL component
  let decodedCategory = decodeURIComponent(encodedCategory);
  
  // Replace hyphens with spaces
  decodedCategory = decodedCategory.replace(/-/g, ' ');
  
  // Replace special character codes with their original characters
  decodedCategory = decodedCategory.replace(/and/g, '&');
  // Add more replacements for other special characters as needed
  
  return decodedCategory;
};

module.exports = { decodeCategoryFromURL };

export const formatProductNameForUrl = (productName) => {
  return productName
    ?.toLowerCase()
    .replace(/[^a-zA-Z0-9\s-]/g, '')  // Remove non-alphanumeric characters except spaces and dashes
    .trim()                            // Trim leading and trailing spaces
    .replace(/\s+/g, '-')              // Replace spaces with a single dash
    .replace(/-+/g, '-');              // Replace multiple dashes with a single dash
};

const validateProduct = ({ name, price, stock }) => {
  const errors = [];
  if (!name) errors.push('Product name is required');
  if (price == null || price < 0) errors.push('Price must be a positive number');
  if (stock == null || stock < 0) errors.push('Stock must be a positive number');
  return errors;
};

module.exports = { validateProduct };

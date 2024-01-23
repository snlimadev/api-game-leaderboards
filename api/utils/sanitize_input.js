function sanitizeInput(input, maxLength = 16) {
  if (!input) {
    return '';
  }

  const convertedInput = input.toString();
  const slicedInput = convertedInput.slice(0, maxLength);
  const sanitizedInput = slicedInput.replace(/[$.]/g, '_');

  return sanitizedInput;
}

module.exports = { sanitizeInput };
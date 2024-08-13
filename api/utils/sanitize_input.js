function sanitizeInput(input, maxLength = 16) {
  if (!input) {
    return '';
  }

  const convertedInput = input.toString();
  const lineBreaksRemoved = convertedInput.replace(/\n/g, ' ');
  const slicedInput = lineBreaksRemoved.trimStart().slice(0, maxLength).trimEnd();
  const sanitizedInput = slicedInput.replace(/[$.]/g, '_');

  return sanitizedInput;
}

module.exports = { sanitizeInput };
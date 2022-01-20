/**
 * Method to convert courseName to abbreviation
 * @param {String} text Text to convert to abbreviation 
 * @returns String Abbreviation of the text received
 */
export const getAbbreviation = (text) => text.split(" ").map((w) => (w[0])).map((w) => (w.toUpperCase() === w) ? w : '').join('');

/**
 * This function provides the absolute url for a given image path
 * @param {String} url url for image
 * @returns {String}
 */
export const toAbsoluteUrl = (url) => (
  `${process.env.PUBLIC_URL}/images/${url}`
);
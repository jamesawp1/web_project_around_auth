export const regEx = {
  email: /[\w\-.]{1,}@\w{1,}\.\w{1,}\.?\w{1,}/g,
  password: /[\w@_-]/g,
  url: /https?:\/\/(www\.)?[a-zA-Z0-9-]{2,}\.[a-zA-Z]{2,}\/?([^\s]*)\/?/gm,
  text: /[a-zA-ZÀ-ÿ\s]+/g,
};

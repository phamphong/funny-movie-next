
const regex = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]+).*/;

export const validateYoutubeURL = (url: string) => {
  let match = url.match(regex);
  if (match) {
    return match[1]
  } else {
    return undefined;
  }
}

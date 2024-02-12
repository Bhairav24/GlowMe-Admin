export default function capitalizeFirstLetter(string) {

  if (!string) {
    return ''; // Return an empty string if the input is undefined or null
  }

    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
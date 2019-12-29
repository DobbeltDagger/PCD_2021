/////////////////////////////////
// this function checks if menu title is in page.url
function menuMatch(title, pageUrl) {
  let test = title.indexOf(pageUrl);
  console.log("menuMatch test:", test);
  if (test > -1) {
    return true;
  } else {
    return false;
  }
}
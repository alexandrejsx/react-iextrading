export const API_URL = getURL();

function getURL() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "https://us-central1-node-iextrading-5e2d2.cloudfunctions.net/app"//"http://localhost:5001/node-iextrading-5e2d2/us-central1/app";
  } else {
    return "https://us-central1-node-iextrading-5e2d2.cloudfunctions.net/app";
  }
}

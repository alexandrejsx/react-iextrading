export const API_URL = getURL();

function getURL() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "http://localhost:5001/node-iextrading-5e2d2/us-central1/app/users";
  } else {
    return "https://us-central1-mininglab-db-auth-storage.cloudfunctions.net/app";
  }
}

const { NODE_ENV } = process.env;
const production = NODE_ENV === "production";

export const SERVER_URL = production
  ? "https://localhost:5000"
  : "https://localhost:5000";

export const API_URL = `${SERVER_URL}/api/v1.0`;

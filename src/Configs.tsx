const { NODE_ENV } = process.env;
const production = NODE_ENV === "production";

export const SERVER_URL = production
  ? "http://localhost:5000"
  : "http://localhost:5000";

export const API_URL = `${SERVER_URL}/api/v1.0`;

const { NODE_ENV } = process.env;
const production = NODE_ENV === "production";

export const SERVER_URL = production
  ? "https://localhost:5000/api/v1.0"
  : "https://localhost:5000/api/v1.0";

export const BASE_URL = "https://apis.tejaskadam.dev/apis"; //for deployment
export const lOCAL_BASE_URL = "http://localhost:8085/apis"; //for local setup

const ENDPOINTS = {
  READ: "get",
  WRITE: "add",
};

export const API_PATHS = {
  GET: `${lOCAL_BASE_URL}/${ENDPOINTS.READ}`,
  ADD: `${lOCAL_BASE_URL}/${ENDPOINTS.WRITE}`,
};

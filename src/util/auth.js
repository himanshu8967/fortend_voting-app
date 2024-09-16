export function getAuthToken() {
  const token = localStorage.getItem("token");

  return token ; // Return an object with both token and role
}

export function tokenLoader() {
  return getAuthToken();
}

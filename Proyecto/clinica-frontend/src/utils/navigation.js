export const goToCitas = (navigate, token) => {
  if (token) {
    navigate("/citas/nueva");
  } else {
    navigate("/login");
  }
};
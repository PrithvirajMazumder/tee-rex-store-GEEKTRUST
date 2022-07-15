export const openAlert = ({ message, severity, autoClose }) => {
  return {
    open: true,
    message,
    severity: severity ?? "success",
    autoClose: autoClose ?? 3000,
  };
};

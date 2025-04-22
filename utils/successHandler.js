exports.handleSuccess = (message, data) => {
  return {
    success: true,
    message: message || "Operation successful",
    data: data || {},
  };
};

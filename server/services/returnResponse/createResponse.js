export const createSuccessResponse = (
  res,
  statusCode,
  payload,
  customMessage
) => {
  return res.status(statusCode).json({
    status: true,
    data: payload,
    message: customMessage || "Success",
  });
};

export const createErrorResponse = (
  res,
  statusCode,
  payload,
  customMessage
) => {
  return res.status(statusCode).json({
    status: false,
    data: payload,
    message: customMessage,
  });
};

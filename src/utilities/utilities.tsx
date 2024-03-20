export const HTTP_CODES_ERROR: { [key: number]: string } = {
  403: "Api rate limit reached",
  404: "Repository not found",
};

export const getErrorMessage = (status: number) => {
  return HTTP_CODES_ERROR[status] || "Unknown error";
};

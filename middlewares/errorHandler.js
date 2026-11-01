export default function errorHandler(error, req, res, next) {
  if (error.name === "MulterError") {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res
        .status(413)
        .json({ error: "The Uploaded Image exceeds the maximum allowed size" });
    }
    return res.status(400).json({ error: "Invalid image upload" });
  }

  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern || {})[0];
    return res
      .status(409)
      .json({ error: `${field || "Field"} is already in use.` });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({
      error: "Invalid user data.",
      details: Object.values(error.errors).map((e) => e.message),
    });
  }
  if (error.name === "CastError") {
    return res.status(400).json({
      error: "Invalid data identifier.",
    });
  }

  const statusCode = error.statusCode || 500;
  return res.status(statusCode).json({
    error:
      statusCode === 500
        ? "Internal Server Error. Please try again later." + error
        : error.message,
  });
}

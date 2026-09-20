export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, _req, res, _next) {
  console.error(err);

  if (err?.name === "MulterError" || err?.message?.includes("Only JPEG")) {
    return res.status(400).json({ message: err.message });
  }

  res.status(err.statusCode || 500).json({
    message: err.statusCode ? err.message : "Internal server error."
  });
}

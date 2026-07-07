module.exports = (req, res) => {
  res.status(200).json({
    message: 'Hello, World! 👋',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
};

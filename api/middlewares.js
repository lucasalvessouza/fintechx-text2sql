const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token !== process.env.API_TOKEN) {
    return res.status(401).send({ error: 'Unauthorized' });
  }
  next();
};

module.exports = {
  authenticateToken
}
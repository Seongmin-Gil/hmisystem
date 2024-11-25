const catchAsync = func => {
  return (req, res, next) => {
    func(req, res, next).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  const status = err?.status || 500;
  const message = err?.message || 'INTERNAL_SERVER_ERROR';
  const code = err?.code || 'INTERNAL_SERVER_ERROR';
  console.log(err);
  return res.status(status).json({ status, message });
};

module.exports = {
  catchAsync,
  errorHandler,
};

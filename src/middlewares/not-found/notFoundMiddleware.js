import NotFound from "../../errors/NotFound/NotFound.js";

const notFoundMiddleware = (message) => {
  return (_, __, next) => {
    next(new NotFound(message));
  };
};

export default notFoundMiddleware;

import InvalidRequest from "../../errors/InvalidRequest/InvalidRequest.js";

const pagination = async (req, res, next) => {
  let { page = 0, size = 10, offset = 0, sort = "_id,asc" } = req.query;

  let [sortColumn, sortDirection] = sort.split(",");

  page = parseInt(page);
  size = parseInt(size);
  offset = parseInt(offset);
  sortDirection =
    sortDirection && sortDirection.toLowerCase() === "desc" ? -1 : 1;

  const search = req.search;

  try {
    if (page >= 0 && size >= 0) {
      const paginatedItems = await search
        .sort({ [sortColumn]: sortDirection })
        .skip(page * size + offset)
        .limit(size);

      res.status(200).json({ content: paginatedItems, page, size, offset });
    } else {
      next(new InvalidRequest("Page and/or size are invalid!"));
    }
  } catch (error) {
    next(error);
  }
};

export default pagination;

class APIFeatures {
  constructor(query, queryParams) {
    this.query = query;
    this.queryParams = queryParams;
  }

  filter() {
    const excludedPrams = ["sort", "page", "limit", "fields"];
    const queryObj = { ...this.queryParams };
    excludedPrams.forEach((val) => delete queryObj[val]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryParams.sort) {
      const sortParams = this.queryParams.sort.split(",").join(" ");
      this.query = this.query.sort(sortParams);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryParams.fields) {
      const fields = this.queryParams.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }

  paginate() {
    const limit = this.queryParams.limit || 100000;
    const page = this.queryParams.page || 1;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }

  async getTotalCount() {
    const countQuery = { ...this.query.getQuery() };
    const count = await this.query.model.countDocuments(countQuery);
    return count;
  }
}

module.exports = APIFeatures;

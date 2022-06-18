class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const parameter = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...parameter });
    return this;
  }

  filter() {
    let copyQuery = { ...this.queryStr };
    //   Removing some fields for category
    let removeWord = ["page", "limit", "keyword"];

    removeWord.forEach((word) => delete copyQuery[word]);
    // price and rating filter
    let queryStr = JSON.stringify(copyQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(ITEM_PER_PAGE) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = ITEM_PER_PAGE * (currentPage - 1);

    this.query = this.query.limit(ITEM_PER_PAGE).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;

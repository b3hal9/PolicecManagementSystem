const Parser = require("papaparse");

export const CSVparser = (file) => {
  let crimeRows = {};
  Parser.parse(file, {
    header: true,
    skipEmptyLines: true,
    complete: function (results) {
      crimeRows.data = results.data;
      crimeRows.errors = results.errors;
      crimeRows.meta = results.meta;
    },
  });
  return crimeRows;
};

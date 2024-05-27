const {BadRequestError} = require("../expressError");

function sqlForPartialUpdate(dataToUpdate, jsToSql=null) {

  const keys = Object.keys(dataToUpdate);

  if(keys.length === 0) throw new BadRequestError("No data!");

 
  const result = keys.map((col, idx) => 
    `"${jsToSql[col] || col}" = $${idx + 1}`
  );

  return {
    setCols : result.join(", "),
    values: Object.values(dataToUpdate)
  }
}

module.exports = {sqlForPartialUpdate};
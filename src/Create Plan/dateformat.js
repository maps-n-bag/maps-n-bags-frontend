function dtFormat(value) {
  const inputDate = value;

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  console.log(formattedDate);
  return formattedDate;
}
exports.dateformat = dtFormat;

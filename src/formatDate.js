function formatDate(value) {
  let date = new Date(value);
//  console.log(date);
  const day = date.toLocaleString("default", { day: "2-digit" });
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.toLocaleString("default", { year: "numeric" });
 // console.log(day + "-" + month + "-" + year);
  return day + "-" + month + "-" + year;
}
exports.formatDate = formatDate;

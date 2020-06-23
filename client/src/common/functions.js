module.exports = {
  rangeOfDates: function (startDate, stopDate) {
    var dateArray = [];
    var currentDate = new Date(startDate);
    while (currentDate <= stopDate) {
      dateArray.push(new Date(currentDate).toString());
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  },
  formatDate: function formatDate(str) {
    var dateObj = new Date(Date.parse(str));
    let month = String(dateObj.getMonth() + 1).padStart(2, "0");
    let day = String(dateObj.getDate()).padStart(2, "0");
    let year = dateObj.getFullYear();
    let output = day + "/" + month + "/" + year;
    return output;
  },
};

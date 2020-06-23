module.exports = ({ result }) => {
  let content = result.map((item) => {
    return `<p>${item.name} booked ${item.halls.join(
      " , "
    )} on the dates : ${item.dates.join(" , ")}</p>`;
  });
    return `
      <!doctype html>
      <html>
      <!-- CSS only -->
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
         <head>
            <meta charset="utf-8">
            <title>Report </title>
            <style>

            </style>

         </head>
         <body>
         <
            <div class="invoice-box">
           ${content}
            </div>

         </body>
      </html>
      `;
 
};

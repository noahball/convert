const fs = require("fs"); // This module allows us to access the file system on the device
const { parse } = require("csv-parse"); // This helps us to parse the CSV file

var newCSVData = ""; // This is where we will store the new CSV data before we write it to a file

fs.createReadStream("./input.csv") // Read the input CSV file
  .pipe(parse({ delimiter: ",", from_line: 1 })) // Parse - "interpret" - the file. The delimiter is what separates the values in the CSV file (usually a comma), and the from_line is the line number that we start from (eg. this could be 2 if you have column headers in the first row of the CSV file)
  .on("data", function (row) { // For each row in the CSV file
    // ## ## Everything until ## ## repeats for every row in the original CSV file ## ##
    for (let i = 0; i < row.length; i++) { // For every column in this row
        // $$ $$ Everything until $$ $$ repeats for every value (column in the row)
        if (i > 0) { // If this is not the first column. We want to skip the first column because we don't want to repeat the student's name
            newCSVData += `${row[0]},${row[i]}\n`; // In the NEW CSV file, add another row with the student's name and the value of the current column.
            // \n = line break. row[0] = the student's name. row[i] = the value of the current column.
          }
        }
        // $$ $$
    // ## ##
  })
  .on("end", function () { // Once we have finished reading the OLD CSV file
    fs.writeFile('./output.csv', newCSVData, err => { // Create a new file (or override an existing one) with the new CSV data.
        if (err) {
          console.error(err); // If there was an error, log it to the console
        } else {
          console.log('File written successfully') // If there was no error, log a success message to the console
        }
      });
  });
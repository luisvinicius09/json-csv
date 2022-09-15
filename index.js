/**
 * CSV = comma separeted values
 * Each line of the file is a data record
 * https://en.wikipedia.org/wiki/Comma-separated_values
 *
 *
 * Year,Make,Model,Length
 * 1997,Ford,E350,2.35
 * 2000,Mercury,Cougar,2.38
 *
 */

/**
 * JSON = JavaScript Object Notation
 *
 * [
 *  {
 *    "id":1,
 *    "userName": "Sam Smith",
 *    "phone": 379983344394
 *  },
 *  {
 *    "id":2,
 *    "userName": "Fred Frankly",
 *    "phone": 37991234394
 *  },
 *  {
 *    "id":1,
 *    "userName": "Zachary Zupers",
 *    "phone": 37998334123
 *  }
 * ]
 */

// fs.writeFile("data.csv", data, "utf-8", (err) => {
//   if (err) console.log(err);
//   else console.log("Data saved");
// });

const csv = `Year,Make,Model,Length
1997,Ford,E350,2.35
2000,Mercury,Cougar,2.38`;

// const json = {
//   id: 1,
//   userName: 'Zachary Zupers',
//   phone: 37998334123,
// };

// const json = [
//   {
//     id: 1,
//     // createdAt: "2022-03-01",
//     userName: 'Zachary Zupers',
//     phone: 37998334123,
//   },
//   {
//     id: 2,
//     userName: 'Mel Medarta',
//     phone: 37998334123,
//   },
// ];

const jsonToCsv = (input) => {
  let data = '';

  if (!Array.isArray(input)) {
    data += Object.keys(input).toString().slice(0, input.length) + '\n';

    data += Object.values(input).toString().slice(0, input.length) + '\n';

    return data;
  }

  data += Object.keys(input[0]).toString().slice(0, input[0].length) + '\n';

  input.map((item) => {
    data += Object.values(item).toString().slice(0, item.length) + '\n';
  });

  return data;
};

const csvToJson = (input) => {
  let arrData = [];
  let objData = {};

  const csvSplitted = input.split(/\n/);

  const keys = input.split(/\n/)[0].split(',');
  const values = input.split(/\n/).slice(1, input.length);

  if (csvSplitted.length === 2) {
    let tempObj = {};

    keys.map((key, index) => {
      tempObj = { ...tempObj, [key]: values[0].split(',')[index] };
    });

    objData = { ...objData, ...tempObj };

    return objData;
  }

  values.map((value) => {
    let tempObj = {};

    const newValues = value.split(',');

    keys.map((key, index) => {
      tempObj = { ...tempObj, [key]: newValues[index] };
    });
    arrData.push(tempObj);
  });

  return arrData;
};

export const ConvertStringToObject = (value) => {
  let obj = {};
  // const regex = /,(?![^{}]*})/;
  // const expression_regex = /(\$?\w+)\s*:\s*(.*)/;
  // const expressions = value.split(regex);

  // function ConvertArrayToObject([key, value]) {
  //   const obj = {};

  //   let parsedValue;
  //   if (value.startsWith("{")) {
  //     const replacedValue = value.replace(/([$][\w.]+)/g, '"$1"');
  //     parsedValue = JSON.parse(replacedValue);
  //   } else {
  //     parsedValue = value;
  //   }

  //   const replacedKey = key.startsWith("$") ? key : `${key}`;

  //   obj[replacedKey] = parsedValue;
  //   return obj;
  // }
  try {
    // expressions.map((expression) => {
    //   if (expression) {
    //     const [, key, value] = expression.trim().match(expression_regex);

    //     obj = { ...obj, ...ConvertArrayToObject([key, value]) };
    //   }
    // });
    obj = JSON.parse(value);
    console.log(obj, value);
  } catch (e) {}
  return obj;
};

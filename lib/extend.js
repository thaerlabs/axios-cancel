export default function() {
  const extended = {};

  for(const key in arguments) {
    const argument = arguments[key];
    for (const prop in argument) {
      if (Object.prototype.hasOwnProperty.call(argument, prop)) {
        extended[prop] = argument[prop];
      }
    }
  }

  return extended;
};

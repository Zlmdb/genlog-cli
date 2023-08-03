async function getDefaultValues() {
  return [
    {
      type: "input",
      name: "description",
      message: "版本描述信息",
      default: "-",
    },
  ];
}

module.exports = getDefaultValues;

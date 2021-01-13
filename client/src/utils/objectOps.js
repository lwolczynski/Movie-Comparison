const addObj = (arrOfObj, key) => [
  ...arrOfObj.map((obj) => ({ ...obj })),
  { key },
];

const changeObj = (arrOfObj, newObj, key) => [
  ...arrOfObj.map((obj) => {
    if (obj.key === key) {
      return { ...newObj, key };
    }
    return { ...obj };
  }),
];

const removeObj = (arrOfObj, objKeyToRemove) => [
  ...arrOfObj.filter((obj) => obj.key !== objKeyToRemove),
];

export { addObj, changeObj, removeObj };

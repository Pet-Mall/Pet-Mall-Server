export const toTree = (data: any[]) => {
  data.forEach((item) => {
    delete item.children;
  });
  const map = {};
  data.forEach((item) => {
    map[item._id] = item;
  });
  const val = [];
  data.forEach((item) => {
    const parent = map[item.parentId];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      val.push(item);
    }
  });
  return val;
};

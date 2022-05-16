export const toTree = (data: any[]) => {
  data.forEach((item) => {
    delete item.children;
    item.roles = []
  });
  const map = {};
  data.forEach((item) => {
    map[item._id] = item;
  });
  const val = [];
  data.forEach((item) => {
    if (item.rolesIdList.length) {
      let roles = []
      item.rolesIdList.forEach(c => {
        roles.push(c.name)
      })
      item.roles = roles
    } else {
      item.roles.push('*')
    }
    const parent = map[item.parentId];
    if (parent) {
      (parent.children || (parent.children = [])).push(item);
    } else {
      val.push(item);
    }
  });
  return val;
};

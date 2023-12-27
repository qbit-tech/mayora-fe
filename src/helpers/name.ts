export function getFullName(data: any) {
  if (!data) {
    return undefined;
  }
  if (data.firstName || data.middleName || data.lastName) {
    let list = [data.firstName, data.middleName, data.lastName];
    list = list.filter(item => item);
    return list.join(' ');
  } else if (data.nickName) {
    return data.nickName;
  } else {
    return undefined;
  }
}

export function getNickName(data: any) {
  if (!data) {
    return undefined;
  }
  if (data.nickName) {
    return data.nickName;
  } else {
    return null;
  }
}
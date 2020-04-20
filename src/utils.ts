export const getDataFromLocal = <T>(uri: string): T | undefined => {
  try {
    const area = localStorage.getItem(uri);
    if (area) return JSON.parse(area);
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

export const setDataToLocal = <T>(uri: string, data: T) => {
  localStorage.setItem(uri, JSON.stringify(data));
};

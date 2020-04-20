import { getDataFromLocal, setDataToLocal } from './utils';

type Data = {
  name: string;
};

const data: Data = {
  name: 'a data name',
};

const URI = 'theuri';

describe('Util functions', () => {
  it('should be able to set and get the correct value', () => {
    setDataToLocal(URI, data);
    const result = getDataFromLocal<Data>(URI);
    expect(result?.name).toEqual(data.name);
  });
});

import { initAxios } from '@/packages/utils/http';
import * as fs from 'fs';

const baseUrl = './src/apis';

const http = initAxios();
const apis = fs
  .readdirSync(baseUrl)
  .filter((fileName) => fileName !== 'index.ts')
  .map((fileName) => {
    console.log(fileName);
    return {
      name: /[a-zA-Z]*(?=\.json)/.exec(fileName)[0],
      path: `${baseUrl}/${fileName}`,
    };
  })
  .reduce((obj, file) => {
    const config = JSON.parse(fs.readFileSync(file.path, 'utf-8') || '[]');
    obj[file.name] = config.reduce(
      (api, item) =>
        Object.assign(api, {
          [item.name]: () =>
            http[item.method](`${process.env.BFF_HOST}${item.path}`),
        }),
      {},
    );
    return obj;
  }, {});

export default apis;

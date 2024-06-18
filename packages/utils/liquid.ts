import { Liquid } from 'liquidjs';
const viewPath = 'src/views/';

export const initLiquid = () => {
  return new Liquid({
    relativeReference: false,
    root: viewPath + 'pages',
    partials: viewPath + 'snippets',
    layouts: viewPath + 'layouts',
    extname: '.liquid',
  });
};

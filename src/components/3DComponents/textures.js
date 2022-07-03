//billboardTextures
import terpSolutionsImg from '@/assets/terpSolutions.png';
import woodTextureImg from '@/assets/woodTexture.jpg';
import githubImg from '@/assets/githubLogo.png';
import reactLogoImg from '@/assets/react.png';

let billboardTextures = {};
billboardTextures.terpSolutionsTexture = terpSolutionsImg;
billboardTextures.bagHolderBetsTexture =
  '../src/jsm/Bagholdersbetsbillboard.png';
billboardTextures.homeSweetHomeTexture =
  '../src/jsm/home-sweet-home-portrait.png';

//box textures
let boxTexture = {};
boxTexture.Github = githubImg;
boxTexture.PersonalBlog = reactLogoImg;

//material textures
let stoneTexture = '../src/jsm/stone.png';
let woodTexture = woodTextureImg;

//text
let inputText = {};

//SVG
let SVG = {};
SVG.reactLogo = '../src/jsm/react-svg.svg';

//URLs
let URL = {};
URL.gitHub = 'https://github.com/hustwebh';
URL.PersonalBlog = 'localhost:8000/blog';
URL.email = 'https://mailto:arfloyd7@gmail.com';

export {
  billboardTextures,
  boxTexture,
  inputText,
  URL,
  stoneTexture,
  woodTexture,
};

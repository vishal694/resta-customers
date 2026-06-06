import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
let css = fs.readFileSync(path.join(root, 'src/App.css'), 'utf8');
css = css.replace('}ṣ', '}');

const markers = {
  layoutEnd: '/* Cart Menu */',
  cartEnd: '/* Menu Categories */',
};

const cartStart = css.indexOf('/* Cart Menu */');
const menuStart = css.indexOf('/* Menu Categories */');
const offerStart = css.indexOf('.offer-carousel');

const layout = css.slice(0, offerStart);
const offers = css.slice(offerStart, cartStart);
let cart = css.slice(cartStart, menuStart);
let menu = css.slice(menuStart);

menu = menu.replace(
  /\.menu-grid-row[\s\S]*?\.menu-grid-row::-webkit-scrollbar \{[\s\S]*?\}\n\n/g,
  ''
);

menu = menu.replace(
  /\.menu-grid \{\n  display: flex;\n  flex-direction: column;\n  gap: 1\.25rem;[\s\S]*?max-width: 100%;\n\}/,
  `.menu-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(260px, 1fr));
  gap: 1.25rem;
  padding: 1rem 0.75rem 0.5rem;
  max-width: 100%;
}`
);

const offerDots = `
.offer-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
`;

const stylesDir = path.join(root, 'src/styles');
fs.mkdirSync(stylesDir, { recursive: true });
fs.writeFileSync(path.join(stylesDir, 'layout.css'), layout.trim() + '\n');
fs.writeFileSync(path.join(stylesDir, 'offers.css'), (offers.trim() + offerDots).trim() + '\n');
fs.writeFileSync(path.join(stylesDir, 'cart.css'), cart.trim() + '\n');
fs.writeFileSync(path.join(stylesDir, 'menu.css'), menu.trim() + '\n');
fs.writeFileSync(
  path.join(stylesDir, 'index.css'),
  `@import './layout.css';
@import './offers.css';
@import './cart.css';
@import './menu.css';
`
);

console.log('CSS split complete');

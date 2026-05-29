const fs = require('fs');
const path = require('path');

const dirs = [
  'src/app/pages/almacen',
  'src/app/pages/orden-compra',
  'src/app/pages/proveedores'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created: ${dir}`);
  }
});
console.log('Directories created successfully');

const fs = require('fs');
const path = require('path');

const dirs = [
  'src/app/pages/dashboard',
  'src/app/pages/egresos',
  'src/app/pages/ingresos'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created: ${dir}`);
  }
});
console.log('Directories created successfully');

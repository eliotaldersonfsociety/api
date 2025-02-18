const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Ruta a tu directorio de origen
const srcDir = path.join(__dirname, 'src');

// Función para obtener todos los archivos .ts en el directorio src
function getAllTSFiles(dir) {
  let files = [];

  // Lee el contenido del directorio
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    // Si es un directorio, busca dentro de él recursivamente
    if (stat.isDirectory()) {
      files = files.concat(getAllTSFiles(fullPath));
    } else if (item.endsWith('.ts')) {
      // Si es un archivo .ts, lo añade a la lista
      files.push(fullPath);
    }
  });

  return files;
}

// Obtén todos los archivos .ts dentro del directorio src
const tsFiles = getAllTSFiles(srcDir);

// Crea el comando para compilar todos los archivos
const command = `bun build ${tsFiles.join(' ')} --outdir dist`;

// Ejecuta el comando
execSync(command, { stdio: 'inherit' });

console.log('Compilación completada!');

export default function nameFromFileName(fileName) {
  let name = '';

  for (let i = 0; i < fileName.length; i++) {
    console.log(i);
    name += fileName[i] === '-' ? ' ' : fileName[i];
  }

  name = name
    .split('.')
    .slice(0, -1)
    .join('.');

  return name;
}

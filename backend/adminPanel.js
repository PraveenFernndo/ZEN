const fs = require('fs');

const readStream = fs.createReadStream('./data.txt', { encoding: 'utf-8' });
const writeStream = fs.createWriteStream('./output.txt', { encoding: 'utf-8' });

readStream.on('data', (chunk) => {
    console.log('New chunk received:');
    console.log(chunk.toString());
    writeStream.write("New Line");
    writeStream.write(chunk.toString());
})
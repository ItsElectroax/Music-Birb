/**let randomCode = '';

function space() {
  console.log('\n\x1b[32m\x1b[1m2FA code:\x1b[0m\n', '\x1b[33mWaiting for code generation...\x1b[0m\n');
}

function generateRandomCode() {
  randomCode = Math.floor(100000 + Math.random() * 900000);
  process.stdout.write('\u001B[1F\u001B[2K');
  process.stdout.write('\u001B[1F\u001B[2K');
  console.log(' >', randomCode, '<\n');
  let i = 16;
  const interval = setInterval(() => {
    process.stdout.write('\u001B[1F\u001B[2K');
    i = i - 1;
    console.log(' [', `\x1b[34;94m${i}`, '\x1b[0m]');
    if (i === 1) {
      clearInterval(interval);
    }
  }, 1000);
}

setTimeout(space, 1000);
setInterval(generateRandomCode, 16000);
module.exports = {
  getRandomCode: () => randomCode,
};
**/
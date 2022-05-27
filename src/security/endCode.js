
const set = (key) => {
    const buff = Buffer.from(key, 'utf-8');
    const base64 = buff.toString('base64');
    return base64;
  }

 const get = (keys) => {
    const buff = Buffer.from(keys, 'base64');
    const str = buff.toString('utf-8');
    return str;
  }

  module.exports = {
    set,
    get
  }

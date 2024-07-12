const os = require('os');

const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
};

const localIPAddress = getLocalIP();
console.log('Dirección IP local:', localIPAddress);

export default localIPAddress

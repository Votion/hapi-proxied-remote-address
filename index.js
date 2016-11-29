'use strict';

function hapiProxiedRemoteAddress(server, options, next) {
  const numberOfProxies = options.numberOfProxies || Infinity;
  const forwardHeader = options.forwardHeader || 'x-forwarded-for';

  server.ext('onRequest', (request, reply) => {
    let clientRemoteAddress;

    if (numberOfProxies < 1 || !request.headers[forwardHeader]) {
      // Not expecting forwards or no forwards through proxies happened
      clientRemoteAddress = request.info.remoteAddress;

    } else {
      const forwardedFors = request.headers[forwardHeader].split(',');

      if (forwardedFors.length < numberOfProxies) {
        // Was expecting more proxies
        clientRemoteAddress = forwardedFors[0].trim();

      } else {
        clientRemoteAddress = forwardedFors[forwardedFors.length - numberOfProxies].trim();
      }
    }

    request.info.clientRemoteAddress = clientRemoteAddress;

    reply.continue();
  });

  next();
}

hapiProxiedRemoteAddress.attributes = {
  pkg: require('./package.json'),
};

module.exports = hapiProxiedRemoteAddress;

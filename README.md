# hapi-proxied-remote-address

Get the remote address of the client through a defined number of proxies.

If requests to your Hapi app are proxied (for example a load balancer), the 
`request.info.remoteAddress` will be the IP address the last proxy.
Most proxies will forward the previous IP address(es) via the `X-Forwarded-For`
header. This plugin adds `request.info.clientRemoteAddress` which has the 
IP address of the end-user client.

This comes with the additional security feature of letting you specify the number
of proxies the request must pass through to prevent exploitation by the user
adding their own values to `X-Forwarded-For`.

## Options

* `numberOfProxies` - The number of proxies expected to pass through
* `forwardHeader` - The header name to check for forwarded addresses
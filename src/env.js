const siteRoot = '/'; // process.env.NODE_ENV === 'production' ? '/v2/' : '/';
const hostname = 'shortsrecipes.com'; //process.env.NODE_ENV === 'production' ? 'shortsrecipes.com' : 'localhost:8080';
const apiHostname = hostname;
const websiteHostname = process.env.NODE_ENV === 'production' ? 'shortsrecipes.com' : 'localhost:3000';
const websiteProtocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
const version = '20191005';


export {websiteProtocol, siteRoot, hostname, apiHostname, websiteHostname, version}
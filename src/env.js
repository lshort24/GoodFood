const siteRoot = process.env.NODE_ENV === 'production' ? '/v2/' : '/';
const hostname = process.env.NODE_ENV === 'production' ? 'shortsrecipes.com' : 'localhost:8080';
const version = '20171231';

export {siteRoot, hostname, version}
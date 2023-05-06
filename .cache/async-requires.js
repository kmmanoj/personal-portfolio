// prefer default export if available
const preferDefault = m => (m && m.default) || m

exports.components = {
  "component---src-pages-about-js": () => import("./../../../src/pages/about.js" /* webpackChunkName: "component---src-pages-about-js" */),
  "component---src-pages-index-js": () => import("./../../../src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-my-works-js": () => import("./../../../src/pages/my-works.js" /* webpackChunkName: "component---src-pages-my-works-js" */),
  "component---src-pages-resume-js": () => import("./../../../src/pages/resume.js" /* webpackChunkName: "component---src-pages-resume-js" */)
}


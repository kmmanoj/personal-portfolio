
// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---src-pages-about-js": preferDefault(require("/Users/kmmanoj/kmmanoj/personal-portfolio/src/pages/about.js")),
  "component---src-pages-index-js": preferDefault(require("/Users/kmmanoj/kmmanoj/personal-portfolio/src/pages/index.js")),
  "component---src-pages-my-works-js": preferDefault(require("/Users/kmmanoj/kmmanoj/personal-portfolio/src/pages/my-works.js")),
  "component---src-pages-resume-js": preferDefault(require("/Users/kmmanoj/kmmanoj/personal-portfolio/src/pages/resume.js"))
}


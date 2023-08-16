var loadFont = require("load-bmfont");
const { NearestFilter } = require("three");
global.THREE = require("three");

// A utility to load a font, then a texture
module.exports = function (opt, cb) {
  loadFont(opt.font, function (err, font) {
    if (err) throw err;
    THREE.ImageUtils.loadTexture(opt.image, undefined, function (tex) {
      tex.magFilter = NearestFilter;
      tex.minFilter = NearestFilter;
      cb(font, tex);
    });
  });
};

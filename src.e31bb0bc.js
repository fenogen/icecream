// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"sass/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./..\\img\\hero\\icecream171@1x.png":[["icecream171@1x.a10f9c36.png","img/hero/icecream171@1x.png"],"img/hero/icecream171@1x.png"],"./..\\img\\hero\\elipse.svg":[["elipse.86e3cf9b.svg","img/hero/elipse.svg"],"img/hero/elipse.svg"],"./..\\img\\hero\\icecream171@2x.png":[["icecream171@2x.02f22c9d.png","img/hero/icecream171@2x.png"],"img/hero/icecream171@2x.png"],"./..\\img\\hero\\icecream143@1x.png":[["icecream143@1x.b6b95819.png","img/hero/icecream143@1x.png"],"img/hero/icecream143@1x.png"],"./..\\img\\hero\\tasty168@1x.png":[["tasty168@1x.c70f75d5.png","img/hero/tasty168@1x.png"],"img/hero/tasty168@1x.png"],"./..\\img\\hero\\milk124@1x.png":[["milk124@1x.760642b0.png","img/hero/milk124@1x.png"],"img/hero/milk124@1x.png"],"./..\\img\\hero\\icecream143@2x.png":[["icecream143@2x.e1381819.png","img/hero/icecream143@2x.png"],"img/hero/icecream143@2x.png"],"./..\\img\\hero\\tasty168@2x.png":[["tasty168@2x.d5b58321.png","img/hero/tasty168@2x.png"],"img/hero/tasty168@2x.png"],"./..\\img\\hero\\milk124@2x.png":[["milk124@2x.e2609c32.png","img/hero/milk124@2x.png"],"img/hero/milk124@2x.png"],"./..\\img\\hero\\icecream236@1x.png":[["icecream236@1x.e272e671.png","img/hero/icecream236@1x.png"],"img/hero/icecream236@1x.png"],"./..\\img\\hero\\tasty293@1x.png":[["tasty293@1x.12f7a02d.png","img/hero/tasty293@1x.png"],"img/hero/tasty293@1x.png"],"./..\\img\\hero\\milk188@1x.png":[["milk188@1x.74ec2478.png","img/hero/milk188@1x.png"],"img/hero/milk188@1x.png"],"./..\\img\\hero\\icecream236@2x.png":[["icecream236@2x.7db8d304.png","img/hero/icecream236@2x.png"],"img/hero/icecream236@2x.png"],"./..\\img\\hero\\tasty293@2x.png":[["tasty293@2x.4282f6b8.png","img/hero/tasty293@2x.png"],"img/hero/tasty293@2x.png"],"./..\\img\\hero\\milk188@2x.png":[["milk188@2x.7a110141.png","img/hero/milk188@2x.png"],"img/hero/milk188@2x.png"],"./..\\img\\img_product\\mobile\\ice-cream.png":[["ice-cream.a71d41dc.png","img/img_product/mobile/ice-cream.png"],"img/img_product/mobile/ice-cream.png"],"./..\\img\\img_product\\mobile\\ice-cream@2x.png":[["ice-cream@2x.a82c18a8.png","img/img_product/mobile/ice-cream@2x.png"],"img/img_product/mobile/ice-cream@2x.png"],"./..\\img\\img_product\\tablet\\ice-cream.png":[["ice-cream.dad646cc.png","img/img_product/tablet/ice-cream.png"],"img/img_product/tablet/ice-cream.png"],"./..\\img\\img_product\\tablet\\ice-cream@2x.png":[["ice-cream@2x.01519e2d.png","img/img_product/tablet/ice-cream@2x.png"],"img/img_product/tablet/ice-cream@2x.png"],"./..\\img\\img_product\\desktop\\ice-cream.png":[["ice-cream.15de41fe.png","img/img_product/desktop/ice-cream.png"],"img/img_product/desktop/ice-cream.png"],"./..\\img\\img_product\\desktop\\ice-cream@2x.png":[["ice-cream@2x.126e36d4.png","img/img_product/desktop/ice-cream@2x.png"],"img/img_product/desktop/ice-cream@2x.png"],"./..\\img\\img_product\\mobile\\ice-coffee.png":[["ice-coffee.7ce4da42.png","img/img_product/mobile/ice-coffee.png"],"img/img_product/mobile/ice-coffee.png"],"./..\\img\\img_product\\mobile\\ice-coffee@2x.png":[["ice-coffee@2x.4da77b68.png","img/img_product/mobile/ice-coffee@2x.png"],"img/img_product/mobile/ice-coffee@2x.png"],"./..\\img\\img_product\\tablet\\ice-coffee.png":[["ice-coffee.1e1d3e0f.png","img/img_product/tablet/ice-coffee.png"],"img/img_product/tablet/ice-coffee.png"],"./..\\img\\img_product\\tablet\\ice-coffee@2x.png":[["ice-coffee@2x.833a89b6.png","img/img_product/tablet/ice-coffee@2x.png"],"img/img_product/tablet/ice-coffee@2x.png"],"./..\\img\\img_product\\desktop\\ice-coffee.png":[["ice-coffee.3e93d36f.png","img/img_product/desktop/ice-coffee.png"],"img/img_product/desktop/ice-coffee.png"],"./..\\img\\img_product\\desktop\\ice-coffee@2x.png":[["ice-coffee@2x.d291e42e.png","img/img_product/desktop/ice-coffee@2x.png"],"img/img_product/desktop/ice-coffee@2x.png"],"./..\\img\\img_product\\mobile\\milkshake.png":[["milkshake.7a02886d.png","img/img_product/mobile/milkshake.png"],"img/img_product/mobile/milkshake.png"],"./..\\img\\img_product\\mobile\\milkshake@2x.png":[["milkshake@2x.847b40c0.png","img/img_product/mobile/milkshake@2x.png"],"img/img_product/mobile/milkshake@2x.png"],"./..\\img\\img_product\\tablet\\milkshake.png":[["milkshake.ddf0c6be.png","img/img_product/tablet/milkshake.png"],"img/img_product/tablet/milkshake.png"],"./..\\img\\img_product\\tablet\\milkshake@2x.png":[["milkshake@2x.b129ee7a.png","img/img_product/tablet/milkshake@2x.png"],"img/img_product/tablet/milkshake@2x.png"],"./..\\img\\img_product\\desktop\\milkshake.png":[["milkshake.eb96751c.png","img/img_product/desktop/milkshake.png"],"img/img_product/desktop/milkshake.png"],"./..\\img\\img_product\\desktop\\milkshake@2x.png":[["milkshake@2x.09008a09.png","img/img_product/desktop/milkshake@2x.png"],"img/img_product/desktop/milkshake@2x.png"],"D:\\GOIT\\team-project-HTML-CSS\\src\\img\\tradition\\bg-320-@1x.png":[["bg-320-@1x.26bc7d66.png","img/tradition/bg-320-@1x.png"],"img/tradition/bg-320-@1x.png"],"D:\\GOIT\\team-project-HTML-CSS\\src\\img\\tradition\\bg-1282-@1x.png":[["bg-1282-@1x.a5c34384.png","img/tradition/bg-1282-@1x.png"],"img/tradition/bg-1282-@1x.png"],"D:\\GOIT\\team-project-HTML-CSS\\src\\img\\tradition\\bg-320-@2x.png":[["bg-320-@2x.6f609c28.png","img/tradition/bg-320-@2x.png"],"img/tradition/bg-320-@2x.png"],"D:\\GOIT\\team-project-HTML-CSS\\src\\img\\tradition\\bg-1282-@2x.png":[["bg-1282-@2x.6c453d77.png","img/tradition/bg-1282-@2x.png"],"img/tradition/bg-1282-@2x.png"],"D:\\GOIT\\team-project-HTML-CSS\\src\\img\\tradition\\milk.svg":[["milk.dde807e0.svg","img/tradition/milk.svg"],"img/tradition/milk.svg"],"D:\\GOIT\\team-project-HTML-CSS\\src\\img\\tradition\\food.svg":[["food.89ce740a.svg","img/tradition/food.svg"],"img/tradition/food.svg"],"D:\\GOIT\\team-project-HTML-CSS\\src\\img\\tradition\\heart.svg":[["heart.31c572ac.svg","img/tradition/heart.svg"],"img/tradition/heart.svg"],"./..\\img\\gallery\\person1-85@1x.png":[["person1-85@1x.2c68b4ee.png","img/gallery/person1-85@1x.png"],"img/gallery/person1-85@1x.png"],"./..\\img\\gallery\\person1-170@2x.png":[["person1-170@2x.bc859fd5.png","img/gallery/person1-170@2x.png"],"img/gallery/person1-170@2x.png"],"./..\\img\\gallery\\person2-85@1x.png":[["person2-85@1x.ba1943d9.png","img/gallery/person2-85@1x.png"],"img/gallery/person2-85@1x.png"],"./..\\img\\gallery\\person2-170@2x.png":[["person2-170@2x.584453e9.png","img/gallery/person2-170@2x.png"],"img/gallery/person2-170@2x.png"],"./..\\img\\gallery\\person3-85@1x.png":[["person3-85@1x.bf26ace7.png","img/gallery/person3-85@1x.png"],"img/gallery/person3-85@1x.png"],"./..\\img\\gallery\\person3-170@2x.png":[["person3-170@2x.ed70370d.png","img/gallery/person3-170@2x.png"],"img/gallery/person3-170@2x.png"],"./..\\img\\gallery\\text.svg":[["text.fe197b06.svg","img/gallery/text.svg"],"img/gallery/text.svg"],"./..\\img\\gallery\\home-1.svg":[["home-1.d89bc79c.svg","img/gallery/home-1.svg"],"img/gallery/home-1.svg"],"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("./sass/main.scss");
},{"./sass/main.scss":"sass/main.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51535" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.e31bb0bc.js.map
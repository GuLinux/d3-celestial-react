(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Celestial.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Celestial.js":
/*!**********************************!*\
  !*** ./Celestial.js + 1 modules ***!
  \**********************************/
/*! exports provided: Celestial */
/*! all exports used */
/*! ModuleConcatenation bailout: Cannot concat with external "lodash" (<- Module is not an ECMAScript module) */
/*! ModuleConcatenation bailout: Cannot concat with external "react" (<- Module is not an ECMAScript module) */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__("react");
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: ./libs/d3.min.js
var d3_min = __webpack_require__("./libs/d3.min.js");

// CONCATENATED MODULE: ./libs/celestial.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var createCelestial = function createCelestial(d3) {
  /* global settings, bvcolor, projections, projectionTween, poles, eulerAngles, euler, transformDeg, getData, getPlanets, getConstellationList, getGridValues, Canvas, halfπ, $, px, Round, has, isArray, form, geo, fldEnable, setCenter, interpolateAngle */
  var Celestial = {
    version: '0.6.8',
    container: null,
    data: []
  };
  var ANIMDISTANCE = 0.035,
      // Rotation animation threshold, ~2deg in radians
  ANIMSCALE = 1.4,
      // Zoom animation threshold, scale factor
  ANIMINTERVAL_R = 2000,
      // Rotation duration scale in ms
  ANIMINTERVAL_P = 2500,
      // Projection duration in ms
  ANIMINTERVAL_Z = 1500,
      // Zoom duration scale in ms
  ZOOMEXTENT = 50; // Maximum extent of zoom (max/min)

  var cfg, prjMap, zoom, map, circle; // Show it all, with the given config, otherwise with default settings

  Celestial.display = function (config) {
    var par,
        container = Celestial.container,
        animations = [],
        current = 0,
        repeat = false,
        aID; //Mash config with default settings

    cfg = settings.set(config);
    cfg.stars.size = cfg.stars.size || 7; // Nothing works without these

    cfg.stars.exponent = cfg.stars.exponent || -0.28;
    cfg.center = cfg.center || [0, 0];
    if (!cfg.lang || cfg.lang.search(/^de|es$/) === -1) cfg.lang = "name";
    var parent = $(cfg.container);

    if (parent) {
      par = "#" + cfg.container;
      var st = window.getComputedStyle(parent, null);
      if (!parseInt(st.width) && !cfg.width) parent.style.width = px(parent.parentNode.clientWidth);
    } else {
      par = "body";
      parent = null;
    }

    var margin = [16, 16],
        width = getWidth(),
        proj = getProjection(cfg.projection);
    if (cfg.lines.graticule.lat && cfg.lines.graticule.lat.pos[0] === "outline") proj.scale -= 2;
    if (!proj) return;
    var trans = cfg.transform || "equatorial",
        ratio = proj.ratio,
        height = width / ratio,
        scale = proj.scale * width / 1024,
        starbase = cfg.stars.size,
        dsobase = cfg.dsos.size || starbase,
        starexp = cfg.stars.exponent,
        dsoexp = cfg.dsos.exponent || starexp,
        //Object size base & exponent
    adapt = 1,
        rotation = getAngles(cfg.center),
        path = cfg.datapath || "";
    path = path.replace(/([^\/]$)/, "$1\/");
    if (par != "body") $(cfg.container).style.height = px(height);
    prjMap = Celestial.projection(cfg.projection).rotate(rotation).translate([width / 2, height / 2]).scale(scale);
    zoom = d3.geo.zoom().projection(prjMap).center([width / 2, height / 2]).scaleExtent([scale, scale * ZOOMEXTENT]).on("zoom.redraw", redraw);
    var canvas = d3.select(par).selectAll("canvas");
    if (canvas[0].length === 0) canvas = d3.select(par).append("canvas");
    canvas.attr("width", width).attr("height", height);
    var context = canvas.node().getContext("2d");
    var graticule = d3.geo.graticule().minorStep([15, 10]);
    map = d3.geo.path().projection(prjMap).context(context); //parent div with id #celestial-map or body

    if (container) container.selectAll("*").remove();else container = d3.select(par).append("container");
    if (cfg.interactive) canvas.call(zoom);else canvas.attr("style", "cursor: default!important");
    setClip(proj.clip);
    d3.select(window).on('resize', resize);
    d3.select(par).on('dblclick', function () {
      zoomBy(1.5625);
      return false;
    });

    if (cfg.controls === true && $("celestial-zoomin") === null) {
      d3.select(par).append("input").attr("type", "button").attr("id", "celestial-zoomin").attr("value", "+").on("click", function () {
        zoomBy(1.25);
        return false;
      });
      d3.select(par).append("input").attr("type", "button").attr("id", "celestial-zoomout").attr("value", "\u2212").on("click", function () {
        zoomBy(0.8);
        return false;
      });
    }

    if (cfg.location === true) {
      circle = d3.geo.circle().angle([90]);
      container.append("path").datum(circle).attr("class", "horizon");
      if ($("loc") === null) geo(cfg);else if (cfg.follow === "zenith") rotate({
        center: Celestial.zenith()
      });
      fldEnable("horizon-show", proj.clip);
    }

    if (cfg.form === true && $("params") === null) form(cfg);
    if ($("error") === null) d3.select("body").append("div").attr("id", "error");

    function load() {
      //Celestial planes
      for (var key in cfg.lines) {
        if (!has(cfg.lines, key)) continue;

        if (key === "graticule") {
          container.append("path").datum(graticule).attr("class", "graticule");
          if (has(cfg.lines.graticule, "lon") && cfg.lines.graticule.lon.pos.length > 0) container.selectAll(".gridvalues_lon").data(getGridValues("lon", cfg.lines.graticule.lon.pos)).enter().append("path").attr("class", "graticule_lon");
          if (has(cfg.lines.graticule, "lat") && cfg.lines.graticule.lat.pos.length > 0) container.selectAll(".gridvalues_lat").data(getGridValues("lat", cfg.lines.graticule.lat.pos)).enter().append("path").attr("class", "graticule_lat");
        } else {
          container.append("path").datum(d3.geo.circle().angle([90]).origin(transformDeg(poles[key], euler[trans]))).attr("class", key);
        }
      } //Milky way outline


      d3.json(path + "mw.json", function (error, json) {
        if (error) {
          window.alert("Your Browser doesn't support local file loading or the file doesn't exist. See readme.md");
          return console.warn(error);
        }

        var mw = getData(json, trans);
        container.selectAll(".mway").data(mw.features).enter().append("path").attr("class", "mw");
        redraw();
      }); //Constellation names or designation

      d3.json(path + "constellations.json", function (error, json) {
        if (error) return console.warn(error);
        var con = getData(json, trans);
        container.selectAll(".constnames").data(con.features).enter().append("text").attr("class", "constname");
        var l = getConstellationList(json, trans);

        if ($("constellation")) {
          var sel = d3.select("#constellation"),
              selected = 0,
              list = Object.keys(l).map(function (key, i) {
            if (key === config.constellation) selected = i;
            return {
              o: key,
              n: l[key].name
            };
          });
          list = [{
            o: "",
            n: "(Select constellation)"
          }].concat(list);
          sel.selectAll('option').data(list).enter().append('option').attr("value", function (d) {
            return d.o;
          }).text(function (d) {
            return d.n;
          });
          sel.property("selectedIndex", selected); //$("constellation").firstChild.disabled = true;
        }

        Celestial.constellations = l;
        redraw();
      }); //Constellation boundaries

      d3.json(path + "constellations.bounds.json", function (error, json) {
        if (error) return console.warn(error);
        var conb = getData(json, trans);
        container.selectAll(".bounds").data(conb.features).enter().append("path").attr("class", "boundaryline");
        redraw();
      }); //Constellation lines

      d3.json(path + "constellations.lines.json", function (error, json) {
        if (error) return console.warn(error);
        var conl = getData(json, trans);
        container.selectAll(".lines").data(conl.features).enter().append("path").attr("class", "constline");
        redraw();
      }); //Stars

      d3.json(path + cfg.stars.data, function (error, json) {
        if (error) return console.warn(error);
        var st = getData(json, trans);
        container.selectAll(".stars").data(st.features).enter().append("path").attr("class", "star");
        redraw();
      }); //Deep space objects

      d3.json(path + cfg.dsos.data, function (error, json) {
        if (error) return console.warn(error);
        var ds = getData(json, trans);
        container.selectAll(".dsos").data(ds.features).enter().append("path").attr("class", "dso");
        redraw();
      }); //Planets, Sun & (Moon tbi)

      d3.json(path + "planets.json", function (error, json) {
        if (error) return console.warn(error);
        var pl = getPlanets(json, trans);
        container.selectAll(".planets").data(pl).enter().append("path").attr("class", "planet");
        redraw();
      });

      if (Celestial.data.length > 0) {
        Celestial.data.forEach(function (d) {
          if (has(d, "file")) d3.json(d.file, d.callback);else setTimeout(d.callback, 0);
        }, this);
      }
    } // Zoom by factor; >1 larger <1 smaller 


    function zoomBy(factor) {
      if (!factor || factor === 1) return;
      var sc0 = prjMap.scale(),
          sc1 = sc0 * factor,
          ext = zoom.scaleExtent(),
          interval = ANIMINTERVAL_Z * Math.sqrt(Math.abs(1 - factor));
      if (sc1 < ext[0]) sc1 = ext[0];
      if (sc1 > ext[1]) sc1 = ext[1];
      var zTween = d3.interpolateNumber(sc0, sc1);
      d3.select({}).transition().duration(interval).tween("scale", function () {
        return function (t) {
          var z = zTween(t);
          prjMap.scale(z);
          redraw();
        };
      }).transition().duration(0).tween("scale", function () {
        zoom.scale(sc1);
        redraw();
      });
      return interval;
    }

    function apply(config) {
      cfg = cfg.set(config);
      redraw();
    }

    function rotate(config) {
      var cFrom = cfg.center,
          rot = prjMap.rotate(),
          sc = prjMap.scale(),
          interval = ANIMINTERVAL_R,
          keep = false,
          cTween,
          zTween,
          oTween,
          oof = cfg.orientationfixed;
      if (Round(rot[1], 1) === -Round(config.center[1], 1)) keep = true; //keep lat fixed if equal

      cfg = cfg.set(config);
      var d = Round(d3.geo.distance(cFrom, cfg.center), 2);
      var o = d3.geo.distance([cFrom[2], 0], [cfg.center[2], 0]);

      if (d < ANIMDISTANCE && o < ANIMDISTANCE) {
        rotation = getAngles(cfg.center);
        prjMap.rotate(rotation);
        redraw();
      } else {
        // Zoom interpolator
        if (sc > scale * ANIMSCALE) zTween = d3.interpolateNumber(sc, scale);else zTween = function zTween() {
          return sc;
        }; // Orientation interpolator

        if (o === 0) oTween = function oTween() {
          return rot[2];
        };else oTween = interpolateAngle(cFrom[2], cfg.center[2]);
        if (d > 3.14) cfg.center[0] -= 0.01; //180deg turn doesn't work well

        cfg.orientationfixed = false; // Rotation interpolator

        if (d === 0) cTween = function cTween() {
          return cfg.center;
        };else cTween = d3.geo.interpolate(cFrom, cfg.center);
        interval = d !== 0 ? interval * d : interval * o; // duration scaled by ang. distance

        d3.select({}).transition().duration(interval).tween("center", function () {
          return function (t) {
            var c = getAngles(cTween(t));
            c[2] = oTween(t);
            var z = t < 0.5 ? zTween(t) : zTween(1 - t);
            if (keep) c[1] = rot[1];
            prjMap.scale(z);
            prjMap.rotate(c);
            redraw();
          };
        }).transition().duration(0).tween("center", function () {
          cfg.orientationfixed = oof;
          rotation = getAngles(cfg.center);
          prjMap.rotate(rotation);
          redraw();
        });
      }

      return interval;
    }

    function resize(set) {
      width = getWidth();
      if (cfg.width === width && !set) return;
      height = width / ratio;
      scale = proj.scale * width / 1024;
      canvas.attr("width", width).attr("height", height);
      zoom.scaleExtent([scale, scale * ZOOMEXTENT]).scale(scale);
      prjMap.translate([width / 2, height / 2]).scale(scale);
      if (parent) parent.style.height = px(height);
      redraw();
    }

    function reproject(config) {
      var prj = getProjection(config.projection);
      if (!prj) return;
      var rot = prjMap.rotate(),
          ctr = prjMap.center(),
          sc = prjMap.scale(),
          ext = zoom.scaleExtent(),
          prjFrom = Celestial.projection(cfg.projection).center(ctr).translate([width / 2, height / 2]).scale([ext[0]]),
          interval = ANIMINTERVAL_P,
          delay = 0,
          rTween = d3.interpolateNumber(ratio, prj.ratio);
      if (proj.clip != prj.clip) interval = 0; // Different clip = no transition

      var prjTo = Celestial.projection(config.projection).center(ctr).translate([width / 2, width / prj.ratio / 2]).scale([prj.scale * width / 1024]);
      var bAdapt = cfg.adaptable;

      if (sc > ext[0]) {
        delay = zoomBy(0.1);
        setTimeout(reproject, delay, config);
        return delay + interval;
      }

      if (cfg.location) fldEnable("horizon-show", prj.clip);
      prjMap = projectionTween(prjFrom, prjTo);
      cfg.adaptable = false;
      d3.select({}).transition().duration(interval).tween("projection", function () {
        return function (_) {
          prjMap.alpha(_).rotate(rot);
          map.projection(prjMap);
          setClip(prj.clip);
          ratio = rTween(_);
          height = width / ratio;
          canvas.attr("width", width).attr("height", height);
          if (parent) parent.style.height = px(height);
          redraw();
        };
      }).transition().duration(0).tween("projection", function () {
        proj = prj;
        ratio = proj.ratio;
        height = width / proj.ratio;
        scale = proj.scale * width / 1024;
        canvas.attr("width", width).attr("height", height);
        if (parent) parent.style.height = px(height);
        cfg.projection = config.projection;
        prjMap = Celestial.projection(config.projection).rotate(rot).translate([width / 2, height / 2]).scale(scale);
        map.projection(prjMap);
        setClip(proj.clip);
        zoom.projection(prjMap).scaleExtent([scale, scale * ZOOMEXTENT]).scale(scale);
        cfg.adaptable = bAdapt;
        redraw();
      });
      return interval;
    }

    function redraw() {
      var rot = prjMap.rotate();
      if (cfg.adaptable) adapt = Math.sqrt(prjMap.scale() / scale);
      if (!adapt) adapt = 1;
      starbase = cfg.stars.size;
      starexp = cfg.stars.exponent;
      dsobase = cfg.dsos.size || starbase;
      dsoexp = cfg.dsos.exponent;

      if (cfg.orientationfixed) {
        rot[2] = cfg.center[2];
        prjMap.rotate(rot);
      }

      cfg.center = [-rot[0], -rot[1], rot[2]];
      setCenter(cfg.center, cfg.transform);
      clear();
      drawOutline(); //Draw all types of objects on the canvas

      if (cfg.mw.show) {
        container.selectAll(".mw").each(function (d) {
          setStyle(cfg.mw.style);
          map(d);
          context.fill();
        });
      }

      for (var key in cfg.lines) {
        if (!has(cfg.lines, key)) continue;
        if (cfg.lines[key].show !== true) continue;
        setStyle(cfg.lines[key]);
        container.selectAll("." + key).attr("d", map);
        context.stroke();
      }

      if (has(cfg.lines.graticule, "lon")) {
        setTextStyle(cfg.lines.graticule.lon);
        container.selectAll(".graticule_lon").each(function (d, i) {
          if (clip(d.geometry.coordinates)) {
            var pt = prjMap(d.geometry.coordinates);
            gridOrientation(pt, d.properties.orientation);
            context.fillText(d.properties.value, pt[0], pt[1]);
          }
        });
      }

      if (has(cfg.lines.graticule, "lat")) {
        setTextStyle(cfg.lines.graticule.lat);
        container.selectAll(".graticule_lat").each(function (d, i) {
          if (clip(d.geometry.coordinates)) {
            var pt = prjMap(d.geometry.coordinates);
            gridOrientation(pt, d.properties.orientation);
            context.fillText(d.properties.value, pt[0], pt[1]);
          }
        });
      }

      drawOutline(true);

      if (cfg.constellations.show) {
        if (cfg.constellations.bounds) {
          container.selectAll(".boundaryline").each(function (d) {
            setStyle(cfg.constellations.boundstyle);

            if (Celestial.constellation && Celestial.constellation === d.id) {
              context.lineWidth *= 1.5;
              context.setLineDash([]);
            }

            map(d);
            context.stroke();
          });
          drawOutline(true);
        }

        if (cfg.constellations.names) {
          setTextStyle(cfg.constellations.namestyle);
          container.selectAll(".constname").each(function (d) {
            if (clip(d.geometry.coordinates)) {
              setConstStyle(d.properties.rank, cfg.constellations.namestyle.font);
              var pt = prjMap(d.geometry.coordinates);
              context.fillText(constName(d), pt[0], pt[1]);
            }
          });
        }

        if (cfg.constellations.lines) {
          container.selectAll(".constline").each(function (d) {
            setStyle(cfg.constellations.linestyle);
            map(d);
            context.stroke();
          });
        }
      }

      if (cfg.stars.show) {
        setStyle(cfg.stars.style);
        container.selectAll(".star").each(function (d) {
          if (clip(d.geometry.coordinates) && d.properties.mag <= cfg.stars.limit) {
            var pt = prjMap(d.geometry.coordinates),
                r = starSize(d);
            context.fillStyle = starColor(d);
            context.beginPath();
            context.arc(pt[0], pt[1], r, 0, 2 * Math.PI);
            context.closePath();
            context.fill();

            if (cfg.stars.names && d.properties.mag <= cfg.stars.namelimit * adapt) {
              setTextStyle(cfg.stars.namestyle);
              context.fillText(starName(d), pt[0] + r, pt[1]);
            }

            if (cfg.stars.proper && d.properties.mag <= cfg.stars.propernamelimit * adapt) {
              setTextStyle(cfg.stars.propernamestyle);
              context.fillText(starProperName(d), pt[0] - r, pt[1]);
            }
          }
        });
      }

      if (cfg.dsos.show) {
        container.selectAll(".dso").each(function (d) {
          if (clip(d.geometry.coordinates) && dsoDisplay(d.properties, cfg.dsos.limit)) {
            var pt = prjMap(d.geometry.coordinates),
                type = d.properties.type;
            setStyle(cfg.dsos.symbols[type]);
            var r = dsoSymbol(d, pt);
            if (has(cfg.dsos.symbols[type], "stroke")) context.stroke();else context.fill();

            if (cfg.dsos.names && dsoDisplay(d.properties, cfg.dsos.namelimit)) {
              setTextStyle(cfg.dsos.namestyle);
              context.fillStyle = cfg.dsos.symbols[type].fill;
              context.fillText(dsoName(d), pt[0] + r, pt[1] - r);
            }
          }
        });
      }

      if (cfg.location && cfg.transform === "equatorial" && cfg.planets.show && Celestial.origin) {
        var dt = Celestial.date(),
            o = Celestial.origin(dt).spherical();
        container.selectAll(".planet").each(function (d) {
          var id = d.id();
          var p = d(dt).equatorial(o);

          if (clip(p.pos)) {
            var pt = prjMap(p.pos),
                sym = cfg.planets.symbols[id];

            if (id !== "lun") {
              setTextStyle(cfg.planets.style);
              context.fillStyle = sym.fill;
              context.fillText(sym.symbol, pt[0], pt[1]);
            } else {
              Canvas.symbol().type("crescent").size(144).age(p.age).position(pt)(context);
            }
          }
        });
      }

      if (Celestial.data.length > 0) {
        Celestial.data.forEach(function (d) {
          d.redraw();
        });
      } //    drawOutline(true);


      if (cfg.location && cfg.horizon.show && !proj.clip) {
        circle.origin(Celestial.nadir());
        setStyle(cfg.horizon);
        container.selectAll(".horizon").datum(circle).attr("d", map);
        context.fill();
        if (cfg.horizon.stroke) context.stroke();
      }

      if (cfg.controls) {
        zoomState(prjMap.scale());
      }
    }

    function drawOutline(stroke) {
      var rot = prjMap.rotate();
      prjMap.rotate([0, 0]);
      setStyle(cfg.background);
      container.selectAll(".outline").attr("d", map);
      if (stroke === true) context.stroke();else context.fill();
      prjMap.rotate(rot);
    } // Helper functions -------------------------------------------------


    function clip(coords) {
      return proj.clip && d3.geo.distance(cfg.center, coords) > halfπ ? 0 : 1;
    }

    function setStyle(s) {
      context.fillStyle = s.fill || null;
      context.strokeStyle = s.stroke || null;
      context.lineWidth = s.width || null;
      context.globalAlpha = s.opacity || 1;
      context.font = s.font || null;
      if (has(s, "dash")) context.setLineDash(s.dash);else context.setLineDash([]);
      context.beginPath();
    }

    function setTextStyle(s) {
      context.fillStyle = s.fill;
      context.textAlign = s.align || "left";
      context.textBaseline = s.baseline || "bottom";
      context.globalAlpha = s.opacity || 1;
      context.font = s.font;
    }

    function setConstStyle(rank, font) {
      if (!isArray(font)) context.font = font;else if (font.length === 1) context.font = font[0];else if (rank > font.length) context.font = font[font.length - 1];else context.font = font[rank - 1];
    }

    function zoomState(sc) {
      var czi = $("celestial-zoomin"),
          czo = $("celestial-zoomout");
      if (!czi || !czo) return;
      czi.disabled = sc >= scale * ZOOMEXTENT * 0.99;
      czo.disabled = sc <= scale;
    }

    function setClip(setit) {
      if (setit) {
        prjMap.clipAngle(90);
        container.selectAll(".outline").remove();
        container.append("path").datum(d3.geo.circle().angle([90])).attr("class", "outline");
      } else {
        prjMap.clipAngle(null);
        container.selectAll(".outline").remove();
        container.append("path").datum(graticule.outline).attr("class", "outline");
      }
    }

    function dsoDisplay(prop, limit) {
      return prop.mag === 999 && Math.sqrt(parseInt(prop.dim)) > limit || prop.mag !== 999 && prop.mag <= limit;
    }

    function dsoSymbol(d, pt) {
      var prop = d.properties;
      var size = dsoSize(prop) || 9,
          type = dsoShape(prop.type);
      Canvas.symbol().type(type).size(size).position(pt)(context);
      return Math.sqrt(size) / 2;
    }

    function dsoShape(type) {
      if (!type || !has(cfg.dsos.symbols, type)) return "circle";else return cfg.dsos.symbols[type].shape;
    }

    function dsoSize(prop) {
      if (!prop.mag || prop.mag === 999) return Math.pow(parseInt(prop.dim) * dsobase * adapt / 7, 0.5);
      return Math.pow(2 * dsobase * adapt - prop.mag, dsoexp);
    }

    function dsoName(d) {
      var prop = d.properties;
      if (prop.name === "") return;
      if (cfg.dsos.desig && prop.desig) return prop.desig;
      return prop.name;
    }
    /*Star designation, if desig = false, no long desigs  */


    function starName(d) {
      var name = d.properties.desig;
      if (!cfg.stars.desig) return name.replace(/^(HD|HIP|V\d{3}).+/, "");
      return name;
    }

    function starProperName(d) {
      var name = d.properties.name;
      return name;
    }

    function starSize(d) {
      var mag = d.properties.mag;
      if (mag === null) return 0.1;
      var r = starbase * adapt * Math.exp(starexp * (mag + 2));
      return Math.max(r, 0.1);
    }

    function starColor(d) {
      var bv = d.properties.bv;

      if (!cfg.stars.colors || isNaN(bv)) {
        return cfg.stars.style.fill;
      }

      return bvcolor(bv);
    }

    function constName(d) {
      return cfg.constellations.desig ? d.properties.desig : d.properties[cfg.lang];
    }

    function gridOrientation(pos, orient) {
      var o = orient.split(""),
          h = "center",
          v = "middle";

      for (var i = o.length - 1; i >= 0; i--) {
        switch (o[i]) {
          case "N":
            v = "bottom";
            break;

          case "S":
            v = "top";
            break;

          case "E":
            h = "left";
            pos[0] += 2;
            break;

          case "W":
            h = "right";
            pos[0] -= 2;
            break;
        }
      }

      context.textAlign = h;
      context.textBaseline = v;
      return pos;
    }

    function clear() {
      context.clearRect(0, 0, width + margin[0], height + margin[1]);
    }

    function getWidth() {
      if (cfg.width && cfg.width > 0) return cfg.width;
      if (parent) return parent.clientWidth - margin[0];
      return window.innerWidth - margin[0] * 2;
    }

    function getProjection(p) {
      if (!has(projections, p)) return;
      var res = projections[p];
      if (!has(res, "ratio")) res.ratio = 2; // Default w/h ratio 2:1    

      return res;
    }

    function getAngles(coords) {
      if (coords === null) return [0, 0, 0];
      var rot = eulerAngles.equatorial;
      if (!coords[2]) coords[2] = 0;
      return [rot[0] - coords[0], rot[1] - coords[1], rot[2] + coords[2]];
    }

    function animate() {
      if (!animations || animations.length < 1) return;
      var d,
          a = animations[current];

      switch (a.param) {
        case "projection":
          d = reproject({
            projection: a.value
          });
          break;

        case "center":
          d = rotate({
            center: a.value
          });
          break;

        case "zoom":
          d = zoomBy(a.value);
      }

      if (a.callback) setTimeout(a.callback, d);
      current++;
      if (repeat === true && current === animations.length) current = 0;
      d = a.duration === 0 || a.duration < d ? d : a.duration;
      if (current < animations.length) aID = setTimeout(animate, d);
    }

    function stop() {
      clearTimeout(aID); //current = 0;
      //repeat = false;
    } // Exported objects and functions for adding data


    this.container = container;
    this.clip = clip;
    this.map = map;
    this.mapProjection = prjMap;
    this.context = context;
    this.setStyle = setStyle;
    this.setTextStyle = setTextStyle;
    this.setConstStyle = setConstStyle;
    this.dsoSymbol = dsoSymbol;
    this.redraw = redraw;

    this.resize = function (config) {
      if (config && has(config, "width")) cfg.width = config.width;
      resize(true);
    };

    this.reload = function (config) {
      if (!config || !has(config, "transform")) return;
      trans = cfg.transform = config.transform;
      if (trans === "equatorial") graticule.minorStep([15, 10]);else graticule.minorStep([10, 10]);
      container.selectAll("*").remove();
      setClip();
      container.append("path").datum(circle).attr("class", "horizon");
      load();
    };

    this.apply = function (config) {
      apply(config);
    };

    this.reproject = function (config) {
      return reproject(config);
    };

    this.rotate = function (config) {
      if (!config) return cfg.center;
      return rotate(config);
    };

    this.zoomBy = function (factor) {
      if (!factor) return prjMap.scale() / scale;
      return zoomBy(factor);
    };

    this.color = function (type) {
      if (!type) return "#000";
      if (has(cfg.dsos.symbols, type)) return cfg.dsos.symbols[type].fill;
      return "#000";
    };

    this.animate = function (anims, dorepeat) {
      if (!anims) return;
      animations = anims;
      current = 0;
      repeat = dorepeat ? true : false;
      animate();
    };

    this.stop = function (wipe) {
      stop();
      if (wipe === true) animations = [];
    };

    this.go = function (index) {
      if (animations.length < 1) return;
      if (index && index < animations.length) current = index;
      animate();
    };

    if (!has(this, "date")) this.date = function () {
      console.log("Celestial.date() needs config.location = true to work.");
    };
    load();
  };
  /* global Celestial, projections, has */
  //Flipped projection generated on the fly


  Celestial.projection = function (projection) {
    var p, raw, forward;

    if (!has(projections, projection)) {
      throw new Error("Projection not supported: " + projection);
    }

    p = projections[projection];

    if (p.arg !== null) {
      raw = d3.geo[projection].raw(p.arg);
    } else {
      raw = d3.geo[projection].raw;
    }

    forward = function forward(λ, φ) {
      var coords = raw(-λ, φ);
      return coords;
    };

    forward.invert = function (x, y) {
      try {
        var coords = raw.invert(x, y);
        coords[0] = coords && -coords[0];
        return coords;
      } catch (e) {
        console.log(e);
      }
    };

    return d3.geo.projection(forward);
  };

  function projectionTween(a, b) {
    var prj = d3.geo.projection(raw).scale(1),
        center = prj.center,
        translate = prj.translate,
        α;

    function raw(λ, φ) {
      var pa = a([λ *= 180 / Math.PI, φ *= 180 / Math.PI]),
          pb = b([λ, φ]);
      return [(1 - α) * pa[0] + α * pb[0], (α - 1) * pa[1] - α * pb[1]];
    }

    prj.alpha = function (_) {
      if (!arguments.length) return α;
      α = +_;
      var ca = a.center(),
          cb = b.center(),
          ta = a.translate(),
          tb = b.translate();
      center([(1 - α) * ca[0] + α * cb[0], (1 - α) * ca[1] + α * cb[1]]);
      translate([(1 - α) * ta[0] + α * tb[0], (1 - α) * ta[1] + α * tb[1]]);
      return prj;
    };

    delete prj.translate;
    delete prj.center;
    return prj.alpha(0);
  }

  var eulerAngles = {
    "equatorial": [0.0, 0.0, 0.0],
    "ecliptic": [0.0, 0.0, 23.4393],
    "galactic": [93.5949, 28.9362, -58.5988],
    "supergalactic": [137.3100, 59.5283, 57.7303] //  "mars": [97.5,23.5,29]

  };
  var poles = {
    "equatorial": [0.0, 90.0],
    "ecliptic": [-90.0, 66.5607],
    "galactic": [-167.1405, 27.1283],
    "supergalactic": [-76.2458, 15.7089] //  "mars": [-42.3186, 52.8865]

  };

  Celestial.eulerAngles = function () {
    return eulerAngles;
  };

  Celestial.poles = function () {
    return poles;
  };
  /* global Celestial, poles */


  var τ = Math.PI * 2,
      halfπ = Math.PI / 2,
      deg2rad = Math.PI / 180; //Transform equatorial into any coordinates, degrees

  function transformDeg(c, euler) {
    var res = transform(c.map(function (d) {
      return d * deg2rad;
    }), euler);
    return res.map(function (d) {
      return d / deg2rad;
    });
  } //Transform equatorial into any coordinates, radians


  function transform(c, euler) {
    var x,
        y,
        z,
        β,
        γ,
        λ,
        φ,
        dψ,
        ψ,
        θ,
        ε = 1.0e-5;
    if (!euler) return c;
    λ = c[0]; // celestial longitude 0..2pi

    if (λ < 0) λ += τ;
    φ = c[1]; // celestial latitude  -pi/2..pi/2

    λ -= euler[0]; // celestial longitude - celestial coordinates of the native pole

    β = euler[1]; // inclination between the poles (colatitude)

    γ = euler[2]; // native coordinates of the celestial pole

    x = Math.sin(φ) * Math.sin(β) - Math.cos(φ) * Math.cos(β) * Math.cos(λ);

    if (Math.abs(x) < ε) {
      x = -Math.cos(φ + β) + Math.cos(φ) * Math.cos(β) * (1 - Math.cos(λ));
    }

    y = -Math.cos(φ) * Math.sin(λ);

    if (x !== 0 || y !== 0) {
      dψ = Math.atan2(y, x);
    } else {
      dψ = λ - Math.PI;
    }

    ψ = γ + dψ;
    if (ψ > Math.PI) ψ -= τ;

    if (λ % Math.PI === 0) {
      θ = φ + Math.cos(λ) * β;
      if (θ > halfπ) θ = Math.PI - θ;
      if (θ < -halfπ) θ = -Math.PI - θ;
    } else {
      z = Math.sin(φ) * Math.cos(β) + Math.cos(φ) * Math.sin(β) * Math.cos(λ);

      if (Math.abs(z) > 0.99) {
        θ = Math.abs(Math.acos(Math.sqrt(x * x + y * y)));
        if (z < 0) θ *= -1;
      } else {
        θ = Math.asin(z);
      }
    }

    return [ψ, θ];
  }

  var euler = {
    "ecliptic": [-90.0, 23.4393, 90.0],
    "inverse ecliptic": [90.0, 23.4393, -90.0],
    "galactic": [-167.1405, 62.8717, 122.9319],
    "inverse galactic": [122.9319, 62.8717, -167.1405],
    "supergalactic": [283.7542, 74.2911, 26.4504],
    "inverse supergalactic": [26.4504, 74.2911, 283.7542],
    "init": function init() {
      for (var key in this) {
        if (this[key].constructor == Array) {
          this[key] = this[key].map(function (val) {
            return val * deg2rad;
          });
        }
      }
    },
    "add": function add(name, ang) {
      if (!ang || !name || ang.length !== 3 || this.hasOwnProperty(name)) return;
      this[name] = ang.map(function (val) {
        return val * deg2rad;
      });
      return this[name];
    }
  };
  euler.init();

  Celestial.euler = function () {
    return euler;
  };
  /* global Celestial, deg2rad */


  var horizontal = function horizontal(dt, pos, loc) {
    //dt: datetime, pos: celestial coordinates [lat,lng], loc: location [lat,lng]  
    var ha = getMST(dt, loc[1]) - pos[0];
    if (ha < 0) ha = ha + 360;
    ha = ha * deg2rad;
    var dec = pos[1] * deg2rad;
    var lat = loc[0] * deg2rad;
    var alt = Math.asin(Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(ha));
    var az = Math.acos((Math.sin(dec) - Math.sin(alt) * Math.sin(lat)) / (Math.cos(alt) * Math.cos(lat)));
    if (Math.sin(ha) > 0) az = Math.PI * 2 - az;
    return [alt / deg2rad, az / deg2rad, 0];
  };

  horizontal.inverse = function (dt, hor, loc) {
    var alt = hor[0] * deg2rad;
    var az = hor[1] * deg2rad;
    var lat = loc[0] * deg2rad;
    var dec = Math.asin(Math.sin(alt) * Math.sin(lat) + Math.cos(alt) * Math.cos(lat) * Math.cos(az));
    var ha = ((Math.sin(alt) - Math.sin(dec) * Math.sin(lat)) / (Math.cos(dec) * Math.cos(lat))).toFixed(6);
    ha = Math.acos(ha);
    ha = ha / deg2rad;
    var ra = getMST(dt, loc[1]) - ha; //if (ra < 0) ra = ra + 360;

    return [ra, dec / deg2rad, 0];
  };

  function getMST(dt, lng) {
    var yr = dt.getUTCFullYear();
    var mo = dt.getUTCMonth() + 1;
    var dy = dt.getUTCDate();
    var h = dt.getUTCHours();
    var m = dt.getUTCMinutes();
    var s = dt.getUTCSeconds();

    if (mo == 1 || mo == 2) {
      yr = yr - 1;
      mo = mo + 12;
    }

    var a = Math.floor(yr / 100);
    var b = 2 - a + Math.floor(a / 4);
    var c = Math.floor(365.25 * yr);
    var d = Math.floor(30.6001 * (mo + 1)); // days since J2000.0

    var jd = b + c + d - 730550.5 + dy + (h + m / 60.0 + s / 3600.0) / 24.0; // julian centuries since J2000.0

    var jt = jd / 36525.0; // the mean sidereal time in degrees

    var mst = 280.46061837 + 360.98564736629 * jd + 0.000387933 * jt * jt - jt * jt * jt / 38710000 + lng; // in degrees modulo 360.0

    if (mst > 0.0) while (mst > 360.0) {
      mst = mst - 360.0;
    } else while (mst < 0.0) {
      mst = mst + 360.0;
    }
    return mst;
  }

  Celestial.horizontal = horizontal;
  /* global Celestial, has */
  //Add more JSON data to the map

  Celestial.add = function (dat) {
    var res = {}; //dat: {file: path, type:'json|raw', callback: func(), redraw: func()} 
    //or {file:file, size:null, shape:null, color:null}  TBI
    //  with size,shape,color: "prop=val:result;.." || function(prop) { .. return res; } 

    if (!has(dat, "type")) return console.log("Missing type");
    if ((dat.type === "dso" || dat.type === "json") && (!has(dat, "file") || !has(dat, "callback"))) return console.log("Can't add data file");
    if ((dat.type === "line" || dat.type === "raw") && !has(dat, "callback")) return console.log("Can't add line");
    if (has(dat, "file")) res.file = dat.file;
    res.type = dat.type;
    if (has(dat, "callback")) res.callback = dat.callback;
    if (has(dat, "redraw")) res.redraw = dat.redraw;
    Celestial.data.push(res);
  };

  Celestial.remove = function (i) {
    if (i !== null && i < Celestial.data.length) {
      return Celestial.data.splice(i, 1);
    }
  };

  Celestial.clear = function () {
    Celestial.data = [];
  };
  /* global Celestial, Kepler, euler, transformDeg, isArray, isNumber, has, cfg */
  //load data and transform coordinates


  function getPoint(coords, trans) {
    return transformDeg(coords, euler[trans]);
  }

  function getData(d, trans) {
    if (trans === "equatorial") return d;
    var leo = euler[trans],
        f = d.features;

    for (var i = 0; i < f.length; i++) {
      f[i].geometry.coordinates = translate(f[i], leo);
    }

    return d;
  }

  function getPlanets(d) {
    var res = [];

    for (var key in d) {
      if (!has(d, key)) continue;
      if (cfg.planets.which.indexOf(key) === -1) continue;
      var dat = Kepler().id(key);
      if (has(d[key], "parent")) dat.parentBody(d[key].parent);
      dat.elements(d[key].elements[0]);
      if (key === "ter") Celestial.origin = dat;else res.push(dat);
    }

    res.push(Kepler().id("sol"));
    res.push(Kepler().id("lun"));
    return res;
  }

  function getConstellationList(d, trans) {
    var res = {},
        leo = euler[trans],
        f = d.features;

    for (var i = 0; i < f.length; i++) {
      res[f[i].id] = {
        name: f[i].properties.name,
        center: f[i].properties.display.slice(0, 2),
        scale: f[i].properties.display[2]
      };
    }

    return res;
  }

  function translate(d, leo) {
    var res = [];

    switch (d.geometry.type) {
      case "Point":
        res = transformDeg(d.geometry.coordinates, leo);
        break;

      case "LineString":
        res.push(transLine(d.geometry.coordinates, leo));
        break;

      case "MultiLineString":
        res = transMultiLine(d.geometry.coordinates, leo);
        break;

      case "Polygon":
        res.push(transLine(d.geometry.coordinates[0], leo));
        break;

      case "MultiPolygon":
        res.push(transMultiLine(d.geometry.coordinates[0], leo));
        break;
    }

    return res;
  }

  function getGridValues(type, loc) {
    var lines = [];
    if (!loc) return [];
    if (!isArray(loc)) loc = [loc]; //center, outline, values

    for (var i = 0; i < loc.length; i++) {
      switch (loc[i]) {
        case "center":
          if (type === "lat") lines = lines.concat(getLine(type, cfg.center[0], "N"));else lines = lines.concat(getLine(type, cfg.center[1], "S"));
          break;

        case "outline":
          if (type === "lon") {
            lines = lines.concat(getLine(type, cfg.center[1] - 89.99, "S"));
            lines = lines.concat(getLine(type, cfg.center[1] + 89.99), "N");
          } else {
            // TODO: hemi
            lines = lines.concat(getLine(type, cfg.center[0] - 179.99, "E"));
            lines = lines.concat(getLine(type, cfg.center[0] + 179.99, "W"));
          }

          break;

        default:
          if (isNumber(loc[i])) {
            if (type === "lat") lines = lines.concat(getLine(type, loc[i], "N"));else lines = lines.concat(getLine(type, loc[i], "S"));
            break;
          }

      }
    } //return [{coordinates, value, orientation}, ...]


    return jsonGridValues(lines);
  }

  function jsonGridValues(lines) {
    var res = [];

    for (var i = 0; i < lines.length; i++) {
      var f = {
        type: "Feature",
        "id": i,
        properties: {},
        geometry: {
          type: "Point"
        }
      };
      f.properties.value = lines[i].value;
      f.properties.orientation = lines[i].orientation;
      f.geometry.coordinates = lines[i].coordinates;
      res.push(f);
    }

    return res;
  }

  function getLine(type, loc, orient) {
    var min,
        max,
        step,
        val,
        coord,
        tp = type,
        res = [],
        lr = loc;
    if (cfg.transform === "equatorial" && tp === "lon") tp = "ra";

    if (tp === "ra") {
      min = 0;
      max = 23;
      step = 1;
    } else if (tp === "lon") {
      min = 0;
      max = 350;
      step = 10;
    } else {
      min = -80;
      max = 80;
      step = 10;
    }

    for (var i = min; i <= max; i += step) {
      var o = orient;

      if (tp === "lat") {
        coord = [lr, i];
        val = i.toString() + "\xB0";
        if (i < 0) o += "S";else o += "N";
      } else if (tp === "ra") {
        coord = [i * 15, lr];
        val = i.toString() + "\u02B0";
      } else {
        coord = [i, lr];
        val = i.toString() + "\xB0";
      }

      res.push({
        coordinates: coord,
        value: val,
        orientation: o
      });
    }

    return res;
  }

  function transLine(c, leo) {
    var line = [];

    for (var i = 0; i < c.length; i++) {
      line.push(transformDeg(c[i], leo));
    }

    return line;
  }

  function transMultiLine(c, leo) {
    var lines = [];

    for (var i = 0; i < c.length; i++) {
      lines.push(transLine(c[i], leo));
    }

    return lines;
  }

  Celestial.getData = getData;
  Celestial.getPoint = getPoint;
  /* global d3, Celestial, has */
  //Defaults

  var settings = {
    width: 0,
    // Default width; height is determined by projection
    projection: "aitoff",
    // Map projection used: airy, aitoff, armadillo, august, azimuthalEqualArea, azimuthalEquidistant, baker, berghaus, boggs, bonne, bromley, collignon, craig, craster, cylindricalEqualArea, cylindricalStereographic, eckert1, eckert2, eckert3, eckert4, eckert5, eckert6, eisenlohr, equirectangular, fahey, foucaut, ginzburg4, ginzburg5, ginzburg6, ginzburg8, ginzburg9, gringorten, hammer, hatano, healpix, hill, homolosine, kavrayskiy7, lagrange, larrivee, laskowski, loximuthal, mercator, miller, mollweide, mtFlatPolarParabolic, mtFlatPolarQuartic, mtFlatPolarSinusoidal, naturalEarth, nellHammer, orthographic, patterson, polyconic, rectangularPolyconic, robinson, sinusoidal, stereographic, times, twoPointEquidistant, vanDerGrinten, vanDerGrinten2, vanDerGrinten3, vanDerGrinten4, wagner4, wagner6, wagner7, wiechel, winkel3
    transform: "equatorial",
    // Coordinate transformation: equatorial (default), ecliptic, galactic, supergalactic
    center: null,
    // Initial center coordinates in equatorial transformation [hours, degrees, degrees], 
    // otherwise [degrees, degrees, degrees], 3rd parameter is orientation, null = default center
    geopos: null,
    // optional initial geographic position [lat,lon] in degrees, overrides center
    follow: "zenith",
    // on which coordinates to center the map, default: zenith, if location enabled, otherwise center
    orientationfixed: true,
    // Keep orientation angle the same as center[2]
    adaptable: true,
    // Sizes are increased with higher zoom-levels
    interactive: true,
    // Enable zooming and rotation with mousewheel and dragging
    form: false,
    // Display settings form
    location: false,
    // Display location settings
    daterange: [],
    // Calender date range; null: displaydate-+10; [n<100]: displaydate-+n; [yr]: yr-+10; 
    // [yr, n<100]: [yr-n, yr+n]; [yr0, yr1]
    controls: true,
    // Display zoom controls
    lang: "",
    // Language for names, so far only for constellations: de: german, es: spanish
    // Default:en or empty string for english
    container: "celestial-map",
    // ID of parent element, e.g. div
    datapath: "data/",
    // Path/URL to data files, empty = subfolder 'data'
    stars: {
      show: true,
      // Show stars
      limit: 6,
      // Show only stars brighter than limit magnitude
      colors: true,
      // Show stars in spectral colors, if not use fill-style
      style: {
        fill: "#ffffff",
        opacity: 1
      },
      // Default style for stars
      names: true,
      // Show star names (Bayer, Flamsteed, Variable star, Gliese, whichever applies first)
      proper: false,
      // Show proper name (if present)
      desig: false,
      // Show all names, including Draper and Hipparcos
      namestyle: {
        fill: "#ddddbb",
        font: "11px 'Palatino Linotype', Georgia, Times, 'Times Roman', serif",
        align: "left",
        baseline: "top"
      },
      namelimit: 2.5,
      // Show only names for stars brighter than namelimit
      propernamestyle: {
        fill: "#ddddbb",
        font: "13px 'Palatino Linotype', Georgia, Times, 'Times Roman', serif",
        align: "right",
        baseline: "bottom"
      },
      propernamelimit: 1.5,
      // Show proper names for stars brighter than propernamelimit
      size: 7,
      // Scale size (radius) of star circle in pixels
      exponent: -0.28,
      // Scale exponent for star size, larger = more linear
      data: "stars.6.json" // Data source for stellar data

    },
    dsos: {
      show: true,
      // Show Deep Space Objects 
      limit: 6,
      // Show only DSOs brighter than limit magnitude
      names: true,
      // Show DSO names
      desig: true,
      // Show short DSO names
      namestyle: {
        fill: "#cccccc",
        font: "11px 'Lucida Sans Unicode', Helvetica, Arial, serif",
        align: "left",
        baseline: "top"
      },
      namelimit: 4,
      // Show only names for DSOs brighter than namelimit
      size: null,
      // Optional seperate scale size for DSOs, null = stars.size
      exponent: 1.4,
      // Scale exponent for DSO size, larger = more non-linear
      data: "dsos.bright.json",
      // Data source for DSOs
      symbols: {
        // DSO symbol styles
        gg: {
          shape: "circle",
          fill: "#ff0000"
        },
        // Galaxy cluster
        g: {
          shape: "ellipse",
          fill: "#ff0000"
        },
        // Generic galaxy
        s: {
          shape: "ellipse",
          fill: "#ff0000"
        },
        // Spiral galaxy
        s0: {
          shape: "ellipse",
          fill: "#ff0000"
        },
        // Lenticular galaxy
        sd: {
          shape: "ellipse",
          fill: "#ff0000"
        },
        // Dwarf galaxy
        e: {
          shape: "ellipse",
          fill: "#ff0000"
        },
        // Elliptical galaxy
        i: {
          shape: "ellipse",
          fill: "#ff0000"
        },
        // Irregular galaxy
        oc: {
          shape: "circle",
          fill: "#ff9900",
          stroke: "#ff9900",
          width: 2
        },
        // Open cluster
        gc: {
          shape: "circle",
          fill: "#ff9900"
        },
        // Globular cluster
        en: {
          shape: "square",
          fill: "#ff00cc"
        },
        // Emission nebula
        bn: {
          shape: "square",
          fill: "#ff00cc"
        },
        // Generic bright nebula
        sfr: {
          shape: "square",
          fill: "#cc00ff"
        },
        // Star forming region
        rn: {
          shape: "square",
          fill: "#0000ff"
        },
        // Reflection nebula
        pn: {
          shape: "diamond",
          fill: "#00cccc"
        },
        // Planetary nebula 
        snr: {
          shape: "diamond",
          fill: "#ff00cc"
        },
        // Supernova remnant
        dn: {
          shape: "square",
          fill: "#999999",
          stroke: "#999999",
          width: 2
        },
        // Dark nebula 
        pos: {
          shape: "marker",
          fill: "#cccccc",
          stroke: "#cccccc",
          width: 1.5 // Generic marker

        }
      }
    },
    constellations: {
      show: true,
      // Show constellations 
      names: true,
      // Show constellation names 
      desig: true,
      // Show short constellation names (3 letter designations)
      namestyle: {
        fill: "#cccc99",
        align: "center",
        baseline: "middle",
        opacity: 0.8,
        font: ["14px 'Lucida Sans Unicode', Helvetica, Arial, sans-serif", // Different fonts for brighter &
        "12px 'Lucida Sans Unicode', Helvetica, Arial, sans-serif", // sdarker constellations
        "11px 'Lucida Sans Unicode', Helvetica, Arial, sans-serif"]
      },
      lines: true,
      // Show constellation lines 
      linestyle: {
        stroke: "#cccccc",
        width: 1.5,
        opacity: 0.6
      },
      bounds: false,
      // Show constellation boundaries 
      boundstyle: {
        stroke: "#ccff00",
        width: 1,
        opacity: 0.8,
        dash: [2, 4]
      }
    },
    mw: {
      show: true,
      // Show Milky Way as filled polygons 
      style: {
        fill: "#ffffff",
        opacity: "0.15" // style for each MW-layer (5 on top of each other)

      }
    },
    lines: {
      graticule: {
        show: true,
        stroke: "#cccccc",
        width: 0.6,
        opacity: 0.8,
        // Show graticule lines 
        // grid values: "outline", "center", or [lat,...] specific position
        lon: {
          pos: [""],
          fill: "#eee",
          font: "10px 'Lucida Sans Unicode', Helvetica, Arial, sans-serif"
        },
        // grid values: "outline", "center", or [lon,...] specific position
        lat: {
          pos: [""],
          fill: "#eee",
          font: "10px 'Lucida Sans Unicode', Helvetica, Arial, sans-serif"
        }
      },
      equatorial: {
        show: true,
        stroke: "#aaaaaa",
        width: 1.3,
        opacity: 0.7
      },
      // Show equatorial plane 
      ecliptic: {
        show: true,
        stroke: "#66cc66",
        width: 1.3,
        opacity: 0.7
      },
      // Show ecliptic plane 
      galactic: {
        show: false,
        stroke: "#cc6666",
        width: 1.3,
        opacity: 0.7
      },
      // Show galactic plane 
      supergalactic: {
        show: false,
        stroke: "#cc66cc",
        width: 1.3,
        opacity: 0.7 // Show supergalactic plane 
        //mars: { show: false, stroke:"#cc0000", width:1.3, opacity:.7 }

      }
    },
    // Background style
    background: {
      fill: "#000000",
      opacity: 1,
      stroke: "#000000",
      // Outline
      width: 1.5
    },
    horizon: {
      //Show horizon marker, if geo-position and date-time is set
      show: false,
      stroke: "#000099",
      // Line
      width: 1.0,
      fill: "#000000",
      // Area below horizon
      opacity: 0.5
    },
    planets: {
      //Show planet locations, if date-time is set
      show: false,
      which: ["sol", "mer", "ven", "ter", "lun", "mar", "jup", "sat", "ura", "nep"],
      style: {
        fill: "#00ccff",
        font: "bold 17px 'Lucida Sans Unicode', Consolas, sans-serif",
        align: "center",
        baseline: "middle"
      },
      symbols: {
        "sol": {
          symbol: "\u2609",
          fill: "#ffff00"
        },
        "mer": {
          symbol: "\u263F",
          fill: "#cccccc"
        },
        "ven": {
          symbol: "\u2640",
          fill: "#eeeecc"
        },
        "ter": {
          symbol: "\u2295",
          fill: "#00ffff"
        },
        "lun": {
          symbol: "\u25CF",
          fill: "#ffffff"
        },
        "mar": {
          symbol: "\u2642",
          fill: "#ff9999"
        },
        "cer": {
          symbol: "\u26B3",
          fill: "#cccccc"
        },
        "ves": {
          symbol: "\u26B6",
          fill: "#cccccc"
        },
        "jup": {
          symbol: "\u2643",
          fill: "#ff9966"
        },
        "sat": {
          symbol: "\u2644",
          fill: "#ffcc66"
        },
        "ura": {
          symbol: "\u2645",
          fill: "#66ccff"
        },
        "nep": {
          symbol: "\u2646",
          fill: "#6666ff"
        },
        "plu": {
          symbol: "\u2647",
          fill: "#aaaaaa"
        },
        "eri": {
          symbol: "\u26AA",
          fill: "#eeeeee"
        }
      }
    },
    daylight: {
      // Show daylight marker (tbi)
      show: false,
      fill: "#fff",
      opacity: 0.4
    },
    set: function set(cfg) {
      // Override defaults with values of cfg
      var prop,
          key,
          res = {};
      if (!cfg) return this;

      for (prop in this) {
        if (!has(this, prop)) continue; //if (typeof(this[prop]) === 'function'); 

        if (!has(cfg, prop) || cfg[prop] === null) {
          res[prop] = this[prop];
        } else if (this[prop] === null || this[prop].constructor != Object) {
          res[prop] = cfg[prop];
        } else {
          res[prop] = {};

          for (key in this[prop]) {
            if (has(cfg[prop], key)) {
              res[prop][key] = cfg[prop][key];
            } else {
              res[prop][key] = this[prop][key];
            }
          }
        }
      }

      return res;
    }
  };

  Celestial.settings = function () {
    return settings;
  }; //b-v color index to rgb color value scale


  var bvcolor = d3.scale.quantize().domain([3.347, -0.335]) //main sequence <= 1.7
  .range(['#ff4700', '#ff4b00', '#ff4f00', '#ff5300', '#ff5600', '#ff5900', '#ff5b00', '#ff5d00', '#ff6000', '#ff6300', '#ff6500', '#ff6700', '#ff6900', '#ff6b00', '#ff6d00', '#ff7000', '#ff7300', '#ff7500', '#ff7800', '#ff7a00', '#ff7c00', '#ff7e00', '#ff8100', '#ff8300', '#ff8506', '#ff870a', '#ff8912', '#ff8b1a', '#ff8e21', '#ff9127', '#ff932c', '#ff9631', '#ff9836', '#ff9a3c', '#ff9d3f', '#ffa148', '#ffa34b', '#ffa54f', '#ffa753', '#ffa957', '#ffab5a', '#ffad5e', '#ffb165', '#ffb269', '#ffb46b', '#ffb872', '#ffb975', '#ffbb78', '#ffbe7e', '#ffc184', '#ffc489', '#ffc78f', '#ffc892', '#ffc994', '#ffcc99', '#ffce9f', '#ffd1a3', '#ffd3a8', '#ffd5ad', '#ffd7b1', '#ffd9b6', '#ffdbba', '#ffddbe', '#ffdfc2', '#ffe1c6', '#ffe3ca', '#ffe4ce', '#ffe8d5', '#ffe9d9', '#ffebdc', '#ffece0', '#ffefe6', '#fff0e9', '#fff2ec', '#fff4f2', '#fff5f5', '#fff6f8', '#fff9fd', '#fef9ff', '#f9f6ff', '#f6f4ff', '#f3f2ff', '#eff0ff', '#ebeeff', '#e9edff', '#e6ebff', '#e3e9ff', '#e0e7ff', '#dee6ff', '#dce5ff', '#d9e3ff', '#d7e2ff', '#d3e0ff', '#c9d9ff', '#bfd3ff', '#b7ceff', '#afc9ff', '#a9c5ff', '#a4c2ff', '#9fbfff', '#9bbcff']);
  /* Default parameters for each supported projection
       arg: constructor argument, if any 
       scale: scale parameter so that they all have ~equal width, normalized to 1024 pixels
       ratio: width/height ratio, 2.0 if none
       clip: projection clipped to 90 degrees from center, otherwise to antimeridian
  */

  var projections = {
    "airy": {
      n: "Airy’s Minimum Error",
      arg: Math.PI / 2,
      scale: 360,
      ratio: 1.0,
      clip: true
    },
    "aitoff": {
      n: "Aitoff",
      arg: null,
      scale: 162
    },
    "armadillo": {
      n: "Armadillo",
      arg: 0,
      scale: 250
    },
    "august": {
      n: "August",
      arg: null,
      scale: 94,
      ratio: 1.4
    },
    "azimuthalEqualArea": {
      n: "Azimuthal Equal Area",
      arg: null,
      scale: 340,
      ratio: 1.0,
      clip: true
    },
    "azimuthalEquidistant": {
      n: "Azimuthal Equidistant",
      arg: null,
      scale: 320,
      ratio: 1.0,
      clip: true
    },
    "baker": {
      n: "Baker Dinomic",
      arg: null,
      scale: 160,
      ratio: 1.4
    },
    "berghaus": {
      n: "Berghaus Star",
      arg: 0,
      scale: 320,
      ratio: 1.0,
      clip: true
    },
    "boggs": {
      n: "Boggs Eumorphic",
      arg: null,
      scale: 170
    },
    "bonne": {
      n: "Bonne",
      arg: Math.PI / 2.5,
      scale: 225,
      ratio: 0.88
    },
    "bromley": {
      n: "Bromley",
      arg: null,
      scale: 162
    },
    //  "butterfly": {n:"Butterfly", arg:null, scale:31, ratio:1.1, clip:true},
    "cassini": {
      n: "Cassini",
      arg: null,
      scale: 325,
      ratio: 1.0,
      clip: true
    },
    "collignon": {
      n: "Collignon",
      arg: null,
      scale: 100,
      ratio: 2.6
    },
    "craig": {
      n: "Craig Retroazimuthal",
      arg: 0,
      scale: 310,
      ratio: 1.5,
      clip: true
    },
    "craster": {
      n: "Craster Parabolic",
      arg: null,
      scale: 160
    },
    "cylindricalEqualArea": {
      n: "Cylindrical Equal Area",
      arg: Math.PI / 6,
      scale: 190,
      ratio: 2.3
    },
    "cylindricalStereographic": {
      n: "Cylindrical Stereographic",
      arg: Math.PI / 4,
      scale: 230,
      ratio: 1.3
    },
    "eckert1": {
      n: "Eckert I",
      arg: null,
      scale: 175
    },
    "eckert2": {
      n: "Eckert II",
      arg: null,
      scale: 175
    },
    "eckert3": {
      n: "Eckert III",
      arg: null,
      scale: 190
    },
    "eckert4": {
      n: "Eckert IV",
      arg: null,
      scale: 190
    },
    "eckert5": {
      n: "Eckert V",
      arg: null,
      scale: 182
    },
    "eckert6": {
      n: "Eckert VI",
      arg: null,
      scale: 182
    },
    "eisenlohr": {
      n: "Eisenlohr",
      arg: null,
      scale: 102
    },
    "equirectangular": {
      n: "Equirectangular",
      arg: null,
      scale: 165
    },
    "fahey": {
      n: "Fahey",
      arg: null,
      scale: 196,
      ratio: 1.4
    },
    "mtFlatPolarParabolic": {
      n: "Flat Polar Parabolic",
      arg: null,
      scale: 175
    },
    "mtFlatPolarQuartic": {
      n: "Flat Polar Quartic",
      arg: null,
      scale: 230,
      ratio: 1.65
    },
    "mtFlatPolarSinusoidal": {
      n: "Flat Polar Sinusoidal",
      arg: null,
      scale: 175,
      ratio: 1.9
    },
    "foucaut": {
      n: "Foucaut",
      arg: null,
      scale: 142
    },
    "ginzburg4": {
      n: "Ginzburg IV",
      arg: null,
      scale: 180,
      ratio: 1.7
    },
    "ginzburg5": {
      n: "Ginzburg V",
      arg: null,
      scale: 196,
      ratio: 1.55
    },
    "ginzburg6": {
      n: "Ginzburg VI",
      arg: null,
      scale: 190,
      ratio: 1.4
    },
    "ginzburg8": {
      n: "Ginzburg VIII",
      arg: null,
      scale: 205,
      ratio: 1.3
    },
    "ginzburg9": {
      n: "Ginzburg IX",
      arg: null,
      scale: 190,
      ratio: 1.4
    },
    //"guyou": {n:"Guyou", arg:null, scale:160, ratio:2, clip:true},
    //"bonne": {n:"Heart", arg:Math.PI/2.5, scale:225, ratio:0.88},
    "homolosine": {
      n: "Goode Homolosine",
      arg: null,
      scale: 160,
      ratio: 2.2
    },
    "hammer": {
      n: "Hammer",
      arg: 2,
      scale: 180
    },
    "hatano": {
      n: "Hatano",
      arg: null,
      scale: 186
    },
    "healpix": {
      n: "HEALPix",
      arg: 1,
      scale: 320,
      ratio: 1.2
    },
    "hill": {
      n: "Hill Eucyclic",
      arg: 2,
      scale: 190,
      ratio: 1.1
    },
    "kavrayskiy7": {
      n: "Kavrayskiy VII",
      arg: null,
      scale: 185,
      ratio: 1.75
    },
    "lagrange": {
      n: "Lagrange",
      arg: Math.PI / 4,
      scale: 88,
      ratio: 1.6,
      clip: false
    },
    "larrivee": {
      n: "l'Arrivée",
      arg: null,
      scale: 160,
      ratio: 1.25
    },
    "laskowski": {
      n: "Laskowski Tri-Optimal",
      arg: null,
      scale: 165,
      ratio: 1.7
    },
    "loximuthal": {
      n: "Loximuthal",
      arg: Math.PI / 4,
      scale: 175,
      ratio: 1.8
    },
    "mercator": {
      n: "Mercator",
      arg: null,
      scale: 160,
      ratio: 1.3
    },
    "miller": {
      n: "Miller",
      arg: null,
      scale: 160,
      ratio: 1.5
    },
    "mollweide": {
      n: "Mollweide",
      arg: null,
      scale: 180
    },
    "naturalEarth": {
      n: "Natural Earth",
      arg: null,
      scale: 185,
      ratio: 1.85
    },
    "nellHammer": {
      n: "Nell Hammer",
      arg: null,
      scale: 160,
      ratio: 2.6
    },
    "orthographic": {
      n: "Orthographic",
      arg: null,
      scale: 480,
      ratio: 1.0,
      clip: true
    },
    "patterson": {
      n: "Patterson Cylindrical",
      arg: null,
      scale: 160,
      ratio: 1.75
    },
    "polyconic": {
      n: "Polyconic",
      arg: null,
      scale: 160,
      ratio: 1.3
    },
    "quincuncial": {
      n: "Quincuncial",
      arg: null,
      scale: 160,
      ratio: 1.3
    },
    "rectangularPolyconic": {
      n: "Rectangular Polyconic",
      arg: 0,
      scale: 160,
      ratio: 1.65
    },
    "robinson": {
      n: "Robinson",
      arg: null,
      scale: 160
    },
    "sinusoidal": {
      n: "Sinusoidal",
      arg: null,
      scale: 160,
      ratio: 2
    },
    "stereographic": {
      n: "Stereographic",
      arg: null,
      scale: 500,
      ratio: 1.0,
      clip: true
    },
    "times": {
      n: "Times",
      arg: null,
      scale: 210,
      ratio: 1.4
    },
    "twoPointEquidistant": {
      n: "Two-Point Equidistant",
      arg: Math.PI / 2,
      scale: 320,
      ratio: 1.15,
      clip: true
    },
    "vanDerGrinten": {
      n: "van Der Grinten",
      arg: null,
      scale: 160,
      ratio: 1.0
    },
    "vanDerGrinten2": {
      n: "van Der Grinten II",
      arg: null,
      scale: 160,
      ratio: 1.0
    },
    "vanDerGrinten3": {
      n: "van Der Grinten III",
      arg: null,
      scale: 160,
      ratio: 1.0
    },
    "vanDerGrinten4": {
      n: "van Der Grinten IV",
      arg: null,
      scale: 160,
      ratio: 1.6
    },
    "wagner4": {
      n: "Wagner IV",
      arg: null,
      scale: 185
    },
    "wagner6": {
      n: "Wagner VI",
      arg: null,
      scale: 160
    },
    "wagner7": {
      n: "Wagner VII",
      arg: null,
      scale: 190,
      ratio: 1.8
    },
    "wiechel": {
      n: "Wiechel",
      arg: null,
      scale: 360,
      ratio: 1.0,
      clip: true
    },
    "winkel3": {
      n: "Winkel Tripel",
      arg: null,
      scale: 196,
      ratio: 1.7
    }
  };

  Celestial.projections = function () {
    return projections;
  };
  /* global Celestial */


  var Canvas = {};

  Canvas.symbol = function () {
    // parameters and default values
    var type = d3.functor("circle"),
        size = d3.functor(64),
        age = d3.functor(Math.PI),
        //crescent shape 0..2Pi
    color = d3.functor("#fff"),
        text = d3.functor(""),
        padding = d3.functor([2, 2]),
        pos;

    function canvas_symbol(context) {
      draw_symbol[type()](context);
    }

    var draw_symbol = {
      "circle": function circle(ctx) {
        var s = Math.sqrt(size()),
            r = s / 2;
        ctx.arc(pos[0], pos[1], r, 0, 2 * Math.PI);
        return r;
      },
      "square": function square(ctx) {
        var s = Math.sqrt(size()),
            r = s / 1.7;
        ctx.moveTo(pos[0] - r, pos[1] - r);
        ctx.lineTo(pos[0] + r, pos[1] - r);
        ctx.lineTo(pos[0] + r, pos[1] + r);
        ctx.lineTo(pos[0] - r, pos[1] + r);
        ctx.closePath();
        return r;
      },
      "diamond": function diamond(ctx) {
        var s = Math.sqrt(size()),
            r = s / 1.5;
        ctx.moveTo(pos[0], pos[1] - r);
        ctx.lineTo(pos[0] + r, pos[1]);
        ctx.lineTo(pos[0], pos[1] + r);
        ctx.lineTo(pos[0] - r, pos[1]);
        ctx.closePath();
        return r;
      },
      "triangle": function triangle(ctx) {
        var s = Math.sqrt(size()),
            r = s / Math.sqrt(3);
        ctx.moveTo(pos[0], pos[1] - r);
        ctx.lineTo(pos[0] + r, pos[1] + r);
        ctx.lineTo(pos[0] - r, pos[1] + r);
        ctx.closePath();
        return r;
      },
      "ellipse": function ellipse(ctx) {
        var s = Math.sqrt(size()),
            r = s / 2;
        ctx.save();
        ctx.translate(pos[0], pos[1]);
        ctx.scale(1.6, 0.8);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.restore();
        return r;
      },
      "marker": function marker(ctx) {
        var s = Math.sqrt(size()),
            r = s / 2;
        ctx.moveTo(pos[0], pos[1] - r);
        ctx.lineTo(pos[0], pos[1] + r);
        ctx.moveTo(pos[0] - r, pos[1]);
        ctx.lineTo(pos[0] + r, pos[1]);
        ctx.closePath();
        return r;
      },
      "cross-circle": function crossCircle(ctx) {
        var s = Math.sqrt(size()),
            r = s / 2;
        ctx.moveTo(pos[0], pos[1] - s);
        ctx.lineTo(pos[0], pos[1] + s);
        ctx.moveTo(pos[0] - s, pos[1]);
        ctx.lineTo(pos[0] + s, pos[1]);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos[0], pos[1]);
        ctx.arc(pos[0], pos[1], r, 0, 2 * Math.PI);
        ctx.closePath();
        return r;
      },
      "stroke-circle": function strokeCircle(ctx) {
        var s = Math.sqrt(size()),
            r = s / 2;
        ctx.moveTo(pos[0], pos[1] - s);
        ctx.lineTo(pos[0], pos[1] + s);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos[0], pos[1]);
        ctx.arc(pos[0], pos[1], r, 0, 2 * Math.PI);
        ctx.closePath();
        return r;
      },
      "crescent": function crescent(ctx) {
        var s = Math.sqrt(size()),
            r = s / 2,
            ag = age(),
            ph = 0.5 * (1 - Math.cos(ag)),
            e = 1.6 * Math.abs(ph - 0.5) + 0.01,
            dir = ag > Math.PI,
            termdir = Math.abs(ph) > 0.5 ? dir : !dir;
        ctx.save();
        ctx.fillStyle = "#557";
        ctx.moveTo(pos[0], pos[1]);
        ctx.arc(pos[0], pos[1], r, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#eee";
        ctx.beginPath();
        ctx.moveTo(pos[0], pos[1]);
        ctx.arc(pos[0], pos[1], r, -Math.PI / 2, Math.PI / 2, dir);
        ctx.scale(e, 1);
        ctx.arc(pos[0] / e, pos[1], r, Math.PI / 2, -Math.PI / 2, termdir);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
        return r;
      }
    };

    canvas_symbol.type = function (_) {
      if (!arguments.length) return type;
      type = d3.functor(_);
      return canvas_symbol;
    };

    canvas_symbol.size = function (_) {
      if (!arguments.length) return size;
      size = d3.functor(_);
      return canvas_symbol;
    };

    canvas_symbol.age = function (_) {
      if (!arguments.length) return age;
      age = d3.functor(_);
      return canvas_symbol;
    };

    canvas_symbol.text = function (_) {
      if (!arguments.length) return text;
      text = d3.functor(_);
      return canvas_symbol;
    };

    canvas_symbol.position = function (_) {
      if (!arguments.length) return;
      pos = _;
      return canvas_symbol;
    };

    return canvas_symbol;
  };

  Celestial.Canvas = Canvas;
  /*var color = "#fff", angle = 0, align = "center", baseline = "middle", font = "10px sans-serif", padding = [0,0], aPos, sText;
  
  canvas.text = function () {
  
    function txt(ctx){
      ctx.fillStyle = color;
      ctx.textAlign = align;
      ctx.textBaseline = baseline;
      
      //var pt = projection(d.geometry.coordinates);
      if (angle) {
        canvas.save();     
        canvas.translate(aPos[0], aPos[1]);
        canvas.rotate(angle); 
        canvas.fillText(sText, 0, 0);
        canvas.restore();     
      } else
        canvas.fillText(sText, aPos[0], aPos[1]);
    }
    
    txt.angle = function(x) {
      if (!arguments.length) return angle * 180 / Math.PI;
      color = x  * Math.PI / 180;
      return txt;
    };  
    txt.color = function(s) {
      if (!arguments.length) return color;
      color = s;
      return txt;
    };  
    txt.align = function(s) {
      if (!arguments.length) return align;
      align = s;
      return txt;
    };
    txt.baseline = function(s) {
      if (!arguments.length) return baseline;
      baseline = s;
      return txt;
    };
    txt.padding = function(a) {
      if (!arguments.length) return padding;
      padding = a;
      return txt;
    };
    txt.text = function(s) {
      if (!arguments.length) return sText;
      sText = s;
      return txt;
    };
    txt.font = function(s) {
      if (!arguments.length) return font;
      font = s;
      return txt;
    };
    txt.style = function(o) {
      if (!arguments.length) return;
      if (o.fill) color = o.fill;
      if (o.font) font = o.font;
      return txt;
    }; 
    
  }
  
    function ctxPath(d) {
      var pt;
      //d.map( function(axe, i) {
      context.beginPath();
      for (var i = 0; i < d.length; i++) {
        pt = projection(d[i]);
        if (i === 0)
          context.moveTo(pt[0], pt[1]);
        else
          context.lineTo(pt[0], pt[1]);
      }
      context.fill();
    }
    
  
    function ctxText(d, ang) {
      var pt = projection(d.geometry.coordinates);
      if (ang) {
        canvas.save();     
        canvas.translate(pt[0], pt[1]);
        canvas.rotate(Math.PI/2); 
        canvas.fillText(txt, 0, 0);
        canvas.restore();     
      } else
        canvas.fillText(d.properties.txt, pt[0], pt[1]);
    }
    
  
  */

  /* global τ, halfπ, deg2rad */

  function $(id) {
    return document.getElementById(id);
  }

  function px(n) {
    return n + "px";
  }

  function Round(x, dg) {
    return Math.round(Math.pow(10, dg) * x) / Math.pow(10, dg);
  }

  function sign(x) {
    return x ? x < 0 ? -1 : 1 : 0;
  }

  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  function has(o, key) {
    return o !== null && hasOwnProperty.call(o, key);
  }

  function when(o, key, val) {
    return o !== null && hasOwnProperty.call(o, key) ? o[key] : val;
  }

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function isArray(o) {
    return Object.prototype.toString.call(o) === "[object Array]";
  }

  function isObject(o) {
    var type = _typeof(o);

    return type === 'function' || type === 'object' && !!o;
  }

  function isFunction(o) {
    return typeof o == 'function' || false;
  }

  function findPos(o) {
    var l = 0,
        t = 0;

    if (o.offsetParent) {
      do {
        l += o.offsetLeft;
        t += o.offsetTop;
      } while ((o = o.offsetParent) !== null);
    }

    return [l, t];
  }

  function hasParent(t, id) {
    while (t.parentNode) {
      if (t.id === id) return true;
      t = t.parentNode;
    }

    return false;
  }

  function attach(node, event, func) {
    if (node.addEventListener) node.addEventListener(event, func, false);else node.attachEvent("on" + event, func);
  }

  function stopPropagation(e) {
    if (typeof e.stopPropagation != "undefined") e.stopPropagation();else e.cancelBubble = true;
  }

  function dateDiff(dt1, dt2, type) {
    var diff = dt2.valueOf() - dt1.valueOf(),
        tp = type || "d";

    switch (tp) {
      case 'y':
      case 'yr':
        diff /= 31556926080;
        break;

      case 'm':
      case 'mo':
        diff /= 2629800000;
        break;

      case 'd':
      case 'dy':
        diff /= 86400000;
        break;

      case 'h':
      case 'hr':
        diff /= 3600000;
        break;

      case 'n':
      case 'mn':
        diff /= 60000;
        break;

      case 's':
      case 'sec':
        diff /= 1000;
        break;

      case 'ms':
        break;
    }

    return Math.floor(diff);
  }

  function dateParse(s) {
    if (!s) return;
    var t = s.split(".");
    if (t.length < 1) return;
    t = t[0].split("-");
    t[0] = t[0].replace(/\D/g, "");
    if (!t[0]) return;
    t[1] = t[1] ? t[1].replace(/\D/g, "") : "1";
    t[2] = t[2] ? t[2].replace(/\D/g, "") : "1"; //Fraction -> h:m:s

    return new Date(Date.UTC(t[0], t[1] - 1, t[2]));
  }

  function interpolateAngle(a1, a2, t) {
    a1 = (a1 * deg2rad + τ) % τ;
    a2 = (a2 * deg2rad + τ) % τ;

    if (Math.abs(a1 - a2) > Math.PI) {
      if (a1 > a2) a1 = a1 - τ;else if (a2 > a1) a2 = a2 - τ;
    }

    return d3.interpolateNumber(a1 / deg2rad, a2 / deg2rad);
  }

  var Trig = {
    sinh: function sinh(val) {
      return (Math.pow(Math.E, val) - Math.pow(Math.E, -val)) / 2;
    },
    cosh: function cosh(val) {
      return (Math.pow(Math.E, val) + Math.pow(Math.E, -val)) / 2;
    },
    tanh: function tanh(val) {
      return 2.0 / (1.0 + Math.exp(-2.0 * val)) - 1.0;
    },
    asinh: function asinh(val) {
      return Math.log(val + Math.sqrt(val * val + 1));
    },
    acosh: function acosh(val) {
      return Math.log(val + Math.sqrt(val * val - 1));
    },
    normalize0: function normalize0(val) {
      return (val + Math.PI * 3) % (Math.PI * 2) - Math.PI;
    },
    normalize: function normalize(val) {
      return (val + Math.PI * 2) % (Math.PI * 2);
    },
    cartesian: function cartesian(p) {
      var ϕ = p[0],
          θ = halfπ - p[1],
          r = p[2];
      return {
        "x": r * Math.sin(θ) * Math.cos(ϕ),
        "y": r * Math.sin(θ) * Math.sin(ϕ),
        "z": r * Math.cos(θ)
      };
    },
    spherical: function spherical(p) {
      var r = Math.sqrt(p.x * p.x + p.y * p.y + p.z * p.z),
          θ = Math.atan(p.y / p.x),
          ϕ = Math.acos(p.z / r);
      return [θ / deg2rad, ϕ / deg2rad, r];
    }
  };
  /* global Celestial, settings, $, px, has, isNumber, findPos */
  //display settings form in div with id "celestial-form"

  function form(cfg) {
    var config = settings.set(cfg);
    var prj = Celestial.projections(),
        leo = Celestial.eulerAngles();
    var ctrl = d3.select("#celestial-form").append("div").attr("class", "ctrl");
    var frm = ctrl.append("form").attr("id", "params").attr("name", "params").attr("method", "get").attr("action", "#"); //Map parameters    

    var col = frm.append("div").attr("class", "col").attr("id", "general");
    col.append("label").attr("title", "Map width in pixel, 0 indicates full width").attr("for", "width").html("Width ");
    col.append("input").attr("type", "number").attr("maxlength", "4").attr("max", "20000").attr("min", "0").attr("title", "Map width").attr("id", "width").attr("value", config.width).on("change", resize);
    col.append("span").html("px");
    col.append("label").attr("title", "Map projection, (hemi) indicates hemispherical projection").attr("for", "projection").html("Projection");
    var sel = col.append("select").attr("id", "projection").on("change", reproject);
    var selected = 0;
    var list = Object.keys(prj).map(function (key, i) {
      var n = prj[key].clip && prj[key].clip === true ? prj[key].n + " (hemi)" : prj[key].n;
      if (key === config.projection) selected = i;
      return {
        o: key,
        n: n
      };
    });
    sel.selectAll('option').data(list).enter().append('option').attr("value", function (d) {
      return d.o;
    }).text(function (d) {
      return d.n;
    });
    sel.property("selectedIndex", selected);
    selected = 0;
    col.append("label").attr("title", "Coordinate space in which the map is displayed").attr("for", "transform").html("Coordinates");
    sel = col.append("select").attr("id", "transform").on("change", reload);
    list = Object.keys(leo).map(function (key, i) {
      if (key === config.transform) selected = i;
      return {
        o: key,
        n: key.replace(/^([a-z])/, function (s, m) {
          return m.toUpperCase();
        })
      };
    });
    sel.selectAll("option").data(list).enter().append('option').attr("value", function (d) {
      return d.o;
    }).text(function (d) {
      return d.n;
    });
    sel.property("selectedIndex", selected);
    col.append("br");
    col.append("label").attr("title", "Center coordinates long/lat in selected coordinate space").attr("for", "centerx").html("Center");
    col.append("input").attr("type", "number").attr("id", "centerx").attr("title", "Center right ascension/longitude").attr("max", "24").attr("min", "0").attr("step", "0.1").on("change", turn);
    col.append("span").attr("id", "cxunit").html("h"); //addList("centerx", "ra");

    col.append("input").attr("type", "number").attr("id", "centery").attr("title", "Center declination/latitude").attr("max", "90").attr("min", "-90").attr("step", "0.1").on("change", turn);
    col.append("span").html("\xB0");
    col.append("label").attr("title", "Orientation").attr("for", "centerz").html("Orientation");
    col.append("input").attr("type", "number").attr("id", "centerz").attr("title", "Center orientation").attr("max", "180").attr("min", "-180").attr("step", "0.1").on("change", turn);
    col.append("span").html("\xB0");
    col.append("label").attr("for", "orientationfixed").html("Fixed");
    col.append("input").attr("type", "checkbox").attr("id", "orientationfixed").property("checked", config.orientationfixed).on("change", apply);
    col.append("label").attr("title", "Center and zoom in on this constellation").attr("for", "constellation").html("Show");
    col.append("select").attr("id", "constellation").on("change", showConstellation);
    setCenter(config.center, config.transform); // Stars 

    col = frm.append("div").attr("class", "col").attr("id", "stars");
    col.append("label").attr("class", "header").attr("for", "stars-show").html("Stars");
    col.append("input").attr("type", "checkbox").attr("id", "stars-show").property("checked", config.stars.show).on("change", apply);
    col.append("label").attr("for", "stars-limit").html("down to magnitude");
    col.append("input").attr("type", "number").attr("id", "stars-limit").attr("title", "Star display limit (magnitude)").attr("value", config.stars.limit).attr("max", "6").attr("min", "-1").attr("step", "0.1").on("change", apply);
    col.append("label").attr("for", "stars-colors").html("with spectral colors");
    col.append("input").attr("type", "checkbox").attr("id", "stars-colors").property("checked", config.stars.colors).on("change", apply);
    col.append("label").attr("for", "stars-color").html("or default color ");
    col.append("input").attr("type", "color").attr("autocomplete", "off").attr("id", "stars-style-fill").attr("title", "Star color").property("value", config.stars.style.fill).on("change", apply);
    col.append("br");
    col.append("label").attr("for", "stars-names").html("Show designations");
    col.append("input").attr("type", "checkbox").attr("id", "stars-names").property("checked", config.stars.names).on("change", apply);
    col.append("label").attr("for", "stars-namelimit").html("down to mag");
    col.append("input").attr("type", "number").attr("id", "stars-namelimit").attr("title", "Star designaton display limit (magnitude)").attr("value", config.stars.namelimit).attr("max", "6").attr("min", "-1").attr("step", "0.1").on("change", apply);
    col.append("label").attr("for", "stars-desig").attr("title", "include HD/HIP designations").html("all");
    col.append("input").attr("type", "checkbox").attr("id", "stars-desig").property("checked", config.stars.desig).on("change", apply);
    col.append("label").attr("for", "stars-proper").html("proper names");
    col.append("input").attr("type", "checkbox").attr("id", "stars-proper").property("checked", config.stars.proper).on("change", apply);
    col.append("label").attr("for", "stars-propernamelimit").html("down to mag");
    col.append("input").attr("type", "number").attr("id", "stars-propernamelimit").attr("title", "Star name display limit (magnitude)").attr("value", config.stars.propernamelimit).attr("max", "6").attr("min", "-1").attr("step", "0.1").on("change", apply);
    col.append("br");
    col.append("label").attr("for", "stars-size").html("Stellar disk size: base");
    col.append("input").attr("type", "number").attr("id", "stars-size").attr("title", "Size of the displayed star disk; base").attr("value", config.stars.size).attr("max", "100").attr("min", "0").attr("step", "0.1").on("change", apply);
    col.append("label").attr("for", "stars-exponent").html(" * e ^ (exponent");
    col.append("input").attr("type", "number").attr("id", "stars-exponent").attr("title", "Size of the displayed star disk; exponent").attr("value", config.stars.exponent).attr("max", "3").attr("min", "-1").attr("step", "0.01").on("change", apply);
    col.append("span").text(" * (magnitude + 2))  [* adaptation]");
    enable($("stars-show")); // DSOs 

    col = frm.append("div").attr("class", "col").attr("id", "dsos");
    col.append("label").attr("class", "header").attr("title", "Deep Space Objects").attr("for", "dsos-show").html("DSOs");
    col.append("input").attr("type", "checkbox").attr("id", "dsos-show").property("checked", config.dsos.show).on("change", apply);
    col.append("label").attr("for", "dsos-limit").html("down to mag");
    col.append("input").attr("type", "number").attr("id", "dsos-limit").attr("title", "DSO display limit (magnitude)").attr("value", config.dsos.limit).attr("max", "6").attr("min", "0").attr("step", "0.1").on("change", apply);
    col.append("label").attr("for", "dsos-names").html("with names");
    col.append("input").attr("type", "checkbox").attr("id", "dsos-names").property("checked", config.dsos.names).on("change", apply);
    col.append("label").attr("for", "dsos-desig").html("or designations");
    col.append("input").attr("type", "checkbox").attr("id", "dsos-desig").property("checked", config.dsos.desig).on("change", apply);
    col.append("label").attr("for", "dsos-namelimit").html("down to mag");
    col.append("input").attr("type", "number").attr("id", "dsos-namelimit").attr("title", "DSO name display limit (magnitude)").attr("value", config.dsos.namelimit).attr("max", "6").attr("min", "0").attr("step", "0.1").on("change", apply);
    col.append("br");
    col.append("label").attr("for", "dsos-size").html("DSO symbol size: (base");
    col.append("input").attr("type", "number").attr("id", "dsos-size").attr("title", "Size of the displayed symbol: base").attr("value", config.dsos.size).attr("max", "100").attr("min", "0").attr("step", "0.1").on("change", apply);
    col.append("label").attr("for", "dsos-exponent").html(" * 2 [* adaptation] - magnitude) ^ exponent");
    col.append("input").attr("type", "number").attr("id", "dsos-exponent").attr("title", "Size of the displayed symbol; exponent").attr("value", config.dsos.exponent).attr("max", "3").attr("min", "-1").attr("step", "0.01").on("change", apply);
    enable($("dsos-show")); // Constellations 

    col = frm.append("div").attr("class", "col").attr("id", "constellations");
    col.append("label").attr("class", "header").html("Constellations"); //col.append("input").attr("type", "checkbox").attr("id", "constellations-show").property("checked", config.constellations.show).on("change", apply);

    col.append("label").attr("for", "constellations-names").html("Show names");
    col.append("input").attr("type", "checkbox").attr("id", "constellations-names").property("checked", config.constellations.names).on("change", apply);
    col.append("label").attr("for", "constellations-desig").html("abbreviated");
    col.append("input").attr("type", "checkbox").attr("id", "constellations-desig").property("checked", config.constellations.desig).on("change", apply);
    col.append("label").attr("for", "constellations-lines").html("with lines");
    col.append("input").attr("type", "checkbox").attr("id", "constellations-lines").property("checked", config.constellations.lines).on("change", apply);
    col.append("label").attr("for", "constellations-bounds").html("with boundaries");
    col.append("input").attr("type", "checkbox").attr("id", "constellations-bounds").property("checked", config.constellations.bounds).on("change", apply);
    enable($("constellations-names")); // graticules & planes 

    col = frm.append("div").attr("class", "col").attr("id", "lines");
    col.append("label").attr("class", "header").html("Lines");
    col.append("label").attr("title", "Laitudet/longitude grid lines").attr("for", "lines-graticule").html("Graticule");
    col.append("input").attr("type", "checkbox").attr("id", "lines-graticule-show").property("checked", config.lines.graticule.show).on("change", apply);
    col.append("label").attr("for", "lines-equatorial").html("Equator");
    col.append("input").attr("type", "checkbox").attr("id", "lines-equatorial-show").property("checked", config.lines.equatorial.show).on("change", apply);
    col.append("label").attr("for", "lines-ecliptic").html("Ecliptic");
    col.append("input").attr("type", "checkbox").attr("id", "lines-ecliptic-show").property("checked", config.lines.ecliptic.show).on("change", apply);
    col.append("label").attr("for", "lines-galactic").html("Galactic plane");
    col.append("input").attr("type", "checkbox").attr("id", "lines-galactic-show").property("checked", config.lines.galactic.show).on("change", apply);
    col.append("label").attr("for", "lines-supergalactic").html("Supergalactic plane");
    col.append("input").attr("type", "checkbox").attr("id", "lines-supergalactic-show").property("checked", config.lines.supergalactic.show).on("change", apply); // Other

    col = frm.append("div").attr("class", "col").attr("id", "other");
    col.append("label").attr("class", "header").html("Other");
    col.append("label").attr("for", "mw-show").html("Milky Way");
    col.append("input").attr("type", "checkbox").attr("id", "mw-show").property("checked", config.mw.show).on("change", apply);
    col.append("label").attr("for", "mw-style-fill").html(" color");
    col.append("input").attr("type", "color").attr("id", "mw-style-fill").attr("title", "Milky Way color").attr("value", config.mw.style.fill).on("change", apply);
    col.append("label").attr("for", "mw-style-opacity").html(" opacity");
    col.append("input").attr("type", "number").attr("id", "mw-style-opacity").attr("title", "Transparency of each Milky Way layer").attr("value", config.mw.style.opacity).attr("max", "1").attr("min", "0").attr("step", "0.01").on("change", apply);
    col.append("br");
    col.append("label").attr("for", "background").html("Background color");
    col.append("input").attr("type", "color").attr("id", "background-fill").attr("title", "Background color").attr("value", config.background.fill).on("change", apply);
    col.append("label").attr("title", "Star/DSO sizes are increased with higher zoom-levels").attr("for", "adaptable").html("Adaptable object sizes");
    col.append("input").attr("type", "checkbox").attr("id", "adaptable").property("checked", config.adaptable).on("change", apply);
    setLimits();
    setUnit(config.transform);

    function resize() {
      var src = this,
          w = src.value;
      if (testNumber(src) === false) return;
      config.width = w;
      Celestial.resize({
        width: w
      });
    }

    function reload() {
      var src = this,
          trans = src.value,
          cx = setUnit(trans, config.transform);
      if (cx !== null) config.center[0] = cx;
      config.transform = trans;
      Celestial.reload({
        transform: trans
      });
    }

    function reproject() {
      var src = this;
      if (!src) return;
      config.projection = src.value;
      Celestial.reproject(config);
    }

    function turn() {
      if (testNumber(this) === false) return;
      if (getCenter() === false) return;
      Celestial.rotate(config);
    }

    function getCenter() {
      var cx = $("centerx"),
          cy = $("centery"),
          cz = $("centerz"),
          rot = [];
      if (!cx || !cy) return;
      if (config.transform !== "equatorial") config.center[0] = parseFloat(cx.value);else {
        var vx = parseFloat(cx.value);
        config.center[0] = vx > 12 ? vx * 15 - 360 : vx * 15;
      }
      config.center[1] = parseFloat(cy.value);
      var vz = parseFloat(cz.value);
      config.center[2] = isNaN(vz) ? 0 : vz;
      return cx.value !== "" && cy.value !== "";
    }

    function showConstellation() {
      var id = this.value,
          anims = [];

      if (id === "") {
        Celestial.constellation = null;
        Celestial.redraw();
        return;
      }

      var con = Celestial.constellations[id];
      config.center = con.center;
      setCenter(config.center, config.transform); //config.lines.graticule.lat.pos = [Round(con.center[0])];
      //config.lines.graticule.lon.pos = [Round(con.center[1])];
      //Celestial.apply(config);
      //if zoomed, zoom out

      var z = Celestial.zoomBy();
      if (z !== 1) anims.push({
        param: "zoom",
        value: 1 / z,
        duration: 0
      }); //rotate

      anims.push({
        param: "center",
        value: con.center,
        duration: 0
      }); //and zoom in

      var sc = con.scale > 10 ? 10 : con.scale;
      anims.push({
        param: "zoom",
        value: sc,
        duration: 0
      });
      Celestial.constellation = id;
      Celestial.animate(anims, false);
    }

    function apply() {
      var value,
          src = this;

      switch (src.type) {
        case "checkbox":
          value = src.checked;
          enable(src);
          break;

        case "number":
          if (testNumber(src) === false) return;
          value = parseFloat(src.value);
          break;

        case "color":
          if (testColor(src) === false) return;
          value = src.value;
          break;

        case "text":
          if (src.id.search(/fill$/) === -1) return;
          if (testColor(src) === false) return;
          value = src.value;
          break;
      }

      if (value === null) return;
      set(src.id, value);
      getCenter();
      Celestial.apply(config);
    }

    function set(prop, val) {
      var a = prop.split("-");

      switch (a.length) {
        case 1:
          config[a[0]] = val;
          break;

        case 2:
          config[a[0]][a[1]] = val;
          break;

        case 3:
          config[a[0]][a[1]][a[2]] = val;
          break;

        default:
          return;
      }
    }
  } // Dependend fields relations


  var depends = {
    "stars-show": ["stars-limit", "stars-colors", "stars-style-fill", "stars-names", "stars-size", "stars-exponent"],
    "stars-names": ["stars-proper", "stars-desig", "stars-namelimit"],
    "stars-proper": ["stars-propernamelimit"],
    "dsos-show": ["dsos-limit", "dsos-names", "dsos-size", "dsos-exponent"],
    "dsos-names": ["dsos-desig", "dsos-namelimit"],
    "mw-show": ["mw-style-opacity", "mw-style-fill"],
    "constellations-names": ["constellations-desig"]
  }; // De/activate fields depending on selection of dependencies

  function enable(source) {
    var fld = source.id,
        off;

    switch (fld) {
      case "stars-show":
        off = !$(fld).checked;

        for (var i = 0; i < depends[fld].length; i++) {
          fldEnable(depends[fld][i], off);
        }

      /* falls through */

      case "stars-names":
        off = !$("stars-names").checked || !$("stars-show").checked;

        for (i = 0; i < depends["stars-names"].length; i++) {
          fldEnable(depends["stars-names"][i], off);
        }

      /* falls through */

      case "stars-proper":
        off = !$("stars-names").checked || !$("stars-show").checked || !$("stars-proper").checked;

        for (i = 0; i < depends["stars-proper"].length; i++) {
          fldEnable(depends["stars-proper"][i], off);
        }

        break;

      case "dsos-show":
        off = !$(fld).checked;

        for (i = 0; i < depends[fld].length; i++) {
          fldEnable(depends[fld][i], off);
        }

      /* falls through */

      case "dsos-names":
        off = !$("dsos-names").checked || !$("dsos-show").checked;

        for (i = 0; i < depends["dsos-names"].length; i++) {
          fldEnable(depends["dsos-names"][i], off);
        }

        break;

      case "constellations-show":
        off = !$(fld).checked;

        for (i = 0; i < depends[fld].length; i++) {
          fldEnable(depends[fld][i], off);
        }

        break;

      case "mw-show":
        off = !$(fld).checked;

        for (i = 0; i < depends[fld].length; i++) {
          fldEnable(depends[fld][i], off);
        }

        break;
    }
  } // Enable/disable field d to status off


  function fldEnable(d, off) {
    var node = $(d);
    node.disabled = off;
    node.previousSibling.style.color = off ? "#999" : "#000";
  } // Error notification


  function popError(nd, err) {
    var p = findPos(nd);
    d3.select("#error").html(err).style({
      top: px(p[1] + nd.offsetHeight + 1),
      left: px(p[0]),
      opacity: 1
    });
    nd.focus();
  } //Check numeric field


  function testNumber(node) {
    var v,
        adj = node.id === "hr" || node.id === "min" || node.id === "sec" ? 1 : 0;

    if (node.validity) {
      v = node.validity;

      if (v.typeMismatch || v.badInput) {
        popError(node, node.title + ": check field value");
        return false;
      }

      if (v.rangeOverflow || v.rangeUnderflow) {
        popError(node, node.title + " must be between " + (parseInt(node.min) + adj) + " and " + (parseInt(node.max) - adj));
        return false;
      }
    } else {
      v = node.value;

      if (!isNumber(v)) {
        popError(node, node.title + ": check field value");
        return false;
      }

      v = parseFloat(v);

      if (v < node.min || v > node.max) {
        popError(node, node.title + " must be between " + (node.min + adj) + " and " + (+node.max - adj));
        return false;
      }
    }

    d3.select("#error").style({
      top: "-9999px",
      left: "-9999px",
      opacity: 0
    });
    return true;
  } //Check color field


  function testColor(node) {
    var v;

    if (node.validity) {
      v = node.validity;

      if (v.typeMismatch || v.badInput) {
        popError(node, node.title + ": check field value");
        return false;
      }

      if (node.value.search(/^#[0-9A-F]{6}$/i) === -1) {
        popError(node, node.title + ": not a color value");
        return false;
      }
    } else {
      v = node.value;
      if (v === "") return true;

      if (v.search(/^#[0-9A-F]{6}$/i) === -1) {
        popError(node, node.title + ": not a color value");
        return false;
      }
    }

    d3.select("#error").style({
      top: "-9999px",
      left: "-9999px",
      opacity: 0
    });
    return true;
  }

  function setUnit(trans, old) {
    var cx = $("centerx");
    if (!cx) return null;

    if (old) {
      if (trans === "equatorial" && old !== "equatorial") {
        cx.value = (cx.value / 15).toFixed(1);
        if (cx.value < 0) cx.value += 24;
      } else if (trans !== "equatorial" && old === "equatorial") {
        cx.value = (cx.value * 15).toFixed(1);
        if (cx.value > 180) cx.value -= 360;
      }
    }

    if (trans === 'equatorial') {
      cx.min = "0";
      cx.max = "24";
      $("cxunit").innerHTML = "h";
    } else {
      cx.min = "-180";
      cx.max = "180";
      $("cxunit").innerHTML = "\xB0";
    }

    return cx.value;
  }

  function setCenter(ctr, trans) {
    var cx = $("centerx"),
        cy = $("centery"),
        cz = $("centerz");
    if (!cx || !cy) return;
    if (ctr === null) ctr = [0, 0, 0];
    if (ctr.length <= 2) ctr[2] = 0; //config.center = ctr; 

    if (trans !== "equatorial") cx.value = ctr[0].toFixed(1);else cx.value = ctr[0] < 0 ? (ctr[0] / 15 + 24).toFixed(1) : (ctr[0] / 15).toFixed(1);
    cy.value = ctr[1].toFixed(1);
    cz.value = ctr[2] !== null ? ctr[2].toFixed(1) : 0;
  } // Set max input limits depending on data


  function setLimits() {
    var t,
        rx = /\d+(\.\d+)?/g,
        s,
        d,
        res = {
      s: 6,
      d: 6
    },
        config = Celestial.settings();
    d = config.dsos.data; //test dso limit

    t = d.match(rx);

    if (t !== null) {
      res.d = parseFloat(t[t.length - 1]);
    }

    if (res.d != 6) {
      $("dsos-limit").max = res.d;
      $("dsos-namelimit").max = res.d;
    }

    s = config.stars.data; //test star limit

    t = s.match(rx);

    if (t !== null) {
      res.s = parseFloat(t[t.length - 1]);
    }

    if (res.s != 6) {
      $("stars-limit").max = res.s;
      $("stars-namelimit").max = res.s;
    }

    return res;
  }
  /* global Celestial, horizontal, datetimepicker, config, $, pad, testNumber, fldEnable, Round, has, hasParent */


  function geo(cfg) {
    var frm = d3.select("#celestial-form").append("div").attr("id", "loc"),
        dtFormat = d3.time.format("%Y-%m-%d %H:%M:%S"),
        zenith = [0, 0],
        geopos = [0, 0],
        date = new Date(),
        zone = date.getTimezoneOffset();
    var dtpick = new datetimepicker(cfg, function (date, tz) {
      $("datetime").value = dateFormat(date, tz);
      zone = tz;
      go();
    });
    if (has(cfg, "geopos") && cfg.geopos !== null && cfg.geopos.length === 2) geopos = cfg.geopos;
    var col = frm.append("div").attr("class", "col").attr("id", "location"); //Latitude & longitude fields

    col.append("label").attr("title", "Location coordinates long/lat").attr("for", "lat").html("Location");
    col.append("input").attr("type", "number").attr("id", "lat").attr("title", "Latitude").attr("placeholder", "Latitude").attr("max", "90").attr("min", "-90").attr("step", "0.0001").attr("value", geopos[0]).on("change", function () {
      if (testNumber(this) === true) go();
    });
    col.append("span").html("\xB0");
    col.append("input").attr("type", "number").attr("id", "lon").attr("title", "Longitude").attr("placeholder", "Longitude").attr("max", "180").attr("min", "-180").attr("step", "0.0001").attr("value", geopos[1]).on("change", function () {
      if (testNumber(this) === true) go();
    });
    col.append("span").html("\xB0"); //Here-button if supported

    if ("geolocation" in navigator) {
      col.append("input").attr("type", "button").attr("value", "Here").attr("id", "here").on("click", here);
    } //Datetime field with dtpicker-button


    col.append("label").attr("title", "Local date/time").attr("for", "datetime").html(" Date/time");
    col.append("input").attr("type", "button").attr("id", "day-left").attr("title", "One day back").on("click", function () {
      date.setDate(date.getDate() - 1);
      $("datetime").value = dateFormat(date, zone);
      go();
    });
    col.append("input").attr("type", "text").attr("id", "datetime").attr("title", "Date and time").attr("value", dateFormat(date, zone)).on("click", showpick, true).on("input", function () {
      this.value = dateFormat(date, zone);
      if (!dtpick.isVisible()) showpick();
    });
    col.append("div").attr("id", "datepick").on("click", showpick);
    col.append("input").attr("type", "button").attr("id", "day-right").attr("title", "One day forward").on("click", function () {
      date.setDate(date.getDate() + 1);
      $("datetime").value = dateFormat(date, zone);
      go();
    }); //Now -button sets current time & date of device  

    col.append("input").attr("type", "button").attr("value", "Now").attr("id", "now").on("click", now); //Horizon marker

    col.append("br");
    col.append("label").attr("title", "Show horizon marker").attr("for", "horizon-show").html(" Horizon marker");
    col.append("input").attr("type", "checkbox").attr("id", "horizon-show").property("checked", cfg.horizon.show).on("change", go);
    col.append("label").attr("title", "Show solar system objects").attr("for", "planets-show").html(" Planets, Sun & Moon");
    col.append("input").attr("type", "checkbox").attr("id", "planets-show").property("checked", cfg.planets.show).on("change", go);
    d3.select(document).on("mousedown", function () {
      if (!hasParent(d3.event.target, "celestial-date") && dtpick.isVisible()) dtpick.hide();
    });

    function now() {
      date.setTime(Date.now());
      $("datetime").value = dateFormat(date, zone);
      go();
    }

    function here() {
      navigator.geolocation.getCurrentPosition(function (pos) {
        geopos = [Round(pos.coords.latitude, 4), Round(pos.coords.longitude, 4)];
        $("lat").value = geopos[0];
        $("lon").value = geopos[1];
        go();
      });
    }

    function showpick() {
      dtpick.show(date);
    }

    function dateFormat(dt, tz) {
      var tzs;
      if (!tz || tz === "0") tzs = " ±0000";else {
        var h = Math.floor(Math.abs(tz) / 60),
            m = Math.abs(tz) - h * 60,
            s = tz < 0 ? " +" : " −";
        tzs = s + pad(h) + pad(m);
      }
      return dtFormat(dt) + tzs;
    }

    function go() {
      var lon = $("lon").value,
          lat = $("lat").value;
      date = dtFormat.parse($("datetime").value.slice(0, -6));
      var tz = date.getTimezoneOffset();
      var dtc = new Date(date.valueOf() + (zone - tz) * 60000);
      cfg.horizon.show = !!$("horizon-show").checked;
      cfg.planets.show = !!$("planets-show").checked;

      if (lon !== "" && lat !== "") {
        geopos = [parseFloat(lat), parseFloat(lon)];
        zenith = Celestial.getPoint(horizontal.inverse(dtc, [90, 0], geopos), cfg.transform);
        zenith[2] = 0;

        if (cfg.follow === "zenith") {
          Celestial.rotate({
            center: zenith,
            horizon: cfg.horizon
          });
        } else {
          Celestial.apply({
            horizon: cfg.horizon
          });
        }
      }
    }

    Celestial.getPosition = function (p) {};

    Celestial.date = function (dt) {
      if (!dt) return date;
      if (dtpick.isVisible()) return;
      date.setTime(dt.valueOf());
      $("datetime").value = dateFormat(dt, zone);
      Celestial.redraw();
    };

    Celestial.position = function () {
      return geopos;
    };

    Celestial.zenith = function () {
      return zenith;
    };

    Celestial.nadir = function () {
      var b = -zenith[1],
          l = zenith[0] + 180;
      if (l > 180) l -= 360;
      return [l, b - 0.001];
    };

    setTimeout(go, 1000);
  }
  /* global transform, Trig, Moon, deg2rad, dateParse, has, halfπ, τ */


  var gmdat = {
    "sol": 0.0002959122082855911025,
    // AU^3/d^2
    "mer": 164468599544771,
    //km^3/d^2
    "ven": 2425056445892137,
    "ter": 2975536307796296,
    "lun": 36599199229256,
    "mar": 319711652803400,
    "cer": 467549107200,
    "ves": 129071530155,
    "jup": 945905743547733000,
    "sat": 283225255921345000,
    "ura": 43256076555832200,
    "nep": 51034453325494200,
    "plu": 7327611364884,
    "eri": 8271175680000
  },
      symbols = {
    "sol": "\u2609",
    "mer": "\u263F",
    "ven": "\u2640",
    "ter": "\u2295",
    "lun": "\u25CF",
    "mar": "\u2642",
    "cer": "\u26B3",
    "ves": "\u26B6",
    "jup": "\u2643",
    "sat": "\u2644",
    "ura": "\u2645",
    "nep": "\u2646",
    "plu": "\u2647",
    "eri": "\u26AA"
  },
      ε = 23.43928 * deg2rad,
      sinε = Math.sin(ε),
      cosε = Math.cos(ε),
      kelements = ["a", "e", "i", "w", "M", "L", "W", "N", "n", "ep", "ref", "lecl", "becl", "Tilt"];
  /*
      ep = epoch (iso-date)
      N = longitude of the ascending node (deg) Ω
      i = inclination to the refrence plane, default:ecliptic (deg) 
      w = argument of periapsis (deg)  ω
      a = semi-major axis, or mean distance from parent body (AU,km)
      e = eccentricity (0=circle, 0-1=ellipse, 1=parabola, >1=hyperbola ) (-)
      M = mean anomaly (0 at periapsis; increases uniformly with time) (deg)
      n = mean daily motion = 360/P (deg/day)
      
      W = N + w  = longitude of periapsis ϖ
      L = M + W  = mean longitude
      q = a*(1-e) = periapsis distance
      Q = a*(1+e) = apoapsis distance
      P = 2π * sqrt(a^3/GM) = orbital period (years)
      T = Epoch_of_M - (M(deg)/360_deg) / P  = time of periapsis
      v = true anomaly (angle between position and periapsis) ν
      E = eccentric anomaly
      
      Mandatory: a, e, i, N, w|W, M|L, dM|n
      
  */

  var Kepler = function Kepler() {
    var gm = gmdat.sol,
        parentBody = "sol",
        elem = {},
        dat = {},
        id,
        name,
        symbol;

    function kepler(date) {
      dates(date);

      if (id === "sol") {
        dat.x = 0;
        dat.y = 0;
        dat.z = 0;
        return kepler;
      }

      coordinates();
      return kepler;
    }

    var dates = function dates(date) {
      var dt;
      dat = [];

      if (date) {
        if (date instanceof Date) {
          dt = new Date(date.valueOf());
        } else {
          dt = dateParse(date);
        }
      }

      if (!dt) {
        dt = new Date();
      }

      dat.jd = JD(dt);
      dt = dateParse(elem.ep);
      if (!dt) dt = dateParse("2000-01-01");
      dat.jd0 = JD(dt);
      dat.d = dat.jd - dat.jd0;
      dat.cy = dat.d / 36525;
    };

    var coordinates = function coordinates() {
      var key;

      if (id === "lun") {
        dat = moon_elements(dat);
        if (!dat) return;
      } else {
        for (var i = 0; i < kelements.length; i++) {
          key = kelements[i];
          if (!has(elem, key)) continue;

          if (has(elem, "d" + key)) {
            dat[key] = elem[key] + elem["d" + key] * dat.cy;
          } else if (has(elem, key)) {
            dat[key] = elem[key];
          }
        }

        if (has(dat, "M") && !has(dat, "dM") && has(dat, "n")) {
          dat.M += dat.n * dat.d;
        }
      }

      derive();
      trueAnomaly();
      cartesian();
    };

    kepler.cartesian = function () {
      return dat;
    };

    kepler.spherical = function () {
      spherical();
      return dat;
    };

    kepler.equatorial = function (pos) {
      equatorial(pos);
      return dat;
    };

    kepler.transpose = function () {
      transpose(dat);
      return dat;
    };

    kepler.elements = function (_) {
      var key;
      if (!arguments.length) return elem;

      for (var i = 0; i < kelements.length; i++) {
        key = kelements[i];
        if (!has(_, key)) continue;
        elem[key] = _[key];
        if (key === "a" || key === "e") elem[key] *= 1.0;else if (key !== "ref" && key !== "ep") elem[key] *= deg2rad;

        if (has(_, "d" + key)) {
          key = "d" + key;
          elem[key] = _[key];
          if (key === "da" || key === "de") elem[key] *= 1.0;else elem[key] *= deg2rad;
        }
      }

      return kepler;
    };

    kepler.parentBody = function (_) {
      if (!arguments.length) return parentBody;
      parentBody = _;
      gm = gmdat[parentBody];
      return kepler;
    };

    kepler.id = function (_) {
      if (!arguments.length) return id;
      id = _;
      symbol = symbols[_];
      return kepler;
    };

    Object.defineProperty(kepler, 'name', {
      writable: true
    });

    kepler.name = function (_) {
      if (!arguments.length) return name;
      name = _;
      return kepler;
    };

    kepler.symbol = function (_) {
      if (!arguments.length) return symbol;
      symbol = symbols[_];
      return kepler;
    };

    function near_parabolic(E, e) {
      var anom2 = e > 1.0 ? E * E : -E * E,
          term = e * anom2 * E / 6.0,
          rval = (1.0 - e) * E - term,
          n = 4;

      while (Math.abs(term) > 1e-15) {
        term *= anom2 / (n * (n + 1));
        rval -= term;
        n += 2;
      }

      return rval;
    }

    function anomaly() {
      var curr,
          err,
          trial,
          tmod,
          e = dat.e,
          M = dat.M,
          thresh = 1e-8,
          offset = 0.0,
          delta_curr = 1.9,
          is_negative = false,
          n_iter = 0;
      if (!M) return 0.0;

      if (e < 1.0) {
        if (M < -Math.PI || M > Math.PI) {
          tmod = Trig.normalize0(M);
          offset = M - tmod;
          M = tmod;
        }

        if (e < 0.9) {
          curr = Math.atan2(Math.sin(M), Math.cos(M) - e);

          do {
            err = (curr - e * Math.sin(curr) - M) / (1.0 - e * Math.cos(curr));
            curr -= err;
          } while (Math.abs(err) > thresh);

          return curr; // + offset;
        }
      }

      if (M < 0.0) {
        M = -M;
        is_negative = true;
      }

      curr = M;
      thresh = thresh * Math.abs(1.0 - e);
      /* Due to roundoff error,  there's no way we can hope to */

      /* get below a certain minimum threshhold anyway:        */

      if (thresh < 1e-15) {
        thresh = 1e-15;
      }

      if (e > 0.8 && M < Math.PI / 3.0 || e > 1.0) {
        /* up to 60 degrees */
        trial = M / Math.abs(1.0 - e);

        if (trial * trial > 6.0 * Math.abs(1.0 - e)) {
          /* cubic term is dominant */
          if (M < Math.PI) {
            trial = Math.pow(6.0 * M, 1 / 3);
          } else {
            /* hyperbolic w/ 5th & higher-order terms predominant */
            trial = Trig.asinh(M / e);
          }
        }

        curr = trial;
      }

      if (e > 1.0 && M > 4.0) {
        /* hyperbolic, large-mean-anomaly case */
        curr = Math.log(M);
      }

      if (e < 1.0) {
        while (Math.abs(delta_curr) > thresh) {
          if (n_iter++ > 8) {
            err = near_parabolic(curr, e) - M;
          } else {
            err = curr - e * Math.sin(curr) - M;
          }

          delta_curr = -err / (1.0 - e * Math.cos(curr));
          curr += delta_curr;
        }
      } else {
        while (Math.abs(delta_curr) > thresh) {
          if (n_iter++ > 7) {
            err = -near_parabolic(curr, e) - M;
          } else {
            err = e * Trig.sinh(curr) - curr - M;
          }

          delta_curr = -err / (e * Trig.cosh(curr) - 1.0);
          curr += delta_curr;
        }
      }

      return is_negative ? offset - curr : offset + curr;
    }

    function trueAnomaly() {
      var x, y, r0, g, t;

      if (dat.e === 1.0) {
        /* parabolic */
        t = dat.jd0 - dat.T;
        g = dat.w0 * t * 0.5;
        y = Math.pow(g + Math.sqrt(g * g + 1.0), 1 / 3);
        dat.v = 2.0 * Math.atan(y - 1.0 / y);
      } else {
        /* got the mean anomaly;  compute eccentric,  then true */
        dat.E = anomaly();

        if (dat.e > 1.0) {
          /* hyperbolic case */
          x = dat.e - Trig.cosh(dat.E);
          y = Trig.sinh(dat.E);
        } else {
          /* elliptical case */
          x = Math.cos(dat.E) - dat.e;
          y = Math.sin(dat.E);
        }

        y *= Math.sqrt(Math.abs(1.0 - dat.e * dat.e));
        dat.v = Math.atan2(y, x);
      }

      r0 = dat.q * (1.0 + dat.e);
      dat.r = r0 / (1.0 + dat.e * Math.cos(dat.v));
    }

    function derive() {
      if (!dat.hasOwnProperty("w")) {
        dat.w = dat.W - dat.N;
      }

      if (!dat.hasOwnProperty("M")) {
        dat.M = dat.L - dat.W;
      }

      if (dat.e < 1.0) {
        dat.M = Trig.normalize0(dat.M);
      } //dat.P = Math.pow(Math.abs(dat.a), 1.5);


      dat.P = τ * Math.sqrt(Math.pow(dat.a, 3) / gm) / 365.25;
      dat.T = dat.jd0 - dat.M / halfπ / dat.P;

      if (dat.e !== 1.0) {
        /* for non-parabolic orbits: */
        dat.q = dat.a * (1.0 - dat.e);
        dat.t0 = dat.a * Math.sqrt(Math.abs(dat.a) / gm);
      } else {
        dat.w0 = 3.0 / Math.sqrt(2) / (dat.q * Math.sqrt(dat.q / gm));
        dat.a = 0.0;
        dat.t0 = 0.0;
      }

      dat.am = Math.sqrt(gm * dat.q * (1.0 + dat.e));
    }

    function transpose() {
      if (!dat.ref || dat.ref === "ecl") {
        dat.tx = dat.x;
        dat.ty = dat.y;
        dat.tz = dat.z;
        return;
      }

      var a0 = dat.lecl,
          // - Math.PI/2,
      a1 = Math.PI / 2 - dat.becl,
          angles = [0, a1, -a0];
      transform(dat, angles);
      var tp = Trig.cartesian([dat.tl, dat.tb, dat.r]);
      dat.tx = tp.x;
      dat.ty = tp.y;
      dat.tz = tp.z;
    }

    function equatorial(pos) {
      ε = (23.439292 - 0.0130042 * dat.cy - 1.667e-7 * dat.cy * dat.cy + 5.028e-7 * dat.cy * dat.cy * dat.cy) * deg2rad;
      sinε = Math.sin(ε);
      cosε = Math.cos(ε);
      var o = id === "lun" ? {
        x: 0,
        y: 0,
        z: 0
      } : {
        x: pos.x,
        y: pos.y,
        z: pos.z
      };
      dat.xeq = dat.x - o.x;
      dat.yeq = (dat.y - o.y) * cosε - (dat.z - o.z) * sinε;
      dat.zeq = (dat.y - o.y) * sinε + (dat.z - o.z) * cosε;
      dat.ra = Trig.normalize(Math.atan2(dat.yeq, dat.xeq));
      dat.dec = Math.atan2(dat.zeq, Math.sqrt(dat.xeq * dat.xeq + dat.yeq * dat.yeq));
      if (id === "lun") dat = moon_corr(dat, pos);
      dat.pos = [dat.ra / deg2rad, dat.dec / deg2rad];
      dat.rt = Math.sqrt(dat.xeq * dat.xeq + dat.yeq * dat.yeq + dat.zeq * dat.zeq);
    }

    function cartesian() {
      var u = dat.v + dat.w;
      dat.x = dat.r * (Math.cos(dat.N) * Math.cos(u) - Math.sin(dat.N) * Math.sin(u) * Math.cos(dat.i));
      dat.y = dat.r * (Math.sin(dat.N) * Math.cos(u) + Math.cos(dat.N) * Math.sin(u) * Math.cos(dat.i));
      dat.z = dat.r * (Math.sin(u) * Math.sin(dat.i));
      return dat;
    }

    function spherical() {
      var lon = Math.atan2(dat.y, dat.x),
          lat = Math.atan2(dat.z, Math.sqrt(dat.x * dat.x + dat.y * dat.y));
      dat.l = Trig.normalize(lon);
      dat.b = lat;
      return dat;
    }

    function polar2cart(pos) {
      var rclat = Math.cos(pos.lat) * pos.r;
      pos.x = rclat * Math.cos(pos.lon);
      pos.y = rclat * Math.sin(pos.lon);
      pos.z = pos.r * Math.sin(pos.lat);
      return pos;
    }

    function JD(dt) {
      var yr = dt.getUTCFullYear(),
          mo = dt.getUTCMonth() + 1,
          dy = dt.getUTCDate(),
          frac = (dt.getUTCHours() - 12 + dt.getUTCMinutes() / 60.0 + dt.getUTCSeconds() / 3600.0) / 24,
          IYMIN = -4799;
      /* Earliest year allowed (4800BC) */

      if (yr < IYMIN) return -1;
      var a = Math.floor((14 - mo) / 12),
          y = yr + 4800 - a,
          m = mo + 12 * a - 3;
      var jdn = dy + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
      return jdn + frac;
    }

    function mst(lon) {
      var l = lon || 0; // lon=0 -> gmst

      return (18.697374558 + 24.06570982441908 * dat.d) * 15 + l;
    }

    function observer(pos) {
      var flat = 298.257223563,
          // WGS84 flattening of earth
      re = 6378.137,
          // GRS80/WGS84 semi major axis of earth ellipsoid
      h = pos.h || 0,
          cart = {},
          gmst = mst();
      var cosl = Math.cos(pos.lat),
          sinl = Math.sin(pos.lat),
          fl = 1.0 - 1.0 / flat;
      var fl2 = fl * fl;
      var u = 1.0 / Math.sqrt(cosl * cosl + fl2 * sinl * sinl),
          a = re * u + h,
          b = re * fl2 * u + h,
          r = Math.sqrt(a * a * cosl * cosl + b * b * sinl * sinl); // geocentric distance from earth center

      cart.lat = Math.acos(a * cosl / r);
      cart.lon = pos.lon;
      cart.r = h;
      if (pos.lat < 0.0) cart.lat *= -1;
      polar2cart(cart); // rotate around earth's polar axis to align coordinate system from Greenwich to vernal equinox

      var angle = gmst * deg2rad; // sideral time gmst given in hours. Convert to radians

      cart.x = cart.x * Math.cos(angle) - cart.y * Math.sin(angle);
      cart.y = cart.x * Math.sin(angle) + cart.y * Math.cos(angle);
      return cart;
    }

    function moon_elements(dat) {
      if (typeof Moon !== "undefined") return Moon.elements(dat);
    }

    function moon_corr(dat, pos) {
      spherical();
      if (typeof Moon !== "undefined") return Moon.corr(dat, pos);
    }

    return kepler;
  };
  /* global Trig, deg2rad */


  var Moon = {
    elements: function elements(dat) {
      var t = (dat.jd - 2451545) / 36525,
          t2 = t * t,
          t3 = t * t2,
          t4 = t * t3,
          t5 = t * t4,
          t2e4 = t2 * 1e-4,
          t3e6 = t3 * 1e-6,
          t4e8 = t4 * 1e-8; // semimajor axis

      var sa = 3400.4 * Math.cos(deg2rad * (235.7004 + 890534.2230 * t - 32.601 * t2e4 + 3.664 * t3e6 - 1.769 * t4e8)) - 635.6 * Math.cos(deg2rad * (100.7370 + 413335.3554 * t - 122.571 * t2e4 - 10.684 * t3e6 + 5.028 * t4e8)) - 235.6 * Math.cos(deg2rad * (134.9634 + 477198.8676 * t + 89.970 * t2e4 + 14.348 * t3e6 - 6.797 * t4e8)) + 218.1 * Math.cos(deg2rad * (238.1713 + 854535.1727 * t - 31.065 * t2e4 + 3.623 * t3e6 - 1.769 * t4e8)) + 181.0 * Math.cos(deg2rad * (10.6638 + 1367733.0907 * t + 57.370 * t2e4 + 18.011 * t3e6 - 8.566 * t4e8)) - 39.9 * Math.cos(deg2rad * (103.2079 + 377336.3051 * t - 121.035 * t2e4 - 10.724 * t3e6 + 5.028 * t4e8)) - 38.4 * Math.cos(deg2rad * (233.2295 + 926533.2733 * t - 34.136 * t2e4 + 3.705 * t3e6 - 1.769 * t4e8)) + 33.8 * Math.cos(deg2rad * (336.4374 + 1303869.5784 * t - 155.171 * t2e4 - 7.020 * t3e6 + 3.259 * t4e8)) + 28.8 * Math.cos(deg2rad * (111.4008 + 1781068.4461 * t - 65.201 * t2e4 + 7.328 * t3e6 - 3.538 * t4e8)) + 12.6 * Math.cos(deg2rad * (13.1347 + 1331734.0404 * t + 58.906 * t2e4 + 17.971 * t3e6 - 8.566 * t4e8)) + 11.4 * Math.cos(deg2rad * (186.5442 + 966404.0351 * t - 68.058 * t2e4 - 0.567 * t3e6 + 0.232 * t4e8)) - 11.1 * Math.cos(deg2rad * (222.5657 - 441199.8173 * t - 91.506 * t2e4 - 14.307 * t3e6 + 6.797 * t4e8)) - 10.2 * Math.cos(deg2rad * (269.9268 + 954397.7353 * t + 179.941 * t2e4 + 28.695 * t3e6 - 13.594 * t4e8)) + 9.7 * Math.cos(deg2rad * (145.6272 + 1844931.9583 * t + 147.340 * t2e4 + 32.359 * t3e6 - 15.363 * t4e8)) + 9.6 * Math.cos(deg2rad * (240.6422 + 818536.1225 * t - 29.529 * t2e4 + 3.582 * t3e6 - 1.769 * t4e8)) + 8.0 * Math.cos(deg2rad * (297.8502 + 445267.1115 * t - 16.300 * t2e4 + 1.832 * t3e6 - 0.884 * t4e8)) - 6.2 * Math.cos(deg2rad * (132.4925 + 513197.9179 * t + 88.434 * t2e4 + 14.388 * t3e6 - 6.797 * t4e8)) + 6.0 * Math.cos(deg2rad * (173.5506 + 1335801.3346 * t - 48.901 * t2e4 + 5.496 * t3e6 - 2.653 * t4e8)) + 3.7 * Math.cos(deg2rad * (113.8717 + 1745069.3958 * t - 63.665 * t2e4 + 7.287 * t3e6 - 3.538 * t4e8)) + 3.6 * Math.cos(deg2rad * (338.9083 + 1267870.5281 * t - 153.636 * t2e4 - 7.061 * t3e6 + 3.259 * t4e8)) + 3.2 * Math.cos(deg2rad * (246.3642 + 2258267.3137 * t + 24.769 * t2e4 + 21.675 * t3e6 - 10.335 * t4e8)) - 3.0 * Math.cos(deg2rad * (8.1929 + 1403732.1410 * t + 55.834 * t2e4 + 18.052 * t3e6 - 8.566 * t4e8)) + 2.3 * Math.cos(deg2rad * (98.2661 + 449334.4057 * t - 124.107 * t2e4 - 10.643 * t3e6 + 5.028 * t4e8)) - 2.2 * Math.cos(deg2rad * (357.5291 + 35999.0503 * t - 1.536 * t2e4 + 0.041 * t3e6 + 0.000 * t4e8)) - 2.0 * Math.cos(deg2rad * (38.5872 + 858602.4669 * t - 138.871 * t2e4 - 8.852 * t3e6 + 4.144 * t4e8)) - 1.8 * Math.cos(deg2rad * (105.6788 + 341337.2548 * t - 119.499 * t2e4 - 10.765 * t3e6 + 5.028 * t4e8)) - 1.7 * Math.cos(deg2rad * (201.4740 + 826670.7108 * t - 245.142 * t2e4 - 21.367 * t3e6 + 10.057 * t4e8)) + 1.6 * Math.cos(deg2rad * (184.1196 + 401329.0556 * t + 125.428 * t2e4 + 18.579 * t3e6 - 8.798 * t4e8)) - 1.4 * Math.cos(deg2rad * (308.4192 - 489205.1674 * t + 158.029 * t2e4 + 14.915 * t3e6 - 7.029 * t4e8)) + 1.3 * Math.cos(deg2rad * (325.7736 - 63863.5122 * t - 212.541 * t2e4 - 25.031 * t3e6 + 11.826 * t4e8));
      var sapp = -0.55 * Math.cos(deg2rad * (238.2 + 854535.2 * t)) + 0.10 * Math.cos(deg2rad * (103.2 + 377336.3 * t)) + 0.10 * Math.cos(deg2rad * (233.2 + 926533.3 * t));
      var sma = 383397.6 + sa + sapp * t; // orbital eccentricity

      var se = 0.014217 * Math.cos(deg2rad * (100.7370 + 413335.3554 * t - 122.571 * t2e4 - 10.684 * t3e6 + 5.028 * t4e8)) + 0.008551 * Math.cos(deg2rad * (325.7736 - 63863.5122 * t - 212.541 * t2e4 - 25.031 * t3e6 + 11.826 * t4e8)) - 0.001383 * Math.cos(deg2rad * (134.9634 + 477198.8676 * t + 89.970 * t2e4 + 14.348 * t3e6 - 6.797 * t4e8)) + 0.001353 * Math.cos(deg2rad * (10.6638 + 1367733.0907 * t + 57.370 * t2e4 + 18.011 * t3e6 - 8.566 * t4e8)) - 0.001146 * Math.cos(deg2rad * (66.5106 + 349471.8432 * t - 335.112 * t2e4 - 35.715 * t3e6 + 16.854 * t4e8)) - 0.000915 * Math.cos(deg2rad * (201.4740 + 826670.7108 * t - 245.142 * t2e4 - 21.367 * t3e6 + 10.057 * t4e8)) + 0.000869 * Math.cos(deg2rad * (103.2079 + 377336.3051 * t - 121.035 * t2e4 - 10.724 * t3e6 + 5.028 * t4e8)) - 0.000628 * Math.cos(deg2rad * (235.7004 + 890534.2230 * t - 32.601 * t2e4 + 3.664 * t3e6 - 1.769 * t4e8)) - 0.000393 * Math.cos(deg2rad * (291.5472 - 127727.0245 * t - 425.082 * t2e4 - 50.062 * t3e6 + 23.651 * t4e8)) + 0.000284 * Math.cos(deg2rad * (328.2445 - 99862.5625 * t - 211.005 * t2e4 - 25.072 * t3e6 + 11.826 * t4e8)) - 0.000278 * Math.cos(deg2rad * (162.8868 - 31931.7561 * t - 106.271 * t2e4 - 12.516 * t3e6 + 5.913 * t4e8)) - 0.000240 * Math.cos(deg2rad * (269.9268 + 954397.7353 * t + 179.941 * t2e4 + 28.695 * t3e6 - 13.594 * t4e8)) + 0.000230 * Math.cos(deg2rad * (111.4008 + 1781068.4461 * t - 65.201 * t2e4 + 7.328 * t3e6 - 3.538 * t4e8)) + 0.000229 * Math.cos(deg2rad * (167.2476 + 762807.1986 * t - 457.683 * t2e4 - 46.398 * t3e6 + 21.882 * t4e8)) - 0.000202 * Math.cos(deg2rad * (83.3826 - 12006.2998 * t + 247.999 * t2e4 + 29.262 * t3e6 - 13.826 * t4e8)) + 0.000190 * Math.cos(deg2rad * (190.8102 - 541062.3799 * t - 302.511 * t2e4 - 39.379 * t3e6 + 18.623 * t4e8)) + 0.000177 * Math.cos(deg2rad * (357.5291 + 35999.0503 * t - 1.536 * t2e4 + 0.041 * t3e6 + 0.000 * t4e8)) + 0.000153 * Math.cos(deg2rad * (32.2842 + 285608.3309 * t - 547.653 * t2e4 - 60.746 * t3e6 + 28.679 * t4e8)) - 0.000137 * Math.cos(deg2rad * (44.8902 + 1431596.6029 * t + 269.911 * t2e4 + 43.043 * t3e6 - 20.392 * t4e8)) + 0.000122 * Math.cos(deg2rad * (145.6272 + 1844931.9583 * t + 147.340 * t2e4 + 32.359 * t3e6 - 15.363 * t4e8)) + 0.000116 * Math.cos(deg2rad * (302.2110 + 1240006.0662 * t - 367.713 * t2e4 - 32.051 * t3e6 + 15.085 * t4e8)) - 0.000111 * Math.cos(deg2rad * (203.9449 + 790671.6605 * t - 243.606 * t2e4 - 21.408 * t3e6 + 10.057 * t4e8)) - 0.000108 * Math.cos(deg2rad * (68.9815 + 313472.7929 * t - 333.576 * t2e4 - 35.756 * t3e6 + 16.854 * t4e8)) + 0.000096 * Math.cos(deg2rad * (336.4374 + 1303869.5784 * t - 155.171 * t2e4 - 7.020 * t3e6 + 3.259 * t4e8)) - 0.000090 * Math.cos(deg2rad * (98.2661 + 449334.4057 * t - 124.107 * t2e4 - 10.643 * t3e6 + 5.028 * t4e8)) + 0.000090 * Math.cos(deg2rad * (13.1347 + 1331734.0404 * t + 58.906 * t2e4 + 17.971 * t3e6 - 8.566 * t4e8)) + 0.000056 * Math.cos(deg2rad * (55.8468 - 1018261.2475 * t - 392.482 * t2e4 - 53.726 * t3e6 + 25.420 * t4e8)) - 0.000056 * Math.cos(deg2rad * (238.1713 + 854535.1727 * t - 31.065 * t2e4 + 3.623 * t3e6 - 1.769 * t4e8)) + 0.000052 * Math.cos(deg2rad * (308.4192 - 489205.1674 * t + 158.029 * t2e4 + 14.915 * t3e6 - 7.029 * t4e8)) - 0.000050 * Math.cos(deg2rad * (133.0212 + 698943.6863 * t - 670.224 * t2e4 - 71.429 * t3e6 + 33.708 * t4e8)) - 0.000049 * Math.cos(deg2rad * (267.9846 + 1176142.5540 * t - 580.254 * t2e4 - 57.082 * t3e6 + 26.911 * t4e8)) - 0.000049 * Math.cos(deg2rad * (184.1196 + 401329.0556 * t + 125.428 * t2e4 + 18.579 * t3e6 - 8.798 * t4e8)) - 0.000045 * Math.cos(deg2rad * (49.1562 - 75869.8120 * t + 35.458 * t2e4 + 4.231 * t3e6 - 2.001 * t4e8)) + 0.000044 * Math.cos(deg2rad * (257.3208 - 191590.5367 * t - 637.623 * t2e4 - 75.093 * t3e6 + 35.477 * t4e8)) + 0.000042 * Math.cos(deg2rad * (105.6788 + 341337.2548 * t - 119.499 * t2e4 - 10.765 * t3e6 + 5.028 * t4e8)) + 0.000042 * Math.cos(deg2rad * (160.4159 + 4067.2942 * t - 107.806 * t2e4 - 12.475 * t3e6 + 5.913 * t4e8)) + 0.000040 * Math.cos(deg2rad * (246.3642 + 2258267.3137 * t + 24.769 * t2e4 + 21.675 * t3e6 - 10.335 * t4e8)) - 0.000040 * Math.cos(deg2rad * (156.5838 - 604925.8921 * t - 515.053 * t2e4 - 64.410 * t3e6 + 30.448 * t4e8)) + 0.000036 * Math.cos(deg2rad * (169.7185 + 726808.1483 * t - 456.147 * t2e4 - 46.439 * t3e6 + 21.882 * t4e8)) + 0.000029 * Math.cos(deg2rad * (113.8717 + 1745069.3958 * t - 63.665 * t2e4 + 7.287 * t3e6 - 3.538 * t4e8)) - 0.000029 * Math.cos(deg2rad * (297.8502 + 445267.1115 * t - 16.300 * t2e4 + 1.832 * t3e6 - 0.884 * t4e8)) - 0.000028 * Math.cos(deg2rad * (294.0181 - 163726.0747 * t - 423.546 * t2e4 - 50.103 * t3e6 + 23.651 * t4e8)) + 0.000027 * Math.cos(deg2rad * (263.6238 + 381403.5993 * t - 228.841 * t2e4 - 23.199 * t3e6 + 10.941 * t4e8)) - 0.000026 * Math.cos(deg2rad * (358.0578 + 221744.8187 * t - 760.194 * t2e4 - 85.777 * t3e6 + 40.505 * t4e8)) - 0.000026 * Math.cos(deg2rad * (8.1929 + 1403732.1410 * t + 55.834 * t2e4 + 18.052 * t3e6 - 8.566 * t4e8));
      var sedp = -0.0022 * Math.cos(deg2rad * (103.2 + 377336.3 * t));
      var ecc = 0.055544 + se + 1e-3 * t * sedp; // sine of half the inclination

      var sg = 0.0011776 * Math.cos(deg2rad * (49.1562 - 75869.8120 * t + 35.458 * t2e4 + 4.231 * t3e6 - 2.001 * t4e8)) - 0.0000971 * Math.cos(deg2rad * (235.7004 + 890534.2230 * t - 32.601 * t2e4 + 3.664 * t3e6 - 1.769 * t4e8)) + 0.0000908 * Math.cos(deg2rad * (186.5442 + 966404.0351 * t - 68.058 * t2e4 - 0.567 * t3e6 + 0.232 * t4e8)) + 0.0000623 * Math.cos(deg2rad * (83.3826 - 12006.2998 * t + 247.999 * t2e4 + 29.262 * t3e6 - 13.826 * t4e8)) + 0.0000483 * Math.cos(deg2rad * (51.6271 - 111868.8623 * t + 36.994 * t2e4 + 4.190 * t3e6 - 2.001 * t4e8)) + 0.0000348 * Math.cos(deg2rad * (100.7370 + 413335.3554 * t - 122.571 * t2e4 - 10.684 * t3e6 + 5.028 * t4e8)) - 0.0000316 * Math.cos(deg2rad * (308.4192 - 489205.1674 * t + 158.029 * t2e4 + 14.915 * t3e6 - 7.029 * t4e8)) - 0.0000253 * Math.cos(deg2rad * (46.6853 - 39870.7617 * t + 33.922 * t2e4 + 4.272 * t3e6 - 2.001 * t4e8)) - 0.0000141 * Math.cos(deg2rad * (274.1928 - 553068.6797 * t - 54.513 * t2e4 - 10.116 * t3e6 + 4.797 * t4e8)) + 0.0000127 * Math.cos(deg2rad * (325.7736 - 63863.5122 * t - 212.541 * t2e4 - 25.031 * t3e6 + 11.826 * t4e8)) + 0.0000117 * Math.cos(deg2rad * (184.1196 + 401329.0556 * t + 125.428 * t2e4 + 18.579 * t3e6 - 8.798 * t4e8)) - 0.0000078 * Math.cos(deg2rad * (98.3124 - 151739.6240 * t + 70.916 * t2e4 + 8.462 * t3e6 - 4.001 * t4e8)) - 0.0000063 * Math.cos(deg2rad * (238.1713 + 854535.1727 * t - 31.065 * t2e4 + 3.623 * t3e6 - 1.769 * t4e8)) + 0.0000063 * Math.cos(deg2rad * (134.9634 + 477198.8676 * t + 89.970 * t2e4 + 14.348 * t3e6 - 6.797 * t4e8)) + 0.0000036 * Math.cos(deg2rad * (321.5076 + 1443602.9027 * t + 21.912 * t2e4 + 13.780 * t3e6 - 6.566 * t4e8)) - 0.0000035 * Math.cos(deg2rad * (10.6638 + 1367733.0907 * t + 57.370 * t2e4 + 18.011 * t3e6 - 8.566 * t4e8)) + 0.0000024 * Math.cos(deg2rad * (149.8932 + 337465.5434 * t - 87.113 * t2e4 - 6.453 * t3e6 + 3.028 * t4e8)) + 0.0000024 * Math.cos(deg2rad * (170.9849 - 930404.9848 * t + 66.523 * t2e4 + 0.608 * t3e6 - 0.232 * t4e8));
      var sgp = -0.0203 * Math.cos(deg2rad * (125.0 - 1934.1 * t)) + 0.0034 * Math.cos(deg2rad * (220.2 - 1935.5 * t));
      var gamma = 0.0449858 + sg + 1e-3 * sgp; // longitude of perigee

      var sp = -15.448 * Math.sin(deg2rad * (100.7370 + 413335.3554 * t - 122.571 * t2e4 - 10.684 * t3e6 + 5.028 * t4e8)) - 9.642 * Math.sin(deg2rad * (325.7736 - 63863.5122 * t - 212.541 * t2e4 - 25.031 * t3e6 + 11.826 * t4e8)) - 2.721 * Math.sin(deg2rad * (134.9634 + 477198.8676 * t + 89.970 * t2e4 + 14.348 * t3e6 - 6.797 * t4e8)) + 2.607 * Math.sin(deg2rad * (66.5106 + 349471.8432 * t - 335.112 * t2e4 - 35.715 * t3e6 + 16.854 * t4e8)) + 2.085 * Math.sin(deg2rad * (201.4740 + 826670.7108 * t - 245.142 * t2e4 - 21.367 * t3e6 + 10.057 * t4e8)) + 1.477 * Math.sin(deg2rad * (10.6638 + 1367733.0907 * t + 57.370 * t2e4 + 18.011 * t3e6 - 8.566 * t4e8)) + 0.968 * Math.sin(deg2rad * (291.5472 - 127727.0245 * t - 425.082 * t2e4 - 50.062 * t3e6 + 23.651 * t4e8)) - 0.949 * Math.sin(deg2rad * (103.2079 + 377336.3051 * t - 121.035 * t2e4 - 10.724 * t3e6 + 5.028 * t4e8)) - 0.703 * Math.sin(deg2rad * (167.2476 + 762807.1986 * t - 457.683 * t2e4 - 46.398 * t3e6 + 21.882 * t4e8)) - 0.660 * Math.sin(deg2rad * (235.7004 + 890534.2230 * t - 32.601 * t2e4 + 3.664 * t3e6 - 1.769 * t4e8)) - 0.577 * Math.sin(deg2rad * (190.8102 - 541062.3799 * t - 302.511 * t2e4 - 39.379 * t3e6 + 18.623 * t4e8)) - 0.524 * Math.sin(deg2rad * (269.9268 + 954397.7353 * t + 179.941 * t2e4 + 28.695 * t3e6 - 13.594 * t4e8)) - 0.482 * Math.sin(deg2rad * (32.2842 + 285608.3309 * t - 547.653 * t2e4 - 60.746 * t3e6 + 28.679 * t4e8)) + 0.452 * Math.sin(deg2rad * (357.5291 + 35999.0503 * t - 1.536 * t2e4 + 0.041 * t3e6 + 0.000 * t4e8)) - 0.381 * Math.sin(deg2rad * (302.2110 + 1240006.0662 * t - 367.713 * t2e4 - 32.051 * t3e6 + 15.085 * t4e8)) - 0.342 * Math.sin(deg2rad * (328.2445 - 99862.5625 * t - 211.005 * t2e4 - 25.072 * t3e6 + 11.826 * t4e8)) - 0.312 * Math.sin(deg2rad * (44.8902 + 1431596.6029 * t + 269.911 * t2e4 + 43.043 * t3e6 - 20.392 * t4e8)) + 0.282 * Math.sin(deg2rad * (162.8868 - 31931.7561 * t - 106.271 * t2e4 - 12.516 * t3e6 + 5.913 * t4e8)) + 0.255 * Math.sin(deg2rad * (203.9449 + 790671.6605 * t - 243.606 * t2e4 - 21.408 * t3e6 + 10.057 * t4e8)) + 0.252 * Math.sin(deg2rad * (68.9815 + 313472.7929 * t - 333.576 * t2e4 - 35.756 * t3e6 + 16.854 * t4e8)) - 0.211 * Math.sin(deg2rad * (83.3826 - 12006.2998 * t + 247.999 * t2e4 + 29.262 * t3e6 - 13.826 * t4e8)) + 0.193 * Math.sin(deg2rad * (267.9846 + 1176142.5540 * t - 580.254 * t2e4 - 57.082 * t3e6 + 26.911 * t4e8)) + 0.191 * Math.sin(deg2rad * (133.0212 + 698943.6863 * t - 670.224 * t2e4 - 71.429 * t3e6 + 33.708 * t4e8)) - 0.184 * Math.sin(deg2rad * (55.8468 - 1018261.2475 * t - 392.482 * t2e4 - 53.726 * t3e6 + 25.420 * t4e8)) + 0.182 * Math.sin(deg2rad * (145.6272 + 1844931.9583 * t + 147.340 * t2e4 + 32.359 * t3e6 - 15.363 * t4e8)) - 0.158 * Math.sin(deg2rad * (257.3208 - 191590.5367 * t - 637.623 * t2e4 - 75.093 * t3e6 + 35.477 * t4e8)) + 0.148 * Math.sin(deg2rad * (156.5838 - 604925.8921 * t - 515.053 * t2e4 - 64.410 * t3e6 + 30.448 * t4e8)) - 0.111 * Math.sin(deg2rad * (169.7185 + 726808.1483 * t - 456.147 * t2e4 - 46.439 * t3e6 + 21.882 * t4e8)) + 0.101 * Math.sin(deg2rad * (13.1347 + 1331734.0404 * t + 58.906 * t2e4 + 17.971 * t3e6 - 8.566 * t4e8)) + 0.100 * Math.sin(deg2rad * (358.0578 + 221744.8187 * t - 760.194 * t2e4 - 85.777 * t3e6 + 40.505 * t4e8)) + 0.087 * Math.sin(deg2rad * (98.2661 + 449334.4057 * t - 124.107 * t2e4 - 10.643 * t3e6 + 5.028 * t4e8)) + 0.080 * Math.sin(deg2rad * (42.9480 + 1653341.4216 * t - 490.283 * t2e4 - 42.734 * t3e6 + 20.113 * t4e8)) + 0.080 * Math.sin(deg2rad * (222.5657 - 441199.8173 * t - 91.506 * t2e4 - 14.307 * t3e6 + 6.797 * t4e8)) + 0.077 * Math.sin(deg2rad * (294.0181 - 163726.0747 * t - 423.546 * t2e4 - 50.103 * t3e6 + 23.651 * t4e8)) - 0.073 * Math.sin(deg2rad * (280.8834 - 1495460.1151 * t - 482.452 * t2e4 - 68.074 * t3e6 + 32.217 * t4e8)) - 0.071 * Math.sin(deg2rad * (304.6819 + 1204007.0159 * t - 366.177 * t2e4 - 32.092 * t3e6 + 15.085 * t4e8)) - 0.069 * Math.sin(deg2rad * (233.7582 + 1112279.0417 * t - 792.795 * t2e4 - 82.113 * t3e6 + 38.736 * t4e8)) - 0.067 * Math.sin(deg2rad * (34.7551 + 249609.2807 * t - 546.117 * t2e4 - 60.787 * t3e6 + 28.679 * t4e8)) - 0.067 * Math.sin(deg2rad * (263.6238 + 381403.5993 * t - 228.841 * t2e4 - 23.199 * t3e6 + 10.941 * t4e8)) + 0.055 * Math.sin(deg2rad * (21.6203 - 1082124.7597 * t - 605.023 * t2e4 - 78.757 * t3e6 + 37.246 * t4e8)) + 0.055 * Math.sin(deg2rad * (308.4192 - 489205.1674 * t + 158.029 * t2e4 + 14.915 * t3e6 - 7.029 * t4e8)) - 0.054 * Math.sin(deg2rad * (8.7216 + 1589477.9094 * t - 702.824 * t2e4 - 67.766 * t3e6 + 31.939 * t4e8)) - 0.052 * Math.sin(deg2rad * (179.8536 + 1908795.4705 * t + 359.881 * t2e4 + 57.390 * t3e6 - 27.189 * t4e8)) - 0.050 * Math.sin(deg2rad * (98.7948 + 635080.1741 * t - 882.765 * t2e4 - 96.461 * t3e6 + 45.533 * t4e8)) - 0.049 * Math.sin(deg2rad * (128.6604 - 95795.2683 * t - 318.812 * t2e4 - 37.547 * t3e6 + 17.738 * t4e8)) - 0.047 * Math.sin(deg2rad * (17.3544 + 425341.6552 * t - 370.570 * t2e4 - 39.946 * t3e6 + 18.854 * t4e8)) - 0.044 * Math.sin(deg2rad * (160.4159 + 4067.2942 * t - 107.806 * t2e4 - 12.475 * t3e6 + 5.913 * t4e8)) - 0.043 * Math.sin(deg2rad * (238.1713 + 854535.1727 * t - 31.065 * t2e4 + 3.623 * t3e6 - 1.769 * t4e8)) + 0.042 * Math.sin(deg2rad * (270.4555 + 1140143.5037 * t - 578.718 * t2e4 - 57.123 * t3e6 + 26.911 * t4e8)) - 0.042 * Math.sin(deg2rad * (132.4925 + 513197.9179 * t + 88.434 * t2e4 + 14.388 * t3e6 - 6.797 * t4e8)) - 0.041 * Math.sin(deg2rad * (122.3573 - 668789.4043 * t - 727.594 * t2e4 - 89.441 * t3e6 + 42.274 * t4e8)) - 0.040 * Math.sin(deg2rad * (105.6788 + 341337.2548 * t - 119.499 * t2e4 - 10.765 * t3e6 + 5.028 * t4e8)) + 0.038 * Math.sin(deg2rad * (135.4921 + 662944.6361 * t - 668.688 * t2e4 - 71.470 * t3e6 + 33.708 * t4e8)) - 0.037 * Math.sin(deg2rad * (242.3910 - 51857.2124 * t - 460.540 * t2e4 - 54.293 * t3e6 + 25.652 * t4e8)) + 0.036 * Math.sin(deg2rad * (336.4374 + 1303869.5784 * t - 155.171 * t2e4 - 7.020 * t3e6 + 3.259 * t4e8)) + 0.035 * Math.sin(deg2rad * (223.0943 - 255454.0489 * t - 850.164 * t2e4 - 100.124 * t3e6 + 47.302 * t4e8)) - 0.034 * Math.sin(deg2rad * (193.2811 - 577061.4302 * t - 300.976 * t2e4 - 39.419 * t3e6 + 18.623 * t4e8)) + 0.031 * Math.sin(deg2rad * (87.6023 - 918398.6850 * t - 181.476 * t2e4 - 28.654 * t3e6 + 13.594 * t4e8));
      var spp = 2.4 * Math.sin(deg2rad * (103.2 + 377336.3 * t));
      var lp = 83.353 + 4069.0137 * t - 103.238 * t2e4 - 12.492 * t3e6 + 5.263 * t4e8 + sp + 1e-3 * t * spp; // longitude of the ascending node

      var sr = -1.4979 * Math.sin(deg2rad * (49.1562 - 75869.8120 * t + 35.458 * t2e4 + 4.231 * t3e6 - 2.001 * t4e8)) - 0.1500 * Math.sin(deg2rad * (357.5291 + 35999.0503 * t - 1.536 * t2e4 + 0.041 * t3e6 + 0.000 * t4e8)) - 0.1226 * Math.sin(deg2rad * (235.7004 + 890534.2230 * t - 32.601 * t2e4 + 3.664 * t3e6 - 1.769 * t4e8)) + 0.1176 * Math.sin(deg2rad * (186.5442 + 966404.0351 * t - 68.058 * t2e4 - 0.567 * t3e6 + 0.232 * t4e8)) - 0.0801 * Math.sin(deg2rad * (83.3826 - 12006.2998 * t + 247.999 * t2e4 + 29.262 * t3e6 - 13.826 * t4e8)) - 0.0616 * Math.sin(deg2rad * (51.6271 - 111868.8623 * t + 36.994 * t2e4 + 4.190 * t3e6 - 2.001 * t4e8)) + 0.0490 * Math.sin(deg2rad * (100.7370 + 413335.3554 * t - 122.571 * t2e4 - 10.684 * t3e6 + 5.028 * t4e8)) + 0.0409 * Math.sin(deg2rad * (308.4192 - 489205.1674 * t + 158.029 * t2e4 + 14.915 * t3e6 - 7.029 * t4e8)) + 0.0327 * Math.sin(deg2rad * (134.9634 + 477198.8676 * t + 89.970 * t2e4 + 14.348 * t3e6 - 6.797 * t4e8)) + 0.0324 * Math.sin(deg2rad * (46.6853 - 39870.7617 * t + 33.922 * t2e4 + 4.272 * t3e6 - 2.001 * t4e8)) + 0.0196 * Math.sin(deg2rad * (98.3124 - 151739.6240 * t + 70.916 * t2e4 + 8.462 * t3e6 - 4.001 * t4e8)) + 0.0180 * Math.sin(deg2rad * (274.1928 - 553068.6797 * t - 54.513 * t2e4 - 10.116 * t3e6 + 4.797 * t4e8)) + 0.0150 * Math.sin(deg2rad * (325.7736 - 63863.5122 * t - 212.541 * t2e4 - 25.031 * t3e6 + 11.826 * t4e8)) - 0.0150 * Math.sin(deg2rad * (184.1196 + 401329.0556 * t + 125.428 * t2e4 + 18.579 * t3e6 - 8.798 * t4e8)) - 0.0078 * Math.sin(deg2rad * (238.1713 + 854535.1727 * t - 31.065 * t2e4 + 3.623 * t3e6 - 1.769 * t4e8)) - 0.0045 * Math.sin(deg2rad * (10.6638 + 1367733.0907 * t + 57.370 * t2e4 + 18.011 * t3e6 - 8.566 * t4e8)) + 0.0044 * Math.sin(deg2rad * (321.5076 + 1443602.9027 * t + 21.912 * t2e4 + 13.780 * t3e6 - 6.566 * t4e8)) - 0.0042 * Math.sin(deg2rad * (162.8868 - 31931.7561 * t - 106.271 * t2e4 - 12.516 * t3e6 + 5.913 * t4e8)) - 0.0031 * Math.sin(deg2rad * (170.9849 - 930404.9848 * t + 66.523 * t2e4 + 0.608 * t3e6 - 0.232 * t4e8)) + 0.0031 * Math.sin(deg2rad * (103.2079 + 377336.3051 * t - 121.035 * t2e4 - 10.724 * t3e6 + 5.028 * t4e8)) + 0.0029 * Math.sin(deg2rad * (222.6120 - 1042273.8471 * t + 103.516 * t2e4 + 4.798 * t3e6 - 2.232 * t4e8)) + 0.0028 * Math.sin(deg2rad * (184.0733 + 1002403.0853 * t - 69.594 * t2e4 - 0.526 * t3e6 + 0.232 * t4e8));
      var srp = 25.9 * Math.sin(deg2rad * (125.0 - 1934.1 * t)) - 4.3 * Math.sin(deg2rad * (220.2 - 1935.5 * t));
      var srpp = 0.38 * Math.sin(deg2rad * (357.5 + 35999.1 * t));
      var raan = 125.0446 - 1934.13618 * t + 20.762 * t2e4 + 2.139 * t3e6 - 1.650 * t4e8 + sr + 1e-3 * (srp + srpp * t); // mean longitude

      var sl = -0.92581 * Math.sin(deg2rad * (235.7004 + 890534.2230 * t - 32.601 * t2e4 + 3.664 * t3e6 - 1.769 * t4e8)) + 0.33262 * Math.sin(deg2rad * (100.7370 + 413335.3554 * t - 122.571 * t2e4 - 10.684 * t3e6 + 5.028 * t4e8)) - 0.18402 * Math.sin(deg2rad * (357.5291 + 35999.0503 * t - 1.536 * t2e4 + 0.041 * t3e6 + 0.000 * t4e8)) + 0.11007 * Math.sin(deg2rad * (134.9634 + 477198.8676 * t + 89.970 * t2e4 + 14.348 * t3e6 - 6.797 * t4e8)) - 0.06055 * Math.sin(deg2rad * (238.1713 + 854535.1727 * t - 31.065 * t2e4 + 3.623 * t3e6 - 1.769 * t4e8)) + 0.04741 * Math.sin(deg2rad * (325.7736 - 63863.5122 * t - 212.541 * t2e4 - 25.031 * t3e6 + 11.826 * t4e8)) - 0.03086 * Math.sin(deg2rad * (10.6638 + 1367733.0907 * t + 57.370 * t2e4 + 18.011 * t3e6 - 8.566 * t4e8)) + 0.02184 * Math.sin(deg2rad * (103.2079 + 377336.3051 * t - 121.035 * t2e4 - 10.724 * t3e6 + 5.028 * t4e8)) + 0.01645 * Math.sin(deg2rad * (49.1562 - 75869.8120 * t + 35.458 * t2e4 + 4.231 * t3e6 - 2.001 * t4e8)) + 0.01022 * Math.sin(deg2rad * (233.2295 + 926533.2733 * t - 34.136 * t2e4 + 3.705 * t3e6 - 1.769 * t4e8)) - 0.00756 * Math.sin(deg2rad * (336.4374 + 1303869.5784 * t - 155.171 * t2e4 - 7.020 * t3e6 + 3.259 * t4e8)) - 0.00530 * Math.sin(deg2rad * (222.5657 - 441199.8173 * t - 91.506 * t2e4 - 14.307 * t3e6 + 6.797 * t4e8)) - 0.00496 * Math.sin(deg2rad * (162.8868 - 31931.7561 * t - 106.271 * t2e4 - 12.516 * t3e6 + 5.913 * t4e8)) - 0.00472 * Math.sin(deg2rad * (297.8502 + 445267.1115 * t - 16.300 * t2e4 + 1.832 * t3e6 - 0.884 * t4e8)) - 0.00271 * Math.sin(deg2rad * (240.6422 + 818536.1225 * t - 29.529 * t2e4 + 3.582 * t3e6 - 1.769 * t4e8)) + 0.00264 * Math.sin(deg2rad * (132.4925 + 513197.9179 * t + 88.434 * t2e4 + 14.388 * t3e6 - 6.797 * t4e8)) - 0.00254 * Math.sin(deg2rad * (186.5442 + 966404.0351 * t - 68.058 * t2e4 - 0.567 * t3e6 + 0.232 * t4e8)) + 0.00234 * Math.sin(deg2rad * (269.9268 + 954397.7353 * t + 179.941 * t2e4 + 28.695 * t3e6 - 13.594 * t4e8)) - 0.00220 * Math.sin(deg2rad * (13.1347 + 1331734.0404 * t + 58.906 * t2e4 + 17.971 * t3e6 - 8.566 * t4e8)) - 0.00202 * Math.sin(deg2rad * (355.0582 + 71998.1006 * t - 3.072 * t2e4 + 0.082 * t3e6 + 0.000 * t4e8)) + 0.00167 * Math.sin(deg2rad * (328.2445 - 99862.5625 * t - 211.005 * t2e4 - 25.072 * t3e6 + 11.826 * t4e8)) - 0.00143 * Math.sin(deg2rad * (173.5506 + 1335801.3346 * t - 48.901 * t2e4 + 5.496 * t3e6 - 2.653 * t4e8)) - 0.00121 * Math.sin(deg2rad * (98.2661 + 449334.4057 * t - 124.107 * t2e4 - 10.643 * t3e6 + 5.028 * t4e8)) - 0.00116 * Math.sin(deg2rad * (145.6272 + 1844931.9583 * t + 147.340 * t2e4 + 32.359 * t3e6 - 15.363 * t4e8)) + 0.00102 * Math.sin(deg2rad * (105.6788 + 341337.2548 * t - 119.499 * t2e4 - 10.765 * t3e6 + 5.028 * t4e8)) - 0.00090 * Math.sin(deg2rad * (184.1196 + 401329.0556 * t + 125.428 * t2e4 + 18.579 * t3e6 - 8.798 * t4e8)) - 0.00086 * Math.sin(deg2rad * (338.9083 + 1267870.5281 * t - 153.636 * t2e4 - 7.061 * t3e6 + 3.259 * t4e8)) - 0.00078 * Math.sin(deg2rad * (111.4008 + 1781068.4461 * t - 65.201 * t2e4 + 7.328 * t3e6 - 3.538 * t4e8)) + 0.00069 * Math.sin(deg2rad * (323.3027 - 27864.4619 * t - 214.077 * t2e4 - 24.990 * t3e6 + 11.826 * t4e8)) + 0.00066 * Math.sin(deg2rad * (51.6271 - 111868.8623 * t + 36.994 * t2e4 + 4.190 * t3e6 - 2.001 * t4e8)) + 0.00065 * Math.sin(deg2rad * (38.5872 + 858602.4669 * t - 138.871 * t2e4 - 8.852 * t3e6 + 4.144 * t4e8)) - 0.00060 * Math.sin(deg2rad * (83.3826 - 12006.2998 * t + 247.999 * t2e4 + 29.262 * t3e6 - 13.826 * t4e8)) + 0.00054 * Math.sin(deg2rad * (201.4740 + 826670.7108 * t - 245.142 * t2e4 - 21.367 * t3e6 + 10.057 * t4e8)) - 0.00052 * Math.sin(deg2rad * (308.4192 - 489205.1674 * t + 158.029 * t2e4 + 14.915 * t3e6 - 7.029 * t4e8)) + 0.00048 * Math.sin(deg2rad * (8.1929 + 1403732.1410 * t + 55.834 * t2e4 + 18.052 * t3e6 - 8.566 * t4e8)) - 0.00041 * Math.sin(deg2rad * (46.6853 - 39870.7617 * t + 33.922 * t2e4 + 4.272 * t3e6 - 2.001 * t4e8)) - 0.00033 * Math.sin(deg2rad * (274.1928 - 553068.6797 * t - 54.513 * t2e4 - 10.116 * t3e6 + 4.797 * t4e8)) + 0.00030 * Math.sin(deg2rad * (160.4159 + 4067.2942 * t - 107.806 * t2e4 - 12.475 * t3e6 + 5.913 * t4e8));
      var slp = 3.96 * Math.sin(deg2rad * (119.7 + 131.8 * t)) + 1.96 * Math.sin(deg2rad * (125.0 - 1934.1 * t));
      var slpp = 0.463 * Math.sin(deg2rad * (357.5 + 35999.1 * t)) + 0.152 * Math.sin(deg2rad * (238.2 + 854535.2 * t)) - 0.071 * Math.sin(deg2rad * (27.8 + 131.8 * t)) - 0.055 * Math.sin(deg2rad * (103.2 + 377336.3 * t)) - 0.026 * Math.sin(deg2rad * (233.2 + 926533.3 * t));
      var slppp = 14 * Math.sin(deg2rad * (357.5 + 35999.1 * t)) + 5 * Math.sin(deg2rad * (238.2 + 854535.2 * t));
      var lambda = 218.31665 + 481267.88134 * t - 13.268 * t2e4 + 1.856 * t3e6 - 1.534 * t4e8 + sl + 1e-3 * (slp + slpp * t + slppp * t2e4);
      dat.a = sma;
      dat.e = ecc;
      dat.i = 2.0 * Math.asin(gamma);
      dat.w = Trig.normalize(deg2rad * (lp - raan));
      dat.N = Trig.normalize(deg2rad * raan);
      dat.M = Trig.normalize(deg2rad * (lambda - lp));
      return dat;
    },
    corr: function corr(dat, sol) {
      var M = Trig.normalize(sol.M + Math.PI),
          w = Trig.normalize(sol.w + Math.PI),
          L = dat.M + dat.w,
          // Argument of latitude 
      E = L + dat.N - M - w; // Mean elongation

      var lon = -0.022234 * Math.sin(dat.M - 2 * E) + // Evection
      0.011494 * Math.sin(2 * E) + // Variation
      -0.003246 * Math.sin(M) + // Yearly Equation
      -0.001029 * Math.sin(2 * dat.M - 2 * E) + -9.94838e-4 * Math.sin(dat.M - 2 * E + M) + 9.25025e-4 * Math.sin(dat.M + 2 * E) + 8.02851e-4 * Math.sin(2 * E - M) + 7.15585e-4 * Math.sin(dat.M - M) + -6.10865e-4 * Math.sin(E) + -5.41052e-4 * Math.sin(dat.M + M) + -2.61799e-4 * Math.sin(2 * L - 2 * E) + 1.91986e-4 * Math.sin(dat.M - 4 * E);
      dat.ra += lon;
      var lat = -0.003019 * Math.sin(L - 2 * E) + -9.59931e-4 * Math.sin(dat.M - L - 2 * E) + -8.02851e-4 * Math.sin(dat.M + L - 2 * E) + 5.75958e-4 * Math.sin(L + 2 * E) + 2.96706e-4 * Math.sin(2 * dat.M + L);
      dat.dec += lat;
      dat.age = Trig.normalize(dat.l - sol.l + Math.PI);
      dat.phase = 0.5 * (1 - Math.cos(dat.age));
      return dat;
    }
  };
  /* global dateDiff, $, px, testNumber, isNumber */

  var datetimepicker = function datetimepicker(cfg, callback) {
    var date = new Date(),
        tzFormat = d3.time.format("%Z"),
        tz = [{
      "−12:00": 720
    }, {
      "−11:00": 660
    }, {
      "−10:00": 600
    }, {
      "−09:30": 570
    }, {
      "−09:00": 540
    }, {
      "−08:00": 480
    }, {
      "−07:00": 420
    }, {
      "−06:00": 360
    }, {
      "−05:00": 300
    }, {
      "−04:30": 270
    }, {
      "−04:00": 240
    }, {
      "−03:30": 210
    }, {
      "−03:00": 180
    }, {
      "−02:00": 120
    }, {
      "−01:00": 60
    }, {
      "±00:00": 0
    }, {
      "+01:00": -60
    }, {
      "+02:00": -120
    }, {
      "+03:00": -180
    }, {
      "+03:30": -210
    }, {
      "+04:00": -240
    }, {
      "+04:30": -270
    }, {
      "+05:00": -300
    }, {
      "+05:30": -330
    }, {
      "+05:45": -345
    }, {
      "+06:00": -360
    }, {
      "+06:30": -390
    }, {
      "+07:00": -420
    }, {
      "+08:00": -480
    }, {
      "+08:30": -510
    }, {
      "+08:45": -525
    }, {
      "+09:00": -540
    }, {
      "+09:30": -570
    }, {
      "+10:00": -600
    }, {
      "+10:30": -630
    }, {
      "+11:00": -660
    }, {
      "+12:00": -720
    }, {
      "+12:45": -765
    }, {
      "+13:00": -780
    }, {
      "+14:00": -840
    }],
        months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        days = ["Su", "M", "Tu", "W", "Th", "F", "Sa"],
        years = getYears(date),
        dateFormat = d3.time.format("%Y-%m-%d"),
        dtrange = cfg.daterange || [];
    var picker = d3.select("#celestial-form").append("div").attr("id", "celestial-date");
    nav("left");
    monSel();
    yrSel();
    nav("right");
    var cal = picker.append("div").attr("id", "cal");
    daySel();
    timeSel();
    tzSel();

    function daySel() {
      var mo = $("mon").value,
          yr = $("yr").value,
          curdt = new Date(yr, mo, 1),
          cal = d3.select("#cal"),
          today = new Date();
      yr = parseInt(yr);
      mo = parseInt(mo);
      curdt.setDate(curdt.getDate() - curdt.getDay());
      var nd = cal.node();

      while (nd.firstChild) {
        nd.removeChild(nd.firstChild);
      }

      for (var i = 0; i < 7; i++) {
        cal.append("div").classed({
          "date": true,
          "weekday": true
        }).html(days[i]);
      }

      for (i = 0; i < 42; i++) {
        var curmon = curdt.getMonth(),
            curday = curdt.getDay(),
            curid = dateFormat(curdt);
        cal.append("div").classed({
          "date": true,
          "grey": curmon !== mo,
          "weekend": curmon === mo && (curday === 0 || curday === 6),
          "today": dateDiff(curdt, today) === 0,
          "selected": dateDiff(curdt, date) === 0
        }).attr("id", curid).on("click", pick).html(curdt.getDate().toString());
        curdt.setDate(curdt.getDate() + 1);
      }
    }

    function yrSel() {
      picker.append("select").attr("title", "Year").attr("id", "yr").on("change", daySel);
      fillYrSel();
    }

    function fillYrSel() {
      var sel = d3.select("select#yr"),
          year = date.getFullYear(),
          selected = 0,
          years = getYears(date);
      sel.selectAll("*").remove();
      sel.selectAll('option').data(years).enter().append('option').text(function (d, i) {
        if (d === year) selected = i;
        return d.toString();
      });
      sel.property("selectedIndex", selected);
    }

    function monSel() {
      var sel = picker.append("select").attr("title", "Month").attr("id", "mon").on("change", daySel),
          selected = 0,
          month = date.getMonth();
      sel.selectAll('option').data(months).enter().append('option').attr("value", function (d, i) {
        if (i === month) selected = i;
        return i;
      }).text(function (d) {
        return d;
      });
      sel.property("selectedIndex", selected);
    }

    function nav(dir) {
      var lnk = picker.append("div").attr("id", dir).on("click", function () {
        var mon = $("mon"),
            yr = $("yr");

        if (dir === "left") {
          if (mon.selectedIndex === 0) {
            mon.selectedIndex = 11;
            yr.selectedIndex--;
          } else mon.selectedIndex--;
        } else {
          if (mon.selectedIndex === 11) {
            mon.selectedIndex = 0;
            yr.selectedIndex++;
          } else mon.selectedIndex++;
        }

        daySel();
      });
    }

    function timeSel() {
      picker.append("input").attr("type", "number").attr("id", "hr").attr("title", "Hours").attr("max", "24").attr("min", "-1").attr("step", "1").attr("value", date.getHours()).on("change", function () {
        if (testNumber(this) === true) pick();
      });
      picker.append("input").attr("type", "number").attr("id", "min").attr("title", "Minutes").attr("max", "60").attr("min", "-1").attr("step", "1").attr("value", date.getMinutes()).on("change", function () {
        if (testNumber(this) === true) pick();
      });
      picker.append("input").attr("type", "number").attr("id", "sec").attr("title", "Seconds").attr("max", "60").attr("min", "-1").attr("step", "1").attr("value", date.getSeconds()).on("change", function () {
        if (testNumber(this) === true) pick();
      });
    }

    function tzSel() {
      var sel = picker.append("select").attr("title", "Time zone offset from UTC").attr("id", "tz").on("change", pick),
          selected = 15,
          timezone = date.getTimezoneOffset();
      sel.selectAll('option').data(tz).enter().append('option').attr("value", function (d, i) {
        var k = Object.keys(d)[0];
        if (d[k] === timezone) selected = i;
        return d[k];
      }).text(function (d) {
        return Object.keys(d)[0];
      });
      sel.property("selectedIndex", selected);
    }

    function getYears(dt) {
      var r = getDateRange(dt.getFullYear()),
          res = [];

      for (var i = r[0]; i <= r[1]; i++) {
        res.push(i);
      }

      return res;
    }

    function getDateRange(yr) {
      if (!dtrange || dtrange.length < 1) return [yr - 10, yr + 10];

      if (dtrange.length === 1 && isNumber(dtrange[0])) {
        if (dtrange[0] >= 100) return [dtrange[0] - 10, dtrange[0] + 10];else return [yr - dtrange[0], yr + dtrange[0]];
      }

      if (dtrange.length === 2 && isNumber(dtrange[0]) && isNumber(dtrange[1])) {
        if (dtrange[1] >= 100) return [dtrange[0], dtrange[1]];else return [dtrange[0] - dtrange[1], dtrange[0] + dtrange[1]];
      }

      return [yr - 10, yr + 10];
    }

    function select(id, val) {
      var sel = $(id);

      for (var i = 0; i < sel.childNodes.length; i++) {
        if (sel.childNodes[i].value == val) {
          sel.selectedIndex = i;
          break;
        }
      }
    }

    function set(dt) {
      if (dt) date.setTime(dt.valueOf());
      select("yr", date.getFullYear());
      select("mon", date.getMonth());
      daySel();
      $("hr").value = date.getHours();
      $("min").value = date.getMinutes();
      $("sec").value = date.getSeconds();
    }

    this.show = function (dt) {
      var nd = $("celestial-date"),
          src = $("datepick"),
          left = src.offsetLeft + src.offsetWidth - nd.offsetWidth,
          top = src.offsetTop - nd.offsetHeight - 1;

      if (nd.offsetTop === -9999) {
        date.setTime(dt.valueOf());
        set();
        d3.select("#celestial-date").style({
          "top": px(top),
          "left": px(left),
          "opacity": 1
        });
        d3.select("#datepick").classed("active", true);
      } else {
        vanish();
      }
    };

    this.isVisible = function () {
      return $("celestial-date").offsetTop !== -9999;
    };

    this.hide = function () {
      vanish();
    };

    function vanish() {
      d3.select("#celestial-date").style("opacity", 0);
      d3.select("#error").style({
        top: "-9999px",
        left: "-9999px",
        opacity: 0
      });
      d3.select("#datepick").classed("active", false);
      setTimeout(function () {
        $("celestial-date").style.top = px(-9999);
      }, 600);
    }

    function pick() {
      var h = $("hr").value,
          m = $("min").value,
          s = $("sec").value,
          tz = $("tz").value;

      if (this.id && this.id.search(/^\d/) !== -1) {
        date = dateFormat.parse(this.id);
      }

      fillYrSel();
      date.setHours(h, m, s);
      set();
      callback(date, tz);
    }
  }; // Copyright 2014, Jason Davies, http://www.jasondavies.com
  // See LICENSE.txt for details.


  (function () {
    var radians = Math.PI / 180,
        degrees = 180 / Math.PI; // TODO make incremental rotate optional

    d3.geo.zoom = function () {
      var projection, duration;
      var zoomPoint,
          zooming = 0,
          event = d3_eventDispatch(zoom, "zoomstart", "zoom", "zoomend"),
          zoom = d3.behavior.zoom().on("zoomstart", function () {
        var mouse0 = d3.mouse(this),
            rotate = quaternionFromEuler(projection.rotate()),
            point = position(projection, mouse0);
        if (point) zoomPoint = point;
        zoomOn.call(zoom, "zoom", function () {
          projection.scale(view.k = d3.event.scale);
          var mouse1 = d3.mouse(this),
              between = rotateBetween(zoomPoint, position(projection, mouse1));
          projection.rotate(view.r = eulerFromQuaternion(rotate = between ? multiply(rotate, between) : multiply(bank(projection, mouse0, mouse1), rotate)));
          mouse0 = mouse1;
          zoomed(event.of(this, arguments));
        });
        zoomstarted(event.of(this, arguments));
      }).on("zoomend", function () {
        zoomOn.call(zoom, "zoom", null);
        zoomended(event.of(this, arguments));
      }),
          zoomOn = zoom.on,
          view = {
        r: [0, 0, 0],
        k: 1
      };

      zoom.rotateTo = function (location) {
        var between = rotateBetween(cartesian(location), cartesian([-view.r[0], -view.r[1]]));
        return eulerFromQuaternion(multiply(quaternionFromEuler(view.r), between));
      };

      zoom.projection = function (_) {
        if (!arguments.length) return projection;
        projection = _;
        view = {
          r: projection.rotate(),
          k: projection.scale()
        };
        return zoom.scale(view.k);
      };

      zoom.duration = function (_) {
        return arguments.length ? (duration = _, zoom) : duration;
      };

      zoom.event = function (g) {
        g.each(function () {
          var g = d3.select(this),
              dispatch = event.of(this, arguments),
              view1 = view,
              transition = d3.transition(g);

          if (transition !== g) {
            transition.each("start.zoom", function () {
              if (this.__chart__) {
                // pre-transition state
                view = this.__chart__;
                if (!view.hasOwnProperty("r")) view.r = projection.rotate();
              }

              projection.rotate(view.r).scale(view.k);
              zoomstarted(dispatch);
            }).tween("zoom:zoom", function () {
              var width = zoom.size()[0],
                  i = interpolateBetween(quaternionFromEuler(view.r), quaternionFromEuler(view1.r)),
                  d = d3.geo.distance(view.r, view1.r),
                  smooth = d3.interpolateZoom([0, 0, width / view.k], [d, 0, width / view1.k]);
              if (duration) transition.duration(duration(smooth.duration * .001)); // see https://github.com/mbostock/d3/pull/2045

              return function (t) {
                var uw = smooth(t);
                this.__chart__ = view = {
                  r: eulerFromQuaternion(i(uw[0] / d)),
                  k: width / uw[2]
                };
                projection.rotate(view.r).scale(view.k);
                zoom.scale(view.k);
                zoomed(dispatch);
              };
            }).each("end.zoom", function () {
              zoomended(dispatch);
            });

            try {
              // see https://github.com/mbostock/d3/pull/1983
              transition.each("interrupt.zoom", function () {
                zoomended(dispatch);
              });
            } catch (e) {
              console.log(e);
            }
          } else {
            this.__chart__ = view;
            zoomstarted(dispatch);
            zoomed(dispatch);
            zoomended(dispatch);
          }
        });
      };

      function zoomstarted(dispatch) {
        if (!zooming++) dispatch({
          type: "zoomstart"
        });
      }

      function zoomed(dispatch) {
        dispatch({
          type: "zoom"
        });
      }

      function zoomended(dispatch) {
        if (! --zooming) dispatch({
          type: "zoomend"
        });
      }

      return d3.rebind(zoom, event, "on");
    };

    function bank(projection, p0, p1) {
      var t = projection.translate(),
          angle = Math.atan2(p0[1] - t[1], p0[0] - t[0]) - Math.atan2(p1[1] - t[1], p1[0] - t[0]);
      return [Math.cos(angle / 2), 0, 0, Math.sin(angle / 2)];
    }

    function position(projection, point) {
      var spherical = projection.invert(point);
      return spherical && isFinite(spherical[0]) && isFinite(spherical[1]) && cartesian(spherical);
    }

    function quaternionFromEuler(euler) {
      var λ = .5 * euler[0] * radians,
          φ = .5 * euler[1] * radians,
          γ = .5 * euler[2] * radians,
          sinλ = Math.sin(λ),
          cosλ = Math.cos(λ),
          sinφ = Math.sin(φ),
          cosφ = Math.cos(φ),
          sinγ = Math.sin(γ),
          cosγ = Math.cos(γ);
      return [cosλ * cosφ * cosγ + sinλ * sinφ * sinγ, sinλ * cosφ * cosγ - cosλ * sinφ * sinγ, cosλ * sinφ * cosγ + sinλ * cosφ * sinγ, cosλ * cosφ * sinγ - sinλ * sinφ * cosγ];
    }

    function multiply(a, b) {
      var a0 = a[0],
          a1 = a[1],
          a2 = a[2],
          a3 = a[3],
          b0 = b[0],
          b1 = b[1],
          b2 = b[2],
          b3 = b[3];
      return [a0 * b0 - a1 * b1 - a2 * b2 - a3 * b3, a0 * b1 + a1 * b0 + a2 * b3 - a3 * b2, a0 * b2 - a1 * b3 + a2 * b0 + a3 * b1, a0 * b3 + a1 * b2 - a2 * b1 + a3 * b0];
    }

    function rotateBetween(a, b) {
      if (!a || !b) return;
      var axis = cross(a, b),
          norm = Math.sqrt(dot(axis, axis)),
          halfγ = .5 * Math.acos(Math.max(-1, Math.min(1, dot(a, b)))),
          k = Math.sin(halfγ) / norm;
      return norm && [Math.cos(halfγ), axis[2] * k, -axis[1] * k, axis[0] * k];
    } // Interpolate between two quaternions (slerp).


    function interpolateBetween(a, b) {
      var d = Math.max(-1, Math.min(1, dot(a, b))),
          s = d < 0 ? -1 : 1,
          θ = Math.acos(s * d),
          sinθ = Math.sin(θ);
      return sinθ ? function (t) {
        var A = s * Math.sin((1 - t) * θ) / sinθ,
            B = Math.sin(t * θ) / sinθ;
        return [a[0] * A + b[0] * B, a[1] * A + b[1] * B, a[2] * A + b[2] * B, a[3] * A + b[3] * B];
      } : function () {
        return a;
      };
    }

    function eulerFromQuaternion(q) {
      return [Math.atan2(2 * (q[0] * q[1] + q[2] * q[3]), 1 - 2 * (q[1] * q[1] + q[2] * q[2])) * degrees, Math.asin(Math.max(-1, Math.min(1, 2 * (q[0] * q[2] - q[3] * q[1])))) * degrees, Math.atan2(2 * (q[0] * q[3] + q[1] * q[2]), 1 - 2 * (q[2] * q[2] + q[3] * q[3])) * degrees];
    }

    function cartesian(spherical) {
      var λ = spherical[0] * radians,
          φ = spherical[1] * radians,
          cosφ = Math.cos(φ);
      return [cosφ * Math.cos(λ), cosφ * Math.sin(λ), Math.sin(φ)];
    }

    function dot(a, b) {
      for (var i = 0, n = a.length, s = 0; i < n; ++i) {
        s += a[i] * b[i];
      }

      return s;
    }

    function cross(a, b) {
      return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
    } // Like d3.dispatch, but for custom events abstracting native UI events. These
    // events have a target component (such as a brush), a target element (such as
    // the svg:g element containing the brush) and the standard arguments `d` (the
    // target element's data) and `i` (the selection index of the target element).


    function d3_eventDispatch(target) {
      var i = 0,
          n = arguments.length,
          argumentz = [];

      while (++i < n) {
        argumentz.push(arguments[i]);
      }

      var dispatch = d3.dispatch.apply(null, argumentz); // Creates a dispatch context for the specified `thiz` (typically, the target
      // DOM element that received the source event) and `argumentz` (typically, the
      // data `d` and index `i` of the target element). The returned function can be
      // used to dispatch an event to any registered listeners; the function takes a
      // single argument as input, being the event to dispatch. The event must have
      // a "type" attribute which corresponds to a type registered in the
      // constructor. This context will automatically populate the "sourceEvent" and
      // "target" attributes of the event, as well as setting the `d3.event` global
      // for the duration of the notification.

      dispatch.of = function (thiz, argumentz) {
        return function (e1) {
          try {
            var e0 = e1.sourceEvent = d3.event;
            e1.target = target;
            d3.event = e1;
            dispatch[e1.type].apply(thiz, argumentz);
          } finally {
            d3.event = e0;
          }
        };
      };

      return dispatch;
    }
  })();

  return Celestial;
};
// EXTERNAL MODULE: external "lodash"
var external_lodash_ = __webpack_require__("lodash");

// CONCATENATED MODULE: ./Celestial.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Celestial", function() { return Celestial_Celestial; });
function Celestial_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Celestial_typeof = function _typeof(obj) { return typeof obj; }; } else { Celestial_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Celestial_typeof(obj); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (Celestial_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






__webpack_require__(/*! ./libs/d3.geo.projection.js */ "./libs/d3.geo.projection.js");

var hour2CelestialDegree = function hour2CelestialDegree(ra) {
  return ra > 12 ? (ra - 24) * 15 : ra * 15;
};

var sanitize = function sanitize(config) {
  return _objectSpread({}, config, {
    center: config && config.center && [hour2CelestialDegree(config.center[0]), config.center[1], config.center[2] || 0]
  });
};

var Celestial_Celestial =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Celestial, _React$Component);

  function Celestial(props) {
    var _this;

    _classCallCheck(this, Celestial);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Celestial).call(this, props));

    _this.addFeaturesCollection = function (fc) {
      return _this.featuresCollections.push(fc);
    };

    _this.componentDidMount = function () {
      return setTimeout(function () {
        _this.containerMounted = new Date().getTime();

        _this.featuresCollections.forEach(function (fc) {
          return fc(_this.celestial);
        });

        var _this$props = _this.props,
            config = _this$props.config,
            zoom = _this$props.zoom;

        _this.celestial.display(sanitize(config));

        if (zoom > 0) {
          _this.zoom(zoom);
        }
      }, 500);
    };

    _this.zoom = function (ratio) {
      return _this.celestial.zoomBy(ratio);
    };

    _this.zoomTo = function (level) {
      return _this.zoom(level / _this.zoom());
    };

    _this.updateConfig = function (prevConfig, nextConfig) {
      if (_this.updateConfigTimer) {
        clearTimeout(_this.updateConfigTimer);
      }

      _this.updateConfigTimer = setTimeout(function () {
        _this.updateConfigTimer = null;

        _this.celestial.apply(sanitize(nextConfig));

        if (Object(external_lodash_["get"])(prevConfig, 'stars.data') != Object(external_lodash_["get"])(nextConfig, 'stars.data') || Object(external_lodash_["get"])(prevConfig, 'dsos.data') != Object(external_lodash_["get"])(nextConfig, 'dsos.data')) {
          _this.celestial.reload(sanitize(nextConfig));
        }
      }, 1000);
    };

    _this.shouldComponentUpdate = function (nextProps) {
      var _this$props2 = _this.props,
          config = _this$props2.config,
          zoom = _this$props2.zoom;

      if (nextProps.config != config) {
        _this.updateConfig(config, nextProps.config);
      }

      return false;
    };

    _this.render = function () {
      return external_react_default.a.createElement("div", {
        id: "celestial-map"
      }, external_react_default.a.Children.map(_this.props.children, function (c) {
        return external_react_default.a.cloneElement(c, {
          addFeaturesCollection: _this.addFeaturesCollection
        });
      }));
    };

    _this.celestial = createCelestial(d3_min);
    _this.featuresCollections = [];
    return _this;
  }

  return Celestial;
}(external_react_default.a.Component);

var Celestial_CelestialFeaturesCollection =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CelestialFeaturesCollection, _React$PureComponent);

  function CelestialFeaturesCollection(props) {
    var _this2;

    _classCallCheck(this, CelestialFeaturesCollection);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(CelestialFeaturesCollection).call(this, props));

    _this2.addFeature = function (feature) {
      return _this2.features.push(feature);
    };

    _this2.componentDidMount = function () {
      _this2.props.addFeaturesCollection(_this2.addToCelestial);
    };

    _this2.addToCelestial = function (celestial) {
      return celestial.add({
        type: 'raw',
        callback: function callback() {
          return _this2.celCallback(celestial);
        },
        redraw: function redraw() {
          return _this2.celRedraw(celestial);
        }
      });
    };

    _this2.celCallback = function (celestial) {
      var json = {
        type: 'FeatureCollection',
        features: _this2.features
      };
      celestial.container.selectAll(".".concat(_this2.props.objectsClass)).data(json.features).enter().append("path").attr("class", _this2.props.objectsClass);
      celestial.redraw();
    };

    _this2.celRedraw = function (celestial) {
      // Select the added objects by class name as given previously
      celestial.container.selectAll(".".concat(_this2.props.objectsClass)).each(function (d) {
        // If point is visible (this doesn't work automatically for points)
        if (celestial.clip(d.geometry.coordinates)) {
          // get point coordinates
          var pt = celestial.mapProjection(d.geometry.coordinates); // object radius in pixel, could be varable depending on e.g. magnitude

          var r = _this2.props.absoluteSize ? d.properties.size : Math.pow(parseInt(d.properties.size) * 0.25, 0.5); // draw on canvas
          // Set object styles

          celestial.setStyle(_this2.props.symbolStyle); // Start the drawing path

          celestial.context.beginPath(); // Thats a circle in html5 canvas

          celestial.context.arc(pt[0], pt[1], r, 0, 2 * Math.PI); // Finish the drawing path

          celestial.context.closePath(); // Draw a line along the path with the prevoiusly set stroke color and line width      

          celestial.context.stroke(); // Fill the object path with the prevoiusly set fill color

          celestial.context.fill(); // Set text styles       

          celestial.setTextStyle(_this2.props.textStyle); // and draw text on canvas

          celestial.context.fillText(d.properties.name, pt[0] + r, pt[1] + r);
        }
      });
    };

    _this2.render = function () {
      return external_react_default.a.Children.map(_this2.props.children, function (c) {
        return external_react_default.a.cloneElement(c, {
          addFeature: _this2.addFeature
        });
      });
    };

    _this2.features = [];
    return _this2;
  }

  return CelestialFeaturesCollection;
}(external_react_default.a.PureComponent);

var CelestialComponentPoint =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(CelestialComponentPoint, _React$Component2);

  function CelestialComponentPoint() {
    var _getPrototypeOf2;

    var _temp, _this3;

    _classCallCheck(this, CelestialComponentPoint);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this3, (_temp = _this3 = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CelestialComponentPoint)).call.apply(_getPrototypeOf2, [this].concat(args))), _this3.componentDidMount = function () {
      var _this3$props = _this3.props,
          ra = _this3$props.ra,
          dec = _this3$props.dec,
          id = _this3$props.id,
          properties = _objectWithoutProperties(_this3$props, ["ra", "dec", "id"]);

      _this3.props.addFeature({
        type: 'Feature',
        id: id,
        properties: properties,
        geometry: {
          type: 'Point',
          coordinates: [hour2CelestialDegree(ra), dec]
        }
      });
    }, _this3.render = function () {
      return null;
    }, _temp));
  }

  return CelestialComponentPoint;
}(external_react_default.a.Component);

Celestial_Celestial.FeaturesCollection = Celestial_CelestialFeaturesCollection;
Celestial_Celestial.Point = CelestialComponentPoint;

/***/ }),

/***/ "./libs/d3.geo.projection.js":
/*!***********************************!*\
  !*** ./libs/d3.geo.projection.js ***!
  \***********************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

(function () {
  d3.geo.project = function (object, projection) {
    var stream = projection.stream;
    if (!stream) throw new Error("not yet supported");
    return (object && d3_geo_projectObjectType.hasOwnProperty(object.type) ? d3_geo_projectObjectType[object.type] : d3_geo_projectGeometry)(object, stream);
  };

  function d3_geo_projectFeature(object, stream) {
    return {
      type: "Feature",
      id: object.id,
      properties: object.properties,
      geometry: d3_geo_projectGeometry(object.geometry, stream)
    };
  }

  function d3_geo_projectGeometry(geometry, stream) {
    if (!geometry) return null;
    if (geometry.type === "GeometryCollection") return {
      type: "GeometryCollection",
      geometries: object.geometries.map(function (geometry) {
        return d3_geo_projectGeometry(geometry, stream);
      })
    };
    if (!d3_geo_projectGeometryType.hasOwnProperty(geometry.type)) return null;
    var sink = d3_geo_projectGeometryType[geometry.type];
    d3.geo.stream(geometry, stream(sink));
    return sink.result();
  }

  var d3_geo_projectObjectType = {
    Feature: d3_geo_projectFeature,
    FeatureCollection: function FeatureCollection(object, stream) {
      return {
        type: "FeatureCollection",
        features: object.features.map(function (feature) {
          return d3_geo_projectFeature(feature, stream);
        })
      };
    }
  };
  var d3_geo_projectPoints = [],
      d3_geo_projectLines = [];
  var d3_geo_projectPoint = {
    point: function point(x, y) {
      d3_geo_projectPoints.push([x, y]);
    },
    result: function result() {
      var result = !d3_geo_projectPoints.length ? null : d3_geo_projectPoints.length < 2 ? {
        type: "Point",
        coordinates: d3_geo_projectPoints[0]
      } : {
        type: "MultiPoint",
        coordinates: d3_geo_projectPoints
      };
      d3_geo_projectPoints = [];
      return result;
    }
  };
  var d3_geo_projectLine = {
    lineStart: d3_geo_projectNoop,
    point: function point(x, y) {
      d3_geo_projectPoints.push([x, y]);
    },
    lineEnd: function lineEnd() {
      if (d3_geo_projectPoints.length) d3_geo_projectLines.push(d3_geo_projectPoints), d3_geo_projectPoints = [];
    },
    result: function result() {
      var result = !d3_geo_projectLines.length ? null : d3_geo_projectLines.length < 2 ? {
        type: "LineString",
        coordinates: d3_geo_projectLines[0]
      } : {
        type: "MultiLineString",
        coordinates: d3_geo_projectLines
      };
      d3_geo_projectLines = [];
      return result;
    }
  };
  var d3_geo_projectPolygon = {
    polygonStart: d3_geo_projectNoop,
    lineStart: d3_geo_projectNoop,
    point: function point(x, y) {
      d3_geo_projectPoints.push([x, y]);
    },
    lineEnd: function lineEnd() {
      var n = d3_geo_projectPoints.length;

      if (n) {
        do {
          d3_geo_projectPoints.push(d3_geo_projectPoints[0].slice());
        } while (++n < 4);

        d3_geo_projectLines.push(d3_geo_projectPoints), d3_geo_projectPoints = [];
      }
    },
    polygonEnd: d3_geo_projectNoop,
    result: function result() {
      if (!d3_geo_projectLines.length) return null;
      var polygons = [],
          holes = [];
      d3_geo_projectLines.forEach(function (ring) {
        if (d3_geo_projectClockwise(ring)) polygons.push([ring]);else holes.push(ring);
      });
      holes.forEach(function (hole) {
        var point = hole[0];
        polygons.some(function (polygon) {
          if (d3_geo_projectContains(polygon[0], point)) {
            polygon.push(hole);
            return true;
          }
        }) || polygons.push([hole]);
      });
      d3_geo_projectLines = [];
      return !polygons.length ? null : polygons.length > 1 ? {
        type: "MultiPolygon",
        coordinates: polygons
      } : {
        type: "Polygon",
        coordinates: polygons[0]
      };
    }
  };
  var d3_geo_projectGeometryType = {
    Point: d3_geo_projectPoint,
    MultiPoint: d3_geo_projectPoint,
    LineString: d3_geo_projectLine,
    MultiLineString: d3_geo_projectLine,
    Polygon: d3_geo_projectPolygon,
    MultiPolygon: d3_geo_projectPolygon,
    Sphere: d3_geo_projectPolygon
  };

  function d3_geo_projectNoop() {}

  function d3_geo_projectClockwise(ring) {
    if ((n = ring.length) < 4) return false;
    var i = 0,
        n,
        area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];

    while (++i < n) {
      area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
    }

    return area <= 0;
  }

  function d3_geo_projectContains(ring, point) {
    var x = point[0],
        y = point[1],
        contains = false;

    for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
      var pi = ring[i],
          xi = pi[0],
          yi = pi[1],
          pj = ring[j],
          xj = pj[0],
          yj = pj[1];
      if (yi > y ^ yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) contains = !contains;
    }

    return contains;
  }

  var ε = 1e-6,
      ε2 = ε * ε,
      π = Math.PI,
      halfπ = π / 2,
      sqrtπ = Math.sqrt(π),
      radians = π / 180,
      degrees = 180 / π;

  function sinci(x) {
    return x ? x / Math.sin(x) : 1;
  }

  function sgn(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  }

  function asin(x) {
    return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x);
  }

  function acos(x) {
    return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
  }

  function asqrt(x) {
    return x > 0 ? Math.sqrt(x) : 0;
  }

  var projection = d3.geo.projection,
      projectionMutator = d3.geo.projectionMutator;

  d3.geo.interrupt = function (project) {
    var lobes = [[[[-π, 0], [0, halfπ], [π, 0]]], [[[-π, 0], [0, -halfπ], [π, 0]]]];
    var bounds;

    function forward(λ, φ) {
      var sign = φ < 0 ? -1 : +1,
          hemilobes = lobes[+(φ < 0)];

      for (var i = 0, n = hemilobes.length - 1; i < n && λ > hemilobes[i][2][0]; ++i) {
        ;
      }

      var coordinates = project(λ - hemilobes[i][1][0], φ);
      coordinates[0] += project(hemilobes[i][1][0], sign * φ > sign * hemilobes[i][0][1] ? hemilobes[i][0][1] : φ)[0];
      return coordinates;
    }

    function reset() {
      bounds = lobes.map(function (hemilobes) {
        return hemilobes.map(function (lobe) {
          var x0 = project(lobe[0][0], lobe[0][1])[0],
              x1 = project(lobe[2][0], lobe[2][1])[0],
              y0 = project(lobe[1][0], lobe[0][1])[1],
              y1 = project(lobe[1][0], lobe[1][1])[1],
              t;
          if (y0 > y1) t = y0, y0 = y1, y1 = t;
          return [[x0, y0], [x1, y1]];
        });
      });
    }

    if (project.invert) forward.invert = function (x, y) {
      var hemibounds = bounds[+(y < 0)],
          hemilobes = lobes[+(y < 0)];

      for (var i = 0, n = hemibounds.length; i < n; ++i) {
        var b = hemibounds[i];

        if (b[0][0] <= x && x < b[1][0] && b[0][1] <= y && y < b[1][1]) {
          var coordinates = project.invert(x - project(hemilobes[i][1][0], 0)[0], y);
          coordinates[0] += hemilobes[i][1][0];
          return pointEqual(forward(coordinates[0], coordinates[1]), [x, y]) ? coordinates : null;
        }
      }
    };
    var projection = d3.geo.projection(forward),
        stream_ = projection.stream;

    projection.stream = function (stream) {
      var rotate = projection.rotate(),
          rotateStream = stream_(stream),
          sphereStream = (projection.rotate([0, 0]), stream_(stream));
      projection.rotate(rotate);

      rotateStream.sphere = function () {
        d3.geo.stream(sphere(), sphereStream);
      };

      return rotateStream;
    };

    projection.lobes = function (_) {
      if (!arguments.length) return lobes.map(function (lobes) {
        return lobes.map(function (lobe) {
          return [[lobe[0][0] * 180 / π, lobe[0][1] * 180 / π], [lobe[1][0] * 180 / π, lobe[1][1] * 180 / π], [lobe[2][0] * 180 / π, lobe[2][1] * 180 / π]];
        });
      });
      lobes = _.map(function (lobes) {
        return lobes.map(function (lobe) {
          return [[lobe[0][0] * π / 180, lobe[0][1] * π / 180], [lobe[1][0] * π / 180, lobe[1][1] * π / 180], [lobe[2][0] * π / 180, lobe[2][1] * π / 180]];
        });
      });
      reset();
      return projection;
    };

    function sphere() {
      var ε = 1e-6,
          coordinates = [];

      for (var i = 0, n = lobes[0].length; i < n; ++i) {
        var lobe = lobes[0][i],
            λ0 = lobe[0][0] * 180 / π,
            φ0 = lobe[0][1] * 180 / π,
            φ1 = lobe[1][1] * 180 / π,
            λ2 = lobe[2][0] * 180 / π,
            φ2 = lobe[2][1] * 180 / π;
        coordinates.push(resample([[λ0 + ε, φ0 + ε], [λ0 + ε, φ1 - ε], [λ2 - ε, φ1 - ε], [λ2 - ε, φ2 + ε]], 30));
      }

      for (var i = lobes[1].length - 1; i >= 0; --i) {
        var lobe = lobes[1][i],
            λ0 = lobe[0][0] * 180 / π,
            φ0 = lobe[0][1] * 180 / π,
            φ1 = lobe[1][1] * 180 / π,
            λ2 = lobe[2][0] * 180 / π,
            φ2 = lobe[2][1] * 180 / π;
        coordinates.push(resample([[λ2 - ε, φ2 - ε], [λ2 - ε, φ1 + ε], [λ0 + ε, φ1 + ε], [λ0 + ε, φ0 - ε]], 30));
      }

      return {
        type: "Polygon",
        coordinates: [d3.merge(coordinates)]
      };
    }

    function resample(coordinates, m) {
      var i = -1,
          n = coordinates.length,
          p0 = coordinates[0],
          p1,
          dx,
          dy,
          resampled = [];

      while (++i < n) {
        p1 = coordinates[i];
        dx = (p1[0] - p0[0]) / m;
        dy = (p1[1] - p0[1]) / m;

        for (var j = 0; j < m; ++j) {
          resampled.push([p0[0] + j * dx, p0[1] + j * dy]);
        }

        p0 = p1;
      }

      resampled.push(p1);
      return resampled;
    }

    function pointEqual(a, b) {
      return Math.abs(a[0] - b[0]) < ε && Math.abs(a[1] - b[1]) < ε;
    }

    return projection;
  };

  function airy(β) {
    var tanβ_2 = Math.tan(.5 * β),
        B = 2 * Math.log(Math.cos(.5 * β)) / (tanβ_2 * tanβ_2);

    function forward(λ, φ) {
      var cosλ = Math.cos(λ),
          cosφ = Math.cos(φ),
          sinφ = Math.sin(φ),
          cosz = cosφ * cosλ,
          K = -((1 - cosz ? Math.log(.5 * (1 + cosz)) / (1 - cosz) : -.5) + B / (1 + cosz));
      return [K * cosφ * Math.sin(λ), K * sinφ];
    }

    forward.invert = function (x, y) {
      var ρ = Math.sqrt(x * x + y * y),
          z = β * -.5,
          i = 50,
          δ;
      if (!ρ) return [0, 0];

      do {
        var z_2 = .5 * z,
            cosz_2 = Math.cos(z_2),
            sinz_2 = Math.sin(z_2),
            tanz_2 = Math.tan(z_2),
            lnsecz_2 = Math.log(1 / cosz_2);
        z -= δ = (2 / tanz_2 * lnsecz_2 - B * tanz_2 - ρ) / (-lnsecz_2 / (sinz_2 * sinz_2) + 1 - B / (2 * cosz_2 * cosz_2));
      } while (Math.abs(δ) > ε && --i > 0);

      var sinz = Math.sin(z);
      return [Math.atan2(x * sinz, ρ * Math.cos(z)), asin(y * sinz / ρ)];
    };

    return forward;
  }

  function airyProjection() {
    var β = halfπ,
        m = projectionMutator(airy),
        p = m(β);

    p.radius = function (_) {
      if (!arguments.length) return β / π * 180;
      return m(β = _ * π / 180);
    };

    return p;
  }

  (d3.geo.airy = airyProjection).raw = airy;

  function aitoff(λ, φ) {
    var cosφ = Math.cos(φ),
        sinciα = sinci(acos(cosφ * Math.cos(λ /= 2)));
    return [2 * cosφ * Math.sin(λ) * sinciα, Math.sin(φ) * sinciα];
  }

  aitoff.invert = function (x, y) {
    if (x * x + 4 * y * y > π * π + ε) return;
    var λ = x,
        φ = y,
        i = 25;

    do {
      var sinλ = Math.sin(λ),
          sinλ_2 = Math.sin(λ / 2),
          cosλ_2 = Math.cos(λ / 2),
          sinφ = Math.sin(φ),
          cosφ = Math.cos(φ),
          sin_2φ = Math.sin(2 * φ),
          sin2φ = sinφ * sinφ,
          cos2φ = cosφ * cosφ,
          sin2λ_2 = sinλ_2 * sinλ_2,
          C = 1 - cos2φ * cosλ_2 * cosλ_2,
          E = C ? acos(cosφ * cosλ_2) * Math.sqrt(F = 1 / C) : F = 0,
          F,
          fx = 2 * E * cosφ * sinλ_2 - x,
          fy = E * sinφ - y,
          δxδλ = F * (cos2φ * sin2λ_2 + E * cosφ * cosλ_2 * sin2φ),
          δxδφ = F * (.5 * sinλ * sin_2φ - E * 2 * sinφ * sinλ_2),
          δyδλ = F * .25 * (sin_2φ * sinλ_2 - E * sinφ * cos2φ * sinλ),
          δyδφ = F * (sin2φ * cosλ_2 + E * sin2λ_2 * cosφ),
          denominator = δxδφ * δyδλ - δyδφ * δxδλ;
      if (!denominator) break;
      var δλ = (fy * δxδφ - fx * δyδφ) / denominator,
          δφ = (fx * δyδλ - fy * δxδλ) / denominator;
      λ -= δλ, φ -= δφ;
    } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);

    return [λ, φ];
  };

  (d3.geo.aitoff = function () {
    return projection(aitoff);
  }).raw = aitoff;

  function armadillo(φ0) {
    var sinφ0 = Math.sin(φ0),
        cosφ0 = Math.cos(φ0),
        sφ0 = φ0 > 0 ? 1 : -1,
        tanφ0 = Math.tan(sφ0 * φ0),
        k = (1 + sinφ0 - cosφ0) / 2;

    function forward(λ, φ) {
      var cosφ = Math.cos(φ),
          cosλ = Math.cos(λ /= 2);
      return [(1 + cosφ) * Math.sin(λ), (sφ0 * φ > -Math.atan2(cosλ, tanφ0) - .001 ? 0 : -sφ0 * 10) + k + Math.sin(φ) * cosφ0 - (1 + cosφ) * sinφ0 * cosλ];
    }

    forward.invert = function (x, y) {
      var λ = 0,
          φ = 0,
          i = 50;

      do {
        var cosλ = Math.cos(λ),
            sinλ = Math.sin(λ),
            cosφ = Math.cos(φ),
            sinφ = Math.sin(φ),
            A = 1 + cosφ,
            fx = A * sinλ - x,
            fy = k + sinφ * cosφ0 - A * sinφ0 * cosλ - y,
            δxδλ = .5 * A * cosλ,
            δxδφ = -sinλ * sinφ,
            δyδλ = .5 * sinφ0 * A * sinλ,
            δyδφ = cosφ0 * cosφ + sinφ0 * cosλ * sinφ,
            denominator = δxδφ * δyδλ - δyδφ * δxδλ,
            δλ = .5 * (fy * δxδφ - fx * δyδφ) / denominator,
            δφ = (fx * δyδλ - fy * δxδλ) / denominator;
        λ -= δλ, φ -= δφ;
      } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);

      return sφ0 * φ > -Math.atan2(Math.cos(λ), tanφ0) - .001 ? [λ * 2, φ] : null;
    };

    return forward;
  }

  function armadilloProjection() {
    var φ0 = π / 9,
        sφ0 = φ0 > 0 ? 1 : -1,
        tanφ0 = Math.tan(sφ0 * φ0),
        m = projectionMutator(armadillo),
        p = m(φ0),
        stream_ = p.stream;

    p.parallel = function (_) {
      if (!arguments.length) return φ0 / π * 180;
      tanφ0 = Math.tan((sφ0 = (φ0 = _ * π / 180) > 0 ? 1 : -1) * φ0);
      return m(φ0);
    };

    p.stream = function (stream) {
      var rotate = p.rotate(),
          rotateStream = stream_(stream),
          sphereStream = (p.rotate([0, 0]), stream_(stream));
      p.rotate(rotate);

      rotateStream.sphere = function () {
        sphereStream.polygonStart(), sphereStream.lineStart();

        for (var λ = sφ0 * -180; sφ0 * λ < 180; λ += sφ0 * 90) {
          sphereStream.point(λ, sφ0 * 90);
        }

        while (sφ0 * (λ -= φ0) >= -180) {
          sphereStream.point(λ, sφ0 * -Math.atan2(Math.cos(λ * radians / 2), tanφ0) * degrees);
        }

        sphereStream.lineEnd(), sphereStream.polygonEnd();
      };

      return rotateStream;
    };

    return p;
  }

  (d3.geo.armadillo = armadilloProjection).raw = armadillo;

  function tanh(x) {
    x = Math.exp(2 * x);
    return (x - 1) / (x + 1);
  }

  function sinh(x) {
    return .5 * (Math.exp(x) - Math.exp(-x));
  }

  function cosh(x) {
    return .5 * (Math.exp(x) + Math.exp(-x));
  }

  function arsinh(x) {
    return Math.log(x + asqrt(x * x + 1));
  }

  function arcosh(x) {
    return Math.log(x + asqrt(x * x - 1));
  }

  function august(λ, φ) {
    var tanφ = Math.tan(φ / 2),
        k = asqrt(1 - tanφ * tanφ),
        c = 1 + k * Math.cos(λ /= 2),
        x = Math.sin(λ) * k / c,
        y = tanφ / c,
        x2 = x * x,
        y2 = y * y;
    return [4 / 3 * x * (3 + x2 - 3 * y2), 4 / 3 * y * (3 + 3 * x2 - y2)];
  }

  august.invert = function (x, y) {
    x *= 3 / 8, y *= 3 / 8;
    if (!x && Math.abs(y) > 1) return null;
    var x2 = x * x,
        y2 = y * y,
        s = 1 + x2 + y2,
        sin3η = Math.sqrt(.5 * (s - Math.sqrt(s * s - 4 * y * y))),
        η = asin(sin3η) / 3,
        ξ = sin3η ? arcosh(Math.abs(y / sin3η)) / 3 : arsinh(Math.abs(x)) / 3,
        cosη = Math.cos(η),
        coshξ = cosh(ξ),
        d = coshξ * coshξ - cosη * cosη;
    return [sgn(x) * 2 * Math.atan2(sinh(ξ) * cosη, .25 - d), sgn(y) * 2 * Math.atan2(coshξ * Math.sin(η), .25 + d)];
  };

  (d3.geo.august = function () {
    return projection(august);
  }).raw = august;
  var bakerφ = Math.log(1 + Math.SQRT2);

  function baker(λ, φ) {
    var φ0 = Math.abs(φ);
    return φ0 < π / 4 ? [λ, Math.log(Math.tan(π / 4 + φ / 2))] : [λ * Math.cos(φ0) * (2 * Math.SQRT2 - 1 / Math.sin(φ0)), sgn(φ) * (2 * Math.SQRT2 * (φ0 - π / 4) - Math.log(Math.tan(φ0 / 2)))];
  }

  baker.invert = function (x, y) {
    if ((y0 = Math.abs(y)) < bakerφ) return [x, 2 * Math.atan(Math.exp(y)) - halfπ];
    var sqrt8 = Math.sqrt(8),
        φ = π / 4,
        i = 25,
        δ,
        y0;

    do {
      var cosφ_2 = Math.cos(φ / 2),
          tanφ_2 = Math.tan(φ / 2);
      φ -= δ = (sqrt8 * (φ - π / 4) - Math.log(tanφ_2) - y0) / (sqrt8 - .5 * cosφ_2 * cosφ_2 / tanφ_2);
    } while (Math.abs(δ) > ε2 && --i > 0);

    return [x / (Math.cos(φ) * (sqrt8 - 1 / Math.sin(φ))), sgn(y) * φ];
  };

  (d3.geo.baker = function () {
    return projection(baker);
  }).raw = baker;
  var berghausAzimuthalEquidistant = d3.geo.azimuthalEquidistant.raw;

  function berghaus(n) {
    var k = 2 * π / n;

    function forward(λ, φ) {
      var p = berghausAzimuthalEquidistant(λ, φ);

      if (Math.abs(λ) > halfπ) {
        var θ = Math.atan2(p[1], p[0]),
            r = Math.sqrt(p[0] * p[0] + p[1] * p[1]),
            θ0 = k * Math.round((θ - halfπ) / k) + halfπ,
            α = Math.atan2(Math.sin(θ -= θ0), 2 - Math.cos(θ));
        θ = θ0 + asin(π / r * Math.sin(α)) - α;
        p[0] = r * Math.cos(θ);
        p[1] = r * Math.sin(θ);
      }

      return p;
    }

    forward.invert = function (x, y) {
      var r = Math.sqrt(x * x + y * y);

      if (r > halfπ) {
        var θ = Math.atan2(y, x),
            θ0 = k * Math.round((θ - halfπ) / k) + halfπ,
            s = θ > θ0 ? -1 : 1,
            A = r * Math.cos(θ0 - θ),
            cotα = 1 / Math.tan(s * Math.acos((A - π) / Math.sqrt(π * (π - 2 * A) + r * r)));
        θ = θ0 + 2 * Math.atan((cotα + s * Math.sqrt(cotα * cotα - 3)) / 3);
        x = r * Math.cos(θ), y = r * Math.sin(θ);
      }

      return berghausAzimuthalEquidistant.invert(x, y);
    };

    return forward;
  }

  function berghausProjection() {
    var n = 5,
        m = projectionMutator(berghaus),
        p = m(n),
        stream_ = p.stream,
        ε = .01,
        cr = -Math.cos(ε * radians),
        sr = Math.sin(ε * radians);

    p.lobes = function (_) {
      if (!arguments.length) return n;
      return m(n = +_);
    };

    p.stream = function (stream) {
      var rotate = p.rotate(),
          rotateStream = stream_(stream),
          sphereStream = (p.rotate([0, 0]), stream_(stream));
      p.rotate(rotate);

      rotateStream.sphere = function () {
        sphereStream.polygonStart(), sphereStream.lineStart();

        for (var i = 0, δ = 360 / n, δ0 = 2 * π / n, φ = 90 - 180 / n, φ0 = halfπ; i < n; ++i, φ -= δ, φ0 -= δ0) {
          sphereStream.point(Math.atan2(sr * Math.cos(φ0), cr) * degrees, asin(sr * Math.sin(φ0)) * degrees);

          if (φ < -90) {
            sphereStream.point(-90, -180 - φ - ε);
            sphereStream.point(-90, -180 - φ + ε);
          } else {
            sphereStream.point(90, φ + ε);
            sphereStream.point(90, φ - ε);
          }
        }

        sphereStream.lineEnd(), sphereStream.polygonEnd();
      };

      return rotateStream;
    };

    return p;
  }

  (d3.geo.berghaus = berghausProjection).raw = berghaus;

  function mollweideBromleyθ(Cp) {
    return function (θ) {
      var Cpsinθ = Cp * Math.sin(θ),
          i = 30,
          δ;

      do {
        θ -= δ = (θ + Math.sin(θ) - Cpsinθ) / (1 + Math.cos(θ));
      } while (Math.abs(δ) > ε && --i > 0);

      return θ / 2;
    };
  }

  function mollweideBromley(Cx, Cy, Cp) {
    var θ = mollweideBromleyθ(Cp);

    function forward(λ, φ) {
      return [Cx * λ * Math.cos(φ = θ(φ)), Cy * Math.sin(φ)];
    }

    forward.invert = function (x, y) {
      var θ = asin(y / Cy);
      return [x / (Cx * Math.cos(θ)), asin((2 * θ + Math.sin(2 * θ)) / Cp)];
    };

    return forward;
  }

  var mollweideθ = mollweideBromleyθ(π),
      mollweide = mollweideBromley(Math.SQRT2 / halfπ, Math.SQRT2, π);
  (d3.geo.mollweide = function () {
    return projection(mollweide);
  }).raw = mollweide;

  function boggs(λ, φ) {
    var k = 2.00276,
        θ = mollweideθ(φ);
    return [k * λ / (1 / Math.cos(φ) + 1.11072 / Math.cos(θ)), (φ + Math.SQRT2 * Math.sin(θ)) / k];
  }

  boggs.invert = function (x, y) {
    var k = 2.00276,
        ky = k * y,
        θ = y < 0 ? -π / 4 : π / 4,
        i = 25,
        δ,
        φ;

    do {
      φ = ky - Math.SQRT2 * Math.sin(θ);
      θ -= δ = (Math.sin(2 * θ) + 2 * θ - π * Math.sin(φ)) / (2 * Math.cos(2 * θ) + 2 + π * Math.cos(φ) * Math.SQRT2 * Math.cos(θ));
    } while (Math.abs(δ) > ε && --i > 0);

    φ = ky - Math.SQRT2 * Math.sin(θ);
    return [x * (1 / Math.cos(φ) + 1.11072 / Math.cos(θ)) / k, φ];
  };

  (d3.geo.boggs = function () {
    return projection(boggs);
  }).raw = boggs;

  function parallel1Projection(projectAt) {
    var φ0 = 0,
        m = projectionMutator(projectAt),
        p = m(φ0);

    p.parallel = function (_) {
      if (!arguments.length) return φ0 / π * 180;
      return m(φ0 = _ * π / 180);
    };

    return p;
  }

  function sinusoidal(λ, φ) {
    return [λ * Math.cos(φ), φ];
  }

  sinusoidal.invert = function (x, y) {
    return [x / Math.cos(y), y];
  };

  (d3.geo.sinusoidal = function () {
    return projection(sinusoidal);
  }).raw = sinusoidal;

  function bonne(φ0) {
    if (!φ0) return sinusoidal;
    var cotφ0 = 1 / Math.tan(φ0);

    function forward(λ, φ) {
      var ρ = cotφ0 + φ0 - φ,
          E = ρ ? λ * Math.cos(φ) / ρ : ρ;
      return [ρ * Math.sin(E), cotφ0 - ρ * Math.cos(E)];
    }

    forward.invert = function (x, y) {
      var ρ = Math.sqrt(x * x + (y = cotφ0 - y) * y),
          φ = cotφ0 + φ0 - ρ;
      return [ρ / Math.cos(φ) * Math.atan2(x, y), φ];
    };

    return forward;
  }

  (d3.geo.bonne = function () {
    return parallel1Projection(bonne).parallel(45);
  }).raw = bonne;

  function bottomleyRaw(ψ) {
    var sinψ = Math.sin(ψ);

    function forward(λ, φ) {
      var ρ = halfπ - φ,
          η = ρ ? λ * sinψ * Math.sin(ρ) / ρ : ρ;
      return [ρ * Math.sin(η) / sinψ, halfπ - ρ * Math.cos(η)];
    }

    forward.invert = function (x, y) {
      var x1 = x * sinψ,
          y1 = halfπ - y,
          ρ = Math.sqrt(x1 * x1 + y1 * y1),
          η = Math.atan2(x1, y1);
      return [(ρ ? ρ / Math.sin(ρ) : 1) * η / sinψ, halfπ - ρ];
    };

    return forward;
  }

  (d3.geo.bottomley = function () {
    var ψ = π / 6,
        mutate = d3.geo.projectionMutator(bottomleyRaw),
        projection = mutate(ψ);

    projection.variant = function (_) {
      return arguments.length ? mutate(ψ = +_) : ψ;
    };

    return projection;
  }).raw = bottomleyRaw;
  var bromley = mollweideBromley(1, 4 / π, π);
  (d3.geo.bromley = function () {
    return projection(bromley);
  }).raw = bromley;

  function chamberlin(points) {
    points = points.map(function (p) {
      return [p[0], p[1], Math.sin(p[1]), Math.cos(p[1])];
    });

    for (var a = points[2], b, i = 0; i < 3; ++i, a = b) {
      b = points[i];
      a.v = chamberlinDistanceAzimuth(b[1] - a[1], a[3], a[2], b[3], b[2], b[0] - a[0]);
      a.point = [0, 0];
    }

    var β0 = chamberlinAngle(points[0].v[0], points[2].v[0], points[1].v[0]),
        β1 = chamberlinAngle(points[0].v[0], points[1].v[0], points[2].v[0]),
        β2 = π - β0;
    points[2].point[1] = 0;
    points[0].point[0] = -(points[1].point[0] = .5 * points[0].v[0]);
    var mean = [points[2].point[0] = points[0].point[0] + points[2].v[0] * Math.cos(β0), 2 * (points[0].point[1] = points[1].point[1] = points[2].v[0] * Math.sin(β0))];

    function forward(λ, φ) {
      var sinφ = Math.sin(φ),
          cosφ = Math.cos(φ),
          v = new Array(3);

      for (var i = 0; i < 3; ++i) {
        var p = points[i];
        v[i] = chamberlinDistanceAzimuth(φ - p[1], p[3], p[2], cosφ, sinφ, λ - p[0]);
        if (!v[i][0]) return p.point;
        v[i][1] = chamberlinLongitude(v[i][1] - p.v[1]);
      }

      var point = mean.slice();

      for (var i = 0; i < 3; ++i) {
        var j = i == 2 ? 0 : i + 1;
        var a = chamberlinAngle(points[i].v[0], v[i][0], v[j][0]);
        if (v[i][1] < 0) a = -a;

        if (!i) {
          point[0] += v[i][0] * Math.cos(a);
          point[1] -= v[i][0] * Math.sin(a);
        } else if (i == 1) {
          a = β1 - a;
          point[0] -= v[i][0] * Math.cos(a);
          point[1] -= v[i][0] * Math.sin(a);
        } else {
          a = β2 - a;
          point[0] += v[i][0] * Math.cos(a);
          point[1] += v[i][0] * Math.sin(a);
        }
      }

      point[0] /= 3, point[1] /= 3;
      return point;
    }

    return forward;
  }

  function chamberlinProjection() {
    var points = [[0, 0], [0, 0], [0, 0]],
        m = projectionMutator(chamberlin),
        p = m(points),
        rotate = p.rotate;
    delete p.rotate;

    p.points = function (_) {
      if (!arguments.length) return points;
      points = _;
      var origin = d3.geo.centroid({
        type: "MultiPoint",
        coordinates: points
      }),
          r = [-origin[0], -origin[1]];
      rotate.call(p, r);
      return m(points.map(d3.geo.rotation(r)).map(chamberlinRadians));
    };

    return p.points([[-150, 55], [-35, 55], [-92.5, 10]]);
  }

  function chamberlinDistanceAzimuth(dφ, c1, s1, c2, s2, dλ) {
    var cosdλ = Math.cos(dλ),
        r;

    if (Math.abs(dφ) > 1 || Math.abs(dλ) > 1) {
      r = acos(s1 * s2 + c1 * c2 * cosdλ);
    } else {
      var sindφ = Math.sin(.5 * dφ),
          sindλ = Math.sin(.5 * dλ);
      r = 2 * asin(Math.sqrt(sindφ * sindφ + c1 * c2 * sindλ * sindλ));
    }

    if (Math.abs(r) > ε) {
      return [r, Math.atan2(c2 * Math.sin(dλ), c1 * s2 - s1 * c2 * cosdλ)];
    }

    return [0, 0];
  }

  function chamberlinAngle(b, c, a) {
    return acos(.5 * (b * b + c * c - a * a) / (b * c));
  }

  function chamberlinLongitude(λ) {
    return λ - 2 * π * Math.floor((λ + π) / (2 * π));
  }

  function chamberlinRadians(point) {
    return [point[0] * radians, point[1] * radians];
  }

  (d3.geo.chamberlin = chamberlinProjection).raw = chamberlin;

  function collignon(λ, φ) {
    var α = asqrt(1 - Math.sin(φ));
    return [2 / sqrtπ * λ * α, sqrtπ * (1 - α)];
  }

  collignon.invert = function (x, y) {
    var λ = (λ = y / sqrtπ - 1) * λ;
    return [λ > 0 ? x * Math.sqrt(π / λ) / 2 : 0, asin(1 - λ)];
  };

  (d3.geo.collignon = function () {
    return projection(collignon);
  }).raw = collignon;

  function craig(φ0) {
    var tanφ0 = Math.tan(φ0);

    function forward(λ, φ) {
      return [λ, (λ ? λ / Math.sin(λ) : 1) * (Math.sin(φ) * Math.cos(λ) - tanφ0 * Math.cos(φ))];
    }

    forward.invert = tanφ0 ? function (x, y) {
      if (x) y *= Math.sin(x) / x;
      var cosλ = Math.cos(x);
      return [x, 2 * Math.atan2(Math.sqrt(cosλ * cosλ + tanφ0 * tanφ0 - y * y) - cosλ, tanφ0 - y)];
    } : function (x, y) {
      return [x, asin(x ? y * Math.tan(x) / x : y)];
    };
    return forward;
  }

  (d3.geo.craig = function () {
    return parallel1Projection(craig);
  }).raw = craig;

  function craster(λ, φ) {
    var sqrt3 = Math.sqrt(3);
    return [sqrt3 * λ * (2 * Math.cos(2 * φ / 3) - 1) / sqrtπ, sqrt3 * sqrtπ * Math.sin(φ / 3)];
  }

  craster.invert = function (x, y) {
    var sqrt3 = Math.sqrt(3),
        φ = 3 * asin(y / (sqrt3 * sqrtπ));
    return [sqrtπ * x / (sqrt3 * (2 * Math.cos(2 * φ / 3) - 1)), φ];
  };

  (d3.geo.craster = function () {
    return projection(craster);
  }).raw = craster;

  function cylindricalEqualArea(φ0) {
    var cosφ0 = Math.cos(φ0);

    function forward(λ, φ) {
      return [λ * cosφ0, Math.sin(φ) / cosφ0];
    }

    forward.invert = function (x, y) {
      return [x / cosφ0, asin(y * cosφ0)];
    };

    return forward;
  }

  (d3.geo.cylindricalEqualArea = function () {
    return parallel1Projection(cylindricalEqualArea);
  }).raw = cylindricalEqualArea;

  function cylindricalStereographic(φ0) {
    var cosφ0 = Math.cos(φ0);

    function forward(λ, φ) {
      return [λ * cosφ0, (1 + cosφ0) * Math.tan(φ * .5)];
    }

    forward.invert = function (x, y) {
      return [x / cosφ0, Math.atan(y / (1 + cosφ0)) * 2];
    };

    return forward;
  }

  (d3.geo.cylindricalStereographic = function () {
    return parallel1Projection(cylindricalStereographic);
  }).raw = cylindricalStereographic;

  function eckert1(λ, φ) {
    var α = Math.sqrt(8 / (3 * π));
    return [α * λ * (1 - Math.abs(φ) / π), α * φ];
  }

  eckert1.invert = function (x, y) {
    var α = Math.sqrt(8 / (3 * π)),
        φ = y / α;
    return [x / (α * (1 - Math.abs(φ) / π)), φ];
  };

  (d3.geo.eckert1 = function () {
    return projection(eckert1);
  }).raw = eckert1;

  function eckert2(λ, φ) {
    var α = Math.sqrt(4 - 3 * Math.sin(Math.abs(φ)));
    return [2 / Math.sqrt(6 * π) * λ * α, sgn(φ) * Math.sqrt(2 * π / 3) * (2 - α)];
  }

  eckert2.invert = function (x, y) {
    var α = 2 - Math.abs(y) / Math.sqrt(2 * π / 3);
    return [x * Math.sqrt(6 * π) / (2 * α), sgn(y) * asin((4 - α * α) / 3)];
  };

  (d3.geo.eckert2 = function () {
    return projection(eckert2);
  }).raw = eckert2;

  function eckert3(λ, φ) {
    var k = Math.sqrt(π * (4 + π));
    return [2 / k * λ * (1 + Math.sqrt(1 - 4 * φ * φ / (π * π))), 4 / k * φ];
  }

  eckert3.invert = function (x, y) {
    var k = Math.sqrt(π * (4 + π)) / 2;
    return [x * k / (1 + asqrt(1 - y * y * (4 + π) / (4 * π))), y * k / 2];
  };

  (d3.geo.eckert3 = function () {
    return projection(eckert3);
  }).raw = eckert3;

  function eckert4(λ, φ) {
    var k = (2 + halfπ) * Math.sin(φ);
    φ /= 2;

    for (var i = 0, δ = Infinity; i < 10 && Math.abs(δ) > ε; i++) {
      var cosφ = Math.cos(φ);
      φ -= δ = (φ + Math.sin(φ) * (cosφ + 2) - k) / (2 * cosφ * (1 + cosφ));
    }

    return [2 / Math.sqrt(π * (4 + π)) * λ * (1 + Math.cos(φ)), 2 * Math.sqrt(π / (4 + π)) * Math.sin(φ)];
  }

  eckert4.invert = function (x, y) {
    var A = .5 * y * Math.sqrt((4 + π) / π),
        k = asin(A),
        c = Math.cos(k);
    return [x / (2 / Math.sqrt(π * (4 + π)) * (1 + c)), asin((k + A * (c + 2)) / (2 + halfπ))];
  };

  (d3.geo.eckert4 = function () {
    return projection(eckert4);
  }).raw = eckert4;

  function eckert5(λ, φ) {
    return [λ * (1 + Math.cos(φ)) / Math.sqrt(2 + π), 2 * φ / Math.sqrt(2 + π)];
  }

  eckert5.invert = function (x, y) {
    var k = Math.sqrt(2 + π),
        φ = y * k / 2;
    return [k * x / (1 + Math.cos(φ)), φ];
  };

  (d3.geo.eckert5 = function () {
    return projection(eckert5);
  }).raw = eckert5;

  function eckert6(λ, φ) {
    var k = (1 + halfπ) * Math.sin(φ);

    for (var i = 0, δ = Infinity; i < 10 && Math.abs(δ) > ε; i++) {
      φ -= δ = (φ + Math.sin(φ) - k) / (1 + Math.cos(φ));
    }

    k = Math.sqrt(2 + π);
    return [λ * (1 + Math.cos(φ)) / k, 2 * φ / k];
  }

  eckert6.invert = function (x, y) {
    var j = 1 + halfπ,
        k = Math.sqrt(j / 2);
    return [x * 2 * k / (1 + Math.cos(y *= k)), asin((y + Math.sin(y)) / j)];
  };

  (d3.geo.eckert6 = function () {
    return projection(eckert6);
  }).raw = eckert6;

  function eisenlohr(λ, φ) {
    var s0 = Math.sin(λ /= 2),
        c0 = Math.cos(λ),
        k = Math.sqrt(Math.cos(φ)),
        c1 = Math.cos(φ /= 2),
        t = Math.sin(φ) / (c1 + Math.SQRT2 * c0 * k),
        c = Math.sqrt(2 / (1 + t * t)),
        v = Math.sqrt((Math.SQRT2 * c1 + (c0 + s0) * k) / (Math.SQRT2 * c1 + (c0 - s0) * k));
    return [eisenlohrK * (c * (v - 1 / v) - 2 * Math.log(v)), eisenlohrK * (c * t * (v + 1 / v) - 2 * Math.atan(t))];
  }

  eisenlohr.invert = function (x, y) {
    var p = d3.geo.august.raw.invert(x / 1.2, y * 1.065);
    if (!p) return null;
    var λ = p[0],
        φ = p[1],
        i = 20;
    x /= eisenlohrK, y /= eisenlohrK;

    do {
      var _0 = λ / 2,
          _1 = φ / 2,
          s0 = Math.sin(_0),
          c0 = Math.cos(_0),
          s1 = Math.sin(_1),
          c1 = Math.cos(_1),
          cos1 = Math.cos(φ),
          k = Math.sqrt(cos1),
          t = s1 / (c1 + Math.SQRT2 * c0 * k),
          t2 = t * t,
          c = Math.sqrt(2 / (1 + t2)),
          v0 = Math.SQRT2 * c1 + (c0 + s0) * k,
          v1 = Math.SQRT2 * c1 + (c0 - s0) * k,
          v2 = v0 / v1,
          v = Math.sqrt(v2),
          vm1v = v - 1 / v,
          vp1v = v + 1 / v,
          fx = c * vm1v - 2 * Math.log(v) - x,
          fy = c * t * vp1v - 2 * Math.atan(t) - y,
          δtδλ = s1 && Math.SQRT1_2 * k * s0 * t2 / s1,
          δtδφ = (Math.SQRT2 * c0 * c1 + k) / (2 * (c1 + Math.SQRT2 * c0 * k) * (c1 + Math.SQRT2 * c0 * k) * k),
          δcδt = -.5 * t * c * c * c,
          δcδλ = δcδt * δtδλ,
          δcδφ = δcδt * δtδφ,
          A = (A = 2 * c1 + Math.SQRT2 * k * (c0 - s0)) * A * v,
          δvδλ = (Math.SQRT2 * c0 * c1 * k + cos1) / A,
          δvδφ = -(Math.SQRT2 * s0 * s1) / (k * A),
          δxδλ = vm1v * δcδλ - 2 * δvδλ / v + c * (δvδλ + δvδλ / v2),
          δxδφ = vm1v * δcδφ - 2 * δvδφ / v + c * (δvδφ + δvδφ / v2),
          δyδλ = t * vp1v * δcδλ - 2 * δtδλ / (1 + t2) + c * vp1v * δtδλ + c * t * (δvδλ - δvδλ / v2),
          δyδφ = t * vp1v * δcδφ - 2 * δtδφ / (1 + t2) + c * vp1v * δtδφ + c * t * (δvδφ - δvδφ / v2),
          denominator = δxδφ * δyδλ - δyδφ * δxδλ;

      if (!denominator) break;
      var δλ = (fy * δxδφ - fx * δyδφ) / denominator,
          δφ = (fx * δyδλ - fy * δxδλ) / denominator;
      λ -= δλ;
      φ = Math.max(-halfπ, Math.min(halfπ, φ - δφ));
    } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);

    return Math.abs(Math.abs(φ) - halfπ) < ε ? [0, φ] : i && [λ, φ];
  };

  var eisenlohrK = 3 + 2 * Math.SQRT2;
  (d3.geo.eisenlohr = function () {
    return projection(eisenlohr);
  }).raw = eisenlohr;

  function fahey(λ, φ) {
    var t = Math.tan(φ / 2);
    return [λ * faheyK * asqrt(1 - t * t), (1 + faheyK) * t];
  }

  fahey.invert = function (x, y) {
    var t = y / (1 + faheyK);
    return [x ? x / (faheyK * asqrt(1 - t * t)) : 0, 2 * Math.atan(t)];
  };

  var faheyK = Math.cos(35 * radians);
  (d3.geo.fahey = function () {
    return projection(fahey);
  }).raw = fahey;

  function foucaut(λ, φ) {
    var k = φ / 2,
        cosk = Math.cos(k);
    return [2 * λ / sqrtπ * Math.cos(φ) * cosk * cosk, sqrtπ * Math.tan(k)];
  }

  foucaut.invert = function (x, y) {
    var k = Math.atan(y / sqrtπ),
        cosk = Math.cos(k),
        φ = 2 * k;
    return [x * sqrtπ * .5 / (Math.cos(φ) * cosk * cosk), φ];
  };

  (d3.geo.foucaut = function () {
    return projection(foucaut);
  }).raw = foucaut;

  d3.geo.gilbert = function (projection) {
    var e = d3.geo.equirectangular().scale(degrees).translate([0, 0]);

    function gilbert(coordinates) {
      return projection([coordinates[0] * .5, asin(Math.tan(coordinates[1] * .5 * radians)) * degrees]);
    }

    if (projection.invert) gilbert.invert = function (coordinates) {
      coordinates = projection.invert(coordinates);
      coordinates[0] *= 2;
      coordinates[1] = 2 * Math.atan(Math.sin(coordinates[1] * radians)) * degrees;
      return coordinates;
    };

    gilbert.stream = function (stream) {
      stream = projection.stream(stream);
      var s = e.stream({
        point: function point(λ, φ) {
          stream.point(λ * .5, asin(Math.tan(-φ * .5 * radians)) * degrees);
        },
        lineStart: function lineStart() {
          stream.lineStart();
        },
        lineEnd: function lineEnd() {
          stream.lineEnd();
        },
        polygonStart: function polygonStart() {
          stream.polygonStart();
        },
        polygonEnd: function polygonEnd() {
          stream.polygonEnd();
        }
      });

      s.sphere = function () {
        stream.sphere();
      };

      s.valid = false;
      return s;
    };

    return gilbert;
  };

  var gingeryAzimuthalEquidistant = d3.geo.azimuthalEquidistant.raw;

  function gingery(ρ, n) {
    var k = 2 * π / n,
        ρ2 = ρ * ρ;

    function forward(λ, φ) {
      var p = gingeryAzimuthalEquidistant(λ, φ),
          x = p[0],
          y = p[1],
          r2 = x * x + y * y;

      if (r2 > ρ2) {
        var r = Math.sqrt(r2),
            θ = Math.atan2(y, x),
            θ0 = k * Math.round(θ / k),
            α = θ - θ0,
            ρcosα = ρ * Math.cos(α),
            k_ = (ρ * Math.sin(α) - α * Math.sin(ρcosα)) / (halfπ - ρcosα),
            s_ = arcLength_(α, k_),
            e = (π - ρ) / gingeryIntegrate(s_, ρcosα, π);
        x = r;
        var i = 50,
            δ;

        do {
          x -= δ = (ρ + gingeryIntegrate(s_, ρcosα, x) * e - r) / (s_(x) * e);
        } while (Math.abs(δ) > ε && --i > 0);

        y = α * Math.sin(x);
        if (x < halfπ) y -= k_ * (x - halfπ);
        var s = Math.sin(θ0),
            c = Math.cos(θ0);
        p[0] = x * c - y * s;
        p[1] = x * s + y * c;
      }

      return p;
    }

    forward.invert = function (x, y) {
      var r2 = x * x + y * y;

      if (r2 > ρ2) {
        var r = Math.sqrt(r2),
            θ = Math.atan2(y, x),
            θ0 = k * Math.round(θ / k),
            dθ = θ - θ0,
            x = r * Math.cos(dθ);
        y = r * Math.sin(dθ);
        var x_halfπ = x - halfπ,
            sinx = Math.sin(x),
            α = y / sinx,
            δ = x < halfπ ? Infinity : 0,
            i = 10;

        while (true) {
          var ρsinα = ρ * Math.sin(α),
              ρcosα = ρ * Math.cos(α),
              sinρcosα = Math.sin(ρcosα),
              halfπ_ρcosα = halfπ - ρcosα,
              k_ = (ρsinα - α * sinρcosα) / halfπ_ρcosα,
              s_ = arcLength_(α, k_);
          if (Math.abs(δ) < ε2 || ! --i) break;
          α -= δ = (α * sinx - k_ * x_halfπ - y) / (sinx - x_halfπ * 2 * (halfπ_ρcosα * (ρcosα + α * ρsinα * Math.cos(ρcosα) - sinρcosα) - ρsinα * (ρsinα - α * sinρcosα)) / (halfπ_ρcosα * halfπ_ρcosα));
        }

        r = ρ + gingeryIntegrate(s_, ρcosα, x) * (π - ρ) / gingeryIntegrate(s_, ρcosα, π);
        θ = θ0 + α;
        x = r * Math.cos(θ);
        y = r * Math.sin(θ);
      }

      return gingeryAzimuthalEquidistant.invert(x, y);
    };

    return forward;
  }

  function arcLength_(α, k) {
    return function (x) {
      var y_ = α * Math.cos(x);
      if (x < halfπ) y_ -= k;
      return Math.sqrt(1 + y_ * y_);
    };
  }

  function gingeryProjection() {
    var n = 6,
        ρ = 30 * radians,
        cρ = Math.cos(ρ),
        sρ = Math.sin(ρ),
        m = projectionMutator(gingery),
        p = m(ρ, n),
        stream_ = p.stream,
        ε = .01,
        cr = -Math.cos(ε * radians),
        sr = Math.sin(ε * radians);

    p.radius = function (_) {
      if (!arguments.length) return ρ * degrees;
      cρ = Math.cos(ρ = _ * radians);
      sρ = Math.sin(ρ);
      return m(ρ, n);
    };

    p.lobes = function (_) {
      if (!arguments.length) return n;
      return m(ρ, n = +_);
    };

    p.stream = function (stream) {
      var rotate = p.rotate(),
          rotateStream = stream_(stream),
          sphereStream = (p.rotate([0, 0]), stream_(stream));
      p.rotate(rotate);

      rotateStream.sphere = function () {
        sphereStream.polygonStart(), sphereStream.lineStart();

        for (var i = 0, δ = 2 * π / n, φ = 0; i < n; ++i, φ -= δ) {
          sphereStream.point(Math.atan2(sr * Math.cos(φ), cr) * degrees, Math.asin(sr * Math.sin(φ)) * degrees);
          sphereStream.point(Math.atan2(sρ * Math.cos(φ - δ / 2), cρ) * degrees, Math.asin(sρ * Math.sin(φ - δ / 2)) * degrees);
        }

        sphereStream.lineEnd(), sphereStream.polygonEnd();
      };

      return rotateStream;
    };

    return p;
  }

  function gingeryIntegrate(f, a, b) {
    var n = 50,
        h = (b - a) / n,
        s = f(a) + f(b);

    for (var i = 1, x = a; i < n; ++i) {
      s += 2 * f(x += h);
    }

    return s * .5 * h;
  }

  (d3.geo.gingery = gingeryProjection).raw = gingery;

  function ginzburgPolyconic(a, b, c, d, e, f, g, h) {
    if (arguments.length < 8) h = 0;

    function forward(λ, φ) {
      if (!φ) return [a * λ / π, 0];
      var φ2 = φ * φ,
          xB = a + φ2 * (b + φ2 * (c + φ2 * d)),
          yB = φ * (e - 1 + φ2 * (f - h + φ2 * g)),
          m = (xB * xB + yB * yB) / (2 * yB),
          α = λ * Math.asin(xB / m) / π;
      return [m * Math.sin(α), φ * (1 + φ2 * h) + m * (1 - Math.cos(α))];
    }

    forward.invert = function (x, y) {
      var λ = π * x / a,
          φ = y,
          δλ,
          δφ,
          i = 50;

      do {
        var φ2 = φ * φ,
            xB = a + φ2 * (b + φ2 * (c + φ2 * d)),
            yB = φ * (e - 1 + φ2 * (f - h + φ2 * g)),
            p = xB * xB + yB * yB,
            q = 2 * yB,
            m = p / q,
            m2 = m * m,
            dαdλ = Math.asin(xB / m) / π,
            α = λ * dαdλ;
        xB2 = xB * xB, dxBdφ = (2 * b + φ2 * (4 * c + φ2 * 6 * d)) * φ, dyBdφ = e + φ2 * (3 * f + φ2 * 5 * g), dpdφ = 2 * (xB * dxBdφ + yB * (dyBdφ - 1)), dqdφ = 2 * (dyBdφ - 1), dmdφ = (dpdφ * q - p * dqdφ) / (q * q), cosα = Math.cos(α), sinα = Math.sin(α), mcosα = m * cosα, msinα = m * sinα, dαdφ = λ / π * (1 / asqrt(1 - xB2 / m2)) * (dxBdφ * m - xB * dmdφ) / m2, fx = msinα - x, fy = φ * (1 + φ2 * h) + m - mcosα - y, δxδφ = dmdφ * sinα + mcosα * dαdφ, δxδλ = mcosα * dαdλ, δyδφ = 1 + dmdφ - (dmdφ * cosα - msinα * dαdφ), δyδλ = msinα * dαdλ, denominator = δxδφ * δyδλ - δyδφ * δxδλ;
        if (!denominator) break;
        λ -= δλ = (fy * δxδφ - fx * δyδφ) / denominator;
        φ -= δφ = (fx * δyδλ - fy * δxδλ) / denominator;
      } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);

      return [λ, φ];
    };

    return forward;
  }

  var ginzburg4 = ginzburgPolyconic(2.8284, -1.6988, .75432, -.18071, 1.76003, -.38914, .042555);
  (d3.geo.ginzburg4 = function () {
    return projection(ginzburg4);
  }).raw = ginzburg4;
  var ginzburg5 = ginzburgPolyconic(2.583819, -.835827, .170354, -.038094, 1.543313, -.411435, .082742);
  (d3.geo.ginzburg5 = function () {
    return projection(ginzburg5);
  }).raw = ginzburg5;
  var ginzburg6 = ginzburgPolyconic(5 / 6 * π, -.62636, -.0344, 0, 1.3493, -.05524, 0, .045);
  (d3.geo.ginzburg6 = function () {
    return projection(ginzburg6);
  }).raw = ginzburg6;

  function ginzburg8(λ, φ) {
    var λ2 = λ * λ,
        φ2 = φ * φ;
    return [λ * (1 - .162388 * φ2) * (.87 - 952426e-9 * λ2 * λ2), φ * (1 + φ2 / 12)];
  }

  ginzburg8.invert = function (x, y) {
    var λ = x,
        φ = y,
        i = 50,
        δ;

    do {
      var φ2 = φ * φ;
      φ -= δ = (φ * (1 + φ2 / 12) - y) / (1 + φ2 / 4);
    } while (Math.abs(δ) > ε && --i > 0);

    i = 50;
    x /= 1 - .162388 * φ2;

    do {
      var λ4 = (λ4 = λ * λ) * λ4;
      λ -= δ = (λ * (.87 - 952426e-9 * λ4) - x) / (.87 - .00476213 * λ4);
    } while (Math.abs(δ) > ε && --i > 0);

    return [λ, φ];
  };

  (d3.geo.ginzburg8 = function () {
    return projection(ginzburg8);
  }).raw = ginzburg8;
  var ginzburg9 = ginzburgPolyconic(2.6516, -.76534, .19123, -.047094, 1.36289, -.13965, .031762);
  (d3.geo.ginzburg9 = function () {
    return projection(ginzburg9);
  }).raw = ginzburg9;

  function quincuncialProjection(projectHemisphere) {
    var dx = projectHemisphere(halfπ, 0)[0] - projectHemisphere(-halfπ, 0)[0];

    function projection() {
      var quincuncial = false,
          m = projectionMutator(projectAt),
          p = m(quincuncial);

      p.quincuncial = function (_) {
        if (!arguments.length) return quincuncial;
        return m(quincuncial = !!_);
      };

      return p;
    }

    function projectAt(quincuncial) {
      var forward = quincuncial ? function (λ, φ) {
        var t = Math.abs(λ) < halfπ,
            p = projectHemisphere(t ? λ : λ > 0 ? λ - π : λ + π, φ);
        var x = (p[0] - p[1]) * Math.SQRT1_2,
            y = (p[0] + p[1]) * Math.SQRT1_2;
        if (t) return [x, y];
        var d = dx * Math.SQRT1_2,
            s = x > 0 ^ y > 0 ? -1 : 1;
        return [s * x - sgn(y) * d, s * y - sgn(x) * d];
      } : function (λ, φ) {
        var s = λ > 0 ? -.5 : .5,
            point = projectHemisphere(λ + s * π, φ);
        point[0] -= s * dx;
        return point;
      };
      if (projectHemisphere.invert) forward.invert = quincuncial ? function (x0, y0) {
        var x = (x0 + y0) * Math.SQRT1_2,
            y = (y0 - x0) * Math.SQRT1_2,
            t = Math.abs(x) < .5 * dx && Math.abs(y) < .5 * dx;

        if (!t) {
          var d = dx * Math.SQRT1_2,
              s = x > 0 ^ y > 0 ? -1 : 1,
              x1 = -s * (x0 + (y > 0 ? 1 : -1) * d),
              y1 = -s * (y0 + (x > 0 ? 1 : -1) * d);
          x = (-x1 - y1) * Math.SQRT1_2;
          y = (x1 - y1) * Math.SQRT1_2;
        }

        var p = projectHemisphere.invert(x, y);
        if (!t) p[0] += x > 0 ? π : -π;
        return p;
      } : function (x, y) {
        var s = x > 0 ? -.5 : .5,
            location = projectHemisphere.invert(x + s * dx, y),
            λ = location[0] - s * π;
        if (λ < -π) λ += 2 * π;else if (λ > π) λ -= 2 * π;
        location[0] = λ;
        return location;
      };
      return forward;
    }

    projection.raw = projectAt;
    return projection;
  }

  function gringorten(λ, φ) {
    var sλ = sgn(λ),
        sφ = sgn(φ),
        cosφ = Math.cos(φ),
        x = Math.cos(λ) * cosφ,
        y = Math.sin(λ) * cosφ,
        z = Math.sin(sφ * φ);
    λ = Math.abs(Math.atan2(y, z));
    φ = asin(x);
    if (Math.abs(λ - halfπ) > ε) λ %= halfπ;
    var point = gringortenHexadecant(λ > π / 4 ? halfπ - λ : λ, φ);
    if (λ > π / 4) z = point[0], point[0] = -point[1], point[1] = -z;
    return point[0] *= sλ, point[1] *= -sφ, point;
  }

  gringorten.invert = function (x, y) {
    var sx = sgn(x),
        sy = sgn(y),
        x0 = -sx * x,
        y0 = -sy * y,
        t = y0 / x0 < 1,
        p = gringortenHexadecantInvert(t ? y0 : x0, t ? x0 : y0),
        λ = p[0],
        φ = p[1];
    if (t) λ = -halfπ - λ;
    var cosφ = Math.cos(φ),
        x = Math.cos(λ) * cosφ,
        y = Math.sin(λ) * cosφ,
        z = Math.sin(φ);
    return [sx * (Math.atan2(y, -z) + π), sy * asin(x)];
  };

  function gringortenHexadecant(λ, φ) {
    if (φ === halfπ) return [0, 0];
    var sinφ = Math.sin(φ),
        r = sinφ * sinφ,
        r2 = r * r,
        j = 1 + r2,
        k = 1 + 3 * r2,
        q = 1 - r2,
        z = asin(1 / Math.sqrt(j)),
        v = q + r * j * z,
        p2 = (1 - sinφ) / v,
        p = Math.sqrt(p2),
        a2 = p2 * j,
        a = Math.sqrt(a2),
        h = p * q;
    if (λ === 0) return [0, -(h + r * a)];
    var cosφ = Math.cos(φ),
        secφ = 1 / cosφ,
        drdφ = 2 * sinφ * cosφ,
        dvdφ = (-3 * r + z * k) * drdφ,
        dp2dφ = (-v * cosφ - (1 - sinφ) * dvdφ) / (v * v),
        dpdφ = .5 * dp2dφ / p,
        dhdφ = q * dpdφ - 2 * r * p * drdφ,
        dra2dφ = r * j * dp2dφ + p2 * k * drdφ,
        μ = -secφ * drdφ,
        ν = -secφ * dra2dφ,
        ζ = -2 * secφ * dhdφ,
        Λ = 4 * λ / π;

    if (λ > .222 * π || φ < π / 4 && λ > .175 * π) {
      var x = (h + r * asqrt(a2 * (1 + r2) - h * h)) / (1 + r2);
      if (λ > π / 4) return [x, x];
      var x1 = x,
          x0 = .5 * x,
          i = 50;
      x = .5 * (x0 + x1);

      do {
        var g = Math.sqrt(a2 - x * x),
            f = x * (ζ + μ * g) + ν * asin(x / a) - Λ;
        if (!f) break;
        if (f < 0) x0 = x;else x1 = x;
        x = .5 * (x0 + x1);
      } while (Math.abs(x1 - x0) > ε && --i > 0);
    } else {
      var x = ε,
          i = 25,
          δ;

      do {
        var x2 = x * x,
            g = asqrt(a2 - x2),
            ζμg = ζ + μ * g,
            f = x * ζμg + ν * asin(x / a) - Λ,
            df = ζμg + (ν - μ * x2) / g;
        x -= δ = g ? f / df : 0;
      } while (Math.abs(δ) > ε && --i > 0);
    }

    return [x, -h - r * asqrt(a2 - x * x)];
  }

  function gringortenHexadecantInvert(x, y) {
    var x0 = 0,
        x1 = 1,
        r = .5,
        i = 50;

    while (true) {
      var r2 = r * r,
          sinφ = Math.sqrt(r),
          z = Math.asin(1 / Math.sqrt(1 + r2)),
          v = 1 - r2 + r * (1 + r2) * z,
          p2 = (1 - sinφ) / v,
          p = Math.sqrt(p2),
          a2 = p2 * (1 + r2),
          h = p * (1 - r2),
          g2 = a2 - x * x,
          g = Math.sqrt(g2),
          y0 = y + h + r * g;
      if (Math.abs(x1 - x0) < ε2 || --i === 0 || y0 === 0) break;
      if (y0 > 0) x0 = r;else x1 = r;
      r = .5 * (x0 + x1);
    }

    if (!i) return null;
    var φ = Math.asin(sinφ),
        cosφ = Math.cos(φ),
        secφ = 1 / cosφ,
        drdφ = 2 * sinφ * cosφ,
        dvdφ = (-3 * r + z * (1 + 3 * r2)) * drdφ,
        dp2dφ = (-v * cosφ - (1 - sinφ) * dvdφ) / (v * v),
        dpdφ = .5 * dp2dφ / p,
        dhdφ = (1 - r2) * dpdφ - 2 * r * p * drdφ,
        ζ = -2 * secφ * dhdφ,
        μ = -secφ * drdφ,
        ν = -secφ * (r * (1 + r2) * dp2dφ + p2 * (1 + 3 * r2) * drdφ);
    return [π / 4 * (x * (ζ + μ * g) + ν * Math.asin(x / Math.sqrt(a2))), φ];
  }

  d3.geo.gringorten = quincuncialProjection(gringorten);

  function ellipticJi(u, v, m) {
    if (!u) {
      var b = ellipticJ(v, 1 - m);
      return [[0, b[0] / b[1]], [1 / b[1], 0], [b[2] / b[1], 0]];
    }

    var a = ellipticJ(u, m);
    if (!v) return [[a[0], 0], [a[1], 0], [a[2], 0]];
    var b = ellipticJ(v, 1 - m),
        denominator = b[1] * b[1] + m * a[0] * a[0] * b[0] * b[0];
    return [[a[0] * b[2] / denominator, a[1] * a[2] * b[0] * b[1] / denominator], [a[1] * b[1] / denominator, -a[0] * a[2] * b[0] * b[2] / denominator], [a[2] * b[1] * b[2] / denominator, -m * a[0] * a[1] * b[0] / denominator]];
  }

  function ellipticJ(u, m) {
    var ai, b, φ, t, twon;

    if (m < ε) {
      t = Math.sin(u);
      b = Math.cos(u);
      ai = .25 * m * (u - t * b);
      return [t - ai * b, b + ai * t, 1 - .5 * m * t * t, u - ai];
    }

    if (m >= 1 - ε) {
      ai = .25 * (1 - m);
      b = cosh(u);
      t = tanh(u);
      φ = 1 / b;
      twon = b * sinh(u);
      return [t + ai * (twon - u) / (b * b), φ - ai * t * φ * (twon - u), φ + ai * t * φ * (twon + u), 2 * Math.atan(Math.exp(u)) - halfπ + ai * (twon - u) / b];
    }

    var a = [1, 0, 0, 0, 0, 0, 0, 0, 0],
        c = [Math.sqrt(m), 0, 0, 0, 0, 0, 0, 0, 0],
        i = 0;
    b = Math.sqrt(1 - m);
    twon = 1;

    while (Math.abs(c[i] / a[i]) > ε && i < 8) {
      ai = a[i++];
      c[i] = .5 * (ai - b);
      a[i] = .5 * (ai + b);
      b = asqrt(ai * b);
      twon *= 2;
    }

    φ = twon * a[i] * u;

    do {
      t = c[i] * Math.sin(b = φ) / a[i];
      φ = .5 * (asin(t) + φ);
    } while (--i);

    return [Math.sin(φ), t = Math.cos(φ), t / Math.cos(φ - b), φ];
  }

  function ellipticFi(φ, ψ, m) {
    var r = Math.abs(φ),
        i = Math.abs(ψ),
        sinhψ = sinh(i);

    if (r) {
      var cscφ = 1 / Math.sin(r),
          cotφ2 = 1 / (Math.tan(r) * Math.tan(r)),
          b = -(cotφ2 + m * sinhψ * sinhψ * cscφ * cscφ - 1 + m),
          c = (m - 1) * cotφ2,
          cotλ2 = .5 * (-b + Math.sqrt(b * b - 4 * c));
      return [ellipticF(Math.atan(1 / Math.sqrt(cotλ2)), m) * sgn(φ), ellipticF(Math.atan(asqrt((cotλ2 / cotφ2 - 1) / m)), 1 - m) * sgn(ψ)];
    }

    return [0, ellipticF(Math.atan(sinhψ), 1 - m) * sgn(ψ)];
  }

  function ellipticF(φ, m) {
    if (!m) return φ;
    if (m === 1) return Math.log(Math.tan(φ / 2 + π / 4));
    var a = 1,
        b = Math.sqrt(1 - m),
        c = Math.sqrt(m);

    for (var i = 0; Math.abs(c) > ε; i++) {
      if (φ % π) {
        var dφ = Math.atan(b * Math.tan(φ) / a);
        if (dφ < 0) dφ += π;
        φ += dφ + ~~(φ / π) * π;
      } else φ += φ;

      c = (a + b) / 2;
      b = Math.sqrt(a * b);
      c = ((a = c) - b) / 2;
    }

    return φ / (Math.pow(2, i) * a);
  }

  function guyou(λ, φ) {
    var k_ = (Math.SQRT2 - 1) / (Math.SQRT2 + 1),
        k = Math.sqrt(1 - k_ * k_),
        K = ellipticF(halfπ, k * k),
        f = -1;
    var ψ = Math.log(Math.tan(π / 4 + Math.abs(φ) / 2)),
        r = Math.exp(f * ψ) / Math.sqrt(k_),
        at = guyouComplexAtan(r * Math.cos(f * λ), r * Math.sin(f * λ)),
        t = ellipticFi(at[0], at[1], k * k);
    return [-t[1], (φ >= 0 ? 1 : -1) * (.5 * K - t[0])];
  }

  function guyouComplexAtan(x, y) {
    var x2 = x * x,
        y_1 = y + 1,
        t = 1 - x2 - y * y;
    return [.5 * ((x >= 0 ? halfπ : -halfπ) - Math.atan2(t, 2 * x)), -.25 * Math.log(t * t + 4 * x2) + .5 * Math.log(y_1 * y_1 + x2)];
  }

  function guyouComplexDivide(a, b) {
    var denominator = b[0] * b[0] + b[1] * b[1];
    return [(a[0] * b[0] + a[1] * b[1]) / denominator, (a[1] * b[0] - a[0] * b[1]) / denominator];
  }

  guyou.invert = function (x, y) {
    var k_ = (Math.SQRT2 - 1) / (Math.SQRT2 + 1),
        k = Math.sqrt(1 - k_ * k_),
        K = ellipticF(halfπ, k * k),
        f = -1;
    var j = ellipticJi(.5 * K - y, -x, k * k),
        tn = guyouComplexDivide(j[0], j[1]),
        λ = Math.atan2(tn[1], tn[0]) / f;
    return [λ, 2 * Math.atan(Math.exp(.5 / f * Math.log(k_ * tn[0] * tn[0] + k_ * tn[1] * tn[1]))) - halfπ];
  };

  d3.geo.guyou = quincuncialProjection(guyou);

  function hammerRetroazimuthal(φ0) {
    var sinφ0 = Math.sin(φ0),
        cosφ0 = Math.cos(φ0),
        rotate = hammerRetroazimuthalRotation(φ0);
    rotate.invert = hammerRetroazimuthalRotation(-φ0);

    function forward(λ, φ) {
      var p = rotate(λ, φ);
      λ = p[0], φ = p[1];
      var sinφ = Math.sin(φ),
          cosφ = Math.cos(φ),
          cosλ = Math.cos(λ),
          z = acos(sinφ0 * sinφ + cosφ0 * cosφ * cosλ),
          sinz = Math.sin(z),
          K = Math.abs(sinz) > ε ? z / sinz : 1;
      return [K * cosφ0 * Math.sin(λ), (Math.abs(λ) > halfπ ? K : -K) * (sinφ0 * cosφ - cosφ0 * sinφ * cosλ)];
    }

    forward.invert = function (x, y) {
      var ρ = Math.sqrt(x * x + y * y),
          sinz = -Math.sin(ρ),
          cosz = Math.cos(ρ),
          a = ρ * cosz,
          b = -y * sinz,
          c = ρ * sinφ0,
          d = asqrt(a * a + b * b - c * c),
          φ = Math.atan2(a * c + b * d, b * c - a * d),
          λ = (ρ > halfπ ? -1 : 1) * Math.atan2(x * sinz, ρ * Math.cos(φ) * cosz + y * Math.sin(φ) * sinz);
      return rotate.invert(λ, φ);
    };

    return forward;
  }

  function hammerRetroazimuthalRotation(φ0) {
    var sinφ0 = Math.sin(φ0),
        cosφ0 = Math.cos(φ0);
    return function (λ, φ) {
      var cosφ = Math.cos(φ),
          x = Math.cos(λ) * cosφ,
          y = Math.sin(λ) * cosφ,
          z = Math.sin(φ);
      return [Math.atan2(y, x * cosφ0 - z * sinφ0), asin(z * cosφ0 + x * sinφ0)];
    };
  }

  function hammerRetroazimuthalProjection() {
    var φ0 = 0,
        m = projectionMutator(hammerRetroazimuthal),
        p = m(φ0),
        rotate_ = p.rotate,
        stream_ = p.stream,
        circle = d3.geo.circle();

    p.parallel = function (_) {
      if (!arguments.length) return φ0 / π * 180;
      var r = p.rotate();
      return m(φ0 = _ * π / 180).rotate(r);
    };

    p.rotate = function (_) {
      if (!arguments.length) return _ = rotate_.call(p), _[1] += φ0 / π * 180, _;
      rotate_.call(p, [_[0], _[1] - φ0 / π * 180]);
      circle.origin([-_[0], -_[1]]);
      return p;
    };

    p.stream = function (stream) {
      stream = stream_(stream);

      stream.sphere = function () {
        stream.polygonStart();
        var ε = .01,
            ring = circle.angle(90 - ε)().coordinates[0],
            n = ring.length - 1,
            i = -1,
            p;
        stream.lineStart();

        while (++i < n) {
          stream.point((p = ring[i])[0], p[1]);
        }

        stream.lineEnd();
        ring = circle.angle(90 + ε)().coordinates[0];
        n = ring.length - 1;
        stream.lineStart();

        while (--i >= 0) {
          stream.point((p = ring[i])[0], p[1]);
        }

        stream.lineEnd();
        stream.polygonEnd();
      };

      return stream;
    };

    return p;
  }

  (d3.geo.hammerRetroazimuthal = hammerRetroazimuthalProjection).raw = hammerRetroazimuthal;
  var hammerAzimuthalEqualArea = d3.geo.azimuthalEqualArea.raw;

  function hammer(A, B) {
    if (arguments.length < 2) B = A;
    if (B === 1) return hammerAzimuthalEqualArea;
    if (B === Infinity) return hammerQuarticAuthalic;

    function forward(λ, φ) {
      var coordinates = hammerAzimuthalEqualArea(λ / B, φ);
      coordinates[0] *= A;
      return coordinates;
    }

    forward.invert = function (x, y) {
      var coordinates = hammerAzimuthalEqualArea.invert(x / A, y);
      coordinates[0] *= B;
      return coordinates;
    };

    return forward;
  }

  function hammerProjection() {
    var B = 2,
        m = projectionMutator(hammer),
        p = m(B);

    p.coefficient = function (_) {
      if (!arguments.length) return B;
      return m(B = +_);
    };

    return p;
  }

  function hammerQuarticAuthalic(λ, φ) {
    return [λ * Math.cos(φ) / Math.cos(φ /= 2), 2 * Math.sin(φ)];
  }

  hammerQuarticAuthalic.invert = function (x, y) {
    var φ = 2 * asin(y / 2);
    return [x * Math.cos(φ / 2) / Math.cos(φ), φ];
  };

  (d3.geo.hammer = hammerProjection).raw = hammer;

  function hatano(λ, φ) {
    var c = Math.sin(φ) * (φ < 0 ? 2.43763 : 2.67595);

    for (var i = 0, δ; i < 20; i++) {
      φ -= δ = (φ + Math.sin(φ) - c) / (1 + Math.cos(φ));
      if (Math.abs(δ) < ε) break;
    }

    return [.85 * λ * Math.cos(φ *= .5), Math.sin(φ) * (φ < 0 ? 1.93052 : 1.75859)];
  }

  hatano.invert = function (x, y) {
    var θ = Math.abs(θ = y * (y < 0 ? .5179951515653813 : .5686373742600607)) > 1 - ε ? θ > 0 ? halfπ : -halfπ : asin(θ);
    return [1.1764705882352942 * x / Math.cos(θ), Math.abs(θ = ((θ += θ) + Math.sin(θ)) * (y < 0 ? .4102345310814193 : .3736990601468637)) > 1 - ε ? θ > 0 ? halfπ : -halfπ : asin(θ)];
  };

  (d3.geo.hatano = function () {
    return projection(hatano);
  }).raw = hatano;
  var healpixParallel = 41 + 48 / 36 + 37 / 3600;

  function healpix(h) {
    var lambert = d3.geo.cylindricalEqualArea.raw(0),
        φ0 = healpixParallel * π / 180,
        dx0 = 2 * π,
        dx1 = d3.geo.collignon.raw(π, φ0)[0] - d3.geo.collignon.raw(-π, φ0)[0],
        y0 = lambert(0, φ0)[1],
        y1 = d3.geo.collignon.raw(0, φ0)[1],
        dy1 = d3.geo.collignon.raw(0, halfπ)[1] - y1,
        k = 2 * π / h;

    function forward(λ, φ) {
      var point,
          φ2 = Math.abs(φ);

      if (φ2 > φ0) {
        var i = Math.min(h - 1, Math.max(0, Math.floor((λ + π) / k)));
        λ += π * (h - 1) / h - i * k;
        point = d3.geo.collignon.raw(λ, φ2);
        point[0] = point[0] * dx0 / dx1 - dx0 * (h - 1) / (2 * h) + i * dx0 / h;
        point[1] = y0 + (point[1] - y1) * 4 * dy1 / dx0;
        if (φ < 0) point[1] = -point[1];
      } else {
        point = lambert(λ, φ);
      }

      point[0] /= 2;
      return point;
    }

    forward.invert = function (x, y) {
      x *= 2;
      var y2 = Math.abs(y);

      if (y2 > y0) {
        var i = Math.min(h - 1, Math.max(0, Math.floor((x + π) / k)));
        x = (x + π * (h - 1) / h - i * k) * dx1 / dx0;
        var point = d3.geo.collignon.raw.invert(x, .25 * (y2 - y0) * dx0 / dy1 + y1);
        point[0] -= π * (h - 1) / h - i * k;
        if (y < 0) point[1] = -point[1];
        return point;
      }

      return lambert.invert(x, y);
    };

    return forward;
  }

  function healpixProjection() {
    var n = 2,
        m = projectionMutator(healpix),
        p = m(n),
        stream_ = p.stream;

    p.lobes = function (_) {
      if (!arguments.length) return n;
      return m(n = +_);
    };

    p.stream = function (stream) {
      var rotate = p.rotate(),
          rotateStream = stream_(stream),
          sphereStream = (p.rotate([0, 0]), stream_(stream));
      p.rotate(rotate);

      rotateStream.sphere = function () {
        d3.geo.stream(sphere(), sphereStream);
      };

      return rotateStream;
    };

    function sphere() {
      var step = 180 / n;
      return {
        type: "Polygon",
        coordinates: [d3.range(-180, 180 + step / 2, step).map(function (x, i) {
          return [x, i & 1 ? 90 - 1e-6 : healpixParallel];
        }).concat(d3.range(180, -180 - step / 2, -step).map(function (x, i) {
          return [x, i & 1 ? -90 + 1e-6 : -healpixParallel];
        }))]
      };
    }

    return p;
  }

  (d3.geo.healpix = healpixProjection).raw = healpix;

  function hill(K) {
    var L = 1 + K,
        sinβ = Math.sin(1 / L),
        β = asin(sinβ),
        A = 2 * Math.sqrt(π / (B = π + 4 * β * L)),
        B,
        ρ0 = .5 * A * (L + Math.sqrt(K * (2 + K))),
        K2 = K * K,
        L2 = L * L;

    function forward(λ, φ) {
      var t = 1 - Math.sin(φ),
          ρ,
          ω;

      if (t && t < 2) {
        var θ = halfπ - φ,
            i = 25,
            δ;

        do {
          var sinθ = Math.sin(θ),
              cosθ = Math.cos(θ),
              β_β1 = β + Math.atan2(sinθ, L - cosθ),
              C = 1 + L2 - 2 * L * cosθ;
          θ -= δ = (θ - K2 * β - L * sinθ + C * β_β1 - .5 * t * B) / (2 * L * sinθ * β_β1);
        } while (Math.abs(δ) > ε2 && --i > 0);

        ρ = A * Math.sqrt(C);
        ω = λ * β_β1 / π;
      } else {
        ρ = A * (K + t);
        ω = λ * β / π;
      }

      return [ρ * Math.sin(ω), ρ0 - ρ * Math.cos(ω)];
    }

    forward.invert = function (x, y) {
      var ρ2 = x * x + (y -= ρ0) * y,
          cosθ = (1 + L2 - ρ2 / (A * A)) / (2 * L),
          θ = acos(cosθ),
          sinθ = Math.sin(θ),
          β_β1 = β + Math.atan2(sinθ, L - cosθ);
      return [asin(x / Math.sqrt(ρ2)) * π / β_β1, asin(1 - 2 * (θ - K2 * β - L * sinθ + (1 + L2 - 2 * L * cosθ) * β_β1) / B)];
    };

    return forward;
  }

  function hillProjection() {
    var K = 1,
        m = projectionMutator(hill),
        p = m(K);

    p.ratio = function (_) {
      if (!arguments.length) return K;
      return m(K = +_);
    };

    return p;
  }

  (d3.geo.hill = hillProjection).raw = hill;
  var sinuMollweideφ = .7109889596207567,
      sinuMollweideY = .0528035274542;

  function sinuMollweide(λ, φ) {
    return φ > -sinuMollweideφ ? (λ = mollweide(λ, φ), λ[1] += sinuMollweideY, λ) : sinusoidal(λ, φ);
  }

  sinuMollweide.invert = function (x, y) {
    return y > -sinuMollweideφ ? mollweide.invert(x, y - sinuMollweideY) : sinusoidal.invert(x, y);
  };

  (d3.geo.sinuMollweide = function () {
    return projection(sinuMollweide).rotate([-20, -55]);
  }).raw = sinuMollweide;

  function homolosine(λ, φ) {
    return Math.abs(φ) > sinuMollweideφ ? (λ = mollweide(λ, φ), λ[1] -= φ > 0 ? sinuMollweideY : -sinuMollweideY, λ) : sinusoidal(λ, φ);
  }

  homolosine.invert = function (x, y) {
    return Math.abs(y) > sinuMollweideφ ? mollweide.invert(x, y + (y > 0 ? sinuMollweideY : -sinuMollweideY)) : sinusoidal.invert(x, y);
  };

  (d3.geo.homolosine = function () {
    return projection(homolosine);
  }).raw = homolosine;

  function kavrayskiy7(λ, φ) {
    return [3 * λ / (2 * π) * Math.sqrt(π * π / 3 - φ * φ), φ];
  }

  kavrayskiy7.invert = function (x, y) {
    return [2 / 3 * π * x / Math.sqrt(π * π / 3 - y * y), y];
  };

  (d3.geo.kavrayskiy7 = function () {
    return projection(kavrayskiy7);
  }).raw = kavrayskiy7;

  function lagrange(n) {
    function forward(λ, φ) {
      if (Math.abs(Math.abs(φ) - halfπ) < ε) return [0, φ < 0 ? -2 : 2];
      var sinφ = Math.sin(φ),
          v = Math.pow((1 + sinφ) / (1 - sinφ), n / 2),
          c = .5 * (v + 1 / v) + Math.cos(λ *= n);
      return [2 * Math.sin(λ) / c, (v - 1 / v) / c];
    }

    forward.invert = function (x, y) {
      var y0 = Math.abs(y);
      if (Math.abs(y0 - 2) < ε) return x ? null : [0, sgn(y) * halfπ];
      if (y0 > 2) return null;
      x /= 2, y /= 2;
      var x2 = x * x,
          y2 = y * y,
          t = 2 * y / (1 + x2 + y2);
      t = Math.pow((1 + t) / (1 - t), 1 / n);
      return [Math.atan2(2 * x, 1 - x2 - y2) / n, asin((t - 1) / (t + 1))];
    };

    return forward;
  }

  function lagrangeProjection() {
    var n = .5,
        m = projectionMutator(lagrange),
        p = m(n);

    p.spacing = function (_) {
      if (!arguments.length) return n;
      return m(n = +_);
    };

    return p;
  }

  (d3.geo.lagrange = lagrangeProjection).raw = lagrange;

  function larrivee(λ, φ) {
    return [λ * (1 + Math.sqrt(Math.cos(φ))) / 2, φ / (Math.cos(φ / 2) * Math.cos(λ / 6))];
  }

  larrivee.invert = function (x, y) {
    var x0 = Math.abs(x),
        y0 = Math.abs(y),
        π_sqrt2 = π / Math.SQRT2,
        λ = ε,
        φ = halfπ;
    if (y0 < π_sqrt2) φ *= y0 / π_sqrt2;else λ += 6 * acos(π_sqrt2 / y0);

    for (var i = 0; i < 25; i++) {
      var sinφ = Math.sin(φ),
          sqrtcosφ = asqrt(Math.cos(φ)),
          sinφ_2 = Math.sin(φ / 2),
          cosφ_2 = Math.cos(φ / 2),
          sinλ_6 = Math.sin(λ / 6),
          cosλ_6 = Math.cos(λ / 6),
          f0 = .5 * λ * (1 + sqrtcosφ) - x0,
          f1 = φ / (cosφ_2 * cosλ_6) - y0,
          df0dφ = sqrtcosφ ? -.25 * λ * sinφ / sqrtcosφ : 0,
          df0dλ = .5 * (1 + sqrtcosφ),
          df1dφ = (1 + .5 * φ * sinφ_2 / cosφ_2) / (cosφ_2 * cosλ_6),
          df1dλ = φ / cosφ_2 * (sinλ_6 / 6) / (cosλ_6 * cosλ_6),
          denom = df0dφ * df1dλ - df1dφ * df0dλ,
          dφ = (f0 * df1dλ - f1 * df0dλ) / denom,
          dλ = (f1 * df0dφ - f0 * df1dφ) / denom;
      φ -= dφ;
      λ -= dλ;
      if (Math.abs(dφ) < ε && Math.abs(dλ) < ε) break;
    }

    return [x < 0 ? -λ : λ, y < 0 ? -φ : φ];
  };

  (d3.geo.larrivee = function () {
    return projection(larrivee);
  }).raw = larrivee;

  function laskowski(λ, φ) {
    var λ2 = λ * λ,
        φ2 = φ * φ;
    return [λ * (.975534 + φ2 * (-.119161 + λ2 * -.0143059 + φ2 * -.0547009)), φ * (1.00384 + λ2 * (.0802894 + φ2 * -.02855 + λ2 * 199025e-9) + φ2 * (.0998909 + φ2 * -.0491032))];
  }

  laskowski.invert = function (x, y) {
    var λ = sgn(x) * π,
        φ = y / 2,
        i = 50;

    do {
      var λ2 = λ * λ,
          φ2 = φ * φ,
          λφ = λ * φ,
          fx = λ * (.975534 + φ2 * (-.119161 + λ2 * -.0143059 + φ2 * -.0547009)) - x,
          fy = φ * (1.00384 + λ2 * (.0802894 + φ2 * -.02855 + λ2 * 199025e-9) + φ2 * (.0998909 + φ2 * -.0491032)) - y,
          δxδλ = .975534 - φ2 * (.119161 + 3 * λ2 * .0143059 + φ2 * .0547009),
          δxδφ = -λφ * (2 * .119161 + 4 * .0547009 * φ2 + 2 * .0143059 * λ2),
          δyδλ = λφ * (2 * .0802894 + 4 * 199025e-9 * λ2 + 2 * -.02855 * φ2),
          δyδφ = 1.00384 + λ2 * (.0802894 + 199025e-9 * λ2) + φ2 * (3 * (.0998909 - .02855 * λ2) - 5 * .0491032 * φ2),
          denominator = δxδφ * δyδλ - δyδφ * δxδλ,
          δλ = (fy * δxδφ - fx * δyδφ) / denominator,
          δφ = (fx * δyδλ - fy * δxδλ) / denominator;
      λ -= δλ, φ -= δφ;
    } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);

    return i && [λ, φ];
  };

  (d3.geo.laskowski = function () {
    return projection(laskowski);
  }).raw = laskowski;

  function littrow(λ, φ) {
    return [Math.sin(λ) / Math.cos(φ), Math.tan(φ) * Math.cos(λ)];
  }

  littrow.invert = function (x, y) {
    var x2 = x * x,
        y2 = y * y,
        y2_1 = y2 + 1,
        cosφ = x ? Math.SQRT1_2 * Math.sqrt((y2_1 - Math.sqrt(x2 * x2 + 2 * x2 * (y2 - 1) + y2_1 * y2_1)) / x2 + 1) : 1 / Math.sqrt(y2_1);
    return [asin(x * cosφ), sgn(y) * acos(cosφ)];
  };

  (d3.geo.littrow = function () {
    return projection(littrow);
  }).raw = littrow;

  function loximuthal(φ0) {
    var cosφ0 = Math.cos(φ0),
        tanφ0 = Math.tan(π / 4 + φ0 / 2);

    function forward(λ, φ) {
      var y = φ - φ0,
          x = Math.abs(y) < ε ? λ * cosφ0 : Math.abs(x = π / 4 + φ / 2) < ε || Math.abs(Math.abs(x) - halfπ) < ε ? 0 : λ * y / Math.log(Math.tan(x) / tanφ0);
      return [x, y];
    }

    forward.invert = function (x, y) {
      var λ,
          φ = y + φ0;
      return [Math.abs(y) < ε ? x / cosφ0 : Math.abs(λ = π / 4 + φ / 2) < ε || Math.abs(Math.abs(λ) - halfπ) < ε ? 0 : x * Math.log(Math.tan(λ) / tanφ0) / y, φ];
    };

    return forward;
  }

  (d3.geo.loximuthal = function () {
    return parallel1Projection(loximuthal).parallel(40);
  }).raw = loximuthal;

  function miller(λ, φ) {
    return [λ, 1.25 * Math.log(Math.tan(π / 4 + .4 * φ))];
  }

  miller.invert = function (x, y) {
    return [x, 2.5 * Math.atan(Math.exp(.8 * y)) - .625 * π];
  };

  (d3.geo.miller = function () {
    return projection(miller);
  }).raw = miller;

  function modifiedStereographic(C) {
    var m = C.length - 1;

    function forward(λ, φ) {
      var cosφ = Math.cos(φ),
          k = 2 / (1 + cosφ * Math.cos(λ)),
          zr = k * cosφ * Math.sin(λ),
          zi = k * Math.sin(φ),
          i = m,
          w = C[i],
          ar = w[0],
          ai = w[1],
          t;

      while (--i >= 0) {
        w = C[i];
        ar = w[0] + zr * (t = ar) - zi * ai;
        ai = w[1] + zr * ai + zi * t;
      }

      ar = zr * (t = ar) - zi * ai;
      ai = zr * ai + zi * t;
      return [ar, ai];
    }

    forward.invert = function (x, y) {
      var i = 20,
          zr = x,
          zi = y;

      do {
        var j = m,
            w = C[j],
            ar = w[0],
            ai = w[1],
            br = 0,
            bi = 0,
            t;

        while (--j >= 0) {
          w = C[j];
          br = ar + zr * (t = br) - zi * bi;
          bi = ai + zr * bi + zi * t;
          ar = w[0] + zr * (t = ar) - zi * ai;
          ai = w[1] + zr * ai + zi * t;
        }

        br = ar + zr * (t = br) - zi * bi;
        bi = ai + zr * bi + zi * t;
        ar = zr * (t = ar) - zi * ai - x;
        ai = zr * ai + zi * t - y;
        var denominator = br * br + bi * bi,
            δr,
            δi;
        zr -= δr = (ar * br + ai * bi) / denominator;
        zi -= δi = (ai * br - ar * bi) / denominator;
      } while (Math.abs(δr) + Math.abs(δi) > ε * ε && --i > 0);

      if (i) {
        var ρ = Math.sqrt(zr * zr + zi * zi),
            c = 2 * Math.atan(ρ * .5),
            sinc = Math.sin(c);
        return [Math.atan2(zr * sinc, ρ * Math.cos(c)), ρ ? asin(zi * sinc / ρ) : 0];
      }
    };

    return forward;
  }

  var modifiedStereographicCoefficients = {
    alaska: [[.9972523, 0], [.0052513, -.0041175], [.0074606, .0048125], [-.0153783, -.1968253], [.0636871, -.1408027], [.3660976, -.2937382]],
    gs48: [[.98879, 0], [0, 0], [-.050909, 0], [0, 0], [.075528, 0]],
    gs50: [[.984299, 0], [.0211642, .0037608], [-.1036018, -.0575102], [-.0329095, -.0320119], [.0499471, .1223335], [.026046, .0899805], [7388e-7, -.1435792], [.0075848, -.1334108], [-.0216473, .0776645], [-.0225161, .0853673]],
    miller: [[.9245, 0], [0, 0], [.01943, 0]],
    lee: [[.721316, 0], [0, 0], [-.00881625, -.00617325]]
  };

  function modifiedStereographicProjection() {
    var coefficients = modifiedStereographicCoefficients.miller,
        m = projectionMutator(modifiedStereographic),
        p = m(coefficients);

    p.coefficients = function (_) {
      if (!arguments.length) return coefficients;
      return m(coefficients = typeof _ === "string" ? modifiedStereographicCoefficients[_] : _);
    };

    return p;
  }

  (d3.geo.modifiedStereographic = modifiedStereographicProjection).raw = modifiedStereographic;

  function mtFlatPolarParabolic(λ, φ) {
    var sqrt6 = Math.sqrt(6),
        sqrt7 = Math.sqrt(7),
        θ = Math.asin(7 * Math.sin(φ) / (3 * sqrt6));
    return [sqrt6 * λ * (2 * Math.cos(2 * θ / 3) - 1) / sqrt7, 9 * Math.sin(θ / 3) / sqrt7];
  }

  mtFlatPolarParabolic.invert = function (x, y) {
    var sqrt6 = Math.sqrt(6),
        sqrt7 = Math.sqrt(7),
        θ = 3 * asin(y * sqrt7 / 9);
    return [x * sqrt7 / (sqrt6 * (2 * Math.cos(2 * θ / 3) - 1)), asin(Math.sin(θ) * 3 * sqrt6 / 7)];
  };

  (d3.geo.mtFlatPolarParabolic = function () {
    return projection(mtFlatPolarParabolic);
  }).raw = mtFlatPolarParabolic;

  function mtFlatPolarQuartic(λ, φ) {
    var k = (1 + Math.SQRT1_2) * Math.sin(φ),
        θ = φ;

    for (var i = 0, δ; i < 25; i++) {
      θ -= δ = (Math.sin(θ / 2) + Math.sin(θ) - k) / (.5 * Math.cos(θ / 2) + Math.cos(θ));
      if (Math.abs(δ) < ε) break;
    }

    return [λ * (1 + 2 * Math.cos(θ) / Math.cos(θ / 2)) / (3 * Math.SQRT2), 2 * Math.sqrt(3) * Math.sin(θ / 2) / Math.sqrt(2 + Math.SQRT2)];
  }

  mtFlatPolarQuartic.invert = function (x, y) {
    var sinθ_2 = y * Math.sqrt(2 + Math.SQRT2) / (2 * Math.sqrt(3)),
        θ = 2 * asin(sinθ_2);
    return [3 * Math.SQRT2 * x / (1 + 2 * Math.cos(θ) / Math.cos(θ / 2)), asin((sinθ_2 + Math.sin(θ)) / (1 + Math.SQRT1_2))];
  };

  (d3.geo.mtFlatPolarQuartic = function () {
    return projection(mtFlatPolarQuartic);
  }).raw = mtFlatPolarQuartic;

  function mtFlatPolarSinusoidal(λ, φ) {
    var A = Math.sqrt(6 / (4 + π)),
        k = (1 + π / 4) * Math.sin(φ),
        θ = φ / 2;

    for (var i = 0, δ; i < 25; i++) {
      θ -= δ = (θ / 2 + Math.sin(θ) - k) / (.5 + Math.cos(θ));
      if (Math.abs(δ) < ε) break;
    }

    return [A * (.5 + Math.cos(θ)) * λ / 1.5, A * θ];
  }

  mtFlatPolarSinusoidal.invert = function (x, y) {
    var A = Math.sqrt(6 / (4 + π)),
        θ = y / A;
    if (Math.abs(Math.abs(θ) - halfπ) < ε) θ = θ < 0 ? -halfπ : halfπ;
    return [1.5 * x / (A * (.5 + Math.cos(θ))), asin((θ / 2 + Math.sin(θ)) / (1 + π / 4))];
  };

  (d3.geo.mtFlatPolarSinusoidal = function () {
    return projection(mtFlatPolarSinusoidal);
  }).raw = mtFlatPolarSinusoidal;

  function naturalEarth(λ, φ) {
    var φ2 = φ * φ,
        φ4 = φ2 * φ2;
    return [λ * (.8707 - .131979 * φ2 + φ4 * (-.013791 + φ4 * (.003971 * φ2 - .001529 * φ4))), φ * (1.007226 + φ2 * (.015085 + φ4 * (-.044475 + .028874 * φ2 - .005916 * φ4)))];
  }

  naturalEarth.invert = function (x, y) {
    var φ = y,
        i = 25,
        δ;

    do {
      var φ2 = φ * φ,
          φ4 = φ2 * φ2;
      φ -= δ = (φ * (1.007226 + φ2 * (.015085 + φ4 * (-.044475 + .028874 * φ2 - .005916 * φ4))) - y) / (1.007226 + φ2 * (.015085 * 3 + φ4 * (-.044475 * 7 + .028874 * 9 * φ2 - .005916 * 11 * φ4)));
    } while (Math.abs(δ) > ε && --i > 0);

    return [x / (.8707 + (φ2 = φ * φ) * (-.131979 + φ2 * (-.013791 + φ2 * φ2 * φ2 * (.003971 - .001529 * φ2)))), φ];
  };

  (d3.geo.naturalEarth = function () {
    return projection(naturalEarth);
  }).raw = naturalEarth;

  function nellHammer(λ, φ) {
    return [λ * (1 + Math.cos(φ)) / 2, 2 * (φ - Math.tan(φ / 2))];
  }

  nellHammer.invert = function (x, y) {
    var p = y / 2;

    for (var i = 0, δ = Infinity; i < 10 && Math.abs(δ) > ε; i++) {
      var c = Math.cos(y / 2);
      y -= δ = (y - Math.tan(y / 2) - p) / (1 - .5 / (c * c));
    }

    return [2 * x / (1 + Math.cos(y)), y];
  };

  (d3.geo.nellHammer = function () {
    return projection(nellHammer);
  }).raw = nellHammer;
  var pattersonK1 = 1.0148,
      pattersonK2 = .23185,
      pattersonK3 = -.14499,
      pattersonK4 = .02406,
      pattersonC1 = pattersonK1,
      pattersonC2 = 5 * pattersonK2,
      pattersonC3 = 7 * pattersonK3,
      pattersonC4 = 9 * pattersonK4,
      pattersonYmax = 1.790857183;

  function patterson(λ, φ) {
    var φ2 = φ * φ;
    return [λ, φ * (pattersonK1 + φ2 * φ2 * (pattersonK2 + φ2 * (pattersonK3 + pattersonK4 * φ2)))];
  }

  patterson.invert = function (x, y) {
    if (y > pattersonYmax) y = pattersonYmax;else if (y < -pattersonYmax) y = -pattersonYmax;
    var yc = y,
        δ;

    do {
      var y2 = yc * yc;
      yc -= δ = (yc * (pattersonK1 + y2 * y2 * (pattersonK2 + y2 * (pattersonK3 + pattersonK4 * y2))) - y) / (pattersonC1 + y2 * y2 * (pattersonC2 + y2 * (pattersonC3 + pattersonC4 * y2)));
    } while (Math.abs(δ) > ε);

    return [x, yc];
  };

  (d3.geo.patterson = function () {
    return projection(patterson);
  }).raw = patterson;
  var peirceQuincuncialProjection = quincuncialProjection(guyou);
  (d3.geo.peirceQuincuncial = function () {
    return peirceQuincuncialProjection().quincuncial(true).rotate([-90, -90, 45]).clipAngle(180 - 1e-6);
  }).raw = peirceQuincuncialProjection.raw;

  function polyconic(λ, φ) {
    if (Math.abs(φ) < ε) return [λ, 0];
    var tanφ = Math.tan(φ),
        k = λ * Math.sin(φ);
    return [Math.sin(k) / tanφ, φ + (1 - Math.cos(k)) / tanφ];
  }

  polyconic.invert = function (x, y) {
    if (Math.abs(y) < ε) return [x, 0];
    var k = x * x + y * y,
        φ = y * .5,
        i = 10,
        δ;

    do {
      var tanφ = Math.tan(φ),
          secφ = 1 / Math.cos(φ),
          j = k - 2 * y * φ + φ * φ;
      φ -= δ = (tanφ * j + 2 * (φ - y)) / (2 + j * secφ * secφ + 2 * (φ - y) * tanφ);
    } while (Math.abs(δ) > ε && --i > 0);

    tanφ = Math.tan(φ);
    return [(Math.abs(y) < Math.abs(φ + 1 / tanφ) ? asin(x * tanφ) : sgn(x) * (acos(Math.abs(x * tanφ)) + halfπ)) / Math.sin(φ), φ];
  };

  (d3.geo.polyconic = function () {
    return projection(polyconic);
  }).raw = polyconic;

  function rectangularPolyconic(φ0) {
    var sinφ0 = Math.sin(φ0);

    function forward(λ, φ) {
      var A = sinφ0 ? Math.tan(λ * sinφ0 / 2) / sinφ0 : λ / 2;
      if (!φ) return [2 * A, -φ0];
      var E = 2 * Math.atan(A * Math.sin(φ)),
          cotφ = 1 / Math.tan(φ);
      return [Math.sin(E) * cotφ, φ + (1 - Math.cos(E)) * cotφ - φ0];
    }

    forward.invert = function (x, y) {
      if (Math.abs(y += φ0) < ε) return [sinφ0 ? 2 * Math.atan(sinφ0 * x / 2) / sinφ0 : x, 0];
      var k = x * x + y * y,
          φ = 0,
          i = 10,
          δ;

      do {
        var tanφ = Math.tan(φ),
            secφ = 1 / Math.cos(φ),
            j = k - 2 * y * φ + φ * φ;
        φ -= δ = (tanφ * j + 2 * (φ - y)) / (2 + j * secφ * secφ + 2 * (φ - y) * tanφ);
      } while (Math.abs(δ) > ε && --i > 0);

      var E = x * (tanφ = Math.tan(φ)),
          A = Math.tan(Math.abs(y) < Math.abs(φ + 1 / tanφ) ? asin(E) * .5 : acos(E) * .5 + π / 4) / Math.sin(φ);
      return [sinφ0 ? 2 * Math.atan(sinφ0 * A) / sinφ0 : 2 * A, φ];
    };

    return forward;
  }

  (d3.geo.rectangularPolyconic = function () {
    return parallel1Projection(rectangularPolyconic);
  }).raw = rectangularPolyconic;
  var robinsonConstants = [[.9986, -.062], [1, 0], [.9986, .062], [.9954, .124], [.99, .186], [.9822, .248], [.973, .31], [.96, .372], [.9427, .434], [.9216, .4958], [.8962, .5571], [.8679, .6176], [.835, .6769], [.7986, .7346], [.7597, .7903], [.7186, .8435], [.6732, .8936], [.6213, .9394], [.5722, .9761], [.5322, 1]];
  robinsonConstants.forEach(function (d) {
    d[1] *= 1.0144;
  });

  function robinson(λ, φ) {
    var i = Math.min(18, Math.abs(φ) * 36 / π),
        i0 = Math.floor(i),
        di = i - i0,
        ax = (k = robinsonConstants[i0])[0],
        ay = k[1],
        bx = (k = robinsonConstants[++i0])[0],
        by = k[1],
        cx = (k = robinsonConstants[Math.min(19, ++i0)])[0],
        cy = k[1],
        k;
    return [λ * (bx + di * (cx - ax) / 2 + di * di * (cx - 2 * bx + ax) / 2), (φ > 0 ? halfπ : -halfπ) * (by + di * (cy - ay) / 2 + di * di * (cy - 2 * by + ay) / 2)];
  }

  robinson.invert = function (x, y) {
    var yy = y / halfπ,
        φ = yy * 90,
        i = Math.min(18, Math.abs(φ / 5)),
        i0 = Math.max(0, Math.floor(i));

    do {
      var ay = robinsonConstants[i0][1],
          by = robinsonConstants[i0 + 1][1],
          cy = robinsonConstants[Math.min(19, i0 + 2)][1],
          u = cy - ay,
          v = cy - 2 * by + ay,
          t = 2 * (Math.abs(yy) - by) / u,
          c = v / u,
          di = t * (1 - c * t * (1 - 2 * c * t));

      if (di >= 0 || i0 === 1) {
        φ = (y >= 0 ? 5 : -5) * (di + i);
        var j = 50,
            δ;

        do {
          i = Math.min(18, Math.abs(φ) / 5);
          i0 = Math.floor(i);
          di = i - i0;
          ay = robinsonConstants[i0][1];
          by = robinsonConstants[i0 + 1][1];
          cy = robinsonConstants[Math.min(19, i0 + 2)][1];
          φ -= (δ = (y >= 0 ? halfπ : -halfπ) * (by + di * (cy - ay) / 2 + di * di * (cy - 2 * by + ay) / 2) - y) * degrees;
        } while (Math.abs(δ) > ε2 && --j > 0);

        break;
      }
    } while (--i0 >= 0);

    var ax = robinsonConstants[i0][0],
        bx = robinsonConstants[i0 + 1][0],
        cx = robinsonConstants[Math.min(19, i0 + 2)][0];
    return [x / (bx + di * (cx - ax) / 2 + di * di * (cx - 2 * bx + ax) / 2), φ * radians];
  };

  (d3.geo.robinson = function () {
    return projection(robinson);
  }).raw = robinson;

  function satelliteVertical(P) {
    function forward(λ, φ) {
      var cosφ = Math.cos(φ),
          k = (P - 1) / (P - cosφ * Math.cos(λ));
      return [k * cosφ * Math.sin(λ), k * Math.sin(φ)];
    }

    forward.invert = function (x, y) {
      var ρ2 = x * x + y * y,
          ρ = Math.sqrt(ρ2),
          sinc = (P - Math.sqrt(1 - ρ2 * (P + 1) / (P - 1))) / ((P - 1) / ρ + ρ / (P - 1));
      return [Math.atan2(x * sinc, ρ * Math.sqrt(1 - sinc * sinc)), ρ ? asin(y * sinc / ρ) : 0];
    };

    return forward;
  }

  function satellite(P, ω) {
    var vertical = satelliteVertical(P);
    if (!ω) return vertical;
    var cosω = Math.cos(ω),
        sinω = Math.sin(ω);

    function forward(λ, φ) {
      var coordinates = vertical(λ, φ),
          y = coordinates[1],
          A = y * sinω / (P - 1) + cosω;
      return [coordinates[0] * cosω / A, y / A];
    }

    forward.invert = function (x, y) {
      var k = (P - 1) / (P - 1 - y * sinω);
      return vertical.invert(k * x, k * y * cosω);
    };

    return forward;
  }

  function satelliteProjection() {
    var P = 1.4,
        ω = 0,
        m = projectionMutator(satellite),
        p = m(P, ω);

    p.distance = function (_) {
      if (!arguments.length) return P;
      return m(P = +_, ω);
    };

    p.tilt = function (_) {
      if (!arguments.length) return ω * 180 / π;
      return m(P, ω = _ * π / 180);
    };

    return p;
  }

  (d3.geo.satellite = satelliteProjection).raw = satellite;

  function times(λ, φ) {
    var t = Math.tan(φ / 2),
        s = Math.sin(π / 4 * t);
    return [λ * (.74482 - .34588 * s * s), 1.70711 * t];
  }

  times.invert = function (x, y) {
    var t = y / 1.70711,
        s = Math.sin(π / 4 * t);
    return [x / (.74482 - .34588 * s * s), 2 * Math.atan(t)];
  };

  (d3.geo.times = function () {
    return projection(times);
  }).raw = times;

  function twoPointEquidistant(z0) {
    if (!z0) return d3.geo.azimuthalEquidistant.raw;
    var λa = -z0 / 2,
        λb = -λa,
        z02 = z0 * z0,
        tanλ0 = Math.tan(λb),
        S = .5 / Math.sin(λb);

    function forward(λ, φ) {
      var za = acos(Math.cos(φ) * Math.cos(λ - λa)),
          zb = acos(Math.cos(φ) * Math.cos(λ - λb)),
          ys = φ < 0 ? -1 : 1;
      za *= za, zb *= zb;
      return [(za - zb) / (2 * z0), ys * asqrt(4 * z02 * zb - (z02 - za + zb) * (z02 - za + zb)) / (2 * z0)];
    }

    forward.invert = function (x, y) {
      var y2 = y * y,
          cosza = Math.cos(Math.sqrt(y2 + (t = x + λa) * t)),
          coszb = Math.cos(Math.sqrt(y2 + (t = x + λb) * t)),
          t,
          d;
      return [Math.atan2(d = cosza - coszb, t = (cosza + coszb) * tanλ0), (y < 0 ? -1 : 1) * acos(Math.sqrt(t * t + d * d) * S)];
    };

    return forward;
  }

  function twoPointEquidistantProjection() {
    var points = [[0, 0], [0, 0]],
        m = projectionMutator(twoPointEquidistant),
        p = m(0),
        rotate = p.rotate;
    delete p.rotate;

    p.points = function (_) {
      if (!arguments.length) return points;
      points = _;
      var interpolate = d3.geo.interpolate(_[0], _[1]),
          origin = interpolate(.5),
          p = d3.geo.rotation([-origin[0], -origin[1]])(_[0]),
          b = interpolate.distance * .5,
          γ = -asin(Math.sin(p[1] * radians) / Math.sin(b));
      if (p[0] > 0) γ = π - γ;
      rotate.call(p, [-origin[0], -origin[1], -γ * degrees]);
      return m(b * 2);
    };

    return p;
  }

  (d3.geo.twoPointEquidistant = twoPointEquidistantProjection).raw = twoPointEquidistant;

  function twoPointAzimuthal(d) {
    var cosd = Math.cos(d);

    function forward(λ, φ) {
      var coordinates = d3.geo.gnomonic.raw(λ, φ);
      coordinates[0] *= cosd;
      return coordinates;
    }

    forward.invert = function (x, y) {
      return d3.geo.gnomonic.raw.invert(x / cosd, y);
    };

    return forward;
  }

  function twoPointAzimuthalProjection() {
    var points = [[0, 0], [0, 0]],
        m = projectionMutator(twoPointAzimuthal),
        p = m(0),
        rotate = p.rotate;
    delete p.rotate;

    p.points = function (_) {
      if (!arguments.length) return points;
      points = _;
      var interpolate = d3.geo.interpolate(_[0], _[1]),
          origin = interpolate(.5),
          p = d3.geo.rotation([-origin[0], -origin[1]])(_[0]),
          b = interpolate.distance * .5,
          γ = -asin(Math.sin(p[1] * radians) / Math.sin(b));
      if (p[0] > 0) γ = π - γ;
      rotate.call(p, [-origin[0], -origin[1], -γ * degrees]);
      return m(b);
    };

    return p;
  }

  (d3.geo.twoPointAzimuthal = twoPointAzimuthalProjection).raw = twoPointAzimuthal;

  function vanDerGrinten(λ, φ) {
    if (Math.abs(φ) < ε) return [λ, 0];
    var sinθ = Math.abs(φ / halfπ),
        θ = asin(sinθ);
    if (Math.abs(λ) < ε || Math.abs(Math.abs(φ) - halfπ) < ε) return [0, sgn(φ) * π * Math.tan(θ / 2)];
    var cosθ = Math.cos(θ),
        A = Math.abs(π / λ - λ / π) / 2,
        A2 = A * A,
        G = cosθ / (sinθ + cosθ - 1),
        P = G * (2 / sinθ - 1),
        P2 = P * P,
        P2_A2 = P2 + A2,
        G_P2 = G - P2,
        Q = A2 + G;
    return [sgn(λ) * π * (A * G_P2 + Math.sqrt(A2 * G_P2 * G_P2 - P2_A2 * (G * G - P2))) / P2_A2, sgn(φ) * π * (P * Q - A * Math.sqrt((A2 + 1) * P2_A2 - Q * Q)) / P2_A2];
  }

  vanDerGrinten.invert = function (x, y) {
    if (Math.abs(y) < ε) return [x, 0];
    if (Math.abs(x) < ε) return [0, halfπ * Math.sin(2 * Math.atan(y / π))];
    var x2 = (x /= π) * x,
        y2 = (y /= π) * y,
        x2_y2 = x2 + y2,
        z = x2_y2 * x2_y2,
        c1 = -Math.abs(y) * (1 + x2_y2),
        c2 = c1 - 2 * y2 + x2,
        c3 = -2 * c1 + 1 + 2 * y2 + z,
        d = y2 / c3 + (2 * c2 * c2 * c2 / (c3 * c3 * c3) - 9 * c1 * c2 / (c3 * c3)) / 27,
        a1 = (c1 - c2 * c2 / (3 * c3)) / c3,
        m1 = 2 * Math.sqrt(-a1 / 3),
        θ1 = acos(3 * d / (a1 * m1)) / 3;
    return [π * (x2_y2 - 1 + Math.sqrt(1 + 2 * (x2 - y2) + z)) / (2 * x), sgn(y) * π * (-m1 * Math.cos(θ1 + π / 3) - c2 / (3 * c3))];
  };

  (d3.geo.vanDerGrinten = function () {
    return projection(vanDerGrinten);
  }).raw = vanDerGrinten;

  function vanDerGrinten2(λ, φ) {
    if (Math.abs(φ) < ε) return [λ, 0];
    var sinθ = Math.abs(φ / halfπ),
        θ = asin(sinθ);
    if (Math.abs(λ) < ε || Math.abs(Math.abs(φ) - halfπ) < ε) return [0, sgn(φ) * π * Math.tan(θ / 2)];
    var cosθ = Math.cos(θ),
        A = Math.abs(π / λ - λ / π) / 2,
        A2 = A * A,
        x1 = cosθ * (Math.sqrt(1 + A2) - A * cosθ) / (1 + A2 * sinθ * sinθ);
    return [sgn(λ) * π * x1, sgn(φ) * π * asqrt(1 - x1 * (2 * A + x1))];
  }

  vanDerGrinten2.invert = function (x, y) {
    if (!x) return [0, halfπ * Math.sin(2 * Math.atan(y / π))];
    var x1 = Math.abs(x / π),
        A = (1 - x1 * x1 - (y /= π) * y) / (2 * x1),
        A2 = A * A,
        B = Math.sqrt(A2 + 1);
    return [sgn(x) * π * (B - A), sgn(y) * halfπ * Math.sin(2 * Math.atan2(Math.sqrt((1 - 2 * A * x1) * (A + B) - x1), Math.sqrt(B + A + x1)))];
  };

  (d3.geo.vanDerGrinten2 = function () {
    return projection(vanDerGrinten2);
  }).raw = vanDerGrinten2;

  function vanDerGrinten3(λ, φ) {
    if (Math.abs(φ) < ε) return [λ, 0];
    var sinθ = φ / halfπ,
        θ = asin(sinθ);
    if (Math.abs(λ) < ε || Math.abs(Math.abs(φ) - halfπ) < ε) return [0, π * Math.tan(θ / 2)];
    var A = (π / λ - λ / π) / 2,
        y1 = sinθ / (1 + Math.cos(θ));
    return [π * (sgn(λ) * asqrt(A * A + 1 - y1 * y1) - A), π * y1];
  }

  vanDerGrinten3.invert = function (x, y) {
    if (!y) return [x, 0];
    var y1 = y / π,
        A = (π * π * (1 - y1 * y1) - x * x) / (2 * π * x);
    return [x ? π * (sgn(x) * Math.sqrt(A * A + 1) - A) : 0, halfπ * Math.sin(2 * Math.atan(y1))];
  };

  (d3.geo.vanDerGrinten3 = function () {
    return projection(vanDerGrinten3);
  }).raw = vanDerGrinten3;

  function vanDerGrinten4(λ, φ) {
    if (!φ) return [λ, 0];
    var φ0 = Math.abs(φ);
    if (!λ || φ0 === halfπ) return [0, φ];
    var B = φ0 / halfπ,
        B2 = B * B,
        C = (8 * B - B2 * (B2 + 2) - 5) / (2 * B2 * (B - 1)),
        C2 = C * C,
        BC = B * C,
        B_C2 = B2 + C2 + 2 * BC,
        B_3C = B + 3 * C,
        λ0 = λ / halfπ,
        λ1 = λ0 + 1 / λ0,
        D = sgn(Math.abs(λ) - halfπ) * Math.sqrt(λ1 * λ1 - 4),
        D2 = D * D,
        F = B_C2 * (B2 + C2 * D2 - 1) + (1 - B2) * (B2 * (B_3C * B_3C + 4 * C2) + 12 * BC * C2 + 4 * C2 * C2),
        x1 = (D * (B_C2 + C2 - 1) + 2 * asqrt(F)) / (4 * B_C2 + D2);
    return [sgn(λ) * halfπ * x1, sgn(φ) * halfπ * asqrt(1 + D * Math.abs(x1) - x1 * x1)];
  }

  vanDerGrinten4.invert = function (x, y) {
    if (!x || !y) return [x, y];
    y /= π;
    var x1 = sgn(x) * x / halfπ,
        D = (x1 * x1 - 1 + 4 * y * y) / Math.abs(x1),
        D2 = D * D,
        B = 2 * y,
        i = 50;

    do {
      var B2 = B * B,
          C = (8 * B - B2 * (B2 + 2) - 5) / (2 * B2 * (B - 1)),
          C_ = (3 * B - B2 * B - 10) / (2 * B2 * B),
          C2 = C * C,
          BC = B * C,
          B_C = B + C,
          B_C2 = B_C * B_C,
          B_3C = B + 3 * C,
          F = B_C2 * (B2 + C2 * D2 - 1) + (1 - B2) * (B2 * (B_3C * B_3C + 4 * C2) + C2 * (12 * BC + 4 * C2)),
          F_ = -2 * B_C * (4 * BC * C2 + (1 - 4 * B2 + 3 * B2 * B2) * (1 + C_) + C2 * (-6 + 14 * B2 - D2 + (-8 + 8 * B2 - 2 * D2) * C_) + BC * (-8 + 12 * B2 + (-10 + 10 * B2 - D2) * C_)),
          sqrtF = Math.sqrt(F),
          f = D * (B_C2 + C2 - 1) + 2 * sqrtF - x1 * (4 * B_C2 + D2),
          f_ = D * (2 * C * C_ + 2 * B_C * (1 + C_)) + F_ / sqrtF - 8 * B_C * (D * (-1 + C2 + B_C2) + 2 * sqrtF) * (1 + C_) / (D2 + 4 * B_C2);
      B -= δ = f / f_;
    } while (δ > ε && --i > 0);

    return [sgn(x) * (Math.sqrt(D * D + 4) + D) * π / 4, halfπ * B];
  };

  (d3.geo.vanDerGrinten4 = function () {
    return projection(vanDerGrinten4);
  }).raw = vanDerGrinten4;

  var wagner4 = function () {
    var A = 4 * π + 3 * Math.sqrt(3),
        B = 2 * Math.sqrt(2 * π * Math.sqrt(3) / A);
    return mollweideBromley(B * Math.sqrt(3) / π, B, A / 6);
  }();

  (d3.geo.wagner4 = function () {
    return projection(wagner4);
  }).raw = wagner4;

  function wagner6(λ, φ) {
    return [λ * Math.sqrt(1 - 3 * φ * φ / (π * π)), φ];
  }

  wagner6.invert = function (x, y) {
    return [x / Math.sqrt(1 - 3 * y * y / (π * π)), y];
  };

  (d3.geo.wagner6 = function () {
    return projection(wagner6);
  }).raw = wagner6;

  function wagner7(λ, φ) {
    var s = .90631 * Math.sin(φ),
        c0 = Math.sqrt(1 - s * s),
        c1 = Math.sqrt(2 / (1 + c0 * Math.cos(λ /= 3)));
    return [2.66723 * c0 * c1 * Math.sin(λ), 1.24104 * s * c1];
  }

  wagner7.invert = function (x, y) {
    var t1 = x / 2.66723,
        t2 = y / 1.24104,
        p = Math.sqrt(t1 * t1 + t2 * t2),
        c = 2 * asin(p / 2);
    return [3 * Math.atan2(x * Math.tan(c), 2.66723 * p), p && asin(y * Math.sin(c) / (1.24104 * .90631 * p))];
  };

  (d3.geo.wagner7 = function () {
    return projection(wagner7);
  }).raw = wagner7;

  function wiechel(λ, φ) {
    var cosφ = Math.cos(φ),
        sinφ = Math.cos(λ) * cosφ,
        sin1_φ = 1 - sinφ,
        cosλ = Math.cos(λ = Math.atan2(Math.sin(λ) * cosφ, -Math.sin(φ))),
        sinλ = Math.sin(λ);
    cosφ = asqrt(1 - sinφ * sinφ);
    return [sinλ * cosφ - cosλ * sin1_φ, -cosλ * cosφ - sinλ * sin1_φ];
  }

  wiechel.invert = function (x, y) {
    var w = -.5 * (x * x + y * y),
        k = Math.sqrt(-w * (2 + w)),
        b = y * w + x * k,
        a = x * w - y * k,
        D = Math.sqrt(a * a + b * b);
    return [Math.atan2(k * b, D * (1 + w)), D ? -asin(k * a / D) : 0];
  };

  (d3.geo.wiechel = function () {
    return projection(wiechel);
  }).raw = wiechel;

  function winkel3(λ, φ) {
    var coordinates = aitoff(λ, φ);
    return [(coordinates[0] + λ / halfπ) / 2, (coordinates[1] + φ) / 2];
  }

  winkel3.invert = function (x, y) {
    var λ = x,
        φ = y,
        i = 25;

    do {
      var cosφ = Math.cos(φ),
          sinφ = Math.sin(φ),
          sin_2φ = Math.sin(2 * φ),
          sin2φ = sinφ * sinφ,
          cos2φ = cosφ * cosφ,
          sinλ = Math.sin(λ),
          cosλ_2 = Math.cos(λ / 2),
          sinλ_2 = Math.sin(λ / 2),
          sin2λ_2 = sinλ_2 * sinλ_2,
          C = 1 - cos2φ * cosλ_2 * cosλ_2,
          E = C ? acos(cosφ * cosλ_2) * Math.sqrt(F = 1 / C) : F = 0,
          F,
          fx = .5 * (2 * E * cosφ * sinλ_2 + λ / halfπ) - x,
          fy = .5 * (E * sinφ + φ) - y,
          δxδλ = .5 * F * (cos2φ * sin2λ_2 + E * cosφ * cosλ_2 * sin2φ) + .5 / halfπ,
          δxδφ = F * (sinλ * sin_2φ / 4 - E * sinφ * sinλ_2),
          δyδλ = .125 * F * (sin_2φ * sinλ_2 - E * sinφ * cos2φ * sinλ),
          δyδφ = .5 * F * (sin2φ * cosλ_2 + E * sin2λ_2 * cosφ) + .5,
          denominator = δxδφ * δyδλ - δyδφ * δxδλ,
          δλ = (fy * δxδφ - fx * δyδφ) / denominator,
          δφ = (fx * δyδλ - fy * δxδλ) / denominator;
      λ -= δλ, φ -= δφ;
    } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);

    return [λ, φ];
  };

  (d3.geo.winkel3 = function () {
    return projection(winkel3);
  }).raw = winkel3;

  function cassini(λ, φ) {
    var cosφ = Math.cos(φ),
        tanφ = Math.tan(φ),
        cosλ = Math.cos(λ),
        sinλ = Math.sin(λ);
    return [Math.asin(cosφ * sinλ), Math.atan2(tanφ, cosλ)];
  }

  cassini.invert = function (x, y) {
    return [Math.asin(Math.cos(x) * Math.sin(y)), Math.atan2(Math.tan(x), Math.cos(y))];
  };

  (d3.geo.cassini = function () {
    return projection(cassini);
  }).raw = cassini;
})();

/***/ }),

/***/ "./libs/d3.min.js":
/*!************************!*\
  !*** ./libs/d3.min.js ***!
  \************************/
/*! no static exports found */
/*! all exports used */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function () {
  function n(n) {
    return n && (n.ownerDocument || n.document || n).documentElement;
  }

  function t(n) {
    return n && (n.ownerDocument && n.ownerDocument.defaultView || n.document && n || n.defaultView);
  }

  function e(n, t) {
    return t > n ? -1 : n > t ? 1 : n >= t ? 0 : NaN;
  }

  function r(n) {
    return null === n ? NaN : +n;
  }

  function i(n) {
    return !isNaN(n);
  }

  function u(n) {
    return {
      left: function left(t, e, r, i) {
        for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = t.length); i > r;) {
          var u = r + i >>> 1;
          n(t[u], e) < 0 ? r = u + 1 : i = u;
        }

        return r;
      },
      right: function right(t, e, r, i) {
        for (arguments.length < 3 && (r = 0), arguments.length < 4 && (i = t.length); i > r;) {
          var u = r + i >>> 1;
          n(t[u], e) > 0 ? i = u : r = u + 1;
        }

        return r;
      }
    };
  }

  function o(n) {
    return n.length;
  }

  function a(n) {
    for (var t = 1; n * t % 1;) {
      t *= 10;
    }

    return t;
  }

  function l(n, t) {
    for (var e in t) {
      Object.defineProperty(n.prototype, e, {
        value: t[e],
        enumerable: !1
      });
    }
  }

  function c() {
    this._ = Object.create(null);
  }

  function f(n) {
    return (n += "") === bo || n[0] === _o ? _o + n : n;
  }

  function s(n) {
    return (n += "")[0] === _o ? n.slice(1) : n;
  }

  function h(n) {
    return f(n) in this._;
  }

  function p(n) {
    return (n = f(n)) in this._ && delete this._[n];
  }

  function g() {
    var n = [];

    for (var t in this._) {
      n.push(s(t));
    }

    return n;
  }

  function v() {
    var n = 0;

    for (var t in this._) {
      ++n;
    }

    return n;
  }

  function d() {
    for (var n in this._) {
      return !1;
    }

    return !0;
  }

  function y() {
    this._ = Object.create(null);
  }

  function m(n) {
    return n;
  }

  function M(n, t, e) {
    return function () {
      var r = e.apply(t, arguments);
      return r === t ? n : r;
    };
  }

  function x(n, t) {
    if (t in n) return t;
    t = t.charAt(0).toUpperCase() + t.slice(1);

    for (var e = 0, r = wo.length; r > e; ++e) {
      var i = wo[e] + t;
      if (i in n) return i;
    }
  }

  function b() {}

  function _() {}

  function w(n) {
    function t() {
      for (var t, r = e, i = -1, u = r.length; ++i < u;) {
        (t = r[i].on) && t.apply(this, arguments);
      }

      return n;
    }

    var e = [],
        r = new c();
    return t.on = function (t, i) {
      var u,
          o = r.get(t);
      return arguments.length < 2 ? o && o.on : (o && (o.on = null, e = e.slice(0, u = e.indexOf(o)).concat(e.slice(u + 1)), r.remove(t)), i && e.push(r.set(t, {
        on: i
      })), n);
    }, t;
  }

  function S() {
    ao.event.preventDefault();
  }

  function k() {
    for (var n, t = ao.event; n = t.sourceEvent;) {
      t = n;
    }

    return t;
  }

  function N(n) {
    for (var t = new _(), e = 0, r = arguments.length; ++e < r;) {
      t[arguments[e]] = w(t);
    }

    return t.of = function (e, r) {
      return function (i) {
        try {
          var u = i.sourceEvent = ao.event;
          i.target = n, ao.event = i, t[i.type].apply(e, r);
        } finally {
          ao.event = u;
        }
      };
    }, t;
  }

  function E(n) {
    return ko(n, Co), n;
  }

  function A(n) {
    return "function" == typeof n ? n : function () {
      return No(n, this);
    };
  }

  function C(n) {
    return "function" == typeof n ? n : function () {
      return Eo(n, this);
    };
  }

  function z(n, t) {
    function e() {
      this.removeAttribute(n);
    }

    function r() {
      this.removeAttributeNS(n.space, n.local);
    }

    function i() {
      this.setAttribute(n, t);
    }

    function u() {
      this.setAttributeNS(n.space, n.local, t);
    }

    function o() {
      var e = t.apply(this, arguments);
      null == e ? this.removeAttribute(n) : this.setAttribute(n, e);
    }

    function a() {
      var e = t.apply(this, arguments);
      null == e ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e);
    }

    return n = ao.ns.qualify(n), null == t ? n.local ? r : e : "function" == typeof t ? n.local ? a : o : n.local ? u : i;
  }

  function L(n) {
    return n.trim().replace(/\s+/g, " ");
  }

  function q(n) {
    return new RegExp("(?:^|\\s+)" + ao.requote(n) + "(?:\\s+|$)", "g");
  }

  function T(n) {
    return (n + "").trim().split(/^|\s+/);
  }

  function R(n, t) {
    function e() {
      for (var e = -1; ++e < i;) {
        n[e](this, t);
      }
    }

    function r() {
      for (var e = -1, r = t.apply(this, arguments); ++e < i;) {
        n[e](this, r);
      }
    }

    n = T(n).map(D);
    var i = n.length;
    return "function" == typeof t ? r : e;
  }

  function D(n) {
    var t = q(n);
    return function (e, r) {
      if (i = e.classList) return r ? i.add(n) : i.remove(n);
      var i = e.getAttribute("class") || "";
      r ? (t.lastIndex = 0, t.test(i) || e.setAttribute("class", L(i + " " + n))) : e.setAttribute("class", L(i.replace(t, " ")));
    };
  }

  function P(n, t, e) {
    function r() {
      this.style.removeProperty(n);
    }

    function i() {
      this.style.setProperty(n, t, e);
    }

    function u() {
      var r = t.apply(this, arguments);
      null == r ? this.style.removeProperty(n) : this.style.setProperty(n, r, e);
    }

    return null == t ? r : "function" == typeof t ? u : i;
  }

  function U(n, t) {
    function e() {
      delete this[n];
    }

    function r() {
      this[n] = t;
    }

    function i() {
      var e = t.apply(this, arguments);
      null == e ? delete this[n] : this[n] = e;
    }

    return null == t ? e : "function" == typeof t ? i : r;
  }

  function j(n) {
    function t() {
      var t = this.ownerDocument,
          e = this.namespaceURI;
      return e === zo && t.documentElement.namespaceURI === zo ? t.createElement(n) : t.createElementNS(e, n);
    }

    function e() {
      return this.ownerDocument.createElementNS(n.space, n.local);
    }

    return "function" == typeof n ? n : (n = ao.ns.qualify(n)).local ? e : t;
  }

  function F() {
    var n = this.parentNode;
    n && n.removeChild(this);
  }

  function H(n) {
    return {
      __data__: n
    };
  }

  function O(n) {
    return function () {
      return _Ao(this, n);
    };
  }

  function I(n) {
    return arguments.length || (n = e), function (t, e) {
      return t && e ? n(t.__data__, e.__data__) : !t - !e;
    };
  }

  function Y(n, t) {
    for (var e = 0, r = n.length; r > e; e++) {
      for (var i, u = n[e], o = 0, a = u.length; a > o; o++) {
        (i = u[o]) && t(i, o, e);
      }
    }

    return n;
  }

  function Z(n) {
    return ko(n, qo), n;
  }

  function V(n) {
    var t, e;
    return function (r, i, u) {
      var o,
          a = n[u].update,
          l = a.length;

      for (u != e && (e = u, t = 0), i >= t && (t = i + 1); !(o = a[t]) && ++t < l;) {
        ;
      }

      return o;
    };
  }

  function X(n, t, e) {
    function r() {
      var t = this[o];
      t && (this.removeEventListener(n, t, t.$), delete this[o]);
    }

    function i() {
      var i = l(t, co(arguments));
      r.call(this), this.addEventListener(n, this[o] = i, i.$ = e), i._ = t;
    }

    function u() {
      var t,
          e = new RegExp("^__on([^.]+)" + ao.requote(n) + "$");

      for (var r in this) {
        if (t = r.match(e)) {
          var i = this[r];
          this.removeEventListener(t[1], i, i.$), delete this[r];
        }
      }
    }

    var o = "__on" + n,
        a = n.indexOf("."),
        l = $;
    a > 0 && (n = n.slice(0, a));
    var c = To.get(n);
    return c && (n = c, l = B), a ? t ? i : r : t ? b : u;
  }

  function $(n, t) {
    return function (e) {
      var r = ao.event;
      ao.event = e, t[0] = this.__data__;

      try {
        n.apply(this, t);
      } finally {
        ao.event = r;
      }
    };
  }

  function B(n, t) {
    var e = $(n, t);
    return function (n) {
      var t = this,
          r = n.relatedTarget;
      r && (r === t || 8 & r.compareDocumentPosition(t)) || e.call(t, n);
    };
  }

  function W(e) {
    var r = ".dragsuppress-" + ++Do,
        i = "click" + r,
        u = ao.select(t(e)).on("touchmove" + r, S).on("dragstart" + r, S).on("selectstart" + r, S);

    if (null == Ro && (Ro = "onselectstart" in e ? !1 : x(e.style, "userSelect")), Ro) {
      var o = n(e).style,
          a = o[Ro];
      o[Ro] = "none";
    }

    return function (n) {
      if (u.on(r, null), Ro && (o[Ro] = a), n) {
        var t = function t() {
          u.on(i, null);
        };

        u.on(i, function () {
          S(), t();
        }, !0), setTimeout(t, 0);
      }
    };
  }

  function J(n, e) {
    e.changedTouches && (e = e.changedTouches[0]);
    var r = n.ownerSVGElement || n;

    if (r.createSVGPoint) {
      var i = r.createSVGPoint();

      if (0 > Po) {
        var u = t(n);

        if (u.scrollX || u.scrollY) {
          r = ao.select("body").append("svg").style({
            position: "absolute",
            top: 0,
            left: 0,
            margin: 0,
            padding: 0,
            border: "none"
          }, "important");
          var o = r[0][0].getScreenCTM();
          Po = !(o.f || o.e), r.remove();
        }
      }

      return Po ? (i.x = e.pageX, i.y = e.pageY) : (i.x = e.clientX, i.y = e.clientY), i = i.matrixTransform(n.getScreenCTM().inverse()), [i.x, i.y];
    }

    var a = n.getBoundingClientRect();
    return [e.clientX - a.left - n.clientLeft, e.clientY - a.top - n.clientTop];
  }

  function G() {
    return ao.event.changedTouches[0].identifier;
  }

  function K(n) {
    return n > 0 ? 1 : 0 > n ? -1 : 0;
  }

  function Q(n, t, e) {
    return (t[0] - n[0]) * (e[1] - n[1]) - (t[1] - n[1]) * (e[0] - n[0]);
  }

  function nn(n) {
    return n > 1 ? 0 : -1 > n ? Fo : Math.acos(n);
  }

  function tn(n) {
    return n > 1 ? Io : -1 > n ? -Io : Math.asin(n);
  }

  function en(n) {
    return ((n = Math.exp(n)) - 1 / n) / 2;
  }

  function rn(n) {
    return ((n = Math.exp(n)) + 1 / n) / 2;
  }

  function un(n) {
    return ((n = Math.exp(2 * n)) - 1) / (n + 1);
  }

  function on(n) {
    return (n = Math.sin(n / 2)) * n;
  }

  function an() {}

  function ln(n, t, e) {
    return this instanceof ln ? (this.h = +n, this.s = +t, void (this.l = +e)) : arguments.length < 2 ? n instanceof ln ? new ln(n.h, n.s, n.l) : _n("" + n, wn, ln) : new ln(n, t, e);
  }

  function cn(n, t, e) {
    function r(n) {
      return n > 360 ? n -= 360 : 0 > n && (n += 360), 60 > n ? u + (o - u) * n / 60 : 180 > n ? o : 240 > n ? u + (o - u) * (240 - n) / 60 : u;
    }

    function i(n) {
      return Math.round(255 * r(n));
    }

    var u, o;
    return n = isNaN(n) ? 0 : (n %= 360) < 0 ? n + 360 : n, t = isNaN(t) ? 0 : 0 > t ? 0 : t > 1 ? 1 : t, e = 0 > e ? 0 : e > 1 ? 1 : e, o = .5 >= e ? e * (1 + t) : e + t - e * t, u = 2 * e - o, new mn(i(n + 120), i(n), i(n - 120));
  }

  function fn(n, t, e) {
    return this instanceof fn ? (this.h = +n, this.c = +t, void (this.l = +e)) : arguments.length < 2 ? n instanceof fn ? new fn(n.h, n.c, n.l) : n instanceof hn ? gn(n.l, n.a, n.b) : gn((n = Sn((n = ao.rgb(n)).r, n.g, n.b)).l, n.a, n.b) : new fn(n, t, e);
  }

  function sn(n, t, e) {
    return isNaN(n) && (n = 0), isNaN(t) && (t = 0), new hn(e, Math.cos(n *= Yo) * t, Math.sin(n) * t);
  }

  function hn(n, t, e) {
    return this instanceof hn ? (this.l = +n, this.a = +t, void (this.b = +e)) : arguments.length < 2 ? n instanceof hn ? new hn(n.l, n.a, n.b) : n instanceof fn ? sn(n.h, n.c, n.l) : Sn((n = mn(n)).r, n.g, n.b) : new hn(n, t, e);
  }

  function pn(n, t, e) {
    var r = (n + 16) / 116,
        i = r + t / 500,
        u = r - e / 200;
    return i = vn(i) * na, r = vn(r) * ta, u = vn(u) * ea, new mn(yn(3.2404542 * i - 1.5371385 * r - .4985314 * u), yn(-.969266 * i + 1.8760108 * r + .041556 * u), yn(.0556434 * i - .2040259 * r + 1.0572252 * u));
  }

  function gn(n, t, e) {
    return n > 0 ? new fn(Math.atan2(e, t) * Zo, Math.sqrt(t * t + e * e), n) : new fn(NaN, NaN, n);
  }

  function vn(n) {
    return n > .206893034 ? n * n * n : (n - 4 / 29) / 7.787037;
  }

  function dn(n) {
    return n > .008856 ? Math.pow(n, 1 / 3) : 7.787037 * n + 4 / 29;
  }

  function yn(n) {
    return Math.round(255 * (.00304 >= n ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - .055));
  }

  function mn(n, t, e) {
    return this instanceof mn ? (this.r = ~~n, this.g = ~~t, void (this.b = ~~e)) : arguments.length < 2 ? n instanceof mn ? new mn(n.r, n.g, n.b) : _n("" + n, mn, cn) : new mn(n, t, e);
  }

  function Mn(n) {
    return new mn(n >> 16, n >> 8 & 255, 255 & n);
  }

  function xn(n) {
    return Mn(n) + "";
  }

  function bn(n) {
    return 16 > n ? "0" + Math.max(0, n).toString(16) : Math.min(255, n).toString(16);
  }

  function _n(n, t, e) {
    var r,
        i,
        u,
        o = 0,
        a = 0,
        l = 0;
    if (r = /([a-z]+)\((.*)\)/.exec(n = n.toLowerCase())) switch (i = r[2].split(","), r[1]) {
      case "hsl":
        return e(parseFloat(i[0]), parseFloat(i[1]) / 100, parseFloat(i[2]) / 100);

      case "rgb":
        return t(Nn(i[0]), Nn(i[1]), Nn(i[2]));
    }
    return (u = ua.get(n)) ? t(u.r, u.g, u.b) : (null == n || "#" !== n.charAt(0) || isNaN(u = parseInt(n.slice(1), 16)) || (4 === n.length ? (o = (3840 & u) >> 4, o = o >> 4 | o, a = 240 & u, a = a >> 4 | a, l = 15 & u, l = l << 4 | l) : 7 === n.length && (o = (16711680 & u) >> 16, a = (65280 & u) >> 8, l = 255 & u)), t(o, a, l));
  }

  function wn(n, t, e) {
    var r,
        i,
        u = Math.min(n /= 255, t /= 255, e /= 255),
        o = Math.max(n, t, e),
        a = o - u,
        l = (o + u) / 2;
    return a ? (i = .5 > l ? a / (o + u) : a / (2 - o - u), r = n == o ? (t - e) / a + (e > t ? 6 : 0) : t == o ? (e - n) / a + 2 : (n - t) / a + 4, r *= 60) : (r = NaN, i = l > 0 && 1 > l ? 0 : r), new ln(r, i, l);
  }

  function Sn(n, t, e) {
    n = kn(n), t = kn(t), e = kn(e);
    var r = dn((.4124564 * n + .3575761 * t + .1804375 * e) / na),
        i = dn((.2126729 * n + .7151522 * t + .072175 * e) / ta),
        u = dn((.0193339 * n + .119192 * t + .9503041 * e) / ea);
    return hn(116 * i - 16, 500 * (r - i), 200 * (i - u));
  }

  function kn(n) {
    return (n /= 255) <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4);
  }

  function Nn(n) {
    var t = parseFloat(n);
    return "%" === n.charAt(n.length - 1) ? Math.round(2.55 * t) : t;
  }

  function En(n) {
    return "function" == typeof n ? n : function () {
      return n;
    };
  }

  function An(n) {
    return function (t, e, r) {
      return 2 === arguments.length && "function" == typeof e && (r = e, e = null), Cn(t, e, n, r);
    };
  }

  function Cn(n, t, e, r) {
    function i() {
      var n,
          t = l.status;

      if (!t && Ln(l) || t >= 200 && 300 > t || 304 === t) {
        try {
          n = e.call(u, l);
        } catch (r) {
          return void o.error.call(u, r);
        }

        o.load.call(u, n);
      } else o.error.call(u, l);
    }

    var u = {},
        o = ao.dispatch("beforesend", "progress", "load", "error"),
        a = {},
        l = new XMLHttpRequest(),
        c = null;
    return !this.XDomainRequest || "withCredentials" in l || !/^(http(s)?:)?\/\//.test(n) || (l = new XDomainRequest()), "onload" in l ? l.onload = l.onerror = i : l.onreadystatechange = function () {
      l.readyState > 3 && i();
    }, l.onprogress = function (n) {
      var t = ao.event;
      ao.event = n;

      try {
        o.progress.call(u, l);
      } finally {
        ao.event = t;
      }
    }, u.header = function (n, t) {
      return n = (n + "").toLowerCase(), arguments.length < 2 ? a[n] : (null == t ? delete a[n] : a[n] = t + "", u);
    }, u.mimeType = function (n) {
      return arguments.length ? (t = null == n ? null : n + "", u) : t;
    }, u.responseType = function (n) {
      return arguments.length ? (c = n, u) : c;
    }, u.response = function (n) {
      return e = n, u;
    }, ["get", "post"].forEach(function (n) {
      u[n] = function () {
        return u.send.apply(u, [n].concat(co(arguments)));
      };
    }), u.send = function (e, r, i) {
      if (2 === arguments.length && "function" == typeof r && (i = r, r = null), l.open(e, n, !0), null == t || "accept" in a || (a.accept = t + ",*/*"), l.setRequestHeader) for (var f in a) {
        l.setRequestHeader(f, a[f]);
      }
      return null != t && l.overrideMimeType && l.overrideMimeType(t), null != c && (l.responseType = c), null != i && u.on("error", i).on("load", function (n) {
        i(null, n);
      }), o.beforesend.call(u, l), l.send(null == r ? null : r), u;
    }, u.abort = function () {
      return l.abort(), u;
    }, ao.rebind(u, o, "on"), null == r ? u : u.get(zn(r));
  }

  function zn(n) {
    return 1 === n.length ? function (t, e) {
      n(null == t ? e : null);
    } : n;
  }

  function Ln(n) {
    var t = n.responseType;
    return t && "text" !== t ? n.response : n.responseText;
  }

  function qn(n, t, e) {
    var r = arguments.length;
    2 > r && (t = 0), 3 > r && (e = Date.now());
    var i = e + t,
        u = {
      c: n,
      t: i,
      n: null
    };
    return aa ? aa.n = u : oa = u, aa = u, la || (ca = clearTimeout(ca), la = 1, fa(Tn)), u;
  }

  function Tn() {
    var n = Rn(),
        t = Dn() - n;
    t > 24 ? (isFinite(t) && (clearTimeout(ca), ca = setTimeout(Tn, t)), la = 0) : (la = 1, fa(Tn));
  }

  function Rn() {
    for (var n = Date.now(), t = oa; t;) {
      n >= t.t && t.c(n - t.t) && (t.c = null), t = t.n;
    }

    return n;
  }

  function Dn() {
    for (var n, t = oa, e = 1 / 0; t;) {
      t.c ? (t.t < e && (e = t.t), t = (n = t).n) : t = n ? n.n = t.n : oa = t.n;
    }

    return aa = n, e;
  }

  function Pn(n, t) {
    return t - (n ? Math.ceil(Math.log(n) / Math.LN10) : 1);
  }

  function Un(n, t) {
    var e = Math.pow(10, 3 * xo(8 - t));
    return {
      scale: t > 8 ? function (n) {
        return n / e;
      } : function (n) {
        return n * e;
      },
      symbol: n
    };
  }

  function jn(n) {
    var t = n.decimal,
        e = n.thousands,
        r = n.grouping,
        i = n.currency,
        u = r && e ? function (n, t) {
      for (var i = n.length, u = [], o = 0, a = r[0], l = 0; i > 0 && a > 0 && (l + a + 1 > t && (a = Math.max(1, t - l)), u.push(n.substring(i -= a, i + a)), !((l += a + 1) > t));) {
        a = r[o = (o + 1) % r.length];
      }

      return u.reverse().join(e);
    } : m;
    return function (n) {
      var e = ha.exec(n),
          r = e[1] || " ",
          o = e[2] || ">",
          a = e[3] || "-",
          l = e[4] || "",
          c = e[5],
          f = +e[6],
          s = e[7],
          h = e[8],
          p = e[9],
          g = 1,
          v = "",
          d = "",
          y = !1,
          m = !0;

      switch (h && (h = +h.substring(1)), (c || "0" === r && "=" === o) && (c = r = "0", o = "="), p) {
        case "n":
          s = !0, p = "g";
          break;

        case "%":
          g = 100, d = "%", p = "f";
          break;

        case "p":
          g = 100, d = "%", p = "r";
          break;

        case "b":
        case "o":
        case "x":
        case "X":
          "#" === l && (v = "0" + p.toLowerCase());

        case "c":
          m = !1;

        case "d":
          y = !0, h = 0;
          break;

        case "s":
          g = -1, p = "r";
      }

      "$" === l && (v = i[0], d = i[1]), "r" != p || h || (p = "g"), null != h && ("g" == p ? h = Math.max(1, Math.min(21, h)) : "e" != p && "f" != p || (h = Math.max(0, Math.min(20, h)))), p = pa.get(p) || Fn;
      var M = c && s;
      return function (n) {
        var e = d;
        if (y && n % 1) return "";
        var i = 0 > n || 0 === n && 0 > 1 / n ? (n = -n, "-") : "-" === a ? "" : a;

        if (0 > g) {
          var l = ao.formatPrefix(n, h);
          n = l.scale(n), e = l.symbol + d;
        } else n *= g;

        n = p(n, h);

        var x,
            b,
            _ = n.lastIndexOf(".");

        if (0 > _) {
          var w = m ? n.lastIndexOf("e") : -1;
          0 > w ? (x = n, b = "") : (x = n.substring(0, w), b = n.substring(w));
        } else x = n.substring(0, _), b = t + n.substring(_ + 1);

        !c && s && (x = u(x, 1 / 0));
        var S = v.length + x.length + b.length + (M ? 0 : i.length),
            k = f > S ? new Array(S = f - S + 1).join(r) : "";
        return M && (x = u(k + x, k.length ? f - b.length : 1 / 0)), i += v, n = x + b, ("<" === o ? i + n + k : ">" === o ? k + i + n : "^" === o ? k.substring(0, S >>= 1) + i + n + k.substring(S) : i + (M ? n : k + n)) + e;
      };
    };
  }

  function Fn(n) {
    return n + "";
  }

  function Hn() {
    this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0]);
  }

  function On(n, t, e) {
    function r(t) {
      var e = n(t),
          r = u(e, 1);
      return r - t > t - e ? e : r;
    }

    function i(e) {
      return t(e = n(new va(e - 1)), 1), e;
    }

    function u(n, e) {
      return t(n = new va(+n), e), n;
    }

    function o(n, r, u) {
      var o = i(n),
          a = [];
      if (u > 1) for (; r > o;) {
        e(o) % u || a.push(new Date(+o)), t(o, 1);
      } else for (; r > o;) {
        a.push(new Date(+o)), t(o, 1);
      }
      return a;
    }

    function a(n, t, e) {
      try {
        va = Hn;
        var r = new Hn();
        return r._ = n, o(r, t, e);
      } finally {
        va = Date;
      }
    }

    n.floor = n, n.round = r, n.ceil = i, n.offset = u, n.range = o;
    var l = n.utc = In(n);
    return l.floor = l, l.round = In(r), l.ceil = In(i), l.offset = In(u), l.range = a, n;
  }

  function In(n) {
    return function (t, e) {
      try {
        va = Hn;
        var r = new Hn();
        return r._ = t, n(r, e)._;
      } finally {
        va = Date;
      }
    };
  }

  function Yn(n) {
    function t(n) {
      function t(t) {
        for (var e, i, u, o = [], a = -1, l = 0; ++a < r;) {
          37 === n.charCodeAt(a) && (o.push(n.slice(l, a)), null != (i = ya[e = n.charAt(++a)]) && (e = n.charAt(++a)), (u = A[e]) && (e = u(t, null == i ? "e" === e ? " " : "0" : i)), o.push(e), l = a + 1);
        }

        return o.push(n.slice(l, a)), o.join("");
      }

      var r = n.length;
      return t.parse = function (t) {
        var r = {
          y: 1900,
          m: 0,
          d: 1,
          H: 0,
          M: 0,
          S: 0,
          L: 0,
          Z: null
        },
            i = e(r, n, t, 0);
        if (i != t.length) return null;
        "p" in r && (r.H = r.H % 12 + 12 * r.p);
        var u = null != r.Z && va !== Hn,
            o = new (u ? Hn : va)();
        return "j" in r ? o.setFullYear(r.y, 0, r.j) : "W" in r || "U" in r ? ("w" in r || (r.w = "W" in r ? 1 : 0), o.setFullYear(r.y, 0, 1), o.setFullYear(r.y, 0, "W" in r ? (r.w + 6) % 7 + 7 * r.W - (o.getDay() + 5) % 7 : r.w + 7 * r.U - (o.getDay() + 6) % 7)) : o.setFullYear(r.y, r.m, r.d), o.setHours(r.H + (r.Z / 100 | 0), r.M + r.Z % 100, r.S, r.L), u ? o._ : o;
      }, t.toString = function () {
        return n;
      }, t;
    }

    function e(n, t, e, r) {
      for (var i, u, o, a = 0, l = t.length, c = e.length; l > a;) {
        if (r >= c) return -1;

        if (i = t.charCodeAt(a++), 37 === i) {
          if (o = t.charAt(a++), u = C[o in ya ? t.charAt(a++) : o], !u || (r = u(n, e, r)) < 0) return -1;
        } else if (i != e.charCodeAt(r++)) return -1;
      }

      return r;
    }

    function r(n, t, e) {
      _.lastIndex = 0;

      var r = _.exec(t.slice(e));

      return r ? (n.w = w.get(r[0].toLowerCase()), e + r[0].length) : -1;
    }

    function i(n, t, e) {
      x.lastIndex = 0;
      var r = x.exec(t.slice(e));
      return r ? (n.w = b.get(r[0].toLowerCase()), e + r[0].length) : -1;
    }

    function u(n, t, e) {
      N.lastIndex = 0;
      var r = N.exec(t.slice(e));
      return r ? (n.m = E.get(r[0].toLowerCase()), e + r[0].length) : -1;
    }

    function o(n, t, e) {
      S.lastIndex = 0;
      var r = S.exec(t.slice(e));
      return r ? (n.m = k.get(r[0].toLowerCase()), e + r[0].length) : -1;
    }

    function a(n, t, r) {
      return e(n, A.c.toString(), t, r);
    }

    function l(n, t, r) {
      return e(n, A.x.toString(), t, r);
    }

    function c(n, t, r) {
      return e(n, A.X.toString(), t, r);
    }

    function f(n, t, e) {
      var r = M.get(t.slice(e, e += 2).toLowerCase());
      return null == r ? -1 : (n.p = r, e);
    }

    var s = n.dateTime,
        h = n.date,
        p = n.time,
        g = n.periods,
        v = n.days,
        d = n.shortDays,
        y = n.months,
        m = n.shortMonths;
    t.utc = function (n) {
      function e(n) {
        try {
          va = Hn;
          var t = new va();
          return t._ = n, r(t);
        } finally {
          va = Date;
        }
      }

      var r = t(n);
      return e.parse = function (n) {
        try {
          va = Hn;
          var t = r.parse(n);
          return t && t._;
        } finally {
          va = Date;
        }
      }, e.toString = r.toString, e;
    }, t.multi = t.utc.multi = ct;

    var M = ao.map(),
        x = Vn(v),
        b = Xn(v),
        _ = Vn(d),
        w = Xn(d),
        S = Vn(y),
        k = Xn(y),
        N = Vn(m),
        E = Xn(m);

    g.forEach(function (n, t) {
      M.set(n.toLowerCase(), t);
    });
    var A = {
      a: function a(n) {
        return d[n.getDay()];
      },
      A: function A(n) {
        return v[n.getDay()];
      },
      b: function b(n) {
        return m[n.getMonth()];
      },
      B: function B(n) {
        return y[n.getMonth()];
      },
      c: t(s),
      d: function d(n, t) {
        return Zn(n.getDate(), t, 2);
      },
      e: function e(n, t) {
        return Zn(n.getDate(), t, 2);
      },
      H: function H(n, t) {
        return Zn(n.getHours(), t, 2);
      },
      I: function I(n, t) {
        return Zn(n.getHours() % 12 || 12, t, 2);
      },
      j: function j(n, t) {
        return Zn(1 + ga.dayOfYear(n), t, 3);
      },
      L: function L(n, t) {
        return Zn(n.getMilliseconds(), t, 3);
      },
      m: function m(n, t) {
        return Zn(n.getMonth() + 1, t, 2);
      },
      M: function M(n, t) {
        return Zn(n.getMinutes(), t, 2);
      },
      p: function p(n) {
        return g[+(n.getHours() >= 12)];
      },
      S: function S(n, t) {
        return Zn(n.getSeconds(), t, 2);
      },
      U: function U(n, t) {
        return Zn(ga.sundayOfYear(n), t, 2);
      },
      w: function w(n) {
        return n.getDay();
      },
      W: function W(n, t) {
        return Zn(ga.mondayOfYear(n), t, 2);
      },
      x: t(h),
      X: t(p),
      y: function y(n, t) {
        return Zn(n.getFullYear() % 100, t, 2);
      },
      Y: function Y(n, t) {
        return Zn(n.getFullYear() % 1e4, t, 4);
      },
      Z: at,
      "%": function _() {
        return "%";
      }
    },
        C = {
      a: r,
      A: i,
      b: u,
      B: o,
      c: a,
      d: tt,
      e: tt,
      H: rt,
      I: rt,
      j: et,
      L: ot,
      m: nt,
      M: it,
      p: f,
      S: ut,
      U: Bn,
      w: $n,
      W: Wn,
      x: l,
      X: c,
      y: Gn,
      Y: Jn,
      Z: Kn,
      "%": lt
    };
    return t;
  }

  function Zn(n, t, e) {
    var r = 0 > n ? "-" : "",
        i = (r ? -n : n) + "",
        u = i.length;
    return r + (e > u ? new Array(e - u + 1).join(t) + i : i);
  }

  function Vn(n) {
    return new RegExp("^(?:" + n.map(ao.requote).join("|") + ")", "i");
  }

  function Xn(n) {
    for (var t = new c(), e = -1, r = n.length; ++e < r;) {
      t.set(n[e].toLowerCase(), e);
    }

    return t;
  }

  function $n(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 1));
    return r ? (n.w = +r[0], e + r[0].length) : -1;
  }

  function Bn(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e));
    return r ? (n.U = +r[0], e + r[0].length) : -1;
  }

  function Wn(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e));
    return r ? (n.W = +r[0], e + r[0].length) : -1;
  }

  function Jn(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 4));
    return r ? (n.y = +r[0], e + r[0].length) : -1;
  }

  function Gn(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 2));
    return r ? (n.y = Qn(+r[0]), e + r[0].length) : -1;
  }

  function Kn(n, t, e) {
    return /^[+-]\d{4}$/.test(t = t.slice(e, e + 5)) ? (n.Z = -t, e + 5) : -1;
  }

  function Qn(n) {
    return n + (n > 68 ? 1900 : 2e3);
  }

  function nt(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 2));
    return r ? (n.m = r[0] - 1, e + r[0].length) : -1;
  }

  function tt(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 2));
    return r ? (n.d = +r[0], e + r[0].length) : -1;
  }

  function et(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 3));
    return r ? (n.j = +r[0], e + r[0].length) : -1;
  }

  function rt(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 2));
    return r ? (n.H = +r[0], e + r[0].length) : -1;
  }

  function it(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 2));
    return r ? (n.M = +r[0], e + r[0].length) : -1;
  }

  function ut(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 2));
    return r ? (n.S = +r[0], e + r[0].length) : -1;
  }

  function ot(n, t, e) {
    ma.lastIndex = 0;
    var r = ma.exec(t.slice(e, e + 3));
    return r ? (n.L = +r[0], e + r[0].length) : -1;
  }

  function at(n) {
    var t = n.getTimezoneOffset(),
        e = t > 0 ? "-" : "+",
        r = xo(t) / 60 | 0,
        i = xo(t) % 60;
    return e + Zn(r, "0", 2) + Zn(i, "0", 2);
  }

  function lt(n, t, e) {
    Ma.lastIndex = 0;
    var r = Ma.exec(t.slice(e, e + 1));
    return r ? e + r[0].length : -1;
  }

  function ct(n) {
    for (var t = n.length, e = -1; ++e < t;) {
      n[e][0] = this(n[e][0]);
    }

    return function (t) {
      for (var e = 0, r = n[e]; !r[1](t);) {
        r = n[++e];
      }

      return r[0](t);
    };
  }

  function ft() {}

  function st(n, t, e) {
    var r = e.s = n + t,
        i = r - n,
        u = r - i;
    e.t = n - u + (t - i);
  }

  function ht(n, t) {
    n && wa.hasOwnProperty(n.type) && wa[n.type](n, t);
  }

  function pt(n, t, e) {
    var r,
        i = -1,
        u = n.length - e;

    for (t.lineStart(); ++i < u;) {
      r = n[i], t.point(r[0], r[1], r[2]);
    }

    t.lineEnd();
  }

  function gt(n, t) {
    var e = -1,
        r = n.length;

    for (t.polygonStart(); ++e < r;) {
      pt(n[e], t, 1);
    }

    t.polygonEnd();
  }

  function vt() {
    function n(n, t) {
      n *= Yo, t = t * Yo / 2 + Fo / 4;
      var e = n - r,
          o = e >= 0 ? 1 : -1,
          a = o * e,
          l = Math.cos(t),
          c = Math.sin(t),
          f = u * c,
          s = i * l + f * Math.cos(a),
          h = f * o * Math.sin(a);
      ka.add(Math.atan2(h, s)), r = n, i = l, u = c;
    }

    var t, e, r, i, u;
    Na.point = function (o, a) {
      Na.point = n, r = (t = o) * Yo, i = Math.cos(a = (e = a) * Yo / 2 + Fo / 4), u = Math.sin(a);
    }, Na.lineEnd = function () {
      n(t, e);
    };
  }

  function dt(n) {
    var t = n[0],
        e = n[1],
        r = Math.cos(e);
    return [r * Math.cos(t), r * Math.sin(t), Math.sin(e)];
  }

  function yt(n, t) {
    return n[0] * t[0] + n[1] * t[1] + n[2] * t[2];
  }

  function mt(n, t) {
    return [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]];
  }

  function Mt(n, t) {
    n[0] += t[0], n[1] += t[1], n[2] += t[2];
  }

  function xt(n, t) {
    return [n[0] * t, n[1] * t, n[2] * t];
  }

  function bt(n) {
    var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
    n[0] /= t, n[1] /= t, n[2] /= t;
  }

  function _t(n) {
    return [Math.atan2(n[1], n[0]), tn(n[2])];
  }

  function wt(n, t) {
    return xo(n[0] - t[0]) < Uo && xo(n[1] - t[1]) < Uo;
  }

  function St(n, t) {
    n *= Yo;
    var e = Math.cos(t *= Yo);
    kt(e * Math.cos(n), e * Math.sin(n), Math.sin(t));
  }

  function kt(n, t, e) {
    ++Ea, Ca += (n - Ca) / Ea, za += (t - za) / Ea, La += (e - La) / Ea;
  }

  function Nt() {
    function n(n, i) {
      n *= Yo;
      var u = Math.cos(i *= Yo),
          o = u * Math.cos(n),
          a = u * Math.sin(n),
          l = Math.sin(i),
          c = Math.atan2(Math.sqrt((c = e * l - r * a) * c + (c = r * o - t * l) * c + (c = t * a - e * o) * c), t * o + e * a + r * l);
      Aa += c, qa += c * (t + (t = o)), Ta += c * (e + (e = a)), Ra += c * (r + (r = l)), kt(t, e, r);
    }

    var t, e, r;

    ja.point = function (i, u) {
      i *= Yo;
      var o = Math.cos(u *= Yo);
      t = o * Math.cos(i), e = o * Math.sin(i), r = Math.sin(u), ja.point = n, kt(t, e, r);
    };
  }

  function Et() {
    ja.point = St;
  }

  function At() {
    function n(n, t) {
      n *= Yo;
      var e = Math.cos(t *= Yo),
          o = e * Math.cos(n),
          a = e * Math.sin(n),
          l = Math.sin(t),
          c = i * l - u * a,
          f = u * o - r * l,
          s = r * a - i * o,
          h = Math.sqrt(c * c + f * f + s * s),
          p = r * o + i * a + u * l,
          g = h && -nn(p) / h,
          v = Math.atan2(h, p);
      Da += g * c, Pa += g * f, Ua += g * s, Aa += v, qa += v * (r + (r = o)), Ta += v * (i + (i = a)), Ra += v * (u + (u = l)), kt(r, i, u);
    }

    var t, e, r, i, u;
    ja.point = function (o, a) {
      t = o, e = a, ja.point = n, o *= Yo;
      var l = Math.cos(a *= Yo);
      r = l * Math.cos(o), i = l * Math.sin(o), u = Math.sin(a), kt(r, i, u);
    }, ja.lineEnd = function () {
      n(t, e), ja.lineEnd = Et, ja.point = St;
    };
  }

  function Ct(n, t) {
    function e(e, r) {
      return e = n(e, r), t(e[0], e[1]);
    }

    return n.invert && t.invert && (e.invert = function (e, r) {
      return e = t.invert(e, r), e && n.invert(e[0], e[1]);
    }), e;
  }

  function zt() {
    return !0;
  }

  function Lt(n, t, e, r, i) {
    var u = [],
        o = [];

    if (n.forEach(function (n) {
      if (!((t = n.length - 1) <= 0)) {
        var t,
            e = n[0],
            r = n[t];

        if (wt(e, r)) {
          i.lineStart();

          for (var a = 0; t > a; ++a) {
            i.point((e = n[a])[0], e[1]);
          }

          return void i.lineEnd();
        }

        var l = new Tt(e, n, null, !0),
            c = new Tt(e, null, l, !1);
        l.o = c, u.push(l), o.push(c), l = new Tt(r, n, null, !1), c = new Tt(r, null, l, !0), l.o = c, u.push(l), o.push(c);
      }
    }), o.sort(t), qt(u), qt(o), u.length) {
      for (var a = 0, l = e, c = o.length; c > a; ++a) {
        o[a].e = l = !l;
      }

      for (var f, s, h = u[0];;) {
        for (var p = h, g = !0; p.v;) {
          if ((p = p.n) === h) return;
        }

        f = p.z, i.lineStart();

        do {
          if (p.v = p.o.v = !0, p.e) {
            if (g) for (var a = 0, c = f.length; c > a; ++a) {
              i.point((s = f[a])[0], s[1]);
            } else r(p.x, p.n.x, 1, i);
            p = p.n;
          } else {
            if (g) {
              f = p.p.z;

              for (var a = f.length - 1; a >= 0; --a) {
                i.point((s = f[a])[0], s[1]);
              }
            } else r(p.x, p.p.x, -1, i);

            p = p.p;
          }

          p = p.o, f = p.z, g = !g;
        } while (!p.v);

        i.lineEnd();
      }
    }
  }

  function qt(n) {
    if (t = n.length) {
      for (var t, e, r = 0, i = n[0]; ++r < t;) {
        i.n = e = n[r], e.p = i, i = e;
      }

      i.n = e = n[0], e.p = i;
    }
  }

  function Tt(n, t, e, r) {
    this.x = n, this.z = t, this.o = e, this.e = r, this.v = !1, this.n = this.p = null;
  }

  function Rt(n, t, e, r) {
    return function (i, u) {
      function o(t, e) {
        var r = i(t, e);
        n(t = r[0], e = r[1]) && u.point(t, e);
      }

      function a(n, t) {
        var e = i(n, t);
        d.point(e[0], e[1]);
      }

      function l() {
        m.point = a, d.lineStart();
      }

      function c() {
        m.point = o, d.lineEnd();
      }

      function f(n, t) {
        v.push([n, t]);
        var e = i(n, t);
        x.point(e[0], e[1]);
      }

      function s() {
        x.lineStart(), v = [];
      }

      function h() {
        f(v[0][0], v[0][1]), x.lineEnd();
        var n,
            t = x.clean(),
            e = M.buffer(),
            r = e.length;
        if (v.pop(), g.push(v), v = null, r) if (1 & t) {
          n = e[0];
          var i,
              r = n.length - 1,
              o = -1;

          if (r > 0) {
            for (b || (u.polygonStart(), b = !0), u.lineStart(); ++o < r;) {
              u.point((i = n[o])[0], i[1]);
            }

            u.lineEnd();
          }
        } else r > 1 && 2 & t && e.push(e.pop().concat(e.shift())), p.push(e.filter(Dt));
      }

      var p,
          g,
          v,
          d = t(u),
          y = i.invert(r[0], r[1]),
          m = {
        point: o,
        lineStart: l,
        lineEnd: c,
        polygonStart: function polygonStart() {
          m.point = f, m.lineStart = s, m.lineEnd = h, p = [], g = [];
        },
        polygonEnd: function polygonEnd() {
          m.point = o, m.lineStart = l, m.lineEnd = c, p = ao.merge(p);
          var n = Ot(y, g);
          p.length ? (b || (u.polygonStart(), b = !0), Lt(p, Ut, n, e, u)) : n && (b || (u.polygonStart(), b = !0), u.lineStart(), e(null, null, 1, u), u.lineEnd()), b && (u.polygonEnd(), b = !1), p = g = null;
        },
        sphere: function sphere() {
          u.polygonStart(), u.lineStart(), e(null, null, 1, u), u.lineEnd(), u.polygonEnd();
        }
      },
          M = Pt(),
          x = t(M),
          b = !1;
      return m;
    };
  }

  function Dt(n) {
    return n.length > 1;
  }

  function Pt() {
    var n,
        t = [];
    return {
      lineStart: function lineStart() {
        t.push(n = []);
      },
      point: function point(t, e) {
        n.push([t, e]);
      },
      lineEnd: b,
      buffer: function buffer() {
        var e = t;
        return t = [], n = null, e;
      },
      rejoin: function rejoin() {
        t.length > 1 && t.push(t.pop().concat(t.shift()));
      }
    };
  }

  function Ut(n, t) {
    return ((n = n.x)[0] < 0 ? n[1] - Io - Uo : Io - n[1]) - ((t = t.x)[0] < 0 ? t[1] - Io - Uo : Io - t[1]);
  }

  function jt(n) {
    var t,
        e = NaN,
        r = NaN,
        i = NaN;
    return {
      lineStart: function lineStart() {
        n.lineStart(), t = 1;
      },
      point: function point(u, o) {
        var a = u > 0 ? Fo : -Fo,
            l = xo(u - e);
        xo(l - Fo) < Uo ? (n.point(e, r = (r + o) / 2 > 0 ? Io : -Io), n.point(i, r), n.lineEnd(), n.lineStart(), n.point(a, r), n.point(u, r), t = 0) : i !== a && l >= Fo && (xo(e - i) < Uo && (e -= i * Uo), xo(u - a) < Uo && (u -= a * Uo), r = Ft(e, r, u, o), n.point(i, r), n.lineEnd(), n.lineStart(), n.point(a, r), t = 0), n.point(e = u, r = o), i = a;
      },
      lineEnd: function lineEnd() {
        n.lineEnd(), e = r = NaN;
      },
      clean: function clean() {
        return 2 - t;
      }
    };
  }

  function Ft(n, t, e, r) {
    var i,
        u,
        o = Math.sin(n - e);
    return xo(o) > Uo ? Math.atan((Math.sin(t) * (u = Math.cos(r)) * Math.sin(e) - Math.sin(r) * (i = Math.cos(t)) * Math.sin(n)) / (i * u * o)) : (t + r) / 2;
  }

  function Ht(n, t, e, r) {
    var i;
    if (null == n) i = e * Io, r.point(-Fo, i), r.point(0, i), r.point(Fo, i), r.point(Fo, 0), r.point(Fo, -i), r.point(0, -i), r.point(-Fo, -i), r.point(-Fo, 0), r.point(-Fo, i);else if (xo(n[0] - t[0]) > Uo) {
      var u = n[0] < t[0] ? Fo : -Fo;
      i = e * u / 2, r.point(-u, i), r.point(0, i), r.point(u, i);
    } else r.point(t[0], t[1]);
  }

  function Ot(n, t) {
    var e = n[0],
        r = n[1],
        i = [Math.sin(e), -Math.cos(e), 0],
        u = 0,
        o = 0;
    ka.reset();

    for (var a = 0, l = t.length; l > a; ++a) {
      var c = t[a],
          f = c.length;
      if (f) for (var s = c[0], h = s[0], p = s[1] / 2 + Fo / 4, g = Math.sin(p), v = Math.cos(p), d = 1;;) {
        d === f && (d = 0), n = c[d];

        var y = n[0],
            m = n[1] / 2 + Fo / 4,
            M = Math.sin(m),
            x = Math.cos(m),
            b = y - h,
            _ = b >= 0 ? 1 : -1,
            w = _ * b,
            S = w > Fo,
            k = g * M;

        if (ka.add(Math.atan2(k * _ * Math.sin(w), v * x + k * Math.cos(w))), u += S ? b + _ * Ho : b, S ^ h >= e ^ y >= e) {
          var N = mt(dt(s), dt(n));
          bt(N);
          var E = mt(i, N);
          bt(E);
          var A = (S ^ b >= 0 ? -1 : 1) * tn(E[2]);
          (r > A || r === A && (N[0] || N[1])) && (o += S ^ b >= 0 ? 1 : -1);
        }

        if (!d++) break;
        h = y, g = M, v = x, s = n;
      }
    }

    return (-Uo > u || Uo > u && -Uo > ka) ^ 1 & o;
  }

  function It(n) {
    function t(n, t) {
      return Math.cos(n) * Math.cos(t) > u;
    }

    function e(n) {
      var e, u, l, c, f;
      return {
        lineStart: function lineStart() {
          c = l = !1, f = 1;
        },
        point: function point(s, h) {
          var p,
              g = [s, h],
              v = t(s, h),
              d = o ? v ? 0 : i(s, h) : v ? i(s + (0 > s ? Fo : -Fo), h) : 0;
          if (!e && (c = l = v) && n.lineStart(), v !== l && (p = r(e, g), (wt(e, p) || wt(g, p)) && (g[0] += Uo, g[1] += Uo, v = t(g[0], g[1]))), v !== l) f = 0, v ? (n.lineStart(), p = r(g, e), n.point(p[0], p[1])) : (p = r(e, g), n.point(p[0], p[1]), n.lineEnd()), e = p;else if (a && e && o ^ v) {
            var y;
            d & u || !(y = r(g, e, !0)) || (f = 0, o ? (n.lineStart(), n.point(y[0][0], y[0][1]), n.point(y[1][0], y[1][1]), n.lineEnd()) : (n.point(y[1][0], y[1][1]), n.lineEnd(), n.lineStart(), n.point(y[0][0], y[0][1])));
          }
          !v || e && wt(e, g) || n.point(g[0], g[1]), e = g, l = v, u = d;
        },
        lineEnd: function lineEnd() {
          l && n.lineEnd(), e = null;
        },
        clean: function clean() {
          return f | (c && l) << 1;
        }
      };
    }

    function r(n, t, e) {
      var r = dt(n),
          i = dt(t),
          o = [1, 0, 0],
          a = mt(r, i),
          l = yt(a, a),
          c = a[0],
          f = l - c * c;
      if (!f) return !e && n;
      var s = u * l / f,
          h = -u * c / f,
          p = mt(o, a),
          g = xt(o, s),
          v = xt(a, h);
      Mt(g, v);
      var d = p,
          y = yt(g, d),
          m = yt(d, d),
          M = y * y - m * (yt(g, g) - 1);

      if (!(0 > M)) {
        var x = Math.sqrt(M),
            b = xt(d, (-y - x) / m);
        if (Mt(b, g), b = _t(b), !e) return b;

        var _,
            w = n[0],
            S = t[0],
            k = n[1],
            N = t[1];

        w > S && (_ = w, w = S, S = _);
        var E = S - w,
            A = xo(E - Fo) < Uo,
            C = A || Uo > E;

        if (!A && k > N && (_ = k, k = N, N = _), C ? A ? k + N > 0 ^ b[1] < (xo(b[0] - w) < Uo ? k : N) : k <= b[1] && b[1] <= N : E > Fo ^ (w <= b[0] && b[0] <= S)) {
          var z = xt(d, (-y + x) / m);
          return Mt(z, g), [b, _t(z)];
        }
      }
    }

    function i(t, e) {
      var r = o ? n : Fo - n,
          i = 0;
      return -r > t ? i |= 1 : t > r && (i |= 2), -r > e ? i |= 4 : e > r && (i |= 8), i;
    }

    var u = Math.cos(n),
        o = u > 0,
        a = xo(u) > Uo,
        l = ve(n, 6 * Yo);
    return Rt(t, e, l, o ? [0, -n] : [-Fo, n - Fo]);
  }

  function Yt(n, t, e, r) {
    return function (i) {
      var u,
          o = i.a,
          a = i.b,
          l = o.x,
          c = o.y,
          f = a.x,
          s = a.y,
          h = 0,
          p = 1,
          g = f - l,
          v = s - c;

      if (u = n - l, g || !(u > 0)) {
        if (u /= g, 0 > g) {
          if (h > u) return;
          p > u && (p = u);
        } else if (g > 0) {
          if (u > p) return;
          u > h && (h = u);
        }

        if (u = e - l, g || !(0 > u)) {
          if (u /= g, 0 > g) {
            if (u > p) return;
            u > h && (h = u);
          } else if (g > 0) {
            if (h > u) return;
            p > u && (p = u);
          }

          if (u = t - c, v || !(u > 0)) {
            if (u /= v, 0 > v) {
              if (h > u) return;
              p > u && (p = u);
            } else if (v > 0) {
              if (u > p) return;
              u > h && (h = u);
            }

            if (u = r - c, v || !(0 > u)) {
              if (u /= v, 0 > v) {
                if (u > p) return;
                u > h && (h = u);
              } else if (v > 0) {
                if (h > u) return;
                p > u && (p = u);
              }

              return h > 0 && (i.a = {
                x: l + h * g,
                y: c + h * v
              }), 1 > p && (i.b = {
                x: l + p * g,
                y: c + p * v
              }), i;
            }
          }
        }
      }
    };
  }

  function Zt(n, t, e, r) {
    function i(r, i) {
      return xo(r[0] - n) < Uo ? i > 0 ? 0 : 3 : xo(r[0] - e) < Uo ? i > 0 ? 2 : 1 : xo(r[1] - t) < Uo ? i > 0 ? 1 : 0 : i > 0 ? 3 : 2;
    }

    function u(n, t) {
      return o(n.x, t.x);
    }

    function o(n, t) {
      var e = i(n, 1),
          r = i(t, 1);
      return e !== r ? e - r : 0 === e ? t[1] - n[1] : 1 === e ? n[0] - t[0] : 2 === e ? n[1] - t[1] : t[0] - n[0];
    }

    return function (a) {
      function l(n) {
        for (var t = 0, e = d.length, r = n[1], i = 0; e > i; ++i) {
          for (var u, o = 1, a = d[i], l = a.length, c = a[0]; l > o; ++o) {
            u = a[o], c[1] <= r ? u[1] > r && Q(c, u, n) > 0 && ++t : u[1] <= r && Q(c, u, n) < 0 && --t, c = u;
          }
        }

        return 0 !== t;
      }

      function c(u, a, l, c) {
        var f = 0,
            s = 0;

        if (null == u || (f = i(u, l)) !== (s = i(a, l)) || o(u, a) < 0 ^ l > 0) {
          do {
            c.point(0 === f || 3 === f ? n : e, f > 1 ? r : t);
          } while ((f = (f + l + 4) % 4) !== s);
        } else c.point(a[0], a[1]);
      }

      function f(i, u) {
        return i >= n && e >= i && u >= t && r >= u;
      }

      function s(n, t) {
        f(n, t) && a.point(n, t);
      }

      function h() {
        C.point = g, d && d.push(y = []), S = !0, w = !1, b = _ = NaN;
      }

      function p() {
        v && (g(m, M), x && w && E.rejoin(), v.push(E.buffer())), C.point = s, w && a.lineEnd();
      }

      function g(n, t) {
        n = Math.max(-Ha, Math.min(Ha, n)), t = Math.max(-Ha, Math.min(Ha, t));
        var e = f(n, t);
        if (d && y.push([n, t]), S) m = n, M = t, x = e, S = !1, e && (a.lineStart(), a.point(n, t));else if (e && w) a.point(n, t);else {
          var r = {
            a: {
              x: b,
              y: _
            },
            b: {
              x: n,
              y: t
            }
          };
          A(r) ? (w || (a.lineStart(), a.point(r.a.x, r.a.y)), a.point(r.b.x, r.b.y), e || a.lineEnd(), k = !1) : e && (a.lineStart(), a.point(n, t), k = !1);
        }
        b = n, _ = t, w = e;
      }

      var v,
          d,
          y,
          m,
          M,
          x,
          b,
          _,
          w,
          S,
          k,
          N = a,
          E = Pt(),
          A = Yt(n, t, e, r),
          C = {
        point: s,
        lineStart: h,
        lineEnd: p,
        polygonStart: function polygonStart() {
          a = E, v = [], d = [], k = !0;
        },
        polygonEnd: function polygonEnd() {
          a = N, v = ao.merge(v);
          var t = l([n, r]),
              e = k && t,
              i = v.length;
          (e || i) && (a.polygonStart(), e && (a.lineStart(), c(null, null, 1, a), a.lineEnd()), i && Lt(v, u, t, c, a), a.polygonEnd()), v = d = y = null;
        }
      };

      return C;
    };
  }

  function Vt(n) {
    var t = 0,
        e = Fo / 3,
        r = ae(n),
        i = r(t, e);
    return i.parallels = function (n) {
      return arguments.length ? r(t = n[0] * Fo / 180, e = n[1] * Fo / 180) : [t / Fo * 180, e / Fo * 180];
    }, i;
  }

  function Xt(n, t) {
    function e(n, t) {
      var e = Math.sqrt(u - 2 * i * Math.sin(t)) / i;
      return [e * Math.sin(n *= i), o - e * Math.cos(n)];
    }

    var r = Math.sin(n),
        i = (r + Math.sin(t)) / 2,
        u = 1 + r * (2 * i - r),
        o = Math.sqrt(u) / i;
    return e.invert = function (n, t) {
      var e = o - t;
      return [Math.atan2(n, e) / i, tn((u - (n * n + e * e) * i * i) / (2 * i))];
    }, e;
  }

  function $t() {
    function n(n, t) {
      Ia += i * n - r * t, r = n, i = t;
    }

    var t, e, r, i;
    $a.point = function (u, o) {
      $a.point = n, t = r = u, e = i = o;
    }, $a.lineEnd = function () {
      n(t, e);
    };
  }

  function Bt(n, t) {
    Ya > n && (Ya = n), n > Va && (Va = n), Za > t && (Za = t), t > Xa && (Xa = t);
  }

  function Wt() {
    function n(n, t) {
      o.push("M", n, ",", t, u);
    }

    function t(n, t) {
      o.push("M", n, ",", t), a.point = e;
    }

    function e(n, t) {
      o.push("L", n, ",", t);
    }

    function r() {
      a.point = n;
    }

    function i() {
      o.push("Z");
    }

    var u = Jt(4.5),
        o = [],
        a = {
      point: n,
      lineStart: function lineStart() {
        a.point = t;
      },
      lineEnd: r,
      polygonStart: function polygonStart() {
        a.lineEnd = i;
      },
      polygonEnd: function polygonEnd() {
        a.lineEnd = r, a.point = n;
      },
      pointRadius: function pointRadius(n) {
        return u = Jt(n), a;
      },
      result: function result() {
        if (o.length) {
          var n = o.join("");
          return o = [], n;
        }
      }
    };
    return a;
  }

  function Jt(n) {
    return "m0," + n + "a" + n + "," + n + " 0 1,1 0," + -2 * n + "a" + n + "," + n + " 0 1,1 0," + 2 * n + "z";
  }

  function Gt(n, t) {
    Ca += n, za += t, ++La;
  }

  function Kt() {
    function n(n, r) {
      var i = n - t,
          u = r - e,
          o = Math.sqrt(i * i + u * u);
      qa += o * (t + n) / 2, Ta += o * (e + r) / 2, Ra += o, Gt(t = n, e = r);
    }

    var t, e;

    Wa.point = function (r, i) {
      Wa.point = n, Gt(t = r, e = i);
    };
  }

  function Qt() {
    Wa.point = Gt;
  }

  function ne() {
    function n(n, t) {
      var e = n - r,
          u = t - i,
          o = Math.sqrt(e * e + u * u);
      qa += o * (r + n) / 2, Ta += o * (i + t) / 2, Ra += o, o = i * n - r * t, Da += o * (r + n), Pa += o * (i + t), Ua += 3 * o, Gt(r = n, i = t);
    }

    var t, e, r, i;
    Wa.point = function (u, o) {
      Wa.point = n, Gt(t = r = u, e = i = o);
    }, Wa.lineEnd = function () {
      n(t, e);
    };
  }

  function te(n) {
    function t(t, e) {
      n.moveTo(t + o, e), n.arc(t, e, o, 0, Ho);
    }

    function e(t, e) {
      n.moveTo(t, e), a.point = r;
    }

    function r(t, e) {
      n.lineTo(t, e);
    }

    function i() {
      a.point = t;
    }

    function u() {
      n.closePath();
    }

    var o = 4.5,
        a = {
      point: t,
      lineStart: function lineStart() {
        a.point = e;
      },
      lineEnd: i,
      polygonStart: function polygonStart() {
        a.lineEnd = u;
      },
      polygonEnd: function polygonEnd() {
        a.lineEnd = i, a.point = t;
      },
      pointRadius: function pointRadius(n) {
        return o = n, a;
      },
      result: b
    };
    return a;
  }

  function ee(n) {
    function t(n) {
      return (a ? r : e)(n);
    }

    function e(t) {
      return ue(t, function (e, r) {
        e = n(e, r), t.point(e[0], e[1]);
      });
    }

    function r(t) {
      function e(e, r) {
        e = n(e, r), t.point(e[0], e[1]);
      }

      function r() {
        M = NaN, S.point = u, t.lineStart();
      }

      function u(e, r) {
        var u = dt([e, r]),
            o = n(e, r);
        i(M, x, m, b, _, w, M = o[0], x = o[1], m = e, b = u[0], _ = u[1], w = u[2], a, t), t.point(M, x);
      }

      function o() {
        S.point = e, t.lineEnd();
      }

      function l() {
        r(), S.point = c, S.lineEnd = f;
      }

      function c(n, t) {
        u(s = n, h = t), p = M, g = x, v = b, d = _, y = w, S.point = u;
      }

      function f() {
        i(M, x, m, b, _, w, p, g, s, v, d, y, a, t), S.lineEnd = o, o();
      }

      var s,
          h,
          p,
          g,
          v,
          d,
          y,
          m,
          M,
          x,
          b,
          _,
          w,
          S = {
        point: e,
        lineStart: r,
        lineEnd: o,
        polygonStart: function polygonStart() {
          t.polygonStart(), S.lineStart = l;
        },
        polygonEnd: function polygonEnd() {
          t.polygonEnd(), S.lineStart = r;
        }
      };

      return S;
    }

    function i(t, e, r, a, l, c, f, s, h, p, g, v, d, y) {
      var m = f - t,
          M = s - e,
          x = m * m + M * M;

      if (x > 4 * u && d--) {
        var b = a + p,
            _ = l + g,
            w = c + v,
            S = Math.sqrt(b * b + _ * _ + w * w),
            k = Math.asin(w /= S),
            N = xo(xo(w) - 1) < Uo || xo(r - h) < Uo ? (r + h) / 2 : Math.atan2(_, b),
            E = n(N, k),
            A = E[0],
            C = E[1],
            z = A - t,
            L = C - e,
            q = M * z - m * L;

        (q * q / x > u || xo((m * z + M * L) / x - .5) > .3 || o > a * p + l * g + c * v) && (i(t, e, r, a, l, c, A, C, N, b /= S, _ /= S, w, d, y), y.point(A, C), i(A, C, N, b, _, w, f, s, h, p, g, v, d, y));
      }
    }

    var u = .5,
        o = Math.cos(30 * Yo),
        a = 16;
    return t.precision = function (n) {
      return arguments.length ? (a = (u = n * n) > 0 && 16, t) : Math.sqrt(u);
    }, t;
  }

  function re(n) {
    var t = ee(function (t, e) {
      return n([t * Zo, e * Zo]);
    });
    return function (n) {
      return le(t(n));
    };
  }

  function ie(n) {
    this.stream = n;
  }

  function ue(n, t) {
    return {
      point: t,
      sphere: function sphere() {
        n.sphere();
      },
      lineStart: function lineStart() {
        n.lineStart();
      },
      lineEnd: function lineEnd() {
        n.lineEnd();
      },
      polygonStart: function polygonStart() {
        n.polygonStart();
      },
      polygonEnd: function polygonEnd() {
        n.polygonEnd();
      }
    };
  }

  function oe(n) {
    return ae(function () {
      return n;
    })();
  }

  function ae(n) {
    function t(n) {
      return n = a(n[0] * Yo, n[1] * Yo), [n[0] * h + l, c - n[1] * h];
    }

    function e(n) {
      return n = a.invert((n[0] - l) / h, (c - n[1]) / h), n && [n[0] * Zo, n[1] * Zo];
    }

    function r() {
      a = Ct(o = se(y, M, x), u);
      var n = u(v, d);
      return l = p - n[0] * h, c = g + n[1] * h, i();
    }

    function i() {
      return f && (f.valid = !1, f = null), t;
    }

    var u,
        o,
        a,
        l,
        c,
        f,
        s = ee(function (n, t) {
      return n = u(n, t), [n[0] * h + l, c - n[1] * h];
    }),
        h = 150,
        p = 480,
        g = 250,
        v = 0,
        d = 0,
        y = 0,
        M = 0,
        x = 0,
        b = Fa,
        _ = m,
        w = null,
        S = null;
    return t.stream = function (n) {
      return f && (f.valid = !1), f = le(b(o, s(_(n)))), f.valid = !0, f;
    }, t.clipAngle = function (n) {
      return arguments.length ? (b = null == n ? (w = n, Fa) : It((w = +n) * Yo), i()) : w;
    }, t.clipExtent = function (n) {
      return arguments.length ? (S = n, _ = n ? Zt(n[0][0], n[0][1], n[1][0], n[1][1]) : m, i()) : S;
    }, t.scale = function (n) {
      return arguments.length ? (h = +n, r()) : h;
    }, t.translate = function (n) {
      return arguments.length ? (p = +n[0], g = +n[1], r()) : [p, g];
    }, t.center = function (n) {
      return arguments.length ? (v = n[0] % 360 * Yo, d = n[1] % 360 * Yo, r()) : [v * Zo, d * Zo];
    }, t.rotate = function (n) {
      return arguments.length ? (y = n[0] % 360 * Yo, M = n[1] % 360 * Yo, x = n.length > 2 ? n[2] % 360 * Yo : 0, r()) : [y * Zo, M * Zo, x * Zo];
    }, ao.rebind(t, s, "precision"), function () {
      return u = n.apply(this, arguments), t.invert = u.invert && e, r();
    };
  }

  function le(n) {
    return ue(n, function (t, e) {
      n.point(t * Yo, e * Yo);
    });
  }

  function ce(n, t) {
    return [n, t];
  }

  function fe(n, t) {
    return [n > Fo ? n - Ho : -Fo > n ? n + Ho : n, t];
  }

  function se(n, t, e) {
    return n ? t || e ? Ct(pe(n), ge(t, e)) : pe(n) : t || e ? ge(t, e) : fe;
  }

  function he(n) {
    return function (t, e) {
      return t += n, [t > Fo ? t - Ho : -Fo > t ? t + Ho : t, e];
    };
  }

  function pe(n) {
    var t = he(n);
    return t.invert = he(-n), t;
  }

  function ge(n, t) {
    function e(n, t) {
      var e = Math.cos(t),
          a = Math.cos(n) * e,
          l = Math.sin(n) * e,
          c = Math.sin(t),
          f = c * r + a * i;
      return [Math.atan2(l * u - f * o, a * r - c * i), tn(f * u + l * o)];
    }

    var r = Math.cos(n),
        i = Math.sin(n),
        u = Math.cos(t),
        o = Math.sin(t);
    return e.invert = function (n, t) {
      var e = Math.cos(t),
          a = Math.cos(n) * e,
          l = Math.sin(n) * e,
          c = Math.sin(t),
          f = c * u - l * o;
      return [Math.atan2(l * u + c * o, a * r + f * i), tn(f * r - a * i)];
    }, e;
  }

  function ve(n, t) {
    var e = Math.cos(n),
        r = Math.sin(n);
    return function (i, u, o, a) {
      var l = o * t;
      null != i ? (i = de(e, i), u = de(e, u), (o > 0 ? u > i : i > u) && (i += o * Ho)) : (i = n + o * Ho, u = n - .5 * l);

      for (var c, f = i; o > 0 ? f > u : u > f; f -= l) {
        a.point((c = _t([e, -r * Math.cos(f), -r * Math.sin(f)]))[0], c[1]);
      }
    };
  }

  function de(n, t) {
    var e = dt(t);
    e[0] -= n, bt(e);
    var r = nn(-e[1]);
    return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - Uo) % (2 * Math.PI);
  }

  function ye(n, t, e) {
    var r = ao.range(n, t - Uo, e).concat(t);
    return function (n) {
      return r.map(function (t) {
        return [n, t];
      });
    };
  }

  function me(n, t, e) {
    var r = ao.range(n, t - Uo, e).concat(t);
    return function (n) {
      return r.map(function (t) {
        return [t, n];
      });
    };
  }

  function Me(n) {
    return n.source;
  }

  function xe(n) {
    return n.target;
  }

  function be(n, t, e, r) {
    var i = Math.cos(t),
        u = Math.sin(t),
        o = Math.cos(r),
        a = Math.sin(r),
        l = i * Math.cos(n),
        c = i * Math.sin(n),
        f = o * Math.cos(e),
        s = o * Math.sin(e),
        h = 2 * Math.asin(Math.sqrt(on(r - t) + i * o * on(e - n))),
        p = 1 / Math.sin(h),
        g = h ? function (n) {
      var t = Math.sin(n *= h) * p,
          e = Math.sin(h - n) * p,
          r = e * l + t * f,
          i = e * c + t * s,
          o = e * u + t * a;
      return [Math.atan2(i, r) * Zo, Math.atan2(o, Math.sqrt(r * r + i * i)) * Zo];
    } : function () {
      return [n * Zo, t * Zo];
    };
    return g.distance = h, g;
  }

  function _e() {
    function n(n, i) {
      var u = Math.sin(i *= Yo),
          o = Math.cos(i),
          a = xo((n *= Yo) - t),
          l = Math.cos(a);
      Ja += Math.atan2(Math.sqrt((a = o * Math.sin(a)) * a + (a = r * u - e * o * l) * a), e * u + r * o * l), t = n, e = u, r = o;
    }

    var t, e, r;
    Ga.point = function (i, u) {
      t = i * Yo, e = Math.sin(u *= Yo), r = Math.cos(u), Ga.point = n;
    }, Ga.lineEnd = function () {
      Ga.point = Ga.lineEnd = b;
    };
  }

  function we(n, t) {
    function e(t, e) {
      var r = Math.cos(t),
          i = Math.cos(e),
          u = n(r * i);
      return [u * i * Math.sin(t), u * Math.sin(e)];
    }

    return e.invert = function (n, e) {
      var r = Math.sqrt(n * n + e * e),
          i = t(r),
          u = Math.sin(i),
          o = Math.cos(i);
      return [Math.atan2(n * u, r * o), Math.asin(r && e * u / r)];
    }, e;
  }

  function Se(n, t) {
    function e(n, t) {
      o > 0 ? -Io + Uo > t && (t = -Io + Uo) : t > Io - Uo && (t = Io - Uo);
      var e = o / Math.pow(i(t), u);
      return [e * Math.sin(u * n), o - e * Math.cos(u * n)];
    }

    var r = Math.cos(n),
        i = function i(n) {
      return Math.tan(Fo / 4 + n / 2);
    },
        u = n === t ? Math.sin(n) : Math.log(r / Math.cos(t)) / Math.log(i(t) / i(n)),
        o = r * Math.pow(i(n), u) / u;

    return u ? (e.invert = function (n, t) {
      var e = o - t,
          r = K(u) * Math.sqrt(n * n + e * e);
      return [Math.atan2(n, e) / u, 2 * Math.atan(Math.pow(o / r, 1 / u)) - Io];
    }, e) : Ne;
  }

  function ke(n, t) {
    function e(n, t) {
      var e = u - t;
      return [e * Math.sin(i * n), u - e * Math.cos(i * n)];
    }

    var r = Math.cos(n),
        i = n === t ? Math.sin(n) : (r - Math.cos(t)) / (t - n),
        u = r / i + n;
    return xo(i) < Uo ? ce : (e.invert = function (n, t) {
      var e = u - t;
      return [Math.atan2(n, e) / i, u - K(i) * Math.sqrt(n * n + e * e)];
    }, e);
  }

  function Ne(n, t) {
    return [n, Math.log(Math.tan(Fo / 4 + t / 2))];
  }

  function Ee(n) {
    var t,
        e = oe(n),
        r = e.scale,
        i = e.translate,
        u = e.clipExtent;
    return e.scale = function () {
      var n = r.apply(e, arguments);
      return n === e ? t ? e.clipExtent(null) : e : n;
    }, e.translate = function () {
      var n = i.apply(e, arguments);
      return n === e ? t ? e.clipExtent(null) : e : n;
    }, e.clipExtent = function (n) {
      var o = u.apply(e, arguments);

      if (o === e) {
        if (t = null == n) {
          var a = Fo * r(),
              l = i();
          u([[l[0] - a, l[1] - a], [l[0] + a, l[1] + a]]);
        }
      } else t && (o = null);

      return o;
    }, e.clipExtent(null);
  }

  function Ae(n, t) {
    return [Math.log(Math.tan(Fo / 4 + t / 2)), -n];
  }

  function Ce(n) {
    return n[0];
  }

  function ze(n) {
    return n[1];
  }

  function Le(n) {
    for (var t = n.length, e = [0, 1], r = 2, i = 2; t > i; i++) {
      for (; r > 1 && Q(n[e[r - 2]], n[e[r - 1]], n[i]) <= 0;) {
        --r;
      }

      e[r++] = i;
    }

    return e.slice(0, r);
  }

  function qe(n, t) {
    return n[0] - t[0] || n[1] - t[1];
  }

  function Te(n, t, e) {
    return (e[0] - t[0]) * (n[1] - t[1]) < (e[1] - t[1]) * (n[0] - t[0]);
  }

  function Re(n, t, e, r) {
    var i = n[0],
        u = e[0],
        o = t[0] - i,
        a = r[0] - u,
        l = n[1],
        c = e[1],
        f = t[1] - l,
        s = r[1] - c,
        h = (a * (l - c) - s * (i - u)) / (s * o - a * f);
    return [i + h * o, l + h * f];
  }

  function De(n) {
    var t = n[0],
        e = n[n.length - 1];
    return !(t[0] - e[0] || t[1] - e[1]);
  }

  function Pe() {
    rr(this), this.edge = this.site = this.circle = null;
  }

  function Ue(n) {
    var t = cl.pop() || new Pe();
    return t.site = n, t;
  }

  function je(n) {
    Be(n), ol.remove(n), cl.push(n), rr(n);
  }

  function Fe(n) {
    var t = n.circle,
        e = t.x,
        r = t.cy,
        i = {
      x: e,
      y: r
    },
        u = n.P,
        o = n.N,
        a = [n];
    je(n);

    for (var l = u; l.circle && xo(e - l.circle.x) < Uo && xo(r - l.circle.cy) < Uo;) {
      u = l.P, a.unshift(l), je(l), l = u;
    }

    a.unshift(l), Be(l);

    for (var c = o; c.circle && xo(e - c.circle.x) < Uo && xo(r - c.circle.cy) < Uo;) {
      o = c.N, a.push(c), je(c), c = o;
    }

    a.push(c), Be(c);
    var f,
        s = a.length;

    for (f = 1; s > f; ++f) {
      c = a[f], l = a[f - 1], nr(c.edge, l.site, c.site, i);
    }

    l = a[0], c = a[s - 1], c.edge = Ke(l.site, c.site, null, i), $e(l), $e(c);
  }

  function He(n) {
    for (var t, e, r, i, u = n.x, o = n.y, a = ol._; a;) {
      if (r = Oe(a, o) - u, r > Uo) a = a.L;else {
        if (i = u - Ie(a, o), !(i > Uo)) {
          r > -Uo ? (t = a.P, e = a) : i > -Uo ? (t = a, e = a.N) : t = e = a;
          break;
        }

        if (!a.R) {
          t = a;
          break;
        }

        a = a.R;
      }
    }

    var l = Ue(n);

    if (ol.insert(t, l), t || e) {
      if (t === e) return Be(t), e = Ue(t.site), ol.insert(l, e), l.edge = e.edge = Ke(t.site, l.site), $e(t), void $e(e);
      if (!e) return void (l.edge = Ke(t.site, l.site));
      Be(t), Be(e);
      var c = t.site,
          f = c.x,
          s = c.y,
          h = n.x - f,
          p = n.y - s,
          g = e.site,
          v = g.x - f,
          d = g.y - s,
          y = 2 * (h * d - p * v),
          m = h * h + p * p,
          M = v * v + d * d,
          x = {
        x: (d * m - p * M) / y + f,
        y: (h * M - v * m) / y + s
      };
      nr(e.edge, c, g, x), l.edge = Ke(c, n, null, x), e.edge = Ke(n, g, null, x), $e(t), $e(e);
    }
  }

  function Oe(n, t) {
    var e = n.site,
        r = e.x,
        i = e.y,
        u = i - t;
    if (!u) return r;
    var o = n.P;
    if (!o) return -(1 / 0);
    e = o.site;
    var a = e.x,
        l = e.y,
        c = l - t;
    if (!c) return a;
    var f = a - r,
        s = 1 / u - 1 / c,
        h = f / c;
    return s ? (-h + Math.sqrt(h * h - 2 * s * (f * f / (-2 * c) - l + c / 2 + i - u / 2))) / s + r : (r + a) / 2;
  }

  function Ie(n, t) {
    var e = n.N;
    if (e) return Oe(e, t);
    var r = n.site;
    return r.y === t ? r.x : 1 / 0;
  }

  function Ye(n) {
    this.site = n, this.edges = [];
  }

  function Ze(n) {
    for (var t, e, r, i, u, o, a, l, c, f, s = n[0][0], h = n[1][0], p = n[0][1], g = n[1][1], v = ul, d = v.length; d--;) {
      if (u = v[d], u && u.prepare()) for (a = u.edges, l = a.length, o = 0; l > o;) {
        f = a[o].end(), r = f.x, i = f.y, c = a[++o % l].start(), t = c.x, e = c.y, (xo(r - t) > Uo || xo(i - e) > Uo) && (a.splice(o, 0, new tr(Qe(u.site, f, xo(r - s) < Uo && g - i > Uo ? {
          x: s,
          y: xo(t - s) < Uo ? e : g
        } : xo(i - g) < Uo && h - r > Uo ? {
          x: xo(e - g) < Uo ? t : h,
          y: g
        } : xo(r - h) < Uo && i - p > Uo ? {
          x: h,
          y: xo(t - h) < Uo ? e : p
        } : xo(i - p) < Uo && r - s > Uo ? {
          x: xo(e - p) < Uo ? t : s,
          y: p
        } : null), u.site, null)), ++l);
      }
    }
  }

  function Ve(n, t) {
    return t.angle - n.angle;
  }

  function Xe() {
    rr(this), this.x = this.y = this.arc = this.site = this.cy = null;
  }

  function $e(n) {
    var t = n.P,
        e = n.N;

    if (t && e) {
      var r = t.site,
          i = n.site,
          u = e.site;

      if (r !== u) {
        var o = i.x,
            a = i.y,
            l = r.x - o,
            c = r.y - a,
            f = u.x - o,
            s = u.y - a,
            h = 2 * (l * s - c * f);

        if (!(h >= -jo)) {
          var p = l * l + c * c,
              g = f * f + s * s,
              v = (s * p - c * g) / h,
              d = (l * g - f * p) / h,
              s = d + a,
              y = fl.pop() || new Xe();
          y.arc = n, y.site = i, y.x = v + o, y.y = s + Math.sqrt(v * v + d * d), y.cy = s, n.circle = y;

          for (var m = null, M = ll._; M;) {
            if (y.y < M.y || y.y === M.y && y.x <= M.x) {
              if (!M.L) {
                m = M.P;
                break;
              }

              M = M.L;
            } else {
              if (!M.R) {
                m = M;
                break;
              }

              M = M.R;
            }
          }

          ll.insert(m, y), m || (al = y);
        }
      }
    }
  }

  function Be(n) {
    var t = n.circle;
    t && (t.P || (al = t.N), ll.remove(t), fl.push(t), rr(t), n.circle = null);
  }

  function We(n) {
    for (var t, e = il, r = Yt(n[0][0], n[0][1], n[1][0], n[1][1]), i = e.length; i--;) {
      t = e[i], (!Je(t, n) || !r(t) || xo(t.a.x - t.b.x) < Uo && xo(t.a.y - t.b.y) < Uo) && (t.a = t.b = null, e.splice(i, 1));
    }
  }

  function Je(n, t) {
    var e = n.b;
    if (e) return !0;
    var r,
        i,
        u = n.a,
        o = t[0][0],
        a = t[1][0],
        l = t[0][1],
        c = t[1][1],
        f = n.l,
        s = n.r,
        h = f.x,
        p = f.y,
        g = s.x,
        v = s.y,
        d = (h + g) / 2,
        y = (p + v) / 2;

    if (v === p) {
      if (o > d || d >= a) return;

      if (h > g) {
        if (u) {
          if (u.y >= c) return;
        } else u = {
          x: d,
          y: l
        };

        e = {
          x: d,
          y: c
        };
      } else {
        if (u) {
          if (u.y < l) return;
        } else u = {
          x: d,
          y: c
        };

        e = {
          x: d,
          y: l
        };
      }
    } else if (r = (h - g) / (v - p), i = y - r * d, -1 > r || r > 1) {
      if (h > g) {
        if (u) {
          if (u.y >= c) return;
        } else u = {
          x: (l - i) / r,
          y: l
        };

        e = {
          x: (c - i) / r,
          y: c
        };
      } else {
        if (u) {
          if (u.y < l) return;
        } else u = {
          x: (c - i) / r,
          y: c
        };

        e = {
          x: (l - i) / r,
          y: l
        };
      }
    } else if (v > p) {
      if (u) {
        if (u.x >= a) return;
      } else u = {
        x: o,
        y: r * o + i
      };

      e = {
        x: a,
        y: r * a + i
      };
    } else {
      if (u) {
        if (u.x < o) return;
      } else u = {
        x: a,
        y: r * a + i
      };

      e = {
        x: o,
        y: r * o + i
      };
    }

    return n.a = u, n.b = e, !0;
  }

  function Ge(n, t) {
    this.l = n, this.r = t, this.a = this.b = null;
  }

  function Ke(n, t, e, r) {
    var i = new Ge(n, t);
    return il.push(i), e && nr(i, n, t, e), r && nr(i, t, n, r), ul[n.i].edges.push(new tr(i, n, t)), ul[t.i].edges.push(new tr(i, t, n)), i;
  }

  function Qe(n, t, e) {
    var r = new Ge(n, null);
    return r.a = t, r.b = e, il.push(r), r;
  }

  function nr(n, t, e, r) {
    n.a || n.b ? n.l === e ? n.b = r : n.a = r : (n.a = r, n.l = t, n.r = e);
  }

  function tr(n, t, e) {
    var r = n.a,
        i = n.b;
    this.edge = n, this.site = t, this.angle = e ? Math.atan2(e.y - t.y, e.x - t.x) : n.l === t ? Math.atan2(i.x - r.x, r.y - i.y) : Math.atan2(r.x - i.x, i.y - r.y);
  }

  function er() {
    this._ = null;
  }

  function rr(n) {
    n.U = n.C = n.L = n.R = n.P = n.N = null;
  }

  function ir(n, t) {
    var e = t,
        r = t.R,
        i = e.U;
    i ? i.L === e ? i.L = r : i.R = r : n._ = r, r.U = i, e.U = r, e.R = r.L, e.R && (e.R.U = e), r.L = e;
  }

  function ur(n, t) {
    var e = t,
        r = t.L,
        i = e.U;
    i ? i.L === e ? i.L = r : i.R = r : n._ = r, r.U = i, e.U = r, e.L = r.R, e.L && (e.L.U = e), r.R = e;
  }

  function or(n) {
    for (; n.L;) {
      n = n.L;
    }

    return n;
  }

  function ar(n, t) {
    var e,
        r,
        i,
        u = n.sort(lr).pop();

    for (il = [], ul = new Array(n.length), ol = new er(), ll = new er();;) {
      if (i = al, u && (!i || u.y < i.y || u.y === i.y && u.x < i.x)) u.x === e && u.y === r || (ul[u.i] = new Ye(u), He(u), e = u.x, r = u.y), u = n.pop();else {
        if (!i) break;
        Fe(i.arc);
      }
    }

    t && (We(t), Ze(t));
    var o = {
      cells: ul,
      edges: il
    };
    return ol = ll = il = ul = null, o;
  }

  function lr(n, t) {
    return t.y - n.y || t.x - n.x;
  }

  function cr(n, t, e) {
    return (n.x - e.x) * (t.y - n.y) - (n.x - t.x) * (e.y - n.y);
  }

  function fr(n) {
    return n.x;
  }

  function sr(n) {
    return n.y;
  }

  function hr() {
    return {
      leaf: !0,
      nodes: [],
      point: null,
      x: null,
      y: null
    };
  }

  function pr(n, t, e, r, i, u) {
    if (!n(t, e, r, i, u)) {
      var o = .5 * (e + i),
          a = .5 * (r + u),
          l = t.nodes;
      l[0] && pr(n, l[0], e, r, o, a), l[1] && pr(n, l[1], o, r, i, a), l[2] && pr(n, l[2], e, a, o, u), l[3] && pr(n, l[3], o, a, i, u);
    }
  }

  function gr(n, t, e, r, i, u, o) {
    var a,
        l = 1 / 0;
    return function c(n, f, s, h, p) {
      if (!(f > u || s > o || r > h || i > p)) {
        if (g = n.point) {
          var g,
              v = t - n.x,
              d = e - n.y,
              y = v * v + d * d;

          if (l > y) {
            var m = Math.sqrt(l = y);
            r = t - m, i = e - m, u = t + m, o = e + m, a = g;
          }
        }

        for (var M = n.nodes, x = .5 * (f + h), b = .5 * (s + p), _ = t >= x, w = e >= b, S = w << 1 | _, k = S + 4; k > S; ++S) {
          if (n = M[3 & S]) switch (3 & S) {
            case 0:
              c(n, f, s, x, b);
              break;

            case 1:
              c(n, x, s, h, b);
              break;

            case 2:
              c(n, f, b, x, p);
              break;

            case 3:
              c(n, x, b, h, p);
          }
        }
      }
    }(n, r, i, u, o), a;
  }

  function vr(n, t) {
    n = ao.rgb(n), t = ao.rgb(t);
    var e = n.r,
        r = n.g,
        i = n.b,
        u = t.r - e,
        o = t.g - r,
        a = t.b - i;
    return function (n) {
      return "#" + bn(Math.round(e + u * n)) + bn(Math.round(r + o * n)) + bn(Math.round(i + a * n));
    };
  }

  function dr(n, t) {
    var e,
        r = {},
        i = {};

    for (e in n) {
      e in t ? r[e] = Mr(n[e], t[e]) : i[e] = n[e];
    }

    for (e in t) {
      e in n || (i[e] = t[e]);
    }

    return function (n) {
      for (e in r) {
        i[e] = r[e](n);
      }

      return i;
    };
  }

  function yr(n, t) {
    return n = +n, t = +t, function (e) {
      return n * (1 - e) + t * e;
    };
  }

  function mr(n, t) {
    var e,
        r,
        i,
        u = hl.lastIndex = pl.lastIndex = 0,
        o = -1,
        a = [],
        l = [];

    for (n += "", t += ""; (e = hl.exec(n)) && (r = pl.exec(t));) {
      (i = r.index) > u && (i = t.slice(u, i), a[o] ? a[o] += i : a[++o] = i), (e = e[0]) === (r = r[0]) ? a[o] ? a[o] += r : a[++o] = r : (a[++o] = null, l.push({
        i: o,
        x: yr(e, r)
      })), u = pl.lastIndex;
    }

    return u < t.length && (i = t.slice(u), a[o] ? a[o] += i : a[++o] = i), a.length < 2 ? l[0] ? (t = l[0].x, function (n) {
      return t(n) + "";
    }) : function () {
      return t;
    } : (t = l.length, function (n) {
      for (var e, r = 0; t > r; ++r) {
        a[(e = l[r]).i] = e.x(n);
      }

      return a.join("");
    });
  }

  function Mr(n, t) {
    for (var e, r = ao.interpolators.length; --r >= 0 && !(e = ao.interpolators[r](n, t));) {
      ;
    }

    return e;
  }

  function xr(n, t) {
    var e,
        r = [],
        i = [],
        u = n.length,
        o = t.length,
        a = Math.min(n.length, t.length);

    for (e = 0; a > e; ++e) {
      r.push(Mr(n[e], t[e]));
    }

    for (; u > e; ++e) {
      i[e] = n[e];
    }

    for (; o > e; ++e) {
      i[e] = t[e];
    }

    return function (n) {
      for (e = 0; a > e; ++e) {
        i[e] = r[e](n);
      }

      return i;
    };
  }

  function br(n) {
    return function (t) {
      return 0 >= t ? 0 : t >= 1 ? 1 : n(t);
    };
  }

  function _r(n) {
    return function (t) {
      return 1 - n(1 - t);
    };
  }

  function wr(n) {
    return function (t) {
      return .5 * (.5 > t ? n(2 * t) : 2 - n(2 - 2 * t));
    };
  }

  function Sr(n) {
    return n * n;
  }

  function kr(n) {
    return n * n * n;
  }

  function Nr(n) {
    if (0 >= n) return 0;
    if (n >= 1) return 1;
    var t = n * n,
        e = t * n;
    return 4 * (.5 > n ? e : 3 * (n - t) + e - .75);
  }

  function Er(n) {
    return function (t) {
      return Math.pow(t, n);
    };
  }

  function Ar(n) {
    return 1 - Math.cos(n * Io);
  }

  function Cr(n) {
    return Math.pow(2, 10 * (n - 1));
  }

  function zr(n) {
    return 1 - Math.sqrt(1 - n * n);
  }

  function Lr(n, t) {
    var e;
    return arguments.length < 2 && (t = .45), arguments.length ? e = t / Ho * Math.asin(1 / n) : (n = 1, e = t / 4), function (r) {
      return 1 + n * Math.pow(2, -10 * r) * Math.sin((r - e) * Ho / t);
    };
  }

  function qr(n) {
    return n || (n = 1.70158), function (t) {
      return t * t * ((n + 1) * t - n);
    };
  }

  function Tr(n) {
    return 1 / 2.75 > n ? 7.5625 * n * n : 2 / 2.75 > n ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : 2.5 / 2.75 > n ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375;
  }

  function Rr(n, t) {
    n = ao.hcl(n), t = ao.hcl(t);
    var e = n.h,
        r = n.c,
        i = n.l,
        u = t.h - e,
        o = t.c - r,
        a = t.l - i;
    return isNaN(o) && (o = 0, r = isNaN(r) ? t.c : r), isNaN(u) ? (u = 0, e = isNaN(e) ? t.h : e) : u > 180 ? u -= 360 : -180 > u && (u += 360), function (n) {
      return sn(e + u * n, r + o * n, i + a * n) + "";
    };
  }

  function Dr(n, t) {
    n = ao.hsl(n), t = ao.hsl(t);
    var e = n.h,
        r = n.s,
        i = n.l,
        u = t.h - e,
        o = t.s - r,
        a = t.l - i;
    return isNaN(o) && (o = 0, r = isNaN(r) ? t.s : r), isNaN(u) ? (u = 0, e = isNaN(e) ? t.h : e) : u > 180 ? u -= 360 : -180 > u && (u += 360), function (n) {
      return cn(e + u * n, r + o * n, i + a * n) + "";
    };
  }

  function Pr(n, t) {
    n = ao.lab(n), t = ao.lab(t);
    var e = n.l,
        r = n.a,
        i = n.b,
        u = t.l - e,
        o = t.a - r,
        a = t.b - i;
    return function (n) {
      return pn(e + u * n, r + o * n, i + a * n) + "";
    };
  }

  function Ur(n, t) {
    return t -= n, function (e) {
      return Math.round(n + t * e);
    };
  }

  function jr(n) {
    var t = [n.a, n.b],
        e = [n.c, n.d],
        r = Hr(t),
        i = Fr(t, e),
        u = Hr(Or(e, t, -i)) || 0;
    t[0] * e[1] < e[0] * t[1] && (t[0] *= -1, t[1] *= -1, r *= -1, i *= -1), this.rotate = (r ? Math.atan2(t[1], t[0]) : Math.atan2(-e[0], e[1])) * Zo, this.translate = [n.e, n.f], this.scale = [r, u], this.skew = u ? Math.atan2(i, u) * Zo : 0;
  }

  function Fr(n, t) {
    return n[0] * t[0] + n[1] * t[1];
  }

  function Hr(n) {
    var t = Math.sqrt(Fr(n, n));
    return t && (n[0] /= t, n[1] /= t), t;
  }

  function Or(n, t, e) {
    return n[0] += e * t[0], n[1] += e * t[1], n;
  }

  function Ir(n) {
    return n.length ? n.pop() + "," : "";
  }

  function Yr(n, t, e, r) {
    if (n[0] !== t[0] || n[1] !== t[1]) {
      var i = e.push("translate(", null, ",", null, ")");
      r.push({
        i: i - 4,
        x: yr(n[0], t[0])
      }, {
        i: i - 2,
        x: yr(n[1], t[1])
      });
    } else (t[0] || t[1]) && e.push("translate(" + t + ")");
  }

  function Zr(n, t, e, r) {
    n !== t ? (n - t > 180 ? t += 360 : t - n > 180 && (n += 360), r.push({
      i: e.push(Ir(e) + "rotate(", null, ")") - 2,
      x: yr(n, t)
    })) : t && e.push(Ir(e) + "rotate(" + t + ")");
  }

  function Vr(n, t, e, r) {
    n !== t ? r.push({
      i: e.push(Ir(e) + "skewX(", null, ")") - 2,
      x: yr(n, t)
    }) : t && e.push(Ir(e) + "skewX(" + t + ")");
  }

  function Xr(n, t, e, r) {
    if (n[0] !== t[0] || n[1] !== t[1]) {
      var i = e.push(Ir(e) + "scale(", null, ",", null, ")");
      r.push({
        i: i - 4,
        x: yr(n[0], t[0])
      }, {
        i: i - 2,
        x: yr(n[1], t[1])
      });
    } else 1 === t[0] && 1 === t[1] || e.push(Ir(e) + "scale(" + t + ")");
  }

  function $r(n, t) {
    var e = [],
        r = [];
    return n = ao.transform(n), t = ao.transform(t), Yr(n.translate, t.translate, e, r), Zr(n.rotate, t.rotate, e, r), Vr(n.skew, t.skew, e, r), Xr(n.scale, t.scale, e, r), n = t = null, function (n) {
      for (var t, i = -1, u = r.length; ++i < u;) {
        e[(t = r[i]).i] = t.x(n);
      }

      return e.join("");
    };
  }

  function Br(n, t) {
    return t = (t -= n = +n) || 1 / t, function (e) {
      return (e - n) / t;
    };
  }

  function Wr(n, t) {
    return t = (t -= n = +n) || 1 / t, function (e) {
      return Math.max(0, Math.min(1, (e - n) / t));
    };
  }

  function Jr(n) {
    for (var t = n.source, e = n.target, r = Kr(t, e), i = [t]; t !== r;) {
      t = t.parent, i.push(t);
    }

    for (var u = i.length; e !== r;) {
      i.splice(u, 0, e), e = e.parent;
    }

    return i;
  }

  function Gr(n) {
    for (var t = [], e = n.parent; null != e;) {
      t.push(n), n = e, e = e.parent;
    }

    return t.push(n), t;
  }

  function Kr(n, t) {
    if (n === t) return n;

    for (var e = Gr(n), r = Gr(t), i = e.pop(), u = r.pop(), o = null; i === u;) {
      o = i, i = e.pop(), u = r.pop();
    }

    return o;
  }

  function Qr(n) {
    n.fixed |= 2;
  }

  function ni(n) {
    n.fixed &= -7;
  }

  function ti(n) {
    n.fixed |= 4, n.px = n.x, n.py = n.y;
  }

  function ei(n) {
    n.fixed &= -5;
  }

  function ri(n, t, e) {
    var r = 0,
        i = 0;
    if (n.charge = 0, !n.leaf) for (var u, o = n.nodes, a = o.length, l = -1; ++l < a;) {
      u = o[l], null != u && (ri(u, t, e), n.charge += u.charge, r += u.charge * u.cx, i += u.charge * u.cy);
    }

    if (n.point) {
      n.leaf || (n.point.x += Math.random() - .5, n.point.y += Math.random() - .5);
      var c = t * e[n.point.index];
      n.charge += n.pointCharge = c, r += c * n.point.x, i += c * n.point.y;
    }

    n.cx = r / n.charge, n.cy = i / n.charge;
  }

  function ii(n, t) {
    return ao.rebind(n, t, "sort", "children", "value"), n.nodes = n, n.links = fi, n;
  }

  function ui(n, t) {
    for (var e = [n]; null != (n = e.pop());) {
      if (t(n), (i = n.children) && (r = i.length)) for (var r, i; --r >= 0;) {
        e.push(i[r]);
      }
    }
  }

  function oi(n, t) {
    for (var e = [n], r = []; null != (n = e.pop());) {
      if (r.push(n), (u = n.children) && (i = u.length)) for (var i, u, o = -1; ++o < i;) {
        e.push(u[o]);
      }
    }

    for (; null != (n = r.pop());) {
      t(n);
    }
  }

  function ai(n) {
    return n.children;
  }

  function li(n) {
    return n.value;
  }

  function ci(n, t) {
    return t.value - n.value;
  }

  function fi(n) {
    return ao.merge(n.map(function (n) {
      return (n.children || []).map(function (t) {
        return {
          source: n,
          target: t
        };
      });
    }));
  }

  function si(n) {
    return n.x;
  }

  function hi(n) {
    return n.y;
  }

  function pi(n, t, e) {
    n.y0 = t, n.y = e;
  }

  function gi(n) {
    return ao.range(n.length);
  }

  function vi(n) {
    for (var t = -1, e = n[0].length, r = []; ++t < e;) {
      r[t] = 0;
    }

    return r;
  }

  function di(n) {
    for (var t, e = 1, r = 0, i = n[0][1], u = n.length; u > e; ++e) {
      (t = n[e][1]) > i && (r = e, i = t);
    }

    return r;
  }

  function yi(n) {
    return n.reduce(mi, 0);
  }

  function mi(n, t) {
    return n + t[1];
  }

  function Mi(n, t) {
    return xi(n, Math.ceil(Math.log(t.length) / Math.LN2 + 1));
  }

  function xi(n, t) {
    for (var e = -1, r = +n[0], i = (n[1] - r) / t, u = []; ++e <= t;) {
      u[e] = i * e + r;
    }

    return u;
  }

  function bi(n) {
    return [ao.min(n), ao.max(n)];
  }

  function _i(n, t) {
    return n.value - t.value;
  }

  function wi(n, t) {
    var e = n._pack_next;
    n._pack_next = t, t._pack_prev = n, t._pack_next = e, e._pack_prev = t;
  }

  function Si(n, t) {
    n._pack_next = t, t._pack_prev = n;
  }

  function ki(n, t) {
    var e = t.x - n.x,
        r = t.y - n.y,
        i = n.r + t.r;
    return .999 * i * i > e * e + r * r;
  }

  function Ni(n) {
    function t(n) {
      f = Math.min(n.x - n.r, f), s = Math.max(n.x + n.r, s), h = Math.min(n.y - n.r, h), p = Math.max(n.y + n.r, p);
    }

    if ((e = n.children) && (c = e.length)) {
      var e,
          r,
          i,
          u,
          o,
          a,
          l,
          c,
          f = 1 / 0,
          s = -(1 / 0),
          h = 1 / 0,
          p = -(1 / 0);
      if (e.forEach(Ei), r = e[0], r.x = -r.r, r.y = 0, t(r), c > 1 && (i = e[1], i.x = i.r, i.y = 0, t(i), c > 2)) for (u = e[2], zi(r, i, u), t(u), wi(r, u), r._pack_prev = u, wi(u, i), i = r._pack_next, o = 3; c > o; o++) {
        zi(r, i, u = e[o]);
        var g = 0,
            v = 1,
            d = 1;

        for (a = i._pack_next; a !== i; a = a._pack_next, v++) {
          if (ki(a, u)) {
            g = 1;
            break;
          }
        }

        if (1 == g) for (l = r._pack_prev; l !== a._pack_prev && !ki(l, u); l = l._pack_prev, d++) {
          ;
        }
        g ? (d > v || v == d && i.r < r.r ? Si(r, i = a) : Si(r = l, i), o--) : (wi(r, u), i = u, t(u));
      }
      var y = (f + s) / 2,
          m = (h + p) / 2,
          M = 0;

      for (o = 0; c > o; o++) {
        u = e[o], u.x -= y, u.y -= m, M = Math.max(M, u.r + Math.sqrt(u.x * u.x + u.y * u.y));
      }

      n.r = M, e.forEach(Ai);
    }
  }

  function Ei(n) {
    n._pack_next = n._pack_prev = n;
  }

  function Ai(n) {
    delete n._pack_next, delete n._pack_prev;
  }

  function Ci(n, t, e, r) {
    var i = n.children;
    if (n.x = t += r * n.x, n.y = e += r * n.y, n.r *= r, i) for (var u = -1, o = i.length; ++u < o;) {
      Ci(i[u], t, e, r);
    }
  }

  function zi(n, t, e) {
    var r = n.r + e.r,
        i = t.x - n.x,
        u = t.y - n.y;

    if (r && (i || u)) {
      var o = t.r + e.r,
          a = i * i + u * u;
      o *= o, r *= r;
      var l = .5 + (r - o) / (2 * a),
          c = Math.sqrt(Math.max(0, 2 * o * (r + a) - (r -= a) * r - o * o)) / (2 * a);
      e.x = n.x + l * i + c * u, e.y = n.y + l * u - c * i;
    } else e.x = n.x + r, e.y = n.y;
  }

  function Li(n, t) {
    return n.parent == t.parent ? 1 : 2;
  }

  function qi(n) {
    var t = n.children;
    return t.length ? t[0] : n.t;
  }

  function Ti(n) {
    var t,
        e = n.children;
    return (t = e.length) ? e[t - 1] : n.t;
  }

  function Ri(n, t, e) {
    var r = e / (t.i - n.i);
    t.c -= r, t.s += e, n.c += r, t.z += e, t.m += e;
  }

  function Di(n) {
    for (var t, e = 0, r = 0, i = n.children, u = i.length; --u >= 0;) {
      t = i[u], t.z += e, t.m += e, e += t.s + (r += t.c);
    }
  }

  function Pi(n, t, e) {
    return n.a.parent === t.parent ? n.a : e;
  }

  function Ui(n) {
    return 1 + ao.max(n, function (n) {
      return n.y;
    });
  }

  function ji(n) {
    return n.reduce(function (n, t) {
      return n + t.x;
    }, 0) / n.length;
  }

  function Fi(n) {
    var t = n.children;
    return t && t.length ? Fi(t[0]) : n;
  }

  function Hi(n) {
    var t,
        e = n.children;
    return e && (t = e.length) ? Hi(e[t - 1]) : n;
  }

  function Oi(n) {
    return {
      x: n.x,
      y: n.y,
      dx: n.dx,
      dy: n.dy
    };
  }

  function Ii(n, t) {
    var e = n.x + t[3],
        r = n.y + t[0],
        i = n.dx - t[1] - t[3],
        u = n.dy - t[0] - t[2];
    return 0 > i && (e += i / 2, i = 0), 0 > u && (r += u / 2, u = 0), {
      x: e,
      y: r,
      dx: i,
      dy: u
    };
  }

  function Yi(n) {
    var t = n[0],
        e = n[n.length - 1];
    return e > t ? [t, e] : [e, t];
  }

  function Zi(n) {
    return n.rangeExtent ? n.rangeExtent() : Yi(n.range());
  }

  function Vi(n, t, e, r) {
    var i = e(n[0], n[1]),
        u = r(t[0], t[1]);
    return function (n) {
      return u(i(n));
    };
  }

  function Xi(n, t) {
    var e,
        r = 0,
        i = n.length - 1,
        u = n[r],
        o = n[i];
    return u > o && (e = r, r = i, i = e, e = u, u = o, o = e), n[r] = t.floor(u), n[i] = t.ceil(o), n;
  }

  function $i(n) {
    return n ? {
      floor: function floor(t) {
        return Math.floor(t / n) * n;
      },
      ceil: function ceil(t) {
        return Math.ceil(t / n) * n;
      }
    } : Sl;
  }

  function Bi(n, t, e, r) {
    var i = [],
        u = [],
        o = 0,
        a = Math.min(n.length, t.length) - 1;

    for (n[a] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++o <= a;) {
      i.push(e(n[o - 1], n[o])), u.push(r(t[o - 1], t[o]));
    }

    return function (t) {
      var e = ao.bisect(n, t, 1, a) - 1;
      return u[e](i[e](t));
    };
  }

  function Wi(n, t, e, r) {
    function i() {
      var i = Math.min(n.length, t.length) > 2 ? Bi : Vi,
          l = r ? Wr : Br;
      return o = i(n, t, l, e), a = i(t, n, l, Mr), u;
    }

    function u(n) {
      return o(n);
    }

    var o, a;
    return u.invert = function (n) {
      return a(n);
    }, u.domain = function (t) {
      return arguments.length ? (n = t.map(Number), i()) : n;
    }, u.range = function (n) {
      return arguments.length ? (t = n, i()) : t;
    }, u.rangeRound = function (n) {
      return u.range(n).interpolate(Ur);
    }, u.clamp = function (n) {
      return arguments.length ? (r = n, i()) : r;
    }, u.interpolate = function (n) {
      return arguments.length ? (e = n, i()) : e;
    }, u.ticks = function (t) {
      return Qi(n, t);
    }, u.tickFormat = function (t, e) {
      return nu(n, t, e);
    }, u.nice = function (t) {
      return Gi(n, t), i();
    }, u.copy = function () {
      return Wi(n, t, e, r);
    }, i();
  }

  function Ji(n, t) {
    return ao.rebind(n, t, "range", "rangeRound", "interpolate", "clamp");
  }

  function Gi(n, t) {
    return Xi(n, $i(Ki(n, t)[2])), Xi(n, $i(Ki(n, t)[2])), n;
  }

  function Ki(n, t) {
    null == t && (t = 10);
    var e = Yi(n),
        r = e[1] - e[0],
        i = Math.pow(10, Math.floor(Math.log(r / t) / Math.LN10)),
        u = t / r * i;
    return .15 >= u ? i *= 10 : .35 >= u ? i *= 5 : .75 >= u && (i *= 2), e[0] = Math.ceil(e[0] / i) * i, e[1] = Math.floor(e[1] / i) * i + .5 * i, e[2] = i, e;
  }

  function Qi(n, t) {
    return ao.range.apply(ao, Ki(n, t));
  }

  function nu(n, t, e) {
    var r = Ki(n, t);

    if (e) {
      var i = ha.exec(e);

      if (i.shift(), "s" === i[8]) {
        var u = ao.formatPrefix(Math.max(xo(r[0]), xo(r[1])));
        return i[7] || (i[7] = "." + tu(u.scale(r[2]))), i[8] = "f", e = ao.format(i.join("")), function (n) {
          return e(u.scale(n)) + u.symbol;
        };
      }

      i[7] || (i[7] = "." + eu(i[8], r)), e = i.join("");
    } else e = ",." + tu(r[2]) + "f";

    return ao.format(e);
  }

  function tu(n) {
    return -Math.floor(Math.log(n) / Math.LN10 + .01);
  }

  function eu(n, t) {
    var e = tu(t[2]);
    return n in kl ? Math.abs(e - tu(Math.max(xo(t[0]), xo(t[1])))) + +("e" !== n) : e - 2 * ("%" === n);
  }

  function ru(n, t, e, r) {
    function i(n) {
      return (e ? Math.log(0 > n ? 0 : n) : -Math.log(n > 0 ? 0 : -n)) / Math.log(t);
    }

    function u(n) {
      return e ? Math.pow(t, n) : -Math.pow(t, -n);
    }

    function o(t) {
      return n(i(t));
    }

    return o.invert = function (t) {
      return u(n.invert(t));
    }, o.domain = function (t) {
      return arguments.length ? (e = t[0] >= 0, n.domain((r = t.map(Number)).map(i)), o) : r;
    }, o.base = function (e) {
      return arguments.length ? (t = +e, n.domain(r.map(i)), o) : t;
    }, o.nice = function () {
      var t = Xi(r.map(i), e ? Math : El);
      return n.domain(t), r = t.map(u), o;
    }, o.ticks = function () {
      var n = Yi(r),
          o = [],
          a = n[0],
          l = n[1],
          c = Math.floor(i(a)),
          f = Math.ceil(i(l)),
          s = t % 1 ? 2 : t;

      if (isFinite(f - c)) {
        if (e) {
          for (; f > c; c++) {
            for (var h = 1; s > h; h++) {
              o.push(u(c) * h);
            }
          }

          o.push(u(c));
        } else for (o.push(u(c)); c++ < f;) {
          for (var h = s - 1; h > 0; h--) {
            o.push(u(c) * h);
          }
        }

        for (c = 0; o[c] < a; c++) {
          ;
        }

        for (f = o.length; o[f - 1] > l; f--) {
          ;
        }

        o = o.slice(c, f);
      }

      return o;
    }, o.tickFormat = function (n, e) {
      if (!arguments.length) return Nl;
      arguments.length < 2 ? e = Nl : "function" != typeof e && (e = ao.format(e));
      var r = Math.max(1, t * n / o.ticks().length);
      return function (n) {
        var o = n / u(Math.round(i(n)));
        return t - .5 > o * t && (o *= t), r >= o ? e(n) : "";
      };
    }, o.copy = function () {
      return ru(n.copy(), t, e, r);
    }, Ji(o, n);
  }

  function iu(n, t, e) {
    function r(t) {
      return n(i(t));
    }

    var i = uu(t),
        u = uu(1 / t);
    return r.invert = function (t) {
      return u(n.invert(t));
    }, r.domain = function (t) {
      return arguments.length ? (n.domain((e = t.map(Number)).map(i)), r) : e;
    }, r.ticks = function (n) {
      return Qi(e, n);
    }, r.tickFormat = function (n, t) {
      return nu(e, n, t);
    }, r.nice = function (n) {
      return r.domain(Gi(e, n));
    }, r.exponent = function (o) {
      return arguments.length ? (i = uu(t = o), u = uu(1 / t), n.domain(e.map(i)), r) : t;
    }, r.copy = function () {
      return iu(n.copy(), t, e);
    }, Ji(r, n);
  }

  function uu(n) {
    return function (t) {
      return 0 > t ? -Math.pow(-t, n) : Math.pow(t, n);
    };
  }

  function ou(n, t) {
    function e(e) {
      return u[((i.get(e) || ("range" === t.t ? i.set(e, n.push(e)) : NaN)) - 1) % u.length];
    }

    function r(t, e) {
      return ao.range(n.length).map(function (n) {
        return t + e * n;
      });
    }

    var i, u, o;
    return e.domain = function (r) {
      if (!arguments.length) return n;
      n = [], i = new c();

      for (var u, o = -1, a = r.length; ++o < a;) {
        i.has(u = r[o]) || i.set(u, n.push(u));
      }

      return e[t.t].apply(e, t.a);
    }, e.range = function (n) {
      return arguments.length ? (u = n, o = 0, t = {
        t: "range",
        a: arguments
      }, e) : u;
    }, e.rangePoints = function (i, a) {
      arguments.length < 2 && (a = 0);
      var l = i[0],
          c = i[1],
          f = n.length < 2 ? (l = (l + c) / 2, 0) : (c - l) / (n.length - 1 + a);
      return u = r(l + f * a / 2, f), o = 0, t = {
        t: "rangePoints",
        a: arguments
      }, e;
    }, e.rangeRoundPoints = function (i, a) {
      arguments.length < 2 && (a = 0);
      var l = i[0],
          c = i[1],
          f = n.length < 2 ? (l = c = Math.round((l + c) / 2), 0) : (c - l) / (n.length - 1 + a) | 0;
      return u = r(l + Math.round(f * a / 2 + (c - l - (n.length - 1 + a) * f) / 2), f), o = 0, t = {
        t: "rangeRoundPoints",
        a: arguments
      }, e;
    }, e.rangeBands = function (i, a, l) {
      arguments.length < 2 && (a = 0), arguments.length < 3 && (l = a);
      var c = i[1] < i[0],
          f = i[c - 0],
          s = i[1 - c],
          h = (s - f) / (n.length - a + 2 * l);
      return u = r(f + h * l, h), c && u.reverse(), o = h * (1 - a), t = {
        t: "rangeBands",
        a: arguments
      }, e;
    }, e.rangeRoundBands = function (i, a, l) {
      arguments.length < 2 && (a = 0), arguments.length < 3 && (l = a);
      var c = i[1] < i[0],
          f = i[c - 0],
          s = i[1 - c],
          h = Math.floor((s - f) / (n.length - a + 2 * l));
      return u = r(f + Math.round((s - f - (n.length - a) * h) / 2), h), c && u.reverse(), o = Math.round(h * (1 - a)), t = {
        t: "rangeRoundBands",
        a: arguments
      }, e;
    }, e.rangeBand = function () {
      return o;
    }, e.rangeExtent = function () {
      return Yi(t.a[0]);
    }, e.copy = function () {
      return ou(n, t);
    }, e.domain(n);
  }

  function au(n, t) {
    function u() {
      var e = 0,
          r = t.length;

      for (a = []; ++e < r;) {
        a[e - 1] = ao.quantile(n, e / r);
      }

      return o;
    }

    function o(n) {
      return isNaN(n = +n) ? void 0 : t[ao.bisect(a, n)];
    }

    var a;
    return o.domain = function (t) {
      return arguments.length ? (n = t.map(r).filter(i).sort(e), u()) : n;
    }, o.range = function (n) {
      return arguments.length ? (t = n, u()) : t;
    }, o.quantiles = function () {
      return a;
    }, o.invertExtent = function (e) {
      return e = t.indexOf(e), 0 > e ? [NaN, NaN] : [e > 0 ? a[e - 1] : n[0], e < a.length ? a[e] : n[n.length - 1]];
    }, o.copy = function () {
      return au(n, t);
    }, u();
  }

  function lu(n, t, e) {
    function r(t) {
      return e[Math.max(0, Math.min(o, Math.floor(u * (t - n))))];
    }

    function i() {
      return u = e.length / (t - n), o = e.length - 1, r;
    }

    var u, o;
    return r.domain = function (e) {
      return arguments.length ? (n = +e[0], t = +e[e.length - 1], i()) : [n, t];
    }, r.range = function (n) {
      return arguments.length ? (e = n, i()) : e;
    }, r.invertExtent = function (t) {
      return t = e.indexOf(t), t = 0 > t ? NaN : t / u + n, [t, t + 1 / u];
    }, r.copy = function () {
      return lu(n, t, e);
    }, i();
  }

  function cu(n, t) {
    function e(e) {
      return e >= e ? t[ao.bisect(n, e)] : void 0;
    }

    return e.domain = function (t) {
      return arguments.length ? (n = t, e) : n;
    }, e.range = function (n) {
      return arguments.length ? (t = n, e) : t;
    }, e.invertExtent = function (e) {
      return e = t.indexOf(e), [n[e - 1], n[e]];
    }, e.copy = function () {
      return cu(n, t);
    }, e;
  }

  function fu(n) {
    function t(n) {
      return +n;
    }

    return t.invert = t, t.domain = t.range = function (e) {
      return arguments.length ? (n = e.map(t), t) : n;
    }, t.ticks = function (t) {
      return Qi(n, t);
    }, t.tickFormat = function (t, e) {
      return nu(n, t, e);
    }, t.copy = function () {
      return fu(n);
    }, t;
  }

  function su() {
    return 0;
  }

  function hu(n) {
    return n.innerRadius;
  }

  function pu(n) {
    return n.outerRadius;
  }

  function gu(n) {
    return n.startAngle;
  }

  function vu(n) {
    return n.endAngle;
  }

  function du(n) {
    return n && n.padAngle;
  }

  function yu(n, t, e, r) {
    return (n - e) * t - (t - r) * n > 0 ? 0 : 1;
  }

  function mu(n, t, e, r, i) {
    var u = n[0] - t[0],
        o = n[1] - t[1],
        a = (i ? r : -r) / Math.sqrt(u * u + o * o),
        l = a * o,
        c = -a * u,
        f = n[0] + l,
        s = n[1] + c,
        h = t[0] + l,
        p = t[1] + c,
        g = (f + h) / 2,
        v = (s + p) / 2,
        d = h - f,
        y = p - s,
        m = d * d + y * y,
        M = e - r,
        x = f * p - h * s,
        b = (0 > y ? -1 : 1) * Math.sqrt(Math.max(0, M * M * m - x * x)),
        _ = (x * y - d * b) / m,
        w = (-x * d - y * b) / m,
        S = (x * y + d * b) / m,
        k = (-x * d + y * b) / m,
        N = _ - g,
        E = w - v,
        A = S - g,
        C = k - v;

    return N * N + E * E > A * A + C * C && (_ = S, w = k), [[_ - l, w - c], [_ * e / M, w * e / M]];
  }

  function Mu(n) {
    function t(t) {
      function o() {
        c.push("M", u(n(f), a));
      }

      for (var l, c = [], f = [], s = -1, h = t.length, p = En(e), g = En(r); ++s < h;) {
        i.call(this, l = t[s], s) ? f.push([+p.call(this, l, s), +g.call(this, l, s)]) : f.length && (o(), f = []);
      }

      return f.length && o(), c.length ? c.join("") : null;
    }

    var e = Ce,
        r = ze,
        i = zt,
        u = xu,
        o = u.key,
        a = .7;
    return t.x = function (n) {
      return arguments.length ? (e = n, t) : e;
    }, t.y = function (n) {
      return arguments.length ? (r = n, t) : r;
    }, t.defined = function (n) {
      return arguments.length ? (i = n, t) : i;
    }, t.interpolate = function (n) {
      return arguments.length ? (o = "function" == typeof n ? u = n : (u = Tl.get(n) || xu).key, t) : o;
    }, t.tension = function (n) {
      return arguments.length ? (a = n, t) : a;
    }, t;
  }

  function xu(n) {
    return n.length > 1 ? n.join("L") : n + "Z";
  }

  function bu(n) {
    return n.join("L") + "Z";
  }

  function _u(n) {
    for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e;) {
      i.push("H", (r[0] + (r = n[t])[0]) / 2, "V", r[1]);
    }

    return e > 1 && i.push("H", r[0]), i.join("");
  }

  function wu(n) {
    for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e;) {
      i.push("V", (r = n[t])[1], "H", r[0]);
    }

    return i.join("");
  }

  function Su(n) {
    for (var t = 0, e = n.length, r = n[0], i = [r[0], ",", r[1]]; ++t < e;) {
      i.push("H", (r = n[t])[0], "V", r[1]);
    }

    return i.join("");
  }

  function ku(n, t) {
    return n.length < 4 ? xu(n) : n[1] + Au(n.slice(1, -1), Cu(n, t));
  }

  function Nu(n, t) {
    return n.length < 3 ? bu(n) : n[0] + Au((n.push(n[0]), n), Cu([n[n.length - 2]].concat(n, [n[1]]), t));
  }

  function Eu(n, t) {
    return n.length < 3 ? xu(n) : n[0] + Au(n, Cu(n, t));
  }

  function Au(n, t) {
    if (t.length < 1 || n.length != t.length && n.length != t.length + 2) return xu(n);
    var e = n.length != t.length,
        r = "",
        i = n[0],
        u = n[1],
        o = t[0],
        a = o,
        l = 1;

    if (e && (r += "Q" + (u[0] - 2 * o[0] / 3) + "," + (u[1] - 2 * o[1] / 3) + "," + u[0] + "," + u[1], i = n[1], l = 2), t.length > 1) {
      a = t[1], u = n[l], l++, r += "C" + (i[0] + o[0]) + "," + (i[1] + o[1]) + "," + (u[0] - a[0]) + "," + (u[1] - a[1]) + "," + u[0] + "," + u[1];

      for (var c = 2; c < t.length; c++, l++) {
        u = n[l], a = t[c], r += "S" + (u[0] - a[0]) + "," + (u[1] - a[1]) + "," + u[0] + "," + u[1];
      }
    }

    if (e) {
      var f = n[l];
      r += "Q" + (u[0] + 2 * a[0] / 3) + "," + (u[1] + 2 * a[1] / 3) + "," + f[0] + "," + f[1];
    }

    return r;
  }

  function Cu(n, t) {
    for (var e, r = [], i = (1 - t) / 2, u = n[0], o = n[1], a = 1, l = n.length; ++a < l;) {
      e = u, u = o, o = n[a], r.push([i * (o[0] - e[0]), i * (o[1] - e[1])]);
    }

    return r;
  }

  function zu(n) {
    if (n.length < 3) return xu(n);
    var t = 1,
        e = n.length,
        r = n[0],
        i = r[0],
        u = r[1],
        o = [i, i, i, (r = n[1])[0]],
        a = [u, u, u, r[1]],
        l = [i, ",", u, "L", Ru(Pl, o), ",", Ru(Pl, a)];

    for (n.push(n[e - 1]); ++t <= e;) {
      r = n[t], o.shift(), o.push(r[0]), a.shift(), a.push(r[1]), Du(l, o, a);
    }

    return n.pop(), l.push("L", r), l.join("");
  }

  function Lu(n) {
    if (n.length < 4) return xu(n);

    for (var t, e = [], r = -1, i = n.length, u = [0], o = [0]; ++r < 3;) {
      t = n[r], u.push(t[0]), o.push(t[1]);
    }

    for (e.push(Ru(Pl, u) + "," + Ru(Pl, o)), --r; ++r < i;) {
      t = n[r], u.shift(), u.push(t[0]), o.shift(), o.push(t[1]), Du(e, u, o);
    }

    return e.join("");
  }

  function qu(n) {
    for (var t, e, r = -1, i = n.length, u = i + 4, o = [], a = []; ++r < 4;) {
      e = n[r % i], o.push(e[0]), a.push(e[1]);
    }

    for (t = [Ru(Pl, o), ",", Ru(Pl, a)], --r; ++r < u;) {
      e = n[r % i], o.shift(), o.push(e[0]), a.shift(), a.push(e[1]), Du(t, o, a);
    }

    return t.join("");
  }

  function Tu(n, t) {
    var e = n.length - 1;
    if (e) for (var r, i, u = n[0][0], o = n[0][1], a = n[e][0] - u, l = n[e][1] - o, c = -1; ++c <= e;) {
      r = n[c], i = c / e, r[0] = t * r[0] + (1 - t) * (u + i * a), r[1] = t * r[1] + (1 - t) * (o + i * l);
    }
    return zu(n);
  }

  function Ru(n, t) {
    return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] + n[3] * t[3];
  }

  function Du(n, t, e) {
    n.push("C", Ru(Rl, t), ",", Ru(Rl, e), ",", Ru(Dl, t), ",", Ru(Dl, e), ",", Ru(Pl, t), ",", Ru(Pl, e));
  }

  function Pu(n, t) {
    return (t[1] - n[1]) / (t[0] - n[0]);
  }

  function Uu(n) {
    for (var t = 0, e = n.length - 1, r = [], i = n[0], u = n[1], o = r[0] = Pu(i, u); ++t < e;) {
      r[t] = (o + (o = Pu(i = u, u = n[t + 1]))) / 2;
    }

    return r[t] = o, r;
  }

  function ju(n) {
    for (var t, e, r, i, u = [], o = Uu(n), a = -1, l = n.length - 1; ++a < l;) {
      t = Pu(n[a], n[a + 1]), xo(t) < Uo ? o[a] = o[a + 1] = 0 : (e = o[a] / t, r = o[a + 1] / t, i = e * e + r * r, i > 9 && (i = 3 * t / Math.sqrt(i), o[a] = i * e, o[a + 1] = i * r));
    }

    for (a = -1; ++a <= l;) {
      i = (n[Math.min(l, a + 1)][0] - n[Math.max(0, a - 1)][0]) / (6 * (1 + o[a] * o[a])), u.push([i || 0, o[a] * i || 0]);
    }

    return u;
  }

  function Fu(n) {
    return n.length < 3 ? xu(n) : n[0] + Au(n, ju(n));
  }

  function Hu(n) {
    for (var t, e, r, i = -1, u = n.length; ++i < u;) {
      t = n[i], e = t[0], r = t[1] - Io, t[0] = e * Math.cos(r), t[1] = e * Math.sin(r);
    }

    return n;
  }

  function Ou(n) {
    function t(t) {
      function l() {
        v.push("M", a(n(y), s), f, c(n(d.reverse()), s), "Z");
      }

      for (var h, p, g, v = [], d = [], y = [], m = -1, M = t.length, x = En(e), b = En(i), _ = e === r ? function () {
        return p;
      } : En(r), w = i === u ? function () {
        return g;
      } : En(u); ++m < M;) {
        o.call(this, h = t[m], m) ? (d.push([p = +x.call(this, h, m), g = +b.call(this, h, m)]), y.push([+_.call(this, h, m), +w.call(this, h, m)])) : d.length && (l(), d = [], y = []);
      }

      return d.length && l(), v.length ? v.join("") : null;
    }

    var e = Ce,
        r = Ce,
        i = 0,
        u = ze,
        o = zt,
        a = xu,
        l = a.key,
        c = a,
        f = "L",
        s = .7;
    return t.x = function (n) {
      return arguments.length ? (e = r = n, t) : r;
    }, t.x0 = function (n) {
      return arguments.length ? (e = n, t) : e;
    }, t.x1 = function (n) {
      return arguments.length ? (r = n, t) : r;
    }, t.y = function (n) {
      return arguments.length ? (i = u = n, t) : u;
    }, t.y0 = function (n) {
      return arguments.length ? (i = n, t) : i;
    }, t.y1 = function (n) {
      return arguments.length ? (u = n, t) : u;
    }, t.defined = function (n) {
      return arguments.length ? (o = n, t) : o;
    }, t.interpolate = function (n) {
      return arguments.length ? (l = "function" == typeof n ? a = n : (a = Tl.get(n) || xu).key, c = a.reverse || a, f = a.closed ? "M" : "L", t) : l;
    }, t.tension = function (n) {
      return arguments.length ? (s = n, t) : s;
    }, t;
  }

  function Iu(n) {
    return n.radius;
  }

  function Yu(n) {
    return [n.x, n.y];
  }

  function Zu(n) {
    return function () {
      var t = n.apply(this, arguments),
          e = t[0],
          r = t[1] - Io;
      return [e * Math.cos(r), e * Math.sin(r)];
    };
  }

  function Vu() {
    return 64;
  }

  function Xu() {
    return "circle";
  }

  function $u(n) {
    var t = Math.sqrt(n / Fo);
    return "M0," + t + "A" + t + "," + t + " 0 1,1 0," + -t + "A" + t + "," + t + " 0 1,1 0," + t + "Z";
  }

  function Bu(n) {
    return function () {
      var t, e, r;
      (t = this[n]) && (r = t[e = t.active]) && (r.timer.c = null, r.timer.t = NaN, --t.count ? delete t[e] : delete this[n], t.active += .5, r.event && r.event.interrupt.call(this, this.__data__, r.index));
    };
  }

  function Wu(n, t, e) {
    return ko(n, Yl), n.namespace = t, n.id = e, n;
  }

  function Ju(n, t, e, r) {
    var i = n.id,
        u = n.namespace;
    return Y(n, "function" == typeof e ? function (n, o, a) {
      n[u][i].tween.set(t, r(e.call(n, n.__data__, o, a)));
    } : (e = r(e), function (n) {
      n[u][i].tween.set(t, e);
    }));
  }

  function Gu(n) {
    return null == n && (n = ""), function () {
      this.textContent = n;
    };
  }

  function Ku(n) {
    return null == n ? "__transition__" : "__transition_" + n + "__";
  }

  function Qu(n, t, e, r, i) {
    function u(n) {
      var t = v.delay;
      return f.t = t + l, n >= t ? o(n - t) : void (f.c = o);
    }

    function o(e) {
      var i = g.active,
          u = g[i];
      u && (u.timer.c = null, u.timer.t = NaN, --g.count, delete g[i], u.event && u.event.interrupt.call(n, n.__data__, u.index));

      for (var o in g) {
        if (r > +o) {
          var c = g[o];
          c.timer.c = null, c.timer.t = NaN, --g.count, delete g[o];
        }
      }

      f.c = a, qn(function () {
        return f.c && a(e || 1) && (f.c = null, f.t = NaN), 1;
      }, 0, l), g.active = r, v.event && v.event.start.call(n, n.__data__, t), p = [], v.tween.forEach(function (e, r) {
        (r = r.call(n, n.__data__, t)) && p.push(r);
      }), h = v.ease, s = v.duration;
    }

    function a(i) {
      for (var u = i / s, o = h(u), a = p.length; a > 0;) {
        p[--a].call(n, o);
      }

      return u >= 1 ? (v.event && v.event.end.call(n, n.__data__, t), --g.count ? delete g[r] : delete n[e], 1) : void 0;
    }

    var l,
        f,
        s,
        h,
        p,
        g = n[e] || (n[e] = {
      active: 0,
      count: 0
    }),
        v = g[r];
    v || (l = i.time, f = qn(u, 0, l), v = g[r] = {
      tween: new c(),
      time: l,
      timer: f,
      delay: i.delay,
      duration: i.duration,
      ease: i.ease,
      index: t
    }, i = null, ++g.count);
  }

  function no(n, t, e) {
    n.attr("transform", function (n) {
      var r = t(n);
      return "translate(" + (isFinite(r) ? r : e(n)) + ",0)";
    });
  }

  function to(n, t, e) {
    n.attr("transform", function (n) {
      var r = t(n);
      return "translate(0," + (isFinite(r) ? r : e(n)) + ")";
    });
  }

  function eo(n) {
    return n.toISOString();
  }

  function ro(n, t, e) {
    function r(t) {
      return n(t);
    }

    function i(n, e) {
      var r = n[1] - n[0],
          i = r / e,
          u = ao.bisect(Kl, i);
      return u == Kl.length ? [t.year, Ki(n.map(function (n) {
        return n / 31536e6;
      }), e)[2]] : u ? t[i / Kl[u - 1] < Kl[u] / i ? u - 1 : u] : [tc, Ki(n, e)[2]];
    }

    return r.invert = function (t) {
      return io(n.invert(t));
    }, r.domain = function (t) {
      return arguments.length ? (n.domain(t), r) : n.domain().map(io);
    }, r.nice = function (n, t) {
      function e(e) {
        return !isNaN(e) && !n.range(e, io(+e + 1), t).length;
      }

      var u = r.domain(),
          o = Yi(u),
          a = null == n ? i(o, 10) : "number" == typeof n && i(o, n);
      return a && (n = a[0], t = a[1]), r.domain(Xi(u, t > 1 ? {
        floor: function floor(t) {
          for (; e(t = n.floor(t));) {
            t = io(t - 1);
          }

          return t;
        },
        ceil: function ceil(t) {
          for (; e(t = n.ceil(t));) {
            t = io(+t + 1);
          }

          return t;
        }
      } : n));
    }, r.ticks = function (n, t) {
      var e = Yi(r.domain()),
          u = null == n ? i(e, 10) : "number" == typeof n ? i(e, n) : !n.range && [{
        range: n
      }, t];
      return u && (n = u[0], t = u[1]), n.range(e[0], io(+e[1] + 1), 1 > t ? 1 : t);
    }, r.tickFormat = function () {
      return e;
    }, r.copy = function () {
      return ro(n.copy(), t, e);
    }, Ji(r, n);
  }

  function io(n) {
    return new Date(n);
  }

  function uo(n) {
    return JSON.parse(n.responseText);
  }

  function oo(n) {
    var t = fo.createRange();
    return t.selectNode(fo.body), t.createContextualFragment(n.responseText);
  }

  var ao = {
    version: "3.5.17"
  },
      lo = [].slice,
      co = function co(n) {
    return lo.call(n);
  },
      fo = this.document;

  if (fo) try {
    co(fo.documentElement.childNodes)[0].nodeType;
  } catch (so) {
    co = function co(n) {
      for (var t = n.length, e = new Array(t); t--;) {
        e[t] = n[t];
      }

      return e;
    };
  }
  if (Date.now || (Date.now = function () {
    return +new Date();
  }), fo) try {
    fo.createElement("DIV").style.setProperty("opacity", 0, "");
  } catch (ho) {
    var po = this.Element.prototype,
        go = po.setAttribute,
        vo = po.setAttributeNS,
        yo = this.CSSStyleDeclaration.prototype,
        mo = yo.setProperty;
    po.setAttribute = function (n, t) {
      go.call(this, n, t + "");
    }, po.setAttributeNS = function (n, t, e) {
      vo.call(this, n, t, e + "");
    }, yo.setProperty = function (n, t, e) {
      mo.call(this, n, t + "", e);
    };
  }
  ao.ascending = e, ao.descending = function (n, t) {
    return n > t ? -1 : t > n ? 1 : t >= n ? 0 : NaN;
  }, ao.min = function (n, t) {
    var e,
        r,
        i = -1,
        u = n.length;

    if (1 === arguments.length) {
      for (; ++i < u;) {
        if (null != (r = n[i]) && r >= r) {
          e = r;
          break;
        }
      }

      for (; ++i < u;) {
        null != (r = n[i]) && e > r && (e = r);
      }
    } else {
      for (; ++i < u;) {
        if (null != (r = t.call(n, n[i], i)) && r >= r) {
          e = r;
          break;
        }
      }

      for (; ++i < u;) {
        null != (r = t.call(n, n[i], i)) && e > r && (e = r);
      }
    }

    return e;
  }, ao.max = function (n, t) {
    var e,
        r,
        i = -1,
        u = n.length;

    if (1 === arguments.length) {
      for (; ++i < u;) {
        if (null != (r = n[i]) && r >= r) {
          e = r;
          break;
        }
      }

      for (; ++i < u;) {
        null != (r = n[i]) && r > e && (e = r);
      }
    } else {
      for (; ++i < u;) {
        if (null != (r = t.call(n, n[i], i)) && r >= r) {
          e = r;
          break;
        }
      }

      for (; ++i < u;) {
        null != (r = t.call(n, n[i], i)) && r > e && (e = r);
      }
    }

    return e;
  }, ao.extent = function (n, t) {
    var e,
        r,
        i,
        u = -1,
        o = n.length;

    if (1 === arguments.length) {
      for (; ++u < o;) {
        if (null != (r = n[u]) && r >= r) {
          e = i = r;
          break;
        }
      }

      for (; ++u < o;) {
        null != (r = n[u]) && (e > r && (e = r), r > i && (i = r));
      }
    } else {
      for (; ++u < o;) {
        if (null != (r = t.call(n, n[u], u)) && r >= r) {
          e = i = r;
          break;
        }
      }

      for (; ++u < o;) {
        null != (r = t.call(n, n[u], u)) && (e > r && (e = r), r > i && (i = r));
      }
    }

    return [e, i];
  }, ao.sum = function (n, t) {
    var e,
        r = 0,
        u = n.length,
        o = -1;
    if (1 === arguments.length) for (; ++o < u;) {
      i(e = +n[o]) && (r += e);
    } else for (; ++o < u;) {
      i(e = +t.call(n, n[o], o)) && (r += e);
    }
    return r;
  }, ao.mean = function (n, t) {
    var e,
        u = 0,
        o = n.length,
        a = -1,
        l = o;
    if (1 === arguments.length) for (; ++a < o;) {
      i(e = r(n[a])) ? u += e : --l;
    } else for (; ++a < o;) {
      i(e = r(t.call(n, n[a], a))) ? u += e : --l;
    }
    return l ? u / l : void 0;
  }, ao.quantile = function (n, t) {
    var e = (n.length - 1) * t + 1,
        r = Math.floor(e),
        i = +n[r - 1],
        u = e - r;
    return u ? i + u * (n[r] - i) : i;
  }, ao.median = function (n, t) {
    var u,
        o = [],
        a = n.length,
        l = -1;
    if (1 === arguments.length) for (; ++l < a;) {
      i(u = r(n[l])) && o.push(u);
    } else for (; ++l < a;) {
      i(u = r(t.call(n, n[l], l))) && o.push(u);
    }
    return o.length ? ao.quantile(o.sort(e), .5) : void 0;
  }, ao.variance = function (n, t) {
    var e,
        u,
        o = n.length,
        a = 0,
        l = 0,
        c = -1,
        f = 0;
    if (1 === arguments.length) for (; ++c < o;) {
      i(e = r(n[c])) && (u = e - a, a += u / ++f, l += u * (e - a));
    } else for (; ++c < o;) {
      i(e = r(t.call(n, n[c], c))) && (u = e - a, a += u / ++f, l += u * (e - a));
    }
    return f > 1 ? l / (f - 1) : void 0;
  }, ao.deviation = function () {
    var n = ao.variance.apply(this, arguments);
    return n ? Math.sqrt(n) : n;
  };
  var Mo = u(e);
  ao.bisectLeft = Mo.left, ao.bisect = ao.bisectRight = Mo.right, ao.bisector = function (n) {
    return u(1 === n.length ? function (t, r) {
      return e(n(t), r);
    } : n);
  }, ao.shuffle = function (n, t, e) {
    (u = arguments.length) < 3 && (e = n.length, 2 > u && (t = 0));

    for (var r, i, u = e - t; u;) {
      i = Math.random() * u-- | 0, r = n[u + t], n[u + t] = n[i + t], n[i + t] = r;
    }

    return n;
  }, ao.permute = function (n, t) {
    for (var e = t.length, r = new Array(e); e--;) {
      r[e] = n[t[e]];
    }

    return r;
  }, ao.pairs = function (n) {
    for (var t, e = 0, r = n.length - 1, i = n[0], u = new Array(0 > r ? 0 : r); r > e;) {
      u[e] = [t = i, i = n[++e]];
    }

    return u;
  }, ao.transpose = function (n) {
    if (!(i = n.length)) return [];

    for (var t = -1, e = ao.min(n, o), r = new Array(e); ++t < e;) {
      for (var i, u = -1, a = r[t] = new Array(i); ++u < i;) {
        a[u] = n[u][t];
      }
    }

    return r;
  }, ao.zip = function () {
    return ao.transpose(arguments);
  }, ao.keys = function (n) {
    var t = [];

    for (var e in n) {
      t.push(e);
    }

    return t;
  }, ao.values = function (n) {
    var t = [];

    for (var e in n) {
      t.push(n[e]);
    }

    return t;
  }, ao.entries = function (n) {
    var t = [];

    for (var e in n) {
      t.push({
        key: e,
        value: n[e]
      });
    }

    return t;
  }, ao.merge = function (n) {
    for (var t, e, r, i = n.length, u = -1, o = 0; ++u < i;) {
      o += n[u].length;
    }

    for (e = new Array(o); --i >= 0;) {
      for (r = n[i], t = r.length; --t >= 0;) {
        e[--o] = r[t];
      }
    }

    return e;
  };
  var xo = Math.abs;
  ao.range = function (n, t, e) {
    if (arguments.length < 3 && (e = 1, arguments.length < 2 && (t = n, n = 0)), (t - n) / e === 1 / 0) throw new Error("infinite range");
    var r,
        i = [],
        u = a(xo(e)),
        o = -1;
    if (n *= u, t *= u, e *= u, 0 > e) for (; (r = n + e * ++o) > t;) {
      i.push(r / u);
    } else for (; (r = n + e * ++o) < t;) {
      i.push(r / u);
    }
    return i;
  }, ao.map = function (n, t) {
    var e = new c();
    if (n instanceof c) n.forEach(function (n, t) {
      e.set(n, t);
    });else if (Array.isArray(n)) {
      var r,
          i = -1,
          u = n.length;
      if (1 === arguments.length) for (; ++i < u;) {
        e.set(i, n[i]);
      } else for (; ++i < u;) {
        e.set(t.call(n, r = n[i], i), r);
      }
    } else for (var o in n) {
      e.set(o, n[o]);
    }
    return e;
  };
  var bo = "__proto__",
      _o = "\x00";
  l(c, {
    has: h,
    get: function get(n) {
      return this._[f(n)];
    },
    set: function set(n, t) {
      return this._[f(n)] = t;
    },
    remove: p,
    keys: g,
    values: function values() {
      var n = [];

      for (var t in this._) {
        n.push(this._[t]);
      }

      return n;
    },
    entries: function entries() {
      var n = [];

      for (var t in this._) {
        n.push({
          key: s(t),
          value: this._[t]
        });
      }

      return n;
    },
    size: v,
    empty: d,
    forEach: function forEach(n) {
      for (var t in this._) {
        n.call(this, s(t), this._[t]);
      }
    }
  }), ao.nest = function () {
    function n(t, o, a) {
      if (a >= u.length) return r ? r.call(i, o) : e ? o.sort(e) : o;

      for (var l, f, s, h, p = -1, g = o.length, v = u[a++], d = new c(); ++p < g;) {
        (h = d.get(l = v(f = o[p]))) ? h.push(f) : d.set(l, [f]);
      }

      return t ? (f = t(), s = function s(e, r) {
        f.set(e, n(t, r, a));
      }) : (f = {}, s = function s(e, r) {
        f[e] = n(t, r, a);
      }), d.forEach(s), f;
    }

    function t(n, e) {
      if (e >= u.length) return n;
      var r = [],
          i = o[e++];
      return n.forEach(function (n, i) {
        r.push({
          key: n,
          values: t(i, e)
        });
      }), i ? r.sort(function (n, t) {
        return i(n.key, t.key);
      }) : r;
    }

    var e,
        r,
        i = {},
        u = [],
        o = [];
    return i.map = function (t, e) {
      return n(e, t, 0);
    }, i.entries = function (e) {
      return t(n(ao.map, e, 0), 0);
    }, i.key = function (n) {
      return u.push(n), i;
    }, i.sortKeys = function (n) {
      return o[u.length - 1] = n, i;
    }, i.sortValues = function (n) {
      return e = n, i;
    }, i.rollup = function (n) {
      return r = n, i;
    }, i;
  }, ao.set = function (n) {
    var t = new y();
    if (n) for (var e = 0, r = n.length; r > e; ++e) {
      t.add(n[e]);
    }
    return t;
  }, l(y, {
    has: h,
    add: function add(n) {
      return this._[f(n += "")] = !0, n;
    },
    remove: p,
    values: g,
    size: v,
    empty: d,
    forEach: function forEach(n) {
      for (var t in this._) {
        n.call(this, s(t));
      }
    }
  }), ao.behavior = {}, ao.rebind = function (n, t) {
    for (var e, r = 1, i = arguments.length; ++r < i;) {
      n[e = arguments[r]] = M(n, t, t[e]);
    }

    return n;
  };
  var wo = ["webkit", "ms", "moz", "Moz", "o", "O"];
  ao.dispatch = function () {
    for (var n = new _(), t = -1, e = arguments.length; ++t < e;) {
      n[arguments[t]] = w(n);
    }

    return n;
  }, _.prototype.on = function (n, t) {
    var e = n.indexOf("."),
        r = "";
    if (e >= 0 && (r = n.slice(e + 1), n = n.slice(0, e)), n) return arguments.length < 2 ? this[n].on(r) : this[n].on(r, t);

    if (2 === arguments.length) {
      if (null == t) for (n in this) {
        this.hasOwnProperty(n) && this[n].on(r, null);
      }
      return this;
    }
  }, ao.event = null, ao.requote = function (n) {
    return n.replace(So, "\\$&");
  };

  var So = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
      ko = {}.__proto__ ? function (n, t) {
    n.__proto__ = t;
  } : function (n, t) {
    for (var e in t) {
      n[e] = t[e];
    }
  },
      No = function No(n, t) {
    return t.querySelector(n);
  },
      Eo = function Eo(n, t) {
    return t.querySelectorAll(n);
  },
      _Ao = function Ao(n, t) {
    var e = n.matches || n[x(n, "matchesSelector")];
    return (_Ao = function Ao(n, t) {
      return e.call(n, t);
    })(n, t);
  };

  "function" == typeof Sizzle && (No = function No(n, t) {
    return Sizzle(n, t)[0] || null;
  }, Eo = Sizzle, _Ao = Sizzle.matchesSelector), ao.selection = function () {
    return ao.select(fo.documentElement);
  };
  var Co = ao.selection.prototype = [];
  Co.select = function (n) {
    var t,
        e,
        r,
        i,
        u = [];
    n = A(n);

    for (var o = -1, a = this.length; ++o < a;) {
      u.push(t = []), t.parentNode = (r = this[o]).parentNode;

      for (var l = -1, c = r.length; ++l < c;) {
        (i = r[l]) ? (t.push(e = n.call(i, i.__data__, l, o)), e && "__data__" in i && (e.__data__ = i.__data__)) : t.push(null);
      }
    }

    return E(u);
  }, Co.selectAll = function (n) {
    var t,
        e,
        r = [];
    n = C(n);

    for (var i = -1, u = this.length; ++i < u;) {
      for (var o = this[i], a = -1, l = o.length; ++a < l;) {
        (e = o[a]) && (r.push(t = co(n.call(e, e.__data__, a, i))), t.parentNode = e);
      }
    }

    return E(r);
  };
  var zo = "http://www.w3.org/1999/xhtml",
      Lo = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: zo,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  ao.ns = {
    prefix: Lo,
    qualify: function qualify(n) {
      var t = n.indexOf(":"),
          e = n;
      return t >= 0 && "xmlns" !== (e = n.slice(0, t)) && (n = n.slice(t + 1)), Lo.hasOwnProperty(e) ? {
        space: Lo[e],
        local: n
      } : n;
    }
  }, Co.attr = function (n, t) {
    if (arguments.length < 2) {
      if ("string" == typeof n) {
        var e = this.node();
        return n = ao.ns.qualify(n), n.local ? e.getAttributeNS(n.space, n.local) : e.getAttribute(n);
      }

      for (t in n) {
        this.each(z(t, n[t]));
      }

      return this;
    }

    return this.each(z(n, t));
  }, Co.classed = function (n, t) {
    if (arguments.length < 2) {
      if ("string" == typeof n) {
        var e = this.node(),
            r = (n = T(n)).length,
            i = -1;

        if (t = e.classList) {
          for (; ++i < r;) {
            if (!t.contains(n[i])) return !1;
          }
        } else for (t = e.getAttribute("class"); ++i < r;) {
          if (!q(n[i]).test(t)) return !1;
        }

        return !0;
      }

      for (t in n) {
        this.each(R(t, n[t]));
      }

      return this;
    }

    return this.each(R(n, t));
  }, Co.style = function (n, e, r) {
    var i = arguments.length;

    if (3 > i) {
      if ("string" != typeof n) {
        2 > i && (e = "");

        for (r in n) {
          this.each(P(r, n[r], e));
        }

        return this;
      }

      if (2 > i) {
        var u = this.node();
        return t(u).getComputedStyle(u, null).getPropertyValue(n);
      }

      r = "";
    }

    return this.each(P(n, e, r));
  }, Co.property = function (n, t) {
    if (arguments.length < 2) {
      if ("string" == typeof n) return this.node()[n];

      for (t in n) {
        this.each(U(t, n[t]));
      }

      return this;
    }

    return this.each(U(n, t));
  }, Co.text = function (n) {
    return arguments.length ? this.each("function" == typeof n ? function () {
      var t = n.apply(this, arguments);
      this.textContent = null == t ? "" : t;
    } : null == n ? function () {
      this.textContent = "";
    } : function () {
      this.textContent = n;
    }) : this.node().textContent;
  }, Co.html = function (n) {
    return arguments.length ? this.each("function" == typeof n ? function () {
      var t = n.apply(this, arguments);
      this.innerHTML = null == t ? "" : t;
    } : null == n ? function () {
      this.innerHTML = "";
    } : function () {
      this.innerHTML = n;
    }) : this.node().innerHTML;
  }, Co.append = function (n) {
    return n = j(n), this.select(function () {
      return this.appendChild(n.apply(this, arguments));
    });
  }, Co.insert = function (n, t) {
    return n = j(n), t = A(t), this.select(function () {
      return this.insertBefore(n.apply(this, arguments), t.apply(this, arguments) || null);
    });
  }, Co.remove = function () {
    return this.each(F);
  }, Co.data = function (n, t) {
    function e(n, e) {
      var r,
          i,
          u,
          o = n.length,
          s = e.length,
          h = Math.min(o, s),
          p = new Array(s),
          g = new Array(s),
          v = new Array(o);

      if (t) {
        var d,
            y = new c(),
            m = new Array(o);

        for (r = -1; ++r < o;) {
          (i = n[r]) && (y.has(d = t.call(i, i.__data__, r)) ? v[r] = i : y.set(d, i), m[r] = d);
        }

        for (r = -1; ++r < s;) {
          (i = y.get(d = t.call(e, u = e[r], r))) ? i !== !0 && (p[r] = i, i.__data__ = u) : g[r] = H(u), y.set(d, !0);
        }

        for (r = -1; ++r < o;) {
          r in m && y.get(m[r]) !== !0 && (v[r] = n[r]);
        }
      } else {
        for (r = -1; ++r < h;) {
          i = n[r], u = e[r], i ? (i.__data__ = u, p[r] = i) : g[r] = H(u);
        }

        for (; s > r; ++r) {
          g[r] = H(e[r]);
        }

        for (; o > r; ++r) {
          v[r] = n[r];
        }
      }

      g.update = p, g.parentNode = p.parentNode = v.parentNode = n.parentNode, a.push(g), l.push(p), f.push(v);
    }

    var r,
        i,
        u = -1,
        o = this.length;

    if (!arguments.length) {
      for (n = new Array(o = (r = this[0]).length); ++u < o;) {
        (i = r[u]) && (n[u] = i.__data__);
      }

      return n;
    }

    var a = Z([]),
        l = E([]),
        f = E([]);
    if ("function" == typeof n) for (; ++u < o;) {
      e(r = this[u], n.call(r, r.parentNode.__data__, u));
    } else for (; ++u < o;) {
      e(r = this[u], n);
    }
    return l.enter = function () {
      return a;
    }, l.exit = function () {
      return f;
    }, l;
  }, Co.datum = function (n) {
    return arguments.length ? this.property("__data__", n) : this.property("__data__");
  }, Co.filter = function (n) {
    var t,
        e,
        r,
        i = [];
    "function" != typeof n && (n = O(n));

    for (var u = 0, o = this.length; o > u; u++) {
      i.push(t = []), t.parentNode = (e = this[u]).parentNode;

      for (var a = 0, l = e.length; l > a; a++) {
        (r = e[a]) && n.call(r, r.__data__, a, u) && t.push(r);
      }
    }

    return E(i);
  }, Co.order = function () {
    for (var n = -1, t = this.length; ++n < t;) {
      for (var e, r = this[n], i = r.length - 1, u = r[i]; --i >= 0;) {
        (e = r[i]) && (u && u !== e.nextSibling && u.parentNode.insertBefore(e, u), u = e);
      }
    }

    return this;
  }, Co.sort = function (n) {
    n = I.apply(this, arguments);

    for (var t = -1, e = this.length; ++t < e;) {
      this[t].sort(n);
    }

    return this.order();
  }, Co.each = function (n) {
    return Y(this, function (t, e, r) {
      n.call(t, t.__data__, e, r);
    });
  }, Co.call = function (n) {
    var t = co(arguments);
    return n.apply(t[0] = this, t), this;
  }, Co.empty = function () {
    return !this.node();
  }, Co.node = function () {
    for (var n = 0, t = this.length; t > n; n++) {
      for (var e = this[n], r = 0, i = e.length; i > r; r++) {
        var u = e[r];
        if (u) return u;
      }
    }

    return null;
  }, Co.size = function () {
    var n = 0;
    return Y(this, function () {
      ++n;
    }), n;
  };
  var qo = [];
  ao.selection.enter = Z, ao.selection.enter.prototype = qo, qo.append = Co.append, qo.empty = Co.empty, qo.node = Co.node, qo.call = Co.call, qo.size = Co.size, qo.select = function (n) {
    for (var t, e, r, i, u, o = [], a = -1, l = this.length; ++a < l;) {
      r = (i = this[a]).update, o.push(t = []), t.parentNode = i.parentNode;

      for (var c = -1, f = i.length; ++c < f;) {
        (u = i[c]) ? (t.push(r[c] = e = n.call(i.parentNode, u.__data__, c, a)), e.__data__ = u.__data__) : t.push(null);
      }
    }

    return E(o);
  }, qo.insert = function (n, t) {
    return arguments.length < 2 && (t = V(this)), Co.insert.call(this, n, t);
  }, ao.select = function (t) {
    var e;
    return "string" == typeof t ? (e = [No(t, fo)], e.parentNode = fo.documentElement) : (e = [t], e.parentNode = n(t)), E([e]);
  }, ao.selectAll = function (n) {
    var t;
    return "string" == typeof n ? (t = co(Eo(n, fo)), t.parentNode = fo.documentElement) : (t = co(n), t.parentNode = null), E([t]);
  }, Co.on = function (n, t, e) {
    var r = arguments.length;

    if (3 > r) {
      if ("string" != typeof n) {
        2 > r && (t = !1);

        for (e in n) {
          this.each(X(e, n[e], t));
        }

        return this;
      }

      if (2 > r) return (r = this.node()["__on" + n]) && r._;
      e = !1;
    }

    return this.each(X(n, t, e));
  };
  var To = ao.map({
    mouseenter: "mouseover",
    mouseleave: "mouseout"
  });
  fo && To.forEach(function (n) {
    "on" + n in fo && To.remove(n);
  });
  var Ro,
      Do = 0;

  ao.mouse = function (n) {
    return J(n, k());
  };

  var Po = this.navigator && /WebKit/.test(this.navigator.userAgent) ? -1 : 0;
  ao.touch = function (n, t, e) {
    if (arguments.length < 3 && (e = t, t = k().changedTouches), t) for (var r, i = 0, u = t.length; u > i; ++i) {
      if ((r = t[i]).identifier === e) return J(n, r);
    }
  }, ao.behavior.drag = function () {
    function n() {
      this.on("mousedown.drag", u).on("touchstart.drag", o);
    }

    function e(n, t, e, u, o) {
      return function () {
        function a() {
          var n,
              e,
              r = t(h, v);
          r && (n = r[0] - M[0], e = r[1] - M[1], g |= n | e, M = r, p({
            type: "drag",
            x: r[0] + c[0],
            y: r[1] + c[1],
            dx: n,
            dy: e
          }));
        }

        function l() {
          t(h, v) && (y.on(u + d, null).on(o + d, null), m(g), p({
            type: "dragend"
          }));
        }

        var c,
            f = this,
            s = ao.event.target.correspondingElement || ao.event.target,
            h = f.parentNode,
            p = r.of(f, arguments),
            g = 0,
            v = n(),
            d = ".drag" + (null == v ? "" : "-" + v),
            y = ao.select(e(s)).on(u + d, a).on(o + d, l),
            m = W(s),
            M = t(h, v);
        i ? (c = i.apply(f, arguments), c = [c.x - M[0], c.y - M[1]]) : c = [0, 0], p({
          type: "dragstart"
        });
      };
    }

    var r = N(n, "drag", "dragstart", "dragend"),
        i = null,
        u = e(b, ao.mouse, t, "mousemove", "mouseup"),
        o = e(G, ao.touch, m, "touchmove", "touchend");
    return n.origin = function (t) {
      return arguments.length ? (i = t, n) : i;
    }, ao.rebind(n, r, "on");
  }, ao.touches = function (n, t) {
    return arguments.length < 2 && (t = k().touches), t ? co(t).map(function (t) {
      var e = J(n, t);
      return e.identifier = t.identifier, e;
    }) : [];
  };
  var Uo = 1e-6,
      jo = Uo * Uo,
      Fo = Math.PI,
      Ho = 2 * Fo,
      Oo = Ho - Uo,
      Io = Fo / 2,
      Yo = Fo / 180,
      Zo = 180 / Fo,
      Vo = Math.SQRT2,
      Xo = 2,
      $o = 4;
  ao.interpolateZoom = function (n, t) {
    var e,
        r,
        i = n[0],
        u = n[1],
        o = n[2],
        a = t[0],
        l = t[1],
        c = t[2],
        f = a - i,
        s = l - u,
        h = f * f + s * s;
    if (jo > h) r = Math.log(c / o) / Vo, e = function e(n) {
      return [i + n * f, u + n * s, o * Math.exp(Vo * n * r)];
    };else {
      var p = Math.sqrt(h),
          g = (c * c - o * o + $o * h) / (2 * o * Xo * p),
          v = (c * c - o * o - $o * h) / (2 * c * Xo * p),
          d = Math.log(Math.sqrt(g * g + 1) - g),
          y = Math.log(Math.sqrt(v * v + 1) - v);
      r = (y - d) / Vo, e = function e(n) {
        var t = n * r,
            e = rn(d),
            a = o / (Xo * p) * (e * un(Vo * t + d) - en(d));
        return [i + a * f, u + a * s, o * e / rn(Vo * t + d)];
      };
    }
    return e.duration = 1e3 * r, e;
  }, ao.behavior.zoom = function () {
    function n(n) {
      n.on(L, s).on(Wo + ".zoom", p).on("dblclick.zoom", g).on(R, h);
    }

    function e(n) {
      return [(n[0] - k.x) / k.k, (n[1] - k.y) / k.k];
    }

    function r(n) {
      return [n[0] * k.k + k.x, n[1] * k.k + k.y];
    }

    function i(n) {
      k.k = Math.max(A[0], Math.min(A[1], n));
    }

    function u(n, t) {
      t = r(t), k.x += n[0] - t[0], k.y += n[1] - t[1];
    }

    function o(t, e, r, o) {
      t.__chart__ = {
        x: k.x,
        y: k.y,
        k: k.k
      }, i(Math.pow(2, o)), u(d = e, r), t = ao.select(t), C > 0 && (t = t.transition().duration(C)), t.call(n.event);
    }

    function a() {
      b && b.domain(x.range().map(function (n) {
        return (n - k.x) / k.k;
      }).map(x.invert)), w && w.domain(_.range().map(function (n) {
        return (n - k.y) / k.k;
      }).map(_.invert));
    }

    function l(n) {
      z++ || n({
        type: "zoomstart"
      });
    }

    function c(n) {
      a(), n({
        type: "zoom",
        scale: k.k,
        translate: [k.x, k.y]
      });
    }

    function f(n) {
      --z || (n({
        type: "zoomend"
      }), d = null);
    }

    function s() {
      function n() {
        a = 1, u(ao.mouse(i), h), c(o);
      }

      function r() {
        s.on(q, null).on(T, null), p(a), f(o);
      }

      var i = this,
          o = D.of(i, arguments),
          a = 0,
          s = ao.select(t(i)).on(q, n).on(T, r),
          h = e(ao.mouse(i)),
          p = W(i);
      Il.call(i), l(o);
    }

    function h() {
      function n() {
        var n = ao.touches(g);
        return p = k.k, n.forEach(function (n) {
          n.identifier in d && (d[n.identifier] = e(n));
        }), n;
      }

      function t() {
        var t = ao.event.target;
        ao.select(t).on(x, r).on(b, a), _.push(t);

        for (var e = ao.event.changedTouches, i = 0, u = e.length; u > i; ++i) {
          d[e[i].identifier] = null;
        }

        var l = n(),
            c = Date.now();

        if (1 === l.length) {
          if (500 > c - M) {
            var f = l[0];
            o(g, f, d[f.identifier], Math.floor(Math.log(k.k) / Math.LN2) + 1), S();
          }

          M = c;
        } else if (l.length > 1) {
          var f = l[0],
              s = l[1],
              h = f[0] - s[0],
              p = f[1] - s[1];
          y = h * h + p * p;
        }
      }

      function r() {
        var n,
            t,
            e,
            r,
            o = ao.touches(g);
        Il.call(g);

        for (var a = 0, l = o.length; l > a; ++a, r = null) {
          if (e = o[a], r = d[e.identifier]) {
            if (t) break;
            n = e, t = r;
          }
        }

        if (r) {
          var f = (f = e[0] - n[0]) * f + (f = e[1] - n[1]) * f,
              s = y && Math.sqrt(f / y);
          n = [(n[0] + e[0]) / 2, (n[1] + e[1]) / 2], t = [(t[0] + r[0]) / 2, (t[1] + r[1]) / 2], i(s * p);
        }

        M = null, u(n, t), c(v);
      }

      function a() {
        if (ao.event.touches.length) {
          for (var t = ao.event.changedTouches, e = 0, r = t.length; r > e; ++e) {
            delete d[t[e].identifier];
          }

          for (var i in d) {
            return void n();
          }
        }

        ao.selectAll(_).on(m, null), w.on(L, s).on(R, h), N(), f(v);
      }

      var p,
          g = this,
          v = D.of(g, arguments),
          d = {},
          y = 0,
          m = ".zoom-" + ao.event.changedTouches[0].identifier,
          x = "touchmove" + m,
          b = "touchend" + m,
          _ = [],
          w = ao.select(g),
          N = W(g);
      t(), l(v), w.on(L, null).on(R, t);
    }

    function p() {
      var n = D.of(this, arguments);
      m ? clearTimeout(m) : (Il.call(this), v = e(d = y || ao.mouse(this)), l(n)), m = setTimeout(function () {
        m = null, f(n);
      }, 50), S(), i(Math.pow(2, .002 * Bo()) * k.k), u(d, v), c(n);
    }

    function g() {
      return;
      var n = ao.mouse(this),
          t = Math.log(k.k) / Math.LN2;
      o(this, n, e(n), ao.event.shiftKey ? Math.ceil(t) - 1 : Math.floor(t) + 1);
    }

    var v,
        d,
        y,
        m,
        M,
        x,
        b,
        _,
        w,
        k = {
      x: 0,
      y: 0,
      k: 1
    },
        E = [960, 500],
        A = Jo,
        C = 250,
        z = 0,
        L = "mousedown.zoom",
        q = "mousemove.zoom",
        T = "mouseup.zoom",
        R = "touchstart.zoom",
        D = N(n, "zoomstart", "zoom", "zoomend");

    return Wo || (Wo = "onwheel" in fo ? (Bo = function Bo() {
      return -ao.event.deltaY * (ao.event.deltaMode ? 120 : 1);
    }, "wheel") : "onmousewheel" in fo ? (Bo = function Bo() {
      return ao.event.wheelDelta;
    }, "mousewheel") : (Bo = function Bo() {
      return -ao.event.detail;
    }, "MozMousePixelScroll")), n.event = function (n) {
      n.each(function () {
        var n = D.of(this, arguments),
            t = k;
        Hl ? ao.select(this).transition().each("start.zoom", function () {
          k = this.__chart__ || {
            x: 0,
            y: 0,
            k: 1
          }, l(n);
        }).tween("zoom:zoom", function () {
          var e = E[0],
              r = E[1],
              i = d ? d[0] : e / 2,
              u = d ? d[1] : r / 2,
              o = ao.interpolateZoom([(i - k.x) / k.k, (u - k.y) / k.k, e / k.k], [(i - t.x) / t.k, (u - t.y) / t.k, e / t.k]);
          return function (t) {
            var r = o(t),
                a = e / r[2];
            this.__chart__ = k = {
              x: i - r[0] * a,
              y: u - r[1] * a,
              k: a
            }, c(n);
          };
        }).each("interrupt.zoom", function () {
          f(n);
        }).each("end.zoom", function () {
          f(n);
        }) : (this.__chart__ = k, l(n), c(n), f(n));
      });
    }, n.translate = function (t) {
      return arguments.length ? (k = {
        x: +t[0],
        y: +t[1],
        k: k.k
      }, a(), n) : [k.x, k.y];
    }, n.scale = function (t) {
      return arguments.length ? (k = {
        x: k.x,
        y: k.y,
        k: null
      }, i(+t), a(), n) : k.k;
    }, n.scaleExtent = function (t) {
      return arguments.length ? (A = null == t ? Jo : [+t[0], +t[1]], n) : A;
    }, n.center = function (t) {
      return arguments.length ? (y = t && [+t[0], +t[1]], n) : y;
    }, n.size = function (t) {
      return arguments.length ? (E = t && [+t[0], +t[1]], n) : E;
    }, n.duration = function (t) {
      return arguments.length ? (C = +t, n) : C;
    }, n.x = function (t) {
      return arguments.length ? (b = t, x = t.copy(), k = {
        x: 0,
        y: 0,
        k: 1
      }, n) : b;
    }, n.y = function (t) {
      return arguments.length ? (w = t, _ = t.copy(), k = {
        x: 0,
        y: 0,
        k: 1
      }, n) : w;
    }, ao.rebind(n, D, "on");
  };
  var Bo,
      Wo,
      Jo = [0, 1 / 0];
  ao.color = an, an.prototype.toString = function () {
    return this.rgb() + "";
  }, ao.hsl = ln;
  var Go = ln.prototype = new an();
  Go.brighter = function (n) {
    return n = Math.pow(.7, arguments.length ? n : 1), new ln(this.h, this.s, this.l / n);
  }, Go.darker = function (n) {
    return n = Math.pow(.7, arguments.length ? n : 1), new ln(this.h, this.s, n * this.l);
  }, Go.rgb = function () {
    return cn(this.h, this.s, this.l);
  }, ao.hcl = fn;
  var Ko = fn.prototype = new an();
  Ko.brighter = function (n) {
    return new fn(this.h, this.c, Math.min(100, this.l + Qo * (arguments.length ? n : 1)));
  }, Ko.darker = function (n) {
    return new fn(this.h, this.c, Math.max(0, this.l - Qo * (arguments.length ? n : 1)));
  }, Ko.rgb = function () {
    return sn(this.h, this.c, this.l).rgb();
  }, ao.lab = hn;
  var Qo = 18,
      na = .95047,
      ta = 1,
      ea = 1.08883,
      ra = hn.prototype = new an();
  ra.brighter = function (n) {
    return new hn(Math.min(100, this.l + Qo * (arguments.length ? n : 1)), this.a, this.b);
  }, ra.darker = function (n) {
    return new hn(Math.max(0, this.l - Qo * (arguments.length ? n : 1)), this.a, this.b);
  }, ra.rgb = function () {
    return pn(this.l, this.a, this.b);
  }, ao.rgb = mn;
  var ia = mn.prototype = new an();
  ia.brighter = function (n) {
    n = Math.pow(.7, arguments.length ? n : 1);
    var t = this.r,
        e = this.g,
        r = this.b,
        i = 30;
    return t || e || r ? (t && i > t && (t = i), e && i > e && (e = i), r && i > r && (r = i), new mn(Math.min(255, t / n), Math.min(255, e / n), Math.min(255, r / n))) : new mn(i, i, i);
  }, ia.darker = function (n) {
    return n = Math.pow(.7, arguments.length ? n : 1), new mn(n * this.r, n * this.g, n * this.b);
  }, ia.hsl = function () {
    return wn(this.r, this.g, this.b);
  }, ia.toString = function () {
    return "#" + bn(this.r) + bn(this.g) + bn(this.b);
  };
  var ua = ao.map({
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  });
  ua.forEach(function (n, t) {
    ua.set(n, Mn(t));
  }), ao.functor = En, ao.xhr = An(m), ao.dsv = function (n, t) {
    function e(n, e, u) {
      arguments.length < 3 && (u = e, e = null);
      var o = Cn(n, t, null == e ? r : i(e), u);
      return o.row = function (n) {
        return arguments.length ? o.response(null == (e = n) ? r : i(n)) : e;
      }, o;
    }

    function r(n) {
      return e.parse(n.responseText);
    }

    function i(n) {
      return function (t) {
        return e.parse(t.responseText, n);
      };
    }

    function u(t) {
      return t.map(o).join(n);
    }

    function o(n) {
      return a.test(n) ? '"' + n.replace(/\"/g, '""') + '"' : n;
    }

    var a = new RegExp('["' + n + "\n]"),
        l = n.charCodeAt(0);
    return e.parse = function (n, t) {
      var r;
      return e.parseRows(n, function (n, e) {
        if (r) return r(n, e - 1);
        var i = new Function("d", "return {" + n.map(function (n, t) {
          return JSON.stringify(n) + ": d[" + t + "]";
        }).join(",") + "}");
        r = t ? function (n, e) {
          return t(i(n), e);
        } : i;
      });
    }, e.parseRows = function (n, t) {
      function e() {
        if (f >= c) return o;
        if (i) return i = !1, u;
        var t = f;

        if (34 === n.charCodeAt(t)) {
          for (var e = t; e++ < c;) {
            if (34 === n.charCodeAt(e)) {
              if (34 !== n.charCodeAt(e + 1)) break;
              ++e;
            }
          }

          f = e + 2;
          var r = n.charCodeAt(e + 1);
          return 13 === r ? (i = !0, 10 === n.charCodeAt(e + 2) && ++f) : 10 === r && (i = !0), n.slice(t + 1, e).replace(/""/g, '"');
        }

        for (; c > f;) {
          var r = n.charCodeAt(f++),
              a = 1;
          if (10 === r) i = !0;else if (13 === r) i = !0, 10 === n.charCodeAt(f) && (++f, ++a);else if (r !== l) continue;
          return n.slice(t, f - a);
        }

        return n.slice(t);
      }

      for (var r, i, u = {}, o = {}, a = [], c = n.length, f = 0, s = 0; (r = e()) !== o;) {
        for (var h = []; r !== u && r !== o;) {
          h.push(r), r = e();
        }

        t && null == (h = t(h, s++)) || a.push(h);
      }

      return a;
    }, e.format = function (t) {
      if (Array.isArray(t[0])) return e.formatRows(t);
      var r = new y(),
          i = [];
      return t.forEach(function (n) {
        for (var t in n) {
          r.has(t) || i.push(r.add(t));
        }
      }), [i.map(o).join(n)].concat(t.map(function (t) {
        return i.map(function (n) {
          return o(t[n]);
        }).join(n);
      })).join("\n");
    }, e.formatRows = function (n) {
      return n.map(u).join("\n");
    }, e;
  }, ao.csv = ao.dsv(",", "text/csv"), ao.tsv = ao.dsv("	", "text/tab-separated-values");

  var oa,
      aa,
      la,
      ca,
      fa = this[x(this, "requestAnimationFrame")] || function (n) {
    setTimeout(n, 17);
  };

  ao.timer = function () {
    qn.apply(this, arguments);
  }, ao.timer.flush = function () {
    Rn(), Dn();
  }, ao.round = function (n, t) {
    return t ? Math.round(n * (t = Math.pow(10, t))) / t : Math.round(n);
  };
  var sa = ["y", "z", "a", "f", "p", "n", "\xb5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(Un);

  ao.formatPrefix = function (n, t) {
    var e = 0;
    return (n = +n) && (0 > n && (n *= -1), t && (n = ao.round(n, Pn(n, t))), e = 1 + Math.floor(1e-12 + Math.log(n) / Math.LN10), e = Math.max(-24, Math.min(24, 3 * Math.floor((e - 1) / 3)))), sa[8 + e / 3];
  };

  var ha = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
      pa = ao.map({
    b: function b(n) {
      return n.toString(2);
    },
    c: function c(n) {
      return String.fromCharCode(n);
    },
    o: function o(n) {
      return n.toString(8);
    },
    x: function x(n) {
      return n.toString(16);
    },
    X: function X(n) {
      return n.toString(16).toUpperCase();
    },
    g: function g(n, t) {
      return n.toPrecision(t);
    },
    e: function e(n, t) {
      return n.toExponential(t);
    },
    f: function f(n, t) {
      return n.toFixed(t);
    },
    r: function r(n, t) {
      return (n = ao.round(n, Pn(n, t))).toFixed(Math.max(0, Math.min(20, Pn(n * (1 + 1e-15), t))));
    }
  }),
      ga = ao.time = {},
      va = Date;
  Hn.prototype = {
    getDate: function getDate() {
      return this._.getUTCDate();
    },
    getDay: function getDay() {
      return this._.getUTCDay();
    },
    getFullYear: function getFullYear() {
      return this._.getUTCFullYear();
    },
    getHours: function getHours() {
      return this._.getUTCHours();
    },
    getMilliseconds: function getMilliseconds() {
      return this._.getUTCMilliseconds();
    },
    getMinutes: function getMinutes() {
      return this._.getUTCMinutes();
    },
    getMonth: function getMonth() {
      return this._.getUTCMonth();
    },
    getSeconds: function getSeconds() {
      return this._.getUTCSeconds();
    },
    getTime: function getTime() {
      return this._.getTime();
    },
    getTimezoneOffset: function getTimezoneOffset() {
      return 0;
    },
    valueOf: function valueOf() {
      return this._.valueOf();
    },
    setDate: function setDate() {
      da.setUTCDate.apply(this._, arguments);
    },
    setDay: function setDay() {
      da.setUTCDay.apply(this._, arguments);
    },
    setFullYear: function setFullYear() {
      da.setUTCFullYear.apply(this._, arguments);
    },
    setHours: function setHours() {
      da.setUTCHours.apply(this._, arguments);
    },
    setMilliseconds: function setMilliseconds() {
      da.setUTCMilliseconds.apply(this._, arguments);
    },
    setMinutes: function setMinutes() {
      da.setUTCMinutes.apply(this._, arguments);
    },
    setMonth: function setMonth() {
      da.setUTCMonth.apply(this._, arguments);
    },
    setSeconds: function setSeconds() {
      da.setUTCSeconds.apply(this._, arguments);
    },
    setTime: function setTime() {
      da.setTime.apply(this._, arguments);
    }
  };
  var da = Date.prototype;
  ga.year = On(function (n) {
    return n = ga.day(n), n.setMonth(0, 1), n;
  }, function (n, t) {
    n.setFullYear(n.getFullYear() + t);
  }, function (n) {
    return n.getFullYear();
  }), ga.years = ga.year.range, ga.years.utc = ga.year.utc.range, ga.day = On(function (n) {
    var t = new va(2e3, 0);
    return t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), t;
  }, function (n, t) {
    n.setDate(n.getDate() + t);
  }, function (n) {
    return n.getDate() - 1;
  }), ga.days = ga.day.range, ga.days.utc = ga.day.utc.range, ga.dayOfYear = function (n) {
    var t = ga.year(n);
    return Math.floor((n - t - 6e4 * (n.getTimezoneOffset() - t.getTimezoneOffset())) / 864e5);
  }, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function (n, t) {
    t = 7 - t;
    var e = ga[n] = On(function (n) {
      return (n = ga.day(n)).setDate(n.getDate() - (n.getDay() + t) % 7), n;
    }, function (n, t) {
      n.setDate(n.getDate() + 7 * Math.floor(t));
    }, function (n) {
      var e = ga.year(n).getDay();
      return Math.floor((ga.dayOfYear(n) + (e + t) % 7) / 7) - (e !== t);
    });
    ga[n + "s"] = e.range, ga[n + "s"].utc = e.utc.range, ga[n + "OfYear"] = function (n) {
      var e = ga.year(n).getDay();
      return Math.floor((ga.dayOfYear(n) + (e + t) % 7) / 7);
    };
  }), ga.week = ga.sunday, ga.weeks = ga.sunday.range, ga.weeks.utc = ga.sunday.utc.range, ga.weekOfYear = ga.sundayOfYear;
  var ya = {
    "-": "",
    _: " ",
    0: "0"
  },
      ma = /^\s*\d+/,
      Ma = /^%/;

  ao.locale = function (n) {
    return {
      numberFormat: jn(n),
      timeFormat: Yn(n)
    };
  };

  var xa = ao.locale({
    decimal: ".",
    thousands: ",",
    grouping: [3],
    currency: ["$", ""],
    dateTime: "%a %b %e %X %Y",
    date: "%m/%d/%Y",
    time: "%H:%M:%S",
    periods: ["AM", "PM"],
    days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  });
  ao.format = xa.numberFormat, ao.geo = {}, ft.prototype = {
    s: 0,
    t: 0,
    add: function add(n) {
      st(n, this.t, ba), st(ba.s, this.s, this), this.s ? this.t += ba.t : this.s = ba.t;
    },
    reset: function reset() {
      this.s = this.t = 0;
    },
    valueOf: function valueOf() {
      return this.s;
    }
  };
  var ba = new ft();

  ao.geo.stream = function (n, t) {
    n && _a.hasOwnProperty(n.type) ? _a[n.type](n, t) : ht(n, t);
  };

  var _a = {
    Feature: function Feature(n, t) {
      ht(n.geometry, t);
    },
    FeatureCollection: function FeatureCollection(n, t) {
      for (var e = n.features, r = -1, i = e.length; ++r < i;) {
        ht(e[r].geometry, t);
      }
    }
  },
      wa = {
    Sphere: function Sphere(n, t) {
      t.sphere();
    },
    Point: function Point(n, t) {
      n = n.coordinates, t.point(n[0], n[1], n[2]);
    },
    MultiPoint: function MultiPoint(n, t) {
      for (var e = n.coordinates, r = -1, i = e.length; ++r < i;) {
        n = e[r], t.point(n[0], n[1], n[2]);
      }
    },
    LineString: function LineString(n, t) {
      pt(n.coordinates, t, 0);
    },
    MultiLineString: function MultiLineString(n, t) {
      for (var e = n.coordinates, r = -1, i = e.length; ++r < i;) {
        pt(e[r], t, 0);
      }
    },
    Polygon: function Polygon(n, t) {
      gt(n.coordinates, t);
    },
    MultiPolygon: function MultiPolygon(n, t) {
      for (var e = n.coordinates, r = -1, i = e.length; ++r < i;) {
        gt(e[r], t);
      }
    },
    GeometryCollection: function GeometryCollection(n, t) {
      for (var e = n.geometries, r = -1, i = e.length; ++r < i;) {
        ht(e[r], t);
      }
    }
  };

  ao.geo.area = function (n) {
    return Sa = 0, ao.geo.stream(n, Na), Sa;
  };

  var Sa,
      ka = new ft(),
      Na = {
    sphere: function sphere() {
      Sa += 4 * Fo;
    },
    point: b,
    lineStart: b,
    lineEnd: b,
    polygonStart: function polygonStart() {
      ka.reset(), Na.lineStart = vt;
    },
    polygonEnd: function polygonEnd() {
      var n = 2 * ka;
      Sa += 0 > n ? 4 * Fo + n : n, Na.lineStart = Na.lineEnd = Na.point = b;
    }
  };
  ao.geo.bounds = function () {
    function n(n, t) {
      M.push(x = [f = n, h = n]), s > t && (s = t), t > p && (p = t);
    }

    function t(t, e) {
      var r = dt([t * Yo, e * Yo]);

      if (y) {
        var i = mt(y, r),
            u = [i[1], -i[0], 0],
            o = mt(u, i);
        bt(o), o = _t(o);
        var l = t - g,
            c = l > 0 ? 1 : -1,
            v = o[0] * Zo * c,
            d = xo(l) > 180;

        if (d ^ (v > c * g && c * t > v)) {
          var m = o[1] * Zo;
          m > p && (p = m);
        } else if (v = (v + 360) % 360 - 180, d ^ (v > c * g && c * t > v)) {
          var m = -o[1] * Zo;
          s > m && (s = m);
        } else s > e && (s = e), e > p && (p = e);

        d ? g > t ? a(f, t) > a(f, h) && (h = t) : a(t, h) > a(f, h) && (f = t) : h >= f ? (f > t && (f = t), t > h && (h = t)) : t > g ? a(f, t) > a(f, h) && (h = t) : a(t, h) > a(f, h) && (f = t);
      } else n(t, e);

      y = r, g = t;
    }

    function e() {
      b.point = t;
    }

    function r() {
      x[0] = f, x[1] = h, b.point = n, y = null;
    }

    function i(n, e) {
      if (y) {
        var r = n - g;
        m += xo(r) > 180 ? r + (r > 0 ? 360 : -360) : r;
      } else v = n, d = e;

      Na.point(n, e), t(n, e);
    }

    function u() {
      Na.lineStart();
    }

    function o() {
      i(v, d), Na.lineEnd(), xo(m) > Uo && (f = -(h = 180)), x[0] = f, x[1] = h, y = null;
    }

    function a(n, t) {
      return (t -= n) < 0 ? t + 360 : t;
    }

    function l(n, t) {
      return n[0] - t[0];
    }

    function c(n, t) {
      return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n;
    }

    var f,
        s,
        h,
        p,
        g,
        v,
        d,
        y,
        m,
        M,
        x,
        b = {
      point: n,
      lineStart: e,
      lineEnd: r,
      polygonStart: function polygonStart() {
        b.point = i, b.lineStart = u, b.lineEnd = o, m = 0, Na.polygonStart();
      },
      polygonEnd: function polygonEnd() {
        Na.polygonEnd(), b.point = n, b.lineStart = e, b.lineEnd = r, 0 > ka ? (f = -(h = 180), s = -(p = 90)) : m > Uo ? p = 90 : -Uo > m && (s = -90), x[0] = f, x[1] = h;
      }
    };
    return function (n) {
      p = h = -(f = s = 1 / 0), M = [], ao.geo.stream(n, b);
      var t = M.length;

      if (t) {
        M.sort(l);

        for (var e, r = 1, i = M[0], u = [i]; t > r; ++r) {
          e = M[r], c(e[0], i) || c(e[1], i) ? (a(i[0], e[1]) > a(i[0], i[1]) && (i[1] = e[1]), a(e[0], i[1]) > a(i[0], i[1]) && (i[0] = e[0])) : u.push(i = e);
        }

        for (var o, e, g = -(1 / 0), t = u.length - 1, r = 0, i = u[t]; t >= r; i = e, ++r) {
          e = u[r], (o = a(i[1], e[0])) > g && (g = o, f = e[0], h = i[1]);
        }
      }

      return M = x = null, f === 1 / 0 || s === 1 / 0 ? [[NaN, NaN], [NaN, NaN]] : [[f, s], [h, p]];
    };
  }(), ao.geo.centroid = function (n) {
    Ea = Aa = Ca = za = La = qa = Ta = Ra = Da = Pa = Ua = 0, ao.geo.stream(n, ja);
    var t = Da,
        e = Pa,
        r = Ua,
        i = t * t + e * e + r * r;
    return jo > i && (t = qa, e = Ta, r = Ra, Uo > Aa && (t = Ca, e = za, r = La), i = t * t + e * e + r * r, jo > i) ? [NaN, NaN] : [Math.atan2(e, t) * Zo, tn(r / Math.sqrt(i)) * Zo];
  };
  var Ea,
      Aa,
      Ca,
      za,
      La,
      qa,
      Ta,
      Ra,
      Da,
      Pa,
      Ua,
      ja = {
    sphere: b,
    point: St,
    lineStart: Nt,
    lineEnd: Et,
    polygonStart: function polygonStart() {
      ja.lineStart = At;
    },
    polygonEnd: function polygonEnd() {
      ja.lineStart = Nt;
    }
  },
      Fa = Rt(zt, jt, Ht, [-Fo, -Fo / 2]),
      Ha = 1e9;
  ao.geo.clipExtent = function () {
    var n,
        t,
        e,
        r,
        i,
        u,
        o = {
      stream: function stream(n) {
        return i && (i.valid = !1), i = u(n), i.valid = !0, i;
      },
      extent: function extent(a) {
        return arguments.length ? (u = Zt(n = +a[0][0], t = +a[0][1], e = +a[1][0], r = +a[1][1]), i && (i.valid = !1, i = null), o) : [[n, t], [e, r]];
      }
    };
    return o.extent([[0, 0], [960, 500]]);
  }, (ao.geo.conicEqualArea = function () {
    return Vt(Xt);
  }).raw = Xt, ao.geo.albers = function () {
    return ao.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070);
  }, ao.geo.albersUsa = function () {
    function n(n) {
      var u = n[0],
          o = n[1];
      return t = null, e(u, o), t || (r(u, o), t) || i(u, o), t;
    }

    var t,
        e,
        r,
        i,
        u = ao.geo.albers(),
        o = ao.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
        a = ao.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
        l = {
      point: function point(n, e) {
        t = [n, e];
      }
    };
    return n.invert = function (n) {
      var t = u.scale(),
          e = u.translate(),
          r = (n[0] - e[0]) / t,
          i = (n[1] - e[1]) / t;
      return (i >= .12 && .234 > i && r >= -.425 && -.214 > r ? o : i >= .166 && .234 > i && r >= -.214 && -.115 > r ? a : u).invert(n);
    }, n.stream = function (n) {
      var t = u.stream(n),
          e = o.stream(n),
          r = a.stream(n);
      return {
        point: function point(n, i) {
          t.point(n, i), e.point(n, i), r.point(n, i);
        },
        sphere: function sphere() {
          t.sphere(), e.sphere(), r.sphere();
        },
        lineStart: function lineStart() {
          t.lineStart(), e.lineStart(), r.lineStart();
        },
        lineEnd: function lineEnd() {
          t.lineEnd(), e.lineEnd(), r.lineEnd();
        },
        polygonStart: function polygonStart() {
          t.polygonStart(), e.polygonStart(), r.polygonStart();
        },
        polygonEnd: function polygonEnd() {
          t.polygonEnd(), e.polygonEnd(), r.polygonEnd();
        }
      };
    }, n.precision = function (t) {
      return arguments.length ? (u.precision(t), o.precision(t), a.precision(t), n) : u.precision();
    }, n.scale = function (t) {
      return arguments.length ? (u.scale(t), o.scale(.35 * t), a.scale(t), n.translate(u.translate())) : u.scale();
    }, n.translate = function (t) {
      if (!arguments.length) return u.translate();
      var c = u.scale(),
          f = +t[0],
          s = +t[1];
      return e = u.translate(t).clipExtent([[f - .455 * c, s - .238 * c], [f + .455 * c, s + .238 * c]]).stream(l).point, r = o.translate([f - .307 * c, s + .201 * c]).clipExtent([[f - .425 * c + Uo, s + .12 * c + Uo], [f - .214 * c - Uo, s + .234 * c - Uo]]).stream(l).point, i = a.translate([f - .205 * c, s + .212 * c]).clipExtent([[f - .214 * c + Uo, s + .166 * c + Uo], [f - .115 * c - Uo, s + .234 * c - Uo]]).stream(l).point, n;
    }, n.scale(1070);
  };
  var Oa,
      Ia,
      Ya,
      Za,
      Va,
      Xa,
      $a = {
    point: b,
    lineStart: b,
    lineEnd: b,
    polygonStart: function polygonStart() {
      Ia = 0, $a.lineStart = $t;
    },
    polygonEnd: function polygonEnd() {
      $a.lineStart = $a.lineEnd = $a.point = b, Oa += xo(Ia / 2);
    }
  },
      Ba = {
    point: Bt,
    lineStart: b,
    lineEnd: b,
    polygonStart: b,
    polygonEnd: b
  },
      Wa = {
    point: Gt,
    lineStart: Kt,
    lineEnd: Qt,
    polygonStart: function polygonStart() {
      Wa.lineStart = ne;
    },
    polygonEnd: function polygonEnd() {
      Wa.point = Gt, Wa.lineStart = Kt, Wa.lineEnd = Qt;
    }
  };
  ao.geo.path = function () {
    function n(n) {
      return n && ("function" == typeof a && u.pointRadius(+a.apply(this, arguments)), o && o.valid || (o = i(u)), ao.geo.stream(n, o)), u.result();
    }

    function t() {
      return o = null, n;
    }

    var e,
        r,
        i,
        u,
        o,
        a = 4.5;
    return n.area = function (n) {
      return Oa = 0, ao.geo.stream(n, i($a)), Oa;
    }, n.centroid = function (n) {
      return Ca = za = La = qa = Ta = Ra = Da = Pa = Ua = 0, ao.geo.stream(n, i(Wa)), Ua ? [Da / Ua, Pa / Ua] : Ra ? [qa / Ra, Ta / Ra] : La ? [Ca / La, za / La] : [NaN, NaN];
    }, n.bounds = function (n) {
      return Va = Xa = -(Ya = Za = 1 / 0), ao.geo.stream(n, i(Ba)), [[Ya, Za], [Va, Xa]];
    }, n.projection = function (n) {
      return arguments.length ? (i = (e = n) ? n.stream || re(n) : m, t()) : e;
    }, n.context = function (n) {
      return arguments.length ? (u = null == (r = n) ? new Wt() : new te(n), "function" != typeof a && u.pointRadius(a), t()) : r;
    }, n.pointRadius = function (t) {
      return arguments.length ? (a = "function" == typeof t ? t : (u.pointRadius(+t), +t), n) : a;
    }, n.projection(ao.geo.albersUsa()).context(null);
  }, ao.geo.transform = function (n) {
    return {
      stream: function stream(t) {
        var e = new ie(t);

        for (var r in n) {
          e[r] = n[r];
        }

        return e;
      }
    };
  }, ie.prototype = {
    point: function point(n, t) {
      this.stream.point(n, t);
    },
    sphere: function sphere() {
      this.stream.sphere();
    },
    lineStart: function lineStart() {
      this.stream.lineStart();
    },
    lineEnd: function lineEnd() {
      this.stream.lineEnd();
    },
    polygonStart: function polygonStart() {
      this.stream.polygonStart();
    },
    polygonEnd: function polygonEnd() {
      this.stream.polygonEnd();
    }
  }, ao.geo.projection = oe, ao.geo.projectionMutator = ae, (ao.geo.equirectangular = function () {
    return oe(ce);
  }).raw = ce.invert = ce, ao.geo.rotation = function (n) {
    function t(t) {
      return t = n(t[0] * Yo, t[1] * Yo), t[0] *= Zo, t[1] *= Zo, t;
    }

    return n = se(n[0] % 360 * Yo, n[1] * Yo, n.length > 2 ? n[2] * Yo : 0), t.invert = function (t) {
      return t = n.invert(t[0] * Yo, t[1] * Yo), t[0] *= Zo, t[1] *= Zo, t;
    }, t;
  }, fe.invert = ce, ao.geo.circle = function () {
    function n() {
      var n = "function" == typeof r ? r.apply(this, arguments) : r,
          t = se(-n[0] * Yo, -n[1] * Yo, 0).invert,
          i = [];
      return e(null, null, 1, {
        point: function point(n, e) {
          i.push(n = t(n, e)), n[0] *= Zo, n[1] *= Zo;
        }
      }), {
        type: "Polygon",
        coordinates: [i]
      };
    }

    var t,
        e,
        r = [0, 0],
        i = 6;
    return n.origin = function (t) {
      return arguments.length ? (r = t, n) : r;
    }, n.angle = function (r) {
      return arguments.length ? (e = ve((t = +r) * Yo, i * Yo), n) : t;
    }, n.precision = function (r) {
      return arguments.length ? (e = ve(t * Yo, (i = +r) * Yo), n) : i;
    }, n.angle(90);
  }, ao.geo.distance = function (n, t) {
    var e,
        r = (t[0] - n[0]) * Yo,
        i = n[1] * Yo,
        u = t[1] * Yo,
        o = Math.sin(r),
        a = Math.cos(r),
        l = Math.sin(i),
        c = Math.cos(i),
        f = Math.sin(u),
        s = Math.cos(u);
    return Math.atan2(Math.sqrt((e = s * o) * e + (e = c * f - l * s * a) * e), l * f + c * s * a);
  }, ao.geo.graticule = function () {
    function n() {
      return {
        type: "MultiLineString",
        coordinates: t()
      };
    }

    function t() {
      return ao.range(Math.ceil(u / d) * d, i, d).map(h).concat(ao.range(Math.ceil(c / y) * y, l, y).map(p)).concat(ao.range(Math.ceil(r / g) * g, e, g).filter(function (n) {
        return xo(n % d) > Uo;
      }).map(f)).concat(ao.range(Math.ceil(a / v) * v, o, v).filter(function (n) {
        return xo(n % y) > Uo;
      }).map(s));
    }

    var e,
        r,
        i,
        u,
        o,
        a,
        l,
        c,
        f,
        s,
        h,
        p,
        g = 10,
        v = g,
        d = 90,
        y = 360,
        m = 2.5;
    return n.lines = function () {
      return t().map(function (n) {
        return {
          type: "LineString",
          coordinates: n
        };
      });
    }, n.outline = function () {
      return {
        type: "Polygon",
        coordinates: [h(u).concat(p(l).slice(1), h(i).reverse().slice(1), p(c).reverse().slice(1))]
      };
    }, n.extent = function (t) {
      return arguments.length ? n.majorExtent(t).minorExtent(t) : n.minorExtent();
    }, n.majorExtent = function (t) {
      return arguments.length ? (u = +t[0][0], i = +t[1][0], c = +t[0][1], l = +t[1][1], u > i && (t = u, u = i, i = t), c > l && (t = c, c = l, l = t), n.precision(m)) : [[u, c], [i, l]];
    }, n.minorExtent = function (t) {
      return arguments.length ? (r = +t[0][0], e = +t[1][0], a = +t[0][1], o = +t[1][1], r > e && (t = r, r = e, e = t), a > o && (t = a, a = o, o = t), n.precision(m)) : [[r, a], [e, o]];
    }, n.step = function (t) {
      return arguments.length ? n.majorStep(t).minorStep(t) : n.minorStep();
    }, n.majorStep = function (t) {
      return arguments.length ? (d = +t[0], y = +t[1], n) : [d, y];
    }, n.minorStep = function (t) {
      return arguments.length ? (g = +t[0], v = +t[1], n) : [g, v];
    }, n.precision = function (t) {
      return arguments.length ? (m = +t, f = ye(a, o, 90), s = me(r, e, m), h = ye(c, l, 90), p = me(u, i, m), n) : m;
    }, n.majorExtent([[-180, -90 + Uo], [180, 90 - Uo]]).minorExtent([[-180, -80 - Uo], [180, 80 + Uo]]);
  }, ao.geo.greatArc = function () {
    function n() {
      return {
        type: "LineString",
        coordinates: [t || r.apply(this, arguments), e || i.apply(this, arguments)]
      };
    }

    var t,
        e,
        r = Me,
        i = xe;
    return n.distance = function () {
      return ao.geo.distance(t || r.apply(this, arguments), e || i.apply(this, arguments));
    }, n.source = function (e) {
      return arguments.length ? (r = e, t = "function" == typeof e ? null : e, n) : r;
    }, n.target = function (t) {
      return arguments.length ? (i = t, e = "function" == typeof t ? null : t, n) : i;
    }, n.precision = function () {
      return arguments.length ? n : 0;
    }, n;
  }, ao.geo.interpolate = function (n, t) {
    return be(n[0] * Yo, n[1] * Yo, t[0] * Yo, t[1] * Yo);
  }, ao.geo.length = function (n) {
    return Ja = 0, ao.geo.stream(n, Ga), Ja;
  };
  var Ja,
      Ga = {
    sphere: b,
    point: b,
    lineStart: _e,
    lineEnd: b,
    polygonStart: b,
    polygonEnd: b
  },
      Ka = we(function (n) {
    return Math.sqrt(2 / (1 + n));
  }, function (n) {
    return 2 * Math.asin(n / 2);
  });
  (ao.geo.azimuthalEqualArea = function () {
    return oe(Ka);
  }).raw = Ka;
  var Qa = we(function (n) {
    var t = Math.acos(n);
    return t && t / Math.sin(t);
  }, m);
  (ao.geo.azimuthalEquidistant = function () {
    return oe(Qa);
  }).raw = Qa, (ao.geo.conicConformal = function () {
    return Vt(Se);
  }).raw = Se, (ao.geo.conicEquidistant = function () {
    return Vt(ke);
  }).raw = ke;
  var nl = we(function (n) {
    return 1 / n;
  }, Math.atan);
  (ao.geo.gnomonic = function () {
    return oe(nl);
  }).raw = nl, Ne.invert = function (n, t) {
    return [n, 2 * Math.atan(Math.exp(t)) - Io];
  }, (ao.geo.mercator = function () {
    return Ee(Ne);
  }).raw = Ne;
  var tl = we(function () {
    return 1;
  }, Math.asin);
  (ao.geo.orthographic = function () {
    return oe(tl);
  }).raw = tl;
  var el = we(function (n) {
    return 1 / (1 + n);
  }, function (n) {
    return 2 * Math.atan(n);
  });
  (ao.geo.stereographic = function () {
    return oe(el);
  }).raw = el, Ae.invert = function (n, t) {
    return [-t, 2 * Math.atan(Math.exp(n)) - Io];
  }, (ao.geo.transverseMercator = function () {
    var n = Ee(Ae),
        t = n.center,
        e = n.rotate;
    return n.center = function (n) {
      return n ? t([-n[1], n[0]]) : (n = t(), [n[1], -n[0]]);
    }, n.rotate = function (n) {
      return n ? e([n[0], n[1], n.length > 2 ? n[2] + 90 : 90]) : (n = e(), [n[0], n[1], n[2] - 90]);
    }, e([0, 0, 90]);
  }).raw = Ae, ao.geom = {}, ao.geom.hull = function (n) {
    function t(n) {
      if (n.length < 3) return [];
      var t,
          i = En(e),
          u = En(r),
          o = n.length,
          a = [],
          l = [];

      for (t = 0; o > t; t++) {
        a.push([+i.call(this, n[t], t), +u.call(this, n[t], t), t]);
      }

      for (a.sort(qe), t = 0; o > t; t++) {
        l.push([a[t][0], -a[t][1]]);
      }

      var c = Le(a),
          f = Le(l),
          s = f[0] === c[0],
          h = f[f.length - 1] === c[c.length - 1],
          p = [];

      for (t = c.length - 1; t >= 0; --t) {
        p.push(n[a[c[t]][2]]);
      }

      for (t = +s; t < f.length - h; ++t) {
        p.push(n[a[f[t]][2]]);
      }

      return p;
    }

    var e = Ce,
        r = ze;
    return arguments.length ? t(n) : (t.x = function (n) {
      return arguments.length ? (e = n, t) : e;
    }, t.y = function (n) {
      return arguments.length ? (r = n, t) : r;
    }, t);
  }, ao.geom.polygon = function (n) {
    return ko(n, rl), n;
  };
  var rl = ao.geom.polygon.prototype = [];
  rl.area = function () {
    for (var n, t = -1, e = this.length, r = this[e - 1], i = 0; ++t < e;) {
      n = r, r = this[t], i += n[1] * r[0] - n[0] * r[1];
    }

    return .5 * i;
  }, rl.centroid = function (n) {
    var t,
        e,
        r = -1,
        i = this.length,
        u = 0,
        o = 0,
        a = this[i - 1];

    for (arguments.length || (n = -1 / (6 * this.area())); ++r < i;) {
      t = a, a = this[r], e = t[0] * a[1] - a[0] * t[1], u += (t[0] + a[0]) * e, o += (t[1] + a[1]) * e;
    }

    return [u * n, o * n];
  }, rl.clip = function (n) {
    for (var t, e, r, i, u, o, a = De(n), l = -1, c = this.length - De(this), f = this[c - 1]; ++l < c;) {
      for (t = n.slice(), n.length = 0, i = this[l], u = t[(r = t.length - a) - 1], e = -1; ++e < r;) {
        o = t[e], Te(o, f, i) ? (Te(u, f, i) || n.push(Re(u, o, f, i)), n.push(o)) : Te(u, f, i) && n.push(Re(u, o, f, i)), u = o;
      }

      a && n.push(n[0]), f = i;
    }

    return n;
  };
  var il,
      ul,
      ol,
      al,
      ll,
      cl = [],
      fl = [];
  Ye.prototype.prepare = function () {
    for (var n, t = this.edges, e = t.length; e--;) {
      n = t[e].edge, n.b && n.a || t.splice(e, 1);
    }

    return t.sort(Ve), t.length;
  }, tr.prototype = {
    start: function start() {
      return this.edge.l === this.site ? this.edge.a : this.edge.b;
    },
    end: function end() {
      return this.edge.l === this.site ? this.edge.b : this.edge.a;
    }
  }, er.prototype = {
    insert: function insert(n, t) {
      var e, r, i;

      if (n) {
        if (t.P = n, t.N = n.N, n.N && (n.N.P = t), n.N = t, n.R) {
          for (n = n.R; n.L;) {
            n = n.L;
          }

          n.L = t;
        } else n.R = t;

        e = n;
      } else this._ ? (n = or(this._), t.P = null, t.N = n, n.P = n.L = t, e = n) : (t.P = t.N = null, this._ = t, e = null);

      for (t.L = t.R = null, t.U = e, t.C = !0, n = t; e && e.C;) {
        r = e.U, e === r.L ? (i = r.R, i && i.C ? (e.C = i.C = !1, r.C = !0, n = r) : (n === e.R && (ir(this, e), n = e, e = n.U), e.C = !1, r.C = !0, ur(this, r))) : (i = r.L, i && i.C ? (e.C = i.C = !1, r.C = !0, n = r) : (n === e.L && (ur(this, e), n = e, e = n.U), e.C = !1, r.C = !0, ir(this, r))), e = n.U;
      }

      this._.C = !1;
    },
    remove: function remove(n) {
      n.N && (n.N.P = n.P), n.P && (n.P.N = n.N), n.N = n.P = null;
      var t,
          e,
          r,
          i = n.U,
          u = n.L,
          o = n.R;

      if (e = u ? o ? or(o) : u : o, i ? i.L === n ? i.L = e : i.R = e : this._ = e, u && o ? (r = e.C, e.C = n.C, e.L = u, u.U = e, e !== o ? (i = e.U, e.U = n.U, n = e.R, i.L = n, e.R = o, o.U = e) : (e.U = i, i = e, n = e.R)) : (r = n.C, n = e), n && (n.U = i), !r) {
        if (n && n.C) return void (n.C = !1);

        do {
          if (n === this._) break;

          if (n === i.L) {
            if (t = i.R, t.C && (t.C = !1, i.C = !0, ir(this, i), t = i.R), t.L && t.L.C || t.R && t.R.C) {
              t.R && t.R.C || (t.L.C = !1, t.C = !0, ur(this, t), t = i.R), t.C = i.C, i.C = t.R.C = !1, ir(this, i), n = this._;
              break;
            }
          } else if (t = i.L, t.C && (t.C = !1, i.C = !0, ur(this, i), t = i.L), t.L && t.L.C || t.R && t.R.C) {
            t.L && t.L.C || (t.R.C = !1, t.C = !0, ir(this, t), t = i.L), t.C = i.C, i.C = t.L.C = !1, ur(this, i), n = this._;
            break;
          }

          t.C = !0, n = i, i = i.U;
        } while (!n.C);

        n && (n.C = !1);
      }
    }
  }, ao.geom.voronoi = function (n) {
    function t(n) {
      var t = new Array(n.length),
          r = a[0][0],
          i = a[0][1],
          u = a[1][0],
          o = a[1][1];
      return ar(e(n), a).cells.forEach(function (e, a) {
        var l = e.edges,
            c = e.site,
            f = t[a] = l.length ? l.map(function (n) {
          var t = n.start();
          return [t.x, t.y];
        }) : c.x >= r && c.x <= u && c.y >= i && c.y <= o ? [[r, o], [u, o], [u, i], [r, i]] : [];
        f.point = n[a];
      }), t;
    }

    function e(n) {
      return n.map(function (n, t) {
        return {
          x: Math.round(u(n, t) / Uo) * Uo,
          y: Math.round(o(n, t) / Uo) * Uo,
          i: t
        };
      });
    }

    var r = Ce,
        i = ze,
        u = r,
        o = i,
        a = sl;
    return n ? t(n) : (t.links = function (n) {
      return ar(e(n)).edges.filter(function (n) {
        return n.l && n.r;
      }).map(function (t) {
        return {
          source: n[t.l.i],
          target: n[t.r.i]
        };
      });
    }, t.triangles = function (n) {
      var t = [];
      return ar(e(n)).cells.forEach(function (e, r) {
        for (var i, u, o = e.site, a = e.edges.sort(Ve), l = -1, c = a.length, f = a[c - 1].edge, s = f.l === o ? f.r : f.l; ++l < c;) {
          i = f, u = s, f = a[l].edge, s = f.l === o ? f.r : f.l, r < u.i && r < s.i && cr(o, u, s) < 0 && t.push([n[r], n[u.i], n[s.i]]);
        }
      }), t;
    }, t.x = function (n) {
      return arguments.length ? (u = En(r = n), t) : r;
    }, t.y = function (n) {
      return arguments.length ? (o = En(i = n), t) : i;
    }, t.clipExtent = function (n) {
      return arguments.length ? (a = null == n ? sl : n, t) : a === sl ? null : a;
    }, t.size = function (n) {
      return arguments.length ? t.clipExtent(n && [[0, 0], n]) : a === sl ? null : a && a[1];
    }, t);
  };
  var sl = [[-1e6, -1e6], [1e6, 1e6]];
  ao.geom.delaunay = function (n) {
    return ao.geom.voronoi().triangles(n);
  }, ao.geom.quadtree = function (n, t, e, r, i) {
    function u(n) {
      function u(n, t, e, r, i, u, o, a) {
        if (!isNaN(e) && !isNaN(r)) if (n.leaf) {
          var l = n.x,
              f = n.y;
          if (null != l) {
            if (xo(l - e) + xo(f - r) < .01) c(n, t, e, r, i, u, o, a);else {
              var s = n.point;
              n.x = n.y = n.point = null, c(n, s, l, f, i, u, o, a), c(n, t, e, r, i, u, o, a);
            }
          } else n.x = e, n.y = r, n.point = t;
        } else c(n, t, e, r, i, u, o, a);
      }

      function c(n, t, e, r, i, o, a, l) {
        var c = .5 * (i + a),
            f = .5 * (o + l),
            s = e >= c,
            h = r >= f,
            p = h << 1 | s;
        n.leaf = !1, n = n.nodes[p] || (n.nodes[p] = hr()), s ? i = c : a = c, h ? o = f : l = f, u(n, t, e, r, i, o, a, l);
      }

      var f,
          s,
          h,
          p,
          g,
          v,
          d,
          y,
          m,
          M = En(a),
          x = En(l);
      if (null != t) v = t, d = e, y = r, m = i;else if (y = m = -(v = d = 1 / 0), s = [], h = [], g = n.length, o) for (p = 0; g > p; ++p) {
        f = n[p], f.x < v && (v = f.x), f.y < d && (d = f.y), f.x > y && (y = f.x), f.y > m && (m = f.y), s.push(f.x), h.push(f.y);
      } else for (p = 0; g > p; ++p) {
        var b = +M(f = n[p], p),
            _ = +x(f, p);

        v > b && (v = b), d > _ && (d = _), b > y && (y = b), _ > m && (m = _), s.push(b), h.push(_);
      }
      var w = y - v,
          S = m - d;
      w > S ? m = d + w : y = v + S;
      var k = hr();

      if (k.add = function (n) {
        u(k, n, +M(n, ++p), +x(n, p), v, d, y, m);
      }, k.visit = function (n) {
        pr(n, k, v, d, y, m);
      }, k.find = function (n) {
        return gr(k, n[0], n[1], v, d, y, m);
      }, p = -1, null == t) {
        for (; ++p < g;) {
          u(k, n[p], s[p], h[p], v, d, y, m);
        }

        --p;
      } else n.forEach(k.add);

      return s = h = n = f = null, k;
    }

    var o,
        a = Ce,
        l = ze;
    return (o = arguments.length) ? (a = fr, l = sr, 3 === o && (i = e, r = t, e = t = 0), u(n)) : (u.x = function (n) {
      return arguments.length ? (a = n, u) : a;
    }, u.y = function (n) {
      return arguments.length ? (l = n, u) : l;
    }, u.extent = function (n) {
      return arguments.length ? (null == n ? t = e = r = i = null : (t = +n[0][0], e = +n[0][1], r = +n[1][0], i = +n[1][1]), u) : null == t ? null : [[t, e], [r, i]];
    }, u.size = function (n) {
      return arguments.length ? (null == n ? t = e = r = i = null : (t = e = 0, r = +n[0], i = +n[1]), u) : null == t ? null : [r - t, i - e];
    }, u);
  }, ao.interpolateRgb = vr, ao.interpolateObject = dr, ao.interpolateNumber = yr, ao.interpolateString = mr;
  var hl = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
      pl = new RegExp(hl.source, "g");
  ao.interpolate = Mr, ao.interpolators = [function (n, t) {
    var e = _typeof(t);

    return ("string" === e ? ua.has(t.toLowerCase()) || /^(#|rgb\(|hsl\()/i.test(t) ? vr : mr : t instanceof an ? vr : Array.isArray(t) ? xr : "object" === e && isNaN(t) ? dr : yr)(n, t);
  }], ao.interpolateArray = xr;

  var gl = function gl() {
    return m;
  },
      vl = ao.map({
    linear: gl,
    poly: Er,
    quad: function quad() {
      return Sr;
    },
    cubic: function cubic() {
      return kr;
    },
    sin: function sin() {
      return Ar;
    },
    exp: function exp() {
      return Cr;
    },
    circle: function circle() {
      return zr;
    },
    elastic: Lr,
    back: qr,
    bounce: function bounce() {
      return Tr;
    }
  }),
      dl = ao.map({
    "in": m,
    out: _r,
    "in-out": wr,
    "out-in": function outIn(n) {
      return wr(_r(n));
    }
  });

  ao.ease = function (n) {
    var t = n.indexOf("-"),
        e = t >= 0 ? n.slice(0, t) : n,
        r = t >= 0 ? n.slice(t + 1) : "in";
    return e = vl.get(e) || gl, r = dl.get(r) || m, br(r(e.apply(null, lo.call(arguments, 1))));
  }, ao.interpolateHcl = Rr, ao.interpolateHsl = Dr, ao.interpolateLab = Pr, ao.interpolateRound = Ur, ao.transform = function (n) {
    var t = fo.createElementNS(ao.ns.prefix.svg, "g");
    return (ao.transform = function (n) {
      if (null != n) {
        t.setAttribute("transform", n);
        var e = t.transform.baseVal.consolidate();
      }

      return new jr(e ? e.matrix : yl);
    })(n);
  }, jr.prototype.toString = function () {
    return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")";
  };
  var yl = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
  };
  ao.interpolateTransform = $r, ao.layout = {}, ao.layout.bundle = function () {
    return function (n) {
      for (var t = [], e = -1, r = n.length; ++e < r;) {
        t.push(Jr(n[e]));
      }

      return t;
    };
  }, ao.layout.chord = function () {
    function n() {
      var n,
          c,
          s,
          h,
          p,
          g = {},
          v = [],
          d = ao.range(u),
          y = [];

      for (e = [], r = [], n = 0, h = -1; ++h < u;) {
        for (c = 0, p = -1; ++p < u;) {
          c += i[h][p];
        }

        v.push(c), y.push(ao.range(u)), n += c;
      }

      for (o && d.sort(function (n, t) {
        return o(v[n], v[t]);
      }), a && y.forEach(function (n, t) {
        n.sort(function (n, e) {
          return a(i[t][n], i[t][e]);
        });
      }), n = (Ho - f * u) / n, c = 0, h = -1; ++h < u;) {
        for (s = c, p = -1; ++p < u;) {
          var m = d[h],
              M = y[m][p],
              x = i[m][M],
              b = c,
              _ = c += x * n;

          g[m + "-" + M] = {
            index: m,
            subindex: M,
            startAngle: b,
            endAngle: _,
            value: x
          };
        }

        r[m] = {
          index: m,
          startAngle: s,
          endAngle: c,
          value: v[m]
        }, c += f;
      }

      for (h = -1; ++h < u;) {
        for (p = h - 1; ++p < u;) {
          var w = g[h + "-" + p],
              S = g[p + "-" + h];
          (w.value || S.value) && e.push(w.value < S.value ? {
            source: S,
            target: w
          } : {
            source: w,
            target: S
          });
        }
      }

      l && t();
    }

    function t() {
      e.sort(function (n, t) {
        return l((n.source.value + n.target.value) / 2, (t.source.value + t.target.value) / 2);
      });
    }

    var e,
        r,
        i,
        u,
        o,
        a,
        l,
        c = {},
        f = 0;
    return c.matrix = function (n) {
      return arguments.length ? (u = (i = n) && i.length, e = r = null, c) : i;
    }, c.padding = function (n) {
      return arguments.length ? (f = n, e = r = null, c) : f;
    }, c.sortGroups = function (n) {
      return arguments.length ? (o = n, e = r = null, c) : o;
    }, c.sortSubgroups = function (n) {
      return arguments.length ? (a = n, e = null, c) : a;
    }, c.sortChords = function (n) {
      return arguments.length ? (l = n, e && t(), c) : l;
    }, c.chords = function () {
      return e || n(), e;
    }, c.groups = function () {
      return r || n(), r;
    }, c;
  }, ao.layout.force = function () {
    function n(n) {
      return function (t, e, r, i) {
        if (t.point !== n) {
          var u = t.cx - n.x,
              o = t.cy - n.y,
              a = i - e,
              l = u * u + o * o;

          if (l > a * a / y) {
            if (v > l) {
              var c = t.charge / l;
              n.px -= u * c, n.py -= o * c;
            }

            return !0;
          }

          if (t.point && l && v > l) {
            var c = t.pointCharge / l;
            n.px -= u * c, n.py -= o * c;
          }
        }

        return !t.charge;
      };
    }

    function t(n) {
      n.px = ao.event.x, n.py = ao.event.y, l.resume();
    }

    var e,
        r,
        i,
        u,
        o,
        a,
        l = {},
        c = ao.dispatch("start", "tick", "end"),
        f = [1, 1],
        s = .9,
        h = ml,
        p = Ml,
        g = -30,
        v = xl,
        d = .1,
        y = .64,
        M = [],
        x = [];
    return l.tick = function () {
      if ((i *= .99) < .005) return e = null, c.end({
        type: "end",
        alpha: i = 0
      }), !0;
      var t,
          r,
          l,
          h,
          p,
          v,
          y,
          m,
          b,
          _ = M.length,
          w = x.length;

      for (r = 0; w > r; ++r) {
        l = x[r], h = l.source, p = l.target, m = p.x - h.x, b = p.y - h.y, (v = m * m + b * b) && (v = i * o[r] * ((v = Math.sqrt(v)) - u[r]) / v, m *= v, b *= v, p.x -= m * (y = h.weight + p.weight ? h.weight / (h.weight + p.weight) : .5), p.y -= b * y, h.x += m * (y = 1 - y), h.y += b * y);
      }

      if ((y = i * d) && (m = f[0] / 2, b = f[1] / 2, r = -1, y)) for (; ++r < _;) {
        l = M[r], l.x += (m - l.x) * y, l.y += (b - l.y) * y;
      }
      if (g) for (ri(t = ao.geom.quadtree(M), i, a), r = -1; ++r < _;) {
        (l = M[r]).fixed || t.visit(n(l));
      }

      for (r = -1; ++r < _;) {
        l = M[r], l.fixed ? (l.x = l.px, l.y = l.py) : (l.x -= (l.px - (l.px = l.x)) * s, l.y -= (l.py - (l.py = l.y)) * s);
      }

      c.tick({
        type: "tick",
        alpha: i
      });
    }, l.nodes = function (n) {
      return arguments.length ? (M = n, l) : M;
    }, l.links = function (n) {
      return arguments.length ? (x = n, l) : x;
    }, l.size = function (n) {
      return arguments.length ? (f = n, l) : f;
    }, l.linkDistance = function (n) {
      return arguments.length ? (h = "function" == typeof n ? n : +n, l) : h;
    }, l.distance = l.linkDistance, l.linkStrength = function (n) {
      return arguments.length ? (p = "function" == typeof n ? n : +n, l) : p;
    }, l.friction = function (n) {
      return arguments.length ? (s = +n, l) : s;
    }, l.charge = function (n) {
      return arguments.length ? (g = "function" == typeof n ? n : +n, l) : g;
    }, l.chargeDistance = function (n) {
      return arguments.length ? (v = n * n, l) : Math.sqrt(v);
    }, l.gravity = function (n) {
      return arguments.length ? (d = +n, l) : d;
    }, l.theta = function (n) {
      return arguments.length ? (y = n * n, l) : Math.sqrt(y);
    }, l.alpha = function (n) {
      return arguments.length ? (n = +n, i ? n > 0 ? i = n : (e.c = null, e.t = NaN, e = null, c.end({
        type: "end",
        alpha: i = 0
      })) : n > 0 && (c.start({
        type: "start",
        alpha: i = n
      }), e = qn(l.tick)), l) : i;
    }, l.start = function () {
      function n(n, r) {
        if (!e) {
          for (e = new Array(i), l = 0; i > l; ++l) {
            e[l] = [];
          }

          for (l = 0; c > l; ++l) {
            var u = x[l];
            e[u.source.index].push(u.target), e[u.target.index].push(u.source);
          }
        }

        for (var o, a = e[t], l = -1, f = a.length; ++l < f;) {
          if (!isNaN(o = a[l][n])) return o;
        }

        return Math.random() * r;
      }

      var t,
          e,
          r,
          i = M.length,
          c = x.length,
          s = f[0],
          v = f[1];

      for (t = 0; i > t; ++t) {
        (r = M[t]).index = t, r.weight = 0;
      }

      for (t = 0; c > t; ++t) {
        r = x[t], "number" == typeof r.source && (r.source = M[r.source]), "number" == typeof r.target && (r.target = M[r.target]), ++r.source.weight, ++r.target.weight;
      }

      for (t = 0; i > t; ++t) {
        r = M[t], isNaN(r.x) && (r.x = n("x", s)), isNaN(r.y) && (r.y = n("y", v)), isNaN(r.px) && (r.px = r.x), isNaN(r.py) && (r.py = r.y);
      }

      if (u = [], "function" == typeof h) for (t = 0; c > t; ++t) {
        u[t] = +h.call(this, x[t], t);
      } else for (t = 0; c > t; ++t) {
        u[t] = h;
      }
      if (o = [], "function" == typeof p) for (t = 0; c > t; ++t) {
        o[t] = +p.call(this, x[t], t);
      } else for (t = 0; c > t; ++t) {
        o[t] = p;
      }
      if (a = [], "function" == typeof g) for (t = 0; i > t; ++t) {
        a[t] = +g.call(this, M[t], t);
      } else for (t = 0; i > t; ++t) {
        a[t] = g;
      }
      return l.resume();
    }, l.resume = function () {
      return l.alpha(.1);
    }, l.stop = function () {
      return l.alpha(0);
    }, l.drag = function () {
      return r || (r = ao.behavior.drag().origin(m).on("dragstart.force", Qr).on("drag.force", t).on("dragend.force", ni)), arguments.length ? void this.on("mouseover.force", ti).on("mouseout.force", ei).call(r) : r;
    }, ao.rebind(l, c, "on");
  };
  var ml = 20,
      Ml = 1,
      xl = 1 / 0;
  ao.layout.hierarchy = function () {
    function n(i) {
      var u,
          o = [i],
          a = [];

      for (i.depth = 0; null != (u = o.pop());) {
        if (a.push(u), (c = e.call(n, u, u.depth)) && (l = c.length)) {
          for (var l, c, f; --l >= 0;) {
            o.push(f = c[l]), f.parent = u, f.depth = u.depth + 1;
          }

          r && (u.value = 0), u.children = c;
        } else r && (u.value = +r.call(n, u, u.depth) || 0), delete u.children;
      }

      return oi(i, function (n) {
        var e, i;
        t && (e = n.children) && e.sort(t), r && (i = n.parent) && (i.value += n.value);
      }), a;
    }

    var t = ci,
        e = ai,
        r = li;
    return n.sort = function (e) {
      return arguments.length ? (t = e, n) : t;
    }, n.children = function (t) {
      return arguments.length ? (e = t, n) : e;
    }, n.value = function (t) {
      return arguments.length ? (r = t, n) : r;
    }, n.revalue = function (t) {
      return r && (ui(t, function (n) {
        n.children && (n.value = 0);
      }), oi(t, function (t) {
        var e;
        t.children || (t.value = +r.call(n, t, t.depth) || 0), (e = t.parent) && (e.value += t.value);
      })), t;
    }, n;
  }, ao.layout.partition = function () {
    function n(t, e, r, i) {
      var u = t.children;

      if (t.x = e, t.y = t.depth * i, t.dx = r, t.dy = i, u && (o = u.length)) {
        var o,
            a,
            l,
            c = -1;

        for (r = t.value ? r / t.value : 0; ++c < o;) {
          n(a = u[c], e, l = a.value * r, i), e += l;
        }
      }
    }

    function t(n) {
      var e = n.children,
          r = 0;
      if (e && (i = e.length)) for (var i, u = -1; ++u < i;) {
        r = Math.max(r, t(e[u]));
      }
      return 1 + r;
    }

    function e(e, u) {
      var o = r.call(this, e, u);
      return n(o[0], 0, i[0], i[1] / t(o[0])), o;
    }

    var r = ao.layout.hierarchy(),
        i = [1, 1];
    return e.size = function (n) {
      return arguments.length ? (i = n, e) : i;
    }, ii(e, r);
  }, ao.layout.pie = function () {
    function n(o) {
      var a,
          l = o.length,
          c = o.map(function (e, r) {
        return +t.call(n, e, r);
      }),
          f = +("function" == typeof r ? r.apply(this, arguments) : r),
          s = ("function" == typeof i ? i.apply(this, arguments) : i) - f,
          h = Math.min(Math.abs(s) / l, +("function" == typeof u ? u.apply(this, arguments) : u)),
          p = h * (0 > s ? -1 : 1),
          g = ao.sum(c),
          v = g ? (s - l * p) / g : 0,
          d = ao.range(l),
          y = [];
      return null != e && d.sort(e === bl ? function (n, t) {
        return c[t] - c[n];
      } : function (n, t) {
        return e(o[n], o[t]);
      }), d.forEach(function (n) {
        y[n] = {
          data: o[n],
          value: a = c[n],
          startAngle: f,
          endAngle: f += a * v + p,
          padAngle: h
        };
      }), y;
    }

    var t = Number,
        e = bl,
        r = 0,
        i = Ho,
        u = 0;
    return n.value = function (e) {
      return arguments.length ? (t = e, n) : t;
    }, n.sort = function (t) {
      return arguments.length ? (e = t, n) : e;
    }, n.startAngle = function (t) {
      return arguments.length ? (r = t, n) : r;
    }, n.endAngle = function (t) {
      return arguments.length ? (i = t, n) : i;
    }, n.padAngle = function (t) {
      return arguments.length ? (u = t, n) : u;
    }, n;
  };
  var bl = {};

  ao.layout.stack = function () {
    function n(a, l) {
      if (!(h = a.length)) return a;
      var c = a.map(function (e, r) {
        return t.call(n, e, r);
      }),
          f = c.map(function (t) {
        return t.map(function (t, e) {
          return [u.call(n, t, e), o.call(n, t, e)];
        });
      }),
          s = e.call(n, f, l);
      c = ao.permute(c, s), f = ao.permute(f, s);
      var h,
          p,
          g,
          v,
          d = r.call(n, f, l),
          y = c[0].length;

      for (g = 0; y > g; ++g) {
        for (i.call(n, c[0][g], v = d[g], f[0][g][1]), p = 1; h > p; ++p) {
          i.call(n, c[p][g], v += f[p - 1][g][1], f[p][g][1]);
        }
      }

      return a;
    }

    var t = m,
        e = gi,
        r = vi,
        i = pi,
        u = si,
        o = hi;
    return n.values = function (e) {
      return arguments.length ? (t = e, n) : t;
    }, n.order = function (t) {
      return arguments.length ? (e = "function" == typeof t ? t : _l.get(t) || gi, n) : e;
    }, n.offset = function (t) {
      return arguments.length ? (r = "function" == typeof t ? t : wl.get(t) || vi, n) : r;
    }, n.x = function (t) {
      return arguments.length ? (u = t, n) : u;
    }, n.y = function (t) {
      return arguments.length ? (o = t, n) : o;
    }, n.out = function (t) {
      return arguments.length ? (i = t, n) : i;
    }, n;
  };

  var _l = ao.map({
    "inside-out": function insideOut(n) {
      var t,
          e,
          r = n.length,
          i = n.map(di),
          u = n.map(yi),
          o = ao.range(r).sort(function (n, t) {
        return i[n] - i[t];
      }),
          a = 0,
          l = 0,
          c = [],
          f = [];

      for (t = 0; r > t; ++t) {
        e = o[t], l > a ? (a += u[e], c.push(e)) : (l += u[e], f.push(e));
      }

      return f.reverse().concat(c);
    },
    reverse: function reverse(n) {
      return ao.range(n.length).reverse();
    },
    "default": gi
  }),
      wl = ao.map({
    silhouette: function silhouette(n) {
      var t,
          e,
          r,
          i = n.length,
          u = n[0].length,
          o = [],
          a = 0,
          l = [];

      for (e = 0; u > e; ++e) {
        for (t = 0, r = 0; i > t; t++) {
          r += n[t][e][1];
        }

        r > a && (a = r), o.push(r);
      }

      for (e = 0; u > e; ++e) {
        l[e] = (a - o[e]) / 2;
      }

      return l;
    },
    wiggle: function wiggle(n) {
      var t,
          e,
          r,
          i,
          u,
          o,
          a,
          l,
          c,
          f = n.length,
          s = n[0],
          h = s.length,
          p = [];

      for (p[0] = l = c = 0, e = 1; h > e; ++e) {
        for (t = 0, i = 0; f > t; ++t) {
          i += n[t][e][1];
        }

        for (t = 0, u = 0, a = s[e][0] - s[e - 1][0]; f > t; ++t) {
          for (r = 0, o = (n[t][e][1] - n[t][e - 1][1]) / (2 * a); t > r; ++r) {
            o += (n[r][e][1] - n[r][e - 1][1]) / a;
          }

          u += o * n[t][e][1];
        }

        p[e] = l -= i ? u / i * a : 0, c > l && (c = l);
      }

      for (e = 0; h > e; ++e) {
        p[e] -= c;
      }

      return p;
    },
    expand: function expand(n) {
      var t,
          e,
          r,
          i = n.length,
          u = n[0].length,
          o = 1 / i,
          a = [];

      for (e = 0; u > e; ++e) {
        for (t = 0, r = 0; i > t; t++) {
          r += n[t][e][1];
        }

        if (r) for (t = 0; i > t; t++) {
          n[t][e][1] /= r;
        } else for (t = 0; i > t; t++) {
          n[t][e][1] = o;
        }
      }

      for (e = 0; u > e; ++e) {
        a[e] = 0;
      }

      return a;
    },
    zero: vi
  });

  ao.layout.histogram = function () {
    function n(n, u) {
      for (var o, a, l = [], c = n.map(e, this), f = r.call(this, c, u), s = i.call(this, f, c, u), u = -1, h = c.length, p = s.length - 1, g = t ? 1 : 1 / h; ++u < p;) {
        o = l[u] = [], o.dx = s[u + 1] - (o.x = s[u]), o.y = 0;
      }

      if (p > 0) for (u = -1; ++u < h;) {
        a = c[u], a >= f[0] && a <= f[1] && (o = l[ao.bisect(s, a, 1, p) - 1], o.y += g, o.push(n[u]));
      }
      return l;
    }

    var t = !0,
        e = Number,
        r = bi,
        i = Mi;
    return n.value = function (t) {
      return arguments.length ? (e = t, n) : e;
    }, n.range = function (t) {
      return arguments.length ? (r = En(t), n) : r;
    }, n.bins = function (t) {
      return arguments.length ? (i = "number" == typeof t ? function (n) {
        return xi(n, t);
      } : En(t), n) : i;
    }, n.frequency = function (e) {
      return arguments.length ? (t = !!e, n) : t;
    }, n;
  }, ao.layout.pack = function () {
    function n(n, u) {
      var o = e.call(this, n, u),
          a = o[0],
          l = i[0],
          c = i[1],
          f = null == t ? Math.sqrt : "function" == typeof t ? t : function () {
        return t;
      };

      if (a.x = a.y = 0, oi(a, function (n) {
        n.r = +f(n.value);
      }), oi(a, Ni), r) {
        var s = r * (t ? 1 : Math.max(2 * a.r / l, 2 * a.r / c)) / 2;
        oi(a, function (n) {
          n.r += s;
        }), oi(a, Ni), oi(a, function (n) {
          n.r -= s;
        });
      }

      return Ci(a, l / 2, c / 2, t ? 1 : 1 / Math.max(2 * a.r / l, 2 * a.r / c)), o;
    }

    var t,
        e = ao.layout.hierarchy().sort(_i),
        r = 0,
        i = [1, 1];
    return n.size = function (t) {
      return arguments.length ? (i = t, n) : i;
    }, n.radius = function (e) {
      return arguments.length ? (t = null == e || "function" == typeof e ? e : +e, n) : t;
    }, n.padding = function (t) {
      return arguments.length ? (r = +t, n) : r;
    }, ii(n, e);
  }, ao.layout.tree = function () {
    function n(n, i) {
      var f = o.call(this, n, i),
          s = f[0],
          h = t(s);
      if (oi(h, e), h.parent.m = -h.z, ui(h, r), c) ui(s, u);else {
        var p = s,
            g = s,
            v = s;
        ui(s, function (n) {
          n.x < p.x && (p = n), n.x > g.x && (g = n), n.depth > v.depth && (v = n);
        });
        var d = a(p, g) / 2 - p.x,
            y = l[0] / (g.x + a(g, p) / 2 + d),
            m = l[1] / (v.depth || 1);
        ui(s, function (n) {
          n.x = (n.x + d) * y, n.y = n.depth * m;
        });
      }
      return f;
    }

    function t(n) {
      for (var t, e = {
        A: null,
        children: [n]
      }, r = [e]; null != (t = r.pop());) {
        for (var i, u = t.children, o = 0, a = u.length; a > o; ++o) {
          r.push((u[o] = i = {
            _: u[o],
            parent: t,
            children: (i = u[o].children) && i.slice() || [],
            A: null,
            a: null,
            z: 0,
            m: 0,
            c: 0,
            s: 0,
            t: null,
            i: o
          }).a = i);
        }
      }

      return e.children[0];
    }

    function e(n) {
      var t = n.children,
          e = n.parent.children,
          r = n.i ? e[n.i - 1] : null;

      if (t.length) {
        Di(n);
        var u = (t[0].z + t[t.length - 1].z) / 2;
        r ? (n.z = r.z + a(n._, r._), n.m = n.z - u) : n.z = u;
      } else r && (n.z = r.z + a(n._, r._));

      n.parent.A = i(n, r, n.parent.A || e[0]);
    }

    function r(n) {
      n._.x = n.z + n.parent.m, n.m += n.parent.m;
    }

    function i(n, t, e) {
      if (t) {
        for (var r, i = n, u = n, o = t, l = i.parent.children[0], c = i.m, f = u.m, s = o.m, h = l.m; o = Ti(o), i = qi(i), o && i;) {
          l = qi(l), u = Ti(u), u.a = n, r = o.z + s - i.z - c + a(o._, i._), r > 0 && (Ri(Pi(o, n, e), n, r), c += r, f += r), s += o.m, c += i.m, h += l.m, f += u.m;
        }

        o && !Ti(u) && (u.t = o, u.m += s - f), i && !qi(l) && (l.t = i, l.m += c - h, e = n);
      }

      return e;
    }

    function u(n) {
      n.x *= l[0], n.y = n.depth * l[1];
    }

    var o = ao.layout.hierarchy().sort(null).value(null),
        a = Li,
        l = [1, 1],
        c = null;
    return n.separation = function (t) {
      return arguments.length ? (a = t, n) : a;
    }, n.size = function (t) {
      return arguments.length ? (c = null == (l = t) ? u : null, n) : c ? null : l;
    }, n.nodeSize = function (t) {
      return arguments.length ? (c = null == (l = t) ? null : u, n) : c ? l : null;
    }, ii(n, o);
  }, ao.layout.cluster = function () {
    function n(n, u) {
      var o,
          a = t.call(this, n, u),
          l = a[0],
          c = 0;
      oi(l, function (n) {
        var t = n.children;
        t && t.length ? (n.x = ji(t), n.y = Ui(t)) : (n.x = o ? c += e(n, o) : 0, n.y = 0, o = n);
      });
      var f = Fi(l),
          s = Hi(l),
          h = f.x - e(f, s) / 2,
          p = s.x + e(s, f) / 2;
      return oi(l, i ? function (n) {
        n.x = (n.x - l.x) * r[0], n.y = (l.y - n.y) * r[1];
      } : function (n) {
        n.x = (n.x - h) / (p - h) * r[0], n.y = (1 - (l.y ? n.y / l.y : 1)) * r[1];
      }), a;
    }

    var t = ao.layout.hierarchy().sort(null).value(null),
        e = Li,
        r = [1, 1],
        i = !1;
    return n.separation = function (t) {
      return arguments.length ? (e = t, n) : e;
    }, n.size = function (t) {
      return arguments.length ? (i = null == (r = t), n) : i ? null : r;
    }, n.nodeSize = function (t) {
      return arguments.length ? (i = null != (r = t), n) : i ? r : null;
    }, ii(n, t);
  }, ao.layout.treemap = function () {
    function n(n, t) {
      for (var e, r, i = -1, u = n.length; ++i < u;) {
        r = (e = n[i]).value * (0 > t ? 0 : t), e.area = isNaN(r) || 0 >= r ? 0 : r;
      }
    }

    function t(e) {
      var u = e.children;

      if (u && u.length) {
        var o,
            a,
            l,
            c = s(e),
            f = [],
            h = u.slice(),
            g = 1 / 0,
            v = "slice" === p ? c.dx : "dice" === p ? c.dy : "slice-dice" === p ? 1 & e.depth ? c.dy : c.dx : Math.min(c.dx, c.dy);

        for (n(h, c.dx * c.dy / e.value), f.area = 0; (l = h.length) > 0;) {
          f.push(o = h[l - 1]), f.area += o.area, "squarify" !== p || (a = r(f, v)) <= g ? (h.pop(), g = a) : (f.area -= f.pop().area, i(f, v, c, !1), v = Math.min(c.dx, c.dy), f.length = f.area = 0, g = 1 / 0);
        }

        f.length && (i(f, v, c, !0), f.length = f.area = 0), u.forEach(t);
      }
    }

    function e(t) {
      var r = t.children;

      if (r && r.length) {
        var u,
            o = s(t),
            a = r.slice(),
            l = [];

        for (n(a, o.dx * o.dy / t.value), l.area = 0; u = a.pop();) {
          l.push(u), l.area += u.area, null != u.z && (i(l, u.z ? o.dx : o.dy, o, !a.length), l.length = l.area = 0);
        }

        r.forEach(e);
      }
    }

    function r(n, t) {
      for (var e, r = n.area, i = 0, u = 1 / 0, o = -1, a = n.length; ++o < a;) {
        (e = n[o].area) && (u > e && (u = e), e > i && (i = e));
      }

      return r *= r, t *= t, r ? Math.max(t * i * g / r, r / (t * u * g)) : 1 / 0;
    }

    function i(n, t, e, r) {
      var i,
          u = -1,
          o = n.length,
          a = e.x,
          c = e.y,
          f = t ? l(n.area / t) : 0;

      if (t == e.dx) {
        for ((r || f > e.dy) && (f = e.dy); ++u < o;) {
          i = n[u], i.x = a, i.y = c, i.dy = f, a += i.dx = Math.min(e.x + e.dx - a, f ? l(i.area / f) : 0);
        }

        i.z = !0, i.dx += e.x + e.dx - a, e.y += f, e.dy -= f;
      } else {
        for ((r || f > e.dx) && (f = e.dx); ++u < o;) {
          i = n[u], i.x = a, i.y = c, i.dx = f, c += i.dy = Math.min(e.y + e.dy - c, f ? l(i.area / f) : 0);
        }

        i.z = !1, i.dy += e.y + e.dy - c, e.x += f, e.dx -= f;
      }
    }

    function u(r) {
      var i = o || a(r),
          u = i[0];
      return u.x = u.y = 0, u.value ? (u.dx = c[0], u.dy = c[1]) : u.dx = u.dy = 0, o && a.revalue(u), n([u], u.dx * u.dy / u.value), (o ? e : t)(u), h && (o = i), i;
    }

    var o,
        a = ao.layout.hierarchy(),
        l = Math.round,
        c = [1, 1],
        f = null,
        s = Oi,
        h = !1,
        p = "squarify",
        g = .5 * (1 + Math.sqrt(5));
    return u.size = function (n) {
      return arguments.length ? (c = n, u) : c;
    }, u.padding = function (n) {
      function t(t) {
        var e = n.call(u, t, t.depth);
        return null == e ? Oi(t) : Ii(t, "number" == typeof e ? [e, e, e, e] : e);
      }

      function e(t) {
        return Ii(t, n);
      }

      if (!arguments.length) return f;
      var r;
      return s = null == (f = n) ? Oi : "function" == (r = _typeof(n)) ? t : "number" === r ? (n = [n, n, n, n], e) : e, u;
    }, u.round = function (n) {
      return arguments.length ? (l = n ? Math.round : Number, u) : l != Number;
    }, u.sticky = function (n) {
      return arguments.length ? (h = n, o = null, u) : h;
    }, u.ratio = function (n) {
      return arguments.length ? (g = n, u) : g;
    }, u.mode = function (n) {
      return arguments.length ? (p = n + "", u) : p;
    }, ii(u, a);
  }, ao.random = {
    normal: function normal(n, t) {
      var e = arguments.length;
      return 2 > e && (t = 1), 1 > e && (n = 0), function () {
        var e, r, i;

        do {
          e = 2 * Math.random() - 1, r = 2 * Math.random() - 1, i = e * e + r * r;
        } while (!i || i > 1);

        return n + t * e * Math.sqrt(-2 * Math.log(i) / i);
      };
    },
    logNormal: function logNormal() {
      var n = ao.random.normal.apply(ao, arguments);
      return function () {
        return Math.exp(n());
      };
    },
    bates: function bates(n) {
      var t = ao.random.irwinHall(n);
      return function () {
        return t() / n;
      };
    },
    irwinHall: function irwinHall(n) {
      return function () {
        for (var t = 0, e = 0; n > e; e++) {
          t += Math.random();
        }

        return t;
      };
    }
  }, ao.scale = {};
  var Sl = {
    floor: m,
    ceil: m
  };

  ao.scale.linear = function () {
    return Wi([0, 1], [0, 1], Mr, !1);
  };

  var kl = {
    s: 1,
    g: 1,
    p: 1,
    r: 1,
    e: 1
  };

  ao.scale.log = function () {
    return ru(ao.scale.linear().domain([0, 1]), 10, !0, [1, 10]);
  };

  var Nl = ao.format(".0e"),
      El = {
    floor: function floor(n) {
      return -Math.ceil(-n);
    },
    ceil: function ceil(n) {
      return -Math.floor(-n);
    }
  };
  ao.scale.pow = function () {
    return iu(ao.scale.linear(), 1, [0, 1]);
  }, ao.scale.sqrt = function () {
    return ao.scale.pow().exponent(.5);
  }, ao.scale.ordinal = function () {
    return ou([], {
      t: "range",
      a: [[]]
    });
  }, ao.scale.category10 = function () {
    return ao.scale.ordinal().range(Al);
  }, ao.scale.category20 = function () {
    return ao.scale.ordinal().range(Cl);
  }, ao.scale.category20b = function () {
    return ao.scale.ordinal().range(zl);
  }, ao.scale.category20c = function () {
    return ao.scale.ordinal().range(Ll);
  };
  var Al = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(xn),
      Cl = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(xn),
      zl = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(xn),
      Ll = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(xn);
  ao.scale.quantile = function () {
    return au([], []);
  }, ao.scale.quantize = function () {
    return lu(0, 1, [0, 1]);
  }, ao.scale.threshold = function () {
    return cu([.5], [0, 1]);
  }, ao.scale.identity = function () {
    return fu([0, 1]);
  }, ao.svg = {}, ao.svg.arc = function () {
    function n() {
      var n = Math.max(0, +e.apply(this, arguments)),
          c = Math.max(0, +r.apply(this, arguments)),
          f = o.apply(this, arguments) - Io,
          s = a.apply(this, arguments) - Io,
          h = Math.abs(s - f),
          p = f > s ? 0 : 1;
      if (n > c && (g = c, c = n, n = g), h >= Oo) return t(c, p) + (n ? t(n, 1 - p) : "") + "Z";

      var g,
          v,
          d,
          y,
          m,
          M,
          x,
          b,
          _,
          w,
          S,
          k,
          N = 0,
          E = 0,
          A = [];

      if ((y = (+l.apply(this, arguments) || 0) / 2) && (d = u === ql ? Math.sqrt(n * n + c * c) : +u.apply(this, arguments), p || (E *= -1), c && (E = tn(d / c * Math.sin(y))), n && (N = tn(d / n * Math.sin(y)))), c) {
        m = c * Math.cos(f + E), M = c * Math.sin(f + E), x = c * Math.cos(s - E), b = c * Math.sin(s - E);
        var C = Math.abs(s - f - 2 * E) <= Fo ? 0 : 1;

        if (E && yu(m, M, x, b) === p ^ C) {
          var z = (f + s) / 2;
          m = c * Math.cos(z), M = c * Math.sin(z), x = b = null;
        }
      } else m = M = 0;

      if (n) {
        _ = n * Math.cos(s - N), w = n * Math.sin(s - N), S = n * Math.cos(f + N), k = n * Math.sin(f + N);
        var L = Math.abs(f - s + 2 * N) <= Fo ? 0 : 1;

        if (N && yu(_, w, S, k) === 1 - p ^ L) {
          var q = (f + s) / 2;
          _ = n * Math.cos(q), w = n * Math.sin(q), S = k = null;
        }
      } else _ = w = 0;

      if (h > Uo && (g = Math.min(Math.abs(c - n) / 2, +i.apply(this, arguments))) > .001) {
        v = c > n ^ p ? 0 : 1;
        var T = g,
            R = g;

        if (Fo > h) {
          var D = null == S ? [_, w] : null == x ? [m, M] : Re([m, M], [S, k], [x, b], [_, w]),
              P = m - D[0],
              U = M - D[1],
              j = x - D[0],
              F = b - D[1],
              H = 1 / Math.sin(Math.acos((P * j + U * F) / (Math.sqrt(P * P + U * U) * Math.sqrt(j * j + F * F))) / 2),
              O = Math.sqrt(D[0] * D[0] + D[1] * D[1]);
          R = Math.min(g, (n - O) / (H - 1)), T = Math.min(g, (c - O) / (H + 1));
        }

        if (null != x) {
          var I = mu(null == S ? [_, w] : [S, k], [m, M], c, T, p),
              Y = mu([x, b], [_, w], c, T, p);
          g === T ? A.push("M", I[0], "A", T, ",", T, " 0 0,", v, " ", I[1], "A", c, ",", c, " 0 ", 1 - p ^ yu(I[1][0], I[1][1], Y[1][0], Y[1][1]), ",", p, " ", Y[1], "A", T, ",", T, " 0 0,", v, " ", Y[0]) : A.push("M", I[0], "A", T, ",", T, " 0 1,", v, " ", Y[0]);
        } else A.push("M", m, ",", M);

        if (null != S) {
          var Z = mu([m, M], [S, k], n, -R, p),
              V = mu([_, w], null == x ? [m, M] : [x, b], n, -R, p);
          g === R ? A.push("L", V[0], "A", R, ",", R, " 0 0,", v, " ", V[1], "A", n, ",", n, " 0 ", p ^ yu(V[1][0], V[1][1], Z[1][0], Z[1][1]), ",", 1 - p, " ", Z[1], "A", R, ",", R, " 0 0,", v, " ", Z[0]) : A.push("L", V[0], "A", R, ",", R, " 0 0,", v, " ", Z[0]);
        } else A.push("L", _, ",", w);
      } else A.push("M", m, ",", M), null != x && A.push("A", c, ",", c, " 0 ", C, ",", p, " ", x, ",", b), A.push("L", _, ",", w), null != S && A.push("A", n, ",", n, " 0 ", L, ",", 1 - p, " ", S, ",", k);

      return A.push("Z"), A.join("");
    }

    function t(n, t) {
      return "M0," + n + "A" + n + "," + n + " 0 1," + t + " 0," + -n + "A" + n + "," + n + " 0 1," + t + " 0," + n;
    }

    var e = hu,
        r = pu,
        i = su,
        u = ql,
        o = gu,
        a = vu,
        l = du;
    return n.innerRadius = function (t) {
      return arguments.length ? (e = En(t), n) : e;
    }, n.outerRadius = function (t) {
      return arguments.length ? (r = En(t), n) : r;
    }, n.cornerRadius = function (t) {
      return arguments.length ? (i = En(t), n) : i;
    }, n.padRadius = function (t) {
      return arguments.length ? (u = t == ql ? ql : En(t), n) : u;
    }, n.startAngle = function (t) {
      return arguments.length ? (o = En(t), n) : o;
    }, n.endAngle = function (t) {
      return arguments.length ? (a = En(t), n) : a;
    }, n.padAngle = function (t) {
      return arguments.length ? (l = En(t), n) : l;
    }, n.centroid = function () {
      var n = (+e.apply(this, arguments) + +r.apply(this, arguments)) / 2,
          t = (+o.apply(this, arguments) + +a.apply(this, arguments)) / 2 - Io;
      return [Math.cos(t) * n, Math.sin(t) * n];
    }, n;
  };
  var ql = "auto";

  ao.svg.line = function () {
    return Mu(m);
  };

  var Tl = ao.map({
    linear: xu,
    "linear-closed": bu,
    step: _u,
    "step-before": wu,
    "step-after": Su,
    basis: zu,
    "basis-open": Lu,
    "basis-closed": qu,
    bundle: Tu,
    cardinal: Eu,
    "cardinal-open": ku,
    "cardinal-closed": Nu,
    monotone: Fu
  });
  Tl.forEach(function (n, t) {
    t.key = n, t.closed = /-closed$/.test(n);
  });
  var Rl = [0, 2 / 3, 1 / 3, 0],
      Dl = [0, 1 / 3, 2 / 3, 0],
      Pl = [0, 1 / 6, 2 / 3, 1 / 6];
  ao.svg.line.radial = function () {
    var n = Mu(Hu);
    return n.radius = n.x, delete n.x, n.angle = n.y, delete n.y, n;
  }, wu.reverse = Su, Su.reverse = wu, ao.svg.area = function () {
    return Ou(m);
  }, ao.svg.area.radial = function () {
    var n = Ou(Hu);
    return n.radius = n.x, delete n.x, n.innerRadius = n.x0, delete n.x0, n.outerRadius = n.x1, delete n.x1, n.angle = n.y, delete n.y, n.startAngle = n.y0, delete n.y0, n.endAngle = n.y1, delete n.y1, n;
  }, ao.svg.chord = function () {
    function n(n, a) {
      var l = t(this, u, n, a),
          c = t(this, o, n, a);
      return "M" + l.p0 + r(l.r, l.p1, l.a1 - l.a0) + (e(l, c) ? i(l.r, l.p1, l.r, l.p0) : i(l.r, l.p1, c.r, c.p0) + r(c.r, c.p1, c.a1 - c.a0) + i(c.r, c.p1, l.r, l.p0)) + "Z";
    }

    function t(n, t, e, r) {
      var i = t.call(n, e, r),
          u = a.call(n, i, r),
          o = l.call(n, i, r) - Io,
          f = c.call(n, i, r) - Io;
      return {
        r: u,
        a0: o,
        a1: f,
        p0: [u * Math.cos(o), u * Math.sin(o)],
        p1: [u * Math.cos(f), u * Math.sin(f)]
      };
    }

    function e(n, t) {
      return n.a0 == t.a0 && n.a1 == t.a1;
    }

    function r(n, t, e) {
      return "A" + n + "," + n + " 0 " + +(e > Fo) + ",1 " + t;
    }

    function i(n, t, e, r) {
      return "Q 0,0 " + r;
    }

    var u = Me,
        o = xe,
        a = Iu,
        l = gu,
        c = vu;
    return n.radius = function (t) {
      return arguments.length ? (a = En(t), n) : a;
    }, n.source = function (t) {
      return arguments.length ? (u = En(t), n) : u;
    }, n.target = function (t) {
      return arguments.length ? (o = En(t), n) : o;
    }, n.startAngle = function (t) {
      return arguments.length ? (l = En(t), n) : l;
    }, n.endAngle = function (t) {
      return arguments.length ? (c = En(t), n) : c;
    }, n;
  }, ao.svg.diagonal = function () {
    function n(n, i) {
      var u = t.call(this, n, i),
          o = e.call(this, n, i),
          a = (u.y + o.y) / 2,
          l = [u, {
        x: u.x,
        y: a
      }, {
        x: o.x,
        y: a
      }, o];
      return l = l.map(r), "M" + l[0] + "C" + l[1] + " " + l[2] + " " + l[3];
    }

    var t = Me,
        e = xe,
        r = Yu;
    return n.source = function (e) {
      return arguments.length ? (t = En(e), n) : t;
    }, n.target = function (t) {
      return arguments.length ? (e = En(t), n) : e;
    }, n.projection = function (t) {
      return arguments.length ? (r = t, n) : r;
    }, n;
  }, ao.svg.diagonal.radial = function () {
    var n = ao.svg.diagonal(),
        t = Yu,
        e = n.projection;
    return n.projection = function (n) {
      return arguments.length ? e(Zu(t = n)) : t;
    }, n;
  }, ao.svg.symbol = function () {
    function n(n, r) {
      return (Ul.get(t.call(this, n, r)) || $u)(e.call(this, n, r));
    }

    var t = Xu,
        e = Vu;
    return n.type = function (e) {
      return arguments.length ? (t = En(e), n) : t;
    }, n.size = function (t) {
      return arguments.length ? (e = En(t), n) : e;
    }, n;
  };
  var Ul = ao.map({
    circle: $u,
    cross: function cross(n) {
      var t = Math.sqrt(n / 5) / 2;
      return "M" + -3 * t + "," + -t + "H" + -t + "V" + -3 * t + "H" + t + "V" + -t + "H" + 3 * t + "V" + t + "H" + t + "V" + 3 * t + "H" + -t + "V" + t + "H" + -3 * t + "Z";
    },
    diamond: function diamond(n) {
      var t = Math.sqrt(n / (2 * Fl)),
          e = t * Fl;
      return "M0," + -t + "L" + e + ",0 0," + t + " " + -e + ",0Z";
    },
    square: function square(n) {
      var t = Math.sqrt(n) / 2;
      return "M" + -t + "," + -t + "L" + t + "," + -t + " " + t + "," + t + " " + -t + "," + t + "Z";
    },
    "triangle-down": function triangleDown(n) {
      var t = Math.sqrt(n / jl),
          e = t * jl / 2;
      return "M0," + e + "L" + t + "," + -e + " " + -t + "," + -e + "Z";
    },
    "triangle-up": function triangleUp(n) {
      var t = Math.sqrt(n / jl),
          e = t * jl / 2;
      return "M0," + -e + "L" + t + "," + e + " " + -t + "," + e + "Z";
    }
  });
  ao.svg.symbolTypes = Ul.keys();
  var jl = Math.sqrt(3),
      Fl = Math.tan(30 * Yo);
  Co.transition = function (n) {
    for (var t, e, r = Hl || ++Zl, i = Ku(n), u = [], o = Ol || {
      time: Date.now(),
      ease: Nr,
      delay: 0,
      duration: 250
    }, a = -1, l = this.length; ++a < l;) {
      u.push(t = []);

      for (var c = this[a], f = -1, s = c.length; ++f < s;) {
        (e = c[f]) && Qu(e, f, i, r, o), t.push(e);
      }
    }

    return Wu(u, i, r);
  }, Co.interrupt = function (n) {
    return this.each(null == n ? Il : Bu(Ku(n)));
  };
  var Hl,
      Ol,
      Il = Bu(Ku()),
      Yl = [],
      Zl = 0;
  Yl.call = Co.call, Yl.empty = Co.empty, Yl.node = Co.node, Yl.size = Co.size, ao.transition = function (n, t) {
    return n && n.transition ? Hl ? n.transition(t) : n : ao.selection().transition(n);
  }, ao.transition.prototype = Yl, Yl.select = function (n) {
    var t,
        e,
        r,
        i = this.id,
        u = this.namespace,
        o = [];
    n = A(n);

    for (var a = -1, l = this.length; ++a < l;) {
      o.push(t = []);

      for (var c = this[a], f = -1, s = c.length; ++f < s;) {
        (r = c[f]) && (e = n.call(r, r.__data__, f, a)) ? ("__data__" in r && (e.__data__ = r.__data__), Qu(e, f, u, i, r[u][i]), t.push(e)) : t.push(null);
      }
    }

    return Wu(o, u, i);
  }, Yl.selectAll = function (n) {
    var t,
        e,
        r,
        i,
        u,
        o = this.id,
        a = this.namespace,
        l = [];
    n = C(n);

    for (var c = -1, f = this.length; ++c < f;) {
      for (var s = this[c], h = -1, p = s.length; ++h < p;) {
        if (r = s[h]) {
          u = r[a][o], e = n.call(r, r.__data__, h, c), l.push(t = []);

          for (var g = -1, v = e.length; ++g < v;) {
            (i = e[g]) && Qu(i, g, a, o, u), t.push(i);
          }
        }
      }
    }

    return Wu(l, a, o);
  }, Yl.filter = function (n) {
    var t,
        e,
        r,
        i = [];
    "function" != typeof n && (n = O(n));

    for (var u = 0, o = this.length; o > u; u++) {
      i.push(t = []);

      for (var e = this[u], a = 0, l = e.length; l > a; a++) {
        (r = e[a]) && n.call(r, r.__data__, a, u) && t.push(r);
      }
    }

    return Wu(i, this.namespace, this.id);
  }, Yl.tween = function (n, t) {
    var e = this.id,
        r = this.namespace;
    return arguments.length < 2 ? this.node()[r][e].tween.get(n) : Y(this, null == t ? function (t) {
      t[r][e].tween.remove(n);
    } : function (i) {
      i[r][e].tween.set(n, t);
    });
  }, Yl.attr = function (n, t) {
    function e() {
      this.removeAttribute(a);
    }

    function r() {
      this.removeAttributeNS(a.space, a.local);
    }

    function i(n) {
      return null == n ? e : (n += "", function () {
        var t,
            e = this.getAttribute(a);
        return e !== n && (t = o(e, n), function (n) {
          this.setAttribute(a, t(n));
        });
      });
    }

    function u(n) {
      return null == n ? r : (n += "", function () {
        var t,
            e = this.getAttributeNS(a.space, a.local);
        return e !== n && (t = o(e, n), function (n) {
          this.setAttributeNS(a.space, a.local, t(n));
        });
      });
    }

    if (arguments.length < 2) {
      for (t in n) {
        this.attr(t, n[t]);
      }

      return this;
    }

    var o = "transform" == n ? $r : Mr,
        a = ao.ns.qualify(n);
    return Ju(this, "attr." + n, t, a.local ? u : i);
  }, Yl.attrTween = function (n, t) {
    function e(n, e) {
      var r = t.call(this, n, e, this.getAttribute(i));
      return r && function (n) {
        this.setAttribute(i, r(n));
      };
    }

    function r(n, e) {
      var r = t.call(this, n, e, this.getAttributeNS(i.space, i.local));
      return r && function (n) {
        this.setAttributeNS(i.space, i.local, r(n));
      };
    }

    var i = ao.ns.qualify(n);
    return this.tween("attr." + n, i.local ? r : e);
  }, Yl.style = function (n, e, r) {
    function i() {
      this.style.removeProperty(n);
    }

    function u(e) {
      return null == e ? i : (e += "", function () {
        var i,
            u = t(this).getComputedStyle(this, null).getPropertyValue(n);
        return u !== e && (i = Mr(u, e), function (t) {
          this.style.setProperty(n, i(t), r);
        });
      });
    }

    var o = arguments.length;

    if (3 > o) {
      if ("string" != typeof n) {
        2 > o && (e = "");

        for (r in n) {
          this.style(r, n[r], e);
        }

        return this;
      }

      r = "";
    }

    return Ju(this, "style." + n, e, u);
  }, Yl.styleTween = function (n, e, r) {
    function i(i, u) {
      var o = e.call(this, i, u, t(this).getComputedStyle(this, null).getPropertyValue(n));
      return o && function (t) {
        this.style.setProperty(n, o(t), r);
      };
    }

    return arguments.length < 3 && (r = ""), this.tween("style." + n, i);
  }, Yl.text = function (n) {
    return Ju(this, "text", n, Gu);
  }, Yl.remove = function () {
    var n = this.namespace;
    return this.each("end.transition", function () {
      var t;
      this[n].count < 2 && (t = this.parentNode) && t.removeChild(this);
    });
  }, Yl.ease = function (n) {
    var t = this.id,
        e = this.namespace;
    return arguments.length < 1 ? this.node()[e][t].ease : ("function" != typeof n && (n = ao.ease.apply(ao, arguments)), Y(this, function (r) {
      r[e][t].ease = n;
    }));
  }, Yl.delay = function (n) {
    var t = this.id,
        e = this.namespace;
    return arguments.length < 1 ? this.node()[e][t].delay : Y(this, "function" == typeof n ? function (r, i, u) {
      r[e][t].delay = +n.call(r, r.__data__, i, u);
    } : (n = +n, function (r) {
      r[e][t].delay = n;
    }));
  }, Yl.duration = function (n) {
    var t = this.id,
        e = this.namespace;
    return arguments.length < 1 ? this.node()[e][t].duration : Y(this, "function" == typeof n ? function (r, i, u) {
      r[e][t].duration = Math.max(1, n.call(r, r.__data__, i, u));
    } : (n = Math.max(1, n), function (r) {
      r[e][t].duration = n;
    }));
  }, Yl.each = function (n, t) {
    var e = this.id,
        r = this.namespace;

    if (arguments.length < 2) {
      var i = Ol,
          u = Hl;

      try {
        Hl = e, Y(this, function (t, i, u) {
          Ol = t[r][e], n.call(t, t.__data__, i, u);
        });
      } finally {
        Ol = i, Hl = u;
      }
    } else Y(this, function (i) {
      var u = i[r][e];
      (u.event || (u.event = ao.dispatch("start", "end", "interrupt"))).on(n, t);
    });

    return this;
  }, Yl.transition = function () {
    for (var n, t, e, r, i = this.id, u = ++Zl, o = this.namespace, a = [], l = 0, c = this.length; c > l; l++) {
      a.push(n = []);

      for (var t = this[l], f = 0, s = t.length; s > f; f++) {
        (e = t[f]) && (r = e[o][i], Qu(e, f, o, u, {
          time: r.time,
          ease: r.ease,
          delay: r.delay + r.duration,
          duration: r.duration
        })), n.push(e);
      }
    }

    return Wu(a, o, u);
  }, ao.svg.axis = function () {
    function n(n) {
      n.each(function () {
        var n,
            c = ao.select(this),
            f = this.__chart__ || e,
            s = this.__chart__ = e.copy(),
            h = null == l ? s.ticks ? s.ticks.apply(s, a) : s.domain() : l,
            p = null == t ? s.tickFormat ? s.tickFormat.apply(s, a) : m : t,
            g = c.selectAll(".tick").data(h, s),
            v = g.enter().insert("g", ".domain").attr("class", "tick").style("opacity", Uo),
            d = ao.transition(g.exit()).style("opacity", Uo).remove(),
            y = ao.transition(g.order()).style("opacity", 1),
            M = Math.max(i, 0) + o,
            x = Zi(s),
            b = c.selectAll(".domain").data([0]),
            _ = (b.enter().append("path").attr("class", "domain"), ao.transition(b));

        v.append("line"), v.append("text");
        var w,
            S,
            k,
            N,
            E = v.select("line"),
            A = y.select("line"),
            C = g.select("text").text(p),
            z = v.select("text"),
            L = y.select("text"),
            q = "top" === r || "left" === r ? -1 : 1;

        if ("bottom" === r || "top" === r ? (n = no, w = "x", k = "y", S = "x2", N = "y2", C.attr("dy", 0 > q ? "0em" : ".71em").style("text-anchor", "middle"), _.attr("d", "M" + x[0] + "," + q * u + "V0H" + x[1] + "V" + q * u)) : (n = to, w = "y", k = "x", S = "y2", N = "x2", C.attr("dy", ".32em").style("text-anchor", 0 > q ? "end" : "start"), _.attr("d", "M" + q * u + "," + x[0] + "H0V" + x[1] + "H" + q * u)), E.attr(N, q * i), z.attr(k, q * M), A.attr(S, 0).attr(N, q * i), L.attr(w, 0).attr(k, q * M), s.rangeBand) {
          var T = s,
              R = T.rangeBand() / 2;

          f = s = function s(n) {
            return T(n) + R;
          };
        } else f.rangeBand ? f = s : d.call(n, s, f);

        v.call(n, f, s), y.call(n, s, s);
      });
    }

    var t,
        e = ao.scale.linear(),
        r = Vl,
        i = 6,
        u = 6,
        o = 3,
        a = [10],
        l = null;
    return n.scale = function (t) {
      return arguments.length ? (e = t, n) : e;
    }, n.orient = function (t) {
      return arguments.length ? (r = t in Xl ? t + "" : Vl, n) : r;
    }, n.ticks = function () {
      return arguments.length ? (a = co(arguments), n) : a;
    }, n.tickValues = function (t) {
      return arguments.length ? (l = t, n) : l;
    }, n.tickFormat = function (e) {
      return arguments.length ? (t = e, n) : t;
    }, n.tickSize = function (t) {
      var e = arguments.length;
      return e ? (i = +t, u = +arguments[e - 1], n) : i;
    }, n.innerTickSize = function (t) {
      return arguments.length ? (i = +t, n) : i;
    }, n.outerTickSize = function (t) {
      return arguments.length ? (u = +t, n) : u;
    }, n.tickPadding = function (t) {
      return arguments.length ? (o = +t, n) : o;
    }, n.tickSubdivide = function () {
      return arguments.length && n;
    }, n;
  };
  var Vl = "bottom",
      Xl = {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1
  };

  ao.svg.brush = function () {
    function n(t) {
      t.each(function () {
        var t = ao.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", u).on("touchstart.brush", u),
            o = t.selectAll(".background").data([0]);
        o.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), t.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
        var a = t.selectAll(".resize").data(v, m);
        a.exit().remove(), a.enter().append("g").attr("class", function (n) {
          return "resize " + n;
        }).style("cursor", function (n) {
          return $l[n];
        }).append("rect").attr("x", function (n) {
          return /[ew]$/.test(n) ? -3 : null;
        }).attr("y", function (n) {
          return /^[ns]/.test(n) ? -3 : null;
        }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), a.style("display", n.empty() ? "none" : null);
        var l,
            s = ao.transition(t),
            h = ao.transition(o);
        c && (l = Zi(c), h.attr("x", l[0]).attr("width", l[1] - l[0]), r(s)), f && (l = Zi(f), h.attr("y", l[0]).attr("height", l[1] - l[0]), i(s)), e(s);
      });
    }

    function e(n) {
      n.selectAll(".resize").attr("transform", function (n) {
        return "translate(" + s[+/e$/.test(n)] + "," + h[+/^s/.test(n)] + ")";
      });
    }

    function r(n) {
      n.select(".extent").attr("x", s[0]), n.selectAll(".extent,.n>rect,.s>rect").attr("width", s[1] - s[0]);
    }

    function i(n) {
      n.select(".extent").attr("y", h[0]), n.selectAll(".extent,.e>rect,.w>rect").attr("height", h[1] - h[0]);
    }

    function u() {
      function u() {
        32 == ao.event.keyCode && (C || (M = null, L[0] -= s[1], L[1] -= h[1], C = 2), S());
      }

      function v() {
        32 == ao.event.keyCode && 2 == C && (L[0] += s[1], L[1] += h[1], C = 0, S());
      }

      function d() {
        var n = ao.mouse(b),
            t = !1;
        x && (n[0] += x[0], n[1] += x[1]), C || (ao.event.altKey ? (M || (M = [(s[0] + s[1]) / 2, (h[0] + h[1]) / 2]), L[0] = s[+(n[0] < M[0])], L[1] = h[+(n[1] < M[1])]) : M = null), E && y(n, c, 0) && (r(k), t = !0), A && y(n, f, 1) && (i(k), t = !0), t && (e(k), w({
          type: "brush",
          mode: C ? "move" : "resize"
        }));
      }

      function y(n, t, e) {
        var r,
            i,
            u = Zi(t),
            l = u[0],
            c = u[1],
            f = L[e],
            v = e ? h : s,
            d = v[1] - v[0];
        return C && (l -= f, c -= d + f), r = (e ? g : p) ? Math.max(l, Math.min(c, n[e])) : n[e], C ? i = (r += f) + d : (M && (f = Math.max(l, Math.min(c, 2 * M[e] - r))), r > f ? (i = r, r = f) : i = f), v[0] != r || v[1] != i ? (e ? a = null : o = null, v[0] = r, v[1] = i, !0) : void 0;
      }

      function m() {
        d(), k.style("pointer-events", "all").selectAll(".resize").style("display", n.empty() ? "none" : null), ao.select("body").style("cursor", null), q.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), z(), w({
          type: "brushend"
        });
      }

      var M,
          x,
          b = this,
          _ = ao.select(ao.event.target),
          w = l.of(b, arguments),
          k = ao.select(b),
          N = _.datum(),
          E = !/^(n|s)$/.test(N) && c,
          A = !/^(e|w)$/.test(N) && f,
          C = _.classed("extent"),
          z = W(b),
          L = ao.mouse(b),
          q = ao.select(t(b)).on("keydown.brush", u).on("keyup.brush", v);

      if (ao.event.changedTouches ? q.on("touchmove.brush", d).on("touchend.brush", m) : q.on("mousemove.brush", d).on("mouseup.brush", m), k.interrupt().selectAll("*").interrupt(), C) L[0] = s[0] - L[0], L[1] = h[0] - L[1];else if (N) {
        var T = +/w$/.test(N),
            R = +/^n/.test(N);
        x = [s[1 - T] - L[0], h[1 - R] - L[1]], L[0] = s[T], L[1] = h[R];
      } else ao.event.altKey && (M = L.slice());
      k.style("pointer-events", "none").selectAll(".resize").style("display", null), ao.select("body").style("cursor", _.style("cursor")), w({
        type: "brushstart"
      }), d();
    }

    var o,
        a,
        l = N(n, "brushstart", "brush", "brushend"),
        c = null,
        f = null,
        s = [0, 0],
        h = [0, 0],
        p = !0,
        g = !0,
        v = Bl[0];
    return n.event = function (n) {
      n.each(function () {
        var n = l.of(this, arguments),
            t = {
          x: s,
          y: h,
          i: o,
          j: a
        },
            e = this.__chart__ || t;
        this.__chart__ = t, Hl ? ao.select(this).transition().each("start.brush", function () {
          o = e.i, a = e.j, s = e.x, h = e.y, n({
            type: "brushstart"
          });
        }).tween("brush:brush", function () {
          var e = xr(s, t.x),
              r = xr(h, t.y);
          return o = a = null, function (i) {
            s = t.x = e(i), h = t.y = r(i), n({
              type: "brush",
              mode: "resize"
            });
          };
        }).each("end.brush", function () {
          o = t.i, a = t.j, n({
            type: "brush",
            mode: "resize"
          }), n({
            type: "brushend"
          });
        }) : (n({
          type: "brushstart"
        }), n({
          type: "brush",
          mode: "resize"
        }), n({
          type: "brushend"
        }));
      });
    }, n.x = function (t) {
      return arguments.length ? (c = t, v = Bl[!c << 1 | !f], n) : c;
    }, n.y = function (t) {
      return arguments.length ? (f = t, v = Bl[!c << 1 | !f], n) : f;
    }, n.clamp = function (t) {
      return arguments.length ? (c && f ? (p = !!t[0], g = !!t[1]) : c ? p = !!t : f && (g = !!t), n) : c && f ? [p, g] : c ? p : f ? g : null;
    }, n.extent = function (t) {
      var e, r, i, u, l;
      return arguments.length ? (c && (e = t[0], r = t[1], f && (e = e[0], r = r[0]), o = [e, r], c.invert && (e = c(e), r = c(r)), e > r && (l = e, e = r, r = l), e == s[0] && r == s[1] || (s = [e, r])), f && (i = t[0], u = t[1], c && (i = i[1], u = u[1]), a = [i, u], f.invert && (i = f(i), u = f(u)), i > u && (l = i, i = u, u = l), i == h[0] && u == h[1] || (h = [i, u])), n) : (c && (o ? (e = o[0], r = o[1]) : (e = s[0], r = s[1], c.invert && (e = c.invert(e), r = c.invert(r)), e > r && (l = e, e = r, r = l))), f && (a ? (i = a[0], u = a[1]) : (i = h[0], u = h[1], f.invert && (i = f.invert(i), u = f.invert(u)), i > u && (l = i, i = u, u = l))), c && f ? [[e, i], [r, u]] : c ? [e, r] : f && [i, u]);
    }, n.clear = function () {
      return n.empty() || (s = [0, 0], h = [0, 0], o = a = null), n;
    }, n.empty = function () {
      return !!c && s[0] == s[1] || !!f && h[0] == h[1];
    }, ao.rebind(n, l, "on");
  };

  var $l = {
    n: "ns-resize",
    e: "ew-resize",
    s: "ns-resize",
    w: "ew-resize",
    nw: "nwse-resize",
    ne: "nesw-resize",
    se: "nwse-resize",
    sw: "nesw-resize"
  },
      Bl = [["n", "e", "s", "w", "nw", "ne", "se", "sw"], ["e", "w"], ["n", "s"], []],
      Wl = ga.format = xa.timeFormat,
      Jl = Wl.utc,
      Gl = Jl("%Y-%m-%dT%H:%M:%S.%LZ");
  Wl.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? eo : Gl, eo.parse = function (n) {
    var t = new Date(n);
    return isNaN(t) ? null : t;
  }, eo.toString = Gl.toString, ga.second = On(function (n) {
    return new va(1e3 * Math.floor(n / 1e3));
  }, function (n, t) {
    n.setTime(n.getTime() + 1e3 * Math.floor(t));
  }, function (n) {
    return n.getSeconds();
  }), ga.seconds = ga.second.range, ga.seconds.utc = ga.second.utc.range, ga.minute = On(function (n) {
    return new va(6e4 * Math.floor(n / 6e4));
  }, function (n, t) {
    n.setTime(n.getTime() + 6e4 * Math.floor(t));
  }, function (n) {
    return n.getMinutes();
  }), ga.minutes = ga.minute.range, ga.minutes.utc = ga.minute.utc.range, ga.hour = On(function (n) {
    var t = n.getTimezoneOffset() / 60;
    return new va(36e5 * (Math.floor(n / 36e5 - t) + t));
  }, function (n, t) {
    n.setTime(n.getTime() + 36e5 * Math.floor(t));
  }, function (n) {
    return n.getHours();
  }), ga.hours = ga.hour.range, ga.hours.utc = ga.hour.utc.range, ga.month = On(function (n) {
    return n = ga.day(n), n.setDate(1), n;
  }, function (n, t) {
    n.setMonth(n.getMonth() + t);
  }, function (n) {
    return n.getMonth();
  }), ga.months = ga.month.range, ga.months.utc = ga.month.utc.range;
  var Kl = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
      Ql = [[ga.second, 1], [ga.second, 5], [ga.second, 15], [ga.second, 30], [ga.minute, 1], [ga.minute, 5], [ga.minute, 15], [ga.minute, 30], [ga.hour, 1], [ga.hour, 3], [ga.hour, 6], [ga.hour, 12], [ga.day, 1], [ga.day, 2], [ga.week, 1], [ga.month, 1], [ga.month, 3], [ga.year, 1]],
      nc = Wl.multi([[".%L", function (n) {
    return n.getMilliseconds();
  }], [":%S", function (n) {
    return n.getSeconds();
  }], ["%I:%M", function (n) {
    return n.getMinutes();
  }], ["%I %p", function (n) {
    return n.getHours();
  }], ["%a %d", function (n) {
    return n.getDay() && 1 != n.getDate();
  }], ["%b %d", function (n) {
    return 1 != n.getDate();
  }], ["%B", function (n) {
    return n.getMonth();
  }], ["%Y", zt]]),
      tc = {
    range: function range(n, t, e) {
      return ao.range(Math.ceil(n / e) * e, +t, e).map(io);
    },
    floor: m,
    ceil: m
  };
  Ql.year = ga.year, ga.scale = function () {
    return ro(ao.scale.linear(), Ql, nc);
  };
  var ec = Ql.map(function (n) {
    return [n[0].utc, n[1]];
  }),
      rc = Jl.multi([[".%L", function (n) {
    return n.getUTCMilliseconds();
  }], [":%S", function (n) {
    return n.getUTCSeconds();
  }], ["%I:%M", function (n) {
    return n.getUTCMinutes();
  }], ["%I %p", function (n) {
    return n.getUTCHours();
  }], ["%a %d", function (n) {
    return n.getUTCDay() && 1 != n.getUTCDate();
  }], ["%b %d", function (n) {
    return 1 != n.getUTCDate();
  }], ["%B", function (n) {
    return n.getUTCMonth();
  }], ["%Y", zt]]);
  ec.year = ga.year.utc, ga.scale.utc = function () {
    return ro(ao.scale.linear(), ec, rc);
  }, ao.text = An(function (n) {
    return n.responseText;
  }), ao.json = function (n, t) {
    return Cn(n, "application/json", uo, t);
  }, ao.html = function (n, t) {
    return Cn(n, "text/html", oo, t);
  }, ao.xml = An(function (n) {
    return n.responseXML;
  }),  true ? (this.d3 = ao, !(__WEBPACK_AMD_DEFINE_FACTORY__ = (ao),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))) : undefined;
}();

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/*! exports used: get */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/*! exports used: default */
/*! ModuleConcatenation bailout: Module is not an ECMAScript module */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ })

/******/ })));

  if (!Module.expectedDataFileDownloads) {
    Module.expectedDataFileDownloads = 0;
  }

  Module.expectedDataFileDownloads++;
  (function() {
    // When running as a pthread, FS operations are proxied to the main thread, so we don't need to
    // fetch the .data bundle on the worker
    if (Module['ENVIRONMENT_IS_PTHREAD']) return;
    var loadPackage = function(metadata) {

      var PACKAGE_PATH = '';
      if (typeof window === 'object') {
        PACKAGE_PATH = window['encodeURIComponent'](window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf('/')) + '/');
      } else if (typeof process === 'undefined' && typeof location !== 'undefined') {
        // web worker
        PACKAGE_PATH = encodeURIComponent(location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf('/')) + '/');
      }
      var PACKAGE_NAME = 'bin.data._.js';
      var REMOTE_PACKAGE_BASE = 'bin.data._.js';
      if (typeof Module['locateFilePackage'] === 'function' && !Module['locateFile']) {
        Module['locateFile'] = Module['locateFilePackage'];
        err('warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)');
      }
      var REMOTE_PACKAGE_NAME = Module['locateFile'] ? Module['locateFile'](REMOTE_PACKAGE_BASE, '') : REMOTE_PACKAGE_BASE;
var REMOTE_PACKAGE_SIZE = metadata['remote_package_size'];

      function fetchRemotePackage(packageName, packageSize, callback, errback) {
        if (typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string') {
          require('fs').readFile(packageName, function(err, contents) {
            if (err) {
              errback(err);
            } else {
              callback(contents.buffer);
            }
          });
          return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', packageName, true);
        xhr.responseType = 'arraybuffer';
        xhr.onprogress = function(event) {
          var url = packageName;
          var size = packageSize;
          if (event.total) size = event.total;
          if (event.loaded) {
            if (!xhr.addedTotal) {
              xhr.addedTotal = true;
              if (!Module.dataFileDownloads) Module.dataFileDownloads = {};
              Module.dataFileDownloads[url] = {
                loaded: event.loaded,
                total: size
              };
            } else {
              Module.dataFileDownloads[url].loaded = event.loaded;
            }
            var total = 0;
            var loaded = 0;
            var num = 0;
            for (var download in Module.dataFileDownloads) {
            var data = Module.dataFileDownloads[download];
              total += data.total;
              loaded += data.loaded;
              num++;
            }
            total = Math.ceil(total * Module.expectedDataFileDownloads/num);
            if (Module['setStatus']) Module['setStatus']('Downloading data... (' + loaded + '/' + total + ')');
          } else if (!Module.dataFileDownloads) {
            if (Module['setStatus']) Module['setStatus']('Downloading data...');
          }
        };
        xhr.onerror = function(event) {
          throw new Error("NetworkError for: " + packageName);
        }
        xhr.onload = function(event) {
          if (xhr.status == 200 || xhr.status == 304 || xhr.status == 206 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
            var packageData = xhr.response;
            callback(packageData);
          } else {
            throw new Error(xhr.statusText + " : " + xhr.responseURL);
          }
        };
        xhr.send(null);
      };

      function handleError(error) {
        console.error('package error:', error);
      };

      var fetchedCallback = null;
      var fetched = Module['getPreloadedPackage'] ? Module['getPreloadedPackage'](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE) : null;

      if (!fetched) fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE, function(data) {
        if (fetchedCallback) {
          fetchedCallback(data);
          fetchedCallback = null;
        } else {
          fetched = data;
        }
      }, handleError);

    function runWithFS() {

      function assert(check, msg) {
        if (!check) throw msg + new Error().stack;
      }
Module['FS_createPath']("/", "maps", true, true);

      /** @constructor */
      function DataRequest(start, end, audio) {
        this.start = start;
        this.end = end;
        this.audio = audio;
      }
      DataRequest.prototype = {
        requests: {},
        open: function(mode, name) {
          this.name = name;
          this.requests[name] = this;
          Module['addRunDependency']('fp ' + this.name);
        },
        send: function() {},
        onload: function() {
          var byteArray = this.byteArray.subarray(this.start, this.end);
          this.finish(byteArray);
        },
        finish: function(byteArray) {
          var that = this;
          // canOwn this data in the filesystem, it is a slide into the heap that will never change
          Module['FS_createDataFile'](this.name, null, byteArray, true, true, true);
          Module['removeRunDependency']('fp ' + that.name);
          this.requests[this.name] = null;
        }
      };

      var files = metadata['files'];
      for (var i = 0; i < files.length; ++i) {
        new DataRequest(files[i]['start'], files[i]['end'], files[i]['audio'] || 0).open('GET', files[i]['filename']);
      }

      function processPackageData(arrayBuffer) {
        assert(arrayBuffer, 'Loading data file failed.');
        assert(arrayBuffer.constructor.name === ArrayBuffer.name, 'bad input to processPackageData');
        var byteArray = new Uint8Array(arrayBuffer);
        var curr;
        // Reuse the bytearray from the XHR as the source for file reads.
          DataRequest.prototype.byteArray = byteArray;
          var files = metadata['files'];
          for (var i = 0; i < files.length; ++i) {
            DataRequest.prototype.requests[files[i].filename].onload();
          }          Module['removeRunDependency']('datafile_bin.data._.js');

      };
      Module['addRunDependency']('datafile_bin.data._.js');

      if (!Module.preloadResults) Module.preloadResults = {};

      Module.preloadResults[PACKAGE_NAME] = {fromCache: false};
      if (fetched) {
        processPackageData(fetched);
        fetched = null;
      } else {
        fetchedCallback = processPackageData;
      }

    }
    if (Module['calledRun']) {
      runWithFS();
    } else {
      if (!Module['preRun']) Module['preRun'] = [];
      Module["preRun"].push(runWithFS); // FS is not initialized yet, wait for it
    }

    }
    loadPackage({"files": [{"filename": "/char_base_320_480.png", "start": 0, "end": 18487}, {"filename": "/char_base_shadow_320_480.png", "start": 18487, "end": 22881}, {"filename": "/char_base_touch_ani.xml", "start": 22881, "end": 23413}, {"filename": "/char_eye_320_480.png", "start": 23413, "end": 40342}, {"filename": "/char_eye_shadow_320_480.png", "start": 40342, "end": 44856}, {"filename": "/char_faces_320_480.png", "start": 44856, "end": 80218}, {"filename": "/char_hulk_320_480.png", "start": 80218, "end": 92542}, {"filename": "/char_hulk_ani.xml", "start": 92542, "end": 100898}, {"filename": "/char_magnet_320_480.png", "start": 100898, "end": 116712}, {"filename": "/char_magnet_ani.xml", "start": 116712, "end": 123263}, {"filename": "/char_sleeping_320_480.png", "start": 123263, "end": 133399}, {"filename": "/char_sleeping_ani.xml", "start": 133399, "end": 134608}, {"filename": "/char_sleeping_shadow_320_480.png", "start": 134608, "end": 142048}, {"filename": "/char_slug_320_480.png", "start": 142048, "end": 174504}, {"filename": "/char_slug_ani.xml", "start": 174504, "end": 182008}, {"filename": "/char_slug_shadow_320_480.png", "start": 182008, "end": 189364}, {"filename": "/char_synch_320_480.png", "start": 189364, "end": 197247}, {"filename": "/char_synch_shadow_320_480.png", "start": 197247, "end": 204937}, {"filename": "/f2p_game_coin_320_480.png", "start": 204937, "end": 217465}, {"filename": "/font_big_320_480.png", "start": 217465, "end": 321354}, {"filename": "/font_small_320_480.png", "start": 321354, "end": 339390}, {"filename": "/fx_bgr_01_320_480.png", "start": 339390, "end": 353086}, {"filename": "/fx_bgr_02_320_480.png", "start": 353086, "end": 369624}, {"filename": "/fx_bgr_03_320_480.png", "start": 369624, "end": 390354}, {"filename": "/fx_bgr_04.xml", "start": 390354, "end": 393606}, {"filename": "/fx_bgr_04_320_480.png", "start": 393606, "end": 411806}, {"filename": "/fx_bgr_05.xml", "start": 411806, "end": 440005}, {"filename": "/fx_bgr_05_320_480.png", "start": 440005, "end": 451711}, {"filename": "/fx_bump_block.xml", "start": 451711, "end": 453621}, {"filename": "/fx_bump_block_shadow.xml", "start": 453621, "end": 454263}, {"filename": "/fx_clouds_bgr_05_320_480.png", "start": 454263, "end": 472682}, {"filename": "/fx_collision_block.xml", "start": 472682, "end": 474132}, {"filename": "/fx_dust_320_480.png", "start": 474132, "end": 478006}, {"filename": "/fx_iap_320_480.png", "start": 478006, "end": 486514}, {"filename": "/gpx.resources", "start": 486514, "end": 493795}, {"filename": "/hat_animations.xml", "start": 493795, "end": 494961}, {"filename": "/hats_pack_01_320_480.png", "start": 494961, "end": 502171}, {"filename": "/hats_pack_02_320_480.png", "start": 502171, "end": 510604}, {"filename": "/hats_pack_03_320_480.png", "start": 510604, "end": 523382}, {"filename": "/hats_pack_04_320_480.png", "start": 523382, "end": 535754}, {"filename": "/hats_pack_05_320_480.png", "start": 535754, "end": 545028}, {"filename": "/hud_320_480.png", "start": 545028, "end": 572832}, {"filename": "/hud_title_decor_ani.xml", "start": 572832, "end": 576434}, {"filename": "/iap_popup_320_480.png", "start": 576434, "end": 591867}, {"filename": "/iap_popup_hints.xml", "start": 591867, "end": 642853}, {"filename": "/iap_popup_hints_320_480.png", "start": 642853, "end": 664573}, {"filename": "/logo_320_480.png", "start": 664573, "end": 867727}, {"filename": "/logo_ani.xml", "start": 867727, "end": 904276}, {"filename": "/maps/1_1.xml", "start": 904276, "end": 905796}, {"filename": "/maps/1_10.xml", "start": 905796, "end": 909327}, {"filename": "/maps/1_11.xml", "start": 909327, "end": 911982}, {"filename": "/maps/1_12.xml", "start": 911982, "end": 914176}, {"filename": "/maps/1_13.xml", "start": 914176, "end": 916859}, {"filename": "/maps/1_14.xml", "start": 916859, "end": 919863}, {"filename": "/maps/1_15.xml", "start": 919863, "end": 922641}, {"filename": "/maps/1_16.xml", "start": 922641, "end": 925020}, {"filename": "/maps/1_17.xml", "start": 925020, "end": 927827}, {"filename": "/maps/1_18.xml", "start": 927827, "end": 929968}, {"filename": "/maps/1_19.xml", "start": 929968, "end": 932906}, {"filename": "/maps/1_2.xml", "start": 932906, "end": 934495}, {"filename": "/maps/1_20.xml", "start": 934495, "end": 937166}, {"filename": "/maps/1_21.xml", "start": 937166, "end": 939620}, {"filename": "/maps/1_22.xml", "start": 939620, "end": 942094}, {"filename": "/maps/1_23.xml", "start": 942094, "end": 944498}, {"filename": "/maps/1_24.xml", "start": 944498, "end": 947654}, {"filename": "/maps/1_25.xml", "start": 947654, "end": 950524}, {"filename": "/maps/1_3.xml", "start": 950524, "end": 952618}, {"filename": "/maps/1_4.xml", "start": 952618, "end": 955567}, {"filename": "/maps/1_5.xml", "start": 955567, "end": 958459}, {"filename": "/maps/1_6.xml", "start": 958459, "end": 961153}, {"filename": "/maps/1_7.xml", "start": 961153, "end": 963060}, {"filename": "/maps/1_8.xml", "start": 963060, "end": 965529}, {"filename": "/maps/1_9.xml", "start": 965529, "end": 967856}, {"filename": "/maps/2_1.xml", "start": 967856, "end": 970049}, {"filename": "/maps/2_10.xml", "start": 970049, "end": 973437}, {"filename": "/maps/2_11.xml", "start": 973437, "end": 976436}, {"filename": "/maps/2_12.xml", "start": 976436, "end": 979356}, {"filename": "/maps/2_13.xml", "start": 979356, "end": 982384}, {"filename": "/maps/2_14.xml", "start": 982384, "end": 985908}, {"filename": "/maps/2_15.xml", "start": 985908, "end": 988550}, {"filename": "/maps/2_16.xml", "start": 988550, "end": 991639}, {"filename": "/maps/2_17.xml", "start": 991639, "end": 995440}, {"filename": "/maps/2_18.xml", "start": 995440, "end": 998826}, {"filename": "/maps/2_19.xml", "start": 998826, "end": 1002652}, {"filename": "/maps/2_2.xml", "start": 1002652, "end": 1005076}, {"filename": "/maps/2_20.xml", "start": 1005076, "end": 1008433}, {"filename": "/maps/2_21.xml", "start": 1008433, "end": 1011367}, {"filename": "/maps/2_22.xml", "start": 1011367, "end": 1014541}, {"filename": "/maps/2_23.xml", "start": 1014541, "end": 1018135}, {"filename": "/maps/2_24.xml", "start": 1018135, "end": 1021673}, {"filename": "/maps/2_25.xml", "start": 1021673, "end": 1024486}, {"filename": "/maps/2_3.xml", "start": 1024486, "end": 1027600}, {"filename": "/maps/2_4.xml", "start": 1027600, "end": 1030147}, {"filename": "/maps/2_5.xml", "start": 1030147, "end": 1032938}, {"filename": "/maps/2_6.xml", "start": 1032938, "end": 1035629}, {"filename": "/maps/2_7.xml", "start": 1035629, "end": 1039162}, {"filename": "/maps/2_8.xml", "start": 1039162, "end": 1042531}, {"filename": "/maps/2_9.xml", "start": 1042531, "end": 1045597}, {"filename": "/maps/3_1.xml", "start": 1045597, "end": 1049537}, {"filename": "/maps/3_10.xml", "start": 1049537, "end": 1052756}, {"filename": "/maps/3_11.xml", "start": 1052756, "end": 1056291}, {"filename": "/maps/3_12.xml", "start": 1056291, "end": 1061074}, {"filename": "/maps/3_13.xml", "start": 1061074, "end": 1064879}, {"filename": "/maps/3_14.xml", "start": 1064879, "end": 1067826}, {"filename": "/maps/3_15.xml", "start": 1067826, "end": 1071467}, {"filename": "/maps/3_16.xml", "start": 1071467, "end": 1074737}, {"filename": "/maps/3_17.xml", "start": 1074737, "end": 1078488}, {"filename": "/maps/3_18.xml", "start": 1078488, "end": 1081665}, {"filename": "/maps/3_19.xml", "start": 1081665, "end": 1085778}, {"filename": "/maps/3_2.xml", "start": 1085778, "end": 1089268}, {"filename": "/maps/3_20.xml", "start": 1089268, "end": 1093370}, {"filename": "/maps/3_21.xml", "start": 1093370, "end": 1098028}, {"filename": "/maps/3_22.xml", "start": 1098028, "end": 1103038}, {"filename": "/maps/3_23.xml", "start": 1103038, "end": 1107061}, {"filename": "/maps/3_24.xml", "start": 1107061, "end": 1113052}, {"filename": "/maps/3_25.xml", "start": 1113052, "end": 1117160}, {"filename": "/maps/3_3.xml", "start": 1117160, "end": 1120819}, {"filename": "/maps/3_4.xml", "start": 1120819, "end": 1124628}, {"filename": "/maps/3_5.xml", "start": 1124628, "end": 1128290}, {"filename": "/maps/3_6.xml", "start": 1128290, "end": 1132097}, {"filename": "/maps/3_7.xml", "start": 1132097, "end": 1135808}, {"filename": "/maps/3_8.xml", "start": 1135808, "end": 1139742}, {"filename": "/maps/3_9.xml", "start": 1139742, "end": 1143407}, {"filename": "/maps/4_1.xml", "start": 1143407, "end": 1147147}, {"filename": "/maps/4_10.xml", "start": 1147147, "end": 1151119}, {"filename": "/maps/4_11.xml", "start": 1151119, "end": 1155860}, {"filename": "/maps/4_12.xml", "start": 1155860, "end": 1158894}, {"filename": "/maps/4_13.xml", "start": 1158894, "end": 1162459}, {"filename": "/maps/4_14.xml", "start": 1162459, "end": 1167875}, {"filename": "/maps/4_15.xml", "start": 1167875, "end": 1171553}, {"filename": "/maps/4_16.xml", "start": 1171553, "end": 1176244}, {"filename": "/maps/4_17.xml", "start": 1176244, "end": 1179074}, {"filename": "/maps/4_18.xml", "start": 1179074, "end": 1183722}, {"filename": "/maps/4_19.xml", "start": 1183722, "end": 1187680}, {"filename": "/maps/4_2.xml", "start": 1187680, "end": 1191043}, {"filename": "/maps/4_20.xml", "start": 1191043, "end": 1195025}, {"filename": "/maps/4_21.xml", "start": 1195025, "end": 1199729}, {"filename": "/maps/4_22.xml", "start": 1199729, "end": 1203980}, {"filename": "/maps/4_23.xml", "start": 1203980, "end": 1208494}, {"filename": "/maps/4_24.xml", "start": 1208494, "end": 1212072}, {"filename": "/maps/4_25.xml", "start": 1212072, "end": 1217182}, {"filename": "/maps/4_3.xml", "start": 1217182, "end": 1221002}, {"filename": "/maps/4_4.xml", "start": 1221002, "end": 1224164}, {"filename": "/maps/4_5.xml", "start": 1224164, "end": 1228230}, {"filename": "/maps/4_6.xml", "start": 1228230, "end": 1231972}, {"filename": "/maps/4_7.xml", "start": 1231972, "end": 1235555}, {"filename": "/maps/4_8.xml", "start": 1235555, "end": 1240920}, {"filename": "/maps/4_9.xml", "start": 1240920, "end": 1245121}, {"filename": "/maps/5_1.xml", "start": 1245121, "end": 1248683}, {"filename": "/maps/5_10.xml", "start": 1248683, "end": 1253003}, {"filename": "/maps/5_11.xml", "start": 1253003, "end": 1256738}, {"filename": "/maps/5_12.xml", "start": 1256738, "end": 1260926}, {"filename": "/maps/5_13.xml", "start": 1260926, "end": 1264893}, {"filename": "/maps/5_14.xml", "start": 1264893, "end": 1268612}, {"filename": "/maps/5_15.xml", "start": 1268612, "end": 1273829}, {"filename": "/maps/5_16.xml", "start": 1273829, "end": 1279246}, {"filename": "/maps/5_17.xml", "start": 1279246, "end": 1283013}, {"filename": "/maps/5_18.xml", "start": 1283013, "end": 1287138}, {"filename": "/maps/5_19.xml", "start": 1287138, "end": 1291327}, {"filename": "/maps/5_2.xml", "start": 1291327, "end": 1295553}, {"filename": "/maps/5_20.xml", "start": 1295553, "end": 1301089}, {"filename": "/maps/5_21.xml", "start": 1301089, "end": 1305050}, {"filename": "/maps/5_22.xml", "start": 1305050, "end": 1310110}, {"filename": "/maps/5_23.xml", "start": 1310110, "end": 1314585}, {"filename": "/maps/5_24.xml", "start": 1314585, "end": 1318807}, {"filename": "/maps/5_25.xml", "start": 1318807, "end": 1324226}, {"filename": "/maps/5_3.xml", "start": 1324226, "end": 1328042}, {"filename": "/maps/5_4.xml", "start": 1328042, "end": 1331688}, {"filename": "/maps/5_5.xml", "start": 1331688, "end": 1335631}, {"filename": "/maps/5_6.xml", "start": 1335631, "end": 1339381}, {"filename": "/maps/5_7.xml", "start": 1339381, "end": 1343613}, {"filename": "/maps/5_8.xml", "start": 1343613, "end": 1347836}, {"filename": "/maps/5_9.xml", "start": 1347836, "end": 1351209}, {"filename": "/maps/allmaps.xml", "start": 1351209, "end": 1354351}, {"filename": "/maps/sortedlist.xml", "start": 1354351, "end": 1357603}, {"filename": "/menu_agepopup_320_480.png", "start": 1357603, "end": 1371479}, {"filename": "/menu_agepopup_bgr_320_480.png", "start": 1371479, "end": 1375221}, {"filename": "/menu_button_big_320_480.png", "start": 1375221, "end": 1385609}, {"filename": "/menu_button_short_320_480.png", "start": 1385609, "end": 1400196}, {"filename": "/menu_button_small_320_480.png", "start": 1400196, "end": 1418302}, {"filename": "/menu_buttons_320_480.png", "start": 1418302, "end": 1428768}, {"filename": "/menu_coming_soon_ani.xml", "start": 1428768, "end": 1429870}, {"filename": "/menu_coming_soon_ani_320_480.png", "start": 1429870, "end": 1448985}, {"filename": "/menu_disable_ads_320_480.png", "start": 1448985, "end": 1461325}, {"filename": "/menu_levels_320_480.png", "start": 1461325, "end": 1483589}, {"filename": "/menu_levels_bgr_01_320_480.png", "start": 1483589, "end": 1486148}, {"filename": "/menu_levels_bgr_02_320_480.png", "start": 1486148, "end": 1487859}, {"filename": "/menu_levels_bgr_03_320_480.png", "start": 1487859, "end": 1489336}, {"filename": "/menu_levels_bgr_04_320_480.png", "start": 1489336, "end": 1491057}, {"filename": "/menu_loading_ani_320_480.png", "start": 1491057, "end": 1503255}, {"filename": "/menu_loading_eye.xml", "start": 1503255, "end": 1504747}, {"filename": "/menu_loading_level.xml", "start": 1504747, "end": 1506796}, {"filename": "/menu_main_320_480.png", "start": 1506796, "end": 1531374}, {"filename": "/menu_main_bgr_320_480.png", "start": 1531374, "end": 1534630}, {"filename": "/menu_popup_320_480.png", "start": 1534630, "end": 1554228}, {"filename": "/menu_popup_achiev_320_480.png", "start": 1554228, "end": 1568066}, {"filename": "/menu_processing_ani_320_480.png", "start": 1568066, "end": 1573084}, {"filename": "/menu_promo_320_480.png", "start": 1573084, "end": 1581914}, {"filename": "/menu_promo_banner_320_480.png", "start": 1581914, "end": 1581983}, {"filename": "/menu_settings_320_480.png", "start": 1581983, "end": 1606255}, {"filename": "/menu_shadow_ani.xml", "start": 1606255, "end": 1608986}, {"filename": "/menu_shadow_ani_320_480.png", "start": 1608986, "end": 1612230}, {"filename": "/obj_arrow_320_480.png", "start": 1612230, "end": 1625882}, {"filename": "/obj_bouncer_320_480.png", "start": 1625882, "end": 1643263}, {"filename": "/obj_bouncer_ani.xml", "start": 1643263, "end": 1646489}, {"filename": "/obj_bouncer_shadow_ani.xml", "start": 1646489, "end": 1649784}, {"filename": "/obj_breakable_320_480.png", "start": 1649784, "end": 1672732}, {"filename": "/obj_button_320_480.png", "start": 1672732, "end": 1680244}, {"filename": "/obj_clone_320_480.png", "start": 1680244, "end": 1693212}, {"filename": "/obj_pack_01_320_480.png", "start": 1693212, "end": 1703826}, {"filename": "/obj_pack_02_320_480.png", "start": 1703826, "end": 1718534}, {"filename": "/obj_pack_03_320_480.png", "start": 1718534, "end": 1735246}, {"filename": "/obj_pack_04_320_480.png", "start": 1735246, "end": 1752742}, {"filename": "/obj_pack_05_320_480.png", "start": 1752742, "end": 1771362}, {"filename": "/obj_shadow_320_480.png", "start": 1771362, "end": 1781634}, {"filename": "/obj_shadow_pack_05_320_480.png", "start": 1781634, "end": 1803156}, {"filename": "/obj_splitter_320_480.png", "start": 1803156, "end": 1811158}, {"filename": "/obj_star_320_480.png", "start": 1811158, "end": 1816567}, {"filename": "/obj_tunnel_320_480.png", "start": 1816567, "end": 1831449}, {"filename": "/opt_bgr_01_320_480.png", "start": 1831449, "end": 1840435}, {"filename": "/opt_bgr_02_320_480.png", "start": 1840435, "end": 1849535}, {"filename": "/opt_bgr_03_320_480.png", "start": 1849535, "end": 1856171}, {"filename": "/opt_bgr_04_320_480.png", "start": 1856171, "end": 1864863}, {"filename": "/opt_bgr_05_320_480.png", "start": 1864863, "end": 1872781}, {"filename": "/opt_menu_loading_bgr_320_480.png", "start": 1872781, "end": 1877669}, {"filename": "/pause_banner_320_480.png", "start": 1877669, "end": 1877738}, {"filename": "/result_screen_320_480.png", "start": 1877738, "end": 1921606}, {"filename": "/result_screen_stars.xml", "start": 1921606, "end": 1952863}, {"filename": "/strings.xml", "start": 1952863, "end": 2088303}, {"filename": "/tutor_bubbles_01.xml", "start": 2088303, "end": 2304756}, {"filename": "/tutor_bubbles_01_320_480.png", "start": 2304756, "end": 2325510}, {"filename": "/tutor_bubbles_02.xml", "start": 2325510, "end": 2417918}, {"filename": "/tutor_bubbles_02_320_480.png", "start": 2417918, "end": 2427483}, {"filename": "/tutor_bubbles_03.xml", "start": 2427483, "end": 2542098}, {"filename": "/tutor_bubbles_03_320_480.png", "start": 2542098, "end": 2553674}, {"filename": "/tutor_bubbles_04.xml", "start": 2553674, "end": 2647921}, {"filename": "/tutor_bubbles_04_320_480.png", "start": 2647921, "end": 2665916}, {"filename": "/tutor_bubbles_05.xml", "start": 2665916, "end": 2753406}, {"filename": "/tutor_bubbles_05_320_480.png", "start": 2753406, "end": 2770422}, {"filename": "/tutor_bubbles_common_320_480.png", "start": 2770422, "end": 2786997}, {"filename": "/tutor_bubbles_panel_320_480.png", "start": 2786997, "end": 2801442}, {"filename": "/tutor_cursor_320_480.png", "start": 2801442, "end": 2816733}, {"filename": "/tutor_cursor_ani.xml", "start": 2816733, "end": 2834829}, {"filename": "/tutor_cursor_ani_hints.xml", "start": 2834829, "end": 2848104}, {"filename": "/zeptolab_320_480.png", "start": 2848104, "end": 2882590}], "remote_package_size": 2882590});

  })();

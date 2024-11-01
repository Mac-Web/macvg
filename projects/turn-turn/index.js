/**
 * 设置LayaNative屏幕方向，可设置以下值
 * landscape           横屏
 * portrait            竖屏
 * sensor_landscape    横屏(双方向)
 * sensor_portrait     竖屏(双方向)
 */
window.screenOrientation = "sensor_portrait";

 
loadLib("libs/min/zip.min.js");
loadLib("libs/min/laya.core.min.js");//debug
loadLib("libs/min/laya.ui.min.js");
loadLib("libs/min/laya.d3.min.js");
loadLib("libs/min/laya.physics3D.min.js");
loadLib("libs/min/laya.vconsole.min.js");


loadLib("js/bundle.js");

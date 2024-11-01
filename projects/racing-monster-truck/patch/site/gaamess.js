console.l0g= console.log;
window.addEventListener("load", ()=> {
  console.l0g("--fx--gaamess--onload--");
  setTimeout(()=>{
    CTAPlay= document.querySelector(".CTAPlay");
    CTAPlay && CTAPlay.click();
    boxAd= document.querySelector(".boxAd");
    lAd= document.querySelector(".lAd");
    rAd= document.querySelector(".rAd");
    bAd= document.querySelector(".bAd");
    rBAd= document.querySelector(".rBAd");
    if (boxAd && boxAd.offsetWidth>0) {
      console.l0g("--fx--boxAd--");
      boxAd.innerHTML= "<div>BOX ADS HERE</div>";
      boxAd.style.border = "solid #EEEEEE";
      boxAd.style.background = "#ffffff";
    }
    if (lAd && lAd.offsetWidth> 0) {
      console.l0g("--fx--lAd--");
      lAd.innerHTML= "<div>LEFT ADS HERE</div>";
      lAd.style.border = "solid #EEEEEE";
      lAd.style.background = "#ffffff";
    }
    if (rAd && rAd.offsetWidth> 0) {
      console.l0g("--fx--rAd--");
      rAd.innerHTML= "<div>RIGHT ADS HERE</div>";
      rAd.style.border = "solid #EEEEEE";
      rAd.style.background = "#ffffff";
    }
    if (bAd && bAd.offsetWidth> 0) {
      console.l0g("--fx--bAd--");
      bAd.innerHTML= "<div>BOTTOM ADS HERE</div>";
      bAd.style.border = "solid #EEEEEE";
      bAd.style.background = "#ffffff";
    }
    if (rBAd && rBAd.offsetWidth> 0) {
      console.l0g("--fx--rBAd--");
      rBAd.innerHTML= "<div>ROOOOOOOOOOOAR<br>RIGHT BOTTOM ADS HERE</div>";
      rBAd.style.border = "solid #EEEEEE";
      rBAd.style.background = "#ffffff";
    }
  }, 100);
});

let fullscreenSupported = true;
let isFullScreen = false;
let scrollPosition = 0;
const body = document.querySelector('html');
const isMobile = window.orientation > -1;
let processingLike = false;
let doneUpdating = false;
const THEME_ROOT = '//' + window.location.hostname + '/wp-content/themes/GAAMESS/';
const partnerUrl = 'https://gameshost.io';
let isSingle = false;
let isHome = false;
let randomPostIsLoaded = false;
let sidebarIsLoaded = false;
let RANDOM_BOX_CLICKED_TIMES = 0;
let ignoreAppInstall = false;
let timeoutAppInstall;
var wgAppInstall;
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
let overlayOpen = {
    search: false
};
let searchInput;
const debounce = (func,wait)=>{
    let timeout;
    return function executedFunction(...args) {
        const later = ()=>{
            clearTimeout(timeout);
            func(...args);
        }
        ;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    }
    ;
}
;
var isInViewport = function(elem) {
    var bounding = elem.getBoundingClientRect();
    return (bounding.top >= 0 && bounding.left >= 0 && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) && bounding.right <= (window.innerWidth || document.documentElement.clientWidth));
};
document.addEventListener("DOMContentLoaded", function() {
    if (document.getElementById("fullscreen") != null) {
        if (document.getElementById("fullscreen").getAttribute("hidden") == "true") {
            fullscreenSupported = false;
        }
    }
    if (document.body.classList.contains('single')) {
        isSingle = true;
    }
    if (document.body.classList.contains('home')) {
        isHome = true;
    }
    if (isSingle) {
        initLikeButtons();
        refreshLikeDisData();
    }
    if (isHome) {
        let randomBox = document.querySelector('[randomizer]');
        randomBox.addEventListener("mouseover", function() {
            getRandomPost();
        });
        randomBox.addEventListener('auxclick', function(e) {
            if (e.button == 1) {
                RANDOM_BOX_CLICKED_TIMES++;
                randomPostIsLoaded = false;
                getRandomPost();
            }
        });
        var ngLeft = document.querySelector("#ng_Left");
        var ngRight = document.querySelector("#ng_Right");
        var ngList = document.querySelector(".nG");
        ngLeft.addEventListener("click", function() {
            ngList.style.transform = "translate3d(0px, 0px, 0px)";
            ngRight.classList.remove("ng_bD");
            ngLeft.classList.add("ng_bD");
        });
        ngRight.addEventListener("click", function() {
            ngList.style.transform = "translate3d(-324px, 0px, 0px)";
            ngLeft.classList.remove("ng_bD");
            ngRight.classList.add("ng_bD");
        });
    }
    if (isSingle) {
        var cooki;
        cooki = get_the_id() + '-' + getCookie("recently_played");
        setCookie("recently_played", cooki, 31);
    }
    getSidebar();
    if (isSingle) {
        var gameCanvas = document.getElementById("gameCanvas");
        var _PrerollSplash = document.querySelector(".PrerollSplash");
        var _CTAPlay = document.querySelectorAll(".CTAPlay");
        var _LoadingAnim = document.querySelector(".gameplay__loading");
        _CTAPlay.forEach(cta=>{
            cta.addEventListener('click', ()=>{
                gameCanvas.setAttribute("src", gameCanvas.getAttribute("data-src"));
                gameCanvas.removeAttribute("data-src");
                _PrerollSplash.style.display = 'none';
                try {
                    _LoadingAnim.parentNode.removeChild(_LoadingAnim);
                } catch (e) {}
            }
            );
        }
        );
        wgAppInstall = document.querySelector(".appInstall");
        wgAppInstall.addEventListener("mouseover", appInstallMouseOver);
        wgAppInstall.addEventListener("mouseout", appInstallMouseOut);
    }
    document.body.setAttribute("loaded", true);
    let gameDiv = document.querySelectorAll(".cSt[video]");
    gameDiv.forEach(game=>{
        let video = game.querySelector(".ftVideo");
        game.addEventListener("mouseover", ()=>{
            if (!video.playing) {
                video.play();
                video.currentTime = 0;
            }
        }
        );
        game.addEventListener("mouseout", ()=>{
            if (video.playing) {
                video.pause();
            }
        }
        );
    }
    );
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            closeBackdropOverlay();
        }
    });
    searchInput = document.querySelector(".Search__SearchInput");
    var fetchSearchData = debounce(function() {
        SearchDataFetch();
    }, 300);
    searchInput.addEventListener('keyup', fetchSearchData);
    var contentElement = document.querySelector('.breadcrumbs');
    var showAll = document.querySelector('.showAll');
    window.addEventListener('scroll', function(event) {
        if (isHome) {
            if (isInViewport(contentElement)) {
                if (showAll.getAttribute("onscreen") == "false") {
                    showAll.setAttribute("onscreen", true);
                    showAll.removeAttribute("animateout");
                    showAll.setAttribute("animatein", "");
                }
            } else {
                if (showAll.getAttribute("onscreen") == "true") {
                    showAll.setAttribute("onscreen", false);
                    showAll.removeAttribute("animatein");
                    showAll.setAttribute("animateout", "");
                }
            }
        }
    }, false);
});
function handleInteraction(type) {
    var interactions = JSON.parse(getCookie("interactions")) || {
        likes: [],
        dislikes: []
    };
    var currentPostID = get_the_id();
    if (type === 'like') {
        interactions.likes.push(currentPostID);
    } else if (type === 'dislike') {
        interactions.dislikes.push(currentPostID);
    }
    var expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (30 * 24 * 60 * 60 * 1000));
    setCookie("interactions", JSON.stringify(interactions), expirationDate);
}
function appInstallMouseOver() {
    if (timeoutAppInstall == null)
        return;
    clearTimeout(timeoutAppInstall);
}
function appInstallMouseOut() {
    if (timeoutAppInstall == null)
        return;
    appInstallSetTimeout();
}
function showAppInstall() {
    console.log("show app install");
    if (ignoreAppInstall)
        return;
    if (wgAppInstall.getAttribute("onscreen") === "true")
        return;
    if (wgAppInstall.getAttribute("wg-app-install") === null)
        return;
    if (getCookie("_appInstall") === "dont_show_again")
        return;
    wgAppInstall.setAttribute("onscreen", true);
    wgAppInstall.removeAttribute("animateout");
    wgAppInstall.setAttribute("animatein", "");
    appInstallSetTimeout();
}
function appInstallSetTimeout() {
    timeoutAppInstall = setTimeout(function() {
        closeAppInstall();
        ignoreAppInstall = false;
    }, 20000);
}
function closeAppInstall() {
    wgAppInstall.setAttribute("onscreen", false);
    wgAppInstall.removeAttribute("animatein");
    wgAppInstall.setAttribute("animateout", "");
    ignoreAppInstall = true;
    clearTimeout(timeoutAppInstall);
}
let pos = {
    top: 0,
    left: 0,
    x: 0,
    y: 0
};
const ele = document.getElementById('QuickTagsContainer');
let preventLinkClick = false;
const mouseDownHandler = function(e) {
    pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        x: e.clientX,
        y: e.clientY,
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};
const mouseMoveHandler = function(e) {
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;
    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
    if (ele.scrollLeft < ele.scrollWidth - ele.clientWidth) {
        document.querySelector(".tags-wrapper .right-arrow").setAttribute("hidden", false);
    }
    if (ele.scrollLeft > 2) {
        document.querySelector(".tags-wrapper .left-arrow").setAttribute("hidden", false);
    }
    if (ele.scrollLeft === 0) {
        console.log("you reach the start");
        document.querySelector(".tags-wrapper .left-arrow").setAttribute("hidden", true);
    }
    preventLinkClick = true;
};
const mouseUpHandler = function() {
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
    calltimeout();
};
function calltimeout() {
    setTimeout(function() {
        preventLinkClick = false;
    }, 100);
}
ele.addEventListener('mousedown', mouseDownHandler);
ele.addEventListener('click', function(e) {
    if (preventLinkClick === true) {
        e.preventDefault();
        e.stopPropagation();
    }
});
function SearchDataFetch() {
    var minlength = 3;
    if (searchInput.value.length >= minlength) {
        const url = THEME_ROOT + 'php/search.php?keyword=' + searchInput.value;
        document.querySelector(".NavButtons__SearchSVGIcon").setAttribute("hidden", true);
        document.querySelector(".SpinnerSVGIcon").setAttribute("hidden", false);
        document.querySelector(".ClearButton").setAttribute("hidden", true);
        fetch(url, {
            method: 'GET',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'text/html'
            }
        }).then(function(response) {
            return response.text();
        }).then(function(html) {
            document.querySelector(".TransformContainer .DataFetch").innerHTML = html;
            document.querySelector(".TransformContainer .DataFetch").setAttribute("hidden", false);
            if (html.indexOf("notFound") == -1) {
                document.querySelector(".TransformContainer .SearchRoot").setAttribute("hidden", true);
            } else {
                document.querySelector(".TransformContainer .SearchRoot").setAttribute("hidden", false);
            }
            document.querySelector(".NavButtons__SearchSVGIcon").setAttribute("hidden", true);
            document.querySelector(".SpinnerSVGIcon").setAttribute("hidden", true);
            document.querySelector(".ClearButton").setAttribute("hidden", false);
            document.querySelector("#QuickTagsContainer").setAttribute("hidden", true);
        }).catch(function(err) {
            console.warn('Something went wrong.', err);
        });
    } else if (searchInput.value.length < 1) {
        document.querySelector(".TransformContainer .DataFetch").setAttribute("hidden", true);
        document.querySelector(".TransformContainer .SearchRoot").setAttribute("hidden", false);
        document.querySelector(".NavButtons__SearchSVGIcon").setAttribute("hidden", false);
        document.querySelector(".SpinnerSVGIcon").setAttribute("hidden", true);
        document.querySelector(".ClearButton").setAttribute("hidden", true);
        document.querySelector("#QuickTagsContainer").setAttribute("hidden", false);
    }
}
document.addEventListener('click', function(event) {
    if (event.target.id == "like") {
        likeDis(1);
        handleInteraction('like');
    }
    if (event.target.id == "dislike") {
        likeDis(0);
        handleInteraction('dislike')
    }
    if (event.target.id == "closeAppInstall") {
        closeAppInstall();
    }
    if (event.target.id == "appInstall_ignore") {
        setCookie("_appInstall", "dont_show_again", 31);
        closeAppInstall();
        document.querySelector(".button.install").remove();
    }
    if (event.target.id == "appInstall_addtohome") {
        closeAppInstall();
    }
    if (event.target.id == "ClearSearchInput") {
        searchInput.value = "";
        SearchDataFetch();
    }
    if (event.target.id == "SearchCloseBtn") {
        closeBackdropOverlay();
    }
    if (event.target.id == "searchBtn") {
        overlayOpen.search = true;
        lockScroll();
        document.querySelector(".BackdropOverlay").setAttribute("hidden", false);
        document.querySelector(".SearchCont").classList.add("SearchOverlayContainerOpen");
        document.querySelector(".SearchCont").classList.remove('SearchOverlayContainer');
        document.querySelector(".SearchCont").setAttribute("overlay", "");
        document.querySelector("nav").setAttribute("mode", "bar");
        document.querySelector("#SearchCloseBtn").setAttribute("hidden", false);
        const links = document.querySelectorAll(".TransformContainer a");
        for (let i = 0; i < links.length; i++) {
            links[i].addEventListener("click", function() {
                closeBackdropOverlay();
            });
        }
        searchInput.focus();
        try {
            closeSticky();
        } catch (error) {}
    }
    if (event.target.id == "backdropOverlay") {
        closeBackdropOverlay();
    }
    if (event.target.id == "fullscreen") {
        toggleFullScreen(document.body);
    }
}, false);
function closeSticky() {
    var searchCloseSticky = document.querySelectorAll(".wgStickyBottom");
    if (searchCloseSticky.length) {
        if (searchCloseSticky[0].classList.value == "wgStickyBottom adWrapper wgSlideOutToBottom")
            return;
        document.querySelector('.close_sticky').click();
    }
}
function closeBackdropOverlay() {
    if (overlayOpen.search) {
        overlayOpen.search = false;
        unlockScroll();
        document.querySelector("#SearchCloseBtn").setAttribute("hidden", true);
        document.querySelector(".SearchCont").classList.add("SearchOverlayContainer");
        document.querySelector(".SearchCont").classList.remove('SearchOverlayContainerOpen');
        document.querySelector(".SearchCont").removeAttribute("overlay");
        document.querySelector("nav").setAttribute("mode", "box");
        setTimeout(function() {
            searchInput.value = "";
            SearchDataFetch();
        }, 200);
    }
    document.querySelector(".BackdropOverlay").setAttribute("hidden", true);
}
function lockScroll() {
    scrollPosition = window.pageYOffset;
    body.style.position = 'fixed';
    body.style.top = "-" + scrollPosition + "px";
    body.style.width = '100%';
}
function unlockScroll() {
    body.removeAttribute("style");
    body.removeAttribute("class");
    window.scrollTo(0, scrollPosition);
}
function toggleFullScreen(elem) {
    if (!fullscreenSupported)
        return;
    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elem.requestFullScreen) {
            elem.requestFullScreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullScreen) {
            elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}
if (document.addEventListener) {
    document.addEventListener('fullscreenchange', exitHandler, false);
    document.addEventListener('mozfullscreenchange', exitHandler, false);
    document.addEventListener('MSFullscreenChange', exitHandler, false);
    document.addEventListener('webkitfullscreenchange', exitHandler, false);
}
const gameplayClass = document.querySelector(".gameplay");
function exitHandler() {
    if (document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement !== null) {
        isFullScreen = !isFullScreen;
        gameplayClass.setAttribute("fullscreen", isFullScreen);
    }
}
window.addEventListener('message', event=>{
    if (event.origin.startsWith(partnerUrl)) {
        if (event.data == "Flash_ShowAd") {
            Flash_ShowAd();
        }
        if (event.data == "C3_ShowAd") {
            C3_ShowAd();
        }
        if (event.data == "C2_ShowAd") {
            C2_ShowAd();
        }
        if (event.data == "Poki_ShowAd") {
            Poki_ShowAd();
        }
        if (event.data == "none") {
            showAd();
        }
    } else {
        return;
    }
}
);
function Poki_ShowAd() {
    if (window[window.preroll.config.loaderObjectName].refetchAd() != false) {
        ObserverForIngameAds();
        document.getElementById("gameCanvas").contentWindow.postMessage("Poki_Pause", partnerUrl);
    }
    window[window.preroll.config.loaderObjectName].refetchAd(RESUME_POKI_CALLBACK);
}
function RESUME_POKI_CALLBACK() {
    document.getElementById("gameCanvas").contentWindow.postMessage("Poki_Resume", partnerUrl);
}
function Flash_ShowAd() {
    if (window[window.preroll.config.loaderObjectName].refetchAd() == false)
        return;
    ObserverForIngameAds();
    window[window.preroll.config.loaderObjectName].refetchAd(RESUME_FLASH_CALLBACK);
    document.getElementById("gameCanvas").contentWindow.postMessage("Flash_Pause", partnerUrl);
}
function RESUME_FLASH_CALLBACK() {
    document.getElementById("gameCanvas").contentWindow.postMessage("Flash_Resume", partnerUrl);
}
function C3_ShowAd() {
    if (window[window.preroll.config.loaderObjectName].refetchAd() == false)
        return;
    ObserverForIngameAds();
    window[window.preroll.config.loaderObjectName].refetchAd(RESUME_C3_CALLBACK);
    document.getElementById("gameCanvas").contentWindow.postMessage("C3_Pause", partnerUrl);
}
function RESUME_C3_CALLBACK() {
    document.getElementById("gameCanvas").contentWindow.postMessage("C3_Resume", partnerUrl);
}
let isPlayingConstructTwoAd = false;
window.addEventListener('blur', C2_MUTEGAME);
window.addEventListener('focus', C2_MUTEGAME);
function C2_ShowAd() {
    if (window[window.preroll.config.loaderObjectName].refetchAd() == false)
        return;
    ObserverForIngameAds();
    isPlayingConstructTwoAd = true;
    window[window.preroll.config.loaderObjectName].refetchAd(RESUME_C2_CALLBACK);
    document.getElementById("gameCanvas").contentWindow.postMessage("C2_Pause", partnerUrl);
}
function RESUME_C2_CALLBACK() {
    isPlayingConstructTwoAd = false;
    document.getElementById("gameCanvas").contentWindow.postMessage("C2_Resume", partnerUrl);
}
function C2_MUTEGAME() {
    if (isPlayingConstructTwoAd) {
        document.getElementById("gameCanvas").contentWindow.postMessage("C2_Pause", partnerUrl);
    }
}
function showAd() {
    if (window[window.preroll.config.loaderObjectName].refetchAd() == false)
        return;
    ObserverForIngameAds();
    window[window.preroll.config.loaderObjectName].refetchAd(RESUME_GAME_CALLBACK);
    document.getElementById('gameCanvas').blur();
    try {
        document.querySelector('[data-wgplayer="true"]').click();
    } catch (error) {}
}
function RESUME_GAME_CALLBACK() {
    document.getElementById('gameCanvas').focus();
    try {
        document.querySelector('#gameCanvas').click();
    } catch (error) {}
}
function get_the_id() {
    var page_body = document.body;
    var id = 0;
    if (page_body) {
        var classList = page_body.getAttribute('class').split(/\s+/);
        classList.forEach(function(item, index) {
            if (item.indexOf('postid') >= 0) {
                var item_arr = item.split('-');
                id = item_arr[item_arr.length - 1];
                return false;
            }
        });
    }
    return id;
}
function getSidebar() {
    if (sidebarIsLoaded)
        return;
    const url = THEME_ROOT + 'php/sidebar.php?temp';
    fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache'
        }
    }).then(function(response) {
        return response.text();
    }).then(function(html) {
        document.querySelector(".TransformContainer .SearchRoot").innerHTML = html;
        sidebarIsLoaded = true;
    }).catch(function(err) {
        console.warn('Something went wrong.', err);
    });
}
function getRandomPost() {
    if (randomPostIsLoaded)
        return;
    const url = THEME_ROOT + 'php/random-post.php?temp=' + RANDOM_BOX_CLICKED_TIMES;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/html',
            'Cache-Control': 'no-cache'
        }
    }).then(function(response) {
        return response.text();
    }).then(function(html) {
        document.querySelector("[randomizer]").href = `${html}?utm_source=surprise_game`;
        randomPostIsLoaded = true;
    }).catch(function(err) {
        console.warn('Something went wrong.', err);
    });
}
function getLikeMode() {
    return localStorage.getItem(get_the_id());
}
async function initLikeButtons() {
    const likeElement = document.getElementById('like');
    const dislikeElement = document.getElementById('dislike');
    if (getLikeMode() == 2) {
        likeElement.classList.add('current');
        dislikeElement.classList.remove('current');
    }
    if (getLikeMode() == 1) {
        likeElement.classList.remove('current');
        dislikeElement.classList.add('current');
    }
    if (getLikeMode() == 0) {
        likeElement.classList.remove('current');
        dislikeElement.classList.remove('current');
    }
}
async function refreshLikeDisData() {
    if (doneUpdating)
        return;
    doneUpdating = true;
    const url = '//' + window.location.hostname + '/wp-content/themes/GAAMESS/php/get_likes.php?pId=' + get_the_id();
    fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'text/html'
        }
    }).then(function(response) {
        return response.text();
    }).then(function(html) {
        const value = html.split(',');
        var dld = 0;
        let dlt = document.querySelector("#dislike .vote_num");
        dld = shortNumber(parseInt(value[1]));
        dlt.setAttribute("value", parseInt(parseInt(value[1])));
        dlt.innerHTML = dld;
        var l = 0;
        let lt = document.querySelector("#like .vote_num");
        l = shortNumber(parseInt(value[0]));
        lt.setAttribute("value", parseInt(parseInt(value[0])));
        lt.innerHTML = l;
    }).catch(function(err) {
        doneUpdating = false;
        console.warn('Something went wrong.', err);
    });
}
function likeDis(action) {
    var substract;
    var b = false;
    var bl = false;
    if (processingLike)
        return;
    processingLike = true;
    substract = 0;
    if (action == 0 && getLikeMode() == 1) {
        localStorage.setItem(get_the_id(), 0);
        substract = 1;
        initLikeButtons();
        b = true;
        bl = true;
        var dl = 0;
        let dlt = document.querySelector("#dislike .vote_num");
        dl = shortNumber(parseInt(dlt.getAttribute("value")) - 1);
        dlt.setAttribute("value", parseInt(dlt.getAttribute("value")) - 1);
        dlt.innerHTML = dl;
    }
    if (action == 1 && getLikeMode() == 2) {
        localStorage.setItem(get_the_id(), 0);
        substract = 1;
        initLikeButtons();
        b = true;
        bl = true;
        var l = 0;
        let lt = document.querySelector("#like .vote_num");
        l = shortNumber(parseInt(lt.getAttribute("value")) - 1);
        lt.setAttribute("value", parseInt(lt.getAttribute("value")) - 1);
        lt.innerHTML = l;
    }
    if (getLikeMode() == 2 && action == 0) {
        bl = true;
        substract = 3;
        var l = 0;
        let lt = document.querySelector("#like .vote_num");
        l = shortNumber(parseInt(lt.getAttribute("value")) - 1);
        lt.setAttribute("value", parseInt(lt.getAttribute("value")) - 1);
        lt.innerHTML = l;
        var dl = 0;
        let dlt = document.querySelector("#dislike .vote_num");
        dl = shortNumber(parseInt(dlt.getAttribute("value")) + 1);
        dlt.setAttribute("value", parseInt(dlt.getAttribute("value")) + 1);
        dlt.innerHTML = dl;
    }
    if (getLikeMode() == 1 && action == 1) {
        bl = true;
        substract = 2;
        var l = 0;
        let lt = document.querySelector("#like .vote_num");
        l = shortNumber(parseInt(lt.getAttribute("value")) + 1);
        lt.setAttribute("value", parseInt(lt.getAttribute("value")) + 1);
        lt.innerHTML = l;
        var dl = 0;
        let dlt = document.querySelector("#dislike .vote_num");
        dl = shortNumber(parseInt(dlt.getAttribute("value")) - 1);
        dlt.setAttribute("value", parseInt(dlt.getAttribute("value")) - 1);
        dlt.innerHTML = dl;
        showAppInstall();
    }
    if (!b) {
        localStorage.setItem(get_the_id(), action + 1);
    }
    if (!bl) {
        if (getLikeMode() == 1) {
            var dl = 0;
            let dlt = document.querySelector("#dislike .vote_num");
            dl = shortNumber(parseInt(dlt.getAttribute("value")) + 1);
            dlt.setAttribute("value", parseInt(dlt.getAttribute("value")) + 1);
            dlt.innerHTML = dl;
        }
        if (getLikeMode() == 2) {
            var l = 0;
            let lt = document.querySelector("#like .vote_num");
            l = shortNumber(parseInt(lt.getAttribute("value")) + 1);
            lt.setAttribute("value", parseInt(lt.getAttribute("value")) + 1);
            lt.innerHTML = l;
            showAppInstall();
        }
    }
    initLikeButtons();
    const url = '//' + window.location.hostname + '/wp-content/themes/GAAMESS/php/like.php';
    var http = new XMLHttpRequest();
    var params = 'response=' + action + '&pId=' + get_the_id() + '&value=' + substract;
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            processingLike = false;
        }
    }
    http.send(params);
}
function shortNumber(num) {
    return Math.abs(num) > 999 ? Math.sign(num) * ((Math.abs(num) / 1000).toFixed(1)) + 'K' : Math.sign(num) * Math.abs(num)
}
function setCookie(name, value, days) {
    let expires = '';
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
function getCookie(name) {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function deleteCookie(name) {
    setCookie(name, '', -1);
}
function wgStickyBottomObserve(element) {
    const wgStickyBottom = new MutationObserver(function(mutations, observer) {
        document.documentElement.style.setProperty('--wgStickyBottomOffset', `${mutations[0].target.clientHeight}px`);
        if (mutations[0].target.classList.contains("bottomOpened")) {
            document.documentElement.style.setProperty('--wgStickyBottomOffset', `${mutations[0].target.clientHeight}px`);
        }
        if (mutations[0].target.classList.contains("bottomClosed")) {
            document.documentElement.style.setProperty('--wgStickyBottomOffset', '0px');
        }
    }
    );
    wgStickyBottom.observe(element, {
        attributes: true,
        childList: true
    });
}
var wgStickyBottomHTML = document.querySelector("html");
const wgStickyBottomMO = new MutationObserver(function(mutations, observer) {
    try {
        if (mutations[0].addedNodes[0].id === "gpt_unit_/1002212,22675695278/WGAFCANCHOR/Gaamess.com_0") {
            wgStickyBottomObserve(document.getElementById("gpt_unit_/1002212,22675695278/WGAFCANCHOR/Gaamess.com_0"));
            wgStickyBottomMO.disconnect();
        }
        if (mutations[0].addedNodes[0].id === "gpt_unit_/1002212,22675695278/WGAFCANCHOR/Gaamess.de_0") {
            wgStickyBottomObserve(document.getElementById("gpt_unit_/1002212,22675695278/WGAFCANCHOR/Gaamess.de_0"));
            wgStickyBottomMO.disconnect();
        }
    } catch (error) {
        wgStickyBottomMO.disconnect();
    }
}
);
wgStickyBottomMO.observe(wgStickyBottomHTML, {
    attributes: true,
    childList: true
});

$(document).ready(function(){
    /* Declare variables */
    var interval;
    var form = $('#popup form');
    var skin_id = 3;

    function checkSkin() {
        if (localStorage.getItem('skin_id_' + skin_id) == 1) { disableRow('.skins'); }
    }

    function checkDownloads() {
        var downloads = getDailyDownloads();
        if (downloads >= 10) { disableRow('.downloads'); }
        setDownloadsValue(downloads);
    }

    function checkUploads() {
        var uploads = getDailyUploads();
        if (uploads >= 5) { disableRow('.uploads'); }
        setUploadsValue(uploads);
    }
    function checkLevels() {
        var levels = getLevels();
        if (levels >= 10) { disableRow('.levels'); }
        setLevelsValue(levels);
    }

    function getDailyDownloads() {
        var downloads = localStorage.getItem('daily_downloads');
        if (downloads == null || downloads < 0) downloads = 0;
        return parseInt(downloads);
    }
    function getDailyUploads() {
        var uploads = localStorage.getItem('daily_uploads');
        if (uploads == null || uploads < 0) uploads = 0;
        return parseInt(uploads);
    }
    function getLevels() {
        var levels = localStorage.getItem('max_levels');
        if (levels == null) levels = 3;
        return parseInt(levels);
    }
    function setSkin(value) { localStorage.setItem('skin', value); localStorage.setItem('skin_id_' + value, 1); window.storageManager.uploadLocalStorageToChromeStorage(); }
    function setDownloads(value) { localStorage.setItem('daily_downloads', value); window.storageManager.uploadLocalStorageToChromeStorage(); }
    function setUploads(value) { localStorage.setItem('daily_uploads', value); window.storageManager.uploadLocalStorageToChromeStorage(); }
    function setLevels(value) { localStorage.setItem('max_levels', value); window.storageManager.uploadLocalStorageToChromeStorage(); }
    function setDownloadsValue(value) { $('.downloads .icon .value').text(value); }
    function setUploadsValue(value) { $('.uploads .icon .value').text(value); }
    function setLevelsValue(value) { $('.levels .icon .value').text(value); }

    function disableRow(rowClass) {
        var row = $(rowClass);
        var button = row.find('.button');
        row.addClass('disabled');
        button.addClass('disabled');
        button.attr('tabindex', -1);
    }

    function startTimer(duration, element, callback = function(){}) {
        var timer = duration, min, sec;
        if (interval == null) {
            interval = setInterval(function () {
                min = parseInt(timer / 60, 10);
                sec = parseInt(timer % 60, 10);
                min = min < 10 ? "0" + min : min;
                sec = sec < 10 ? "0" + sec : sec;
                element.html("(" + min + ":" + sec + ")");
                if (--timer < 0) {
                    timer = 0;
                    endTimer();
                    callback();
                }
            }, 1000);
        }
    }
    
    function endTimer() {
        clearInterval(interval);
        interval = null;
    }

    function checkUsername() {
        // Get form data and get user id
        var dataType = form.attr('data-type');
        if (dataType == 'activate-skin') {
            addVerifiedText('<h1>Skin <strong><em><i class="material-icons">favorite</i></em></strong> activated!</h1>');
            setSkin(skin_id);
            disableRow('.skins');
        }
        else if (dataType == 'add-downloads') {
            var downloads = getDailyDownloads();
            downloads += 10;
            addVerifiedText('<h1>More <strong><em>downloads</em></strong> added!</h1>');
            setDownloads(downloads);
            checkDownloads();
        }
        else if (dataType == 'add-uploads') {
            var uploads = getDailyUploads();
            uploads += 5;
            addVerifiedText('<h1>More <strong><em>uploads</em></strong> added!</h1>');
            setUploads(uploads);
            checkUploads();
        }
        else if (dataType == 'add-levels') {
            var levels = getLevels();
            levels += 1;
            addVerifiedText('<h1>Max <strong><em>levels</em></strong> increased!</h1>');
            setLevels(levels);
            checkLevels();
        }
    }

    function addVerifiedText(text) {
        $('#popup').addClass('verified');
        $('.step-3').html(text);
    }

    function submitLogin(e) {
        // get form data and get user id
        var username = form.find('input[name="username"]').val();
        if (username == 'kargoh') { updateValidation('Please use <strong><em>your</em></strong> Youtube account name'); }
        else { checkUsername(); }
    }

    function updateValidation(error) {
        var messageClass = 'validation';
        if ($('.' + messageClass).length > 0) $('.' + messageClass).text(error);
        else form.append('<p class="' + messageClass + '">' + error + '</p>');
        form.removeClass('loading');
    }

    /* Popup listener */
    $('.rewards .button').on('click', function(e){
        e.preventDefault();
        $('body').addClass('disable-scroll');
        $('#popup').addClass('visible');
        $('#popup .step-2').addClass('disabled');
        $('#popup .step-2 form > *').attr('tabindex', '-1');
        form.attr('data-type', $(this).attr('href').substring(1));
    });

    /* Popup close listener */
    $('#popup .close').on('click', function(e){
        e.preventDefault();
        $('body').removeClass('disable-scroll');
        $('#popup').removeClass('visible');
        $('#popup').removeClass('verified');
        $('#popup .step-2').removeClass('disabled');
        $('#popup .step-2 form > *').removeAttr('tabindex', '-1');
        $('.instructions').addClass('invisible');
        $('.validation').remove();
        form.removeAttr('data-type');
        form.removeClass('loading');
        endTimer();
    });

    /* Link listener */
    $('#popup .link, #popup .youtube-container').on('click', function(e){
        var minutes = 5;
        var element = $('#timer');

        // Add link to YouTube container and click it
        if ($(this).hasClass('youtube-container')) {
            var href = $(this).find('iframe').attr('src');
            //href = href.replace('embed/', 'watch?v=');
            href = 'https://www.youtube.com/kargoh';
            chrome.tabs.create({ url: href });
        }

        // Show instructions and start timer
        $('.instructions').removeClass('invisible');
        startTimer(minutes * 60, element, function(){
            $('.step-2').removeClass('disabled');
            $('.step-2 form > *').attr('tabindex', '0');
        });
    });

    /* Form listener */
    form.on('submit', function(e){
        e.preventDefault();
        form.addClass('loading');
        setTimeout(function() { submitLogin(); }, 3000);
    })

    checkSkin();
    checkDownloads();
    checkUploads();
    checkLevels();
});
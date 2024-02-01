$(document).ready(function(){
    var userLogin;
    var messageClass = 'message';
    var form = $('#promo');
    var interval;

    // Add link listener
    $('.link').on('click', function(e){
        var parent = $(this).parent();
        if (parent.hasClass('option-1')) {
            $('.step-2').removeClass('disabled');
            $('.step-2 input, .step-2 button').attr('tabindex', '0');
        }
        else if (parent.hasClass('option-2')) {
            var minutes = 5;
            var element = $('#timer');
            var instructions = $('.instructions');
            instructions.fadeIn();
            startTimer(minutes * 60, element, function(){
                $('.step-2').removeClass('disabled');
                $('.step-2 input, .step-2 button').attr('tabindex', '0');
            });
        }
    });

    // add event listener
    form.on('submit', function(e){
        e.preventDefault();
        form.addClass('loading');
        setTimeout(function() { submitLogin(); }, 3000);
    })

    function checkYoutubeUsername() {
        // Get form data and get user id
        localStorage.setItem('skin_id_1', 1);
        addVerifiedText();
    }

    function submitLogin(e) {
        // get form data and get user id
        $('.' + messageClass).remove();
        userLogin = form.find('input[name="user_login"]').val();
        if (userLogin == 'kargoh') {
            updateMessage('Please use <strong><em>your</em></strong> Youtube account name');
        }
        else {
            checkYoutubeUsername(form)
        }
    }

    function addVerifiedText() {
        form.closest('.row').html('<div class="col"><h1>Skin <i class="material-icons">favorite</i> activated!</h1></div>');
    }

    function updateMessage(error) {
        if ($('.' + messageClass).length > 0) $('.' + messageClass).text(error);
        else form.append('<p class="' + messageClass + '">' + error + '</p>');
        form.removeClass('loading');
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
                    clearInterval(interval);
                    callback();
                }
            }, 1000);
        }
    }

    // Enable option randomly
    var option = Math.round(Math.random()) + 1;
    var optionClass = '.option-' + option;
    $(optionClass).removeClass('hidden');

    // Check verification
    if (localStorage.getItem('skin_id_1') == 1) addVerifiedText();
});
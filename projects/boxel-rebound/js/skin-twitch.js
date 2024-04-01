var userId;
var userLogin;
var streamerId;
var streamerLogin;
var messageClass = 'message';
var formClass = 'promo-twitch';
var clientId = 'l38dqlxt78kp125j56u3uwdgi95hbs';

// add event listener
$('#' + formClass).on('submit', function(e){
    e.preventDefault();
    $(this).addClass('loading');
    //submitLogin($(this));
    checkTwitchUsername($(this));
})

function checkTwitchUsername(form) {
    // Get form data and get user id
    $('.' + messageClass).remove();
    userLogin = form.find('input[name="user_login"]').val();
    streamerLogin = form.find('input[name="streamer_login"]').val();
    var url = 'https://www.dopplercreative.com/boxel-rebound-portal/index.php';
    var data = { 'twitch_username': userLogin };
    
    // Call server for twitch username
    $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(response) {
            console.log(response.success);
            if (userLogin == 'doppler_tv') {
                updateMessage('Please use your Twitch account.');
            }
            else {
                console.log(response);
                if (response.success.includes('skin approved')) {
                    localStorage.setItem('skin', 3);
                    localStorage.setItem('skin_id_3', 1);
                    addVerifiedText();
                }
                else {
                    updateMessage('Account is not verified. Did you follow Kargoh and say something in chat?');
                }
            }
        }
    });
}

function submitLogin(form) {
    // get form data and get user id
    $('.' + messageClass).remove();
    userLogin = form.find('input[name="user_login"]').val();
    streamerLogin = form.find('input[name="streamer_login"]').val();
    if (userLogin == 'doppler_tv') {
        updateMessage('Please use your Twitch account.');
    }
    else {
        getUserId();
    }
}

function getUserId() {
    $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/helix/users?login=' + userLogin,
        headers: { 'Client-ID': clientId },
        success: function (data) {
            console.log(data);
            if (data.data[0] != null) {
                userId = data.data[0].id;
                getStreamerId();
            }
            else {
                updateMessage('Twitch account not found.');
            }
        }
    });
}

function getStreamerId() {
    $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/helix/users?login=' + streamerLogin,
        headers: { 'Client-ID': clientId },
        success: function (data) {
            console.log(data);
            if (data.data[0] != null) {
                streamerId = data.data[0].id;
                checkFollowing();
            }
            else {
                updateMessage('Streamer account not found.');
            }
        }
    });
}

function checkFollowing() {
    $.ajax({
        type: 'GET',
        url: 'https://api.twitch.tv/helix/users/follows?from_id=' + userId + '&to_id=' + streamerId,
        headers: { 'Client-ID': clientId },
        success: function (data) {
            console.log(data);
            if (data.data[0] != null) {
                localStorage.setItem('skin', 3);
                localStorage.setItem('skin_id_3', 1);
                addVerifiedText();
            }
            else {
                updateMessage('Account is not verified. Please try again in 5 minutes.');
            }
        }
    });
}

function addVerifiedText() {
    $("#" + formClass).parent().html('<h1>Skin <i class="material-icons">favorite</i> activated!</h1>');
}

function updateMessage(error) {
    if ($('.' + messageClass).length > 0) $('.' + messageClass).text(error);
    else $('#' + formClass).append('<p class="' + messageClass + '">' + error + '</p>');
    $('#' + formClass).removeClass('loading');
}

$(document).ready(function(){
    if (localStorage.getItem('skin_id_3') == 1) addVerifiedText();
});
// Storage for tokens
var VungleHelper = {}

// Legacy IEC v1 Event
window.callSDK = function(action) {
    parent.postMessage(action, '*');
};

// Legacy IEC v2 Event
window.actionClicked = function(action) {
    parent.postMessage(action, '*');
};

// Adwords Open Event
window.open = function() {
    //Open should always redirect to CTA Download
    parent.postMessage('download', '*');
};

window.addEventListener('touchstart', function() {
    parent.postMessage('interacted', '*');
});

document.addEventListener('DOMContentLoaded', function() {
        window.sendMessage('ad-event-loaded')
})

function sendEvent(name, obj) {
    if(typeof obj === 'undefined'){obj = {}}
    var event = new CustomEvent(name, { 'detail': obj });
    window.dispatchEvent(event);
}

// Disable Event Propagation for touchstart event listeners
Event.prototype.stopPropagation = function() {}

window.sendMessage = function(title, obj) {
    // Make sure you are sending a string, and to stringify JSON
    var data = {
        title: title,
        content: obj
    }

    window.parent.postMessage(data, '*');
};

window.receiveMessage = function(e) {
    if (e.data.length === 0 || typeof e.data.title === 'undefined')
        return

    window.processMessage(e.data.title, e.data.content || {})
    sendEvent(e.data.title, e.data.content || {})
}

window.processMessage = function(title, content) {
    switch (title) {
        case 'ad-event-init':
            VungleHelper.tokens = content.tokens;
            VungleHelper.closeDelay = content.closeDelay;
            VungleHelper.rewardedAd = content.rewardedAd;
            break;
    }
}

window.addEventListener('message', window.receiveMessage);

window.sendInstructions = function() {
    window.sendMessage('ad-event-child-instructions', window.vungleSettings)
}

if (typeof window.vungleSettings !== 'undefined')
    window.sendInstructions()
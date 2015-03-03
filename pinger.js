var timeout = 5000;
var lag = 3000;
var file = '/XHRTesting/ping.txt';
document.addEventListener('DOMContentLoaded', function (){
    var ping = function ping() {

        var nextPing = function() {
            setTimeout(ping, lag);
        };

        var xhr = new XMLHttpRequest();
        xhr.onload = function (e) {
            window.parent.postMessage({type: 'success'}, '*');
            nextPing();
        };
        xhr.onerror = function (e) {
            window.parent.postMessage({type: 'connectionFailure'}, '*');
            nextPing();
        };
        xhr.ontimeout = function (e) {
            window.parent.postMessage({type: 'timeoutFailure'}, '*');
            nextPing();
        };
        xhr.open('GET', file + '?_=' + new Date().getTime(), true);
        xhr.timeout = timeout;
        xhr.send();
    };

    ping();
});
document.addEventListener('DOMContentLoaded', function (ev){
    var iframes = document.querySelectorAll('iframe.pinger');
    var tbody = document.getElementById('results-tbody');

    Array.prototype.forEach.call(iframes, function (iframe){
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + iframe.getAttribute('origin') + '</td><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>';
        tbody.appendChild(row);

        var totalNode = row.children[1];
        var successNode = row.children[2];
        var failureNode = row.children[3];
        var timeoutNode = row.children[4];
        var connectionNode = row.children[5];

        window.addEventListener('message', function (ev) {
            if (ev.source === iframe.contentWindow) {
                var nSuccess = parseInt(successNode.innerText);
                var nFailure = parseInt(failureNode.innerText);
                var nTotal = parseInt(totalNode.innerText);
                var nTimeout = parseInt(timeoutNode.innerText);
                var nConnectionFail = parseInt(connectionNode.innerText);

                if (ev.data && ev.data.type === 'success') {
                    totalNode.innerText = (nTotal + 1).toString();
                    successNode.innerText = (nSuccess + 1).toString();
                } else if (ev.data && ev.data.type === 'connectionFailure') {
                    totalNode.innerText = (nTotal + 1).toString();
                    failureNode.innerText = (nFailure + 1).toString();
                    connectionNode.innerText = (nConnectionFail + 1).toString();
                } else if (ev.data && ev.data.type === 'timeoutFailure') {
                    totalNode.innerText = (nTotal + 1).toString();
                    failureNode.innerText = (nFailure + 1).toString();
                    timeoutNode.innerText = (nTimeout + 1).toString();
                } else if (ev.data && ev.data.type === 'unknownFailure') {
                    totalNode.innerText = (nTotal + 1).toString();
                    failureNode.innerText = (nFailure + 1).toString();
                }
            }
        });
    });
});

var deferredPrompt;

// 브라우저가 serviceworker 지원여부 체크하고 지원하지 않는다면 실행안됨.
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js', { score: '/'})
        .then(function() {
           console.log('Service worker registered')
        }).catch(function(err) {
            console.log(err);
        });
}

window.addEventListener('beforeinstallpromp', function(event) {
    console.log('beforeinstallprompt fired')
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        reject({code: 500, message: 'An error occurred!'})
    }, 3000)
});

fetch('https://httpbin.org/ip')
    .then(function(response) {
        console.log(response);
        return response.json();
    }).then(function(data) {
        console.log(data);
    }).catch(function(err) {
        console.log(err);
    })

promise.then(function(text) {
    return text;
}).then(function(newText) {
    console.log(newText)
}).catch(function(err) {
    console.log(err.code, err.message);
});

setTimeout(function() {
    console.log('This is executed once the timer is done!');
}, 3000);

console.log('This is executed right after setTimeout()');

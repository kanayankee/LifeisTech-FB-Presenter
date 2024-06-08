function urlCheck() {
    console.log('urlCheck');
    var url = window.location.href;
    var has_redirect = url.includes('CHRONOLOGICAL');
    var is_groupspage = url.match(/.*\/groups\/[a-zA-Z0-9.]{7,}$/);
    if (!has_redirect && is_groupspage) {
        console.log('redirecting');
        var new_url = url + '?sorting_setting=CHRONOLOGICAL';
        window.location.replace(new_url);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    urlCheck();
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message === "tab_updated") {
            urlCheck();
        }
    }
);
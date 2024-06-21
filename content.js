function urlCheck() {
    var url = window.location.href;
    var has_redirect = url.includes('CHRONOLOGICAL');
    var is_groupspage = url.match(/.*\/groups\/[a-zA-Z0-9.?=&_]{7,}$/);
    var is_groupspage2 = url.match(/.*\/groups\/[a-zA-Z0-9.?=&_]{7,}\/\?[a-zA-Z0-9.?=&_].*$/);
    if (!has_redirect && (is_groupspage || is_groupspage2)) {
        var new_url = url.split('?')[0] + '?sorting_setting=CHRONOLOGICAL';
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
var url = window.location.href;
var has_redirect = url.includes('sorting_setting=CHRONOLOGICAL');
var on_groupspage = url.includes('facebook.com/groups');
// var new_url = url + '?sorting_setting=CHRONOLOGICAL';

if (!has_redirect && on_groupspage) {
    var new_url = url + '?sorting_setting=CHRONOLOGICAL';
    window.location.replace(new_url);
} 
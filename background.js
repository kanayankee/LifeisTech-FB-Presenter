chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.url) {
        chrome.tabs.sendMessage(tabId, {
            message: "tab_updated"
        }).catch(() => { });
    }
});

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        chrome.tabs.create({ url: "https://kanayan.notion.site/Life-is-Tech-Facebook-Presenter-15611de70df78035adf9ede14682447a?source=copy_link" });
    }
});
chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    id: "qrl",
    title: "Qrlify",
    type: "normal",
    contexts: ["image", "selection"],
  });

  chrome.contextMenus.onClicked.addListener(function (info) {
    const isMediaType = info.mediaType === "image";
    const dataToConvertQR = isMediaType ? encodeURI(info.srcUrl) : info.selectionText;
    chrome.storage.sync.set(
      { data: dataToConvertQR, isNewData: true },
      function () {
        chrome.tabs.create({url:"popup.html"});
      }
    );
  });
});

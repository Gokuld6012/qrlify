document.addEventListener(
  "DOMContentLoaded",
  function () {
    chrome.storage.sync.get(["data", "isNewData"], function (result) {
      if (result.isNewData) {
        getURL(result.data);
      } else {
        showQRCodeForCurrentURL();
      }
    });
  },
  false
);

function showQRCodeForCurrentURL() {
  chrome.tabs.query(
    {
      currentWindow: true,
      active: true,
    },
    function (tabs) {
      getURL(encodeURI(tabs[0].url), "url");
    }
  );
}

function getURL(data, type) {
  if (!data.startsWith("chrome://")) {
    $("#qrcode").qrcode(data);
  } else {
    $("#msg").text("QR cannot generate for this URL");
  }
  if (type !== "url") {
    chrome.storage.sync.set({
      isNewData: false
    })
  }
}

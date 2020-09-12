"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = search;

function search(data, text, save) {
  try {
    var newData = data.filter(function (item) {
      var displayName = item.displayName ? item.displayName : "".concat(item.first_name).concat(item.last_name);
      var itemData = "".concat(displayName.toUpperCase());
      var textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    save(newData);
  } catch (error) {
    console.log(error, 'error');
  }
}

;
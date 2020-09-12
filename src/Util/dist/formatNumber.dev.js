"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatNumber = void 0;
var formatNumber = {
  separador: ".",
  // separador para los miles
  sepDecimal: ',',
  // separador para los decimales
  formatear: function formatear(num) {
    num += '';
    var splitStr = num.split('.');
    var splitLeft = splitStr[0];
    var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
    var regx = /(\d+)(\d{3})/;

    while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
    }

    return this.simbol + splitLeft + splitRight;
  },
  "new": function _new(num, simbol) {
    this.simbol = simbol || '';
    return this.formatear(num);
  }
};
exports.formatNumber = formatNumber;
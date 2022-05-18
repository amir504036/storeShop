import persianJs from "persianjs";

var persianNumbers = [
  /۰/g,
  /۱/g,
  /۲/g,
  /۳/g,
  /۴/g,
  /۵/g,
  /۶/g,
  /۷/g,
  /۸/g,
  /۹/g
];
var arabicNumbers = [
  /٠/g,
  /١/g,
  /٢/g,
  /٣/g,
  /٤/g,
  /٥/g,
  /٦/g,
  /٧/g,
  /٨/g,
  /٩/g
];

export default class SpUtils {
  static ConvertNumberToPersian(value) {
    if (
      value === null ||
      value === " " ||
      value === "" ||
      value === " " ||
      value === "" ||
      value === undefined
    ) {
      return "۰";
    } else {
      if (value === "0") {
        return "۰";
      }

      let number = persianJs(value)
        .englishNumber()
        .toString();
      return number;
    }
  }

  static ConvertNumberToPersianNoZero(value) {
    if (
      value === null ||
      value === " " ||
      value === "" ||
      value === " " ||
      value === "" ||
      value === undefined
    ) {
      return "";
    } else {
      if (value === "0") {
        return "۰";
      }

      let number = persianJs(value)
        .englishNumber()
        .toString();
      return number;
    }
  }

  static convertNumberToEnglishNoZero(str) {
    if (typeof str === "string") {
      for (var i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
      }
    }
    return str;
  }
}

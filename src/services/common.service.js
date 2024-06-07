import moment from "moment";
import { localStorageService } from "./localStorge.service";
import { showToastByStatusCode } from "./showToastByStatusCode";
// import fileType from "file-type";

const fileTypes = {
  image: [
    { extension: "jpeg", mimeType: "image/jpeg" },
    { extension: "jpg", mimeType: "image/jpeg" },
    { extension: "png", mimeType: "image/png" },
    { extension: "gif", mimeType: "image/gif" },
    { extension: "bmp", mimeType: "image/bmp" },
  ],
  document: [
    { extension: "pdf", mimeType: "application/pdf" },
    { extension: "doc", mimeType: "application/msword" },
    {
      extension: "docx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
    { extension: "txt", mimeType: "text/plain" },
  ],
  spreadsheet: [
    { extension: "xls", mimeType: "application/vnd.ms-excel" },
    {
      extension: "xlsx",
      mimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    { extension: "csv", mimeType: "text/csv" },
  ],
  audio: [
    { extension: "mp3", mimeType: "audio/mpeg" },
    { extension: "wav", mimeType: "audio/wav" },
    { extension: "ogg", mimeType: "audio/ogg" },
  ],
  video: [
    { extension: "mp4", mimeType: "video/mp4" },
    { extension: "avi", mimeType: "video/x-msvideo" },
    { extension: "mkv", mimeType: "video/x-matroska" },
  ],
};

export const commonService = {
  calculateDaysAndNights: (startDate, endDate) => {
    if (startDate && endDate) {
      const start = moment(startDate);
      const end = moment(endDate);

      const days = end.diff(start, "days");
      const nights = days - 1;

      return { days, nights };
    }
  },

  calculateEndDate: (startDate, days, nights) => {
    const start = moment(startDate);
    const end = start.clone().add(days, "days").add(nights, "days");

    return end.format("YYYY-MM-DD");
  },

  calculateNightsAndEndDate: (startDate, days) => {
    const start = moment(startDate);
    const end = start.clone().add(days, "days");
    const nights = days - 1;
    const endDate = end.subtract(nights, "days").format("YYYY-MM-DD");

    return { nights, endDate };
  },

  calculateDaysAndEndDate: (startDate, nights) => {
    const start = moment(startDate);
    const end = start.clone().add(nights, "days");
    const days = nights + 1;
    const endDate = end.subtract(1, "days").format("YYYY-MM-DD");

    return { days, endDate };
  },

  validateFile: (value) => {
    // Perform file validation logic
    const file = value[0];
    const allowedTypes = ["image/jpeg", "image/png"];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
      return true; // File is not required, so no validation needed
    }

    if (!allowedTypes.includes(file.type)) {
      return "Invalid file type. Please upload a JPEG or PNG image.";
    }

    if (file.size > maxFileSize) {
      return "File size exceeds the maximum limit of 5MB.";
    }

    /// return true; // Return true for valid file
  },
  getCurrentTimeFileName: () => {
    var currentDate = new Date();
    var currentTime = currentDate.toISOString().replace(/[-:.T]/g, "");
    var fileName = currentTime + ".txt";
    return fileName;
  },
  userLogout: () => {
    localStorageService.remove("GG_ADMIN");
    window.location.href = "/login";
  },
  userChangePassword: () => {
    // Assuming the user successfully changes their password here
    localStorageService.remove("GG_ADMIN");
    window.location.href = "/change-current-password"; // Redirecting to the login page after password change
  },
};

export function scrollToElement(elementId, offset = 0) {
  let options = { behavior: "smooth", block: "start", inline: "nearest" };
  if (!elementId) {
    window.scrollTo({
      top: 0 + offset,
      ...options,
    });
    return;
  }

  const element = document.getElementById(elementId);

  if (element) {
    element.scrollIntoView({
      top: element.getBoundingClientRect().top + window.scrollY + offset,
      ...options,
    });
  }
}

export function numberToWords(number) {
  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];
  const thousands = ["", "thousand", "million", "billion", "trillion"];

  function convertToWords(num) {
    if (num === "" || num === undefined) return "";
    if (num === 0) return "zero";
    if (num < 10) return ones[num];
    if (num < 20) return teens[num - 10];
    if (num < 100)
      return tens[Math.floor(num / 10)] + " " + convertToWords(num % 10);
    if (num < 1000)
      return (
        ones[Math.floor(num / 100)] + " hundred " + convertToWords(num % 100)
      );
    for (let i = 0; i < thousands.length; i++) {
      if (num < 1000 ** (i + 1)) {
        return (
          convertToWords(Math.floor(num / 1000 ** i)) +
          " " +
          thousands[i] +
          " " +
          convertToWords(num % 1000 ** i)
        );
      }
    }
    return "out of range";
  }

  function decimalToWords(decimal) {
    const decimalWords = decimal
      ?.toString()
      ?.split("")
      ?.map((digit) => ones[parseInt(digit)])
      ?.join(" ");

    return `point ${decimalWords}`;
  }

  if (isNaN(number)) {
    return " ";
  }

  if (number === 0) {
    return "zero";
  }

  if (number < 0) {
    return "negative " + numberToWords(Math.abs(number));
  }

  const parts = number?.toString().split(".") || [];
  const integerPart = parseInt(parts[0]);
  const decimalPart = parts[1] ? parseInt(parts[1]) : 0;

  let result = convertToWords(integerPart);

  if (decimalPart > 0) {
    result += " " + decimalToWords(decimalPart);
  }

  return result;
}

export function toasterAlert(errorResponse) {
  const errorMessage = [];
  console.log("error message:", errorResponse);

  if (errorResponse && Array.isArray(errorResponse?.data?.message)) {
    errorMessage.push(...errorResponse.data.message);
  } else {
    showToastByStatusCode(
      400,
      errorResponse?.data?.message || errorResponse?.data?.detail
    );
    return;
  }

  // Check if there are any error messages
  if (errorMessage.length > 0) {
    // Handle the error messages, e.g., display them to the user
    // console.error("API Error:", errorMessage);
    showToastByStatusCode(400, errorMessage.join("\n"));
  } else {
    console.error("Unknown API Error");
    showToastByStatusCode(400, "Something went wrong !");
  }
}

export function isValidAadhaarNumber(aadhaarNumber) {
  // Regular expression pattern for a valid Aadhaar number
  const aadhaarRegex =
    /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;

  // Remove any spaces or hyphens from the input string
  const cleanedAadhaarNumber = aadhaarNumber?.replace(/\s|-/g, "");
  console.log(cleanedAadhaarNumber);
  // Check if the cleaned input string matches the regex pattern
  return aadhaarRegex.test(cleanedAadhaarNumber);
}

(function () {
  "use strict";

  function captcha(options) {
    var defaults = {
      defaultElement: "captchaCC",
      captchaLabelId: "captchaText",
      idCaptchaInput: "captchaInput",
      CaptchaPlaceholderText: "Complete Captcha",
      errorDivId: "captchaError",
      inputClass: "",
      errorClass: "valid",
      numberClass: "captcha-number",
      operationClass: "captcha-symbol",
      errorMessage: "Invalid captcha. Please try again.",
    };

    // Merge user options with defaults
    var settings = Object.assign({}, defaults, options);

    var container =
      document.querySelector(`#${settings.defaultElement}`) ||
      document.querySelector("#captchaCC");
    if (!container) return;

    // Create captcha label
    var captchaLabel = document.createElement("label");
    captchaLabel.id = settings.captchaLabelId;
    captchaLabel.htmlFor = settings.idCaptchaInput;
    container.appendChild(captchaLabel);

    // Create spans for numbers and operator
    var num1Span = document.createElement("span");
    num1Span.className = settings.numberClass;
    var operatorSpan = document.createElement("span");
    operatorSpan.className = settings.operationClass;
    var num2Span = document.createElement("span");
    num2Span.className = settings.numberClass;
    var equalsSpan = document.createElement("span");
    equalsSpan.className = settings.operationClass;

    captchaLabel.appendChild(num1Span);
    captchaLabel.appendChild(operatorSpan);
    captchaLabel.appendChild(num2Span);
    captchaLabel.appendChild(equalsSpan);

    // Create captcha input
    var captchaInput = document.createElement("input");
    captchaInput.id = settings.idCaptchaInput;
    captchaInput.placeholder = settings.CaptchaPlaceholderText;
    captchaInput.type = "text";
    captchaInput.required = true;
    captchaInput.setAttribute("aria-label", "Captcha Input");
    captchaInput.className = settings.inputClass;
    container.appendChild(captchaInput);

    // Create error message div
    var errorDiv = document.createElement("div");
    errorDiv.id = settings.errorDivId;
    if (settings.errorDivId === "captchaError") {
      errorDiv.style.color = "red";
    }
    errorDiv.style.display = "none";
    errorDiv.className = settings.errorClass;
    errorDiv.textContent = settings.errorMessage;
    container.appendChild(errorDiv);

    // Captcha generation function
    var generateCaptcha = function () {
      var num1 = Math.floor(Math.random() * 10);
      var num2 = Math.floor(Math.random() * 10);
      var operations = ["+", "-", "*"];
      // var selectedOperator =
      //   operations[Math.floor(Math.random() * operations.length)];
      var selectedOperator = "+";
      var captchaAnswer;

      switch (selectedOperator) {
        case "+":
          captchaAnswer = num1 + num2;
          break;
        // case "-":
        //   captchaAnswer = num1 - num2;
        //   break;
        // case "*":
        //   captchaAnswer = num1 * num2;
        //   break;
      }

      num1Span.textContent = num1;
      operatorSpan.textContent = ` ${selectedOperator} `;
      num2Span.textContent = num2;
      equalsSpan.textContent = " =";

      return captchaAnswer;
    };

    var captchaAnswer = generateCaptcha();

    // Restrict input to numbers only
    captchaInput.addEventListener("input", function () {
      captchaInput.value = captchaInput.value.replace(/\D/g, "");
    });

    // Hide error on focus
    captchaInput.addEventListener("focus", function () {
      errorDiv.style.display = "none";
    });

    // Validation function
    container.validateCaptcha = function () {
      var userInput = parseInt(captchaInput.value, 10);
      if (isNaN(userInput) || userInput !== captchaAnswer) {
        errorDiv.style.display = "block";
        captchaAnswer = generateCaptcha();
        captchaInput.value = "";
        return false;
      }
      return true;
    };

    return container;
  }

  // Expose the captcha function globally
  window.captcha = captcha;
})();

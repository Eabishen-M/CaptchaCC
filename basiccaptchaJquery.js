!(function (t) {
  "use strict";
  t.fn.captcha = function (a) {
    var e = t.extend(
      {
        idCaptchaText: "captchaText",
        idCaptchaInput: "captchaInput",
        errorDiv: "captchaError",
        inputClass: "",
        errorClass: "valid",
      },
      a
    );

    // Add captcha elements
    var i = t(this).find("input[type=submit]");
    t('<label id="' + e.idCaptchaText + '"></label>').insertBefore(i);
    t(
      '<input id="' +
        e.idCaptchaInput +
        '" placeholder="Complete Captcha" aria-label="Captcha Input" type="text" required>'
    )
      .addClass(e.inputClass)
      .insertBefore(i);
    t('<div id="' + e.errorDiv + '" style="color:red; display:none;"></div>')
      .addClass(e.errorClass)
      .text("Invalid captcha. Please try again.")
      .insertAfter("#" + e.idCaptchaInput);

    // Captcha generation function
    var generateCaptcha = function () {
      var n = Math.floor(10 * Math.random()),
        r = Math.floor(10 * Math.random());
      d.text(n + " + " + r + " =");
      return n + r;
    };

    var d = this.find("#" + e.idCaptchaText),
      s = this.find("#" + e.idCaptchaInput),
      err = this.find("#" + e.errorDiv),
      c = generateCaptcha();

    // Validation function to check captcha correctness
    this.validateCaptcha = function () {
      var userInput = parseInt(t(s).val(), 10);
      if (userInput !== c) {
        t(err).show();
        c = generateCaptcha();
        t(s).val("");
        return false;
      }
      return true;
    };

    t(s).on("focus", function () {
      t(err).hide();
    });

    return this;
  };
})(jQuery);

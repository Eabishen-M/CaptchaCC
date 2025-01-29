# CaptchaCC

This is a lightweight and easy-to-use JavaScript library for generating and validating simple arithmetic captchas.  It's designed to be easily integrated into web forms to protect against bots.

## Features

* **Simple Arithmetic:** Uses basic addition (currently, easily extensible to subtraction and multiplication).
* **Customizable:**  Allows customization of element IDs, placeholder text, error messages, and CSS classes.
* **Accessibility:** Includes `aria-label` for accessibility.
* **Input Restriction:** Restricts input to numbers only.
* **Error Handling:** Provides clear error messages and resets the captcha on incorrect input.
* **Easy Integration:**  Simple function call to initialize and validate.
* **No Dependencies:**  Pure JavaScript, no external libraries required.

## Installation

Include the JavaScript file in your HTML:

```html
<script src="path/to/captcha.js"></script>

```

## Usage

### HTML Structure
Add a container element where the captcha will be generated. You can specify the ID of this container or use the default `captchaCC`.

```html
<div id="myCaptchaContainer"></div>
<form id="myForm">
  <button type="submit">Submit</button>
</form>
```

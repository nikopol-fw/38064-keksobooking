'use strict';

(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');

  var errorMessageHandler = function (response, description) {
    var errorNode = errorTemplate.cloneNode(true);
    var errorTextNode = errorNode.querySelector('.error__message');
    var message = response;

    if (description) {
      message += '<br>' + description;
    }
    errorTextNode.innerHTML = message;
    window.data.mainNode.appendChild(errorNode);

    var closeErrorMessage = function () {
      document.removeEventListener('click', errorMessageClickHandler);
      document.removeEventListener('keydown', errorMessageEscPressHandler);

      errorNode.remove();
      errorNode = null;
    };

    var errorMessageClickHandler = function () {
      closeErrorMessage();
    };

    var errorMessageEscPressHandler = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closeErrorMessage();
      }
    };

    document.addEventListener('click', errorMessageClickHandler);
    document.addEventListener('keydown', errorMessageEscPressHandler);
  };


  var successMessageHandler = function () {
    window.form.deactivatePage();

    var successNode = successTemplate.cloneNode(true);
    window.data.mainNode.appendChild(successNode);

    var closeSuccessMessage = function (node) {
      node.remove();
      node = null;

      document.removeEventListener('click', successNodeClickHandler);
      document.removeEventListener('keydown', successNodeEscPressHandler);
    };

    var successNodeClickHandler = function () {
      closeSuccessMessage(successNode);
    };

    var successNodeEscPressHandler = function (evt) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        closeSuccessMessage(successNode);
      }
    };

    document.addEventListener('click', successNodeClickHandler);
    document.addEventListener('keydown', successNodeEscPressHandler);
  };


  window.message = {
    error: errorMessageHandler,
    success: successMessageHandler
  };
})();

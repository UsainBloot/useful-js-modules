(function() {

  'use strict';

  /**
  AJAX Request

  Usage example:
    var Request = require('request');
    var request = new Request();

    var params = {
      url: 'http://localhost:8000/'
    }

    request.get(params, function(res) {
      console.log(res);
    });
  **/

  var httpRequest;

  function Request() {

  }

  Request.prototype.get = function(params, callback) {
    httpRequest = new XMLHttpRequest();

    if(!httpRequest) {
      console.error('Error: Can not create an XMLHttpRequest');
    }

    httpRequest.onreadystatechange = getResponse.bind(this, callback);

    httpRequest.open('GET', params.url);
    httpRequest.send();
  };

  function getResponse(callback) {
    var response;
    if(httpRequest.readyState === XMLHttpRequest.DONE) {
      if(httpRequest.status === 200) {
        response = httpRequest.responseText;
      } else {
        console.error('Error: Problem with request');
      }
      callback(JSON.parse(response));
    }
  }

  return Request;

})();

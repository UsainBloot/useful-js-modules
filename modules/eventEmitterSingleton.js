module.exports = (function() {

  'use strict';

  /**
  EventEmitter Singleton
  To be used across multiple modules to share events

  Usage Example:
    this.events = new EventEmitter();
    ...
    var fn = function() {
      ...
    }
    this.events.on(event, fn);
  **/
  var instance;

  function EventEmitter() {
    /* Singleton */
    if(!instance) {
      this.init.apply(this, arguments);
      instance = this;
    }

    return instance;
  }

  EventEmitter.prototype.init = function() {
    this.callbacks = {};
  };

  /* Add new callback to an event */
  EventEmitter.prototype.on = function(event, callback) {
    if(!this.callbacks[event]) { this.callbacks[event] = []; }

    this.callbacks[event].push(callback);
    return this.callbacks[event];
  };

  /* Remove all callbacks for event */
  EventEmitter.prototype.off = function(event) {
    this.callbacks[event] = [];
    return this.callbacks[event];
  };

  /* Unbinds a single callback on an event */
  EventEmitter.prototype.unbind = function(event, callback) {
    this.callbacks[event].splice(this.callbacks[event].indexOf(callback), 1);
    return this.callbacks[event];
  };

  /* Emits an event calling all callbacks */
  EventEmitter.prototype.emit = function(event) {
    var args = Array.prototype.slice.call(arguments, 1);

    if(this.callbacks[event] && this.callbacks[event].length) {
      this.callbacks[event].forEach(function loopCallbacks(fn) {
        fn.apply(this, args);
      });
    }
  };

  return EventEmitter;

})();

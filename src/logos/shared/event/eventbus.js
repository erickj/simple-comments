goog.provide('logos.event.EventBus');

goog.require('goog.events.EventTarget');



/**
 * @constructor
 * @extends {goog.events.EventTarget}
 * @final
 */
logos.event.EventBus = function() {
  goog.events.EventTarget.call(this);
};
goog.inherits(logos.event.EventBus, goog.events.EventTarget);

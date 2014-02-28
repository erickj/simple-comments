goog.provide('logos.storage.ContainerStore');



/**
 * @interface
 */
logos.storage.ContainerStore = function() {};


/**
 * @param {string} key
 * @return {!logos.storage.Result}
 */
logos.storage.prototype.getRecord

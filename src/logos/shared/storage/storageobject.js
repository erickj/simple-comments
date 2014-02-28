goog.provide('logos.storage.StorageObject');



/**
 * @interface
 */
logos.storage.StorageObject = function() {};


/**
 * @return {*}
 */
logos.storage.StorageObject.prototype.getValue = goog.abstractMethod;


/**
 * @return {string}
 */
logos.storage.StorageObject.prototype.getId = goog.abstractMethod;

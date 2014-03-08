goog.provide('logos.model.Conversation');

goog.require('logos.model.Object');
goog.require('logos.model.ObjectContainer');



/**
 * @param {string} id
 * @constructor
 * @extends {logos.model.Object};
 * @struct
 */
logos.model.Conversation = function(id) {
  logos.model.Object.call(this, id, logos.model.Object.Type.CONVERSATION);

  /** @private {!logos.model.ObjectContainer.<!logos.model.Thread>} */
  this.threadContainer_ =
      new logos.model.ObjectContainer([logos.model.Object.Type.THREAD]);
};
goog.inherits(logos.model.Conversation, logos.model.Object);


/**
 * @param {!logos.model.Thread} thread
 */
logos.model.Conversation.prototype.addThread = function(thread) {
  this.threadContainer_.addObject(thread);
};


/**
 * @param {string} id
 * @return {!logos.model.Thread}
 */
logos.model.Conversation.prototype.getThread = function(id) {
  return this.threadContainer_.getObjectWithId(id);
};


/**
 * @return {!Array.<!logos.model.Thread>} All threads in the conversation.
 */
logos.model.Conversation.prototype.getThreads = function() {
  return this.threadContainer_.getObjectsInOrder();
};

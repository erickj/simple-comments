goog.provide('logos.model.Thread');

goog.require('logos.model.Object');
goog.require('logos.model.ObjectContainer');



/**
 * @param {string} id
 * @param {logos.model.Thread.Topic} topic
 * @constructor
 * @extends {logos.model.Object};
 * @struct
 */
logos.model.Thread = function(id, topic) {
  logos.model.Object.call(this, id, logos.model.Object.Type.THREAD);

  /** @private {logos.model.Thread.Topic} */
  this.topic_ = topic;

  /** @private {!logos.model.ObjectContainer.<!logos.model.Comment>} */
  this.commentContainer_ =
      new logos.model.ObjectContainer([logos.model.Object.Type.COMMENT]);
};
goog.inherits(logos.model.Thread, logos.model.Object);


/** @enum {string} */
logos.model.Thread.Topic = {
  MAIN: 'main'
};


/**
 * @param {!logos.model.Comment} thread
 */
logos.model.Thread.prototype.addComment = function(thread) {
  this.commentContainer_.addObject(thread);
};


/**
 * @param {string} id
 * @return {!logos.model.Comment}
 */
logos.model.Thread.prototype.getComment = function(id) {
  return this.commentContainer_.getObjectWithId(id);
};


/**
 * @param {string} id
 * @return {boolean}
 */
logos.model.Thread.prototype.hasComment = function(id) {
  return this.commentContainer_.hasObjectWithId(id);
};


/**
 * @return {!Array.<!logos.model.Comment>} All threads in the conversation.
 */
logos.model.Thread.prototype.getComments = function() {
  return this.commentContainer_.getObjectsInOrder();
};


/**
 * @return {logos.model.Thread.Topic}
 */
logos.model.Thread.prototype.getTopic = function() {
  return this.topic_;
};

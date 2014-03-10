goog.provide('logos.model.Model');

goog.require('logos.model.ObjectContainer');
goog.require('logos.model.VersionProvider');



/**
 * @param {!logos.model.VersionProvider} versionProvider A provider
 *     for the model version.
 * @constructor
 * @struct
 * @final
 */
logos.model.Model = function(versionProvider) {
  /** @private {!logos.model.ObjectContainer.<!logos.model.Conversation>} */
  this.conversationContainer_ = new logos.model.ObjectContainer(
      [logos.model.Object.Type.CONVERSATION]);

  /** @private {!logos.model.ObjectContainer.<!logos.model.User>} */
  this.userContainer_ = new logos.model.ObjectContainer(
      [logos.model.Object.Type.USER]);

  /**
   * The version provider is used to keep the version read-only on the model,
   * while still allowing it to be updated from outside of the model and its
   * accessors.
   * @private {!logos.model.VersionProvider}
   */
  this.versionProvider_ = versionProvider;
};


/** @return {number} */
logos.model.Model.prototype.getVersion = function() {
  return this.versionProvider_.getVersion();
};


/**
 * @param {!logos.model.Conversation} conversation
 */
logos.model.Model.prototype.addConversation = function(conversation) {
  this.conversationContainer_.addObject(conversation);
};


/**
 * @param {string} id
 * @return {!logos.model.Conversation}
 * @throws {Error} if conversation is not found
 */
logos.model.Model.prototype.getConversation = function(id) {
  return this.conversationContainer_.getObjectWithId(id);
};


/**
 * @param {string} id
 * @return {boolean}
 */
logos.model.Model.prototype.hasConversation = function(id) {
  return this.conversationContainer_.hasObjectWithId(id);
};


/**
 * @param {!logos.model.User} user
 */
logos.model.Model.prototype.addUser = function(user) {
  this.userContainer_.addObject(user);
};


/**
 * @param {string} id
 * @return {!logos.model.User}
 * @throws {Error} if user is not found
 */
logos.model.Model.prototype.getUser = function(id) {
  return this.userContainer_.getObjectWithId(id);
};


/**
 * @param {string} id
 * @return {boolean}
 */
logos.model.Model.prototype.hasUser = function(id) {
  return this.userContainer_.hasObjectWithId(id);
};

goog.provide('logos.command.CommandSet');



/**
 * A set of commands that will all be applied together to a single model
 * version.
 * @param {!Array.<!logos.command.Command>} commands
 * @param {number} modelVersion
 * @constructor
 * @struct
 * @final
 */
logos.command.CommandSet = function(commands, modelVersion) {
  /** @private {!Array.<!logos.command.Command>} */
  this.commands_ = commands;

  /** @private {number} */
  this.modelVersion_ = modelVersion;
};


/**
 * @return {number} The model version at which this command set was applied.
 */
logos.command.CommandSet.prototype.getModelVersion = function() {
  return this.modelVersion_;
};


/**
 * @return {!Array.<!logos.command.Command>} The commands
 */
logos.command.CommandSet.prototype.getCommands = function() {
  return this.commands_.concat();
};


/**
 * Transforms this command set against the given command set. The given command
 * set has already been applied to the model, so only this command set can be
 * transformed. This is O(n^2 + n*m) where n is the number of commands in this
 * set and m is the number in the {@code transformAgainst} set.
 * @param {!logos.command.CommandSet} transformAgainst
 * @return {!logos.command.CommandSet}
 */
logos.command.CommandSet.prototype.transform = function(transformAgainst) {
  if (!transformAgainst.getCommands().length) {
    return this;
  }

  var transformedCommands = [];
  var theseCommands = this.commands_;
  var thoseCommands = transformAgainst.getCommands();
  for (var i = 0; i < theseCommands.length; i++) {
    var thisCommand = theseCommands[i];

    // First transform against each command in thoseCommands
    for (var j = 0; j < thoseCommands.length; j++) {
      thisCommand = thisCommand.transform(thoseCommands[j]);
    }

    // Then transform against all the new commands in the transformedCommands
    for (var k = 0; k < transformedCommands.length; k++) {
      thisCommand = thisCommand.transform(transformedCommands[k]);
    }

    transformedCommands.push(thisCommand);
  };

  return new logos.command.CommandSet(
      transformedCommands, ++transformAgainst.getModelVersion());
};

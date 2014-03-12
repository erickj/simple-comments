goog.provide('spec.logos.command.CommandSetSpec');

goog.require('logos.command.Command');
goog.require('logos.command.CommandSet');
goog.require('logos.command.NoopCommand');

describe('logos.command.CommandSet', function() {
  var commandSet;
  var commandList;

  beforeEach(function() {
    commandList = [
      /** @type {!logos.command.Command} */ ({}),
      /** @type {!logos.command.Command} */ ({}),
      /** @type {!logos.command.Command} */ ({})
    ];
    commandSet = new logos.command.CommandSet(commandList, 17);
  });

  describe('#getModelVersion', function() {
    it('gets the model version', function() {
      expect(commandSet.getModelVersion()).toBe(17);
    });
  });

  describe('#getCommands', function() {
    it('gets a shallow clone of the list of commands', function() {
      expect(commandSet.getCommands()).toEqual(commandList);
      expect(commandSet.getCommands()).not.toBe(commandList);
    });
  });

  describe('#transform', function() {
    /**
     * A fake Command implementation to test transforms.
     * @constructor
     * @implements {logos.command.Command}
     */
    var TransformTrackingCommand = function() {
      /** @type {!Array.<!logos.command.Command>} */
      this.transformedAgainst = [];
    };

    /** @override */
    TransformTrackingCommand.prototype.apply = function() {};

    /** @override */
    TransformTrackingCommand.prototype.canApply = function() {};

    /** @override */
    TransformTrackingCommand.prototype.getType = function() {
      return logos.command.Command.Type.NOOP;
    };

    /** @override */
    TransformTrackingCommand.prototype.equals = function() {};

    /** @override */
    TransformTrackingCommand.prototype.transform = function(other) {
      this.transformedAgainst.push(other);
      return this;
    };

    var otherCommandSet;
    var thisCommandSet;
    var thisCommandList;

    beforeEach(function() {
      otherCommandSet = new logos.command.CommandSet(commandList, 0);
      thisCommandList = [
        new TransformTrackingCommand(),
        new TransformTrackingCommand()
      ];
      thisCommandSet = new logos.command.CommandSet(thisCommandList, 3);
    });

    it('skips transforming if other is empty', function() {
      expect(thisCommandSet.transform(
          new logos.command.CommandSet([], 0))).toBe(thisCommandSet);
    });

    it('transforms each command in its own list against the other commands, ' +
       'and newly transformed commands', function() {
         thisCommandSet.transform(otherCommandSet);

         expect(thisCommandList[0].transformedAgainst.length).toBe(3);
         expect(thisCommandList[0].transformedAgainst).toEqual(commandList);

         expect(thisCommandList[1].transformedAgainst.length).toBe(4);
         expect(thisCommandList[1].transformedAgainst).toEqual(
             commandList.concat(thisCommandList[0]));
       });

    it('creates a new command set with a version number incremented from other',
       function() {
         var transformedCommandSet = thisCommandSet.transform(otherCommandSet);
         expect(transformedCommandSet.getModelVersion()).toBe(1);
       });
  });
});

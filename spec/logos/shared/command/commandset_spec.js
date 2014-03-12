goog.provide('spec.logos.command.CommandSetSpec');

goog.require('logos.command.Command');
goog.require('logos.command.CommandSet');
goog.require('logos.command.NoopCommand');
goog.require('spec.helpers.fake.FakeCommand');

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
    var FakeCommand = spec.helpers.fake.FakeCommand;
    var otherCommandSet;
    var thisCommandSet;
    var thisCommandList;

    beforeEach(function() {
      otherCommandSet = new logos.command.CommandSet(commandList, 0);
      thisCommandList = [
        new FakeCommand(),
        new FakeCommand()
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

goog.provide('spec.logos.command.CommandSetHistorySpec');

goog.require('logos.command.CommandSet');
goog.require('logos.command.CommandSetHistory');

describe('logos.command.CommandSetHistory', function() {
  var commandSetHistory;

  beforeEach(function() {
    commandSetHistory = new logos.command.CommandSetHistory();
  });

  describe('#addCommandSetToHistory', function() {
    it('throws an error if the CommandSet version is not in sync with the ' +
       'CommandSetHistory version',
       function() {
         var commandSet = new logos.command.CommandSet([], 1);
         expect(function() {
           commandSetHistory.addCommandSetToHistory(commandSet);
         }).toThrow();
       });

    it('adds a CommandSet to the history', function() {
      var commandSet = new logos.command.CommandSet([], 0);
      commandSetHistory.addCommandSetToHistory(commandSet);

      commandSet = new logos.command.CommandSet([], 1);
      commandSetHistory.addCommandSetToHistory(commandSet);

      commandSet = new logos.command.CommandSet([], 2);
      commandSetHistory.addCommandSetToHistory(commandSet);
    });
  });

  describe('#getCommandsSinceVersion', function() {
    it('returns an empty array if given version is at or ahead of the ' +
       'current version',
       function() {
         expect(commandSetHistory.getCommandsSinceVersion(0)).toEqual([]);
         expect(commandSetHistory.getCommandsSinceVersion(100)).toEqual([]);
       });

    it('gets the commands since the given version', function() {
      var commandSet1 = new logos.command.CommandSet([], 0);
      commandSetHistory.addCommandSetToHistory(commandSet1);
      expect(commandSetHistory.getCommandsSinceVersion(0)).toEqual(
          [commandSet1]);

      var commandSet2 = new logos.command.CommandSet([], 1);
      commandSetHistory.addCommandSetToHistory(commandSet2);
      expect(commandSetHistory.getCommandsSinceVersion(0)).toEqual(
          [commandSet1, commandSet2]);

      expect(commandSetHistory.getCommandsSinceVersion(1)).toEqual(
          [commandSet2]);
    });
  });

  describe('#hasCommandsSinceVersion', function() {
    it('returns false if there are no commands since the given version',
       function() {
         expect(commandSetHistory.hasCommandsSinceVersion(0)).toBe(false)
       });

    it('returns true if there are commands at or after the given version',
       function() {
         var commandSet = new logos.command.CommandSet([], 0);
         commandSetHistory.addCommandSetToHistory(commandSet);
         expect(commandSetHistory.hasCommandsSinceVersion(0)).toBe(true);
       });
  });
});

goog.provide('spec.logos.command.CommandSetApplier');

goog.require('goog.events');
goog.require('goog.testing.events.EventObserver');
goog.require('logos.command.CommandExecutionContext');
goog.require('logos.command.CommandSet');
goog.require('logos.command.CommandSetApplier');
goog.require('logos.command.CommandSetHistory');
goog.require('logos.event.EventBus');
goog.require('logos.model.Model');
goog.require('logos.model.VersionProvider');
goog.require('spec.helpers.fake.FakeCommand');

describe('logos.command.CommandSetApplier', function() {
  var eventBus;
  var modelVersionProvider;
  var model;
  var commandContext;
  var commandSetHistory;
  var commandSetApplier;

  beforeEach(function() {
    eventBus = new logos.event.EventBus();
    modelVersionProvider = new logos.model.VersionProvider();
    model = new logos.model.Model(modelVersionProvider);
    commandContext = new logos.command.CommandExecutionContext(model);
    commandSetHistory = new logos.command.CommandSetHistory();

    commandSetApplier = new logos.command.CommandSetApplier(
        eventBus, commandContext, commandSetHistory, modelVersionProvider);
  });

  describe('#maybeApplyCommandSet', function() {
    var commandSet;

    beforeEach(function() {
      commandSet = new logos.command.CommandSet(
          [new spec.helpers.fake.FakeCommand()], 0);
    });

    it('returns true if it applies a CommandSet to the model', function() {
      expect(commandSetApplier.maybeApplyCommandSet(commandSet)).toBe(true);
    });

    it('increments the model version if it applies a CommandSet', function() {
      expect(modelVersionProvider.getVersion()).toBe(0);
      commandSetApplier.maybeApplyCommandSet(commandSet);
      expect(modelVersionProvider.getVersion()).toBe(1);
    });

    it('adds the CommandSet to the history at the given version', function() {
      expect(commandSetHistory.getCommandsSinceVersion(0)).toEqual([]);
      commandSetApplier.maybeApplyCommandSet(commandSet);
      expect(
          commandSetHistory.getCommandsSinceVersion(0)).toEqual([commandSet]);
    });

    describe('validates CommandSet version', function() {
      it('throws an error if the CommandSet is ahead of the model version',
         function() {
           expect(modelVersionProvider.getVersion()).toBe(0);

           var commandSetAheadOfModelVersion =
               new logos.command.CommandSet([], 1);
           expect(function() {
             commandSetApplier.
                 maybeApplyCommandSet(commandSetAheadOfModelVersion);
           }).toThrow();

           expect(modelVersionProvider.getVersion()).toBe(0);
         });
    });

    describe('transforming command sets', function() {
      var commandInHistory0;
      var commandSetInHistory0;
      var commandInHistory1;
      var commandSetInHistory1;

      beforeEach(function() {
        commandInHistory0 = /** @type {!logos.command.Command} */ ({});
        commandSetInHistory0 =
            new logos.command.CommandSet([commandInHistory0], 0);
        commandSetHistory.addCommandSetToHistory(commandSetInHistory0);
        modelVersionProvider.incrementVersion();

        commandInHistory1 = /** @type {!logos.command.Command} */ ({});
        commandSetInHistory1 =
            new logos.command.CommandSet([commandInHistory1], 1);
        commandSetHistory.addCommandSetToHistory(commandSetInHistory1);
        modelVersionProvider.incrementVersion();
      });

      it('transforms if CommandSet version is already in history', function() {
        expect(modelVersionProvider.getVersion()).toBe(2);

        var fakeCommandAt0 = new spec.helpers.fake.FakeCommand();
        var newCommandSetAt0 =
            new logos.command.CommandSet([fakeCommandAt0], 0);

        commandSetApplier.maybeApplyCommandSet(newCommandSetAt0);
        expect(fakeCommandAt0.transformedAgainst).
            toEqual([commandInHistory0, commandInHistory1]);

        expect(modelVersionProvider.getVersion()).toBe(3);

        var fakeCommandAt2 = new spec.helpers.fake.FakeCommand();
        var newCommandSetAt2 =
            new logos.command.CommandSet([fakeCommandAt2], 2);
        commandSetApplier.maybeApplyCommandSet(newCommandSetAt2);
        expect(fakeCommandAt2.transformedAgainst).
            toEqual([fakeCommandAt0]);

        expect(modelVersionProvider.getVersion()).toBe(4);

        var fakeCommandAt4 = new spec.helpers.fake.FakeCommand();
        var newCommandSetAt4 =
            new logos.command.CommandSet([fakeCommandAt4], 4);
        commandSetApplier.maybeApplyCommandSet(newCommandSetAt4);
        expect(fakeCommandAt4.transformedAgainst).toEqual([]);
      });
    }); // describe(transforming command sets)

    describe('checking commands canApply', function() {
      var fakeCommand1;
      var fakeCommand2;
      var commandSet;

      beforeEach(function() {
        fakeCommand1 = new spec.helpers.fake.FakeCommand();
        fakeCommand2 = new spec.helpers.fake.FakeCommand();
        commandSet =
            new logos.command.CommandSet([fakeCommand1, fakeCommand2], 0);
      });

      it('doesn\'t apply if Command#canApply returns false', function() {
        expect(modelVersionProvider.getVersion()).toBe(0);
        expect(commandSetHistory.hasCommandsSinceVersion(0)).toBe(false);

        fakeCommand2.canApply = function() { return false; };
        expect(commandSetApplier.maybeApplyCommandSet(commandSet)).toBe(false);

        expect(commandSetHistory.hasCommandsSinceVersion(0)).toBe(false);
        expect(modelVersionProvider.getVersion()).toBe(0);
      });
    });

    describe('events', function() {
      var eventObserver;
      var commandSet;

      beforeEach(function() {
        commandSet = new logos.command.CommandSet(
            [new spec.helpers.fake.FakeCommand()], 0);

        eventObserver = new goog.testing.events.EventObserver();
        goog.events.listen(
            eventBus, logos.command.CommandSetApplier.EventType.BEFORE_APPLY,
            eventObserver);
        goog.events.listen(
            eventBus, logos.command.CommandSetApplier.EventType.AFTER_APPLY,
            eventObserver);
      });

      it('dispatches BEFORE applying a CommandSet', function() {
        commandSetApplier.maybeApplyCommandSet(commandSet);

        var beforeEvents = eventObserver.getEvents(
            logos.command.CommandSetApplier.EventType.BEFORE_APPLY);
        expect(beforeEvents.length).toBe(1);
        expect(beforeEvents[0].commandSet).toEqual(commandSet);
      });

      it('dispatches AFTER applying a CommandSet', function() {
        commandSetApplier.maybeApplyCommandSet(commandSet);

        var afterEvents = eventObserver.getEvents(
            logos.command.CommandSetApplier.EventType.AFTER_APPLY);
        expect(afterEvents.length).toBe(1);
        expect(afterEvents[0].commandSet).toEqual(commandSet);
      });
    });
  }); // describe(#maybeApplyCommandSet)
});

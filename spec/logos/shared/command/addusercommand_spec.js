goog.provide('spec.logos.command.AddUserCommandSpec');

goog.require('logos.command.AddUserCommand');
goog.require('logos.command.CommandContext');
goog.require('logos.command.NoopCommand');
goog.require('logos.common.preconditions.IllegalStateException');
goog.require('logos.model.Model');
goog.require('logos.model.User');
goog.require('logos.model.VersionProvider');

describe('logos.command.AddUserCommand', function() {
  var user;
  var commandContext;
  var model;
  var command;

  beforeEach(function() {
    user = new logos.model.User('user-id', 'erick@j.com', 'Erick J');
    model = new logos.model.Model(new logos.model.VersionProvider());
    commandContext = new logos.command.CommandContext(model);
    command = new logos.command.AddUserCommand(user);
  });

  describe('#canApply', function() {
    it('succeeds when there is no existing user with the same id',
       function() {
         expect(command.canApply(commandContext)).toBe(true);
       });

    it('errors when a user exists with the same id', function() {
      model.addUser(user);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });
  });

  describe('#apply', function() {
    it('adds a user to the model', function() {
      expect(model.hasUser('user-id')).toBe(false);
      command.apply(commandContext);
      expect(model.hasUser('user-id')).toBe(true);
    });
  });

  describe('#transform', function() {
    it('returns itself for any command it doesn\'t transform against',
       function() {
         expect(command.transform(logos.command.NoopCommand.INSTANCE)).
             toBe(command);
       });

    it('returns a noop command when transforming against a command equal to itself',
       function() {
         expect(command.transform(command)).
             toBe(logos.command.NoopCommand.INSTANCE);
       });
  });

  describe('#equals', function() {
    it('returns true for commands like itself', function() {
      expect(command.equals(command)).toBe(true);
      var similarCommand = new logos.command.AddUserCommand(user);
      expect(command.equals(similarCommand)).toBe(true);
    });

    it('returns false for command unlike itself', function() {
      var dissimilarCommand = new logos.command.AddUserCommand(
          new logos.model.User('foo-id', 'foo@j.com', 'Foo Foo'));
      expect(command.equals(dissimilarCommand)).toBe(false);
    });
  });
});

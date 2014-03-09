goog.provide('spec.logos.command.AddUserCommandSpec');

goog.require('logos.command.AddUserCommand');
goog.require('logos.command.CommandContext');
goog.require('logos.common.preconditions.IllegalStateException');
goog.require('logos.model.User');
goog.require('logos.model.Model');

describe('logos.command.AddUserCommand', function() {
  var user;
  var commandContext;
  var model;

  beforeEach(function() {
    user = new logos.model.User('user-id', 'erick@j.com', 'Erick J');
    model = new logos.model.Model();
    commandContext = new logos.command.CommandContext(model);
  });

  describe('#canApply', function() {
    it('succeeds when there is no existing user with the same id',
       function() {
         var command = new logos.command.AddUserCommand(user);
         expect(command.canApply(commandContext)).toBe(true);
       });

    it('errors when a user exists with the same id', function() {
      model.addUser(user);
      var command = new logos.command.AddUserCommand(user);
      expect(function() {
        command.canApply(commandContext);
      }).toThrow(new logos.common.preconditions.IllegalStateException());
    });
  });

  describe('#apply', function() {
    it('adds a user to the model', function() {
      expect(model.hasUser('user-id')).toBe(false);
      var command = new logos.command.AddUserCommand(user);
      command.apply(commandContext);
      expect(model.hasUser('user-id')).toBe(true);
    });
  });
});

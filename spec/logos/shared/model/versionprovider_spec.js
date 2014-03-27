goog.provide('spec.logos.model.VersionProviderSpec');

goog.require('logos.model.VersionProvider');

describe('logos.model.VersionProvider', function() {
  var versionProvider;

  beforeEach(function() {
    versionProvider = new logos.model.VersionProvider();
  });

  describe('constructor', function() {
    it('can be creaeted with an optional version number', function() {
      var versionProvider = new logos.model.VersionProvider(102);
      expect(versionProvider.getVersion()).toBe(102);
    });
  });

  describe('#getVersion/#incrementVersion', function() {
    it('starts at 0 and increments by 1', function() {
      expect(versionProvider.getVersion()).toBe(0);
      versionProvider.incrementVersion();
      expect(versionProvider.getVersion()).toBe(1);
      versionProvider.incrementVersion();
      expect(versionProvider.getVersion()).toBe(2);
    });
  });
});

var klass = require('klass');

var User = klass(function () { })
  .methods({
      initialize: function () {
          ///<summary>Initializes the instance</summary>
          return this;
      },
      getDisplayName: function () {
          ///<summary>Get display name</summary>
          return this.Username;
      }
  });

module.exports = User;
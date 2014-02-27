var klass = require('klass');

module.exports = klass(function () { })
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
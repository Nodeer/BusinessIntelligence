var User = require('user');
var sprintf = require('sprintf').sprintf;

module.exports = User.extend(function () { })
    .methods({
          initialize: function () {
              ///<summary>Initializes the instance</summary>
              return this;
          },
          getDisplayName: function () {
              ///<summary>Get display name</summary>

              if (this.FirstName || this.LastName) {
                  return sprintf('%s %s', this.FirstName, this.LastName);
              }

              return this.supr();
          },
          getIdentity: function() {
              ///<summary>Gets identity information</summary>
              
              return sprintf('%s\%s', this.supr(), this.getDisplayName());
          }
    });
﻿var klass = require('klass');
var sprintf = require('sprintf').sprintf;

module.exports = klass(function () { })
    .methods({
          initialize: function () {
              ///<summary>Initializes the instance</summary>

              return this;
          },
          getDisplayName: function () {
              ///<summary>Get display name</summary>

              return sprintf('%s', this.Username);
          },
          getIdentity: function() {
              ///<summary>Gets identity information</summary>
              
              return sprintf('%s', this.Username);
          }
    });
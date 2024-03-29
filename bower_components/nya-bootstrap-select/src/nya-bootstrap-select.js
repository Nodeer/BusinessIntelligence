/**
 * @license nya-bootstrap-select v1.2.1
 * Copyright 2014 nyasoft
 * Licensed under MIT license
 */

'use strict';

angular.module('nya.bootstrap.select',[])
  .directive('nyaSelectpicker', function ($parse) {

    // NG_OPTIONS_REGEXP copy from angular.js select directive
    var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;
    return {
      restrict: 'CA',
      scope: false,
      require: ['^ngModel', 'select'],

      link: function(scope, element, attrs, ctrls) {
        var optionsExp = attrs.ngOptions;
        var valuesFn, match, track, groupBy;
        if(optionsExp && (match = optionsExp.match(NG_OPTIONS_REGEXP))) {
          groupBy = match[3];
          console.log(optionsExp, groupBy);
          valuesFn = $parse(match[7]);
          track = match[8];
        }
        var ngCtrl = ctrls[0];
        var selectCtrl = ctrls[1];
        // prevent selectDirective render an unknownOption.
        selectCtrl.renderUnknownOption = angular.noop;
        var optionArray = [];
        scope.$watch(function optionDOMWatch(){
          // check every option if has changed.
          var optionElements = $(element).find('option');

          //if the first option has no value and label or value an value of ?, this must be generated by ngOptions directive. Remove it.
          if(!optionElements.eq(0).html() && (optionElements.eq(0).attr('value') ==='?' || !optionElements.eq(0).attr('value'))) {
            // angular seams incorrectly remove the first element of the options. so we have to keep the ? element in the list
            // only remove this ? element when group by is provided.
            if(!!groupBy) {
              optionElements.eq(0).remove();
            }
          }

          if(optionElements.length !== optionArray.length) {
            optionArray = makeOptionArray(optionElements);
            buildSelector();
          } else {
            var hasChanged = false;
            optionElements.each(function(index, value){
              if(optionArray[index].text !== value.text || optionArray[index].value !== value.value) {
                hasChanged = true;

              }
            });
            if(hasChanged) {
              buildSelector();
            }
            optionArray = makeOptionArray(optionElements);
          }

        });

        var setValue = function(modelValue) {
          var collection = valuesFn(scope);
          if(angular.isArray(collection) && !angular.isArray(modelValue)) {
            // collection is array and single select mode
            var index = indexInArray(modelValue, collection);
            if(index > -1) {
              $(element).val(index).selectpicker('render');
            }
          } else if(angular.isArray(collection) && angular.isArray(modelValue)) {
            // collection is array and multiple select mode.
            var indexArray = [];
            for(var i = 0; i < modelValue.length; i++) {
              var indexOfOptions = indexInArray(modelValue[i], collection);
              if(indexOfOptions > -1) {
                indexArray.push(indexOfOptions);
              }
            }
            $(element).val(indexArray).selectpicker('render');
          } else if(!angular.isArray(collection) && !angular.isArray(modelValue)) {
            // collection is object and single select mode.
            var key = keyOfObject(modelValue, collection);
            if(key) {
              $(element).val(key).selectpicker('render');
            }
          } else if(!angular.isArray(collection) && angular.isArray(modelValue)) {
            // collection is object and multiple select mode.
            var keyArray = [];
            for(var j = 0; j < modelValue.length; j++) {
              var k = keyOfObject(modelValue[j], collection);
              if(k) {
                keyArray.push(k);
              }
            }
            $(element).val(keyArray).selectpicker('render');
          }
        };

        ngCtrl.$render = function() {
          // model -> view
          var data = $(element).data('selectpicker');
          if(data) {
            if(!!valuesFn && !track) {
              // transform value to index of options
              setValue(ngCtrl.$viewValue);
            } else {
              $(element).val(ngCtrl.$viewValue).selectpicker('render');
            }
          }
        };

        function indexInArray(value, array) {
          for(var i = 0; i < array.length; i++) {
            if(angular.equals(value, array[i])) {
              return i;
            }
          }
          return -1;
        }

        function keyOfObject(value, object) {
          var key = null;
          angular.forEach(object, function(v, k) {
            if(angular.equals(v, value)) {
              key = k;
            }
          });
          return key;
        }

        function makeOptionArray(optionElements) {
          var optionArray = [];
          optionElements.each(function(index, childNode){
            optionArray.push({
              value: childNode.value,
              text: childNode.text
            });
          });
          return optionArray;
        }

        function buildSelector() {
          // build new selector. if previous select exists. remove previous data and DOM
          var oldSelectPicker = $(element).data('selectpicker');
          if(oldSelectPicker) {
            oldSelectPicker.$menu.parent().remove();
            oldSelectPicker.$newElement.remove();
            $(element).removeData('selectpicker');
          }
          $(element).selectpicker();
          if(!!valuesFn && !track) {
            setValue(ngCtrl.$modelValue);
          } else {
            $(element).val(ngCtrl.$modelValue).selectpicker('render');
          }

        }

      }
    };
  });

var Backbone = require('backbone')
var _ = require('underscore')
require('backbone-bindings')
var template = require('../templates/stateItem.tpl')

var validate = function (val) {
  var type = this.model.get('type')
  console.log(type, val)
  switch(type) {
    case 'String':
      this.model.set({valid: true})
      return val;
    case 'Number':
      if (val === '') {
        this.model.set({valid: false})
        return val;
      }
      var n = Number(val)
      if (isNaN(n)) {
        this.model.set({valid: false})
        return val;
      }
      this.model.set({valid: true})
      return Number(val)
    case 'Boolean':
      if (val === '') {
        this.model.set({valid: false})
        return val;
      }
      try{
        var b = JSON.parse(val)
        if (typeof b === 'boolean') {
          this.model.set({valid: true})
          return b;
        } else {
          this.model.set({valid: false})
          return val;
        }
      } catch (e) {
        this.model.set({valid: false})
        return val;
      }
  }
  return val
}

var ItemView = Backbone.View.extend({
  tagName: 'tr',
  className: 'item',
  initialize: function(item) {
    this.model = item
    this.$el.html(template(this.model.toJSON()))
    var self = this;

    this.model.on('change:type', function(model) {
      validate.call(self, model.get('value'))
    })
    window.x = this.model
    this.model.on('change:valid', function (m, valid) {
      console.log('valid', m, valid)
      self.$('input[name="value"]').toggleClass('invalid', !valid)
    })
    this.bindModel()
  },
  bindings: {
    'value input[name="key"]': 'key',
    'value select[name="type"]': 'type',
    'value input[name="value"]': ['value', [validate, validate]]
  }
})

module.exports = ItemView
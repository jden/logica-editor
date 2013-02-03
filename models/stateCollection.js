var Backbone = require('backbone')

var StateItem = Backbone.Model.extend({
  defaults: {key: '', value: '', type: 'String'}
})

var StateCollection = Backbone.Collection.extend({model: StateItem})

module.exports = StateCollection;
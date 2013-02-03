var Backbone = require('backbone')
var _ = require('underscore')
var StateCollection = require('../models/stateCollection')
var template = require('../templates/state.tpl')

var StateView = Backbone.View.extend({
  initialize: function (init) {
    _.bindAll(this)

    this.state = init || new StateCollection()
    this.state.on('change add reset', this.render)

    this.render()
  },
  render: function () {
    var src = template(this.state.toJSON())
    this.$el.html(src)
  },
  events: {
    'click #new-state': 'add'
  },
  add: function (e) {
    e.preventDefault()
    this.state.add({})
  }
})

module.exports = StateView
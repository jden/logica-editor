var Backbone = require('backbone')
var _ = require('underscore')
var StateCollection = require('../models/stateCollection')
var template = require('../templates/state.tpl')
var ItemView = require('./item')

var StateView = Backbone.View.extend({
  initialize: function (init) {
    _.bindAll(this)

    this.state = init || new StateCollection()
    this.state.on('reset', this.reset)

    this.reset()

    this.state.models.forEach(this.item)
    this.state.on('add', this.item)
  },
  reset: function () {
    var src = template(this.state.toJSON())
    this.$el.html(src)
  },
  item: function (model) {
    var view = new ItemView(model)
    this.$('tbody').append(view.el)
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
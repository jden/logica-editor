var Backbone = require('backbone')
var _ = require('underscore')
var template = require('../templates/result.tpl')

var ResultView = Backbone.View.extend({
  initialize: function (init) {
    _.bindAll(this)
    this.model = init || new Backbone.Model()
    this.render()
  },
  render: function () {
    this.$el.html(template(this.model.toJSON()))
  }
})

module.exports = ResultView
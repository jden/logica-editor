var Backbone = require('backbone')
var _ = require('underscore')
var template = require('../templates/main.tpl')

var StateView = require('./state')
var EditorView = require('./editor')
var ResultView = require('./result')

var mainView = Backbone.View.extend({
  initialize: function (init) {
    _.bindAll(this)
    this.render()

    var container = this.$('#container')

    var stateView = new StateView(init.state)
    container.append(stateView.el)

    var editorView = new EditorView(init.editor)
    container.append(editorView.el)

  },
  render: function () {
    this.$el.html(template())
  }
})

module.exports = mainView
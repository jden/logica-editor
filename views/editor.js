var Backbone = require('backbone')
var _ = require('underscore')
var template = require('../templates/editor.tpl')
var resultTemplate = require('../templates/result.tpl')
require('../codemirror.logica')

var EditorView = Backbone.View.extend({
  initialize: function (init) {
    _.bindAll(this)
    var self = this;
    this.model = init || new Backbone.Model()

    this.$el.html(template(this.model.toJSON()))

    this.render()
    // deffered to properly initialize CodeMirror
    _.defer(function () {
      var cm = CodeMirror.fromTextArea(this.$('#code')[0], {
        lineNumbers: true,
        indentUnit: 2,
        tabSize: 2,
      });

      cm.on('change', function() {
        self.model.set({code: cm.getValue()})
      })
    })

    this.model.on('change:result', this.render)

  },
  render: function () {
    var model = this.model.toJSON()
    this.$('#result').html(resultTemplate(model))
  }
})

module.exports = EditorView
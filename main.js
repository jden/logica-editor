var $ = require('jquery')
var Backbone = require('backbone')
var _ = require('underscore')
var heredoc = require('heredoc')
Backbone.$ = $

var logica = require('logica')

var StateCollection = require('../models/stateCollection')
var MainView = require('./views/main')


var state = new StateCollection([
  {key: 'foo', type: 'String', value: 'baz'},
  {key: 'faa', type: 'Boolean', value: true},
  {key: 'pizzas', type: 'Number', value: 23}
])

var code = heredoc(function(){/*
# a logica program

(AND
  (foo = 'baz')
  faa
  (NOT (NOT true))
  (pizzas >= 23)
)


*/})

editor = new Backbone.Model({
  code: code
})


var run = _.throttle(function () {
  var stateObj = makeStateObj(state)
  var src = editor.get('code')
  try{
    var res = logica.exec(src, stateObj)
    console.log('yep', res)
    editor.set({
      result: res,
      error: null
    })
  } catch (e) {
    editor.set({
      result: null,
      error: e
    })
  }
}, 250)

editor.on('change:code', run)
state.on('change add', run)
run()

function makeStateObj(stateCollection) {
  var state = {}
  console.log(stateCollection)
  window.sc = stateCollection
  stateCollection.models.forEach(function (item) {
    state[item.get('key')] = item.get('value')
  })
  return state;
}

var mainView = new MainView({
  state: state,
  editor: editor
})

document.body.appendChild(mainView.el)
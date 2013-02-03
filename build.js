var browserify = require('browserify')
var stringify = require('stringify');
var fs = require('fs')

var watch = process.argv.indexOf('-w') !== -1

var bundle = browserify({watch: watch, debug: true})
    .use(compileTemplates)
    .addEntry('main.js');

if (watch) {
  console.log('watching...')
  bundle.on('bundle', write)
}

bundle.on('syntaxError', function (err) {
  console.error(err)
})

function write() {
  fs.writeFileSync('bundle.js', bundle.bundle())
  console.log('built ' + __dirname + '/bundle.js at ' + new Date())
}

write()






function compileTemplates (bundle) {

  bundle.require('bliss')

  function stringify(text) {
    var stringified_text;

    stringified_text = text.replace(/\"/g, '\u005C\u0022');
    stringified_text = stringified_text.replace(/^(.*)/gm, '"$1');
    stringified_text = stringified_text.replace(/(.+)$/gm, '$1" +');
    stringified_text = stringified_text.replace(/\+$/, '');

    return stringified_text;
  }

  var blissifier = function (body, file) {
    var safe_body = stringify(body);

    var src = 'var template = ' + safe_body + ';\n';
    src += "var bliss = new(require('bliss'));\n"
    src += "module.exports = bliss.compile(template)"

    return src;

  };

  bundle.register('.tpl', blissifier)


};
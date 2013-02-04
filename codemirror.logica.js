/* Based on CodeMirror's Clojure (by Hans Engel) and JavaScript modes*/
CodeMirror.defineMode("logica", function(config, parserConfig) {
  var indentUnit = config.indentUnit;

  // Tokenizer
  var isOperatorChar = /[=<>]/;
  var keywords = function(){
    var com = {type: 'combinator', style: 'keyword'}
    var op = {type: 'operator', style: 'keyword'}
    var atom = {type: "atom", style: "atom"};
    return {
      'AND': com,
      'and': com,
      'OR': com,
      'or': com,
      'NOT': com,
      'not': com,
      '=': op,
      '>': op,
      '>=': op,
      '<': op,
      '<=': op,
      'EQ': op,
      'LT': op,
      'LTE': op,
      'GT': op,
      'GTE': op,
      'eq': op,
      'lt': op,
      'lte': op,
      'gt': op,
      'gte': op,
      'IN': op,
      'in': op,
      "true": atom,
      "false": atom
    };
  }();

  return {
    startState: function () {
      return {
        indentStack: null,
        indentation: 0,

      }
    },

    token: function (stream, state) {
      if (state.indentStack == null && stream.sol()) {
        // update indentation, but only if indentStack is empty
        state.indentation = stream.indentation()
      }

      if (stream.eatSpace()) {
        return null;
      }
      var returnType = null;

      var style = Tokens(stream, state);
      if (type == "comment") return style;
      return style;

    },

    indent: function (state) {
      if (state.indentStack == null) return state.indentation;
      return state.indentStack.indent;
    },

    electricChars: '()'
  }


  function chain(stream, state, f) {
    state.tokenize = f;
    return f(stream, state);
  }

  function nextUntilUnescaped(stream, end) {
    var escaped = false, next;
    while ((next = stream.next()) != null) {
      if (next == end && !escaped)
        return false;
      escaped = !escaped && next == "\\";
    }
    return escaped;
  }

  // Used as scratch variables to communicate multiple values without
  // consing up tons of objects.
  var type, content;
  function ret(tp, style, cont) {
    type = tp; content = cont;
    return style;
  }

  function Tokens(stream, state) {
    var ch = stream.next();
    if (ch == '"' || ch == "'")
      return chain(stream, state, StringToken(ch));
    else if (ch == "(") {
      state.indentation += 1
    } else if (ch == ")") {
      state.indentation -= 1
    }
    else if (/\d/.test(ch) || ch == "-" && stream.eat(/\d/)) {
      stream.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
      return ret("number", "number");
    }
    else if (ch == '#') {
        nextUntilUnescaped(stream, '\n')
        return ret("comment", "comment");
    }
    else if (isOperatorChar.test(ch)) {
      stream.eatWhile(isOperatorChar);
      return ret("operator", null, stream.current());
    }
    else {
      stream.eatWhile(/[\w\$_]/);
      var word = stream.current()
      var known = keywords.propertyIsEnumerable(word) && keywords[word];
      return known ? ret(known.type, known.style, word) :
                     ret("variable", "variable", word);
    }
  }

  function StringToken(quote) {
    return function(stream, state) {
      if (!nextUntilUnescaped(stream, quote))
        state.tokenize = Tokens;
      return ret("string", "string");
    };
  }

});

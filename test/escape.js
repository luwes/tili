import test from 'ava';
import * as _ from '../src';

test('unescape', function(t) {
  var string = 'Curly & Moe';
  t.is(_.unescape(_.escape(string)), string);
  t.is(_.unescape(string), string, 'don\'t unescape unnecessarily');
});

// Don't care what they escape them to just that they're escaped and can be unescaped
test('escape & unescape', function(t) {
  // test & (&amp;) separately obviously
  var escapeCharacters = ['<', '>', '"', '\''];

  escapeCharacters.forEach(function(escapeChar) {
    var s = 'a ' + escapeChar + ' string escaped';
    var e = _.escape(s);
    t.not(s, e, escapeChar + ' is escaped');
    t.is(s, _.unescape(e), escapeChar + ' can be unescaped');

    s = 'a ' + escapeChar + escapeChar + escapeChar + 'some more string' + escapeChar;
    e = _.escape(s);

    t.is(e.indexOf(escapeChar), -1, 'can escape multiple occurrences of ' + escapeChar);
    t.is(_.unescape(e), s, 'multiple occurrences of ' + escapeChar + ' can be unescaped');
  });

  // handles multiple escape characters at once
  var joiner = ' other stuff ';
  var allEscaped = escapeCharacters.join(joiner);
  allEscaped += allEscaped;
  t.true(escapeCharacters.every(function(escapeChar) {
    return allEscaped.indexOf(escapeChar) !== -1;
  }), 'handles multiple characters');
  t.true(allEscaped.indexOf(joiner) >= 0, 'can escape multiple escape characters at the same time');

  // test & -> &amp;
  var str = 'some string & another string & yet another';
  var escaped = _.escape(str);

  t.not(escaped.indexOf('&'), -1, 'handles & aka &amp;');
  t.is(_.unescape(str), str, 'can unescape &amp;');
});

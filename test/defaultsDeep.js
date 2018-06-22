import test from 'ava';
import * as l from '../src';

var noop = function() {};

test('should deep assign source objects if missing on `object`', function(t) {
  t.plan(1);

  var object = undefined,
      source = { 'a': [1, 2, 3]},
      expected = { 'a': [1, 2, 3]};

  t.deepEqual(l.defaultsDeep(object, source), expected);
});

test('should deep assign source properties if missing on `object`', function(t) {
  t.plan(1);

  var object = { 'a': { 'b': 2 }, 'd': 4 },
      source = { 'a': { 'b': 3, 'c': 3 }, 'e': 5 },
      expected = { 'a': { 'b': 2, 'c': 3 }, 'd': 4, 'e': 5 };

  t.deepEqual(l.defaultsDeep(object, source), expected);
});

test('should deep assign source arrays if missing on `object`', function(t) {
  t.plan(1);

  var object = [1, undefined, [undefined, 4]],
      source = [9, 9, [9, 9]],
      expected = [1, 9, [9, 4]];

  t.deepEqual(l.defaultsDeep(object, source), expected);
});

test('should accept multiple sources', function(t) {
  t.plan(2);

  var source1 = { 'a': { 'b': 3 } },
      source2 = { 'a': { 'c': 3 } },
      source3 = { 'a': { 'b': 3, 'c': 3 } },
      source4 = { 'a': { 'c': 4 } },
      expected = { 'a': { 'b': 2, 'c': 3 } };

  t.deepEqual(l.defaultsDeep({ 'a': { 'b': 2 } }, source1, source2), expected);
  t.deepEqual(l.defaultsDeep({ 'a': { 'b': 2 } }, source3, source4), expected);
});

test('should not overwrite `null` values', function(t) {
  t.plan(1);

  var object = { 'a': { 'b': null } },
      source = { 'a': { 'b': 2 } },
      actual = l.defaultsDeep(object, source);

  t.is(actual.a.b, null);
});

test('should not overwrite regexp values', function(t) {
  t.plan(1);

  var object = { 'a': { 'b': /x/ } },
      source = { 'a': { 'b': /y/ } },
      actual = l.defaultsDeep(object, source);

  t.deepEqual(actual.a.b, /x/);
});

test('should not convert function properties to objects', function(t) {
  t.plan(2);

  var actual = l.defaultsDeep({}, { 'a': noop });
  t.is(actual.a, noop);

  actual = l.defaultsDeep({}, { 'a': { 'b': noop } });
  t.is(actual.a.b, noop);
});

test('should overwrite `undefined` values', function(t) {
  t.plan(1);

  var object = { 'a': { 'b': undefined } },
      source = { 'a': { 'b': 2 } },
      actual = l.defaultsDeep(object, source);

  t.is(actual.a.b, 2);
});

test('should assign `undefined` values', function(t) {
  t.plan(1);

  var source = { 'a': undefined, 'b': { 'c': undefined, 'd': 1 } },
      expected = l.clone(source),
      actual = l.defaultsDeep({}, source);

  t.deepEqual(actual, expected);
});

test.skip('should merge sources containing circular references', function(t) {
  t.plan(2);

  var object = {
    'foo': { 'b': { 'c': { 'd': {} } } },
    'bar': { 'a': 2 }
  };

  var source = {
    'foo': { 'b': { 'c': { 'd': {} } } },
    'bar': {}
  };

  object.foo.b.c.d = object;
  source.foo.b.c.d = source;
  source.bar.b = source.foo.b;

  var actual = l.defaultsDeep(object, source);

  t.is(actual.bar.b, actual.foo.b);
  t.is(actual.foo.b.c.d, actual.foo.b.c.d.foo.b.c.d);
});

test('should not modify sources', function(t) {
  t.plan(3);

  var source1 = { 'a': 1, 'b': { 'c': 2 } },
      source2 = { 'b': { 'c': 3, 'd': 3 } },
      actual = l.defaultsDeep({}, source1, source2);

  t.deepEqual(actual, { 'a': 1, 'b': { 'c': 2, 'd': 3 } });
  t.deepEqual(source1, { 'a': 1, 'b': { 'c': 2 } });
  t.deepEqual(source2, { 'b': { 'c': 3, 'd': 3 } });
});

test('should not attempt a merge of a string into an array', function(t) {
  t.plan(1);

  var actual = l.defaultsDeep({ 'a': ['abc'] }, { 'a': 'abc' });
  t.deepEqual(actual.a, ['abc']);
});

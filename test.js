const assert = require('assert')
const {eval, lex, parse, tokenize} = require('./')

///// evaluator

// assert(eval('+ 1 2') === 3)
// assert(eval('+ 1 (* 2 4)') === 9)

///// parser

assert.deepEqual(parse(lex(tokenize('+ 1 2'))), ['+', 1, 2])
assert.deepEqual(parse(lex(tokenize('+ 1 (+ 2 3)'))), ['+', 1, ['+', 2, 3]])

// TODO:
assert.deepEqual(parse(lex(tokenize('+ 1 (+ (* 2 4) 3)'))), ['+', 1, ['+', ['*', 2, 4], 3]])

///// lexer

assert.deepEqual(lex(tokenize('')), [])
assert.deepEqual(lex(tokenize('    ')), [])
assert.deepEqual(lex(tokenize('+ 1 2')), ['+', 1, 2])
assert.deepEqual(lex(tokenize('+ 10 20')), ['+', 10, 20])
assert.deepEqual(lex(tokenize('+ 10 (* 20 30)')), ['+', 10, '(', '*', 20, 30, ')'])
assert.deepEqual(lex(tokenize('- 10 20')), ['-', 10, 20])


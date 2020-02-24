function eval(expression) {
  return run(parse(lex(tokenize(expression))))
}

function run(atom) {
  if (typeof atom === 'number') {
    return atom
  }
  const [op, left, right] = atom
  switch (op) {
    case '+':
      return run(left) + run(right)
    case '-':
      return run(left) - run(right)
    case '*':
      return run(left) * run(right)
    case '/':
      return run(left) / run(right)
  }
}

function parse([atom, ...rest]) {
  switch (atom) {
    case undefined:
      return []
    case '+':
    case '-':
    case '*':
    case '/':
      return [atom, ...parse(rest)]
    case '(':
      return [parse(rest)]
    case ')':
      return parse(rest)
    default:
      return [atom, ...parse(rest)]
  }
}

function lex([char, ...rest]) {
  switch (char) {
    case undefined:
      return []
    case ' ':
      return lex(rest)
    case '+':
    case '-':
    case '*':
    case '/':
    case '(':
    case ')':
      return [char, ...lex(rest)]
    default: {
      // Keep consuming while the number continues
      while (isInt(rest[0])) {
        char += rest[0]
        rest = rest.slice(1)
      }
      const parsed = parseInt(char, 10)
      if (!Number.isNaN(parsed)) {
        return [parsed, ...lex(rest)]
      }
      throw TypeError(`Error lexing char "${char}" in expression "${[char, ...rest].join('')}"`)
    }
  }
}

function tokenize(expression) {
  return expression.split('')
}

function isInt(char) {
  const parsed = parseInt(char, 10)
  return !Number.isNaN(parsed)
}

module.exports.eval = eval
module.exports.lex = lex
module.exports.parse = parse
module.exports.tokenize = tokenize

const operationFunctions = {
    '+': (a, b) => Number(a) + Number(b),
    '-': (a, b) => Number(a) - Number(b),
    '*': (a, b) => Number(a) * Number(b),
    '/': (a, b) => Number(a) / Number(b)
};

function operate(operator, a, b){
    let fn = operationFunctions[operator]
    return fn(a, b)
}
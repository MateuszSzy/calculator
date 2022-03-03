    const numbers = document.querySelectorAll('.number');
    const operators = document.querySelectorAll('.operator');
    const clear = document.querySelector('.clear');
    const del = document.querySelector('.delete');
    const equal = document.querySelector('.equal');
    const prevAct = document.querySelector('.prev_action');
    const currAct = document.querySelector('.current_action');

    let actuallyAct = '';
    let lastAct = '';
    let operation = undefined;

    const calculate  = () => {
        let mathAct
        if(!lastAct || !actuallyAct) {
            return
        }

        const last = parseFloat(lastAct)
        const actually = parseFloat(actuallyAct)

        if(isNaN(last) || isNaN(actually)) {
            return
        }

        switch (operation) {
            case '+':
                mathAct = last + actually
                break
            case '-':
                mathAct = last - actually
                break
            case '×':
                mathAct = last * actually
                break
            case '÷':
                if(actually === 0) {
                    clearResult()
                    return
                }
                mathAct = last / actually
                break
            case '√':
                mathAct = Math.pow(last, 1/actually)
                break
            case '%':
                mathAct = last / 100 * actually
                break
            case '^':
                mathAct = Math.pow(last, actually)
                break
            case 'log':
                mathAct = Math.log(last) / Math.log(actually)
                break
            default:
                return
        }

        actuallyAct = mathAct
        operation = undefined
        lastAct = ''
    };

    const typeOperation = (operator) => {
        if(actuallyAct === '') {
            return
        }
        if(lastAct !== '') {
            const last = prevAct.innerText
            if(actuallyAct.toString() === '0' && last[last.length - 1] === '÷'){
                clearResult()
                return
            }
            calculate()
        }
        operation = operator
        lastAct = actuallyAct
        actuallyAct = ''
    };

    const updateResult = () => {
        currAct.innerText = actuallyAct
        if(operation != null) {
            prevAct.innerText = lastAct + operation
        } else {
            prevAct.innerText = ''
        }

    };

    const addNumber = (number) => {
        if(number === "•") {
            if(actuallyAct.includes('.')) {
                return
            }
            number = '.'
        }
        actuallyAct = actuallyAct.toString() + number.toString()
    };

    numbers.forEach((number) => {
        number.addEventListener('click', () => {
            addNumber(number.innerText)
            updateResult()
        });
    });

    const delNumber = () => {
        actuallyAct = actuallyAct.toString().slice(0, -1)
    };

    const clearResult = () => {
        actuallyAct = '';
        lastAct = '';
        operation = undefined;
    }

    del.addEventListener('click', () => {
        delNumber()
        updateResult()
    });

    operators.forEach((operator) => {
        operator.addEventListener('click', () => {
            typeOperation(operator.innerText)
            updateResult()
        })
    });

    equal.addEventListener('click', () => {
        calculate()
        updateResult()
    });

    clear.addEventListener('click', () => {
        clearResult()
        updateResult()
    })
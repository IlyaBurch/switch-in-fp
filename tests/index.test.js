const { Switch } = require('../src/index');

describe('Switch - Basic Functionality', () => {
  test('should execute the correct case', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();

    Switch
      .case(1, mockFn1)
      .case(2, mockFn2);

    Switch.switch(2);
    expect(mockFn2).toHaveBeenCalled();
    expect(mockFn1).not.toHaveBeenCalled();
  });

  test('should handle no matching case', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch.switch(5);
    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });
});

describe('Switch - Edge Cases', () => {
  test('should handle zero as input', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch.switch(0);
    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle negative numbers', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch.switch(-1);
    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle null as input', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch.switch(null);
    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle undefined as input', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch.switch(undefined);
    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle empty string as input', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch.switch('');
    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle empty array as input', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch.switch([]);
    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle empty object as input', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch.switch({});
    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });
});

describe('Switch - Advanced Scenarios', () => {
  test('should handle asynchronous functions', async () => {
    const asyncMockFn = jest.fn(async () => {
      return 'Async result';
    });

    Switch.case(6, asyncMockFn);

    Switch.switch(6);
    expect(asyncMockFn).toHaveBeenCalled();
  });

test('should handle errors in actions', () => {
  const errorThrowingFn = jest.fn(() => {
    throw new Error('Something went wrong');
  });

  console.error = jest.fn(); // Перехватываем console.error

  Switch.case(7, errorThrowingFn);

  Switch.switch(7);

  expect(errorThrowingFn).toHaveBeenCalled();
  expect(console.error).toHaveBeenCalledWith(expect.any(Error)); // Ошибка должна быть обработана
});

  test('should handle global state modifications', () => {
    let globalState = 0;
    const stateModifyingFn = jest.fn(() => {
      globalState += 1;
    });

    Switch.case(8, stateModifyingFn);

    Switch.switch(8);
    expect(stateModifyingFn).toHaveBeenCalled();
    expect(globalState).toBe(1);
  });

  test('should handle nested function calls', () => {
    const nestedFn = jest.fn();
    const callingNestedFn = jest.fn(() => {
      nestedFn();
    });

    Switch.case(9, callingNestedFn);

    Switch.switch(9);
    expect(callingNestedFn).toHaveBeenCalled();
    expect(nestedFn).toHaveBeenCalled();
  });

  test('should handle closures', () => {
    const closureFn = jest.fn((x) => {
      return () => x * 2;
    });

    Switch.case(10, closureFn(5));

    Switch.switch(10);
    expect(closureFn).toHaveBeenCalled();
  });

  test('should handle recursion', () => {
    const recursiveFn = jest.fn((n) => {
      if (n <= 1) return 1;
      return n * recursiveFn(n - 1);
    });

    Switch.case(11, () => recursiveFn(5));

    Switch.switch(11);
    expect(recursiveFn).toHaveBeenCalledTimes(5); // Рекурсия вызывается 5 раз
  });

  test('should handle external library usage', () => {
    const externalLibraryFn = jest.fn(() => {
      return Math.random();
    });

    Switch.case(12, externalLibraryFn);

    Switch.switch(12);
    expect(externalLibraryFn).toHaveBeenCalled();
  });

  test('should handle Promises', () => {
    const promiseFn = jest.fn(() => {
      return new Promise((resolve) => resolve('Promise resolved'));
    });

    Switch.case(13, promiseFn);

    Switch.switch(13);
    expect(promiseFn).toHaveBeenCalled();
  });

  test('should handle setTimeout inside actions', () => {
    const timeoutFn = jest.fn(() => {
      setTimeout(() => {
        console.log('Timeout inside action');
      }, 100);
    });

    Switch.case(14, timeoutFn);

    Switch.switch(14);
    expect(timeoutFn).toHaveBeenCalled();
  });

test('should handle setInterval inside actions', () => {
  const intervalFn = jest.fn(() => {
    const intervalId = setInterval(() => {
      console.log('Interval inside action');
    }, 100);

    // Возвращаем ID интервала, чтобы его можно было очистить
    return intervalId;
  });

  Switch.case(15, intervalFn);

  Switch.switch(15);
  expect(intervalFn).toHaveBeenCalled();

  // Получаем ID интервала и очищаем его
  const intervalId = intervalFn.mock.results[0].value; // Получаем значение, возвращённое из функции
  clearInterval(intervalId);
});

  test('should handle global variables', () => {
    const globalVariableFn = jest.fn(() => {
      globalThis.testVariable = 'Global variable set';
    });

    Switch.case(16, globalVariableFn);

    Switch.switch(16);
    expect(globalVariableFn).toHaveBeenCalled();
    expect(globalThis.testVariable).toBe('Global variable set');
  });

  test('should handle eval usage', () => {
    const evalFn = jest.fn(() => {
      eval('console.log("Eval executed")');
    });

    Switch.case(17, evalFn);

    Switch.switch(17);
    expect(evalFn).toHaveBeenCalled();
  });

  test('should handle try-catch blocks', () => {
    const tryCatchFn = jest.fn(() => {
      try {
        throw new Error('Try-catch error');
      } catch (e) {
        console.error(e);
      }
    });

    console.error = jest.fn(); // Перехватываем console.error

    Switch.case(18, tryCatchFn);

    Switch.switch(18);
    expect(tryCatchFn).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(expect.any(Error));
  });
});
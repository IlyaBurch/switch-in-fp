const { Switch: Switch } = require('../src/index');

describe('Switcher - Basic Functionality', () => {
  test('should execute the correct case', () => {
    const mockFn1 = jest.fn();
    const mockFn2 = jest.fn();

    Switch(42)
      .case(42, mockFn1)
      .case(43, mockFn2)
      .execute();

    expect(mockFn1).toHaveBeenCalled();
    expect(mockFn2).not.toHaveBeenCalled();
  });

  test('should handle no matching case with default action', () => {
    const mockFn = jest.fn();

    Switch(50)
      .case(42, () => {})
      .case(43, () => {})
      .else(mockFn)
      .execute();

    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle no matching case without default action', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch(50)
      .case(42, () => {})
      .case(43, () => {})
      .execute();

    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });
});

describe('Switcher - Edge Cases', () => {
  test('should handle zero as input', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch(0)
      .case(1, () => {})
      .case(2, () => {})
      .execute();

    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle negative numbers', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch(-1)
      .case(1, () => {})
      .case(2, () => {})
      .execute();

    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle null as input', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch(null)
      .case(1, () => {})
      .case(2, () => {})
      .execute();

    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle undefined as input', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch(undefined)
      .case(1, () => {})
      .case(2, () => {})
      .execute();

    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle empty string as input', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch('')
      .case(1, () => {})
      .case(2, () => {})
      .execute();

    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle empty array as input', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch([])
      .case(1, () => {})
      .case(2, () => {})
      .execute();

    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle empty object as input', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch({})
      .case(1, () => {})
      .case(2, () => {})
      .execute();

    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });
});

describe('Switcher - Advanced Scenarios', () => {
  test('should handle duplicate cases', () => {
    const mockFn1 = jest.fn();
    const mockFnDuplicate = jest.fn();

    Switch(1)
      .case(1, mockFn1)
      .case(1, mockFnDuplicate)
      .execute();

    expect(mockFn1).toHaveBeenCalled();
    expect(mockFnDuplicate).not.toHaveBeenCalled(); // Вторая функция не должна быть вызвана
  });

  test('should handle asynchronous functions', async () => {
    const asyncMockFn = jest.fn(async () => {
      return 'Async result';
    });

    await Switch(6)
      .case(6, asyncMockFn)
      .execute();

    expect(asyncMockFn).toHaveBeenCalled();
  });

  test('should handle errors in actions', () => {
    const errorThrowingFn = jest.fn(() => {
      throw new Error('Something went wrong');
    });

    console.error = jest.fn(); // Перехватываем console.error

    Switch(7)
      .case(7, errorThrowingFn)
      .execute();

    expect(errorThrowingFn).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(expect.any(Error)); // Ошибка должна быть обработана
  });

  test('should handle global state modifications', () => {
    let globalState = 0;
    const stateModifyingFn = jest.fn(() => {
      globalState += 1;
    });

    Switch(8)
      .case(8, stateModifyingFn)
      .execute();

    expect(stateModifyingFn).toHaveBeenCalled();
    expect(globalState).toBe(1);
  });

  test('should handle nested function calls', () => {
    const nestedFn = jest.fn();
    const callingNestedFn = jest.fn(() => {
      nestedFn();
    });

    Switch(9)
      .case(9, callingNestedFn)
      .execute();

    expect(callingNestedFn).toHaveBeenCalled();
    expect(nestedFn).toHaveBeenCalled();
  });

  test('should handle closures', () => {
    const closureFn = jest.fn((x) => {
      return () => x * 2;
    });

    Switch(10)
      .case(10, closureFn(5))
      .execute();

    expect(closureFn).toHaveBeenCalled();
  });

  test('should handle recursion', () => {
    const recursiveFn = jest.fn((n) => {
      if (n <= 1) return 1;
      return n * recursiveFn(n - 1);
    });

    Switch(11)
      .case(11, () => recursiveFn(5))
      .execute();

    expect(recursiveFn).toHaveBeenCalledTimes(5); // Рекурсия вызывается 5 раз
  });

  test('should handle external library usage', () => {
    const externalLibraryFn = jest.fn(() => {
      return Math.random();
    });

    Switch(12)
      .case(12, externalLibraryFn)
      .execute();

    expect(externalLibraryFn).toHaveBeenCalled();
  });

  test('should handle Promises', async () => {
    const promiseFn = jest.fn(() => {
      return new Promise((resolve) => resolve('Promise resolved'));
    });

    await Switch(13)
      .case(13, promiseFn)
      .execute();

    expect(promiseFn).toHaveBeenCalled();
  });

  test('should handle setTimeout inside actions', () => {
    const timeoutFn = jest.fn(() => {
      setTimeout(() => {
        console.log('Timeout inside action');
      }, 100);
    });

    Switch(14)
      .case(14, timeoutFn)
      .execute();

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

  Switch(15)
    .case(15, intervalFn)
    .execute();

  expect(intervalFn).toHaveBeenCalled();

  // Получаем ID интервала и очищаем его
  const intervalId = intervalFn.mock.results[0].value; // Получаем значение, возвращённое из функции
  clearInterval(intervalId);
});

  test('should handle global variables', () => {
    const globalVariableFn = jest.fn(() => {
      globalThis.testVariable = 'Global variable set';
    });

    Switch(16)
      .case(16, globalVariableFn)
      .execute();

    expect(globalVariableFn).toHaveBeenCalled();
    expect(globalThis.testVariable).toBe('Global variable set');
  });

  test('should handle eval usage', () => {
    const evalFn = jest.fn(() => {
      eval('console.log("Eval executed")');
    });

    Switch(17)
      .case(17, evalFn)
      .execute();

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

    Switch(18)
      .case(18, tryCatchFn)
      .execute();

    expect(tryCatchFn).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe('Switcher - Absurd Scenarios', () => {
  test('should handle absurdly large numbers', () => {
    console.log = jest.fn(); // Перехватываем console.log

    Switch(1e100)
      .case(1, () => {})
      .case(2, () => {})
      .execute();

    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle emojis as conditions', () => {
    const emojiFn = jest.fn();

    Switch('😂')
      .case('😊', () => {})
      .case('😂', emojiFn)
      .execute();

    expect(emojiFn).toHaveBeenCalled();
  });

  test('should handle random objects as conditions', () => {
    const obj = { key: 'value' };
    const mockFn = jest.fn();

    Switch(obj)
      .case(obj, mockFn)
      .execute();

    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle absurdly long chains of cases', () => {
    const mockFn = jest.fn();

    Switch(42)
      .case(1, () => {})
      .case(2, () => {})
      .case(3, () => {})
      .case(4, () => {})
      .case(5, () => {})
      .case(6, () => {})
      .case(7, () => {})
      .case(8, () => {})
      .case(9, () => {})
      .case(10, () => {})
      .case(42, mockFn)
      .execute();

    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle absurdly nested functions', () => {
    const nestedFn = jest.fn(() => {
      return () => {
        return () => {
          return () => {
            console.log('Deeply nested function executed');
          };
        };
      };
    });

    Switch(20)
      .case(20, nestedFn()()()())
      .execute();

    expect(nestedFn).toHaveBeenCalled();
  });

  test('should handle absurdly random actions', () => {
    const randomFn = jest.fn(() => {
      Math.random() > 0.5 ? console.log('Heads') : console.log('Tails');
    });

    Switch(21)
      .case(21, randomFn)
      .execute();

    expect(randomFn).toHaveBeenCalled();
  });
});
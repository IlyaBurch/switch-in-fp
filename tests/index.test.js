const { Switch } = require('../src/index');
const deepEqual = require('@gilbarbara/deep-equal');
const True = require('true');
const False = require('false');

describe('Switcher - Basic Functionality', () => {
  test('should execute the correct case and return a value', () => {
  const result = Switch(42)
    .case(42, (v) => v * 2)
    .execute();
  expect(result).toBe(84);
});

test('should handle no matching case and return undefined', () => {
  const result = Switch(50)
    .case(42, () => {})
    .execute();
  expect(result).toBeUndefined();
});
  test('should execute the correct case with deep equality', () => {
    const mockFn = jest.fn();
    Switch([{ key: 'value' }])
      .case([{ key: 'value' }], mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
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
  test('should handle zero as input and return a value', () => {
  const result = Switch(0)
    .case(0, (v) => v + 1)
    .execute();
  expect(result).toBe(1);
});

test('should handle negative numbers and return a value', () => {
  const result = Switch(-1)
    .case(-1, (v) => v * -1)
    .execute();
  expect(result).toBe(1);
});
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

  test('should handle true as input', () => {
    const mockFn = jest.fn();
    Switch(True)
      .case(True, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle false as input', () => {
    const mockFn = jest.fn();
    Switch(False)
      .case(False, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });
});

describe('Switcher - Advanced Scenarios', () => {
  test('should handle duplicate cases and return the first match', () => {
  const result = Switch(1)
    .case(1, (v) => v + 1)
    .case(1, (v) => v + 2)
    .execute();
  expect(result).toBe(2); // Первый случай должен быть выполнен
});

test('should handle asynchronous functions and return a value', async () => {
  const result = await Switch(6)
    .case(6, async () => {
      return 'Async result';
    })
    .execute();
  expect(result).toBe('Async result');
});

test('should handle errors in actions and return undefined', () => {
  const result = Switch(7)
    .case(7, () => {
      throw new Error('Something went wrong');
    })
    .execute();
  expect(result).toBeUndefined(); // Ошибка должна быть обработана
});
  test('should handle new String("123") === "123" using deep equality', () => {
    const mockFn = jest.fn();
    Switch(new String('123'))
      .case('123', mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled(); // deepEqual должен обработать это
  });
  test('should handle "123" === new String("123") using deep equality', () => {
    const mockFn = jest.fn();
    Switch('123')
      .case(new String('123'), mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled(); // deepEqual должен обработать это
  });

  test('should handle new String("123") === new String("123") using deep equality', () => {
    const mockFn = jest.fn();
    Switch(new String('123'))
      .case(new String('123'), mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled(); // deepEqual должен обработать это
  });

  test('should handle no matching case for new String("123") vs "456"', () => {
    console.log = jest.fn(); // Перехватываем console.log
    Switch(new String('123'))
      .case('456', () => {})
      .execute();
    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle no matching case for new String("123") vs new String("456")', () => {
    console.log = jest.fn(); // Перехватываем console.log
    Switch(new String('123'))
      .case(new String('456'), () => {})
      .execute();
    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });
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
      return intervalId;
    });
    Switch(15)
      .case(15, intervalFn)
      .execute();
    expect(intervalFn).toHaveBeenCalled();
    const intervalId = intervalFn.mock.results[0].value;
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

describe('Switcher - Definetely not useless Super Mega Advanced Functionality', () => {
  test('should handle absurdly complex objects', () => {
    const mockFn = jest.fn();
    const obj = { a: { b: { c: { d: { e: 42 } } } } };
    Switch(obj)
      .case({ a: { b: { c: { d: { e: 42 } } } } }, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle NaN as input', () => {
    console.log = jest.fn(); // Перехватываем console.log
    Switch(NaN)
      .case(1, () => {})
      .case(2, () => {})
      .execute();
    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle Infinity as input', () => {
    console.log = jest.fn(); // Перехватываем console.log
    Switch(Infinity)
      .case(1, () => {})
      .case(2, () => {})
      .execute();
    expect(console.log).toHaveBeenCalledWith('No matching case found');
  });

  test('should handle custom classes as input', () => {
    class CustomClass {}
    const instance = new CustomClass();
    const mockFn = jest.fn();
    Switch(instance)
      .case(instance, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle functions as input', () => {
    const mockFn = jest.fn();
    const func = () => {};
    Switch(func)
      .case(func, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle symbols as input', () => {
    const symbol = Symbol('test');
    const mockFn = jest.fn();
    Switch(symbol)
      .case(symbol, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle BigInt as input', () => {
    const bigIntValue = 9007199254740991n;
    const mockFn = jest.fn();
    Switch(bigIntValue)
      .case(bigIntValue, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle circular references in objects', () => {
    const obj = {};
    obj.self = obj; // Создаем циклическую ссылку
    const mockFn = jest.fn();
    Switch(obj)
      .case(obj, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle Date objects as input', () => {
    const date = new Date('2023-01-01');
    const mockFn = jest.fn();
    Switch(date)
      .case(date, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle Map objects as input', () => {
    const map = new Map();
    map.set('key', 'value');
    const mockFn = jest.fn();
    Switch(map)
      .case(map, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle Set objects as input', () => {
    const set = new Set([1, 2, 3]);
    const mockFn = jest.fn();
    Switch(set)
      .case(set, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle WeakMap objects as input', () => {
    const weakMap = new WeakMap();
    const key = {};
    weakMap.set(key, 'value');
    const mockFn = jest.fn();
    Switch(weakMap)
      .case(weakMap, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle WeakSet objects as input', () => {
    const weakSet = new WeakSet();
    const obj = {};
    weakSet.add(obj);
    const mockFn = jest.fn();
    Switch(weakSet)
      .case(weakSet, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle Proxy objects as input', () => {
    const target = {};
    const proxy = new Proxy(target, {});
    const mockFn = jest.fn();
    Switch(proxy)
      .case(proxy, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle multiple conditions with logical OR', () => {
    const mockFn = jest.fn();
    Switch(42)
      .case(42, mockFn)
      .case(43, () => {})
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle multiple conditions with logical AND', () => {
    const mockFn = jest.fn();
    Switch(42)
      .case(42, mockFn)
      .case(42, () => {})
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle random emojis as input', () => {
    const mockFn = jest.fn();
    Switch('🦄')
      .case('🦄', mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle random Unicode characters as input', () => {
    const mockFn = jest.fn();
    Switch('こんにちは') // Японское "привет"
      .case('こんにちは', mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle random binary data as input', () => {
    const buffer = Buffer.from([0x01, 0x02, 0x03]);
    const mockFn = jest.fn();
    Switch(buffer)
      .case(buffer, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle random hexadecimal strings as input', () => {
    const hexString = '0x1A3F';
    const mockFn = jest.fn();
    Switch(hexString)
      .case(hexString, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle random base64 strings as input', () => {
    const base64String = Buffer.from('Hello, World!').toString('base64');
    const mockFn = jest.fn();
    Switch(base64String)
      .case(base64String, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle random UUIDs as input', () => {
    const uuid = '123e4567-e89b-12d3-a456-426614174000';
    const mockFn = jest.fn();
    Switch(uuid)
      .case(uuid, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle random IPv4 addresses as input', () => {
    const ipv4 = '192.168.1.1';
    const mockFn = jest.fn();
    Switch(ipv4)
      .case(ipv4, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });

  test('should handle random IPv6 addresses as input', () => {
    const ipv6 = '2001:0db8:85a3:0000:0000:8a2e:0370:7334';
    const mockFn = jest.fn();
    Switch(ipv6)
      .case(ipv6, mockFn)
      .execute();
    expect(mockFn).toHaveBeenCalled();
  });
  test('should handle new String("123") === "123" and return a value', () => {
  const result = Switch(new String('123'))
    .case('123', (v) => `Matched: ${v}`)
    .execute();
  expect(result).toBe('Matched: 123');
});

test('should handle absurdly large numbers and return undefined', () => {
  const result = Switch(1e100)
    .case(1, () => {})
    .case(2, () => {})
    .execute();
  expect(result).toBeUndefined();
});
});
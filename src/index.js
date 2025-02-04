const If = require("if");
const True = require("true");
const False = require("false");
const isEqual = require('lodash.isequal');

// // ты зачем это читаешь?

class Switcher {
  constructor(value) {
    this.value = value;
    this.cases = [];
    this.defaultAction = null;
  }

  // Добавление нового случая
  case(condition, action) {
    const existingCase = this.cases.find((c) => isEqual(c.condition, condition));
    If(!existingCase)
      .Then(() => this.cases.push({ condition, action }))
      .Else(() => console.log('Case already exists'));
    return this; // Возвращаем this для цепочки вызовов
  }

  // Добавление действия по умолчанию
  else(defaultAction) {
    this.defaultAction = defaultAction;
    return this; // Возвращаем this для цепочки вызовов
  }

  // Выполнение соответствующего случая
  execute(signal) {
    const matchedCase = this.cases.find(({ condition }) => {
      if (condition === True || condition === False) {
        return condition === this.value; // Сравнение с true/false
      }
      return isEqual(condition, this.value); // Глубокое сравнение
    });

    if (matchedCase) {
      try {
        if (signal && signal.aborted) {
          console.log('Action was aborted');
          return;
        }
        // Используем Promise.resolve() для синхронных действий
        return Promise.resolve().then(() => {
          if (signal && signal.aborted) {
            console.log('Action was aborted during execution');
            return;
          }
          return matchedCase.action(this.value, signal);
        });
      } catch (error) {
        console.error(error); // Перехватываем ошибку и выводим её
      }
    } else if (this.defaultAction) {
      if (signal && signal.aborted) {
        console.log('Default action was aborted');
        return;
      }
      return this.defaultAction(signal); // Возвращаем результат действия по умолчанию
    } else {
      console.log('No matching case found');
    }
  }
}

function Switch(value) {
  const switcher = new Switcher(value);
  return {
    case: switcher.case.bind(switcher),
    else: switcher.else.bind(switcher),
    execute: switcher.execute.bind(switcher),
  };
}
// не надо это использовать
// пожалуйста
module.exports = { Switch };
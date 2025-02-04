const If = require("if");
const True = require("true");
const False = require("false");
const isEqual = require('lodash.isequal');

// ты зачем это читаешь?
class Switcher {
  constructor(value) {
    this.value = value;
    this.cases = [];
    this.defaultAction = null;
  }

  // Добавление нового случая
  case(condition, action) {
    this.cases.push({ condition, action });
    return this; // Возвращаем this для цепочки вызовов
  }

  // Добавление действия по умолчанию
  else(defaultAction) {
    this.defaultAction = defaultAction;
    return this; // Возвращаем this для цепочки вызовов
  }

  execute() {
  const matchedCase = this.cases.find(({ condition }) => {
    if (condition === True || condition === False) {
      return condition === this.value; // Сравнение с true/false
    }
    return isEqual(condition, this.value); // Глубокое сравнение
  });

  If(matchedCase)
    .Then(() => {
      try {
        matchedCase.action(this.value);
      } catch (error) {
        console.error(error); // Перехватываем ошибку и выводим её
      }
    })
    .Else(() => {
      if (this.defaultAction) {
        this.defaultAction();
      } else {
        console.log('No matching case found');
      }
    });
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

const test = Switch(42)
  .case(42, () => {return true})
  .else(() => {})
  .execute();

console.log(test)

console.log(equal("123" === new String("123")))
module.exports = { Switch };
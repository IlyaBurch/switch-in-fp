const If = require("if");

class Switcher {
  constructor() {
    this.cases = [];
  }

  // Добавление нового случая
case(condition, action) {
  this.cases.push({ condition, action });
  return this; // Возвращаем this для цепочки вызовов
}

  // Выполнение соответствующего случая
switch(value) {
  const matchedCase = this.cases.find(({ condition }) => condition === value);

  If(matchedCase)
    .Then(() => {
      try {
        matchedCase.action();
      } catch (error) {
        console.error(error); // Перехватываем ошибку и выводим её
      }
    })
    .Else(() => console.log('No matching case found'));
}
}

// Создание экземпляра Switcher
const Switch = new Switcher();

module.exports = { Switch };
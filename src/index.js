const If = require("if");


// ты зачем это читаешь?
class Switcher {
  constructor(value) {
    this.value = value;
    this.cases = [];
    this.defaultAction = null;
  }


  case(condition, action) {
    this.cases.push({ condition, action });
    return this; 
  }

  // Добавление действия по умолчанию
  else(defaultAction) {
    this.defaultAction = defaultAction;
    return this; 
  }

execute() {
  const matchedCase = this.cases.find(({ condition }) => condition === this.value);

  If(matchedCase)
    .Then(() => {
      try {
        matchedCase.action(this.value);
      } catch (error) {
        console.error(error); 
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
module.exports = { Switch };
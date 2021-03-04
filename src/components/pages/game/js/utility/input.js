export var input = {
  listeners: {},
  reset: function() {
    this.listeners = {};
    
  },
  registerAsListener: function(index, callback) {
    if (this.listeners[index] === undefined) {
      this.listeners[index] = [];
    }

    this.listeners[index].push(callback);
  },
  handleEvent: function(char, code, press, bonus) {
    if (this.listeners[code] !== undefined) {
      for (var i = 0; i < this.listeners[code].length; i++) {
        this.listeners[code][i](char, code, press);
      }
    }
  }
};
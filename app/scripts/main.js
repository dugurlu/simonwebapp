var game = {
  quadrants: {
    sq1: {
      colorActive: '#F00',
      colorNormal: '#C00',
    },
    sq2: {
      colorActive: '#0F0',
      colorNormal: '#0C0',
    },
    sq3: {
      colorActive: '#00F',
      colorNormal: '#00C',
    },
    sq4: {
      colorActive: '#FF0',
      colorNormal: '#CC0',
    }
  },
	running: false,
	strict: false,
	init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  toggleRunning: function() {
    // TODO
	  if (this.running) {
      this.resetGame();
	  } else {
      this.startGame();
	  }
	  
	  this.running = !this.running;
	},
	resetGame: function() {
    // TODO
  },
  startGame: function() {
    // TODO
  },
	activateQuadrant: function(event) {
    var id = event.currentTarget.getAttribute('id');
    // highlight the button
	  this.quadrants[id]['$element'].css('background-color', this.quadrants[id]['colorActive']);
    // play audio
    this.quadrants[id]['audio'].currentTime = 0;
    this.quadrants[id]['audio'].play();
	},
  cacheDom: function() {
    this.$quadrant = $('.quadrant');
    this.$switch = $('#switch');
    this.$switchPosition = $('#switch-position');
    for(var el in this.quadrants) {
      this.quadrants[el]['$element'] = $('#' + el);
      this.quadrants[el]['audio'] =
        new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + el.slice(-1) + '.mp3');
    }
  },
  bindEvents: function() {
    this.$quadrant.on('click', this.activateQuadrant.bind(this));
    this.$switch.on('click', this.toggleSwitch.bind(this));
  },
  toggleSwitch: function() {
    // TODO
    this.$switchPosition.css('left', '28px');
  },
};

game.init();
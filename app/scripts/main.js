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
    this.$switchPosition.css('left', '2px');
    this.$button.removeClass('button-active');
  },
  startGame: function() {
    // TODO
    this.$switchPosition.css('left', '28px');
    this.$button.addClass('button-active');
  },
	activateQuadrant: function(event) {
    if(this.running === false) {
      return;
    }
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
    this.$button = $('.button');
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
    if(this.running) {
      this.resetGame();
    } else {
      // start game
      this.startGame();
    }
    this.running = !this.running;
  },
};

game.init();
var game = {
  quadrants: {
    sq1: {
      colorActive: '#F00',
      colorNormal: '#B10000',
    },
    sq2: {
      colorActive: '#0F0',
      colorNormal: '#00B100',
    },
    sq3: {
      colorActive: '#00F',
      colorNormal: '#0000B1',
    },
    sq4: {
      colorActive: '#FF0',
      colorNormal: '#B1B100',
    }
  },
  sequence: [],
	running: false,
	strict: false,
	init: function() {
    this.cacheDom();
    this.bindEvents();
  },
	resetGame: function() {
    // TODO
    this.$switchPosition.css('left', '2px');
    this.deactivateButtons();
    this.$display.css('visibility', 'hidden');
    this.sequence = [];
  },
  startGame: function() {
    // TODO separate 'power up' and 'start game'
    this.$switchPosition.css('left', '28px');
    this.activateButtons();
    this.$display.css('visibility', 'visible');
    this.deactivateButtons();
    setTimeout(this.play.bind(this), 1000);
  },
  play: function() {
    // get new random quadrant to play
    this.deactivateButtons();
    var newQuadrant = 'sq' + Math.floor(Math.random() * 4);
    this.sequence.push(newQuadrant);
    this.playSequence();
    this.activateButtons();
    this.checkUserSequence(); // TODO
  },
  deactivateButtons: function() {
    this.$button.removeClass('button-active');
    this.$quadrant.addClass('unclickable');
  },
  activateButtons: function() {
    this.$button.addClass('button-active');
    this.$quadrant.removeClass('unclickable');
  },
  playSequence: function() {
    for(var i in this.sequence) {
      setTimeout(this.activateQuadrant.bind(this), i * 1000, this.sequence[i]);
    }
  },
  checkUserSequence: function() {

  },
	activateQuadrant: function(event) {
    if(this.running === false) {
      return;
    }
    var id = (typeof event === 'string') ? event : event.currentTarget.getAttribute('id');
    // highlight the button
    this.deactivateButtons();
	  this.quadrants[id]['$element'].css('background-color', this.quadrants[id]['colorActive']);
    // play audio
    this.quadrants[id]['audio'].currentTime = 0;
    this.quadrants[id]['audio'].play();
    setTimeout(this.deactivateQuadrant.bind(this), 1000, id);
	},
  deactivateQuadrant: function(id) {
    this.quadrants[id]['audio'].pause();
    this.quadrants[id]['audio'].currentTime = 0;
    this.quadrants[id]['$element'].css('background-color', this.quadrants[id]['colorNormal']);
    this.activateButtons();
  },
  cacheDom: function() {
    this.$quadrant = $('.quadrant');
    this.$switch = $('#switch');
    this.$switchPosition = $('#switch-position');
    this.$button = $('.button');
    this.$display = $('.display span');
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
    if(this.running) {
      this.resetGame();
    } else {
      this.startGame();
    }
    this.running = !this.running;
  },
};

game.init();
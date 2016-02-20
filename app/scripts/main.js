/*global $ */
'use strict';

const game = {
  quadrants: {
    sq1: {
      colorActive: '#F00',
      colorNormal: '#B10000',
      name: 'sq1'
    },
    sq2: {
      colorActive: '#0F0',
      colorNormal: '#00B100',
      name: 'sq2'
    },
    sq3: {
      colorActive: '#00F',
      colorNormal: '#0000B1',
      name: 'sq3'
    },
    sq4: {
      colorActive: '#FF0',
      colorNormal: '#B1B100',
      name: 'sq4'
    }
  },
  sequence: [],
  userInputIndex: 0,
	running: false,
	strict: false,
	init: function() {
    this.cacheDom();
    this.bindEvents();
  },
	resetGame: function() {
    // TODO
    this.sequence = [];
  },
  startGame: function() {
    if(this.running) {
      this.resetGame();
    }
    this.showNewSequence();
  },
  powerOn: function() {
    this.$switchPosition.css('left', '28px');
    this.$display.css('visibility', 'visible');
    this.enableButtons();
  },
  powerOff: function() {
    this.disableButtons();
    this.disableQuadrants();
    this.deactivateAllQuadrants();
    this.$switchPosition.css('left', '2px');
    this.$display.text('--');
    this.$display.css('visibility', 'hidden');
    this.resetGame();
  },
  showNewSequence: function() {
    // get new random quadrant to play
    let newQuadrant = 'sq' + (1 + Math.floor(Math.random() * 4));
    this.sequence.push(newQuadrant);
    this.showCurrentSequence();
  },
  showCurrentSequence: function() {
    // reset previous user input
    this.userInputIndex = 0;
    // disable user interaction
    this.disableQuadrants();
    // update display
    this.$display.text(this.sequence.length);
    // enable user interaction after sequence was presented
    $.when.apply(null, this.playSequence()).done(function() {
      this.enableQuadrants();
    }.bind(this));
  },
  enablePointerEvents: function(selector){
    selector.css('pointer-events', 'auto');
  },
  disablePointerEvents: function(selector) {
    selector.css('pointer-events', 'none');
  },
  disableQuadrants: function() {
    this.disablePointerEvents(this.$quadrant);
  },
  enableQuadrants: function() {
    this.enablePointerEvents(this.$quadrant);
  },
  disableButtons: function() {
    this.disablePointerEvents(this.$button);
  },
  enableButtons: function() {
    this.enablePointerEvents(this.$button);
  },
  playSequence: function() {
    // use promises to later detec when all the sequence is done
    var promises = [];
    let deferred;
    for(let i in this.sequence) {
      const activateTimer = i * 1000;
      const deactivateTimer = i * 1000 + 500;
      deferred = new $.Deferred();
      promises.push(deferred);

      setTimeout(this.activateQuadrant.bind(this), activateTimer, this.sequence[i]);
      setTimeout(this.deactivateQuadrant.bind(this), deactivateTimer, this.sequence[i], deferred);
    }
    return promises;
  },
  checkUserSequence: function(event) {
    // TODO
    const id = (typeof event === 'string') ? event : event.currentTarget.getAttribute('id');
    this.activateQuadrant(id);

    let matched = false;
    if(this.sequence[this.userInputIndex] == id) {
      matched = true;
    }

    if(matched) {
      this.userInputIndex += 1;

      if(this.userInputIndex === this.sequence.length) {
        this.showNewSequence();
      }
    } else {
      this.disableQuadrants();
      this.$display.text("ERR");
      // repeat this sequence
      setTimeout(this.showCurrentSequence.bind(this), 2000);
    }
  },
  toggleStrict: function() {
    console.log('strict pressed');
  },
	activateQuadrant: function(event) {
    if(this.running === false) {
      return;
    }
    const id = (typeof event === 'string') ? event : event.currentTarget.getAttribute('id');
    // highlight the button
    this.quadrants[id].$element.css('background-color', this.quadrants[id].colorActive);
    // play audio
    this.quadrants[id].audio.currentTime = 0;
    this.quadrants[id].audio.play();

    setTimeout(this.deactivateQuadrant.bind(this), 500, id);

	},
  deactivateQuadrant: function(id, deferred) {
    this.quadrants[id].audio.pause();
    this.quadrants[id].audio.currentTime = 0;
    this.quadrants[id].$element.css('background-color', this.quadrants[id].colorNormal);
    if(deferred) {
      deferred.resolve();
    }
  },
  deactivateAllQuadrants: function() {
    for(let el in this.quadrants) {
      this.deactivateQuadrant(el);
    }
  },
  cacheDom: function() {
    this.$quadrant = $('.quadrant');
    this.$powerSwitch = $('#switch');
    this.$switchPosition = $('#switch-position');
    this.$button = $('.button');
    this.$display = $('.display span');
    this.$startButton = $('.button.start');
    this.$strictButton = $('.button.strict');
    for(let el in this.quadrants) {
      this.quadrants[el].$element = $('#' + el);
      this.quadrants[el].audio =
        new Audio('../resources/simonSound' + el.slice(-1) + '.mp3');
    }
  },
  bindEvents: function() {
    this.$quadrant.on('click', this.checkUserSequence.bind(this));
    this.$powerSwitch.on('click', this.toggleSwitch.bind(this));
    this.$startButton.on('click', this.startGame.bind(this));
    this.$strictButton.on('click', this.toggleStrict.bind(this));
  },
  toggleSwitch: function() {
    if(this.running) {
      this.powerOff();
    } else {
      this.powerOn();
    }
    this.running = !this.running;
  }
};

game.init();

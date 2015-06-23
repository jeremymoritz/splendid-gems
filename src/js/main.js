mainApp.controller('MainCtrl', [
	'$scope',
	'$timeout',
	'$interval',
	'GemFactory',
	'MethodFactory',
	'FirebaseFactory',
	function MainCtrl($s, $timeout, $interval, GF, MF, FF) {
		'use strict';

		function init() {
			//	init stuff
			// remove scrolling also removes click and drag
			window.addEventListener('touchmove', function disallowScrolling(event) {
				if ($(document).width() >= 768) {
					event.preventDefault();
				}
			}, false);
		}

		function Chip(gem) {
			_.extend(this, {
				name: gem,
				gem: gem
			});
		}

		function Card(gem, cost, points) {
			_.extend(this, {
				name: gem,
				gem: gem,
				cost: cost,
				points: points || 0
			});
		}

		function Goal(cost) {
			_.extend(this, {
				cost: cost
			});
		}

		function Player(name) {
			_.extend(this, {
				name: name,
				chips: [],
				cards: [],
				goals: [],
				index: $s.allPlayers.length
			});
		}

		var timeFormat = 'YYYY-MM-DD HH:mm:ss';

		//	initialize scoped variables
		_.assign($s, {
			time: moment().format(timeFormat),
			allPlayers: [],
			allChips: [],
			allGems: GF.allGems,
			gameStatus: 'pre-game',
			ff: {
				newPlayerName: ''
			},
			currentSelection: []
		});

		$s.fbLogin = function facebookLogin() {
			FF.facebookLogin();
		};

		$s.addNewPlayer = function addNewPlayer() {
			$s.currentPlayer = new Player($s.ff.newPlayerName);
			$s.allPlayers.push($s.currentPlayer);
			$s.ff.newPlayerName = '';
		};

		$s.changeCurrentPlayer = function changeCurrentPlayer(player) {
			$s.currentPlayer = player;
		};

		$s.startGame = function startGame() {
			$s.gameStatus = 'game-started';
		};

		$s.quickStart = function quickStart() {
			$s.ff.newPlayerName = 'Joey';
			$s.addNewPlayer();
			$s.ff.newPlayerName = 'Chandler';
			$s.addNewPlayer();
			$s.ff.newPlayerName = 'Ross';
			$s.addNewPlayer();
			$s.startGame();
		};

		$s.collectChips = function collectChips() {
			var index = $s.currentPlayer.index + 1;
			_.each($s.currentSelection, function eachChip(gem) {
				$s.currentPlayer.chips.push(new Chip(gem));
			});

			if (index === $s.allPlayers.length) {
				index = 0;
			}
			$s.currentPlayer = _.find($s.allPlayers, {index: index});
			$s.currentSelection = [];
		};

		$s.clearSelection = function clearSelection() {
			$s.currentSelection = [];
		};

		$s.addChip = function addChip(gem) {
			$s.currentSelection.push(_.clone(gem));
		};

		$s.gemAvailable = function notAvailable(gem) {
			switch (true) {
				case ($s.currentSelection.indexOf('gold') !== -1):
					// you have a gold
					return false;
				case ($s.currentSelection.length && $s.currentSelection[0] === $s.currentSelection[1]):
					// you have two of the same gem
					return false;
				case ($s.currentSelection.length === 3):
					// you have three gems
					return false;
				case ($s.currentSelection.indexOf(gem) !== -1 && $s.currentSelection.length === 2):
					// you have two different gems, those two are not available
					return false;
				case ($s.currentSelection.length !== 0 && gem === 'gold'):
					// you have a gem, gold is not available
					return false;
			}

			return true;
		};

		$s.activeGames = FF.getFBArray('activeGames');
		$s.activeGames.$loaded(function afterActiveGamesLoaded() {
			console.log('Firebase is working');
			$('.notices').text('Firebase is working!');
			$('body').addClass('facebook-available');
		});

		init();
	}
]);

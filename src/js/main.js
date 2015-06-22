mainApp.controller('MainCtrl', [
	'$scope',
	'$timeout',
	'$interval',
	'MethodFactory',
	function MainCtrl($s, $timeout, $interval, MF) {
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

		function Card(gem, cost) {
			_.extend(this, {
				name: gem,
				gem: gem,
				cost: cost
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
				goals: []
			});
		}

		var timeFormat = 'YYYY-MM-DD HH:mm:ss';

		//	initialize scoped variables
		_.assign($s, {
			time: moment().format(timeFormat),
			allPlayers: [],
			allGems: [],
			gameStatus: 'pre-game'
		});

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
	}
]);

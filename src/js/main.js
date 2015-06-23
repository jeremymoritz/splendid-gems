mainApp.controller('MainCtrl', [
	'$scope',
	'$timeout',
	'$interval',
	'GemFactory',
	'CardFactory',
	'MethodFactory',
	'FirebaseFactory',
	function MainCtrl($s, $timeout, $interval, GF, CF, MF, FF) {
		'use strict';

		function init() {
			//	init stuff
			// remove scrolling also removes click and drag
			window.$s = $s;
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

		function User() {
		}

		function createNewUser() {
			var currentTime = moment().format(timeFormat);

			_.extend($s.currentUser, {
				createdDate: currentTime,
				name: $s.authData.facebook.displayName,
				rating: 1200,
				uid: $s.authData.uid,
				gender: $s.authData.facebook.cachedUserProfile.gender,
				firstName: $s.authData.facebook.cachedUserProfile.first_name,
				lastName: $s.authData.facebook.cachedUserProfile.last_name,
				picture: $s.authData.facebook.cachedUserProfile.picture.data.url,
				timezone: $s.authData.facebook.cachedUserProfile.timezone
			});
		}

		function shuffleCards() {
			var cards = {};
			cards.track1 = _.shuffle(_.where(CF.allCards, {track: 1}));
			cards.track2 = _.shuffle(_.where(CF.allCards, {track: 2}));
			cards.track3 = _.shuffle(_.where(CF.allCards, {track: 3}));

			return cards;
		}

		function dealCard(track) {
			$s.activeCards[track].push($s.allCards[track].splice(0, 1)[0]);
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
			currentSelection: [],
			allCards: shuffleCards(),
			activeCards: {
				track1: [],
				track2: [],
				track3: []
			}
		});

		$s.fbLogin = function facebookLogin() {
			$s.authData = FF.facebookLogin();
			$s.currentUser = FF.getFBObject('users/' + authData.uId);

			if (!$s.currentUser.uid) {
				createNewUser();
			}
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
			for (var i = 1; i <= 3; i++) {
				for (var j = 1; j <= 4; j++) {
					dealCard('track' + i);
				}
			}
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

		// $s.activeGames = FF.getFBArray('activeGames');
		// $s.activeGames.$loaded(function afterActiveGamesLoaded() {
		// 	console.log('Firebase is working');
		// 	$('.notices').text('Firebase is working!');
		// 	$('body').addClass('facebook-available');
		// });

		init();
	}
]);

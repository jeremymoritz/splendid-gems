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
			window.$s = $s;
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

		function Card(options) {
			_.extend(this, options, {
				name: options.gem,
				points: options.points || 0,
				cost: _.extend(_.clone(costObject), options.cost)
			});
		}

		function Tile(options) {
			_.extend(this, options, {
				cost: _.extend(_.clone(costObject), options.cost)
			});
		}

		function Player(name) {
			_.extend(this, {
				name: name,
				chips: [],
				cards: [],
				tiles: [],
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
			var cardValues = [];
			var cards = {};
			_.each(CF.allCards, function eachCard(card) {
				cardValues.push(new Card(card));
			});
			cards.track1 = _.shuffle(_.where(cardValues, {track: 1}));
			cards.track2 = _.shuffle(_.where(cardValues, {track: 2}));
			cards.track3 = _.shuffle(_.where(cardValues, {track: 3}));

			return cards;
		}

		function dealCard(track) {
			$s.activeCards[track].push($s.allCards[track].splice(0, 1)[0]);
		}

		function shuffleTiles() {
			var tiles = [];
			_.each(CF.allTiles, function eachTile(tile) {
				tiles.push(new Tile(tile));
			});

			return _.shuffle(tiles);
		}

		function dealTile() {
			$s.activeTiles.push($s.allTiles.splice(0, 1)[0]);
		}

		var timeFormat = 'YYYY-MM-DD HH:mm:ss';
		var costObject = {
			diamond: 0,
			sapphire: 0,
			emerald: 0,
			ruby: 0,
			onyx: 0
		};

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
			allTiles: shuffleTiles(),
			activeTiles: [],
			activeCards: {
				track1: [],
				track2: [],
				track3: []
			}
		});

		$s.calculatePoints = function calculatePoints(player) {
			var total = _.reduce(player.cards, function sumCards(total, card) {
				return total + card.points;
			}, 0);

			return _.reduce(player.tiles, function sumTiles(total, tile) {
				return total + tile.points;
			}, total);
		};

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
			var index = $s.currentPlayer.index + 1;

			if (index === $s.allPlayers.length) {
				index = 0;
			}
			$s.currentPlayer = player || _.find($s.allPlayers, {index: index});
		};

		$s.startGame = function startGame() {
			for (var i = 1; i <= 3; i++) {
				for (var j = 1; j <= 4; j++) {
					dealCard('track' + i);
				}
			}

			for (var k = 0; k <= $s.allPlayers.length; k++) {
				dealTile();
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

		$s.collectCard = function collectCard(card) {
			var track = 'track' + card.track;
			$s.currentPlayer.cards.push(card);
			$s.activeCards[track] = _.reject($s.activeCards[track], card);
			dealCard(track);
			$s.changeCurrentPlayer();
		};

		$s.collectTile = function collectTile(tile) {
			$s.currentPlayer.tiles.push(tile);
			$s.activeTiles = _.reject($s.activeTiles, tile);
		};

		$s.collectChips = function collectChips() {
			_.each($s.currentSelection, function eachChip(gem) {
				$s.currentPlayer.chips.push(new Chip(gem));
			});
			$s.changeCurrentPlayer();
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

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

			/**
			// remove scrolling also removes click and drag
			window.addEventListener('touchmove', function disallowScrolling(event) {
				if ($(document).width() >= 768) {
					event.preventDefault();
				}
			}, false);
			*/
		}

		function Chip(gem, count) {
			count = count || '';
			_.extend(this, {
				id: gem + count,
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
				auto: true,
				chips: [],
				cards: [],
				tiles: [],
				reserve: [],
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

		function replaceCard(card) {
			var track = 'track' + card.track;
			$s.activeCards[track] = _.reject($s.activeCards[track], card);
			dealCard(track);
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

		function dealChips(count) {
			_.each($s.allGems, function eachGem(gem) {
				if (gem.name !== 'gold') {
					$s.allChips.push(new Chip(gem.name, count));
				}
			});
		}

		function dealGoldChips() {
			for (var i = 1; i <= 5; i++) {
				$s.allChips.push(new Chip('gold', i));
			}
		}

		function payForCard(card) {
			var tempChips = _.clone($s.currentPlayer.chips);
			var success = true;
			var payment = [];
			var cardPay, chipPay, goldPay, diff, chip;

			_.each(card.cost, function eachCost(value, gem) {
				if (success) {
					cardPay = _.where($s.currentPlayer.cards, {name: gem}).length;
					chipPay = _.where(tempChips, {name: gem}).length;
					goldPay = _.where(tempChips, {name: 'gold'}).length;
					diff = value - cardPay;

					if (diff > (chipPay + goldPay)) {
						success = false;
					} else {
						for (diff; diff > 0 && chipPay > 0; diff--) {
							chip = _.find(tempChips, {name: gem});
							tempChips = _.reject(tempChips, {id: chip.id});
							payment.push(chip);
							chipPay--;
						}

						for (diff; diff > 0; diff--) {
							chip = _.find(tempChips, {name: 'gold'});
							tempChips = _.reject(tempChips, {id: chip.id});
							payment.push(chip);
						}
					}
				}
			});

			if (success) {
				$s.currentPlayer.chips = tempChips;
				_.each(payment, function eachChip(chip) {
					$s.allChips.push(chip);
				});
			}

			return success;
		}

		function tileAvailable(tile) {
			var success = true;
			var cards;

			_.each(tile.cost, function eachCost(value, gem) {
				if (success) {
					cards = _.where($s.currentPlayer.cards, {name: gem}).length;
					success = cards >= value;
				}
			});

			return success;
		}

		function reserveCard(card) {
			var track = 'track' + card.track;
			var chip = _.find($s.allChips, {name: 'gold'});

			if ($s.currentPlayer.reserve.length > 2) {
				alert('You can\'t reserve more than 3 cards');

				return false;
			}
			$s.currentPlayer.reserve.push(card);
			replaceCard(card);
			delete $s.currentPlayer.reservation;

			if (chip) {
				$s.allChips = _.reject($s.allChips, {id: chip.id});
				$s.currentPlayer.chips.push(chip);
			}

			return true;
		}

		function confirmReserve(card) {
			var message = card ? 'Would you like to reserve this card?' : 'Please choose a card to reserve';
			var answer = $s.currentPlayer.reservation || confirm(message);

			if (answer) {
				if (card) {
					return reserveCard(card);
				} else {
					$s.currentPlayer.reservation = true;
				}
			}

			if (!answer && !card) {
				$s.clearSelection();
			}

			return answer;
		}

		var timeFormat = 'YYYY-MM-DD HH:mm:ss';
		var costObject = {
			diamond: 0,
			sapphire: 0,
			emerald: 0,
			ruby: 0,
			onyx: 0
		};
		// add later for everyone seeing same cursor movement
		var cursorObj = FF.getFBObject('cursor');
		cursorObj.$bindTo($s, 'cursor');

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
			},
			cursor: {
				left: 0,
				top: 0
			}
		});

		$s.toggleReserve = function toggleReserve(player) {
			player.showReserve = !player.showReserve;
		};

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
			var chipCount = $s.allPlayers.length === 4 ? 7 : $s.allPlayers.length + 2;

			for (var i = 1; i <= 3; i++) {
				for (var j = 1; j <= 4; j++) {
					dealCard('track' + i);
				}
			}

			for (var k = 0; k <= $s.allPlayers.length; k++) {
				dealTile();
			}

			for (var l = 1; l <= chipCount; l++) {
				dealChips(l);
			}
			dealGoldChips();
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

		$s.collectReserveCard = function collectReserveCard(player, card) {
			if ($s.currentPlayer.name == player.name) {
				$s.collectCard(card);
			}
		};

		$s.collectCard = function collectCard(card) {
			var reserve = $s.currentPlayer.reservation;

			if (reserve || !$s.currentPlayer.auto) {
				reserve = confirmReserve(card);
			}

			if (!reserve && payForCard(card)) {
				$s.currentPlayer.cards.push(card);
				replaceCard(card);
			} else if (!reserve && !confirmReserve(card)) {
				return false;
			}
			$s.currentSelection = [];
			$s.changeCurrentPlayer();
		};

		$s.collectTile = function collectTile(tile) {
			if (tileAvailable(tile)) {
				$s.currentPlayer.tiles.push(tile);
				$s.activeTiles = _.reject($s.activeTiles, tile);
			}
		};

		$s.collectChips = function collectChips() {
			var chip;
			_.each($s.currentSelection, function eachChip(gem) {
				chip = _.find($s.allChips, {name: gem});
				$s.allChips = _.reject($s.allChips, {id: chip.id});
				$s.currentPlayer.chips.push(chip);
			});
			$s.changeCurrentPlayer();
			$s.currentSelection = [];
		};

		$s.clearSelection = function clearSelection() {
			$s.currentSelection = [];
			delete $s.currentPlayer.reservation;
		};

		$s.addChip = function addChip(gem) {
			if (gem === 'gold') {
				if ($s.currentPlayer.reserve.length < 3) {
					confirmReserve();
				} else {
					alert('You already have 3 cards, you may not reserve another');
				}
			} else {
				$s.currentSelection.push(_.clone(gem));
			}
		};

		$s.gemAvailable = function notAvailable(gem) {
			var count = _.where($s.allChips, {name: gem}).length;

			switch (true) {
				case ($s.currentSelection.indexOf('gold') !== -1 && $s.currentPlayer.reserve.length < 3):
					// you have a gold or 3 reserved cards
					return false;
				case ($s.currentSelection.length && $s.currentSelection[0] === $s.currentSelection[1]):
					// you have two of the same gem
					return false;
				case ($s.currentSelection.length && $s.currentSelection[0].name === gem && count < 4):
					// there aren't enough gems for you to take two of the same
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

			return count > 0;
		};

		$s.howMany = function howMany(gem) {
			return _.where($s.allChips, {name: gem}).length;
		};

		$s.moveCursor = function moveCursor(e) {
			$s.cursor.left = (e.pageX + 2) + 'px';
			$s.cursor.top = (e.pageY + 2) + 'px';
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

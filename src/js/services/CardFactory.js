mainApp.factory('CardFactory', [
	function CardFactory() {
		'use strict';

		return {
			allCards: [{
				id: 'B11',
				track: 1,
				gem: 'Blue',
				white: 0,
				blue: 0,
				green: 0,
				red: 4,
				brown: 0,
				points: 1
			},{
				id: 'B12',
				track: 1,
				gem: 'Blue',
				white: 0,
				blue: 1,
				green: 3,
				red: 1,
				brown: 0,
				points: 0
			},{
				id: 'B13',
				track: 1,
				gem: 'Blue',
				white: 0,
				blue: 0,
				green: 0,
				red: 0,
				brown: 3,
				points: 0
			},{
				id: 'B14',
				track: 1,
				gem: 'Blue',
				white: 1,
				blue: 0,
				green: 2,
				red: 2,
				brown: 0,
				points: 0
			},{
				id: 'B15',
				track: 1,
				gem: 'Blue',
				white: 0,
				blue: 0,
				green: 2,
				red: 0,
				brown: 2,
				points: 0
			},{
				id: 'B16',
				track: 1,
				gem: 'Blue',
				white: 1,
				blue: 0,
				green: 1,
				red: 2,
				brown: 1,
				points: 0
			},{
				id: 'B17',
				track: 1,
				gem: 'Blue',
				white: 1,
				blue: 0,
				green: 0,
				red: 0,
				brown: 2,
				points: 0
			},{
				id: 'B18',
				track: 1,
				gem: 'Blue',
				white: 1,
				blue: 0,
				green: 1,
				red: 1,
				brown: 1,
				points: 0
			},{
				id: 'O11',
				track: 1,
				gem: 'Brown',
				white: 0,
				blue: 4,
				green: 0,
				red: 0,
				brown: 0,
				points: 1
			},{
				id: 'O12',
				track: 1,
				gem: 'Brown',
				white: 0,
				blue: 0,
				green: 1,
				red: 3,
				brown: 1,
				points: 0
			},{
				id: 'O13',
				track: 1,
				gem: 'Brown',
				white: 0,
				blue: 0,
				green: 3,
				red: 0,
				brown: 0,
				points: 0
			},{
				id: 'O14',
				track: 1,
				gem: 'Brown',
				white: 2,
				blue: 2,
				green: 0,
				red: 1,
				brown: 0,
				points: 0
			},{
				id: 'O15',
				track: 1,
				gem: 'Brown',
				white: 2,
				blue: 0,
				green: 2,
				red: 0,
				brown: 0,
				points: 0
			},{
				id: 'O16',
				track: 1,
				gem: 'Brown',
				white: 1,
				blue: 2,
				green: 1,
				red: 1,
				brown: 0,
				points: 0
			},{
				id: 'O17',
				track: 1,
				gem: 'Brown',
				white: 0,
				blue: 0,
				green: 2,
				red: 1,
				brown: 0,
				points: 0
			},{
				id: 'O18',
				track: 1,
				gem: 'Brown',
				white: 1,
				blue: 1,
				green: 1,
				red: 1,
				brown: 0,
				points: 0
			},{
				id: 'G11',
				track: 1,
				gem: 'Green',
				white: 0,
				blue: 0,
				green: 0,
				red: 0,
				brown: 4,
				points: 1
			},{
				id: 'G12',
				track: 1,
				gem: 'Green',
				white: 1,
				blue: 3,
				green: 1,
				red: 0,
				brown: 0,
				points: 0
			},{
				id: 'G13',
				track: 1,
				gem: 'Green',
				white: 0,
				blue: 0,
				green: 0,
				red: 3,
				brown: 0,
				points: 0
			},{
				id: 'G14',
				track: 1,
				gem: 'Green',
				white: 0,
				blue: 1,
				green: 0,
				red: 2,
				brown: 2,
				points: 0
			},{
				id: 'G15',
				track: 1,
				gem: 'Green',
				white: 0,
				blue: 2,
				green: 0,
				red: 2,
				brown: 0,
				points: 0
			},{
				id: 'G16',
				track: 1,
				gem: 'Green',
				white: 1,
				blue: 1,
				green: 0,
				red: 1,
				brown: 2,
				points: 0
			},{
				id: 'G17',
				track: 1,
				gem: 'Green',
				white: 2,
				blue: 1,
				green: 0,
				red: 0,
				brown: 0,
				points: 0
			},{
				id: 'G18',
				track: 1,
				gem: 'Green',
				white: 1,
				blue: 1,
				green: 0,
				red: 1,
				brown: 1,
				points: 0
			},{
				id: 'R11',
				track: 1,
				gem: 'Red',
				white: 4,
				blue: 0,
				green: 0,
				red: 0,
				brown: 0,
				points: 1
			},{
				id: 'R12',
				track: 1,
				gem: 'Red',
				white: 1,
				blue: 0,
				green: 0,
				red: 1,
				brown: 3,
				points: 0
			},{
				id: 'R13',
				track: 1,
				gem: 'Red',
				white: 3,
				blue: 0,
				green: 0,
				red: 0,
				brown: 0,
				points: 0
			},{
				id: 'R14',
				track: 1,
				gem: 'Red',
				white: 2,
				blue: 0,
				green: 1,
				red: 0,
				brown: 2,
				points: 0
			},{
				id: 'R15',
				track: 1,
				gem: 'Red',
				white: 2,
				blue: 0,
				green: 0,
				red: 2,
				brown: 0,
				points: 0
			},{
				id: 'R16',
				track: 1,
				gem: 'Red',
				white: 2,
				blue: 1,
				green: 1,
				red: 0,
				brown: 1,
				points: 0
			},{
				id: 'R17',
				track: 1,
				gem: 'Red',
				white: 0,
				blue: 2,
				green: 1,
				red: 0,
				brown: 0,
				points: 0
			},{
				id: 'R18',
				track: 1,
				gem: 'Red',
				white: 1,
				blue: 1,
				green: 1,
				red: 0,
				brown: 1,
				points: 0
			},{
				id: 'W11',
				track: 1,
				gem: 'White',
				white: 0,
				blue: 0,
				green: 4,
				red: 0,
				brown: 0,
				points: 1
			},{
				id: 'W12',
				track: 1,
				gem: 'White',
				white: 3,
				blue: 1,
				green: 0,
				red: 0,
				brown: 1,
				points: 0
			},{
				id: 'W13',
				track: 1,
				gem: 'White',
				white: 0,
				blue: 3,
				green: 0,
				red: 0,
				brown: 0,
				points: 0
			},{
				id: 'W14',
				track: 1,
				gem: 'White',
				white: 0,
				blue: 2,
				green: 2,
				red: 0,
				brown: 1,
				points: 0
			},{
				id: 'W15',
				track: 1,
				gem: 'White',
				white: 0,
				blue: 2,
				green: 0,
				red: 0,
				brown: 2,
				points: 0
			},{
				id: 'W16',
				track: 1,
				gem: 'White',
				white: 0,
				blue: 1,
				green: 2,
				red: 1,
				brown: 1,
				points: 0
			},{
				id: 'W17',
				track: 1,
				gem: 'White',
				white: 0,
				blue: 0,
				green: 0,
				red: 2,
				brown: 1,
				points: 0
			},{
				id: 'W18',
				track: 1,
				gem: 'White',
				white: 0,
				blue: 1,
				green: 1,
				red: 1,
				brown: 1,
				points: 0
			},{
				id: 'B21',
				track: 2,
				gem: 'Blue',
				white: 0,
				blue: 6,
				green: 0,
				red: 0,
				brown: 0,
				points: 3
			},{
				id: 'B22',
				track: 2,
				gem: 'Blue',
				white: 5,
				blue: 3,
				green: 0,
				red: 0,
				brown: 0,
				points: 2
			},{
				id: 'B23',
				track: 2,
				gem: 'Blue',
				white: 0,
				blue: 5,
				green: 0,
				red: 0,
				brown: 0,
				points: 2
			},{
				id: 'B24',
				track: 2,
				gem: 'Blue',
				white: 2,
				blue: 0,
				green: 0,
				red: 1,
				brown: 4,
				points: 2
			},{
				id: 'B25',
				track: 2,
				gem: 'Blue',
				white: 0,
				blue: 2,
				green: 3,
				red: 0,
				brown: 3,
				points: 1
			},{
				id: 'B26',
				track: 2,
				gem: 'Blue',
				white: 0,
				blue: 2,
				green: 2,
				red: 3,
				brown: 0,
				points: 1
			},{
				id: 'O21',
				track: 2,
				gem: 'Brown',
				white: 0,
				blue: 0,
				green: 0,
				red: 0,
				brown: 6,
				points: 3
			},{
				id: 'O22',
				track: 2,
				gem: 'Brown',
				white: 0,
				blue: 0,
				green: 5,
				red: 3,
				brown: 0,
				points: 2
			},{
				id: 'O23',
				track: 2,
				gem: 'Brown',
				white: 5,
				blue: 0,
				green: 0,
				red: 0,
				brown: 0,
				points: 2
			},{
				id: 'O24',
				track: 2,
				gem: 'Brown',
				white: 0,
				blue: 1,
				green: 4,
				red: 2,
				brown: 0,
				points: 2
			},{
				id: 'O25',
				track: 2,
				gem: 'Brown',
				white: 3,
				blue: 0,
				green: 3,
				red: 0,
				brown: 2,
				points: 1
			},{
				id: 'O26',
				track: 2,
				gem: 'Brown',
				white: 3,
				blue: 2,
				green: 2,
				red: 0,
				brown: 0,
				points: 1
			},{
				id: 'G21',
				track: 2,
				gem: 'Green',
				white: 0,
				blue: 0,
				green: 6,
				red: 0,
				brown: 0,
				points: 3
			},{
				id: 'G22',
				track: 2,
				gem: 'Green',
				white: 0,
				blue: 5,
				green: 3,
				red: 0,
				brown: 0,
				points: 2
			},{
				id: 'G23',
				track: 2,
				gem: 'Green',
				white: 0,
				blue: 0,
				green: 5,
				red: 0,
				brown: 0,
				points: 2
			},{
				id: 'G24',
				track: 2,
				gem: 'Green',
				white: 4,
				blue: 2,
				green: 0,
				red: 0,
				brown: 1,
				points: 2
			},{
				id: 'G25',
				track: 2,
				gem: 'Green',
				white: 3,
				blue: 0,
				green: 2,
				red: 3,
				brown: 0,
				points: 1
			},{
				id: 'G26',
				track: 2,
				gem: 'Green',
				white: 2,
				blue: 3,
				green: 0,
				red: 0,
				brown: 2,
				points: 1
			},{
				id: 'R21',
				track: 2,
				gem: 'Red',
				white: 0,
				blue: 0,
				green: 0,
				red: 6,
				brown: 0,
				points: 3
			},{
				id: 'R22',
				track: 2,
				gem: 'Red',
				white: 3,
				blue: 0,
				green: 0,
				red: 0,
				brown: 5,
				points: 2
			},{
				id: 'R23',
				track: 2,
				gem: 'Red',
				white: 0,
				blue: 0,
				green: 0,
				red: 0,
				brown: 5,
				points: 2
			},{
				id: 'R24',
				track: 2,
				gem: 'Red',
				white: 1,
				blue: 4,
				green: 2,
				red: 0,
				brown: 0,
				points: 2
			},{
				id: 'R25',
				track: 2,
				gem: 'Red',
				white: 0,
				blue: 3,
				green: 0,
				red: 2,
				brown: 3,
				points: 1
			},{
				id: 'R26',
				track: 2,
				gem: 'Red',
				white: 2,
				blue: 0,
				green: 0,
				red: 2,
				brown: 3,
				points: 1
			},{
				id: 'W21',
				track: 2,
				gem: 'White',
				white: 6,
				blue: 0,
				green: 0,
				red: 0,
				brown: 0,
				points: 3
			},{
				id: 'W22',
				track: 2,
				gem: 'White',
				white: 0,
				blue: 0,
				green: 0,
				red: 5,
				brown: 3,
				points: 2
			},{
				id: 'W23',
				track: 2,
				gem: 'White',
				white: 0,
				blue: 0,
				green: 0,
				red: 5,
				brown: 0,
				points: 2
			},{
				id: 'W24',
				track: 2,
				gem: 'White',
				white: 0,
				blue: 0,
				green: 1,
				red: 4,
				brown: 2,
				points: 2
			},{
				id: 'W25',
				track: 2,
				gem: 'White',
				white: 2,
				blue: 3,
				green: 0,
				red: 3,
				brown: 0,
				points: 1
			},{
				id: 'W26',
				track: 2,
				gem: 'White',
				white: 0,
				blue: 0,
				green: 3,
				red: 2,
				brown: 2,
				points: 1
			},{
				id: 'B31',
				track: 3,
				gem: 'Blue',
				white: 7,
				blue: 3,
				green: 0,
				red: 0,
				brown: 0,
				points: 5
			},{
				id: 'B32',
				track: 3,
				gem: 'Blue',
				white: 7,
				blue: 0,
				green: 0,
				red: 0,
				brown: 0,
				points: 4
			},{
				id: 'B33',
				track: 3,
				gem: 'Blue',
				white: 6,
				blue: 3,
				green: 0,
				red: 0,
				brown: 3,
				points: 4
			},{
				id: 'B34',
				track: 3,
				gem: 'Blue',
				white: 3,
				blue: 0,
				green: 3,
				red: 3,
				brown: 5,
				points: 3
			},{
				id: 'O31',
				track: 3,
				gem: 'Brown',
				white: 0,
				blue: 0,
				green: 0,
				red: 7,
				brown: 3,
				points: 5
			},{
				id: 'O32',
				track: 3,
				gem: 'Brown',
				white: 0,
				blue: 0,
				green: 0,
				red: 7,
				brown: 0,
				points: 4
			},{
				id: 'O33',
				track: 3,
				gem: 'Brown',
				white: 0,
				blue: 0,
				green: 3,
				red: 6,
				brown: 3,
				points: 4
			},{
				id: 'O34',
				track: 3,
				gem: 'Brown',
				white: 3,
				blue: 3,
				green: 5,
				red: 3,
				brown: 0,
				points: 3
			},{
				id: 'G31',
				track: 3,
				gem: 'Green',
				white: 0,
				blue: 7,
				green: 3,
				red: 0,
				brown: 0,
				points: 5
			},{
				id: 'G32',
				track: 3,
				gem: 'Green',
				white: 0,
				blue: 7,
				green: 0,
				red: 0,
				brown: 0,
				points: 4
			},{
				id: 'G33',
				track: 3,
				gem: 'Green',
				white: 3,
				blue: 6,
				green: 3,
				red: 0,
				brown: 0,
				points: 4
			},{
				id: 'G34',
				track: 3,
				gem: 'Green',
				white: 5,
				blue: 3,
				green: 0,
				red: 3,
				brown: 3,
				points: 3
			},{
				id: 'R31',
				track: 3,
				gem: 'Red',
				white: 0,
				blue: 0,
				green: 7,
				red: 3,
				brown: 0,
				points: 5
			},{
				id: 'R32',
				track: 3,
				gem: 'Red',
				white: 0,
				blue: 0,
				green: 7,
				red: 0,
				brown: 0,
				points: 4
			},{
				id: 'R33',
				track: 3,
				gem: 'Red',
				white: 0,
				blue: 3,
				green: 6,
				red: 3,
				brown: 0,
				points: 4
			},{
				id: 'R34',
				track: 3,
				gem: 'Red',
				white: 3,
				blue: 5,
				green: 3,
				red: 0,
				brown: 3,
				points: 3
			},{
				id: 'W31',
				track: 3,
				gem: 'White',
				white: 3,
				blue: 0,
				green: 0,
				red: 0,
				brown: 7,
				points: 5
			},{
				id: 'W32',
				track: 3,
				gem: 'White',
				white: 0,
				blue: 0,
				green: 0,
				red: 0,
				brown: 7,
				points: 4
			},{
				id: 'W33',
				track: 3,
				gem: 'White',
				white: 3,
				blue: 0,
				green: 3,
				red: 0,
				brown: 6,
				points: 4
			},{
				id: 'W34',
				track: 3,
				gem: 'White',
				white: 0,
				blue: 3,
				green: 3,
				red: 5,
				brown: 3,
				points: 3
			}],
			allTiles: [{
				id: 'T1',
				white: 4,
				blue: 4,
				green: 0,
				red: 0,
				brown: 0,
				points: 3
			},{
				id: 'T2',
				white: 0,
				blue: 4,
				green: 4,
				red: 0,
				brown: 0,
				points: 3
			},{
				id: 'T3',
				white: 0,
				blue: 0,
				green: 4,
				red: 4,
				brown: 0,
				points: 3
			},{
				id: 'T4',
				white: 0,
				blue: 0,
				green: 0,
				red: 4,
				brown: 4,
				points: 3
			},{
				id: 'T5',
				white: 4,
				blue: 0,
				green: 0,
				red: 0,
				brown: 4,
				points: 3
			},{
				id: 'T6',
				white: 3,
				blue: 3,
				green: 3,
				red: 0,
				brown: 0,
				points: 3
			},{
				id: 'T7',
				white: 0,
				blue: 3,
				green: 3,
				red: 3,
				brown: 0,
				points: 3
			},{
				id: 'T8',
				white: 0,
				blue: 0,
				green: 3,
				red: 3,
				brown: 3,
				points: 3
			},{
				id: 'T9',
				white: 3,
				blue: 0,
				green: 0,
				red: 3,
				brown: 3,
				points: 3
			},{
				id: 'T10',
				white: 3,
				blue: 3,
				green: 0,
				red: 0,
				brown: 3,
				points: 3
			}]
		};
	}
]);

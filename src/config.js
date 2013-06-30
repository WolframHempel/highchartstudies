CHART_CONFIG =
{
	rangeSelector: {
		selected: 1
	},

	title: {
		text: 'AAPL Historical'
	},

	yAxis: [{
		title: {
			text: 'OHLC'
		},
		height: 200,
		lineWidth: 2
	},
	{
		title: {
			text: 'Volume'
		},
		top: 300,
		height: 100,
		offset: 0,
		lineWidth: 2
	},
	{
		title: {
			text: 'Stochastic Oscillator'
		},
		top: 440,
		height: 100,
		offset: 0,
		lineWidth: 2,
		min: 0,
		max: 100
	}],

	series: [{
		type: 'candlestick',
		name: 'AAPL',
		data: null,
		dataGrouping: {
			units: [
				[ 'week', [1] ],
				[ 'month', [1, 2, 3, 4, 6] ]
			]
		}
	},
	{
		type: 'column',
		name: 'Volume',
		data: null,
		yAxis: 1,
		dataGrouping: {
			units: [
				[ 'week', [1] ],
				[ 'month', [1, 2, 3, 4, 6] ]
			]
		}
	},
	{
		type: 'spline',
		name: '%K',
		data: null,
		color: "#000000",
		yAxis: 2,
		dataGrouping: {
			units: [
				[ 'week', [1] ],
				[ 'month', [1, 2, 3, 4, 6] ]
			]
		}
	},
	{
		type: 'line',
		name: '%D',
		data: null,
		color: "#DC143C",
		yAxis: 2,
		dashStyle: "Dash",
		dataGrouping: {
			units: [
				[ 'week', [1] ],
				[ 'month', [1, 2, 3, 4, 6] ]
			]
		}
	}
	]
};
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
	}, {
		title: {
			text: 'Volume'
		},
		top: 300,
		height: 100,
		offset: 0,
		lineWidth: 2
	}],

	series: [{
		type: 'candlestick',
		name: 'AAPL',
		data: null,
		dataGrouping: {
			units: null
		}
	}, {
		type: 'column',
		name: 'Volume',
		data: null,
		yAxis: 1,
		dataGrouping: {
			units: null
		}
	}]
};
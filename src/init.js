window.onload = function()
{

		// set the allowed units for data grouping
		var pGroupingUnits = [
			[ 'week', [1] ],
			[ 'month', [1, 2, 3, 4, 6] ]
		];

		var mData = fTransformData( AAPL_OHLC );

		CHART_CONFIG.series[ 0 ].data = mData.ohlc;
		CHART_CONFIG.series[ 0 ].dataGrouping.units = pGroupingUnits;

		CHART_CONFIG.series[ 1 ].data = mData.volume;
		CHART_CONFIG.series[ 1 ].dataGrouping.units = pGroupingUnits;

		// create the chart
		$( '#container' ).highcharts( 'StockChart', CHART_CONFIG );
};
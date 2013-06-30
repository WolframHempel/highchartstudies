ControlViewModel = function( eChartContainer, mConfig )
{
	this._eChartContainer = eChartContainer;
	this._mConfig = mConfig;

	var pOHLC = calc.reduceColumns( AAPL_OHLC, [ 0, 1, 2, 3, 4 ]);

	this._pTimestamps = calc.flatten( pOHLC, 0 );
	this._pOpenSeries = calc.flatten( pOHLC, 1 );

	this._mConfig.series[ 0 ].data = pOHLC;
	this._mConfig.series[ 1 ].data = calc.reduceColumns( AAPL_OHLC, [ 0, 5 ] );

	/**
	* Stochastic oscillator %K series
	* based on AAPL open quotes
	*/
	var pHigh = calc.flatten( pOHLC, 2 );
	var pLow = calc.flatten( pOHLC, 3 );
	var pClose = calc.flatten( pOHLC, 4 );
	var pK = calc.stochasticOscillator( pHigh, pLow, pClose, 5 );

	this._mConfig.series[ 2 ].data = calc.merge( this._pTimestamps, pK );

	/**
	* Stochastic Oscillator %D Series ( three day SMA of %K )
	*/
	var pD = calc.simpleMovingAverage( pK, 3 );
	this._mConfig.series[ 3 ].data = calc.merge( this._pTimestamps, pD );

	this._mConfig.chart = { renderTo : eChartContainer };

	this._oChart = new Highcharts.StockChart( this._mConfig );

	this.simpleMovingAverages = ko.observableArray();
};

ControlViewModel.prototype.addSma = function()
{
	this.simpleMovingAverages.push( new SmaViewModel( this ) );
};

ControlViewModel.prototype.removeSma = function( oSmaViewModel )
{
	var nIndex = this.simpleMovingAverages.indexOf( oSmaViewModel );
	this.simpleMovingAverages.splice( nIndex, 1 );
};

ControlViewModel.prototype.getChart = function()
{
	return this._oChart;
};

ControlViewModel.prototype.getOpenSeries = function()
{
	return this._pOpenSeries;
};

ControlViewModel.prototype.getTimestamps = function()
{
	return this._pTimestamps;
};
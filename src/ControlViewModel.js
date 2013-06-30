ControlViewModel = function( eChartContainer, mConfig )
{
	this._eChartContainer = eChartContainer;
	this._mConfig = mConfig;

	this._mData = calc.transformData( AAPL_OHLC );
	this._pTimestamps = calc.flatten( this._mData.ohlc, 0 );
	this._pOpenSeries = calc.flatten( this._mData.ohlc, 1 );

	this._mConfig.series[ 0 ].data = this._mData.ohlc;
	this._mConfig.series[ 1 ].data = this._mData.volume;
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
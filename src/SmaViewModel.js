SmaViewModel = function( oControlViewModel )
{
	this._oControlViewModel = oControlViewModel;
	this._oSeries = null;

	this.period = ko.observable( 5 );
	this.period.extend({ toInt: true });
	this.period.subscribe( this.setPeriod.bind( this ) );

	this.visible = ko.observable( true );

	var mRandomColor = COLORS[ Math.floor( Math.random() * COLORS.length ) ];

	this.colorName = ko.observable( mRandomColor.name );
	this.colorCode = ko.observable( mRandomColor.code );

	this.name = ko.observable( this._getName() );
	this.colors = ko.observableArray( COLORS );

	this.colorDropdownVisible = ko.observable( false );

	this._mConfig = $.extend( {}, SmaViewModel.defaultConfig );

	this._mConfig.data = this._getData();
	this._mConfig.name = this.name();
	this._mConfig.color = this.colorCode();

	this._oSeries = this._oControlViewModel.getChart().addSeries( this._mConfig );
};

SmaViewModel.defaultConfig =
{
	type: 'line',
	name: null,
	data: null,
	dataGrouping: {
		units: [
			[ 'week', [1] ],
			[ 'month', [1, 2, 3, 4, 6] ]
		]
	}
};

SmaViewModel.prototype.setPeriod = function()
{
	this._oSeries.setData( this._getData() );
};

SmaViewModel.prototype.toggleColorDropdown = function()
{
	this.colorDropdownVisible( !this.colorDropdownVisible() );
};

SmaViewModel.prototype.toggleVisible = function()
{
	this.visible( !this.visible() );

	if( this.visible() )
	{
		this._oSeries.show();
	}
	else
	{
		this._oSeries.hide();
	}
};

SmaViewModel.prototype.destroy = function()
{
	this._oSeries.remove();
	this._oControlViewModel.removeSma( this );
};

SmaViewModel.prototype.setColor = function( mColor )
{
	this.colorName( mColor.name );
	this.colorCode( mColor.code );

	this._oSeries.options.color = mColor.code;
	this._oSeries.update( this._oSeries.options );
};

SmaViewModel.prototype._getName = function()
{
	return "Simple Moving Average (" + this.period() + ")";
};

SmaViewModel.prototype._getData = function()
{
	var pOpenSma = calc.simpleMovingAverage( this._oControlViewModel.getOpenSeries(), parseInt( this.period(), 10 ) );
	return calc.merge( this._oControlViewModel.getTimestamps(), pOpenSma );
};
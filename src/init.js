window.onload = function()
{
	var eChartContainer = document.getElementById( "chartContainer" );
	var eControlContainer = document.getElementById( "controlContainer" );
	var oControlViewModel = new ControlViewModel( eChartContainer, CHART_CONFIG );
	ko.applyBindings( oControlViewModel, eControlContainer );
};

/**
* Reads the raw data (as provided by Highcharts) and turns it into
* something that Highcharts can understand
*/
var fTransformData = function( pData )
{

	// split the data set into ohlc and volume
	var pOHLC = [],
		pVolume = [],
		nDataLength = pData.length,
		i;

	for( i = 0; i < nDataLength; i++ )
	{
		pOHLC.push([
			pData[ i ][ 0 ], // the date
			pData[ i ][ 1 ], // open
			pData[ i ][ 2 ], // high
			pData[ i ][ 3 ], // low
			pData[ i ][ 4 ] // close
		]);

		pVolume.push([
			pData[ i ][ 0 ], // the date
			pData[ i ][ 5 ] // the volume
		]);
	}

	return { ohlc: pOHLC, volume: pVolume };
};
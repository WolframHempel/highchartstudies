var calc = {};
/**
* Reads the raw data (as provided by Highcharts) and turns it into
* something that Highcharts can understand
*/
calc.transformData = function( pData )
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

/**
* Flattens a sub-array of a two dimensional array (like Highcharts expects)
* and returns a one dimensional array
*/
calc.flatten = function( pTwoDimensionalArray, nIndex )
{
	var fMapping = function( pSubArray )
	{
		return pSubArray[ nIndex ];
	};

	return pTwoDimensionalArray.map( fMapping );
};

/**
* Merges multiple one-dimensional arrays into a
* two dimensional one
*/
calc.merge = function( pArray1, pArray2, pArrayN )
{
	var i, j, pSubArray, pReturn = [];

	for( i = 0; i < pArray1.length; i++ )
	{
		pSubArray = [];

		for( j = 0; j < arguments.length; j++ )
		{
			/**
			* Safety gate if the provided arrays
			* have different length
			*/
			if( arguments[ j ][ i ] === undefined )
			{
				return pReturn.splice( 0, i - 1 );
			}

			pSubArray.push( arguments[ j ][ i ] );
		}

		pReturn.push( pSubArray );
	}

	return pReturn;
};

/**
* Adds vValue nLength times to both ends of pArray
*/
calc.padArray = function( pArray, vValue, nLength )
{
	for( var i = 0; i < nLength; i++ )
	{
		pArray.push( vValue );
		pArray.unshift( vValue );
	}

	return pArray;
};

/**
* Calculates a Simple Moving Average. 
* Uses ES 5 functions ( requires polyfill in IE )
*/
calc.simpleMovingAverage = function( pData, nPeriod )
{
	var nSum = pData.slice( 0, nPeriod ).reduce( function( nPrevious, nCurrent ){ return nPrevious + nCurrent; }, 0 );

	var pSMA = [ nSum / nPeriod ],
		i = Math.ceil( nPeriod / 2 ),
		nPeriodMinusOne = nPeriod - 1,
		nLength = pData.length - nPeriod;

	for( i = 1; i < nLength; i++ )
	{
		pSMA.push( nSum / nPeriod );
		nSum -= pData[ i - 1 ];
		nSum += pData[ i + nPeriodMinusOne ];
	}

	return calc.padArray( pSMA, null, nPeriod / 2 );
};

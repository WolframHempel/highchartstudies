var calc = {};

/**
* Takes a two-dimensional array and a number of column
* indices and returns a two dimensional array with a subset
* of the original array's columns
*/
calc.reduceColumns = function( pArray, pColumIndices )
{
	var fMapping = function( pEntry )
	{
		var i, pReturn = [];

		for( i = 0; i < pColumIndices.length; i++ )
		{
			pReturn.push( pEntry[ pColumIndices[ i ] ] );
		}

		return pReturn;
	};

	return pArray.map( fMapping );
};

/**
* Retuns the sum of the values in the array
*/
calc.sum = function( pArray )
{
	var fReduce = function( nPrevious, nCurrent )
	{
		return nPrevious + nCurrent;
	};

	return pArray.reduce( fReduce, 0 );
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
	var nSum = calc.sum( pData.slice( 0, nPeriod ) );

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



calc.stochasticOscillator = function( pHigh, pLow, pClose, nPeriod )
{

	var nMaxLength = pClose.length - nPeriod, nHigh, nLow, pResult = [], i;

	for( i = 0; i < pClose.length; i++ )
	{
		if( i > nPeriod && i < nMaxLength )
		{
			nHigh = Math.max.apply( Math, pHigh.slice( i - nPeriod, i + 1 ) );
			nLow = Math.min.apply( Math, pLow.slice( i - nPeriod, i  + 1) );

			pResult.push( 100 * ( ( pClose[ i ] - nLow ) / ( nHigh - nLow ) ) );
		}
		else
		{
			pResult.push( null );
		}
	}

	return pResult;
};
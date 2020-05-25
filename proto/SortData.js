'use strict';

const _ = require( 'wTools' );
require( 'wFiles' );
require( 'warraysorted' );

const columns = require( './SortOrder' );

let data = _.fileProvider.fileRead
( {
  filePath : abs( '../data/GeneralPurpose.yml' ),
  encoding : 'yaml',
} );

data.sort( sort );

_.fileProvider.fileWrite
( {
  filePath : abs( '../data/GeneralPurpose.yml' ),
  data,
  encoding : 'yaml',
} );

/* */

data = _.fileProvider.fileRead
( {
  filePath : abs( '../data/SymbolicExpression.yml' ),
  encoding : 'yaml',
} );

data.sort( sort );

_.fileProvider.fileWrite
( {
  filePath : abs( '../data/SymbolicExpression.yml' ),
  data,
  encoding : 'yaml',
} );

/* */

data = _.fileProvider.fileRead
( {
  filePath : abs( '../data/Special.yml' ),
  encoding : 'yaml',
} );

data.sort( sort );

_.fileProvider.fileWrite
( {
  filePath : abs( '../data/Special.yml' ),
  data,
  encoding : 'yaml',
} );

console.log( 'Data is sorted!' );

function abs() { return _.path.s.join( __dirname, ... arguments ) }

function sort( lib1, lib2 )
{
  let result;
  for( let i = 0; i < columns.length; i++ )
  {
    if( typeof lib1[ columns[ i ] ] === 'boolean' )
    {
      if( lib1[ columns[ i ] ] && !lib2[ columns[ i ] ] )
      {
        result = -1;
        break;
      }
      else if( !lib1[ columns[ i ] ] && lib2[ columns[ i ] ] )
      {
        result = 1;
        break;
      }
      else
      {
        result = 0;
      }
    }
    else if( typeof lib1[ columns[ i ] ] === 'number' )
    {
      if( lib1.dependants === '-' )
      {
        result = 1;
        break;
      }
      else if( lib2.dependants === '-' )
      {
        result = -1;
        break;
      }
      else
      {
        result = lib2.dependants - lib1.dependants;
        break;
      }
    }
  }
  return result;
}

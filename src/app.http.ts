import { readFileSync } from 'fs';
import http from 'http';

const server = http.createServer( ( req, res ) => {

  console.log( req.url );

  // HTML
  // res.writeHead(200, { 'Content-Type': 'text/html' });
  // res.write(`<h1>URL ${req.url}</h1>`);
  // res.end();


  //JSON
  // const data = {
  //   name: 'John Doe',
  //   age: 30,
  //   city: 'New York',
  // };
  // res.writeHead(200, { 'Content-Type': 'application/json' });
  // res.end(JSON.stringify(data));

  if ( req.url === '/' ) {
    const htmlFile = readFileSync( './public/index.html', 'utf-8' );
    res.writeHead( 200, { 'Content-Type': 'text/html' } );
    res.end( htmlFile );
    return;
  }

  if ( req.url?.endsWith( '.css' ) ) {
    res.writeHead( 200, { 'Content-Type': 'text/css' } );
  } else if ( req.url?.endsWith( '.js' ) ) {
    res.writeHead( 200, { 'Content-Type': 'application/javascript' } );
  }

  try {
    const responseContent = readFileSync( `./public${ req.url }`, 'utf-8' );
    res.end( responseContent );
  } catch ( error ) {
    res.writeHead( 404, { 'Content-Type': 'text/html' } );
    res.end();
  }


  // else {
  //   res.writeHead( 404, { 'Content-Type': 'text/html' } );
  //   res.end();
  // }

} );


server.listen( 8080, () => {
  console.log( 'server is running on port 8080' );
} );
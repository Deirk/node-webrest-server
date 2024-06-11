import { readFileSync } from 'fs';
import http2 from 'http2';

const server = http2.createSecureServer({
    key: readFileSync('./keys/server.key'),
    cert: readFileSync('./keys/server.crt'),
}, ( req, res ) => {

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

  const responseContent = readFileSync( `./public${ req.url }`, 'utf-8' );
  res.end( responseContent );


  // else {
  //   res.writeHead( 404, { 'Content-Type': 'text/html' } );
  //   res.end();
  // }

} );


server.listen( 8080, () => {
  console.log( 'server is running on port 8080' );
} );
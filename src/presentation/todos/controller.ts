import { Request, Response } from 'express';

const todos = [
  { id: 1, title: 'build milk', completedAt: new Date() },
  { id: 2, title: 'build bread', completedAt: null },
  { id: 3, title: 'build butter', completedAt: new Date() }
];

export class TodosController {

  public getTodos = ( req: Request, res: Response ) => {
    return res.json( todos );
  };

  public getTodosById = ( req: Request, res: Response ) => {
    const id = +req.params.id;
    if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'id must be a number' } );

    const todo = todos.find( todo => todo.id === id );
    if ( !todo ) return res.status( 404 ).json( { error: `TODO with id ${ id } not found` } );

    return res.json( todo );
  };

  public createTodo = ( req: Request, res: Response ) => {
    const { text } = req.body;
    if ( !text ) res.status( 400 ).json( { error: 'text is required' } );

    const newTodo = {
      id: todos.length + 1,
      title: text,
      completedAt: null
    };

    todos.push( newTodo );

    return res.json( newTodo );
  };

  public updateTodo = ( req: Request, res: Response ) => {
    const id = +req.params.id;
    if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'id must be a number' } );

    const todo = todos.find( todo => todo.id === id );
    if ( !todo ) return res.status( 404 ).json( { error: `TODO with id ${ id } not found` } );

    const { text, completedAt } = req.body;

    todo.title = text || todo.title;
    ( completedAt === 'null' )
      ? todo.completedAt = null
      : todo.completedAt = new Date( completedAt || todo.completedAt );

    return res.json( todo );
  };

  public deleteTodo = ( req: Request, res: Response ) => {
    const id = +req.params.id;
    if ( isNaN( id ) ) return res.status( 400 ).json( { error: 'id must be a number' } );

    const todo = todos.find( todo => todo.id === id );
    if ( !todo ) return res.status( 404 ).json( { error: `TODO with id ${ id } not found` } );

    todos.splice( todos.indexOf( todo ), 1 );

    return res.json( todo );
  };


}
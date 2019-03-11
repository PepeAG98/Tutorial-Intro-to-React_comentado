import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';



//import corgi, {eats} from './corgi';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {//constructor de la clase Board pone el estado de cada cuadro en nulo y una variable en verdadero para saber el turno del siguiente jugador
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsnext: true,
    };
  }

  handleClick(i) {//funcion que permite colocar X o O dependiendo el turno correspondiente y si todavia no hay un ganador 
    const squares = this.state.squares.slice();//funcion crear una copia y no mutar las cosas
    if (this.calculateWinner(this.state.squares) || squares[i]){
      return;
    }
    squares[i] = this.state.xIsnext ? 'X': 'O';
    this.setState({
      squares: squares,
      xIsnext: !this.state.xIsnext,//cambiar xIsnext en cada turno al contrario del que este
    });
  }

  calculateWinner(squares) {//funcion que se le envia el estado para poder comparalro con alguna de las combinaciones ganadoras
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for(let i = 0; i<lines.length; i++) {
      const [a,b,c] =lines[i];
      if(squares[a] === squares[b] && squares[a] === squares[c]) {
        return this.state.squares[a];
      }
    }

    return null;
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]} //Pasar la prop de tipo stado a Square por cada square i
        onClick={() => this.handleClick(i)} //Funcion de flecha gorda que es llamada en ada click pasra guardar el estado  
      />
    );
  }
//render que crea los componentes del tablero
  render() {
    const winnenr = this.calculateWinner(this.state.squares);//llamar funcion para saber si hay un ganador
    let status;
    if(winnenr){//si hay ganador colocar status con el ganador de lo contrario colocar el turno de quien le toque
      status = 'Winner: ' + winnenr;
    }
    else
    {
      status = 'Next player: '+ ( this.state.xIsnext ? 'X' : 'O');
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  //render que es u nivel mas alto 
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);



/*const person = {
	name:'Josh',
	tick() {
		console.log(this);
	}
}

person.tick();

const tick = person.tick.bind(person);
tick();

//fat arrow function

const dog = {
	eat() {
		setTimeout(() => console.log(this), 1000);
	}
}

dog.eat();*/


/*class Person {
	constructor(...args) {
		this.name = args[0];
		this.lastname =args[1];
		this.age = args[2];
	}

	talk() {
		console.log(this);
	}
}

let person = new Person('Josh');
console.log(person);
//ejecuta el metodo y el propio metodo imprime this = Person
person.talk();
//console.log imprime el resultado de ejecutar el metodo: return
console.log(person.talk());


class Student extends Person{
	constructor(name, lastname, age, studentId){
		super(name, lastname, age);
		this.studentId = studentId;
	}
}

let corgi = new Corgi('Thor');
console.log(corgi);
*/




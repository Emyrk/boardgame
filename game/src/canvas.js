import React from 'react';
import PropTypes from 'prop-types';
import p5 from 'p5'

export class Canvas extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
  };

  constructor(props) {
    super(props)
	this.myRef = React.createRef()
	this.listeners = [];
  }

  Sketch = (p) => {
  	p.setup = () => {
  		console.log(`Canvas draw for ${this.props.playerID}`)
        let cnv = p.createCanvas(400, 400);
        console.log("PID" + this.props.playerID)

        p.X = 0;
  		p.Y = 0;
        if(this.props.playerID != "0") {
        	cnv.position(500, 0)
        	p.X = 500
        } else {
        	cnv.position(0, 0)
        }

        let board= this.props.G.board
        // Draw buttons once
        for(let i = 0; i < board.cells.length; i++) {
        	let cell = board.cells[i]
        	let cellButton = p.cellButton(cell)
        }

        // drop a player id
        p.fill('black')
        p.textSize(10)
        p.text("Pid: " + this.props.playerID, 10, 10)

        cnv.mouseMoved = p.mouseMoved
        cnv.mousePressed = p.mousePressed
    };



    p.mouseMoved = () => {
    	for(let i = 0; i < this.listeners.length; i++) {
    		let l = this.listeners[i]
    		let d = p.dist(p.mouseX, p.mouseY, l.x, l.y)
    		if(d < l.size) {
    			p.cursor('grab');
    			return 
    		}
    	}
    }

    p.mousePressed = () => {
    	for(let i = 0; i < this.listeners.length; i++) {
    		let l = this.listeners[i]
    		let d = p.dist(p.mouseX, p.mouseY, l.x, l.y)
    		if(d < l.size) {
    			let props = this.props
    			console.log(`Player ${props.playerID} hit button ${l.id}`)
    			
        		props.moves.clickCell(l.id);
    			return 
    		}
    	}
    }

    // Add a mousebutton listener for each cell
    p.cellButton = (cell) => {
    	this.listeners.push(cell)
    	return null
    }

    p.draw = () => {
        p.background('grey');
        // p.fill(255);
        // p.rect(25,25,50,50);

        // Draw state from G
        // First let's draw the board.
        let board= this.props.G.board
        let props = this.props


        // Draw all arrows first to put them on the bottom layer
        for(let i = 0; i < board.cells.length; i++) {
        	let cell = board.cells[i]
			// Draw arrows
        	for(let j = 0; j < cell.to.length; j++) {
        		let to = board.cellMap[cell.to[j]]
        		p.drawArrow(cell.x, cell.y, to.x, to.y)
        	}
        }

        for(let i = 0; i < board.cells.length; i++) {
        	let cell = board.cells[i]
        	// Draw outer circle
        	p.drawCircle(cell.x, cell.y, cell.size, cell.color)

        	// Draw the player if they are on the primary
        	if(cell.primary != null) {
        		let c = playerColor(cell.primary)
        		p.drawCircle(cell.x, cell.y, cell.size/2, c)
        	}

        	// Put the ID
        	p.fill('black')
        	p.textSize(20)
        	p.text(cell.id, cell.x-5, cell.y+2)
        }
    };

    p.drawCircle = (x, y, size, color) => {
    	p.fill(color)
    	p.circle(x, y, size);
    }

    // TODO: Make directional
    p.drawArrow = (x1, y1, x2, y2, radi) => {
    	p.fill('black')
    	p.line(x1, y1, x2, y2)
    }



  }

  componentDidMount() {
  	console.log(this.myRef.current, this.props.playerID)
    this.myP5 = new p5(this.Sketch, this.myRef.current);
  }

  render() {
  	console.log(`Ref for ${this.props.playerID} is ${this.myRef.current}`)
    return (
      <div ref={this.myRef}>
      </div>
    )
  }
}



function playerColor(playerID) {
  switch (playerID){
    case "0":
      return "blue";
    case "1":
      return "green"
  }
  return "black"
}
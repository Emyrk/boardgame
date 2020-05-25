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
  }

  Sketch = (p) => {
  	p.setup = () => {
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

  		console.log(cnv)
        // p.noLoop()
    };

    p.cellButton = (cell) => {
    	let button = p.createButton("" + cell.id)
    	button.style("text-align", "center")
    	button.style("font-size", "20px")
    	button.style("border", "none")
    	button.style("cursor", "pointer")
    	button.style("border-radius", "100%")
    	button.style("width", cell.size+"px")
    	button.style("height", cell.size+"px")
    	button.style("background", "transparent")
    	button.style("text-shadow", "0px 1px 4px #FFFFFF")
    	// Idk why these magic numbers
    	// TODO: Figure this out
    	button.position(cell.x+p.X, cell.y)
    	//     	button.position(cell.x-(cell.size/3.14), cell.y)


    	return button
    }

    p.draw = () => {
        console.log(`Canvas draw for ${this.props.playerID}`)
        p.background('grey');
        // p.fill(255);
        // p.rect(25,25,50,50);

        // Draw state from G
        // First let's draw the board.
        let board= this.props.G.board
        let props = this.props

        for(let i = 0; i < board.cells.length; i++) {
        	let cell = board.cells[i]
        	p.drawCircle(cell.x, cell.y, cell.size, cell.color)
        	for(let j = 0; j < cell.to.length; j++) {
        		let to = board.cellMap[cell.to[j]]
        		p.drawArrow(cell.x, cell.y, to.x, to.y)
        	}
        }

        for(let i = 0; i < board.cells.length; i++) {
        	let cell = board.cells[i]
        	let cellButton = p.cellButton(cell)
        	cellButton.mousePressed(function() {
        		console.log(`Player ${props.playerID} hit button ${cell.id}`)
        		props.moves.clickCell(cell.id);
        	})
        }

        // drop a player id
        p.fill('black')
        p.textSize(10)
        p.text("Pid: " + this.props.playerID, 10, 10)

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
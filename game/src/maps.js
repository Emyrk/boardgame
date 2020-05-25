
// BareMap is the graph of the board without anything on it.
export class BareMap {
	constructor(cells) {
		this.cells = cells

		this.cellMap = cells.reduce(function(map, obj) {
		    map[obj.id] = obj;
		    return map;
		}, {});
	}
} 

export class Cell {
	constructor(id, x, y, color, size, to) {
		this.id = id
		this.x = x
		this.y = y
		this.size = size
		if(size === undefined || size === null) {
			this.size = 50
		}
		this.color = color
		this.to = to

		// Defaults
		this.primary = null // Primary token on cell
		this.secondary = null // Secondary token on cell
	}


}

const circleSize = 50

// LoveTriangle is a map with 3 circles
export const LoveTriangle = new BareMap(
	[
		new Cell(1, 100, 100, 'red', circleSize, [2]),
		new Cell(2, 300, 100, 'red', circleSize, [3]),
		new Cell(3, 200, 300, 'red', circleSize, [1]),
	]
)

/*IMPORTANT NOTES
1- you are using JS Name Casing (CamelCasing)
2- make this code as clean as possible 
3- apply all the concepts you learned during this lab (Naming, comments,  functions)
*/

class Point {
  //this constructor is used to construct the Point class
  constructor(coordinateX, coordinateY) {
    if (!coordinateX || !coordinateY) {
      throw Error("Coordinates Don't exist"); // throws an error in cas of width or height < 0
    }
    this.coordinateX = coordinateX;
    this.coordinateY = coordinateY;
  }
}

class Rectangle {
  constructor(startingPoint, width, height) {
    createRectangle({startingPoint, width, height});
  }

  // ***************
  // METHODS
  // ***************

  // Getters
  getHeight() {
    return this.height;
  }

  getWidth() {
    return this.width;
  }

  calculateArea() {
    return this.width * this.height;
  }

  calculatePerimeter() {
    return 2 * this.width + 2 * this.height;
  }

  setHeight(height) {
    if (height && height > 0) {
      this.height = height;
      this.width = height;
    }
  }

  createRectangle({ startingPoint, width, height }) {
    if (!height || height <= 0 || !width || width <= 0) {
      throw Error("invalid Width and Height"); // throws an error in cas of width or height < 0
    }
    this.startingPoint = startingPoint;
    this.width = width;
    this.height = height;
  }

  //function that print the endpoints
  printEndPoints() {
    const topRight = this.startingPoint.coordinateX + this.broad;
    const bottomLeft = this.startingPoint.coordinateY + this.height;
    console.log("End Point X-Axis (Top Right): " + topRight);
    console.log("End Point Y-Axis (Bottom Left): " + bottomLeft);
  }
}

function buildRectangle(Width, x, Height, y) {
  const mainPoint = new Point(x, y);
  const rectangle = new Rectangle(mainPoint, Width, Height);
  return rectangle;
}

function constructSquare(coordinateX, coordinateY, squareHeight) {
  let square;
  square = buildRectangle(squareHeight, coordinateX, SquareHeight, coordinateY);

  const squareArea = square.calculateArea();
  const squarePerimeter = square.calculatePerimeter();
  console.log("square Area ", squareArea);
  console.log("square Perimeter ", squarePerimeter);
}

const myRectangle = buildRectangle(2, 3, 5, 4);
const square = constructSquare();

console.log(square.calculatePerimeter(1, 1, 3));
square.getEndPoints();

myRectangle.setHeight(3);

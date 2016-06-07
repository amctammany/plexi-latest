class Vector {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  zero() {
    this.x = 0;
    this.y = 0;
    return this;
  }
  getMagnitude() {
    return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  }

  setMagnitude(m) {
    var uv = this.normalize();
    this.x = uv.x * m;
    this.y = uv.y * m;
    return this;
  }
  multiply(s) {
    return new Vector(this.x * s, this.y * s);
  }
  imultiply(s) {
    this.x *= s;
    this.y *= s;
    return this;
  }

  add(v) {
    return new Vector(
      this.x + v.x,
      this.y + v.y
    );
  }
  iadd(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  subtract(v) {
    return new Vector(
      this.x - v.x,
      this.y - v.y
    );
  }
  isubtract(v) {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }
  dot(v) {
    return (this.x * v.x) + (this.y * v.y);
  }
  normalize() {
    let m = this.getMagnitude();
    return new Vector(this.x / m, this.y / m);
  }
  perpendicular() {
    var v = new Vector();
    v.x = this.y;
    v.y = 0 - this.x;
    return v;

  }
  reflect(axis) {
      var dotProductRatio, vdotl, ldotl, v = new Vector(),
           vdotl = this.dot(axis),
           ldotl = axis.dot(axis),
           dotProductRatio = vdotl / ldotl;

      v.x = 2 * dotProductRatio * axis.x - this.x;
      v.y = 2 * dotProductRatio * axis.y - this.y;

      return v;
  }
};

module.exports = Vector;

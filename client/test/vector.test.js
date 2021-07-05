const assert = require('assert');
const Vector = require('../src/scripts/Vector');

describe('Vector (10 10)', () => {
  // // getters
  // describe('lenght', () => {
  //   it('should be equal to 14.1421', () => {
  //     assert.strictEqual(vector.length, 14.142135623730951);
  //   });
  // });

  // describe('magnitude', () => {
  //   it('should be equal to 14.1421', () => {
  //     assert.strictEqual(vector.magnitude, 14.142135623730951);
  //   });
  // });

  // operations
  describe('add', () => {
    const vector = new Vector(10, 10);
    it('should result in x:11 & y:11', () => {
      vector.add(new Vector(1, 1));
      assert.strictEqual(vector.x, 11);
      assert.strictEqual(vector.y, 11);
    });
  });
  describe('addScalar', () => {
    const vector = new Vector(10, 10);
    it('should result in x:11 & y:11', () => {
      vector.addScalar(1);
      assert.strictEqual(vector.x, 11);
      assert.strictEqual(vector.y, 11);
    });
  });

  describe('subtract', () => {
    const vector = new Vector(10, 10);
    it('should result in x:9 & y:9', () => {
      vector.subtract(new Vector(1, 1));
      assert.strictEqual(vector.x, 9);
      assert.strictEqual(vector.y, 9);
    });
  });
  describe('subtractScalar', () => {
    const vector = new Vector(10, 10);
    it('should result in x:9 & y:9', () => {
      vector.subtractScalar(1);
      assert.strictEqual(vector.x, 9);
      assert.strictEqual(vector.y, 9);
    });
  });

  describe('multiply', () => {
    const vector = new Vector(10, 10);
    it('should result in x:20 & y:20', () => {
      vector.multiply(new Vector(2, 2));
      assert.strictEqual(vector.x, 20);
      assert.strictEqual(vector.y, 20);
    });
  });
  describe('multiplyScalar', () => {
    const vector = new Vector(10, 10);
    it('should result in x:20 & y:20', () => {
      vector.multiplyScalar(2);
      assert.strictEqual(vector.x, 20);
      assert.strictEqual(vector.y, 20);
    });
  });

  describe('divide', () => {
    const vector = new Vector(10, 10);
    it('should result in x:5 & y:5', () => {
      vector.divide(new Vector(2, 2));
      assert.strictEqual(vector.x, 5);
      assert.strictEqual(vector.y, 5);
    });
  });
  describe('divideScalar', () => {
    const vector = new Vector(10, 10);
    it('should result in x:5 & y:5', () => {
      vector.divideScalar(2);
      assert.strictEqual(vector.x, 5);
      assert.strictEqual(vector.y, 5);
    });
  });

  describe('invert', () => {
    const vector = new Vector(10, 10);
    it('should result in x:-10 & y:-10', () => {
      vector.invert();
      assert.strictEqual(vector.x, -10);
      assert.strictEqual(vector.y, -10);
    });
  });
  describe('invertX', () => {
    const vector = new Vector(10, 10);
    it('should result in x:-10 & y:10', () => {
      vector.invertX();
      assert.strictEqual(vector.x, -10);
      assert.strictEqual(vector.y, 10);
    });
  });
  describe('invertY', () => {
    const vector = new Vector(10, 10);
    it('should result in x:10 & y:-10', () => {
      vector.invertY();
      assert.strictEqual(vector.x, 10);
      assert.strictEqual(vector.y, -10);
    });
  });

  describe('zero', () => {
    const vector = new Vector(10, 10);
    it('should result in x:0 & y:0', () => {
      vector.zero();
      assert.strictEqual(vector.x, 0);
      assert.strictEqual(vector.y, 0);
    });
  });

  describe('zero', () => {
    const vector = new Vector(10, 10);
    it('should result in x:0 & y:0', () => {
      vector.zero();
      assert.strictEqual(vector.x, 0);
      assert.strictEqual(vector.y, 0);
    });
  });
  describe('zeroX', () => {
    const vector = new Vector(10, 10);
    it('should result in x:0 & y:10', () => {
      vector.zeroX();
      assert.strictEqual(vector.x, 0);
      assert.strictEqual(vector.y, 10);
    });
  });
  describe('zeroY', () => {
    const vector = new Vector(10, 10);
    it('should result in x:10 & y:0', () => {
      vector.zeroY();
      assert.strictEqual(vector.x, 10);
      assert.strictEqual(vector.y, 0);
    });
  });

  describe('normalize', () => {
    const vector = new Vector(10, 10);
    const unitComponent = 0.7071067811865475;
    it('should result in x:0.70 & y:0.70', () => {
      vector.normalize();
      assert.strictEqual(vector.x, unitComponent);
      assert.strictEqual(vector.y, unitComponent);
    });
  });

  describe('dot', () => {
    const vector1 = new Vector(10, 10);
    const vector2 = new Vector(20, 20);
    const expectedResult = 400;
    it('should result in 400', () => {
      assert.strictEqual(vector1.dot(vector2), expectedResult);
    });
  });

  describe('cross', () => {
    const vector1 = new Vector(10, 10);
    const vector2 = new Vector(20, 20);
    const expectedResult = 0;
    it('should result in 0', () => {
      assert.strictEqual(vector1.cross(vector2), expectedResult);
    });
  });

  // describe('addX', () => {
  //   it('should result in x:12 & y:11', () => {
  //     vector.addX(new Vector(1, 1));
  //     assert.strictEqual(vector.x, 12);
  //     assert.strictEqual(vector.y, 11);
  //   });
  // });

  // describe('addY', () => {
  //   it('should result in x:12 & y:12', () => {
  //     vector.addY(new Vector(1, 1));
  //     assert.strictEqual(vector.x, 12);
  //     assert.strictEqual(vector.y, 12);
  //   });
  // });
});

const gameObjectSchema = {
  width: 0,
  height: 0,
  friction: 0,
  positionX: 0,
  positionY: 0,
  velocityX: 0,
  velocityY: 0,
};

Object.freeze(gameObjectSchema);

class GameObject {
  constructor({
    width = 0,
    height = 0,
    friction = 0,
    positionX = 0,
    positionY = 0,
    velocityX = 0,
    velocityY = 0,
  } = gameObjectSchema) {
    this.width = width;
    this.height = height;
    this.friction = friction;
    this.positionX = positionX;
    this.positionY = positionY;
    this.velocityX = velocityX;
    this.velocityY = velocityY;

    this.positionV = new Vector(positionX, positionY);
    this.velocityV = new Vector(velocityX, velocityY);
  }

  get top() {
    return this.positionY;
  }

  get left() {
    return this.positionX;
  }

  get right() {
    return this.left + this.width;
  }

  get bottom() {
    return this.top + this.height;
  }

  get centerX() {
    return this.positionX + this.width * 0.5;
  }

  get centerY() {
    return this.positionY + this.height * 0.5;
  }
}

export { GameObject, gameObjectSchema };

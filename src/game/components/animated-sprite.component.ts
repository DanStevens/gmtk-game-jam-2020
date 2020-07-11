import * as PIXI from 'pixi.js';

import { Component } from '../component';
import { Assets } from '../assets';
import { HitboxComponent } from './hitbox.component';

type Direction = 'up' | 'down' | 'left' | 'right';

export class AnimatedSpriteComponent extends Component {

  public static readonly KEY = Symbol();

  private sprite: PIXI.Sprite;
  private hitbox: HitboxComponent;
  private spritesheet: PIXI.Spritesheet;

  constructor(
    private filename: string
  ) {
    super(AnimatedSpriteComponent.KEY);
    this.spritesheet = Assets.spritesheet();
    this.sprite = new PIXI.AnimatedSprite(this.spritesheet.animations[`${filename}_down`]);
  }

  public onSpawn(): void {

    // Register this Sprite with Pixi
    this.entity.context
      .getViewport()
      .addChild(this.sprite);

    // Retrieve the Hitbox from the Entity
    this.hitbox = <HitboxComponent>
      this.entity.getComponent(HitboxComponent.KEY);

    this.snapToEntity();
  }

  public update(delta: number): void {
    this.updateDirection();
    this.snapToEntity();
  }

  private snapToEntity(): void {
    // Update the position of the Sprite based on the Entity position
    this.sprite.x = this.hitbox.x;
    this.sprite.y = this.hitbox.y;
    this.sprite.width = this.hitbox.width;
    this.sprite.height = this.hitbox.height;
  }

  private updateDirection() {
    let newDirection: Direction;
    if (this.sprite.x > this.hitbox.x) {
      newDirection = 'left';
    } else if (this.sprite.x < this.hitbox.x) {
      newDirection = 'right';
    } else if (this.sprite.y > this.hitbox.y) {
      newDirection = 'up';
    } else if (this.sprite.y < this.hitbox.y) {
      newDirection = 'down';
    } else {
      return;
    }

    // Update the texture
    this.sprite.destroy();
    this.sprite = new PIXI.AnimatedSprite(this.spritesheet.animations[`${this.filename}_${newDirection}`])
    this.entity.context
      .getViewport()
      .addChild(this.sprite);
  }

}

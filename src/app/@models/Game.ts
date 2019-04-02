import { AbstractSection, AbstractTypedData } from './abstract-section';

export class GameData extends AbstractTypedData {
  public platforms: Array<Platform>;
}

export class Game extends AbstractSection<GameData> {
  data: GameData;
}

export enum Platform {
  PC,
  Xbox,
  Xbox360,
  XboxOne,
  PSOne,
  PSTwo,
  PSThree,
  PSFour,
  Android,
  IOs,
  MacOS,
  Linux
}

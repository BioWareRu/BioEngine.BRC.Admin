import {Section, TypedData} from "./Section";

export class GameData extends TypedData {
  public Platforms: Platform[];
}

export class Game extends Section<GameData> {
  Data: GameData;
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
  iOS,
  MacOS,
  Linux
}


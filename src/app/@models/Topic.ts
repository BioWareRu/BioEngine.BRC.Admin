import {Section, TypedData} from "./Section";

export class TopicData extends TypedData {
}

export class Topic extends Section<TopicData> {
  Data: TopicData;
}

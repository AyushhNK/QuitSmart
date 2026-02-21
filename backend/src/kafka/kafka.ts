import { Kafka } from "kafkajs";

export const kafka = new Kafka({
  clientId: "QuitSmart",
  brokers: ["localhost:9092"], 
});

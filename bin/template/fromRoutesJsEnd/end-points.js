import express from 'express';

const tableName = "<TABLE_NAME>.json";
const tablePath = "Data/<TABLE_NAME>.json";
const configPath = "Config/Schemas/<TABLE_NAME>.json";

const router = express.Router();

export { router };
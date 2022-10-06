import admin from "firebase-admin";
import logger from "../utils/logger.js";
import DBClient from "./DBClient.class.js";
import config from "../config.js";

class FirebaseClient extends DBClient {
  constructor() {
    super();
  }

}

export default FirebaseClient;
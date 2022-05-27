"use strict";
const assert = require('assert');
const dotenv = require('dotenv');
dotenv.config();
const {
    PORT,
    DB_HOST,
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    JWT_SECRET,
    SERVER_KEY,
    SOCKET_TOKEN_KEY,
    PUBNUB_SUBSCRIBE_KEY,
    OLAA_PUBNUB_SUBSCRIBE_KEY,
    OLAA_PUBNUB_PUBLISH_KEY,
    OLAA_PUBNUB_SECRET_KEY,
    ONESIGNAL_APP_ID,
    ONESIGNAL_API_KEY,
} = process.env;


assert(PORT, 'PORT is required');
assert(DB_USERNAME, 'DB_USERNAME is required');
assert(DB_PASSWORD, 'DB_PASSWORD is required');
assert(DB_NAME, 'DB_NAME is required');
assert(JWT_SECRET, 'JWT_SECRET is required');
assert(SERVER_KEY, 'SERVER_KEY is required');
assert(SOCKET_TOKEN_KEY, 'SOCKET_TOKEN_KEY is required');
assert(PUBNUB_SUBSCRIBE_KEY, 'PUBNUB_SUBSCRIBE_KEY is required');
assert(OLAA_PUBNUB_SUBSCRIBE_KEY, 'OLAA_PUBNUB_SUBSCRIBE_KEY is required');
assert(OLAA_PUBNUB_PUBLISH_KEY, 'OLAA_PUBNUB_PUBLISH_KEY is required');
assert(OLAA_PUBNUB_SECRET_KEY, 'OLAA_PUBNUB_SECRET_KEY is required');
assert(ONESIGNAL_APP_ID, 'ONESIGNAL_APP_ID is required');
assert(ONESIGNAL_API_KEY, 'ONESIGNAL_API_KEY is required');


module.exports = {
    port: PORT,
    db: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_NAME,
        host: DB_HOST,
    },
    jwt: {
        secret: JWT_SECRET,
    },
    serverKey: SERVER_KEY,
    socketTokenKey: SOCKET_TOKEN_KEY,
    pubnub: {
        bcelOneSubscribeKey: PUBNUB_SUBSCRIBE_KEY,
        subscribeKey: OLAA_PUBNUB_SUBSCRIBE_KEY,
        publishKey: OLAA_PUBNUB_PUBLISH_KEY,
        secretKey: OLAA_PUBNUB_SECRET_KEY,
    },
    onesignal: {
        appId: ONESIGNAL_APP_ID,
        apiKey: ONESIGNAL_API_KEY,
    },

};

#!/usr/bin/env node

const { connect, StringCodec } = require("nats");


const opts = {
    servers: [
        "nats://localhost:4222",
        "nats://localhost:5222",
        "nats://localhost:6222"
    ]
};

const subject = "test";

(async () => {
    let nc;
    try {
        nc = await connect(opts);
    } catch (err) {
        console.log(`error connecting to nats: ${err.message}`);
        return;
    }
    console.info(`connected ${nc.getServer()}`);

    const sc = StringCodec();

    nc.closed()
        .then((err) => {
            if (err) {
                console.error(`closed with an error: ${err.message}`);
            }
        });

    nc.publish(subject, sc.encode(String("test")));

    await nc.flush();
    await nc.close();
})();

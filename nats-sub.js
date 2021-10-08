#!/usr/bin/env node

const { connect } = require("nats");


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

    nc.closed()
        .then((err) => {
            if (err) {
                console.error(`closed with an error: ${err.message}`);
            }
        });


    const sub = nc.subscribe(subject);

    for await (const m of sub) {
        console.log(m.data.toString());
    }

})();
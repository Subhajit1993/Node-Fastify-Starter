const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});

const fastify = require("fastify")({
    trustProxy: true,
    bodyLimit: 10485760000, // (10MiB Default)
    logger: {
        level: "info",
        prettyPrint: true,
    },
});

fastify.register(require("fastify-static"), {
    root: path.join(__dirname, "public"),
    prefix: "/public/",
});

fastify.register(require("point-of-view"), {
    engine: {
        handlebars: require("handlebars"),
    },
});

fastify.register(require("./routes/home"), { prefix: "/api/" });
fastify.register(require("./routes/root"), { prefix: "/" });

fastify.listen(process.env.PORT || 3500, "0.0.0.0", function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    fastify.log.info(`server listening on ${address}`);
});

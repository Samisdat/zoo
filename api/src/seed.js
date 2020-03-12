const seed = require('./test/seed')

const seeding = async () => {

    await seed.starting();

    await seed.doing();

    await seed.stoping();

};
seeding();

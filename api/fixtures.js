const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const Picture = require('./models/Eatery');
const {nanoid} = require("nanoid");

const run = async () => {
  await mongoose.connect(config.database, config.databaseOptions);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (let coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user1, user2] = await User.create({
    username: 'user',
    password: '123',
    token: nanoid(),
  }, {
    username: 'admin',
    password: 'admin123',
    role: 'admin',
    token: nanoid(),
  });

  await Picture.create({
    title: 'Girl',
    user: user1,
    image: 'fixtures/girl.jpg'
  }, {
    title: 'Girl2',
    user: user1,
    image: 'fixtures/girl2.png'
  }, {
    title: 'Beach',
    user: user2,
    image: 'fixtures/beach.jpg'
  }, {
    title: 'Motion',
    user: user2,
    image: 'fixtures/motion.jpg'
  });

  mongoose.connection.close();
};

run().catch(e => {
  mongoose.connection.close();
  throw e;
});
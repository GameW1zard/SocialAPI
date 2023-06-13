const mongoose = require('mongoose');
const {reaction, thoughts, user} = require('../schemas');
const db = require('../config/connector');

db.once('open', async function () {
    console.log(`mongoose connection successful`);
    
    const userSeed = await user.create({
        username: 'testuser',
        email: 'email@email.com'
    });
    console.log(`user Seeded: ${userSeed}`);

    const friendseed = await user.create({
        username: 'testfriend',
        email: 'email2@email.com'
    });
    console.log(`friend Seeded: ${friendseed}`);

    const thoughtSeed = await thoughts.create({
        thoughtText: 'test thought',
        username: 'testuser'
    });
    console.log(`thought Seeded: ${thoughtSeed}`);
  });
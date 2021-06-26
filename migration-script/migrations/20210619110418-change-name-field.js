module.exports = {
  async up(db, client) {
    // TODO write your migration here.
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    // Example:
    await db.collection('users').updateOne({ username: 'yoneks' }, {$set: {username: 'unique'}});
    await db.collection('users').updateOne({ username: 'yonekss' }, {$set: {username: 'salonga'}});
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    await db.collection('users').updateOne({ username: 'unique' }, {$set: {username: 'yoneks'}});
    await db.collection('users').updateOne({ username: 'salonga' }, {$set: {username: 'yonekss'}});
  }
};

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ posts: [] })
  .write();

function generateId() {
  while (true) {
    let id = Math.random().toString(36).substr(2, 6);
    let exist = db.get('posts').find({ id }).value();
    if (!exist) return id;
  }
}

module.exports = {
  getPosts() {
    return db.get('posts').value();
  },
  addPost(title) {
    db.get('posts')
      .push({ id: generateId(), title })
      .write();
  },
  removePost(id) {
    db.get('posts')
      .remove({ id })
      .write();
  },
};

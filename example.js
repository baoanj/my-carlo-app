const carlo = require('carlo');
const path = require('path');
const os = require('os');
const lowdb = require('./lowdb');

(async () => {
  // Launch the browser.
  const app = await carlo.launch({
    userDataDir: path.join(os.homedir(), '.mycarloapp'),
  });

  // Terminate Node.js process on app window closing.
  app.on('exit', () => process.exit());

  // New windows are opened when this app is started again from command line.
  app.on('window', window => window.load('example.html'));

  // Tell carlo where your web files are located.
  app.serveFolder(path.join(__dirname, '/www'));

  // Expose 'getPosts' function in the web environment.
  await app.exposeFunction('getPosts', _ => {
    return lowdb.getPosts();
  });
  await app.exposeFunction('addPost', title => {
    lowdb.addPost(title);
  });
  await app.exposeFunction('removePost', id => {
    lowdb.removePost(id);
  });

  // Navigate to the main page of your app.
  await app.load('example.html');
})();

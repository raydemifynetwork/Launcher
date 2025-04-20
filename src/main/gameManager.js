const { app, shell } = require('electron');
const fs   = require('fs');
const path = require('path');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const unzip = require('unzipper');

const PLUGIN_DIR = path.join(__dirname, '../plugins');
const GAME_DIR   = path.join(app.getPath('userData'), 'games');

class GameManager {
  constructor () {
    this.plugins = fs.readdirSync(PLUGIN_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => JSON.parse(fs.readFileSync(path.join(PLUGIN_DIR, f), 'utf8')));
  }

  list () { return this.plugins; }

  async install (id) { return this.#downloadAndExtract(id, 'install'); }
  async update  (id) { return this.#downloadAndExtract(id, 'update');  }

  async launch (id) {
    const plug = this.plugins.find(p => p.id === id);
    if (!plug) throw new Error('Plugin não encontrado');
    const exePath = path.join(GAME_DIR, id, plug.launch.exec);
    shell.openPath(exePath);
    return { launched: true };
  }

  async #downloadAndExtract (id, action) {
    const plug = this.plugins.find(p => p.id === id);
    if (!plug) throw new Error('Plugin não encontrado');

    const { url, version } = plug[action];
    const dest   = path.join(GAME_DIR, id);
    const tmpZip = path.join(app.getPath('temp'), `${id}.zip`);

    const res = await fetch(url);
    await new Promise((resolve, reject) => {
      const file = fs.createWriteStream(tmpZip);
      res.body.pipe(file);
      res.body.on('error', reject);
      file.on('finish', resolve);
    });

    await fs.createReadStream(tmpZip)
      .pipe(unzip.Extract({ path: dest }))
      .promise();

    fs.unlinkSync(tmpZip);
    fs.writeFileSync(path.join(dest, '.version'), version);
    return { ok: true, version };
  }
}

module.exports = GameManager;

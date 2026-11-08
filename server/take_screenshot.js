const cp = require('child_process');
const http = require('http');
const fs = require('fs');
const WebSocket = require('ws');

const edge = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const proc = cp.spawn(edge, ['--headless', '--window-size=1920,1080', '--remote-debugging-port=9222', 'http://localhost:5173/login']);

function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  await wait(2500);
  http.get('http://127.0.0.1:9222/json', (res) => {
    let b = ''; res.on('data', c => b += c);
    res.on('end', async () => {
      const tabs = JSON.parse(b);
      const pageTab = tabs.find(t => t.url && t.url.includes('localhost:5173'));
      if (!pageTab) { proc.kill(); return; }
      const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
      ws.on('open', () => {
        ws.send(JSON.stringify({ id: 1, method: 'Console.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 3, method: 'Page.enable' }));
      });

      await wait(1000);

      // Perform real form submission with Student credentials
      ws.send(JSON.stringify({
        id: 10,
        method: 'Runtime.evaluate',
        params: {
          expression: `
            (async () => {
              const res = await fetch('http://localhost:5000/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier: 'EN2024CS042', password: 'Student@123456' })
              });
              const json = await res.json();
              localStorage.setItem('campusos_token', json.data.token);
              localStorage.setItem('campusos_user', JSON.stringify(json.data.user));
              window.location.href = 'http://localhost:5173/student/dashboard';
            })();
          `
        }
      }));

      await wait(3500);

      // Take screenshot of the student dashboard
      ws.send(JSON.stringify({ id: 50, method: 'Page.captureScreenshot', params: { format: 'png' } }));

      ws.on('message', (d) => {
        const msg = JSON.parse(d);
        if (msg.id === 50) {
          const buffer = Buffer.from(msg.result.data, 'base64');
          fs.writeFileSync('c:\\Users\\hp\\Projects\\Complete College Management system\\client\\pc_dashboard.png', buffer);
          console.log('SCREENSHOT SAVED, size:', buffer.length);
          ws.close();
          proc.kill();
          process.exit(0);
        }
      });
    });
  });
}
run();

Billy: A simple URL shortener service in Node.js and Vue.js
=====================================================

A demo application for a simple URL shortener service


## How it works

Everyime that you short a url you need to send the url and your preferred name. After that you can retrieve it or generate a QR code for the new url.
Because the application runs on localhost, in order to retrieve the url you have to access the end point http://localhost:5000/YOUR_KEYWORD. If you run it on a server you can retrieve your url as https://Billy/YOUR_KEYWORD


## Quick Start

Clone the repo and install the dependencies.

```bash
https://github.com/zagaris/Billy.git
cd Billy/server
```

```bash
npm install
```
To start the express server, run the following

```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) and take a look around.

## Testing
You can run tests via npm:

```
$ npm test
```

**or**

```
$ npm run test
```

The latter command will execute all tests automatically whenever a change is detected.

---

## License

MIT

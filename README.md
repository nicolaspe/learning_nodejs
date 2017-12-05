# learning_nodejs
Repository for experiments and learning node.js + npm

## Commands and setup
To **check versions** of node or npm, run:
- `node --version` or `node -v`
- `npm --version` or `npm -v`

### Initialization
Initialize a project
```
$ npm init
```
Which creates a **package.json** file
[not creating dependencies? update node!](https://stackoverflow.com/questions/45866533/npm-install-not-create-a-new-package-lock-json)

### Updating
#### node.js
To update **node.js** via terminal, you can use the npm package [n](https://www.npmjs.com/package/n)
```
$ npm install -g n
```
With this package, you can update to the latest, stable, lts or any version you want.
```
$ n latest
$ n stable
$ n lts
$ n <version>
```
And also select the working version just running `n`
`$ n`

#### npm
`npm` can update itself
```
$ npm install npm@latest -g
```
You have to be careful, as `npm` can have trouble working with the latest node version. Luckily, you can manage that with the package previously shown.

## [express.js](https://expressjs.com/)

Also: course from [lynda.com](https://www.lynda.com/Node-js-tutorials/Learning-Node-js/612195-2.html)


## [socket.io](https://socket.io/)

[Learning to use socket.io](https://socket.io/get-started/chat/)


## Deploy
[Steps](https://devcenter.heroku.com/articles/getting-started-with-nodejs#prepare-the-app)

## Resources
For learning about node.js and npm
- [Shiffman's Twitter Bot Tutorial](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6atTSxoRiVnSuOn6JHnq2yV)

To host a node app
- [Digital Ocean](https://www.digitalocean.com/)
- [Heroku](https://www.heroku.com/)
	- [Comparison](https://www.quora.com/What-is-better-Heroku-or-Digital-Ocean)

require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var app_1 = __webpack_require__(2);
	console.log("Listening on port Taxi...");
	app_1.default.listen(1729);
	//# sourceMappingURL=main.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var http = __webpack_require__(3);
	var express = __webpack_require__(5);
	var socketio = __webpack_require__(6);
	var app = express();
	var server = http.createServer(app);
	var io = socketio(server);
	var db = __webpack_require__(7);
	var user = __webpack_require__(19);
	db.sequelize.sync().then(function () {
	    // db.users.create({
	    // 	name: '(R)Development Webware'
	    // })
	});
	// collects open socket connections
	var sockets = [];
	io.on('connection', function (socket) {
	    sockets.push(socket);
	    socket.on('post.user', function (body) {
	        user.postTo(socket, body);
	    });
	    socket.on('get.users', function (body) {
	        console.log('hit getUsers', body);
	        user.getAll(socket, body);
	    });
	    socket.on('get.userById', function (body) {
	        user.getByID(socket, body);
	    });
	    socket.on('delete.user', function (request) {
	    });
	    socket.on('disconnect', function () {
	        // removes closed socket connections
	        sockets = sockets.filter(function (s) { return s !== socket; });
	    });
	});
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = server;
	//# sourceMappingURL=app.js.map

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("socket.io");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var Sequelize = __webpack_require__(8);
	var sequelize = new Sequelize('database', 'username', 'password', {
	    host: 'localhost',
	    dialect: 'sqlite',
	    pool: {
	        max: 5,
	        min: 0,
	        idle: 10000
	    },
	    storage: './rdev.sql3'
	});
	var db = {
	    Sequelize: void 0,
	    sequelize: void 0,
	    users: void 0,
	    messages: void 0,
	    companies: void 0,
	    quotes: void 0,
	    quoteLines: void 0
	};
	db.Sequelize = Sequelize;
	db.sequelize = sequelize;
	db.users = __webpack_require__(14)(sequelize, Sequelize);
	db.messages = __webpack_require__(15)(sequelize, Sequelize);
	db.companies = __webpack_require__(16)(sequelize, Sequelize);
	db.quotes = __webpack_require__(17)(sequelize, Sequelize);
	db.quoteLines = __webpack_require__(18)(sequelize, Sequelize);
	db.companies.hasMany(db.users);
	db.companies.hasMany(db.quotes);
	db.quotes.hasMany(db.quoteLines);
	db.users.hasMany(db.messages);
	db.messages.belongsTo(db.users);
	db.quoteLines.belongsTo(db.quotes);
	module.exports = db;
	//# sourceMappingURL=db.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("sequelize");

/***/ },
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (sequelize, DataTypes) {
	    var User = sequelize.define('user', {
	        id: {
	            type: DataTypes.UUID,
	            primaryKey: true,
	            defaultValue: DataTypes.UUIDV4
	        },
	        name: {
	            type: DataTypes.STRING,
	            required: true
	        },
	        passHash: {
	            type: DataTypes.STRING,
	        },
	        role: {
	            type: DataTypes.ENUM,
	            values: ['user', 'admin', 'contact', 'disabled']
	        },
	        email: {
	            type: DataTypes.STRING
	        },
	        address: {
	            type: DataTypes.STRING
	        },
	        phone: {
	            type: DataTypes.STRING
	        },
	        companyName: {
	            type: DataTypes.STRING
	        },
	        companyWeb: {
	            type: DataTypes.STRING
	        },
	        companyPhone: {
	            type: DataTypes.STRING
	        },
	        companyFax: {
	            type: DataTypes.STRING
	        },
	        created_at: {
	            type: DataTypes.DATE,
	            allowNull: false
	        },
	        updated_at: DataTypes.DATE,
	        deleted_at: DataTypes.DATE
	    }, {
	        freezeTableName: true,
	        paranoid: false,
	        underscored: true,
	    });
	    return User;
	};
	//# sourceMappingURL=User.Model.js.map

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (sequelize, DataTypes) {
	    var Message = sequelize.define('message', {
	        id: {
	            type: DataTypes.UUID,
	            primaryKey: true,
	            defaultValue: DataTypes.UUIDV4
	        },
	        name: {
	            type: DataTypes.STRING,
	            required: true
	        },
	        owner_id: {
	            type: DataTypes.UUID,
	            allowNull: false
	        },
	        type: {
	            type: DataTypes.ENUM,
	            values: ['alert', 'system', 'userMessage', 'notes']
	        },
	        sender: {
	            type: DataTypes.STRING,
	            required: true
	        },
	        text: {
	            type: DataTypes.STRING,
	            required: true
	        },
	        title: {
	            type: DataTypes.STRING,
	            required: true
	        },
	        header: {
	            type: DataTypes.STRING,
	            required: true
	        },
	        created_at: {
	            type: DataTypes.DATE,
	            allowNull: false
	        },
	        updated_at: DataTypes.DATE,
	        deleted_at: DataTypes.DATE
	    }, {
	        freezeTableName: true,
	        paranoid: false,
	        underscored: true
	    });
	    return Message;
	};
	//# sourceMappingURL=Message.Model.js.map

/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (sequelize, DataTypes) {
	    var Companies = sequelize.define('companies', {
	        id: {
	            type: DataTypes.UUID,
	            primaryKey: true,
	            defaultValue: DataTypes.UUIDV4
	        },
	        name: {
	            type: DataTypes.STRING,
	            required: true
	        },
	        address: {
	            type: DataTypes.STRING,
	        },
	        city: {
	            type: DataTypes.STRING,
	        },
	        zip: {
	            type: DataTypes.STRING,
	        },
	        phone: {
	            type: DataTypes.STRING,
	        },
	        Misc: {
	            type: DataTypes.STRING
	        },
	        updated_at: DataTypes.DATE,
	        deleted_at: DataTypes.DATE
	    }, {
	        freezeTableName: true,
	        paranoid: false,
	        underscored: true
	    });
	    return Companies;
	};
	//# sourceMappingURL=Companies.Model.js.map

/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (sequelize, DataTypes) {
	    var Quotes = sequelize.define('quotes', {
	        id: {
	            type: DataTypes.UUID,
	            primaryKey: true,
	            defaultValue: DataTypes.UUIDV4
	        },
	        name: {
	            type: DataTypes.STRING,
	            required: true
	        },
	        created_at: {
	            type: DataTypes.DATE,
	            allowNull: false
	        },
	        updated_at: DataTypes.DATE,
	        deleted_at: DataTypes.DATE
	    }, {
	        freezeTableName: true,
	        paranoid: false,
	        underscored: true,
	    });
	    return Quotes;
	};
	//# sourceMappingURL=Quotes.Model.js.map

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (sequelize, DataTypes) {
	    var QuoteLines = sequelize.define('quoteLines', {
	        id: {
	            type: DataTypes.UUID,
	            primaryKey: true,
	            defaultValue: DataTypes.UUIDV4
	        },
	        owner_id: {
	            type: DataTypes.UUID,
	            allowNull: false
	        },
	        desc: {
	            type: DataTypes.STRING,
	        },
	        cost: {
	            type: DataTypes.FLOAT,
	            required: true
	        },
	        isCentered: {
	            type: DataTypes.BOOLEAN,
	        },
	        unit: {
	            type: DataTypes.STRING,
	        },
	        created_at: {
	            type: DataTypes.DATE,
	            allowNull: false
	        },
	        updated_at: DataTypes.DATE,
	        deleted_at: DataTypes.DATE
	    }, {
	        freezeTableName: true,
	        paranoid: false,
	        underscored: true
	    });
	    return QuoteLines;
	};
	//# sourceMappingURL=QuoteLines.Model.js.map

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var db = __webpack_require__(7);
	var user = {};
	user.postTo = function postUser(socket, body) {
	    db.users.update(body, {
	        where: {
	            id: body.id
	        }
	    }).then(function (updatedUser) {
	        socket.emit('post.user', updatedUser);
	    }, function (err) { return console.log(err); });
	};
	user.getAll = function getUsers(socket, body) {
	    db.users.findAll({
	        attributes: body.attributes
	    }).then(function (res) {
	        var temp = [];
	        for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
	            var values = res_1[_i];
	            temp.push(values.dataValues);
	        }
	        socket.emit('get.users', temp);
	    });
	};
	user.getByID = function getUserById(socket, body) {
	    db.users.findAll({
	        where: {
	            id: body.id
	        }
	    }).then(function (res) {
	        socket.emit('get.userById', res[0].dataValues);
	    });
	};
	// To Delete or NOT to Delete
	user.dropByID = function deleteUser(socket, req) {
	};
	module.exports = user;
	//# sourceMappingURL=user.workers.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=main.map
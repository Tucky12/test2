"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors = require("cors");
var typeorm_1 = require("typeorm");
var product_1 = require("./entity/product");
var app = express();
(0, typeorm_1.createConnection)().then(function (db) {
    var productRepository = db.getRepository(product_1.Product);
    //app will run on 8000, front end will run on 3000,8080,4200
    //if they run on different front-end ports, they will reject the request.
    // Therefore, to not prevent the request, add cors so that front-end can communicate with nodes
    app.use(cors({
        origin: ['http://localhost:3000,', 'http://localhost:8080', 'http://localhost:4200,']
    }));
    app.use(express.json());
    /*Get,find and show all the products from the repository.
    Select Get and key in http://localhost:8000/api/products/all
    */
    app.get('/api/products/all', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productRepository.find()];
                case 1:
                    products = _a.sent();
                    res.json(products);
                    return [2 /*return*/];
            }
        });
    }); });
    /* Update the product. The product variable will be updated based on the required body.
       Select Put and key in http://localhost:8000/api/products
     Select body -> raw -> Json and type in
     {
        "title":" new title",
        "image":"new img"}
        it will be updated.
    */
    app.put('/api/products/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var product, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productRepository.findOne(req.params.id)];
                case 1:
                    product = _a.sent();
                    productRepository.merge(product, req.body);
                    return [4 /*yield*/, productRepository.save(product)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, res.send(result)];
            }
        });
    }); });
    /*create a product. All the data that will be send in the product will be in this field
     Select post and key in http://localhost:8000/api/products
     Select body, raw. Json and type in
     {
        "title":"title",
        "image":"img"}
    */
    app.post('/api/products', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var product, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productRepository.create(req.body)];
                case 1:
                    product = _a.sent();
                    return [4 /*yield*/, productRepository.save(product)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, res.send(result)];
            }
        });
    }); });
    /* Retrieving single product based on ID. http://localhost:8000/api/products/1
     Select get and Change the value 1  */
    app.get('/api/products/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productRepository.findOne(req.params.id)];
                case 1:
                    product = _a.sent();
                    return [2 /*return*/, res.send(product)];
            }
        });
    }); });
    /* Delete the product. The product variable will be deleted.
        Select Delete and key in http://localhost:8000/api/products/1
    
    */
    app.delete('/api/products/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, productRepository.delete(req.params.id)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, res.send(result)];
            }
        });
    }); });
    console.log('Listening to port 8000 ');
    app.listen(8000);
});

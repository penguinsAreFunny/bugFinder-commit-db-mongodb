"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitsMongoDB = void 0;
/**
 * TODO: write generic MongoDB | should work, setMethods need to iterate over all prototype methods though
 */
var inversify_1 = require("inversify");
var bugfinder_localityrecorder_commit_1 = require("bugfinder-localityrecorder-commit");
var TYPES_1 = require("../TYPES");
var mongodb_1 = require("mongodb");
var bugfinder_framework_1 = require("bugfinder-framework");
var CommitsMongoDB = /** @class */ (function () {
    /**
     *
     * @param dbConfig
     */
    function CommitsMongoDB(dbConfig) {
        this.dbConfig = dbConfig;
    }
    /**
     * Reads CommitPaths from DB configured with mongoDBConfig while considering this.pathsHandling-configuration
     */
    CommitsMongoDB.prototype.readLocalities = function (fromID, skip, n) {
        return __awaiter(this, void 0, void 0, function () {
            var localities;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Reading localities from collection " + fromID + " using database " + this.dbConfig.dbName + " " +
                            ("from " + this.dbConfig.url + "..."));
                        return [4 /*yield*/, this.read(fromID, skip, n)];
                    case 1:
                        localities = _a.sent();
                        // apply prototype functions to DTO
                        localities.forEach(function (loc) {
                            _this.setMethods(loc);
                        });
                        console.log("Found " + localities.length + " localities in database");
                        return [2 /*return*/, localities];
                }
            });
        });
    };
    CommitsMongoDB.prototype.writeLocalities = function (localities, toID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Writing " + localities.length + " localities to collection " + toID + " into database...");
                        return [4 /*yield*/, this.writeMany(localities, toID)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommitsMongoDB.prototype.readAnnotations = function (fromID, skip, n) {
        return __awaiter(this, void 0, void 0, function () {
            var annotations, locMap;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Reading annotations from collection " + fromID + " using database " + this.dbConfig.dbName + " " +
                            ("from " + this.dbConfig.url + "..."));
                        return [4 /*yield*/, this.read(fromID, skip, n)];
                    case 1:
                        annotations = (_a.sent()).map(function (elem) {
                            var key = elem.key;
                            _this.setMethods(key);
                            return {
                                key: key,
                                val: elem.val
                            };
                        });
                        locMap = new bugfinder_framework_1.LocalityMap();
                        locMap.fromArray(annotations);
                        console.log("Found " + annotations.length + " annotations in database");
                        return [2 /*return*/, locMap];
                }
            });
        });
    };
    CommitsMongoDB.prototype.writeAnnotations = function (annotations, toID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Writing " + annotations.size() + " annotations to collection " + toID + " using database " +
                            (this.dbConfig.dbName + " from " + this.dbConfig.url + "..."));
                        return [4 /*yield*/, this.writeMany(annotations.toArray(), toID)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommitsMongoDB.prototype.readQuantifications = function (fromID, skip, n) {
        return __awaiter(this, void 0, void 0, function () {
            var quantifications, locMap;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Reading quantifications from collection " + fromID + " using database " + this.dbConfig.dbName + " " +
                            ("from " + this.dbConfig.url + "..."));
                        return [4 /*yield*/, this.read(fromID, skip, n)];
                    case 1:
                        quantifications = (_a.sent()).map(function (elem) {
                            var key = elem.key;
                            _this.setMethods(key);
                            return {
                                key: key,
                                val: elem.val
                            };
                        });
                        locMap = new bugfinder_framework_1.LocalityMap();
                        locMap.fromArray(quantifications);
                        console.log("Found " + quantifications.length + " annotations in database");
                        return [2 /*return*/, locMap];
                }
            });
        });
    };
    CommitsMongoDB.prototype.writeQuantifications = function (quantifications, toID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Writing " + quantifications.size() + " quantifications to collection " + toID + " using database " +
                            (this.dbConfig.dbName + " from " + this.dbConfig.url + "..."));
                        return [4 /*yield*/, this.writeMany(quantifications.toArray(), toID)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommitsMongoDB.prototype.readDataset = function (fromID) {
        return __awaiter(this, void 0, void 0, function () {
            var dataset;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.read(fromID)];
                    case 1:
                        dataset = (_a.sent())[0];
                        return [2 /*return*/, dataset[0]];
                }
            });
        });
    };
    CommitsMongoDB.prototype.writeDataset = function (toID, dataset) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.write(dataset, toID)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommitsMongoDB.prototype.read = function (fromID, skip, n) {
        return __awaiter(this, void 0, void 0, function () {
            var client, db, collectionName, collection, dbContent, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, mongodb_1.MongoClient.connect(this.dbConfig.url, { useUnifiedTopology: true })];
                    case 1:
                        client = _b.sent();
                        db = client.db(this.dbConfig.dbName);
                        collectionName = fromID;
                        collection = db.collection(collectionName);
                        if (!(skip == null && n == null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, collection.find({}).toArray()];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, collection.find({}).skip(skip).limit(n).toArray()
                        // @formatter:on
                    ];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        dbContent = _a;
                        // @formatter:on
                        return [4 /*yield*/, client.close()];
                    case 6:
                        // @formatter:on
                        _b.sent();
                        return [2 /*return*/, dbContent];
                }
            });
        });
    };
    CommitsMongoDB.prototype.write = function (obj, toID) {
        return __awaiter(this, void 0, void 0, function () {
            var elementsInCollection, err, client, db, collectionName, collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.read(toID)];
                    case 1:
                        elementsInCollection = _a.sent();
                        if (elementsInCollection.length > 0) {
                            err = new mongodb_1.MongoError("Found " + elementsInCollection.length + " elements in database collection " + toID + ".\n                Database collection commits should be empty! Aborting Writing to DB. Please delete all elements \n                in collection " + toID + " to prevent redundancy.");
                            throw (err);
                        }
                        return [4 /*yield*/, mongodb_1.MongoClient.connect(this.dbConfig.url, { useUnifiedTopology: true })];
                    case 2:
                        client = _a.sent();
                        db = client.db(this.dbConfig.dbName);
                        collectionName = toID;
                        collection = db.collection(collectionName);
                        // @formatter:on
                        obj["_id"] = undefined;
                        return [4 /*yield*/, collection.insertOne(obj)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, client.close()];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommitsMongoDB.prototype.writeMany = function (objs, toID) {
        return __awaiter(this, void 0, void 0, function () {
            var elementsInCollection, err, client, db, collectionName, collection, objs_1, objs_1_1, obj;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.read(toID)];
                    case 1:
                        elementsInCollection = _b.sent();
                        if (elementsInCollection.length > 0) {
                            err = new mongodb_1.MongoError("Found " + elementsInCollection.length + " elements in database collection " + toID + ".\n                Database collection commits should be empty! Aborting Writing to DB. Please delete all elements \n                in collection " + toID + " to prevent redundancy.");
                            throw (err);
                        }
                        return [4 /*yield*/, mongodb_1.MongoClient.connect(this.dbConfig.url, { useUnifiedTopology: true })];
                    case 2:
                        client = _b.sent();
                        db = client.db(this.dbConfig.dbName);
                        collectionName = toID;
                        collection = db.collection(collectionName);
                        try {
                            // @formatter:on
                            /**
                             * Cleanup _id-field as it will be generated as an unique identifier bei MongoDBMS
                             * After reading from DB _id-field might contain old
                             */
                            for (objs_1 = __values(objs), objs_1_1 = objs_1.next(); !objs_1_1.done; objs_1_1 = objs_1.next()) {
                                obj = objs_1_1.value;
                                obj["_id"] = undefined;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (objs_1_1 && !objs_1_1.done && (_a = objs_1.return)) _a.call(objs_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        return [4 /*yield*/, collection.insertMany(objs)];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, client.close()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set Methods to CommitPath-Objects as only DTOs are saved in database
     * @param commitPath
     * @private
     */
    CommitsMongoDB.prototype.setMethods = function (commit) {
        // TODO iterate over all method-attributes and set the right prototypes (generic) => if you add CommitPath Methods this
        // TODO function should still work finde
        // TODO: Problem: das sollte kein deep search sein. also CommitPath hat ein Attribut Commit, welches wiederum die Prototypen von Commit
        // TODO: beschrieben werden soll (Commit.is, Commit.key)
        var properties = Object.getOwnPropertyNames(bugfinder_localityrecorder_commit_1.Commit.prototype);
        var methods = properties.filter(function (property) {
            var descriptor = Object.getOwnPropertyDescriptor(bugfinder_localityrecorder_commit_1.Commit.prototype, property);
            return !descriptor ?
                false
                : typeof descriptor.value == "function" && property != "constructor" && !property.startsWith("__");
        });
        bugfinder_localityrecorder_commit_1.Commit.prototype.setMethods(commit);
    };
    CommitsMongoDB = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(TYPES_1.BUGFINDER_DB_COMMIT_MONGODB_TYPES.mongoDBConfig)),
        __metadata("design:paramtypes", [Object])
    ], CommitsMongoDB);
    return CommitsMongoDB;
}());
exports.CommitsMongoDB = CommitsMongoDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0c01vbmdvREIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9uZ29EQi9jb21taXRzTW9uZ29EQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsdUNBQTZDO0FBQzdDLHVGQUF5RDtBQUN6RCxrQ0FBMkQ7QUFFM0QsbUNBQWdEO0FBQ2hELDJEQUE2RDtBQUc3RDtJQUVJOzs7T0FHRztJQUNILHdCQUE0RSxRQUF1QjtRQUF2QixhQUFRLEdBQVIsUUFBUSxDQUFlO0lBQ25HLENBQUM7SUFFRDs7T0FFRztJQUNHLHVDQUFjLEdBQXBCLFVBQXFCLE1BQWMsRUFBRSxJQUFhLEVBQUUsQ0FBVTs7Ozs7Ozt3QkFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBc0MsTUFBTSx3QkFBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLE1BQUc7NkJBQzlGLFVBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQUssQ0FBQSxDQUFDLENBQUE7d0JBQ04scUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFBOzt3QkFBdkQsVUFBVSxHQUFhLFNBQWdDO3dCQUM3RCxtQ0FBbUM7d0JBQ25DLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHOzRCQUNsQixLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN6QixDQUFDLENBQUMsQ0FBQTt3QkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVMsVUFBVSxDQUFDLE1BQU0sNEJBQXlCLENBQUMsQ0FBQzt3QkFDakUsc0JBQU8sVUFBVSxFQUFDOzs7O0tBQ3JCO0lBRUssd0NBQWUsR0FBckIsVUFBc0IsVUFBb0IsRUFBRSxJQUFZOzs7Ozt3QkFDcEQsT0FBTyxDQUFDLEdB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
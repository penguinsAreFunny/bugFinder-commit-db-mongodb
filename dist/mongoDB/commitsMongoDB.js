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
var ts_logger_1 = require("ts-logger");
var CommitsMongoDB = /** @class */ (function () {
    /**
     *
     * @param logger
     * @param dbConfig
     */
    function CommitsMongoDB(logger, dbConfig) {
        this.logger = logger;
        this.dbConfig = dbConfig;
    }
    /**
     * Reads CommitPaths from DB configured with mongoDBConfig while considering this.pathsHandling-configuration
     */
    CommitsMongoDB.prototype.readLocalities = function (fromID, skip, n) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var localities;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("Reading localities from collection " + fromID + " using database " + this.dbConfig.dbName + " " +
                            ("from " + this.dbConfig.url + "..."));
                        return [4 /*yield*/, this.read(fromID, skip, n)];
                    case 1:
                        localities = _c.sent();
                        // apply prototype functions to DTO
                        localities.forEach(function (loc) {
                            _this.setMethods(loc);
                        });
                        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.info("Found " + localities.length + " localities in database");
                        return [2 /*return*/, localities];
                }
            });
        });
    };
    CommitsMongoDB.prototype.writeLocalities = function (localities, toID, mode) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("Writing " + localities.length + " localities to collection " + toID + " into database...");
                        return [4 /*yield*/, this.writeMany(localities, toID, mode)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommitsMongoDB.prototype.readAnnotations = function (fromID, skip, n) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var annotations, locMap;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("Reading annotations from collection " + fromID + " using database " + this.dbConfig.dbName + " " +
                            ("from " + this.dbConfig.url + "..."));
                        return [4 /*yield*/, this.read(fromID, skip, n)];
                    case 1:
                        annotations = (_c.sent()).map(function (elem) {
                            var key = elem.key;
                            _this.setMethods(key);
                            return {
                                key: key,
                                val: elem.val
                            };
                        });
                        locMap = new bugfinder_framework_1.LocalityMap();
                        locMap.fromArray(annotations);
                        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.info("Found " + annotations.length + " annotations in database");
                        return [2 /*return*/, locMap];
                }
            });
        });
    };
    CommitsMongoDB.prototype.writeAnnotations = function (annotations, toID, mode) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("Writing " + annotations.size() + " annotations to collection " + toID + " using database " +
                            (this.dbConfig.dbName + " from " + this.dbConfig.url + "..."));
                        return [4 /*yield*/, this.writeMany(annotations.toArray(), toID, mode)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommitsMongoDB.prototype.readQuantifications = function (fromID, skip, n) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var quantifications, locMap;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("Reading quantifications from collection " + fromID + " using database " + this.dbConfig.dbName + " " +
                            ("from " + this.dbConfig.url + "..."));
                        return [4 /*yield*/, this.read(fromID, skip, n)];
                    case 1:
                        quantifications = (_c.sent()).map(function (elem) {
                            var key = elem.key;
                            _this.setMethods(key);
                            return {
                                key: key,
                                val: elem.val
                            };
                        });
                        locMap = new bugfinder_framework_1.LocalityMap();
                        locMap.fromArray(quantifications);
                        (_b = this.logger) === null || _b === void 0 ? void 0 : _b.info("Found " + quantifications.length + " annotations in database");
                        return [2 /*return*/, locMap];
                }
            });
        });
    };
    CommitsMongoDB.prototype.writeQuantifications = function (quantifications, toID, mode) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        (_a = this.logger) === null || _a === void 0 ? void 0 : _a.info("Writing " + quantifications.size() + " quantifications to collection " + toID + " using database " +
                            (this.dbConfig.dbName + " from " + this.dbConfig.url + "..."));
                        return [4 /*yield*/, this.writeMany(quantifications.toArray(), toID, mode)];
                    case 1:
                        _b.sent();
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
    CommitsMongoDB.prototype.writeDataset = function (toID, dataset, mode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.write(dataset, toID, mode)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommitsMongoDB.prototype.readDatasetAP = function (fromID) {
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
    /**
     * Writes DatasetAP to DB at location (collection/table/file/...) toID. With mode = "a" data will be appended.
     * @param toID
     * @param dataset
     * @param mode
     */
    CommitsMongoDB.prototype.writeDatasetAP = function (toID, dataset, mode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.write(dataset, toID, mode)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommitsMongoDB.prototype.readDatasetAFE = function (fromID) {
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
    /**
     * Writes DatasetAFE to DB at location (collection/table/file/...) toID. With mode = "a" data will be appended.
     * @param toID
     * @param dataset
     * @param mdoe
     */
    CommitsMongoDB.prototype.writeDatasetAFE = function (toID, dataset, mode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.write(dataset, toID, mode)];
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
    CommitsMongoDB.prototype.write = function (obj, toID, mode) {
        return __awaiter(this, void 0, void 0, function () {
            var emptyCol, client, db, collectionName, collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (mode == null)
                            mode = "w";
                        if (!(mode != "a")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.empty(toID, true)];
                    case 1:
                        emptyCol = _a.sent();
                        if (emptyCol)
                            return [2 /*return*/];
                        _a.label = 2;
                    case 2: return [4 /*yield*/, mongodb_1.MongoClient.connect(this.dbConfig.url, { useUnifiedTopology: true })];
                    case 3:
                        client = _a.sent();
                        db = client.db(this.dbConfig.dbName);
                        collectionName = toID;
                        collection = db.collection(collectionName);
                        // @formatter:on
                        obj["_id"] = undefined;
                        return [4 /*yield*/, collection.insertOne(obj)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, client.close()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommitsMongoDB.prototype.writeMany = function (objs, toID, mode) {
        return __awaiter(this, void 0, void 0, function () {
            var emptyCol, client, db, collectionName, collection, objs_1, objs_1_1, obj;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (mode == null)
                            mode = "w";
                        if (!(mode != "a")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.empty(toID, true)];
                    case 1:
                        emptyCol = _b.sent();
                        if (emptyCol)
                            return [2 /*return*/];
                        _b.label = 2;
                    case 2: return [4 /*yield*/, mongodb_1.MongoClient.connect(this.dbConfig.url, { useUnifiedTopology: true })];
                    case 3:
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
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, client.close()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns true if collection is empty. Logs error if error is set to true
     * @param toID
     * @param error
     * @private
     */
    CommitsMongoDB.prototype.empty = function (toID, error) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var elementsInCollection, numberElInCol;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.read(toID)];
                    case 1:
                        elementsInCollection = _b.sent();
                        numberElInCol = elementsInCollection.length;
                        if (numberElInCol > 0) {
                            if (error) {
                                (_a = this.logger) === null || _a === void 0 ? void 0 : _a.error("Found " + numberElInCol + " elements in database collection " + toID + ".\n                Database collection commits should be empty! Aborting Writing to DB. Please delete all elements \n                in collection " + toID + " to prevent redundancy.");
                            }
                            return [2 /*return*/, false];
                        }
                        return [2 /*return*/, true];
                }
            });
        });
    };
    /**
     * Set Methods to CommitPath-Objects as only DTOs are saved in database
     * @param commit
     * @private
     */
    CommitsMongoDB.prototype.setMethods = function (commit) {
        var properties = Object.getOwnPropertyNames(bugfinder_localityrecorder_commit_1.Commit.prototype);
        var methods = properties.filter(function (property) {
            var descriptor = Object.getOwnPropertyDescriptor(bugfinder_localityrecorder_commit_1.Commit.prototype, property);
            return !descriptor ?
                false
                : typeof descriptor.value == "function" && property != "constructor" && !property.startsWith("__");
        });
        bugfinder_localityrecorder_commit_1.Commit.prototype.setMethods(commit);
    };
    var _a;
    CommitsMongoDB = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(TYPES_1.BUGFINDER_DB_COMMIT_MONGODB_TYPES.logger)),
        __param(1, (0, inversify_1.inject)(TYPES_1.BUGFINDER_DB_COMMIT_MONGODB_TYPES.mongoDBConfig)),
        __metadata("design:paramtypes", [typeof (_a = typeof ts_logger_1.Logger !== "undefined" && ts_logger_1.Logger) === "function" ? _a : Object, Object])
    ], CommitsMongoDB);
    return CommitsMongoDB;
}());
exports.CommitsMongoDB = CommitsMongoDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWl0c01vbmdvREIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9uZ29EQi9jb21taXRzTW9uZ29EQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztHQUVHO0FBQ0gsdUNBQTZDO0FBQzdDLHVGQUF5RDtBQUN6RCxrQ0FBMkQ7QUFFM0QsbUNBQW9DO0FBQ3BDLDJEQUErRjtBQUMvRix1Q0FBZ0M7QUFHaEM7SUFFSTs7OztPQUlHO0lBQ0gsd0JBQXNFLE1BQWMsRUFDUixRQUF1QjtRQUQ3QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ1IsYUFBUSxHQUFSLFFBQVEsQ0FBZTtJQUNuRyxDQUFDO0lBRUQ7O09BRUc7SUFDRyx1Q0FBYyxHQUFwQixVQUFxQixNQUFjLEVBQUUsSUFBYSxFQUFFLENBQVU7Ozs7Ozs7O3dCQUMxRCxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyx3Q0FBc0MsTUFBTSx3QkFBbUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLE1BQUc7NkJBQ3BHLFVBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFFBQUssQ0FBQSxDQUFDLENBQUE7d0JBQ04scUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFBOzt3QkFBdkQsVUFBVSxHQUFhLFNBQWdDO3dCQUM3RCxtQ0FBbUM7d0JBQ25DLFVBQVUsQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHOzRCQUNsQixLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN6QixDQUFDLENBQUMsQ0FBQTt3QkFDRixNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLElBQUksQ0FBQyxXQUFTLFVBQVUsQ0FBQyxNQUFNLDRCQUF5QixDQUFDLENBQUM7d0JBQ3ZFLHNCQUFP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
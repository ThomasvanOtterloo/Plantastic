/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/data-api/src/app/api-response.interceptor.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiResponseInterceptor = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const operators_1 = __webpack_require__("rxjs/operators");
let ApiResponseInterceptor = class ApiResponseInterceptor {
    intercept(context, next) {
        return next
            .handle()
            .pipe((0, operators_1.map)(results => {
            if (results) {
                return {
                    results,
                    info: {
                        version: '1.0',
                        type: results instanceof Array ? 'list' : 'object',
                        count: results instanceof Array ? results.length : 1,
                    }
                };
            }
            else {
                return {
                    results: undefined,
                    info: {
                        version: '1.0',
                        type: 'none',
                        count: 0,
                    }
                };
            }
        }));
    }
};
ApiResponseInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ApiResponseInterceptor);
exports.ApiResponseInterceptor = ApiResponseInterceptor;


/***/ }),

/***/ "./apps/data-api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const auth_module_1 = __webpack_require__("./apps/data-api/src/app/auth/auth.module.ts");
const token_middleware_1 = __webpack_require__("./apps/data-api/src/app/auth/token.middleware.ts");
const data_module_1 = __webpack_require__("./apps/data-api/src/app/data.module.ts");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(token_middleware_1.TokenMiddleware).forRoutes('data-api');
    }
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(
            // `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
            `mongodb://${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`),
            auth_module_1.AuthModule,
            data_module_1.DataModule,
            core_1.RouterModule.register([
                {
                    path: 'auth-api',
                    module: auth_module_1.AuthModule,
                },
                {
                    path: 'data-api',
                    module: data_module_1.DataModule,
                },
            ]),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/data-api/src/app/auth/auth.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const data_1 = __webpack_require__("./libs/data/src/index.ts");
const auth_service_1 = __webpack_require__("./apps/data-api/src/app/auth/auth.service.ts");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    register(credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('register', credentials);
            try {
                yield this.authService.registerUser(credentials.username, credentials.password);
                console.log('register succeeded');
                return {
                    id: yield this.authService.createUser(credentials.username),
                };
            }
            catch (e) {
                throw new common_1.HttpException('Username invalid' + e, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    login(credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('login inside controller', credentials);
            try {
                return yield this.authService.generateToken(credentials.username, credentials.password);
            }
            catch (e) {
                throw new common_1.HttpException('Invalid credentials:? ' + e, common_1.HttpStatus.UNAUTHORIZED);
            }
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof data_1.UserRegistration !== "undefined" && data_1.UserRegistration) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof data_1.UserRegistration !== "undefined" && data_1.UserRegistration) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthController.prototype, "login", null);
AuthController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);
exports.AuthController = AuthController;


/***/ }),

/***/ "./apps/data-api/src/app/auth/auth.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const auth_controller_1 = __webpack_require__("./apps/data-api/src/app/auth/auth.controller.ts");
const identity_schema_1 = __webpack_require__("./apps/data-api/src/app/auth/identity.schema.ts");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
const auth_service_1 = __webpack_require__("./apps/data-api/src/app/auth/auth.service.ts");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: identity_schema_1.Identity.name, schema: identity_schema_1.IdentitySchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema }
            ]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;


/***/ }),

/***/ "./apps/data-api/src/app/auth/auth.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const jsonwebtoken_1 = __webpack_require__("jsonwebtoken");
const bcrypt_1 = __webpack_require__("bcrypt");
const mongoose_1 = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const identity_schema_1 = __webpack_require__("./apps/data-api/src/app/auth/identity.schema.ts");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
let AuthService = class AuthService {
    constructor(identityModel, userModel) {
        this.identityModel = identityModel;
        this.userModel = userModel;
    }
    createUser(username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = new this.userModel({ username });
            yield user.save();
            return user.id;
        });
    }
    verifyToken(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET, (err, payload) => {
                    if (err)
                        reject(err);
                    else
                        resolve(payload);
                });
            });
        });
    }
    registerUser(username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const generatedHash = yield (0, bcrypt_1.hash)(password, parseInt(process.env.SALT_ROUNDS, 10));
            const identity = new this.identityModel({ username, hash: generatedHash });
            console.log('registerUser', identity);
            yield identity.save();
        });
    }
    generateToken(username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const identity = yield this.identityModel.findOne({ username });
            console.log('generateToken', identity);
            if (!identity || !(yield (0, bcrypt_1.compare)(password, identity.hash)))
                throw new Error("user not authorized");
            const user = yield this.userModel.findOne({ name: username });
            return new Promise((resolve, reject) => {
                (0, jsonwebtoken_1.sign)({ username, id: user.id }, process.env.JWT_SECRET, (err, token) => {
                    if (err)
                        reject(err);
                    else
                        resolve({ token: token, id: user.id, username: user.username, password: '', name: '' });
                });
            });
        });
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(identity_schema_1.Identity.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], AuthService);
exports.AuthService = AuthService;
/*
* {"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRob21hcyIsImlkIjoiYzY1MDYwYzUtNTE4NC00MzJiLWE1NWEtMGUwNjkyNmE1NDg2IiwiaWF0IjoxNjY5NzMwMjcyfQ.4HgW4vSfKvwDhsRAyf-QwioHfheEH9Ar9tD_b6WSAyc","id":"c65060c5-5184-432b-a55a-0e06926a5486","username":"thomas","password":"","name":""}
* */ 


/***/ }),

/***/ "./apps/data-api/src/app/auth/identity.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdentitySchema = exports.Identity = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let Identity = class Identity {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "username", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "hash", void 0);
Identity = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Identity);
exports.Identity = Identity;
exports.IdentitySchema = mongoose_1.SchemaFactory.createForClass(Identity);


/***/ }),

/***/ "./apps/data-api/src/app/auth/token.decorator.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InjectToken = void 0;
const common_1 = __webpack_require__("@nestjs/common");
exports.InjectToken = (0, common_1.createParamDecorator)((_data, ctx) => {
    const response = ctx.switchToHttp().getResponse();
    return response.locals.token;
});


/***/ }),

/***/ "./apps/data-api/src/app/auth/token.middleware.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenMiddleware = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const auth_service_1 = __webpack_require__("./apps/data-api/src/app/auth/auth.service.ts");
let TokenMiddleware = class TokenMiddleware {
    constructor(authService) {
        this.authService = authService;
    }
    use(req, res, next) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const authHeader = req.header('authorization');
            if (!authHeader) {
                throw new common_1.HttpException('No authorization header', common_1.HttpStatus.UNAUTHORIZED);
            }
            try {
                const token = yield this.authService.verifyToken(authHeader);
                res.locals.token = token;
            }
            catch (e) {
                throw new common_1.HttpException('Token invalid', common_1.HttpStatus.UNAUTHORIZED);
            }
            next();
        });
    }
};
TokenMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], TokenMiddleware);
exports.TokenMiddleware = TokenMiddleware;


/***/ }),

/***/ "./apps/data-api/src/app/data.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
// import { TopicController } from './topic/topic.controller';
// import { MeetupService } from './meetup/meetup.service';
// import { TopicService } from './topic/topic.service';
const product_service_1 = __webpack_require__("./apps/data-api/src/app/product/product.service.ts");
const user_service_1 = __webpack_require__("./apps/data-api/src/app/user/user.service.ts");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
// import { Topic, TopicSchema } from './topic/topic.schema';
// import { Meetup, MeetupSchema } from './meetup/meetup.schema';
const product_schema_1 = __webpack_require__("./apps/data-api/src/app/product/product.schema.ts");
const user_controller_1 = __webpack_require__("./apps/data-api/src/app/user/user.controller.ts");
const product_controller_1 = __webpack_require__("./apps/data-api/src/app/product/product.controller.ts");
const review_schema_1 = __webpack_require__("./apps/data-api/src/app/review/review.schema.ts");
const review_controller_1 = __webpack_require__("./apps/data-api/src/app/review/review.controller.ts");
const review_service_1 = __webpack_require__("./apps/data-api/src/app/review/review.service.ts");
const order_controller_1 = __webpack_require__("./apps/data-api/src/app/order/order.controller.ts");
const order_service_1 = __webpack_require__("./apps/data-api/src/app/order/order.service.ts");
const order_schema_1 = __webpack_require__("./apps/data-api/src/app/order/order.schema.ts");
const friend_schema_1 = __webpack_require__("./apps/data-api/src/app/friend/friend.schema.ts");
const friend_service_1 = __webpack_require__("./apps/data-api/src/app/friend/friend.service.ts");
const friend_controller_1 = __webpack_require__("./apps/data-api/src/app/friend/friend.controller.ts");
let DataModule = class DataModule {
};
DataModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: review_schema_1.Review.name, schema: review_schema_1.ReviewSchema },
                { name: order_schema_1.Order.name, schema: order_schema_1.OrderSchema },
                { name: friend_schema_1.Friend.name, schema: friend_schema_1.FriendSchema }
            ]),
        ],
        controllers: [
            user_controller_1.UserController,
            product_controller_1.ProductController,
            review_controller_1.ReviewController,
            order_controller_1.OrderController,
            friend_controller_1.FriendController
        ],
        providers: [
            user_service_1.UserService,
            product_service_1.ProductService,
            review_service_1.ReviewService,
            order_service_1.OrderService,
            friend_service_1.FriendService
        ],
    })
], DataModule);
exports.DataModule = DataModule;


/***/ }),

/***/ "./apps/data-api/src/app/friend/friend.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const token_decorator_1 = __webpack_require__("./apps/data-api/src/app/auth/token.decorator.ts");
const friend_service_1 = __webpack_require__("./apps/data-api/src/app/friend/friend.service.ts");
const friend_schema_1 = __webpack_require__("./apps/data-api/src/app/friend/friend.schema.ts");
let FriendController = class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }
    addFriends(token, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                // console.log('friendId: ', userId.userId + '<> token.id: ' + token.id);
                return this.friendService.addFriend(token.id, userId.userId);
            }
            catch (e) {
                console.log('DIDNT WORK', e);
                throw new common_1.HttpException('Error creating product >' + e, 500);
            }
        });
    }
    removeFriend(token, userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return this.friendService.removeFriend(token.id, userId);
            }
            catch (e) {
                console.log('DIDNT WORK', e);
                throw new common_1.HttpException('Error deleting friend >' + e, 500);
            }
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _b : Object, typeof (_c = typeof friend_schema_1.Friend !== "undefined" && friend_schema_1.Friend) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], FriendController.prototype, "addFriends", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _e : Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], FriendController.prototype, "removeFriend", null);
FriendController = tslib_1.__decorate([
    (0, common_1.Controller)('friend'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof friend_service_1.FriendService !== "undefined" && friend_service_1.FriendService) === "function" ? _a : Object])
], FriendController);
exports.FriendController = FriendController;


/***/ }),

/***/ "./apps/data-api/src/app/friend/friend.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendSchema = exports.Friend = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const uuid_1 = __webpack_require__("uuid");
let Friend = class Friend {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: uuid_1.v4, index: true }),
    tslib_1.__metadata("design:type", String)
], Friend.prototype, "id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], Friend.prototype, "userId", void 0);
Friend = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Friend);
exports.Friend = Friend;
exports.FriendSchema = mongoose_1.SchemaFactory.createForClass(Friend);


/***/ }),

/***/ "./apps/data-api/src/app/friend/friend.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FriendService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
const friend_schema_1 = __webpack_require__("./apps/data-api/src/app/friend/friend.schema.ts");
let FriendService = class FriendService {
    constructor(userModel, friendModel) {
        this.userModel = userModel;
        this.friendModel = friendModel;
    }
    addFriend(userId, friendId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.userModel.updateOne({ id: userId }, { $addToSet: { friends: { id: friendId } } });
            return this.userModel.findOne({
                id: userId,
            });
        });
    }
    removeFriend(userId, friendId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.userModel.updateOne({ id: userId }, { $pull: { friends: { id: friendId } } });
            return this.userModel.findOne({
                id: userId,
            });
        });
    }
};
FriendService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(friend_schema_1.Friend.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], FriendService);
exports.FriendService = FriendService;


/***/ }),

/***/ "./apps/data-api/src/app/order/order.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const token_decorator_1 = __webpack_require__("./apps/data-api/src/app/auth/token.decorator.ts");
const order_service_1 = __webpack_require__("./apps/data-api/src/app/order/order.service.ts");
const order_schema_1 = __webpack_require__("./apps/data-api/src/app/order/order.schema.ts");
let OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    getAll(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return yield this.orderService.getAll(token.id);
        });
    }
    create(token, order) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.orderService.create(order, token.id);
            }
            catch (e) {
                console.log('error', e);
                throw new common_1.HttpException('Error creating product >' + e, 500);
            }
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('self'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], OrderController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _d : Object, typeof (_e = typeof order_schema_1.Order !== "undefined" && order_schema_1.Order) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], OrderController.prototype, "create", null);
OrderController = tslib_1.__decorate([
    (0, common_1.Controller)('order'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof order_service_1.OrderService !== "undefined" && order_service_1.OrderService) === "function" ? _a : Object])
], OrderController);
exports.OrderController = OrderController;


/***/ }),

/***/ "./apps/data-api/src/app/order/order.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderSchema = exports.Order = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const uuid_1 = __webpack_require__("uuid");
let Order = class Order {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: uuid_1.v4, index: true }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: false,
    }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: false,
    }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "authorId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: false,
    }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "total", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Order.prototype, "deliverDate", void 0);
Order = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Order);
exports.Order = Order;
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);


/***/ }),

/***/ "./apps/data-api/src/app/order/order.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OrderService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
const product_schema_1 = __webpack_require__("./apps/data-api/src/app/product/product.schema.ts");
const order_schema_1 = __webpack_require__("./apps/data-api/src/app/order/order.schema.ts");
let OrderService = class OrderService {
    constructor(userModel, productModel, orderModel) {
        this.userModel = userModel;
        this.productModel = productModel;
        this.orderModel = orderModel;
    }
    getAll(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.orderModel.aggregate([{
                    $match: {
                        authorId: token,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        productId: { $first: '$productId' },
                        authorId: { $first: '$authorId' },
                        quantity: { $first: '$quantity' },
                        total: { $first: '$total' },
                        deliveryDate: { $first: '$deliveryDate' },
                    }
                }
            ]);
        });
    }
    getOne(orderId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const products = yield this.orderModel.aggregate([{
                    $match: {
                        orderId: orderId,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        productId: { $first: '$productId' },
                        authorId: { $first: '$authorId' },
                        quantity: { $first: '$quantity' },
                        total: { $first: '$total' },
                        deliveryDate: { $first: '$deliveryDate' },
                    }
                }
            ]);
            return products[0];
        });
    }
    create(order, authorId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.findOne({ id: order.productId });
            const author = yield this.userModel.findOne({ id: authorId });
            if (!author) {
                console.log(author);
                throw new Error('authorId not found');
            }
            if (!product) {
                console.log("product: " + product);
                throw new Error('productId not found');
            }
            const newOrder = new this.orderModel({
                productId: order.productId,
                authorId: authorId,
                quantity: order.quantity,
                total: product.price * order.quantity,
                deliverDate: new Date(),
            });
            author.orders.push(newOrder.id);
            yield Promise.all([author.save(), product.save(), newOrder.save()]);
            return newOrder;
        });
    }
};
OrderService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(product_schema_1.Product.name)),
    tslib_1.__param(2, (0, mongoose_2.InjectModel)(order_schema_1.Order.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _c : Object])
], OrderService);
exports.OrderService = OrderService;


/***/ }),

/***/ "./apps/data-api/src/app/product/product.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const data_1 = __webpack_require__("./libs/data/src/index.ts");
const token_decorator_1 = __webpack_require__("./apps/data-api/src/app/auth/token.decorator.ts");
const product_service_1 = __webpack_require__("./apps/data-api/src/app/product/product.service.ts");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productService.getAll();
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productService.getOne(id);
        });
    }
    create(token, product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productService.create(product, token.id);
            }
            catch (e) {
                console.log('error', e);
                throw new common_1.HttpException('Error creating product >' + e, 500);
            }
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ProductController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ProductController.prototype, "getOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _d : Object, typeof (_e = typeof data_1.Product !== "undefined" && data_1.Product) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ProductController.prototype, "create", null);
ProductController = tslib_1.__decorate([
    (0, common_1.Controller)('product'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);
exports.ProductController = ProductController;


/***/ }),

/***/ "./apps/data-api/src/app/product/product.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSchema = exports.Product = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const uuid_1 = __webpack_require__("uuid");
let Product = class Product {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: uuid_1.v4, index: true }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: false,
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: 0,
        validate: [rating => rating >= 0 && rating <= 10, 'Rating must be between 0 and 10'],
    }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "rating", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "price", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "author", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        default: 'https://static.vecteezy.com/system/resources/previews/002/425/076/non_2x/plant-leaves-in-a-pot-beautiful-green-houseplant-isolated-simple-trendy-flat-style-for-interior-garden-decoration-design-free-vector.jpg'
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "image", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "reviews", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Product.prototype, "category", void 0);
Product = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Product);
exports.Product = Product;
exports.ProductSchema = mongoose_1.SchemaFactory.createForClass(Product);


/***/ }),

/***/ "./apps/data-api/src/app/product/product.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const product_schema_1 = __webpack_require__("./apps/data-api/src/app/product/product.schema.ts");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
let ProductService = class ProductService {
    constructor(productModel, userModel) {
        this.productModel = productModel;
        this.userModel = userModel;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.productModel.aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: 'products',
                        foreignField: 'id',
                        as: 'products',
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        author: { $first: '$author' },
                        name: { $first: '$name' },
                        description: { $first: '$description' },
                        image: { $first: '$image' },
                        rating: { $avg: '$reviews.rating' },
                        quantity: { $first: '$quantity' },
                        price: { $first: '$price' },
                        reviews: { $first: '$reviews' },
                        category: { $first: '$category' },
                    }
                }
            ]);
        });
    }
    getOne(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const products = yield this.productModel.aggregate([
                {
                    $match: {
                        id: productId,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        author: { $first: '$author' },
                        name: { $first: '$name' },
                        description: { $first: '$description' },
                        image: { $first: '$image' },
                        rating: { $first: '$rating' },
                        quantity: { $first: '$quantity' },
                        price: { $first: '$price' },
                        reviews: { $first: '$reviews' },
                        category: { $first: '$category' },
                    }
                }
            ]);
            return products[0];
        });
    }
    create(product, authorId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const author = yield this.userModel.findOne({ id: authorId });
            if (!author) {
                throw new Error('AuthorId not found');
            }
            console.log('author works', author);
            const newProduct = new this.productModel({
                id: product.id,
                author: author.username,
                name: product.name,
                description: product.description,
                image: product.image,
                quantity: product.quantity,
                price: product.price,
                reviews: product.reviews,
                category: product.category
            });
            author.products.push(newProduct);
            yield Promise.all([newProduct.save(), author.save()]);
            return newProduct;
        });
    }
};
ProductService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(product_schema_1.Product.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], ProductService);
exports.ProductService = ProductService;


/***/ }),

/***/ "./apps/data-api/src/app/review/review.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const data_1 = __webpack_require__("./libs/data/src/index.ts");
const token_decorator_1 = __webpack_require__("./apps/data-api/src/app/auth/token.decorator.ts");
const review_service_1 = __webpack_require__("./apps/data-api/src/app/review/review.service.ts");
let ReviewController = class ReviewController {
    constructor(reviewService) {
        this.reviewService = reviewService;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reviewService.getAll();
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reviewService.getOne(id);
        });
    }
    create(token, productId, review) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                console.log('productid:>>>', productId);
                return yield this.reviewService.create(review, token.id, productId);
            }
            catch (e) {
                console.log('error', e);
                throw new common_1.HttpException('Error creating product >' + e, 500);
            }
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ReviewController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], ReviewController.prototype, "getOne", null);
tslib_1.__decorate([
    (0, common_1.Post)(':id'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _d : Object, String, typeof (_e = typeof data_1.Review !== "undefined" && data_1.Review) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], ReviewController.prototype, "create", null);
ReviewController = tslib_1.__decorate([
    (0, common_1.Controller)('review'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof review_service_1.ReviewService !== "undefined" && review_service_1.ReviewService) === "function" ? _a : Object])
], ReviewController);
exports.ReviewController = ReviewController;


/***/ }),

/***/ "./apps/data-api/src/app/review/review.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewSchema = exports.Review = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const uuid_1 = __webpack_require__("uuid");
let Review = class Review {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: uuid_1.v4, index: true }),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: false,
    }),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "productId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: false,
    }),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "authorId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: false,
    }),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "author", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: false,
    }),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "description", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: false,
        validate: [rating => rating >= 0 && rating <= 10, 'Rating must be between 0 and 10'],
    }),
    tslib_1.__metadata("design:type", Number)
], Review.prototype, "rating", void 0);
Review = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Review);
exports.Review = Review;
exports.ReviewSchema = mongoose_1.SchemaFactory.createForClass(Review);


/***/ }),

/***/ "./apps/data-api/src/app/review/review.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const review_schema_1 = __webpack_require__("./apps/data-api/src/app/review/review.schema.ts");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
const product_schema_1 = __webpack_require__("./apps/data-api/src/app/product/product.schema.ts");
let ReviewService = class ReviewService {
    constructor(reviewModel, userModel, productModel) {
        this.reviewModel = reviewModel;
        this.userModel = userModel;
        this.productModel = productModel;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reviewModel.aggregate([
                {
                    $lookup: {
                        from: 'reviews',
                        localField: 'reviews',
                        foreignField: 'id',
                        as: 'reviews',
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        productId: { $first: '$productId' },
                        author: { $first: '$author' },
                        description: { $first: '$description' },
                        rating: { $first: '$rating' },
                    }
                }
            ]);
        });
    }
    getOne(productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const products = yield this.reviewModel.aggregate([
                {
                    $match: {
                        id: productId,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        productId: { $first: '$productId' },
                        author: { $first: '$author' },
                        description: { $first: '$description' },
                        rating: { $first: '$rating' },
                    }
                }
            ]);
            return products[0];
        });
    }
    create(review, authorId, productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(productId);
            const product = yield this.productModel.findOne({ id: productId });
            const author = yield this.userModel.findOne({ id: authorId });
            if (!author) {
                console.log(author);
                throw new Error('authorId not found');
            }
            if (!product) {
                console.log("product: " + product);
                throw new Error('productId not found');
            }
            console.log("product: " + product);
            console.log("author: " + author);
            const newReview = new this.reviewModel({
                productId: productId,
                authorId: authorId,
                author: author.username,
                description: review.description,
                rating: review.rating,
            });
            console.log("newReview: " + newReview);
            author.reviews.push(newReview);
            product.reviews.push(newReview);
            yield Promise.all([newReview.save(), author.save(), product.save()]);
            return newReview;
        });
    }
};
ReviewService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(review_schema_1.Review.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    tslib_1.__param(2, (0, mongoose_2.InjectModel)(product_schema_1.Product.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _c : Object])
], ReviewService);
exports.ReviewService = ReviewService;


/***/ }),

/***/ "./apps/data-api/src/app/user/user.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const user_service_1 = __webpack_require__("./apps/data-api/src/app/user/user.service.ts");
const token_decorator_1 = __webpack_require__("./apps/data-api/src/app/auth/token.decorator.ts");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.getAll();
        });
    }
    // this method should precede the general getOne method, otherwise it never matches
    getSelf(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('token CurrentLogger:', token);
            return yield this.userService.getOne(token.id);
        });
    }
    getOne(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userService.getOne(id);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], UserController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Get)('self'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserController.prototype, "getSelf", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserController.prototype, "getOne", null);
UserController = tslib_1.__decorate([
    (0, common_1.Controller)('user'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], UserController);
exports.UserController = UserController;


/***/ }),

/***/ "./apps/data-api/src/app/user/user.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const uuid_1 = __webpack_require__("uuid");
let User = class User {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: uuid_1.v4, index: true }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: 500,
        unique: false,
    }),
    tslib_1.__metadata("design:type", Number)
], User.prototype, "wallet", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "friends", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "products", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "reviews", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "orders", void 0);
User = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),

/***/ "./apps/data-api/src/app/user/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userModel.aggregate([{
                    $lookup: {
                        from: 'meetups',
                        localField: 'meetups',
                        foreignField: '_id',
                        as: 'meetups',
                    }
                },
                { $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        username: { $first: '$username' },
                        wallet: { $first: '$wallet' },
                        products: { $push: '$products' },
                        reviews: { $push: '$reviews' },
                        friends: { $push: '$friends' }
                    },
                }]);
        });
    }
    getOne(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('model', this.userModel);
            const users = yield this.userModel.aggregate([{
                    $match: {
                        id: userId,
                    }
                },
                { $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        username: { $first: '$username' },
                        wallet: { $first: '$wallet' },
                        products: { $push: '$products' },
                        reviews: { $push: '$reviews' },
                        friends: { $push: '$friends' },
                        orders: { $push: '$orders' },
                    }
                }]);
            console.log('users', users);
            return users[0];
        });
    }
};
UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./libs/data/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/id.type.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/category.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/product.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/review.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/user.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/api-response.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/auth.interface.ts"), exports);


/***/ }),

/***/ "./libs/data/src/lib/api-response.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/data/src/lib/auth.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/data/src/lib/category.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/data/src/lib/id.type.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/data/src/lib/product.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/data/src/lib/review.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/data/src/lib/user.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/mongoose":
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),

/***/ "bcrypt":
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "jsonwebtoken":
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "rxjs/operators":
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "uuid":
/***/ ((module) => {

module.exports = require("uuid");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const api_response_interceptor_1 = __webpack_require__("./apps/data-api/src/app/api-response.interceptor.ts");
const app_module_1 = __webpack_require__("./apps/data-api/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.enableCors();
        // const globalPrefix = 'data-api';
        // app.setGlobalPrefix(globalPrefix);
        app.useGlobalInterceptors(new api_response_interceptor_1.ApiResponseInterceptor());
        const port = process.env.PORT || 3333;
        yield app.listen(port);
        common_1.Logger.log(`🚀 Data API is running on: ${yield app.getUrl()}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map
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
            console.log(username, password, identity);
            if (!identity || !(yield (0, bcrypt_1.compare)(password, identity.hash)))
                throw new Error("user not authorized");
            const user = yield this.userModel.findOne({ username: username });
            return new Promise((resolve, reject) => {
                (0, jsonwebtoken_1.sign)({ username, id: user.id }, process.env.JWT_SECRET, (err, token) => {
                    if (err)
                        reject(err);
                    else
                        resolve({ token: token, id: user.id, username: username, password: '' });
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
const follow_schema_1 = __webpack_require__("./apps/data-api/src/app/friend/follow.schema.ts");
const follow_service_1 = __webpack_require__("./apps/data-api/src/app/friend/follow.service.ts");
const follow_controller_1 = __webpack_require__("./apps/data-api/src/app/friend/follow.controller.ts");
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
                { name: follow_schema_1.Follow.name, schema: follow_schema_1.FollowSchema }
            ]),
        ],
        controllers: [
            user_controller_1.UserController,
            product_controller_1.ProductController,
            review_controller_1.ReviewController,
            order_controller_1.OrderController,
            follow_controller_1.FollowController
        ],
        providers: [
            user_service_1.UserService,
            product_service_1.ProductService,
            review_service_1.ReviewService,
            order_service_1.OrderService,
            follow_service_1.FollowService
        ],
    })
], DataModule);
exports.DataModule = DataModule;


/***/ }),

/***/ "./apps/data-api/src/app/friend/follow.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FollowController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const token_decorator_1 = __webpack_require__("./apps/data-api/src/app/auth/token.decorator.ts");
const follow_service_1 = __webpack_require__("./apps/data-api/src/app/friend/follow.service.ts");
const follow_schema_1 = __webpack_require__("./apps/data-api/src/app/friend/follow.schema.ts");
let FollowController = class FollowController {
    constructor(followService) {
        this.followService = followService;
    }
    CheckIfFollowed(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return this.followService.GetAllFollowers(token.id);
            }
            catch (e) {
                console.log('DIDNT WORK', e);
                throw new common_1.HttpException('Error deleting followed user >' + e, 500);
            }
        });
    }
    Follow(token, followingUser) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                console.log('FOLLOWING USER', followingUser);
                console.log('TOKEN ID', token);
                return this.followService.Follow(token.id, followingUser.username);
            }
            catch (e) {
                console.log('DIDNT WORK', e);
                throw new common_1.HttpException('Error creating product >' + e, 500);
            }
        });
    }
    Unfollow(token, username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return this.followService.Unfollow(token.id, username);
            }
            catch (e) {
                console.log('DIDNT WORK', e);
                throw new common_1.HttpException('Error deleting followed user >' + e, 500);
            }
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], FollowController.prototype, "CheckIfFollowed", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _d : Object, typeof (_e = typeof follow_schema_1.Follow !== "undefined" && follow_schema_1.Follow) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], FollowController.prototype, "Follow", null);
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _g : Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], FollowController.prototype, "Unfollow", null);
FollowController = tslib_1.__decorate([
    (0, common_1.Controller)('follow'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof follow_service_1.FollowService !== "undefined" && follow_service_1.FollowService) === "function" ? _a : Object])
], FollowController);
exports.FollowController = FollowController;


/***/ }),

/***/ "./apps/data-api/src/app/friend/follow.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FollowSchema = exports.Follow = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const uuid_1 = __webpack_require__("uuid");
let Follow = class Follow {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: uuid_1.v4, index: true }),
    tslib_1.__metadata("design:type", String)
], Follow.prototype, "id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], Follow.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
    }),
    tslib_1.__metadata("design:type", String)
], Follow.prototype, "username", void 0);
Follow = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Follow);
exports.Follow = Follow;
exports.FollowSchema = mongoose_1.SchemaFactory.createForClass(Follow);


/***/ }),

/***/ "./apps/data-api/src/app/friend/follow.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FollowService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
const follow_schema_1 = __webpack_require__("./apps/data-api/src/app/friend/follow.schema.ts");
let FollowService = class FollowService {
    constructor(userModel, followModel) {
        this.userModel = userModel;
        this.followModel = followModel;
    }
    Follow(tokenId, username) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findFollowingUser = yield this.userModel.aggregate([
                {
                    $match: {
                        username: username,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        username: { $first: '$username' },
                        // products: {$first: '$products'},
                    }
                }
            ]);
            yield Promise.all([
                yield this.userModel.updateOne({ id: tokenId }, { $push: { following: findFollowingUser } })
            ]);
            return this.userModel.aggregate([
                {
                    $match: {
                        id: tokenId,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        username: { $first: '$username' },
                        following: { $first: '$following' },
                    }
                }
            ]);
        });
    }
    Unfollow(userId, followingUsername) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findFollowingUser = yield this.userModel.aggregate([
                {
                    $match: {
                        username: followingUsername,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        username: { $first: '$username' },
                        // products: {$first: '$products'},
                    }
                }
            ]);
            yield Promise.all([
                yield this.userModel.updateOne({ id: userId }, { $pull: { following: findFollowingUser } })
            ]);
            return yield this.userModel.aggregate([
                {
                    $match: {
                        id: userId,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        username: { $first: '$username' },
                        following: { $first: '$following' },
                    }
                }
            ]);
        });
    }
    GetAllFollowers(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userModel.aggregate([
                {
                    $match: {
                        id: userId,
                    }
                },
                {
                    $group: {
                        _id: '$_id',
                        id: { $first: '$id' },
                        username: { $first: '$username' },
                        following: { $first: '$following' },
                    }
                }
            ]);
        });
    }
};
FollowService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(follow_schema_1.Follow.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], FollowService);
exports.FollowService = FollowService;


/***/ }),

/***/ "./apps/data-api/src/app/order/order.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
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
                return yield this.orderService.create(order, token);
            }
            catch (e) {
                console.log('error', e);
                throw new common_1.HttpException('Error creating product >' + e, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    delete(token, orderId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.orderService.delete(orderId, token);
            }
            catch (e) {
                console.log('error', e);
                throw new common_1.HttpException('Error creating product >' + e, common_1.HttpStatus.BAD_REQUEST);
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
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Param)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _g : Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], OrderController.prototype, "delete", null);
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
    (0, mongoose_1.Prop)({
        required: false,
        unique: false,
    }),
    tslib_1.__metadata("design:type", Number)
], Order.prototype, "total", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Order.prototype, "deliveryDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        unique: false,
    }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "productImage", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: false,
        unique: false,
    }),
    tslib_1.__metadata("design:type", String)
], Order.prototype, "productName", void 0);
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
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'productId',
                        foreignField: 'id',
                        as: 'product',
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
    create(order, token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.findOne({ id: order.productId });
            const author = yield this.userModel.findOne({ id: token.id });
            if (product && author) {
                const newOrder = new this.orderModel({
                    authorId: token.id,
                    productId: order.productId,
                    quantity: order.quantity,
                    total: order.quantity * product.price,
                    productPrice: product.price,
                    deliveryDate: new Date().setDate(new Date().getDate() + 7),
                });
                console.log('newOrder', newOrder.deliveryDate.toLocaleString());
                author.orders.push(newOrder);
                const updateUser = yield this.userModel.findOneAndUpdate({ id: token.id }, { $set: {
                        orders: author.orders,
                        wallet: author.wallet - newOrder.total,
                    } });
                const updateProduct = yield this.productModel.findOneAndUpdate({ id: order.productId }, { $set: {
                        quantity: product.quantity - order.quantity,
                    } });
                yield Promise.all([updateUser, updateProduct]);
                return newOrder.save();
            }
        });
    }
    delete(orderId, token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const order = yield this.orderModel.findOne({ id: orderId });
            if (order.authorId === token.id) {
                const product = yield this.productModel.findOne({ id: order.productId });
                const author = yield this.userModel.findOne({ id: token.id });
                if (product && author) {
                    const updateUser = yield this.userModel.findOneAndUpdate({ id: token.id }, { $set: {
                            wallet: author.wallet + order.total,
                        } });
                    const updateProduct = yield this.productModel.findOneAndUpdate({ id: order.productId }, { $set: {
                            quantity: product.quantity + order.quantity,
                        } });
                    yield Promise.all([updateUser, updateProduct]);
                    return this.orderModel.findOneAndDelete({ id: orderId
                    });
                }
            }
            else {
                throw new Error('You can not delete this order');
            }
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


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
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
            if (product.image === '') {
                product.image = 'https://static.vecteezy.com/system/resources/previews/002/425/076/non_2x/plant-leaves-in-a-pot-beautiful-green-houseplant-isolated-simple-trendy-flat-style-for-interior-garden-decoration-design-free-vector.jpg';
            }
            try {
                return yield this.productService.create(product, token);
            }
            catch (e) {
                console.log('error', e);
                throw new common_1.HttpException('Error creating product >' + e, 500);
            }
        });
    }
    delete(token, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.productService.delete(id, token);
            return null;
        });
    }
    update(token, id, product) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productService.update(id, product, token);
            }
            catch (e) {
                console.log('error', e);
                throw new common_1.HttpException('Error updating product >' + e, common_1.HttpStatus.BAD_REQUEST);
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
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _g : Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ProductController.prototype, "delete", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_j = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _j : Object, String, typeof (_k = typeof data_1.Product !== "undefined" && data_1.Product) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ProductController.prototype, "update", null);
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
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Product.prototype, "authorId", void 0);
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
                        quantity: { $first: '$quantity' },
                        price: { $first: '$price' },
                        reviews: { $first: '$reviews' },
                        category: { $first: '$category' },
                    },
                },
                {
                    $addFields: {
                        rating: {
                            rating: { $avg: '$reviews.rating' },
                        }
                    }
                }
            ]);
        });
    }
    delete(productId, token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('productId', productId);
            const product = yield this.productModel.findOne({ id: productId });
            if (!product) {
                throw new Error('Product not found');
            }
            if (product.authorId !== token.id) {
                throw new Error('You are not allowed to delete this product');
            }
            yield this.productModel.deleteOne({ id: productId });
            yield this.userModel.updateMany({}, {
                $pull: {
                    products: {
                        id: productId,
                    },
                },
            }, { multi: true });
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
                        authorId: { $first: '$authorId' },
                        name: { $first: '$name' },
                        description: { $first: '$description' },
                        image: { $first: '$image' },
                        quantity: { $first: '$quantity' },
                        price: { $first: '$price' },
                        reviews: { $first: '$reviews' },
                        category: { $first: '$category' },
                    }
                },
                {
                    $addFields: {
                        rating: {
                            rating: { $avg: '$reviews.rating' },
                        }
                    }
                }
            ]);
            return products[0];
        });
    }
    create(product, token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(product);
            const author = yield this.userModel.findOne({ username: token.username });
            if (!author) {
                throw new Error('AuthorId not found');
            }
            if (product.price < 1) {
                throw new Error('Price must be greater than 1');
            }
            if (product.quantity < 2) {
                throw new Error('Quantity must be greater than 2');
            }
            if (product.category.length < 1) {
                throw new Error('Category must be greater than 1');
            }
            if (product.name.length < 1) {
                throw new Error('Name must be greater than 1');
            }
            if (product.description.length < 1) {
                throw new Error('Description must be greater than 1');
            }
            console.log('author works', author);
            const newProduct = new this.productModel({
                author: author.username,
                authorId: author.id,
                name: product.name,
                description: product.description,
                image: product.image,
                quantity: product.quantity,
                price: product.price,
                category: product.category,
            });
            const addProductToUser = yield this.userModel.findOneAndUpdate({ username: token.username }, {
                $push: {
                    products: {
                        id: newProduct.id,
                        name: newProduct.name,
                        description: newProduct.description,
                        image: newProduct.image,
                        quantity: newProduct.quantity,
                        price: newProduct.price,
                        category: newProduct.category,
                    },
                },
            }, { new: true });
            yield Promise.all([newProduct.save(), addProductToUser.save()]);
            return newProduct;
        });
    }
    update(productId, product, token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (product.authorId !== token.id) {
                throw new Error('You are not allowed to update this product');
            }
            if (product.price < 1) {
                throw new Error('Price must be greater than 1');
            }
            if (product.quantity < 2) {
                throw new Error('Quantity must be greater than 2');
            }
            if (product.category.length < 1) {
                throw new Error('Category must be greater than 1');
            }
            if (product.name.length < 1) {
                throw new Error('Name must be greater than 1 character');
            }
            const updatedProduct = yield this.productModel.findOneAndUpdate({ id: productId }, Object.assign({}, product), { new: true });
            const updatedAuthor = yield this.userModel.findOneAndUpdate({ username: updatedProduct.author }, {
                $set: {
                    'products.$[elem].name': updatedProduct.name,
                    'products.$[elem].description': updatedProduct.description,
                    'products.$[elem].image': updatedProduct.image,
                    'products.$[elem].quantity': updatedProduct.quantity,
                    'products.$[elem].price': updatedProduct.price,
                    'products.$[elem].category': updatedProduct.category,
                }
            }, {
                arrayFilters: [
                    { 'elem.id': productId }
                ],
                new: true
            });
            return updatedProduct;
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


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
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
                return yield this.reviewService.create(review, token, productId);
            }
            catch (e) {
                console.log('error', e);
                throw new common_1.HttpException('Error creating product >' + e, 500);
            }
        });
    }
    delete(token, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.reviewService.delete(token, id);
        });
    }
    update(id, review) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('adasdasd', review);
            return this.reviewService.update(id, review);
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
tslib_1.__decorate([
    (0, common_1.Delete)(':id'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _g : Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ReviewController.prototype, "delete", null);
tslib_1.__decorate([
    (0, common_1.Patch)(':id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_j = typeof data_1.Review !== "undefined" && data_1.Review) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], ReviewController.prototype, "update", null);
ReviewController = tslib_1.__decorate([
    (0, common_1.Controller)('review'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof review_service_1.ReviewService !== "undefined" && review_service_1.ReviewService) === "function" ? _a : Object])
], ReviewController);
exports.ReviewController = ReviewController;


/***/ }),

/***/ "./apps/data-api/src/app/review/review.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
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
        default: Date.now
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Review.prototype, "datetime", void 0);
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
        default: 0,
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
    delete(token, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const findUserWithReview = yield this.userModel.findOne({ id: token.id, reviews: { $elemMatch: { id: id } } });
            if (!findUserWithReview) {
                throw new Error(`Review with id ${id} not found`);
            }
            yield Promise.all([
                this.userModel.updateMany({ username: token.username }, { $pull: { reviews: { id: id } } }),
                this.productModel.updateMany({}, { $pull: { reviews: { id: id } } }),
                this.reviewModel.deleteOne({ id: id }),
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
    create(review, author, productId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(review);
            review.authorId = author.id;
            review.author = author.username;
            review.productId = productId;
            if (review.rating > 10 || review.rating < 0 || review.rating % 1 !== 0) {
                throw new common_1.NotFoundException(`Rating must be between 0 and 10`);
            }
            if (review.description === '') {
                throw new common_1.NotFoundException(`Description must not be empty`);
            }
            const newReview = new this.reviewModel(Object.assign({}, review));
            const createdReview = yield this.userModel.findOneAndUpdate({ id: author.id }, { $push: { reviews: newReview } });
            const createdReview2 = yield this.productModel.findOneAndUpdate({ id: productId }, { $push: { reviews: newReview } });
            yield Promise.all([createdReview, createdReview2, newReview]);
            return createdReview;
        });
    }
    update(id, review) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const updatedReview = yield this.reviewModel.findOneAndUpdate({
                id: id,
            }, Object.assign({}, review), {
                new: true,
            });
            const updatedReview2 = yield this.userModel.findOneAndUpdate({
                id: review.authorId,
            }, {
                $set: {
                    'reviews.$[elem].description': review.description,
                    'reviews.$[elem].rating': review.rating,
                }
            }, {
                arrayFilters: [{
                        'elem.id': id,
                    }],
                new: true,
            });
            const updatedReview3 = yield this.productModel.findOneAndUpdate({
                id: review.productId,
            }, {
                $set: {
                    'reviews.$[elem].description': review.description,
                    'reviews.$[elem].rating': review.rating,
                }
            }, {
                arrayFilters: [{
                        'elem.id': id,
                    }],
                new: true,
            });
            yield Promise.all([updatedReview, updatedReview2, updatedReview3]);
            return updatedReview;
        });
    }
    formatReviewDate(date) {
        return date.toLocaleString('en-us', { month: 'short', year: 'numeric', day: 'numeric' });
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
], User.prototype, "following", void 0);
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
                        products: { $first: '$products' },
                        reviews: { $first: '$reviews' },
                        following: { $first: '$following' },
                        orders: { $first: '$orders' },
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
                        products: { $first: '$products' },
                        reviews: { $first: '$reviews' },
                        following: { $first: '$following' },
                        orders: { $first: '$orders' },
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
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/order.interface.ts"), exports);


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

/***/ "./libs/data/src/lib/order.interface.ts":
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
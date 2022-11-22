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
            try {
                yield this.authService.registerUser(credentials.username, credentials.password, credentials.emailAddress);
                return {
                    id: yield this.authService.createUser(credentials.username, credentials.emailAddress),
                };
            }
            catch (e) {
                throw new common_1.HttpException('Username invalid', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    login(credentials) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return {
                    token: yield this.authService.generateToken(credentials.username, credentials.password)
                };
            }
            catch (e) {
                throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
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
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof data_1.UserCredentials !== "undefined" && data_1.UserCredentials) === "function" ? _d : Object]),
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
    createUser(name, emailAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = new this.userModel({ name, emailAddress });
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
    registerUser(username, password, emailAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const generatedHash = yield (0, bcrypt_1.hash)(password, parseInt(process.env.SALT_ROUNDS, 10));
            const identity = new this.identityModel({ username, hash: generatedHash, emailAddress });
            yield identity.save();
        });
    }
    generateToken(username, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const identity = yield this.identityModel.findOne({ username });
            if (!identity || !(yield (0, bcrypt_1.compare)(password, identity.hash)))
                throw new Error("user not authorized");
            const user = yield this.userModel.findOne({ name: username });
            return new Promise((resolve, reject) => {
                (0, jsonwebtoken_1.sign)({ username, id: user.id }, process.env.JWT_SECRET, (err, token) => {
                    if (err)
                        reject(err);
                    else
                        resolve(token);
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


/***/ }),

/***/ "./apps/data-api/src/app/auth/identity.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.IdentitySchema = exports.Identity = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const isEmail_1 = tslib_1.__importDefault(__webpack_require__("validator/lib/isEmail"));
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
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        unique: true,
        validate: {
            validator: isEmail_1.default,
            message: 'should be a valid email address',
        }
    }),
    tslib_1.__metadata("design:type", String)
], Identity.prototype, "emailAddress", void 0);
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
const topic_controller_1 = __webpack_require__("./apps/data-api/src/app/topic/topic.controller.ts");
const meetup_service_1 = __webpack_require__("./apps/data-api/src/app/meetup/meetup.service.ts");
const topic_service_1 = __webpack_require__("./apps/data-api/src/app/topic/topic.service.ts");
const user_service_1 = __webpack_require__("./apps/data-api/src/app/user/user.service.ts");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
const topic_schema_1 = __webpack_require__("./apps/data-api/src/app/topic/topic.schema.ts");
const meetup_schema_1 = __webpack_require__("./apps/data-api/src/app/meetup/meetup.schema.ts");
const user_controller_1 = __webpack_require__("./apps/data-api/src/app/user/user.controller.ts");
const meetup_controller_1 = __webpack_require__("./apps/data-api/src/app/meetup/meetup.controller.ts");
let DataModule = class DataModule {
};
DataModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: topic_schema_1.Topic.name, schema: topic_schema_1.TopicSchema },
                { name: meetup_schema_1.Meetup.name, schema: meetup_schema_1.MeetupSchema }
            ]),
        ],
        controllers: [
            meetup_controller_1.MeetupController,
            topic_controller_1.TopicController,
            user_controller_1.UserController,
        ],
        providers: [
            user_service_1.UserService,
            topic_service_1.TopicService,
            meetup_service_1.MeetupService,
        ],
    })
], DataModule);
exports.DataModule = DataModule;


/***/ }),

/***/ "./apps/data-api/src/app/meetup/meetup.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetupController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const meetup_service_1 = __webpack_require__("./apps/data-api/src/app/meetup/meetup.service.ts");
const data_1 = __webpack_require__("./libs/data/src/index.ts");
const token_decorator_1 = __webpack_require__("./apps/data-api/src/app/auth/token.decorator.ts");
let MeetupController = class MeetupController {
    constructor(meetupService) {
        this.meetupService = meetupService;
    }
    getInvites(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.meetupService.getInvites(token.id);
        });
    }
    getMeetups(token) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.meetupService.getAll(token.id);
        });
    }
    getMeetup(token, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.meetupService.getOne(token.id, id);
        });
    }
    create(token, meetup) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.meetupService.create(meetup.topic, meetup.datetime, meetup.tutorId, token.id);
            }
            catch (e) {
                throw new common_1.HttpException('invalid meetup', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    acceptInvite(token, id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.meetupService.acceptInvite(token.id, id);
            }
            catch (e) {
                throw new common_1.HttpException('invalid invite accept', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    postReview(token, id, review) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.meetupService.postReview(token.id, id, review.text, review.rating);
            }
            catch (e) {
                throw new common_1.HttpException('invalid review', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('invite'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], MeetupController.prototype, "getInvites", null);
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], MeetupController.prototype, "getMeetups", null);
tslib_1.__decorate([
    (0, common_1.Get)(':id'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _f : Object, String]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], MeetupController.prototype, "getMeetup", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _h : Object, typeof (_j = typeof data_1.MeetupCreation !== "undefined" && data_1.MeetupCreation) === "function" ? _j : Object]),
    tslib_1.__metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], MeetupController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Post)('/:id/accept'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _l : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], MeetupController.prototype, "acceptInvite", null);
tslib_1.__decorate([
    (0, common_1.Post)('/:id/review'),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__param(2, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _m : Object, String, typeof (_o = typeof data_1.Review !== "undefined" && data_1.Review) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], MeetupController.prototype, "postReview", null);
MeetupController = tslib_1.__decorate([
    (0, common_1.Controller)('meetup'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof meetup_service_1.MeetupService !== "undefined" && meetup_service_1.MeetupService) === "function" ? _a : Object])
], MeetupController);
exports.MeetupController = MeetupController;


/***/ }),

/***/ "./apps/data-api/src/app/meetup/meetup.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetupSchema = exports.Meetup = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const mongoose_2 = __webpack_require__("mongoose");
const uuid_1 = __webpack_require__("uuid");
const review_schema_1 = __webpack_require__("./apps/data-api/src/app/meetup/review.schema.ts");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
const data_1 = __webpack_require__("./libs/data/src/index.ts");
let Meetup = class Meetup {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: uuid_1.v4 }),
    tslib_1.__metadata("design:type", String)
], Meetup.prototype, "id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", String)
], Meetup.prototype, "topic", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Meetup.prototype, "datetime", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: review_schema_1.ReviewSchema }),
    tslib_1.__metadata("design:type", typeof (_b = typeof review_schema_1.Review !== "undefined" && review_schema_1.Review) === "function" ? _b : Object)
], Meetup.prototype, "review", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    tslib_1.__metadata("design:type", Boolean)
], Meetup.prototype, "accepted", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.Schema.Types.ObjectId,
        // cannot use User.name here, as it leads to a circular dependency
        ref: 'User',
    }),
    tslib_1.__metadata("design:type", typeof (_c = typeof user_schema_1.User !== "undefined" && user_schema_1.User) === "function" ? _c : Object)
], Meetup.prototype, "tutorRef", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, type: { id: String, name: String } }),
    tslib_1.__metadata("design:type", typeof (_d = typeof data_1.UserIdentity !== "undefined" && data_1.UserIdentity) === "function" ? _d : Object)
], Meetup.prototype, "tutor", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: mongoose_2.Schema.Types.ObjectId,
        // cannot use User.name here, as it leads to a circular dependency
        ref: 'User',
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof user_schema_1.User !== "undefined" && user_schema_1.User) === "function" ? _e : Object)
], Meetup.prototype, "pupilRef", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, type: { id: String, name: String } }),
    tslib_1.__metadata("design:type", typeof (_f = typeof data_1.UserIdentity !== "undefined" && data_1.UserIdentity) === "function" ? _f : Object)
], Meetup.prototype, "pupil", void 0);
Meetup = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Meetup);
exports.Meetup = Meetup;
exports.MeetupSchema = mongoose_1.SchemaFactory.createForClass(Meetup);


/***/ }),

/***/ "./apps/data-api/src/app/meetup/meetup.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MeetupService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const meetup_schema_1 = __webpack_require__("./apps/data-api/src/app/meetup/meetup.schema.ts");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
const topic_service_1 = __webpack_require__("./apps/data-api/src/app/topic/topic.service.ts");
let MeetupService = class MeetupService {
    constructor(meetupModel, userModel, topicService) {
        this.meetupModel = meetupModel;
        this.userModel = userModel;
        this.topicService = topicService;
    }
    getInvites(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ id: userId });
            if (user == null)
                return [];
            return this.meetupModel
                .find({ tutorRef: user._id, accepted: false }, { _id: 0, __v: 0, tutorRef: 0, pupilRef: 0, 'tutor._id': 0, 'pupil._id': 0 });
        });
    }
    create(topic, datetime, tutorUserId, pupilUserId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // await this.topicService.ensureExists(topic);
            const tutor = yield this.userModel.findOne({ id: tutorUserId });
            const pupil = yield this.userModel.findOne({ id: pupilUserId });
            if (!tutor || !pupil) {
                throw new Error('user not found');
            }
            if (!tutor.tutorTopics.find(t => t == topic) || !pupil.pupilTopics.find(t => t == topic)) {
                throw new Error('invalid meetup');
            }
            const meetup = new this.meetupModel({
                datetime,
                topic,
                tutorRef: tutor._id,
                pupilRef: pupil._id,
                tutor: { id: tutor.id, name: tutor.name },
                pupil: { id: pupil.id, name: pupil.name },
            });
            tutor.meetups.push(meetup);
            pupil.meetups.push(meetup);
            yield Promise.all([meetup.save(), tutor.save(), pupil.save()]);
            return { id: meetup.id };
        });
    }
    getAll(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ id: userId });
            if (user == null)
                return [];
            return this.meetupModel
                .find({ $or: [{ tutorRef: user._id, accepted: true }, { pupilRef: user._id }] }, { _id: 0, __v: 0, "review._id": 0, "review.__v": 0, tutorRef: 0, pupilRef: 0, 'tutor._id': 0, 'pupil._id': 0 });
            // .populate('tutorRef', {id: 1, name: 1, _id: 0})
            // .populate('pupilRef', {id: 1, name: 1, _id: 0});
        });
    }
    getOne(userId, meetupId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ id: userId });
            if (user == null)
                return null;
            return this.meetupModel
                .findOne({ $and: [{ id: meetupId }, { $or: [{ tutorRef: user._id }, { pupilRef: user._id }] }] }, { _id: 0, __v: 0, "review._id": 0, "review.__v": 0, tutorRef: 0, pupilRef: 0, 'tutor._id': 0, 'pupil._id': 0 });
        });
    }
    acceptInvite(userId, meetupId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ id: userId });
            const result = yield this.meetupModel.updateOne({ id: meetupId, tutorRef: user._id }, { accepted: true });
            if (result.modifiedCount == 0) {
                throw new Error('not accepted');
            }
        });
    }
    postReview(userId, meetupId, text, rating) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const meetup = yield this.meetupModel.findOne({ id: meetupId }).populate('pupilRef');
            if (meetup.pupilRef.id != userId)
                throw new Error('user not authorized');
            if (meetup.review)
                throw new Error('already reviewed');
            meetup.review = { text, rating };
            yield meetup.save();
        });
    }
};
MeetupService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(meetup_schema_1.Meetup.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object, typeof (_c = typeof topic_service_1.TopicService !== "undefined" && topic_service_1.TopicService) === "function" ? _c : Object])
], MeetupService);
exports.MeetupService = MeetupService;


/***/ }),

/***/ "./apps/data-api/src/app/meetup/review.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReviewSchema = exports.Review = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
let Review = class Review {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    tslib_1.__metadata("design:type", String)
], Review.prototype, "text", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        validate: {
            validator: (v) => Number.isInteger(v) && 1 <= v && v <= 5,
            message: 'rating should be 1, 2, 3, 4 or 5',
        }
    }),
    tslib_1.__metadata("design:type", Number)
], Review.prototype, "rating", void 0);
Review = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Review);
exports.Review = Review;
exports.ReviewSchema = mongoose_1.SchemaFactory.createForClass(Review);


/***/ }),

/***/ "./apps/data-api/src/app/topic/topic.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopicController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const topic_service_1 = __webpack_require__("./apps/data-api/src/app/topic/topic.service.ts");
const data_1 = __webpack_require__("./libs/data/src/index.ts");
const token_decorator_1 = __webpack_require__("./apps/data-api/src/app/auth/token.decorator.ts");
let TopicController = class TopicController {
    constructor(topicService) {
        this.topicService = topicService;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.topicService.getAll();
        });
    }
    addTopic(token, topicUpdate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.topicService.addTopic(token.id, topicUpdate.title, topicUpdate.role);
        });
    }
    removeTopic(token, topicUpdate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.topicService.removeTopic(token.id, topicUpdate.title, topicUpdate.role);
        });
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], TopicController.prototype, "getAll", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _c : Object, typeof (_d = typeof data_1.TopicUpdate !== "undefined" && data_1.TopicUpdate) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TopicController.prototype, "addTopic", null);
tslib_1.__decorate([
    (0, common_1.Delete)(),
    tslib_1.__param(0, (0, token_decorator_1.InjectToken)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof token_decorator_1.Token !== "undefined" && token_decorator_1.Token) === "function" ? _e : Object, typeof (_f = typeof data_1.TopicUpdate !== "undefined" && data_1.TopicUpdate) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TopicController.prototype, "removeTopic", null);
TopicController = tslib_1.__decorate([
    (0, common_1.Controller)('topic'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof topic_service_1.TopicService !== "undefined" && topic_service_1.TopicService) === "function" ? _a : Object])
], TopicController);
exports.TopicController = TopicController;


/***/ }),

/***/ "./apps/data-api/src/app/topic/topic.schema.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopicSchema = exports.Topic = void 0;
const tslib_1 = __webpack_require__("tslib");
const mongoose_1 = __webpack_require__("@nestjs/mongoose");
const uuid_1 = __webpack_require__("uuid");
let Topic = class Topic {
};
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: uuid_1.v4, index: true }),
    tslib_1.__metadata("design:type", String)
], Topic.prototype, "id", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ required: true, unique: true }),
    tslib_1.__metadata("design:type", String)
], Topic.prototype, "title", void 0);
Topic = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Topic);
exports.Topic = Topic;
exports.TopicSchema = mongoose_1.SchemaFactory.createForClass(Topic);


/***/ }),

/***/ "./apps/data-api/src/app/topic/topic.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TopicService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const topic_schema_1 = __webpack_require__("./apps/data-api/src/app/topic/topic.schema.ts");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
let TopicService = class TopicService {
    constructor(topicModel, userModel) {
        this.topicModel = topicModel;
        this.userModel = userModel;
    }
    ensureExists(topic) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                yield this.topicModel.create({ title: topic });
                // eslint-disable-next-line no-empty
            }
            catch (e) { }
        });
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.topicModel.find({}, { _id: 0, __v: 0 });
        });
    }
    addTopic(userId, topic, role) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield this.ensureExists(topic);
            if (role == 'tutor') {
                yield this.userModel.updateOne({ id: userId }, { $addToSet: { tutorTopics: topic } });
            }
            else {
                yield this.userModel.updateOne({ id: userId }, { $addToSet: { pupilTopics: topic } });
            }
        });
    }
    removeTopic(userId, topic, role) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (role == 'tutor') {
                yield this.userModel.updateOne({ id: userId }, { $pull: { tutorTopics: topic } });
            }
            else {
                yield this.userModel.updateOne({ id: userId }, { $pull: { pupilTopics: topic } });
            }
        });
    }
};
TopicService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(topic_schema_1.Topic.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], TopicService);
exports.TopicService = TopicService;


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
            const result = yield this.userService.getOne(token.id);
            return result;
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
const mongoose_2 = __webpack_require__("mongoose");
const uuid_1 = __webpack_require__("uuid");
const isEmail_1 = tslib_1.__importDefault(__webpack_require__("validator/lib/isEmail"));
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
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: [],
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "roles", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        default: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        validate: {
            validator: isEmail_1.default,
            message: 'should be a valid email address',
        }
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "emailAddress", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "tutorTopics", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ default: [] }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "pupilTopics", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)({
        default: [],
        type: [mongoose_2.Schema.Types.ObjectId],
        // cannot use Meetup.name here, as it leads to a circular dependency
        ref: 'Meetup',
    }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "meetups", void 0);
User = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),

/***/ "./apps/data-api/src/app/user/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const mongoose_1 = __webpack_require__("mongoose");
const mongoose_2 = __webpack_require__("@nestjs/mongoose");
const user_schema_1 = __webpack_require__("./apps/data-api/src/app/user/user.schema.ts");
const meetup_schema_1 = __webpack_require__("./apps/data-api/src/app/meetup/meetup.schema.ts");
let UserService = class UserService {
    constructor(userModel, meetupModel) {
        this.userModel = userModel;
        this.meetupModel = meetupModel;
    }
    getAll() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this.userModel.aggregate([
                { $lookup: {
                        from: 'meetups',
                        localField: 'meetups',
                        foreignField: '_id',
                        as: 'meetups',
                    } },
                { $addFields: {
                        reviews: { $let: {
                                vars: { user: '$_id' },
                                in: { $map: {
                                        input: { $filter: {
                                                input: '$meetups',
                                                as: 'meetup',
                                                cond: { $and: [{ $eq: ['$$meetup.tutorRef', '$$user'] }, { $gt: ['$$meetup.review', null] }] }
                                            } },
                                        as: 'meetup',
                                        in: {
                                            rating: '$$meetup.review.rating',
                                        },
                                    } },
                            } },
                    } },
                { $addFields: {
                        rating: { $avg: '$reviews.rating' },
                    } },
                { $project: {
                        _id: 0,
                        __v: 0,
                        meetups: 0,
                        reviews: 0,
                    } },
            ]);
        });
    }
    getOne(userId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const users = yield this.userModel.aggregate([
                { $match: {
                        id: userId,
                    } },
                { $lookup: {
                        from: 'meetups',
                        localField: 'meetups',
                        foreignField: '_id',
                        as: 'meetups',
                    } },
                { $addFields: {
                        reviews: { $let: {
                                vars: { user: '$_id' },
                                in: { $map: {
                                        input: { $filter: {
                                                input: '$meetups',
                                                as: 'meetup',
                                                cond: { $and: [{ $eq: ['$$meetup.tutorRef', '$$user'] }, { $gt: ['$$meetup.review', null] }] }
                                            } },
                                        as: 'meetup',
                                        in: {
                                            rating: '$$meetup.review.rating',
                                            id: '$$meetup.id',
                                            topic: '$$meetup.topic',
                                            datetime: '$$meetup.datetime',
                                            text: '$$meetup.review.text',
                                            tutor: '$$meetup.tutor',
                                            pupil: '$$meetup.pupil',
                                        },
                                    } },
                            } },
                    } },
                { $addFields: {
                        rating: { $avg: '$reviews.rating' },
                    } },
                { $project: {
                        _id: 0,
                        __v: 0,
                        meetups: 0,
                        'reviews.tutor._id': 0,
                        'reviews.pupil._id': 0,
                    } },
            ]);
            return users[0];
        });
    }
};
UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(user_schema_1.User.name)),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(meetup_schema_1.Meetup.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./libs/data/src/index.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/id.type.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/roles.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/meetup.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/review.interface.ts"), exports);
tslib_1.__exportStar(__webpack_require__("./libs/data/src/lib/topic.interface.ts"), exports);
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

/***/ "./libs/data/src/lib/id.type.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/data/src/lib/meetup.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/data/src/lib/review.interface.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/data/src/lib/roles.ts":
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),

/***/ "./libs/data/src/lib/topic.interface.ts":
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

/***/ }),

/***/ "validator/lib/isEmail":
/***/ ((module) => {

module.exports = require("validator/lib/isEmail");

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
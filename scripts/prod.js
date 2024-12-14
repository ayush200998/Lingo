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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
require("dotenv/config");
var neon_http_1 = require("drizzle-orm/neon-http");
var serverless_1 = require("@neondatabase/serverless");
var schema = require("../db/schema");
var sql = (0, serverless_1.neon)(process.env.DATABASE_URL);
// @ts-ignore
var db = (0, neon_http_1.drizzle)(sql, { schema: schema });
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var courses, _i, courses_1, course, units, _a, units_1, unit, lessons, _b, lessons_1, lesson, challenges, _c, challenges_1, challenge, error_1;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 30, , 31]);
                console.log("Seeding database");
                // Delete all existing data
                return [4 /*yield*/, Promise.all([
                        db.delete(schema.userProgress),
                        db.delete(schema.challenges),
                        db.delete(schema.units),
                        db.delete(schema.lessons),
                        db.delete(schema.courses),
                        db.delete(schema.challengeOptions),
                        db.delete(schema.userSubscription),
                    ])];
            case 1:
                // Delete all existing data
                _d.sent();
                return [4 /*yield*/, db
                        .insert(schema.courses)
                        .values([
                        { title: "Spanish", imageSrc: "/es.svg" },
                    ])
                        .returning()];
            case 2:
                courses = _d.sent();
                _i = 0, courses_1 = courses;
                _d.label = 3;
            case 3:
                if (!(_i < courses_1.length)) return [3 /*break*/, 29];
                course = courses_1[_i];
                return [4 /*yield*/, db
                        .insert(schema.units)
                        .values([
                        {
                            courseId: course.id,
                            title: "Unit 1",
                            description: "Learn the basics of ".concat(course.title),
                            order: 1,
                        },
                        {
                            courseId: course.id,
                            title: "Unit 2",
                            description: "Learn intermediate ".concat(course.title),
                            order: 2,
                        },
                    ])
                        .returning()];
            case 4:
                units = _d.sent();
                _a = 0, units_1 = units;
                _d.label = 5;
            case 5:
                if (!(_a < units_1.length)) return [3 /*break*/, 28];
                unit = units_1[_a];
                return [4 /*yield*/, db
                        .insert(schema.lessons)
                        .values([
                        { unitId: unit.id, title: "Nouns", order: 1 },
                        { unitId: unit.id, title: "Verbs", order: 2 },
                        { unitId: unit.id, title: "Adjectives", order: 3 },
                        { unitId: unit.id, title: "Phrases", order: 4 },
                        { unitId: unit.id, title: "Sentences", order: 5 },
                    ])
                        .returning()];
            case 6:
                lessons = _d.sent();
                _b = 0, lessons_1 = lessons;
                _d.label = 7;
            case 7:
                if (!(_b < lessons_1.length)) return [3 /*break*/, 27];
                lesson = lessons_1[_b];
                return [4 /*yield*/, db
                        .insert(schema.challenges)
                        .values([
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Which one of these is "the man"?',
                            order: 1,
                        },
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Which one of these is "the woman"?',
                            order: 2,
                        },
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Which one of these is "the boy"?',
                            order: 3,
                        },
                        {
                            lessonId: lesson.id,
                            type: "ASSIST",
                            question: '"the man"',
                            order: 4,
                        },
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Which one of these is "the zombie"?',
                            order: 5,
                        },
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Which one of these is "the robot"?',
                            order: 6,
                        },
                        {
                            lessonId: lesson.id,
                            type: "SELECT",
                            question: 'Which one of these is "the girl"?',
                            order: 7,
                        },
                        {
                            lessonId: lesson.id,
                            type: "ASSIST",
                            question: '"the zombie"',
                            order: 8,
                        },
                    ])
                        .returning()];
            case 8:
                challenges = _d.sent();
                _c = 0, challenges_1 = challenges;
                _d.label = 9;
            case 9:
                if (!(_c < challenges_1.length)) return [3 /*break*/, 26];
                challenge = challenges_1[_c];
                if (!(challenge.order === 1)) return [3 /*break*/, 11];
                return [4 /*yield*/, db.insert(schema.challengeOptions).values([
                        {
                            challengeId: challenge.id,
                            correct: true,
                            text: "el hombre",
                            imageSrc: "/assets/man.svg",
                            audioSrc: "/audio/es_man.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "la mujer",
                            imageSrc: "/assets/woman.svg",
                            audioSrc: "/audio/es_woman.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "el chico",
                            imageSrc: "/assets/boy.svg",
                            audioSrc: "/audio/es_boy.mp3",
                        },
                    ])];
            case 10:
                _d.sent();
                _d.label = 11;
            case 11:
                if (!(challenge.order === 2)) return [3 /*break*/, 13];
                return [4 /*yield*/, db.insert(schema.challengeOptions).values([
                        {
                            challengeId: challenge.id,
                            correct: true,
                            text: "la mujer",
                            imageSrc: "/assets/woman.svg",
                            audioSrc: "/audio/es_woman.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "el chico",
                            imageSrc: "/assets/boy.svg",
                            audioSrc: "/audio/es_boy.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "el hombre",
                            imageSrc: "/assets/man.svg",
                            audioSrc: "/audio/es_man.mp3",
                        },
                    ])];
            case 12:
                _d.sent();
                _d.label = 13;
            case 13:
                if (!(challenge.order === 3)) return [3 /*break*/, 15];
                return [4 /*yield*/, db.insert(schema.challengeOptions).values([
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "la mujer",
                            imageSrc: "/assets/woman.svg",
                            audioSrc: "/audio/es_woman.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "el hombre",
                            imageSrc: "/assets/man.svg",
                            audioSrc: "/audio/es_man.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: true,
                            text: "el chico",
                            imageSrc: "/assets/boy.svg",
                            audioSrc: "/audio/es_boy.mp3",
                        },
                    ])];
            case 14:
                _d.sent();
                _d.label = 15;
            case 15:
                if (!(challenge.order === 4)) return [3 /*break*/, 17];
                return [4 /*yield*/, db.insert(schema.challengeOptions).values([
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "la mujer",
                            audioSrc: "/audio/es_woman.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: true,
                            text: "el hombre",
                            audioSrc: "/audio/es_man.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "el chico",
                            audioSrc: "/audio/es_boy.mp3",
                        },
                    ])];
            case 16:
                _d.sent();
                _d.label = 17;
            case 17:
                if (!(challenge.order === 5)) return [3 /*break*/, 19];
                return [4 /*yield*/, db.insert(schema.challengeOptions).values([
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "el hombre",
                            imageSrc: "/assets/man.svg",
                            audioSrc: "/audio/es_man.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "la mujer",
                            imageSrc: "/assets/woman.svg",
                            audioSrc: "/audio/es_woman.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: true,
                            text: "el zombie",
                            imageSrc: "/assets/zombie.svg",
                            audioSrc: "/audio/es_zombie.mp3",
                        },
                    ])];
            case 18:
                _d.sent();
                _d.label = 19;
            case 19:
                if (!(challenge.order === 6)) return [3 /*break*/, 21];
                return [4 /*yield*/, db.insert(schema.challengeOptions).values([
                        {
                            challengeId: challenge.id,
                            correct: true,
                            text: "el robot",
                            imageSrc: "/assets/robot.svg",
                            audioSrc: "/audio/es_robot.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "el zombie",
                            imageSrc: "/assets/zombie.svg",
                            audioSrc: "/audio/es_zombie.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "el chico",
                            imageSrc: "/assets/boy.svg",
                            audioSrc: "/audio/es_boy.mp3",
                        },
                    ])];
            case 20:
                _d.sent();
                _d.label = 21;
            case 21:
                if (!(challenge.order === 7)) return [3 /*break*/, 23];
                return [4 /*yield*/, db.insert(schema.challengeOptions).values([
                        {
                            challengeId: challenge.id,
                            correct: true,
                            text: "la nina",
                            imageSrc: "/assets/girl.svg",
                            audioSrc: "/audio/es_girl.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "el zombie",
                            imageSrc: "/assets/zombie.svg",
                            audioSrc: "/audio/es_zombie.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "el hombre",
                            imageSrc: "/assets/man.svg",
                            audioSrc: "/audio/es_man.mp3",
                        },
                    ])];
            case 22:
                _d.sent();
                _d.label = 23;
            case 23:
                if (!(challenge.order === 8)) return [3 /*break*/, 25];
                return [4 /*yield*/, db.insert(schema.challengeOptions).values([
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "la mujer",
                            audioSrc: "/audio/es_woman.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: true,
                            text: "el zombie",
                            audioSrc: "/audio/es_zombie.mp3",
                        },
                        {
                            challengeId: challenge.id,
                            correct: false,
                            text: "el chico",
                            audioSrc: "/audio/es_boy.mp3",
                        },
                    ])];
            case 24:
                _d.sent();
                _d.label = 25;
            case 25:
                _c++;
                return [3 /*break*/, 9];
            case 26:
                _b++;
                return [3 /*break*/, 7];
            case 27:
                _a++;
                return [3 /*break*/, 5];
            case 28:
                _i++;
                return [3 /*break*/, 3];
            case 29:
                console.log("Database seeded successfully");
                return [3 /*break*/, 31];
            case 30:
                error_1 = _d.sent();
                console.error(error_1);
                throw new Error("Failed to seed database");
            case 31: return [2 /*return*/];
        }
    });
}); };
main();

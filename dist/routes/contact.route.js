"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const uuidv4_1 = require("uuidv4");
const Contact_model_1 = __importDefault(require("../models/Contact.model"));
const utils_1 = require("../utils");
const upload = (0, multer_1.default)({ dest: "assets/" });
const router = express_1.default.Router();
router.route("/ping").get((req, res) => {
    res.status(200).send("Hi from server");
    // const validator = new Validator(req.query, {
    //   sentence: "required|string|minLength:2",
    // });
    // return validator
    //   .check()
    //   .then((matched) => {
    //     if (!matched) throw new ValidationError(validator.errors);
    //     return reverseWords(req.query.sentence as string);
    //   })
    //   .then((reversed) => res.status(200).json(reversed))
    //   .catch((error) => __error(res, error));
});
/**
 * @route [POST] /contacts
 * @description creates a new contact.
 * @param {string} name
 * @param {string} lastName
 * @param {string} phoneNumber
 * @param {string} email
 * @param {number} age
 * @param {string} avatar
 * @param {file} avatarFile has the higher priority if exists, will replace 'avatar' field with the uploaded file.
 * @param {string} linkToWebsite
 * @param {string} tags comma-separated tags
 * @returns { status: boolean; message: string; data: Contact; } success response
 */
router.post("/", upload.single("avatarFile"), (req, res) => {
    return Promise.resolve()
        .then(() => {
        const contact = Contact_model_1.default.build(Object.assign(Object.assign({}, req.body), { owner: "0x0A92DD7B30f0f57343AD99a151dBC37a3F3F95F3" }));
        if (req.file) {
            const ext = req.file.originalname.split(".").pop();
            const filename = `${(0, uuidv4_1.uuid)()}.${ext}`;
            fs_1.default.renameSync(req.file.path, `assets/${filename}`);
            const domain = `${req.protocol}://${req.get("host")}`;
            contact.avatar = `${domain}/${filename}`;
        }
        return contact.save();
    })
        .then((contact) => res.json({
        status: true,
        message: "Contact created successfully!",
        data: contact,
    }))
        .catch((error) => (0, utils_1.__error)(res, error));
});
/**
 * @route [GET] /contacts/:id
 * @description returns a contact for a given id.
 * @param {string} id The id of the contact
 * @returns {status: boolean; message: string; data: Contact } success response
 *
 */
router.get("/:id", (req, res) => {
    return Contact_model_1.default.findOne({
        where: { id: req.params.id },
    }).then((contact) => res.json({ status: true, message: "success", data: contact }));
});
/**
 * @route [GET] /contacts
 * @description get the contact list by limit & page.
 * @param {string} limit the maximum number of contact to load in a request. in query.
 * @param {string} page the page index starting from 1. in query.
 * @returns { status: boolean; message: string; data: Contact[] } success response
 */
router.get("/", (req, res) => {
    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const offset = (page - 1) * limit;
    return Contact_model_1.default.findAll({
        limit,
        offset,
    })
        .then((contacts) => res.json({ status: true, message: "success", data: contacts }))
        .catch((error) => (0, utils_1.__error)(res, error));
});
/**
 * @route [PATCH] /contacts/:id
 * @description updates a contact by id.
 * @param {string} id The id of the contact.
 * @param {...Contact} _ same payload as in [POST] /contacts
 * @returns { status: boolean; message: string; data: Contact }
 */
router.patch("/:id", upload.single("avatarFile"), (req, res) => {
    return Promise.resolve()
        .then(() => {
        const contact = Object.assign(Object.assign({}, req.body), { owner: "0x0A92DD7B30f0f57343AD99a151dBC37a3F3F95F3" });
        if (req.file) {
            const ext = req.file.originalname.split(".").pop();
            const filename = `${(0, uuidv4_1.uuid)()}.${ext}`;
            fs_1.default.renameSync(req.file.path, `assets/${filename}`);
            const domain = `${req.protocol}://${req.get("host")}`;
            contact.avatar = `${domain}/${filename}`;
        }
        return Contact_model_1.default.update(contact, { where: { id: req.params.id } });
    })
        .then(() => Contact_model_1.default.findOne({ where: { id: req.params.id } }))
        .then((contact) => res.json({ status: true, message: "success", data: contact }))
        .catch((error) => (0, utils_1.__error)(res, error));
});
/**
 * @route [DELETE] /contacts/:id
 * @description delete a contact by id.
 * @param {string} id The id of the contact.
 * @returns { status: boolean, message: string, data: Contact }
 */
router.delete("/:id", (req, res) => {
    return Contact_model_1.default.findOne({ where: { id: req.params.id } })
        .then((contact) => {
        return Contact_model_1.default.destroy({ where: { id: req.params.id } }).then(() => res.json({
            status: true,
            message: "success",
            data: contact,
        }));
    })
        .catch((error) => (0, utils_1.__error)(res, error));
});
exports.default = router;

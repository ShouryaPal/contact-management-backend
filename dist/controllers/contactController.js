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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.getContacts = exports.createContact = void 0;
const Contact_1 = __importDefault(require("../models/Contact"));
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = new Contact_1.default(req.body);
        yield contact.save();
        res.status(201).json(contact);
    }
    catch (error) {
        if (error.code === 11000) {
            res.status(400).json({ message: "Email already exists" });
        }
        else {
            res.status(500).json({ message: error.message });
        }
    }
});
exports.createContact = createContact;
const getContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const sort = req.query.sort || "firstName";
        const order = (req.query.order === "desc" ? -1 : 1);
        const contacts = yield Contact_1.default.find()
            .sort({ [sort]: order })
            .skip((page - 1) * limit)
            .limit(limit);
        const total = yield Contact_1.default.countDocuments();
        res.json({
            contacts,
            total,
            pages: Math.ceil(total / limit),
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.getContacts = getContacts;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield Contact_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json(contact);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateContact = updateContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contact = yield Contact_1.default.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.json({ message: "Contact deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.deleteContact = deleteContact;
//# sourceMappingURL=contactController.js.map
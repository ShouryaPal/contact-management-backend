"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const contactController_1 = require("../controllers/contactController");
const router = express_1.default.Router();
const contactValidation = [
    (0, express_validator_1.body)("firstName").notEmpty().trim(),
    (0, express_validator_1.body)("lastName").notEmpty().trim(),
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("phoneNumber").notEmpty(),
    (0, express_validator_1.body)("company").notEmpty(),
    (0, express_validator_1.body)("jobTitle").notEmpty(),
];
router.post("/", contactValidation, contactController_1.createContact);
router.get("/", contactController_1.getContacts);
router.put("/:id", contactValidation, contactController_1.updateContact);
router.delete("/:id", contactController_1.deleteContact);
exports.default = router;
//# sourceMappingURL=contactRoutes.js.map
import express from "express";
import { body } from "express-validator";
import {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} from "../controllers/contactController";

const router = express.Router();

const contactValidation = [
  body("firstName").notEmpty().trim(),
  body("lastName").notEmpty().trim(),
  body("email").isEmail(),
  body("phoneNumber").notEmpty(),
  body("company").notEmpty(),
  body("jobTitle").notEmpty(),
];

router.post("/", contactValidation, createContact);
router.get("/", getContacts);
router.put("/:id", contactValidation, updateContact);
router.delete("/:id", deleteContact);

export default router;

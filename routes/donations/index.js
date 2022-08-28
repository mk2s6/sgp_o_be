/* eslint-disable linebreak-style */
const express = require('express');
const auth = require('../../model/auth');
const pool = require('../../database/db');
const vs = require('../../model/validator-sanitizer');
const responseGenerator = require('../../model/response-generator');
const constant = require('../../model/constant');
const db = require('./db-donations');
const error = require('../../model/error');
const hf = require('../../model/helper-function');
// const multer = require('../../model/upload-file');
// const fileOperations = require('../../model/file-operations');

const router = express.Router();

/**
 * @api {post} /donations/add/:occasion Register route for admin
 * @apiVersion 1.0.0
 * @apiGroup Admins
 * @apiName Register route for admin
 * @apiDescription Route for registering an admin - An executive of MK2S_LLC
 *
 * @apiParam {String{3..50}} name Name of admin
 * @apiParam {String} gender Gender of admin.
 * @apiParam {String} password Password of admin
 * @apiParam {String} email Email of the admin
 * @apiParam {Number} phone phone number of the admin
 * @apiParam {Date} dob Date of birth admin
 * @apiParam {Date} doj Date of Joining
 * @apiParam {String} role Role of admin
 * @apiParam {String{3..50}} address Address of the admin
 * @apiParam {String} city City of the admin
 * @apiParam {String} state State of the admin
 * @apiParam {String} country Country of the admin
 * @apiParam {Number} pincode Pincode of the address of admin
 *
 * @apiParamExample {json} Sample-Request
 * {
 *     "name" : "Test Admin",
 *     "username" : "admin",
 *     "gender" : "Male",
 *     "password" : "Qwerty12$",
 *     "dob" : "1998-05-21",
 *     "doj" : "2021-02-21",
 *     "email" : "sivakusi.12@gmail.com",
 *     "phone" : "7842487859",
 *     "address" : "test address",
 *     "city" : "Chittoor",
 *     "role" : "Owner",
 *     "state" : "Andhra Pradesh",
 *     "country" : "India",
 *     "pincode" : "517419"
 * }
 * @apiSuccessExample {json} Success-Response
 * {
 *     "data": {
 *         "kind": "Admin register",
 *         "description": "Admin registered successfully",
 *         "items": [
 *             {
 *                 "id": "U3",
 *                 "name": "Test Admin",
 *                 "username": "admin",
 *                 "gender": "Male",
 *                 "email": "sivakusi.12@gmail.com",
 *                 "phone": "7842487859",
 *                 "dob": "1998-05-21",
 *                 "address": "test address",
 *                 "city": "Chittoor",
 *                 "state": "Andhra Pradesh",
 *                 "country": "India",
 *                 "pincode": "517419",
 *                 "role": "Owner",
 *                 "dateOfJoining": "2021-02-21"
 *             }
 *         ]
 *     }
 * }
 *
 * @apiErrorExample {json} Validation-Error
 * HTTP/1.1 422 Un-Processable Entity
 *
 * @apiErrorExample {json} Internal-Error
 * HTTP/1.1 400 Bad Request
 * {
 *     "type": 1,
 *     "code": "50156",
 *     "message": "An internal error has occurred. Please try again!",
 *     "errors": []
 * }
 *
 * @apiErrorExample {json} Duplicate-Details
 * HTTP/1.1 400 Bad Request
 * {
 *     "type": 2,
 *     "code": "30011",
 *     "message": "User with provided Email/phone already exists.",
 *     "errors": []
 * }
 *
 * @apiErrorExample {json} Authentication-Error
 * HTTP/1.1 400 Bad Request
 * {
 *     "type": 3,
 *     "code": "20002",
 *     "message": "You are not authorized to access this resource. Please login again.",
 *     "errors": []
 * }
 */
router.post(
  '/add/:occasion',
  auth.protectAdminRoute,
  [
    vs.isValidStrLenWithTrim('body', 'name', 3, 50, 'Please enter a valid name'),
    vs.isIn('body', 'type', ['Amount', 'Sponsor'], 'Please provide a valid Type'),
    vs.isNumeric('body', 'amount', 'Please provide valid donation amount'),
    vs.isValidStrLenWithTrim('body', 'sponsored_item', 0, 100, 'Please provide valid sponsored item'),
  ],
  async (req, res) => {
    const errors = vs.getValidationResult(req);
    if (!errors.isEmpty()) {
      const fieldsToValidate = ['name', 'year'];
      return res.status(422).send(responseGenerator.validationError(errors.mapped(), fieldsToValidate));
    }

    try {
      const [rows] = await db.insertDonation({ ...req.body, ...req.params }, req.user);
      if (rows.affectedRows !== 1) {
        const responsePasswordNoMatch = responseGenerator.internalError(error.errList.internalError.ERR_INSERT_USER_INSERT_FAILURE_NO_INSERT);
        return res.status(400).send(responsePasswordNoMatch);
      }
      return res.status(200).send(
        responseGenerator.success('Add Occasions', 'Occasion added successfully', [
          {
            id: rows.insertId,
            name: req.body.name,
            year: req.body.year,
          },
        ]),
      );
    } catch (e) {
      console.log(e);
      if (e.code === 'ER_DUP_ENTRY') {
        const beUserDuplicateEntry = error.errList.dbError.ERR_INSERT_OCCASION_DUPLICATE_ENTRY;
        return res.status(400).send(responseGenerator.dbError(beUserDuplicateEntry));
      }
      const responsePasswordNoMatch = responseGenerator.internalError(error.errList.internalError.ERR_INSERT_USER_INSERT_FAILURE);
      return res.status(400).send(responsePasswordNoMatch);
    }
  },
);

/**
 * @api {post} /occasion/list Occasion list
 * @apiVersion 1.0.0
 * @apiGroup Occasions
 * @apiName Register route for admin
 * @apiDescription Route for registering an admin - An executive of MK2S_LLC
 *
 * @apiParamExample {json} Sample-Request
 * {
 *     "name" : "Test Admin",
 *     "username" : "admin",
 *     "gender" : "Male",
 *     "password" : "Qwerty12$",
 *     "dob" : "1998-05-21",
 *     "doj" : "2021-02-21",
 *     "email" : "sivakusi.12@gmail.com",
 *     "phone" : "7842487859",
 *     "address" : "test address",
 *     "city" : "Chittoor",
 *     "role" : "Owner",
 *     "state" : "Andhra Pradesh",
 *     "country" : "India",
 *     "pincode" : "517419"
 * }
 * @apiSuccessExample {json} Success-Response
 * {
 *     "data": {
 *         "kind": "Admin register",
 *         "description": "Admin registered successfully",
 *         "items": [
 *             {
 *                 "id": "U3",
 *                 "name": "Test Admin",
 *                 "username": "admin",
 *                 "gender": "Male",
 *                 "email": "sivakusi.12@gmail.com",
 *                 "phone": "7842487859",
 *                 "dob": "1998-05-21",
 *                 "address": "test address",
 *                 "city": "Chittoor",
 *                 "state": "Andhra Pradesh",
 *                 "country": "India",
 *                 "pincode": "517419",
 *                 "role": "Owner",
 *                 "dateOfJoining": "2021-02-21"
 *             }
 *         ]
 *     }
 * }
 *
 * @apiErrorExample {json} Validation-Error
 * HTTP/1.1 422 Un-Processable Entity
 *
 * @apiErrorExample {json} Internal-Error
 * HTTP/1.1 400 Bad Request
 * {
 *     "type": 1,
 *     "code": "50156",
 *     "message": "An internal error has occurred. Please try again!",
 *     "errors": []
 * }
 *
 * @apiErrorExample {json} Duplicate-Details
 * HTTP/1.1 400 Bad Request
 * {
 *     "type": 2,
 *     "code": "30011",
 *     "message": "User with provided Email/phone already exists.",
 *     "errors": []
 * }
 *
 * @apiErrorExample {json} Authentication-Error
 * HTTP/1.1 400 Bad Request
 * {
 *     "type": 3,
 *     "code": "20002",
 *     "message": "You are not authorized to access this resource. Please login again.",
 *     "errors": []
 * }
 */
router.get('/list/:occasion', [vs.isNumeric('params', 'occasion', 'Please select a valid occasion')], async (req, res) => {
  const errors = vs.getValidationResult(req);
  if (!errors.isEmpty()) {
    const fieldsToValidate = ['occasion'];
    return res.status(422).send(responseGenerator.validationError(errors.mapped(), fieldsToValidate));
  }

  try {
    const [rows] = await db.getDonations(req.params.occasion);
    return res.status(200).send(responseGenerator.success('Donation List', 'Donation retrieved successfully', rows));
  } catch (e) {
    console.log(e);
    if (e.code === 'ER_DUP_ENTRY') {
      const beUserDuplicateEntry = error.errList.dbError.ERR_INSERT_OCCASION_DUPLICATE_ENTRY;
      return res.status(400).send(responseGenerator.dbError(beUserDuplicateEntry));
    }
    const responsePasswordNoMatch = responseGenerator.internalError(error.errList.internalError.ERR_INSERT_USER_INSERT_FAILURE);
    return res.status(400).send(responsePasswordNoMatch);
  }
});

/**
 * @api {put} /donations/receive/:donation Occasion list
 * @apiVersion 1.0.0
 * @apiGroup Occasions
 * @apiName Register route for admin
 * @apiDescription Route for registering an admin - An executive of MK2S_LLC
 *
 * @apiParamExample {json} Sample-Request
 * {
 *     "name" : "Test Admin",
 *     "username" : "admin",
 *     "gender" : "Male",
 *     "password" : "Qwerty12$",
 *     "dob" : "1998-05-21",
 *     "doj" : "2021-02-21",
 *     "email" : "sivakusi.12@gmail.com",
 *     "phone" : "7842487859",
 *     "address" : "test address",
 *     "city" : "Chittoor",
 *     "role" : "Owner",
 *     "state" : "Andhra Pradesh",
 *     "country" : "India",
 *     "pincode" : "517419"
 * }
 * @apiSuccessExample {json} Success-Response
 * {
 *     "data": {
 *         "kind": "Admin register",
 *         "description": "Admin registered successfully",
 *         "items": [
 *             {
 *                 "id": "U3",
 *                 "name": "Test Admin",
 *                 "username": "admin",
 *                 "gender": "Male",
 *                 "email": "sivakusi.12@gmail.com",
 *                 "phone": "7842487859",
 *                 "dob": "1998-05-21",
 *                 "address": "test address",
 *                 "city": "Chittoor",
 *                 "state": "Andhra Pradesh",
 *                 "country": "India",
 *                 "pincode": "517419",
 *                 "role": "Owner",
 *                 "dateOfJoining": "2021-02-21"
 *             }
 *         ]
 *     }
 * }
 *
 * @apiErrorExample {json} Validation-Error
 * HTTP/1.1 422 Un-Processable Entity
 *
 * @apiErrorExample {json} Internal-Error
 * HTTP/1.1 400 Bad Request
 * {
 *     "type": 1,
 *     "code": "50156",
 *     "message": "An internal error has occurred. Please try again!",
 *     "errors": []
 * }
 *
 * @apiErrorExample {json} Duplicate-Details
 * HTTP/1.1 400 Bad Request
 * {
 *     "type": 2,
 *     "code": "30011",
 *     "message": "User with provided Email/phone already exists.",
 *     "errors": []
 * }
 *
 * @apiErrorExample {json} Authentication-Error
 * HTTP/1.1 400 Bad Request
 * {
 *     "type": 3,
 *     "code": "20002",
 *     "message": "You are not authorized to access this resource. Please login again.",
 *     "errors": []
 * }
 */
router.get('/receive/:donation', [vs.isNumeric('params', 'donation', 'Please select a valid donation')], async (req, res) => {
  const errors = vs.getValidationResult(req);
  if (!errors.isEmpty()) {
    const fieldsToValidate = ['donation'];
    return res.status(422).send(responseGenerator.validationError(errors.mapped(), fieldsToValidate));
  }

  try {
    const [rows] = await db.receiveDonation(req.params.donation);
    if (rows.affectedRows > 0) return res.status(200).send(responseGenerator.success('Donation update', 'Donation updated successfully', []));
    const responsePasswordNoMatch = responseGenerator.internalError(error.errList.internalError.ERR_INSERT_USER_INSERT_FAILURE);
    return res.status(400).send(responsePasswordNoMatch);
  } catch (e) {
    console.log(e);
    if (e.code === 'ER_DUP_ENTRY') {
      const beUserDuplicateEntry = error.errList.dbError.ERR_INSERT_OCCASION_DUPLICATE_ENTRY;
      return res.status(400).send(responseGenerator.dbError(beUserDuplicateEntry));
    }
    const responsePasswordNoMatch = responseGenerator.internalError(error.errList.internalError.ERR_INSERT_USER_INSERT_FAILURE);
    return res.status(400).send(responsePasswordNoMatch);
  }
});

/**
 * @api {post} /donations/add/:occasion Register route for admin
 * @apiVersion 1.0.0
 * @apiGroup Admins
 * @apiName Register route for admin
 * @apiDescription Route for registering an admin - An executive of MK2S_LLC
 *
 * @apiParam {String{3..50}} name Name of admin
 * @apiParam {String} gender Gender of admin.
 * @apiParam {String} password Password of admin
 * @apiParam {String} email Email of the admin
 * @apiParam {Number} phone phone number of the admin
 * @apiParam {Date} dob Date of birth admin
 * @apiParam {Date} doj Date of Joining
 * @apiParam {String} role Role of admin
 * @apiParam {String{3..50}} address Address of the admin
 * @apiParam {String} city City of the admin
 * @apiParam {String} state State of the admin
 * @apiParam {String} country Country of the admin
 * @apiParam {Number} pincode Pincode of the address of admin
 *
 * @apiParamExample {json} Sample-Request
 * {
 *     "name" : "Test Admin",
 *     "username" : "admin",
 *     "gender" : "Male",
 *     "password" : "Qwerty12$",
 *     "dob" : "1998-05-21",
 *     "doj" : "2021-02-21",
 *     "email" : "sivakusi.12@gmail.com",
 *     "phone" : "7842487859",
 *     "address" : "test address",
 *     "city" : "Chittoor",
 *     "role" : "Owner",
 *     "state" : "Andhra Pradesh",
 *     "country" : "India",
 *     "pincode" : "517419"
 * }
 * @apiSuccessExample {json} Success-Response
 * {
 *     "data": {
 *         "kind": "Admin register",
 *         "description": "Admin registered successfully",
 *         "items": [
 *             {
 *                 "id": "U3",
 *                 "name": "Test Admin",
 *                 "username": "admin",
 *                 "gender": "Male",
 *                 "email": "sivakusi.12@gmail.com",
 *                 "phone": "7842487859",
 *                 "dob": "1998-05-21",
 *                 "address": "test address",
 *                 "city": "Chittoor",
 *                 "state": "Andhra Pradesh",
 *                 "country": "India",
 *                 "pincode": "517419",
 *                 "role": "Owner",
 *                 "dateOfJoining": "2021-02-21"
 *             }
 *         ]
 *     }
 * }
 *
 * @apiErrorExample {json} Validation-Error
 * HTTP/1.1 422 Un-Processable Entity
 *
 * @apiErrorExample {json} Internal-Error
 * HTTP/1.1 400 Bad Request
 * {
 *     "type": 1,
 *     "code": "50156",
 *     "message": "An internal error has occurred. Please try again!",
 *     "errors": []
 * }
 *
 * @apiErrorExample {json} Duplicate-Details
 * HTTP/1.1 400 Bad Request
 * {
 *     "type": 2,
 *     "code": "30011",
 *     "message": "User with provided Email/phone already exists.",
 *     "errors": []
 * }
 *
 * @apiErrorExample {json} Authentication-Error
 * HTTP/1.1 400 Bad Request
 * {
 *     "type": 3,
 *     "code": "20002",
 *     "message": "You are not authorized to access this resource. Please login again.",
 *     "errors": []
 * }
 */
router.post(
  '/update/:occasion/:donation',
  auth.protectAdminRoute,
  [
    vs.isValidStrLenWithTrim('body', 'name', 3, 50, 'Please enter a valid name'),
    vs.isIn('body', 'type', ['Amount', 'Sponsor'], 'Please provide a valid Type'),
    vs.isNumeric('body', 'amount', 'Please provide valid donation amount'),
    vs.isValidStrLenWithTrim('body', 'sponsored_item', 0, 100, 'Please provide valid sponsored item'),
    vs.isNumeric('params', 'occasion', 'Please choose a valid occasion'),
    vs.isNumeric('params', 'donation', 'Please choose a valid donation'),
  ],
  async (req, res) => {
    const errors = vs.getValidationResult(req);
    if (!errors.isEmpty()) {
      const fieldsToValidate = ['name', 'type', 'occasion', 'donation'];
      return res.status(422).send(responseGenerator.validationError(errors.mapped(), fieldsToValidate));
    }

    try {
      const [rows] = await db.editDonation({ ...req.body, ...req.params }, req.user);
      if (rows.affectedRows !== 1) {
        const responsePasswordNoMatch = responseGenerator.internalError(error.errList.internalError.ERR_INSERT_USER_INSERT_FAILURE_NO_INSERT);
        return res.status(400).send(responsePasswordNoMatch);
      }
      return res.status(200).send(
        responseGenerator.success('Edit Occasions', 'Occasion updated successfully', [
          {
            id: rows.insertId,
            name: req.body.name,
            year: req.body.year,
          },
        ]),
      );
    } catch (e) {
      console.log(e);
      if (e.code === 'ER_DUP_ENTRY') {
        const beUserDuplicateEntry = error.errList.dbError.ERR_INSERT_OCCASION_DUPLICATE_ENTRY;
        return res.status(400).send(responseGenerator.dbError(beUserDuplicateEntry));
      }
      const responsePasswordNoMatch = responseGenerator.internalError(error.errList.internalError.ERR_INSERT_USER_INSERT_FAILURE);
      return res.status(400).send(responsePasswordNoMatch);
    }
  },
);

module.exports = router;

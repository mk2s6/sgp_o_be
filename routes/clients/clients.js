/* eslint-disable linebreak-style */
const express = require('express');
const auth = require('../../model/auth');
const pool = require('../../database/db');
const vs = require('../../model/validator-sanitizer');
const responseGenerator = require('../../model/response-generator');
const constant = require('../../model/constant');
const db = require('./db-clients');
const error = require('../../model/error');
const hf = require('../../model/helper-function');
// const multer = require('../../model/upload-file');
// const fileOperations = require('../../model/file-operations');

const router = express.Router();

/**
 * @api {post} /client/register Register route for client
 * @apiVersion 1.0.0
 * @apiGroup Clients
 * @apiName Register route for client
 * @apiDescription Route for registering Client
 *
 * @apiParam {String{3..50}} name Name of client
 * @apiParam {String} email Email of the client
 * @apiParam {Number} phone phone number of the client
 * @apiParam {String{3..50}} address Address of the client
 * @apiParam {String} city City of the client
 * @apiParam {String} state State of the client
 * @apiParam {String} country Country of the client
 * @apiParam {String} zip zip of the address of Client
 * @apiParam {String{3..50}} owner_name Name of owner
 * @apiParam {String} owner_email Email of the owner
 * @apiParam {Number} owner_phone phone number of the owner
 * @apiParam {String{3..50}} owner_address Address of the owner
 * @apiParam {String} owner_city City of the owner
 * @apiParam {String} owner_state State of the owner
 * @apiParam {String} owner_country Country of the owner
 * @apiParam {String} owner_zip zip of the address of owner
 * @apiParam {URL} [web_domain] web domain of client
 * @apiParam {String{3..50}} spoc_name Name of owner
 * @apiParam {String} spoc_email Email of the owner
 * @apiParam {Number} spoc_phone phone number of the owner
 *
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
  '/register',
  auth.protectAdminRoute,
  [
    vs.isValidStrLenWithTrim('body', 'name', 3, 50, 'Please enter a valid name'),
    vs.isEmail('body', 'email'),
    vs.isMobile('body', 'phone'),
    vs.isValidStrLenWithTrim('body', 'address', 3, 50, 'Please enter a valid address'),
    vs.isValidCity('body', 'city'),
    vs.isValidState('body', 'state'),
    vs.isValidCountry('body', 'country'),
    vs.isPINCODE('body', 'zip'),
    vs.isValidStrLenWithTrim('body', 'owner_name', 3, 50, 'Please enter a valid name'),
    vs.isEmail('body', 'owner_email'),
    vs.isMobile('body', 'owner_phone'),
    vs.isValidStrLenWithTrim('body', 'owner_address', 3, 50, 'Please enter a valid address'),
    vs.isValidCity('body', 'owner_city'),
    vs.isValidState('body', 'owner_state'),
    vs.isValidCountry('body', 'owner_country'),
    vs.isPINCODE('body', 'owner_zip'),
    vs.ifExistsIsUrl('body', 'web_domain', 'Please provide a valid web domain URL'),
    vs.isValidStrLenWithTrim('body', 'spoc_name', 3, 50, 'Please enter a valid name'),
    vs.isEmail('body', 'spoc_email'),
    vs.isMobile('body', 'spoc_phone'),
  ],
  async (req, res) => {
    const errors = vs.getValidationResult(req);
    if (!errors.isEmpty()) {
      const fieldsToValidate = [
        'name',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'country',
        'zip',
        'owner_name',
        'owner_email',
        'owner_phone',
        'owner_address',
        'owner_city',
        'owner_state',
        'owner_country',
        'owner_zip',
        'web_domain',
        'spoc_name',
        'spoc_email',
        'spoc_phone',
      ];
      return res.status(422).send(responseGenerator.validationError(errors.mapped(), fieldsToValidate));
    }

    try {
      const [rows] = await db.insertMK2SLLCClients(req.body);
      if (rows.affectedRows !== 1) {
        const responsePasswordNoMatch = responseGenerator.internalError(error.errList.internalError.ERR_INSERT_USER_INSERT_FAILURE_NO_INSERT);
        return res.status(400).send(responsePasswordNoMatch);
      }
      res.status(200).send(
        responseGenerator.success('Admin register', 'Admin registered successfully', [
          {
            id: constant.idPrefix.ADMIN + rows.insertId,
            name: req.body.name,
            username: req.body.username,
            gender: req.body.gender,
            email: req.body.email,
            phone: req.body.phone,
            dob: req.body.dob,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            pincode: req.body.pincode,
            role: req.body.role,
            dateOfJoining: req.body.doj,
          },
        ]),
      );
    } catch (e) {
      console.log(e);
      if (e.code === 'ER_DUP_ENTRY') {
        const beUserDuplicateEntry = error.errList.dbError.ERR_INSERT_USER_DUPLICATE_ENTRY;
        return res.status(400).send(responseGenerator.dbError(beUserDuplicateEntry));
      }
      const responsePasswordNoMatch = responseGenerator.internalError(error.errList.internalError.ERR_INSERT_USER_INSERT_FAILURE);
      return res.status(400).send(responsePasswordNoMatch);
    }
    return null;
  },
);

module.exports = router;

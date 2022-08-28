define({ "api": [
  {
    "type": "post",
    "url": "/admin/login",
    "title": "Admin Login",
    "version": "1.0.0",
    "group": "Admins",
    "name": "Admin_Login",
    "description": "<p>Route for Company Admin login action.</p>",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Mobile or Email of Admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Account password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n  \"username\": \"admin1@fsjars.com\",\n  \"password\": \"Qwerty12$\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"data\": {\n        \"kind\": \"MK2S LLC - Admin login\",\n        \"description\": \"Login Successful!!!\",\n        \"items\": [\n            {\n                \"id\": \"AD3\",\n                \"name\": \"Test Admin\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error",
          "content": "HTTP/1.1 422 Un-Processable Entity\n{\n   \"type\": 0,\n   \"code\": \"\",\n   \"message\": \"Validation failure.\",\n   \"errors\": [\n       {\n           \"message\": \"Please provide valid a email-id or a phone number as the username\",\n           \"field\": \"username\",\n           \"location\": \"body\"\n       },\n       {\n           \"message\": \"Login Failed: Invalid Email/Mobile or Password provided\",\n           \"field\": \"password\",\n           \"location\": \"body\"\n       }\n   ]\n}",
          "type": "json"
        },
        {
          "title": "Invalid-Credentials",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 2,\n    \"code\": \"30003\",\n    \"message\": \"Invalid Username or Password provided !\",\n    \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/admin/admin.js",
    "groupTitle": "Admins"
  },
  {
    "type": "post",
    "url": "/admin/register",
    "title": "Register route for admin",
    "version": "1.0.0",
    "group": "Admins",
    "name": "Register_route_for_admin",
    "description": "<p>Route for registering an admin - An executive of MK2S_LLC</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "name",
            "description": "<p>Name of admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..12",
            "optional": false,
            "field": "username",
            "description": "<p>Username for the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone",
            "description": "<p>phone number of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "dob",
            "description": "<p>Date of birth admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "doj",
            "description": "<p>Date of Joining</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role of admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>State of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pincode",
            "description": "<p>Pincode of the address of admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n    \"name\" : \"Test Admin\",\n    \"username\" : \"admin\",\n    \"gender\" : \"Male\",\n    \"password\" : \"Qwerty12$\",\n    \"dob\" : \"1998-05-21\",\n    \"doj\" : \"2021-02-21\",\n    \"email\" : \"sivakusi.12@gmail.com\",\n    \"phone\" : \"7842487859\",\n    \"address\" : \"test address\",\n    \"city\" : \"Chittoor\",\n    \"role\" : \"Owner\",\n    \"state\" : \"Andhra Pradesh\",\n    \"country\" : \"India\",\n    \"pincode\" : \"517419\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"data\": {\n        \"kind\": \"Admin register\",\n        \"description\": \"Admin registered successfully\",\n        \"items\": [\n            {\n                \"id\": \"U3\",\n                \"name\": \"Test Admin\",\n                \"username\": \"admin\",\n                \"gender\": \"Male\",\n                \"email\": \"sivakusi.12@gmail.com\",\n                \"phone\": \"7842487859\",\n                \"dob\": \"1998-05-21\",\n                \"address\": \"test address\",\n                \"city\": \"Chittoor\",\n                \"state\": \"Andhra Pradesh\",\n                \"country\": \"India\",\n                \"pincode\": \"517419\",\n                \"role\": \"Owner\",\n                \"dateOfJoining\": \"2021-02-21\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error",
          "content": "HTTP/1.1 422 Un-Processable Entity",
          "type": "json"
        },
        {
          "title": "Internal-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 1,\n    \"code\": \"50156\",\n    \"message\": \"An internal error has occurred. Please try again!\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Duplicate-Details",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 2,\n    \"code\": \"30011\",\n    \"message\": \"User with provided Email/phone already exists.\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Authentication-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 3,\n    \"code\": \"20002\",\n    \"message\": \"You are not authorized to access this resource. Please login again.\",\n    \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/admin/admin.js",
    "groupTitle": "Admins"
  },
  {
    "type": "post",
    "url": "/donations/add/:occasion",
    "title": "Register route for admin",
    "version": "1.0.0",
    "group": "Admins",
    "name": "Register_route_for_admin",
    "description": "<p>Route for registering an admin - An executive of MK2S_LLC</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "name",
            "description": "<p>Name of admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone",
            "description": "<p>phone number of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "dob",
            "description": "<p>Date of birth admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "doj",
            "description": "<p>Date of Joining</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role of admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>State of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pincode",
            "description": "<p>Pincode of the address of admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n    \"name\" : \"Test Admin\",\n    \"username\" : \"admin\",\n    \"gender\" : \"Male\",\n    \"password\" : \"Qwerty12$\",\n    \"dob\" : \"1998-05-21\",\n    \"doj\" : \"2021-02-21\",\n    \"email\" : \"sivakusi.12@gmail.com\",\n    \"phone\" : \"7842487859\",\n    \"address\" : \"test address\",\n    \"city\" : \"Chittoor\",\n    \"role\" : \"Owner\",\n    \"state\" : \"Andhra Pradesh\",\n    \"country\" : \"India\",\n    \"pincode\" : \"517419\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"data\": {\n        \"kind\": \"Admin register\",\n        \"description\": \"Admin registered successfully\",\n        \"items\": [\n            {\n                \"id\": \"U3\",\n                \"name\": \"Test Admin\",\n                \"username\": \"admin\",\n                \"gender\": \"Male\",\n                \"email\": \"sivakusi.12@gmail.com\",\n                \"phone\": \"7842487859\",\n                \"dob\": \"1998-05-21\",\n                \"address\": \"test address\",\n                \"city\": \"Chittoor\",\n                \"state\": \"Andhra Pradesh\",\n                \"country\": \"India\",\n                \"pincode\": \"517419\",\n                \"role\": \"Owner\",\n                \"dateOfJoining\": \"2021-02-21\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error",
          "content": "HTTP/1.1 422 Un-Processable Entity",
          "type": "json"
        },
        {
          "title": "Internal-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 1,\n    \"code\": \"50156\",\n    \"message\": \"An internal error has occurred. Please try again!\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Duplicate-Details",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 2,\n    \"code\": \"30011\",\n    \"message\": \"User with provided Email/phone already exists.\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Authentication-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 3,\n    \"code\": \"20002\",\n    \"message\": \"You are not authorized to access this resource. Please login again.\",\n    \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/donations/index.js",
    "groupTitle": "Admins"
  },
  {
    "type": "post",
    "url": "/expenses/add/:occasion",
    "title": "Register route for admin",
    "version": "1.0.0",
    "group": "Admins",
    "name": "Register_route_for_admin",
    "description": "<p>Route for registering an admin - An executive of MK2S_LLC</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "name",
            "description": "<p>Name of admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone",
            "description": "<p>phone number of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "dob",
            "description": "<p>Date of birth admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "doj",
            "description": "<p>Date of Joining</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role of admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>State of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pincode",
            "description": "<p>Pincode of the address of admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n    \"name\" : \"Test Admin\",\n    \"username\" : \"admin\",\n    \"gender\" : \"Male\",\n    \"password\" : \"Qwerty12$\",\n    \"dob\" : \"1998-05-21\",\n    \"doj\" : \"2021-02-21\",\n    \"email\" : \"sivakusi.12@gmail.com\",\n    \"phone\" : \"7842487859\",\n    \"address\" : \"test address\",\n    \"city\" : \"Chittoor\",\n    \"role\" : \"Owner\",\n    \"state\" : \"Andhra Pradesh\",\n    \"country\" : \"India\",\n    \"pincode\" : \"517419\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"data\": {\n        \"kind\": \"Admin register\",\n        \"description\": \"Admin registered successfully\",\n        \"items\": [\n            {\n                \"id\": \"U3\",\n                \"name\": \"Test Admin\",\n                \"username\": \"admin\",\n                \"gender\": \"Male\",\n                \"email\": \"sivakusi.12@gmail.com\",\n                \"phone\": \"7842487859\",\n                \"dob\": \"1998-05-21\",\n                \"address\": \"test address\",\n                \"city\": \"Chittoor\",\n                \"state\": \"Andhra Pradesh\",\n                \"country\": \"India\",\n                \"pincode\": \"517419\",\n                \"role\": \"Owner\",\n                \"dateOfJoining\": \"2021-02-21\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error",
          "content": "HTTP/1.1 422 Un-Processable Entity",
          "type": "json"
        },
        {
          "title": "Internal-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 1,\n    \"code\": \"50156\",\n    \"message\": \"An internal error has occurred. Please try again!\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Duplicate-Details",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 2,\n    \"code\": \"30011\",\n    \"message\": \"User with provided Email/phone already exists.\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Authentication-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 3,\n    \"code\": \"20002\",\n    \"message\": \"You are not authorized to access this resource. Please login again.\",\n    \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/expenses/index.js",
    "groupTitle": "Admins"
  },
  {
    "type": "post",
    "url": "/admin/register",
    "title": "Register route for admin",
    "version": "1.0.0",
    "group": "Admins",
    "name": "Register_route_for_admin",
    "description": "<p>Route for registering an admin - An executive of MK2S_LLC</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "name",
            "description": "<p>Name of admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..12",
            "optional": false,
            "field": "username",
            "description": "<p>Username for the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender of admin.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone",
            "description": "<p>phone number of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "dob",
            "description": "<p>Date of birth admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Date",
            "optional": false,
            "field": "doj",
            "description": "<p>Date of Joining</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role of admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>State of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country of the admin</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "pincode",
            "description": "<p>Pincode of the address of admin</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n    \"name\" : \"Test Admin\",\n    \"username\" : \"admin\",\n    \"gender\" : \"Male\",\n    \"password\" : \"Qwerty12$\",\n    \"dob\" : \"1998-05-21\",\n    \"doj\" : \"2021-02-21\",\n    \"email\" : \"sivakusi.12@gmail.com\",\n    \"phone\" : \"7842487859\",\n    \"address\" : \"test address\",\n    \"city\" : \"Chittoor\",\n    \"role\" : \"Owner\",\n    \"state\" : \"Andhra Pradesh\",\n    \"country\" : \"India\",\n    \"pincode\" : \"517419\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"data\": {\n        \"kind\": \"Admin register\",\n        \"description\": \"Admin registered successfully\",\n        \"items\": [\n            {\n                \"id\": \"U3\",\n                \"name\": \"Test Admin\",\n                \"username\": \"admin\",\n                \"gender\": \"Male\",\n                \"email\": \"sivakusi.12@gmail.com\",\n                \"phone\": \"7842487859\",\n                \"dob\": \"1998-05-21\",\n                \"address\": \"test address\",\n                \"city\": \"Chittoor\",\n                \"state\": \"Andhra Pradesh\",\n                \"country\": \"India\",\n                \"pincode\": \"517419\",\n                \"role\": \"Owner\",\n                \"dateOfJoining\": \"2021-02-21\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error",
          "content": "HTTP/1.1 422 Un-Processable Entity",
          "type": "json"
        },
        {
          "title": "Internal-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 1,\n    \"code\": \"50156\",\n    \"message\": \"An internal error has occurred. Please try again!\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Duplicate-Details",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 2,\n    \"code\": \"30011\",\n    \"message\": \"User with provided Email/phone already exists.\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Authentication-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 3,\n    \"code\": \"20002\",\n    \"message\": \"You are not authorized to access this resource. Please login again.\",\n    \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/occasions/index.js",
    "groupTitle": "Admins"
  },
  {
    "version": "1.0.0",
    "group": "Admins",
    "name": "Validate_Admin_Username",
    "description": "<p>Route for checking available usernames for admin</p>",
    "permission": [
      {
        "name": "none"
      }
    ],
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username for Admin</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "filename": "routes/admin/admin.js",
    "groupTitle": "Admins"
  },
  {
    "type": "post",
    "url": "/client/register",
    "title": "Register route for client",
    "version": "1.0.0",
    "group": "Clients",
    "name": "Register_route_for_client",
    "description": "<p>Route for registering Client</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "name",
            "description": "<p>Name of client</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the client</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "phone",
            "description": "<p>phone number of the client</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the client</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>City of the client</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "state",
            "description": "<p>State of the client</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country of the client</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "zip",
            "description": "<p>zip of the address of Client</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "owner_name",
            "description": "<p>Name of owner</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "owner_email",
            "description": "<p>Email of the owner</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "owner_phone",
            "description": "<p>phone number of the owner</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "owner_address",
            "description": "<p>Address of the owner</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "owner_city",
            "description": "<p>City of the owner</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "owner_state",
            "description": "<p>State of the owner</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "owner_country",
            "description": "<p>Country of the owner</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "owner_zip",
            "description": "<p>zip of the address of owner</p>"
          },
          {
            "group": "Parameter",
            "type": "URL",
            "optional": true,
            "field": "web_domain",
            "description": "<p>web domain of client</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": "3..50",
            "optional": false,
            "field": "spoc_name",
            "description": "<p>Name of owner</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "spoc_email",
            "description": "<p>Email of the owner</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "spoc_phone",
            "description": "<p>phone number of the owner</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n    \"name\" : \"Test Admin\",\n    \"username\" : \"admin\",\n    \"gender\" : \"Male\",\n    \"password\" : \"Qwerty12$\",\n    \"dob\" : \"1998-05-21\",\n    \"doj\" : \"2021-02-21\",\n    \"email\" : \"sivakusi.12@gmail.com\",\n    \"phone\" : \"7842487859\",\n    \"address\" : \"test address\",\n    \"city\" : \"Chittoor\",\n    \"role\" : \"Owner\",\n    \"state\" : \"Andhra Pradesh\",\n    \"country\" : \"India\",\n    \"pincode\" : \"517419\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"data\": {\n        \"kind\": \"Admin register\",\n        \"description\": \"Admin registered successfully\",\n        \"items\": [\n            {\n                \"id\": \"U3\",\n                \"name\": \"Test Admin\",\n                \"username\": \"admin\",\n                \"gender\": \"Male\",\n                \"email\": \"sivakusi.12@gmail.com\",\n                \"phone\": \"7842487859\",\n                \"dob\": \"1998-05-21\",\n                \"address\": \"test address\",\n                \"city\": \"Chittoor\",\n                \"state\": \"Andhra Pradesh\",\n                \"country\": \"India\",\n                \"pincode\": \"517419\",\n                \"role\": \"Owner\",\n                \"dateOfJoining\": \"2021-02-21\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error",
          "content": "HTTP/1.1 422 Un-Processable Entity",
          "type": "json"
        },
        {
          "title": "Internal-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 1,\n    \"code\": \"50156\",\n    \"message\": \"An internal error has occurred. Please try again!\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Duplicate-Details",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 2,\n    \"code\": \"30011\",\n    \"message\": \"User with provided Email/phone already exists.\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Authentication-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 3,\n    \"code\": \"20002\",\n    \"message\": \"You are not authorized to access this resource. Please login again.\",\n    \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/clients/clients.js",
    "groupTitle": "Clients"
  },
  {
    "type": "post",
    "url": "/occasion/list",
    "title": "Occasion list",
    "version": "1.0.0",
    "group": "Occasions",
    "name": "Register_route_for_admin",
    "description": "<p>Route for registering an admin - An executive of MK2S_LLC</p>",
    "parameter": {
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n    \"name\" : \"Test Admin\",\n    \"username\" : \"admin\",\n    \"gender\" : \"Male\",\n    \"password\" : \"Qwerty12$\",\n    \"dob\" : \"1998-05-21\",\n    \"doj\" : \"2021-02-21\",\n    \"email\" : \"sivakusi.12@gmail.com\",\n    \"phone\" : \"7842487859\",\n    \"address\" : \"test address\",\n    \"city\" : \"Chittoor\",\n    \"role\" : \"Owner\",\n    \"state\" : \"Andhra Pradesh\",\n    \"country\" : \"India\",\n    \"pincode\" : \"517419\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"data\": {\n        \"kind\": \"Admin register\",\n        \"description\": \"Admin registered successfully\",\n        \"items\": [\n            {\n                \"id\": \"U3\",\n                \"name\": \"Test Admin\",\n                \"username\": \"admin\",\n                \"gender\": \"Male\",\n                \"email\": \"sivakusi.12@gmail.com\",\n                \"phone\": \"7842487859\",\n                \"dob\": \"1998-05-21\",\n                \"address\": \"test address\",\n                \"city\": \"Chittoor\",\n                \"state\": \"Andhra Pradesh\",\n                \"country\": \"India\",\n                \"pincode\": \"517419\",\n                \"role\": \"Owner\",\n                \"dateOfJoining\": \"2021-02-21\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error",
          "content": "HTTP/1.1 422 Un-Processable Entity",
          "type": "json"
        },
        {
          "title": "Internal-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 1,\n    \"code\": \"50156\",\n    \"message\": \"An internal error has occurred. Please try again!\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Duplicate-Details",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 2,\n    \"code\": \"30011\",\n    \"message\": \"User with provided Email/phone already exists.\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Authentication-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 3,\n    \"code\": \"20002\",\n    \"message\": \"You are not authorized to access this resource. Please login again.\",\n    \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/donations/index.js",
    "groupTitle": "Occasions"
  },
  {
    "type": "put",
    "url": "/donations/receive/:donation",
    "title": "Occasion list",
    "version": "1.0.0",
    "group": "Occasions",
    "name": "Register_route_for_admin",
    "description": "<p>Route for registering an admin - An executive of MK2S_LLC</p>",
    "parameter": {
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n    \"name\" : \"Test Admin\",\n    \"username\" : \"admin\",\n    \"gender\" : \"Male\",\n    \"password\" : \"Qwerty12$\",\n    \"dob\" : \"1998-05-21\",\n    \"doj\" : \"2021-02-21\",\n    \"email\" : \"sivakusi.12@gmail.com\",\n    \"phone\" : \"7842487859\",\n    \"address\" : \"test address\",\n    \"city\" : \"Chittoor\",\n    \"role\" : \"Owner\",\n    \"state\" : \"Andhra Pradesh\",\n    \"country\" : \"India\",\n    \"pincode\" : \"517419\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"data\": {\n        \"kind\": \"Admin register\",\n        \"description\": \"Admin registered successfully\",\n        \"items\": [\n            {\n                \"id\": \"U3\",\n                \"name\": \"Test Admin\",\n                \"username\": \"admin\",\n                \"gender\": \"Male\",\n                \"email\": \"sivakusi.12@gmail.com\",\n                \"phone\": \"7842487859\",\n                \"dob\": \"1998-05-21\",\n                \"address\": \"test address\",\n                \"city\": \"Chittoor\",\n                \"state\": \"Andhra Pradesh\",\n                \"country\": \"India\",\n                \"pincode\": \"517419\",\n                \"role\": \"Owner\",\n                \"dateOfJoining\": \"2021-02-21\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error",
          "content": "HTTP/1.1 422 Un-Processable Entity",
          "type": "json"
        },
        {
          "title": "Internal-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 1,\n    \"code\": \"50156\",\n    \"message\": \"An internal error has occurred. Please try again!\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Duplicate-Details",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 2,\n    \"code\": \"30011\",\n    \"message\": \"User with provided Email/phone already exists.\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Authentication-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 3,\n    \"code\": \"20002\",\n    \"message\": \"You are not authorized to access this resource. Please login again.\",\n    \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/donations/index.js",
    "groupTitle": "Occasions"
  },
  {
    "type": "post",
    "url": "/occasion/list",
    "title": "Occasion list",
    "version": "1.0.0",
    "group": "Occasions",
    "name": "Register_route_for_admin",
    "description": "<p>Route for registering an admin - An executive of MK2S_LLC</p>",
    "parameter": {
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n    \"name\" : \"Test Admin\",\n    \"username\" : \"admin\",\n    \"gender\" : \"Male\",\n    \"password\" : \"Qwerty12$\",\n    \"dob\" : \"1998-05-21\",\n    \"doj\" : \"2021-02-21\",\n    \"email\" : \"sivakusi.12@gmail.com\",\n    \"phone\" : \"7842487859\",\n    \"address\" : \"test address\",\n    \"city\" : \"Chittoor\",\n    \"role\" : \"Owner\",\n    \"state\" : \"Andhra Pradesh\",\n    \"country\" : \"India\",\n    \"pincode\" : \"517419\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"data\": {\n        \"kind\": \"Admin register\",\n        \"description\": \"Admin registered successfully\",\n        \"items\": [\n            {\n                \"id\": \"U3\",\n                \"name\": \"Test Admin\",\n                \"username\": \"admin\",\n                \"gender\": \"Male\",\n                \"email\": \"sivakusi.12@gmail.com\",\n                \"phone\": \"7842487859\",\n                \"dob\": \"1998-05-21\",\n                \"address\": \"test address\",\n                \"city\": \"Chittoor\",\n                \"state\": \"Andhra Pradesh\",\n                \"country\": \"India\",\n                \"pincode\": \"517419\",\n                \"role\": \"Owner\",\n                \"dateOfJoining\": \"2021-02-21\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error",
          "content": "HTTP/1.1 422 Un-Processable Entity",
          "type": "json"
        },
        {
          "title": "Internal-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 1,\n    \"code\": \"50156\",\n    \"message\": \"An internal error has occurred. Please try again!\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Duplicate-Details",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 2,\n    \"code\": \"30011\",\n    \"message\": \"User with provided Email/phone already exists.\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Authentication-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 3,\n    \"code\": \"20002\",\n    \"message\": \"You are not authorized to access this resource. Please login again.\",\n    \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/expenses/index.js",
    "groupTitle": "Occasions"
  },
  {
    "type": "put",
    "url": "/expenses/receive/:donation",
    "title": "Occasion list",
    "version": "1.0.0",
    "group": "Occasions",
    "name": "Register_route_for_admin",
    "description": "<p>Route for registering an admin - An executive of MK2S_LLC</p>",
    "parameter": {
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n    \"name\" : \"Test Admin\",\n    \"username\" : \"admin\",\n    \"gender\" : \"Male\",\n    \"password\" : \"Qwerty12$\",\n    \"dob\" : \"1998-05-21\",\n    \"doj\" : \"2021-02-21\",\n    \"email\" : \"sivakusi.12@gmail.com\",\n    \"phone\" : \"7842487859\",\n    \"address\" : \"test address\",\n    \"city\" : \"Chittoor\",\n    \"role\" : \"Owner\",\n    \"state\" : \"Andhra Pradesh\",\n    \"country\" : \"India\",\n    \"pincode\" : \"517419\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"data\": {\n        \"kind\": \"Admin register\",\n        \"description\": \"Admin registered successfully\",\n        \"items\": [\n            {\n                \"id\": \"U3\",\n                \"name\": \"Test Admin\",\n                \"username\": \"admin\",\n                \"gender\": \"Male\",\n                \"email\": \"sivakusi.12@gmail.com\",\n                \"phone\": \"7842487859\",\n                \"dob\": \"1998-05-21\",\n                \"address\": \"test address\",\n                \"city\": \"Chittoor\",\n                \"state\": \"Andhra Pradesh\",\n                \"country\": \"India\",\n                \"pincode\": \"517419\",\n                \"role\": \"Owner\",\n                \"dateOfJoining\": \"2021-02-21\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error",
          "content": "HTTP/1.1 422 Un-Processable Entity",
          "type": "json"
        },
        {
          "title": "Internal-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 1,\n    \"code\": \"50156\",\n    \"message\": \"An internal error has occurred. Please try again!\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Duplicate-Details",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 2,\n    \"code\": \"30011\",\n    \"message\": \"User with provided Email/phone already exists.\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Authentication-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 3,\n    \"code\": \"20002\",\n    \"message\": \"You are not authorized to access this resource. Please login again.\",\n    \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/expenses/index.js",
    "groupTitle": "Occasions"
  },
  {
    "type": "post",
    "url": "/occasion/list",
    "title": "Occasion list",
    "version": "1.0.0",
    "group": "Occasions",
    "name": "Register_route_for_admin",
    "description": "<p>Route for registering an admin - An executive of MK2S_LLC</p>",
    "parameter": {
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n    \"name\" : \"Test Admin\",\n    \"username\" : \"admin\",\n    \"gender\" : \"Male\",\n    \"password\" : \"Qwerty12$\",\n    \"dob\" : \"1998-05-21\",\n    \"doj\" : \"2021-02-21\",\n    \"email\" : \"sivakusi.12@gmail.com\",\n    \"phone\" : \"7842487859\",\n    \"address\" : \"test address\",\n    \"city\" : \"Chittoor\",\n    \"role\" : \"Owner\",\n    \"state\" : \"Andhra Pradesh\",\n    \"country\" : \"India\",\n    \"pincode\" : \"517419\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"data\": {\n        \"kind\": \"Admin register\",\n        \"description\": \"Admin registered successfully\",\n        \"items\": [\n            {\n                \"id\": \"U3\",\n                \"name\": \"Test Admin\",\n                \"username\": \"admin\",\n                \"gender\": \"Male\",\n                \"email\": \"sivakusi.12@gmail.com\",\n                \"phone\": \"7842487859\",\n                \"dob\": \"1998-05-21\",\n                \"address\": \"test address\",\n                \"city\": \"Chittoor\",\n                \"state\": \"Andhra Pradesh\",\n                \"country\": \"India\",\n                \"pincode\": \"517419\",\n                \"role\": \"Owner\",\n                \"dateOfJoining\": \"2021-02-21\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error",
          "content": "HTTP/1.1 422 Un-Processable Entity",
          "type": "json"
        },
        {
          "title": "Internal-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 1,\n    \"code\": \"50156\",\n    \"message\": \"An internal error has occurred. Please try again!\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Duplicate-Details",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 2,\n    \"code\": \"30011\",\n    \"message\": \"User with provided Email/phone already exists.\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Authentication-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 3,\n    \"code\": \"20002\",\n    \"message\": \"You are not authorized to access this resource. Please login again.\",\n    \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/occasions/index.js",
    "groupTitle": "Occasions"
  },
  {
    "type": "get",
    "url": "/occasion/dashboard/summary",
    "title": "Occasion list",
    "version": "1.0.0",
    "group": "Occasions",
    "name": "Register_route_for_admin",
    "description": "<p>Route for registering an admin - An executive of MK2S_LLC</p>",
    "parameter": {
      "examples": [
        {
          "title": "Sample-Request",
          "content": "{\n    \"name\" : \"Test Admin\",\n    \"username\" : \"admin\",\n    \"gender\" : \"Male\",\n    \"password\" : \"Qwerty12$\",\n    \"dob\" : \"1998-05-21\",\n    \"doj\" : \"2021-02-21\",\n    \"email\" : \"sivakusi.12@gmail.com\",\n    \"phone\" : \"7842487859\",\n    \"address\" : \"test address\",\n    \"city\" : \"Chittoor\",\n    \"role\" : \"Owner\",\n    \"state\" : \"Andhra Pradesh\",\n    \"country\" : \"India\",\n    \"pincode\" : \"517419\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response",
          "content": "{\n    \"data\": {\n        \"kind\": \"Admin register\",\n        \"description\": \"Admin registered successfully\",\n        \"items\": [\n            {\n                \"id\": \"U3\",\n                \"name\": \"Test Admin\",\n                \"username\": \"admin\",\n                \"gender\": \"Male\",\n                \"email\": \"sivakusi.12@gmail.com\",\n                \"phone\": \"7842487859\",\n                \"dob\": \"1998-05-21\",\n                \"address\": \"test address\",\n                \"city\": \"Chittoor\",\n                \"state\": \"Andhra Pradesh\",\n                \"country\": \"India\",\n                \"pincode\": \"517419\",\n                \"role\": \"Owner\",\n                \"dateOfJoining\": \"2021-02-21\"\n            }\n        ]\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Validation-Error",
          "content": "HTTP/1.1 422 Un-Processable Entity",
          "type": "json"
        },
        {
          "title": "Internal-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 1,\n    \"code\": \"50156\",\n    \"message\": \"An internal error has occurred. Please try again!\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Duplicate-Details",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 2,\n    \"code\": \"30011\",\n    \"message\": \"User with provided Email/phone already exists.\",\n    \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Authentication-Error",
          "content": "HTTP/1.1 400 Bad Request\n{\n    \"type\": 3,\n    \"code\": \"20002\",\n    \"message\": \"You are not authorized to access this resource. Please login again.\",\n    \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/occasions/index.js",
    "groupTitle": "Occasions"
  },
  {
    "type": "get",
    "url": "/test/server/status",
    "title": "Server Status Route",
    "name": "Check_Server_Status",
    "group": "Test_ROUTE",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Server",
            "description": "<p>is Running Properly.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/index.js",
    "groupTitle": "Test_ROUTE"
  }
] });

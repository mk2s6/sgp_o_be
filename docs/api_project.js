define({
  "name": "Hotel Management Systems",
  "version": "1.0.0",
  "description": "REST API's available for Hotel Management Systems. Only JSON format is supported.",
  "title": "Hotel Management Systems REST API documentation.",
  "header": {
    "title": "Header",
    "content": "<h2>Details of Error object returned by backend</h2>\n<ul>\n<li>The error object will be of form:</li>\n</ul>\n<pre> 400 Bad Request: Invalid Username and Password.\n{\n    \"type\": 0|1|2|3,\n    \"code\": <Some Number>,\n    \"message\": \"<Detailed Error message>\",\n    \"errors\": [\n        {\n            \"message\": \"Please enter valid email\",\n            \"field\": \"ui_email\",\n            \"location\": \"body\"\n        },\n        {\n            \"message\": \"Password should have at least 8 characters\",\n            \"field\": \"ui_password\",\n            \"location\": \"body\"\n        }\n]\n}\n</pre>\n<ul>\n<li>type: This return the type of error reported. (See below table for details)</li>\n<li>code: Integer code given by backend. This you need to report to backend which will help us trace the error cause.</li>\n<li>message: Readable rrror message returned by backend. This can be displayed directly to user in a pop up.</li>\n<li>error[]: This will be provided only in case of validation errors. This will contain list of parameters for which validation failed and message. You can display message alongside the input based on field.</li>\n</ul>\n<h2>Types of Error retruned by routes</h2>\n<table>\n<thead>\n<tr>\n<th>Error Type</th>\n<th>Type code</th>\n<th>Remark</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Validation Error</td>\n<td>0</td>\n<td>Returned on input validation failure with status code of 422.<br>UI should show their custom error messages alongside appropriate field.</td>\n</tr>\n<tr>\n<td>Internal Server Error</td>\n<td>1</td>\n<td>Returned when there is issue on server side and we can't process the request.<br>UI should show a popup of this error and tell user to try again.</td>\n</tr>\n<tr>\n<td>Database Errors</td>\n<td>2</td>\n<td>Returned when error is associated to data in database.<br>UI should show a popup of this error and tell user to try again.</td>\n</tr>\n<tr>\n<td>Authentication Error</td>\n<td>3</td>\n<td>These are the error when user is not authorized to use this.<br>UI should clear the token stored and redirect to login page.</td>\n</tr>\n</tbody>\n</table>\n<h2>Default Test Login credentials</h2>\n<p>Username:\nPassword:</p>\n"
  },
  "footer": {
    "title": "Footer",
    "content": "<p><em>&lt; Footer Place holder &gt;</p>\n"
  },
  "sampleUrl": false,
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2022-08-28T15:35:49.338Z",
    "url": "http://apidocjs.com",
    "version": "0.20.1"
  }
});

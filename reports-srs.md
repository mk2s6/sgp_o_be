# EMAIL AND SMS COMMUNICATIONS TRACKER - SRS

## Table of Contents
- [EMAIL AND SMS COMMUNICATIONS TRACKER - SRS](#email-and-sms-communications-tracker---srs)
  - [Table of Contents](#table-of-contents)
  - [SRS Checklist](#srs-checklist)
  - [1. REQUIREMENTS](#1-requirements)
    - [1.1 New Feature - 22 JUN 2021](#11-new-feature---22-jun-2021)
  - [2. PSEUDOCODE](#2-pseudocode)
    - [2.1 API](#21-api)
    - [2.1.1 Communications - Email and Sms delivery / failure status capture](#211-communications---email-and-sms-delivery--failure-status-capture)
  - [3. CRON JOB](#3-cron-job)
    - [3.1 Data purge in `TBL_<CUSTOMER_NAME>_COMMUNICATION_TRACKER`](#31-data-purge-in-tbl_customer_name_communication_tracker)
  - [4 Database](#4-database)
    - [4.2 New table creation TBL_<CUSTOMER_NAME>_COMMUNICATION_TRACKER](#42-new-table-creation-tbl_customer_name_communication_tracker)
    - [4.3 Sample Data for TBL_<CUSTOMER_NAME>_COMMUNICATION_TRACKER](#43-sample-data-for-tbl_customer_name_communication_tracker)
  - [5 History](#5-history)
****

## SRS Checklist
  - [] Requirements
  - [] API
  - [] CRON Job
  - [] Database
  - [] History
  - [] Got to expand the pseudocode on purging the data

## 1. REQUIREMENTS
### 1.1 New Feature - 22 JUN 2021
  1. Record all the **emails** and **sms** sent status to the customers (Order status, receipts, etc...)
  2. We should have a data purge in place to backup the old data and delete it from the table
  3. The period of the purge should be configurable
## 2. PSEUDOCODE

### 2.1 API
### 2.1.1 Communications - Email and Sms delivery / failure status capture
> - We are sending out emails at many places such as Order Status update, Receipts and etc...
> - new Entity to insert data to `TBL_<CUSTOMER_NAME>_COMMUNICATION_TRACKER` table entityCaptureCommunicationData
> - When there is a failure in sending emails we forward the same emails to admin we can have a copy of them at both places in db & admin email inbox
> - When we send out an Email and Sms

    1. Email/Sms sent status is captured (Success/Failure)
    2. We send the required information to the entity such as order_ovr_id, type, status, subject, message, email/phone
    3. Entity calls the db function to insert the details to `TBL_<CUSTOMER_NAME>_COMMUNICATION_TRACKER` table
    4. A cron job to be created to query the old data and created a data backup dump file
    5. This dump file should be saved to AWS S3 bucket for backup
    6. Then after checksum validations we should delete the data from the source table

## 3. CRON JOB
### 3.1 Data purge in `TBL_<CUSTOMER_NAME>_COMMUNICATION_TRACKER`

> For purging data we can delete the data which have been created before the expiration date based on `**CREATED_AT**` column.

## 4 Database
### 4.2 New table creation TBL_<CUSTOMER_NAME>_COMMUNICATION_TRACKER
  |    # | Fields           | Type      | Comments          |
  | ---: | :--------------- | :-------- | :---------------- |
  |    1 | COMM_TRACKING_ID | UUID      |                   |
  |    2 | CUST_ID          | UUID      |                   |
  |    3 | LOCATION_ID      | UUID      |                   |
  |    4 | ORDER_OVR_ID     | UUID      | NULLABLE          |
  |    5 | COMM_TYPE        | ENUM      | (Email/Sms)       |
  |    6 | COMM_STATUS      | ENUM      | (Success/Failure) |
  |    7 | COMM_SUBJECT     | STRING    |                   |
  |    8 | COMM_MESSAGE     | LONG TEXT |                   |
  |    9 | COMM_EMAIL       | STRING    | NULLABLE          |
  |   10 | COMM_PHONE       | STRING    | NULLABLE          |
  |   11 | CREATED_AT       | TIMESTAMP |                   |

### 4.3 Sample Data for TBL_<CUSTOMER_NAME>_COMMUNICATION_TRACKER
  | COMM_HISTORY_ID | CUST_ID   | LOCATION_ID | ORDER_OVR_ID  | COMM_TYPE | COMM_STATUS | COMM_SUBJECT | COMM_MESSAGE       | COMM_EMAIL       | COMM_PHONE | CREATED_AT          |
  | :-------------- | :-------- | :---------- | :------------ | :-------- | :---------- | :----------- | :----------------- | :--------------- | :--------- | :------------------ |
  | test_uuid       | test_uuid | test_uuid   | test_order_id | Email     | Success     | test subject | test email message | test@example.com |            | 2021-06-21 14:57:04 |
  | test_uuid2      | test_uuid | test_uuid   | test_order_id | Sms       | Success     |              | test sms message   |                  | 9999999999 | 2021-06-21 14:57:04 |
  | test_uuid3      | test_uuid | test_uuid   | test_order_id | Email     | Failure     | test subject | test email message | test@example.com |            | 2021-06-21 14:57:04 |

## 5 History
|    # |      Date       | Author | Comments                                   |
| ---: | :-------------: | :----- | :----------------------------------------- |
|    1 | Wed 23 Jun 2021 | Kusuma | Change requests based on 1.0 and 1.1 scope |

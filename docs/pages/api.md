# API

The `accounts-core` api provides management of the user accounts and transactional emails.

## Create user

Creates a new user with the schema bellow:

!!! note "**POST**: `/api/user`"
    ```json
    {
        "name": "string",
        "email": "user@example.com",
        "password": "stringst",
        "settings": {
            "theme": "dark", // default
            "animations": true, // default
            "notificationType": "popup", // default
            "speechType": "neutral", // default
            "mfa": false, // default
            "language": "en-us" // default
        }
    }
    ```

## Get user

Retrieve user data.

!!! abstract "**GET** `/api/user?params`"
    - id: `uuid`
    - email: `string`

## Login

Generates the session token for the user from its email.

!!! info "**POST**: `/api/auth/login/:email`"
    - **email**: `string`

## Update user

Update one or more user configuration field.

!!! note "**PATCH**: `/api/user/:id`"
    - **id**: `uuid`

## Disable user

Disable the user account and schedule it for exclusion.

!!! warning "**POST**: `/api/user/:id`"
    - **id**: `uuid`

## Delete user

Permanently deletes the user account.

!!! danger "**DELETE**: `/api/user/:id`"
    - **id**: `uuid`

## Validate email

Validate the email used on account creation.

!!! info "**POST**: `/api/auth/email/validate/:id/:token`"
    - **id**: `uuid`
    - **token**: generated on account creation with 8 digits and alphanumeric.

## Send verification code to email

Send a new token to the user email. If `isEmailValidation` equals `true` it sets the account email status to not validated.

!!! info "**POST**: `/api/auth/email/verify/:id?params`"
    - **id**: `uuid`
    - **isEmailValidation**: `boolean`

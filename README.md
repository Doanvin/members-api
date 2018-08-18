# SFTHCC Members API

## Use
This is the api used for the sfthcc.org address update page and widget used throughout the site.

## Endpoints
No CORS. Endpoints can only be accessed from sfthcc.org.

### /api/members/first-name
* Method: GET
* Url parameters: 
    * q: persons first name

Example Request
```
https://sfthcc.org/api/members/first-name?q=don
```

Example Response <object []>
```
[
    {
        "ccid": string,
        "last_name": string,
        "first_name": string,
        "middle_name": string,
        "suffix": string,
        "valid_address": boolean
    },
    {
        "ccid": string,
        "last_name": string,
        "first_name": string,
        "middle_name": string,
        "suffix": string,
        "valid_address": boolean
    }
]
```

### /api/members/full-name
* Method: GET
* Url parameters: 
    * first_name: persons first name
    * last_name: persons last name

Example Request
```
https://sfthcc.org/api/members/full-name?first_name=donavin&last_name=hannon
```

Example Response <object []>
```
[
    {
        "ccid": string,
        "last_name": string,
        "first_name": string,
        "middle_name": string,
        "suffix": string,
        "valid_address": boolean
    }
]
```

### /api/members/update-address
* Method: PUT
* Request Body: 
Example Request
```
{
        ccid: members ccid/ tribal enrollment number
        first_name: members first name *required
        middle_name: members middle name
        last_name: members last name *required
        suffix: suffix of members name ex. jr
        email: members email address *required
        phone: members phone number *required
        birthday: members birthday *required, must match birthday in database, must be ISO 8601 formatted
        address: members address *required
        city: members city *required
        state: members state *required
        zip_code: members zip code *required
}
```

Example Response
```
Address Successfully Updated
```


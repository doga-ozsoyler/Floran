
# Floran Backend

Floran is an application to track plant watering.
## Database Collection

#### User

| Key         | Type         |
| ----------- | ------------ |
| nickname    | string       |
| email       | string       |
| password    | bcrypt hash  |
| plants      | plantID[]    |
| reminders   | reminderID[] |
| addedPlants | plantID[]    |

#### Plant

| Key         | Type    |
| ----------- | ------- |
| name        | string  |
| whenToWater | number  |
| petFriendly | boolean |
| sunExposure | number  |
| fertilizer  | number  |
| picture     | string  |

#### Reminder

| Key    | Type    |
| ------ | ------- |
| plant  | plantID |
| repeat | number  |
| time   | date    |

## API Reference

#### Signup

```http
  POST /api/auth/signup
```

| Body       | Type     | Description   |
| :--------- | :------- | :------------ |
| `nickname` | `string` | **Required**. |
| `email`    | `string` | **Required**. |
| `password` | `string` | **Required**. |

#### Signin

```http
  POST /api/auth/signin
```

| Body         | Type     | Description                            |
| :----------- | :------- | :------------------------------------- |
| `email`      | `string` | **Required**. Registered email address |
| `password`   | `string` | **Required**. Registered password      |

#### Get User

```http
  GET /api/user/get
```

| Headers         | Description                       |
| :-------------- | :-------------------------------- |
| `Authorization` | JWT to get user's all information |

#### Update User's Info

```http
  PUT /api/user/update/info
```

| Headers         | Description                       |
| :-------------- | :-------------------------------- |
| `Authorization` | JWT to get user's all information |

| Body         | Type     | Description          |
| :----------- | :------- | :------------------- |
| `nickname`   | `string` | User's nickname      |
| `email`      | `string` | User's email address |

#### Update User's Password

```http
  PUT /api/user/update/password
```

| Headers         | Description                       |
| :-------------- | :-------------------------------- |
| `Authorization` | JWT to get user's all information |

| Body          | Type     | Description                                          |
| :------------ | :------- | :--------------------------------------------------- |
| `oldPassword` | `string` | **Required**. oldpassword must match user's password |
| `newPassword` | `string` | New password                                         |

#### Add plant in my plants list (User)

```http
  PUT /api/user/own/plants
```

| Headers         | Description                       |
| :-------------- | :-------------------------------- |
| `Authorization` | JWT to get user's all information |

| Body      | Type     | Description              |
| :-------- | :------- | :----------------------- |
| `plantID` | `string` | **Required**. Plant's id |

#### Delete User

```http
  DELETE /api/user/delete
```

| Headers         | Description                       |
| :-------------- | :-------------------------------- |
| `Authorization` | JWT to get user's all information |

#### Create new plant

```http
  POST /api/plant/new
```

| Headers         | Description                       |
| :-------------- | :-------------------------------- |
| `Authorization` | JWT to get user's all information |

| Body          | Type      | Description                                       |
| :------------ | :-------- | :------------------------------------------------ |
| `name`        | `string`  | **Required**. Plant's name                        |
| `petFriendly` | `boolean` | **Required**. Plant is pet friendly or not        |
| `sunExposure` | `number`  | **Required**. How much sunlight does plant need   |
| `fertilizer`  | `number`  | **Required**. How much fertilizer does plant need |
| `picture`     | `string`  | **Required**. Plant's picture                     |

#### Update plant

```http
  PUT /api/plant/update/${plantID}
```

| Headers         | Description                       |
| :-------------- | :-------------------------------- |
| `Authorization` | JWT to get user's all information |

| Parameter     | Type      | Description              |
| :------------ | :-------- | :----------------------- |
| `plantID`     | `string`  | **Required**. Plant's id |

#### Delete plant

```http
  DELETE /api/plant/delete/${plantID}
```

| Headers         | Description                       |
| :-------------- | :-------------------------------- |
| `Authorization` | JWT to get user's all information |

| Parameter     | Type      | Description              |
| :------------ | :-------- | :----------------------- |
| `plantID`     | `string`  | **Required**. Plant's id |

#### Get plant

```http
  GET /api/plant/get/${plantID}
```

| Parameter     | Type      | Description              |
| :------------ | :-------- | :----------------------- |
| `plantID`     | `string`  | **Required**. Plant's id |

#### Get all plants

```http
  GET /api/plant/all
```

#### Create new reminder

```http
  POST /api/reminder/new
```

| Headers         | Description                       |
| :-------------- | :-------------------------------- |
| `Authorization` | JWT to get user's all information |

| Body      | Type       | Description                                |
| :-------- | :--------- | :----------------------------------------- |
| `plant`   | `objectId` | **Required**. Plant's id                   |
| `repeat`  | `number`   | **Required**. How many days will it remind |
| `time`    | `date`     | **Required**. When will it remind          |

#### Get reminder

```http
  GET /api/reminder/get/${reminderID}
```

| Headers         | Description                       |
| :-------------- | :-------------------------------- |
| `Authorization` | JWT to get user's all information |

| Parameter.   | Type       | Description                 |
| :----------- | :--------- | :-------------------------- |
| `reminderID` | `objectId` | **Required**. Reminder's id |

#### Update reminder

```http
  PUT /api/reminder/update/${reminderID}
```

| Headers         | Description                       |
| :-------------- | :-------------------------------- |
| `Authorization` | JWT to get user's all information |

| Parameter.   | Type       | Description                 |
| :----------- | :--------- | :-------------------------- |
| `reminderID` | `objectId` | **Required**. Reminder's id |

#### Delete reminder

```http
  DELETE /api/reminder/delete/${reminderID}
```

| Headers         | Description                       |
| :-------------- | :-------------------------------- |
| `Authorization` | JWT to get user's all information |

| Parameter.   | Type       | Description                 |
| :----------- | :--------- | :-------------------------- |
| `reminderID` | `objectId` | **Required**. Reminder's id |



## Tech Stack

**Client:** 

**Server:** Node, Typescript, Express, Mongoose, Ioredis, Jsonwebtoken, Bcrypt, Mongodb

**Server Test:** Jest, Supertest, Mongodb Memory Server, Ioredis Mock


## License

[MIT](https://choosealicense.com/licenses/mit/)

# Architecture

## Model-View-Controller-Service (MSC) Architecture

The `accounts-core` project uses **MSC** architecture, which stands for **Model-View-Controller-Service**. It's an extension of the traditional **MVC (Model-View-Controller)** design pattern, adding an additional layer for **Service**.

The MSC design pattern allows for better separation of concerns, making your code more modular, easier to maintain, and promoting code reuse.

## Components

### Model

This is the data layer of the application. It represents the application's data structure, often corresponding to database tables or, in this case, the MongoDB collection schema.

!!! example
    ```ts
    import joi from 'joi' // Schema validation library

    // create a schema for the user collection
    // name is a string between 2 and 32 characters
    // email is a lowercase string that matches the email format
    // password is a string between 8 and 32 characters
    const userCreate = joi.object({
        name: joi.string().min(2).max(32).required(),
        email: joi.string().lowercase().email().required(),
        password: joi.string().min(8).max(32).required()
    })
    ```

### View

This is the presentation layer of the application. It's responsible for displaying the data provided by the Model in a format that the user can understand and interact with. In the case of `accounts-core`, the View is the API response.

### Controller

This is the layer that handles user input. It interacts with both the Model and the View. It receives user input, manipulates the Model based on that input, and updates the View to reflect changes in the Model.

!!! example
    ```ts
    // This controller handles the creation of a new user
    // @param {Request} req express request object
    // @param {Response} res express response object
    // @param {NextFunction} next express next function
    // @returns {void}

    export default class UserController {
      public static readonly createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const user: UserService = CreateUserService.execute(req, next)
          if (!user) return

          const result = await collections.users.insertOne(user)

          if (result) {
            res.status(HttpStatus.code.CREATED).json({ id: result.insertedId })
          } else {
            next(new BadRequest(CustomErrorMessage.BAD_REQUEST))
            next()
          }

          Log.i('UserController :: Calling Endpoint :: CreateUser')
        } catch (error) {
          Log.e(`${error}`, 'UserController :: CreateUser')
        }
      }
    ```

### Service

This is an additional layer that contains business logic. It's used to write code that doesn't naturally fit into Models or Controllers. For example, if you have a complex operation that involves multiple models, you might put that logic in a Service instead of bloating your Controller or Model with code that doesn't directly relate to their primary responsibilities.

!!! example
    ```ts
    // This service validates the request body and returns a new UserService object
    // @param {Request} req express request object
    // @param {NextFunction} next express next function
    // @returns {UserService} UserService object or null

    export default class CreateUserService {
      static execute(req: Request, next: NextFunction): UserService {
        try {
          const { error, value } = userCreate.validate(req.body)

          if (error) {
            next(new ValidationError(error.details.map((detail) => {
              const key = detail.context?.key ?? ''
              return {
                [key]: detail.message
              }
            })))
            next()
          } else {
            return this._buildQuery(value)
          }
        } catch (error) {
          Log.e(`${error}`, 'CreateUserService')
          return null
        }
      }
    }
    ```

const express = require('express')
const router = express.Router();
//whole express not opens only router part opens


//for post data to be seen but as already used in app then here it is not needed as flow like: Request → app-level middleware → router → route handler

// router.use(express.json())
// router.use(express.urlencoded({extended:true}))




const { body, validationResult } = require('express-validator');
//body used for validation check as per name of inputs

//body correct part, validat stores incorrect part


const userModel = require('../models/users')

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

















router.get('/', (req, res) => {

    res.send("Hello user")


})

router.get('/register', (req, res) => {

    // res.send("Register yourself")
    res.render('register')


})


router.post('/register',
    body('username').trim().isLength({ min: 3, max: 50 }),
    body('phone').trim().isNumeric().isLength({ min: 3, max: 50 }),
    body('email').trim().isEmail().isLength({ min: 9, max: 50 }),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    //custom is used to define user logic or code
    body('confirm_password').trim().custom((value, { req }) => {

        //value is object key in req, and { req } is object destructuring.
        // req: req,      // the Express request object or context as parameter then context.req.body.password

        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        else {
            return true;
        }
    }),


    async (req, res) => {


        console.log(req.body);


        const validationError = validationResult(req);

        if (!validationError.isEmpty()) {
            res.send(validationError);
            // res.send(errors);

            return res.status(400).json({
                errors: validationError.array(),
                message: 'Invalid data'

            })

        }


        //valid inputs

        const { username, phone, email, password } = req.body;
        const remember = req.body.remember === 'true';
        const hashPassword = await bcrypt.hash(password, 10);


        // userModel
        const newUser = await userModel.create({
            username: username,
            phone: phone,
            email: email,
            password: hashPassword,
            remember: remember
        })

        // registered
        res.send('User Registered');



    })


//router is exported



router.get('/login', (req, res) => {

    res.render('login')

})


router.post('/login',

    body('email').trim().isLength({ min: 3, max: 50 }),

    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

    async (req, res) => {


        console.log(req.body);


        const validationError = validationResult(req);

        if (!validationError.isEmpty()) {
            res.send(validationError);
            // res.send(errors);

            return res.status(400).json({
                errors: validationError.array(),
                message: 'Invalid data'

            })

        }


        //valid inputs

        const { email, password } = req.body;


        // userModel
        const user = await userModel.findOne({

            email: email,

        })

        if (!user) {
            //this email not defined
            return res.status(400).json({

                message: 'email or password wrong'

            })
        }


        //if user exist then match the password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({

                message: 'email or password wrong'

            })
        }

        //matched then login
        //update the remember as per new
        await userModel.findOneAndUpdate({

            email: email,

        }, {
            remember: req.body.remember === 'true'
        })


        //give jwt token to this user after login

        console.log(user._id); // new ObjectId("65a1f...")
        console.log(user.id);  // "65a1f..."

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                username: user.username

            },
            process.env.JWT_SECRET
        )

        console.log(token)
        res.cookie('tokenCookie', token);
        //after seeting cookie, there must be as res send


        //open new upload page

        // res.render('home');

        res.send('logged in');



    }
)


//router is exported








module.exports = router



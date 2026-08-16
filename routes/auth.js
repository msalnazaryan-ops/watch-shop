const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');
const User = require('../models/User')(sequelize);

// =========================================
// 1. REGISTER
// =========================================

router.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Ստուգում ենք տվյալները
        if (!name || !email || !password || password.length < 6) {
            return res.status(400).send("Սխալ տվյալների ձևաչափ:");
        }

        // Ստուգում ենք՝ user-ը արդեն կա՞
        const existingUser = await User.findOne({
            where: { email }
        });

        if (existingUser) {
            return res.status(400).send("Այս էլ. հասցեով օգտատեր արդեն գրանցված է:");
        }

        // Ստեղծում ենք user
        const user = await User.create({
            name,
            email,
            password
        });

        console.log(`[MySQL Success] User registered: ${email}`);

        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.status(500).send("Սերվերային սխալ գրանցման ժամանակ:");
    }
});


// =========================================
// 2. LOGIN
// =========================================

router.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Ստուգում ենք տվյալները
        if (!email || !password) {
            return res.status(400).send("Email և գաղտնաբառը պարտադիր են:");
        }

        // Փնտրում ենք user-ին
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            return res.status(400).send("Օգտատերը չի գտնվել:");
        }

        // Ստուգում ենք password-ը
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).send("Սխալ գաղտնաբառ:");
        }

        // =========================================
        // ՊԱՀՊԱՆՈՒՄ ԵՆՔ USER-ԻՆ SESSION-ՈՒՄ
        // =========================================

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        console.log(`[MySQL Success] User logged in: ${email}`);

        // Ուղարկում ենք պատասխան frontend-ին
        res.json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);
        res.status(500).send("Սերվերային սխալ մուտքի ժամանակ:");
    }
});


module.exports = router;

// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');
// const sequelize = require('../config/database'); // <--- Ավելացնում ենք սա
// const User = require('../models/User')(sequelize); // <--- Փոխարինում ենք սրանով
//
// // 1. ԳՐԱՆՑՄԱՆ (Register) երթուղի
// router.post('/api/auth/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//
//         // Ստուգում ենք՝ արդյոք տվյալները կան
//         if (!name || !email || !password || password.length < 6) {
//             return res.status(400).send("Սխալ տվյալների ձևաչափ:");
//         }
//
//         // Ստուգում ենք՝ արդյոք այս էլ. հասցեով օգտատեր արդեն գոյություն ունի
//         const existingUser = await User.findOne({ where: { email } });
//         if (existingUser) {
//             return res.status(400).send("Այս էլ. հասցེով օգտատեր արդեն գրանցված է:");
//         }
//
//         // Ստեղծում ենք նոր օգտատեր (User.beforeCreate-ը ավտոմատ կհեշավորի գաղտնաբառը)
//         await User.create({
//             name,
//             email,
//             password
//         });
//
//         console.log(`[MySQL Success] User registered: ${email}`);
//         res.redirect('/'); // Հաջողության դեպքում վերադարձնում ենք գլխավոր էջ
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Սերվերային սխալ գրանցման ժամանակ:");
//     }
// });
//
// // 2. ՄՈՒՏՔԻ (Login) երթուղի
// router.post('/api/auth/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//
//         // Փնտրում ենք օգտատիրոջը բազայում
//         const user = await User.findOne({ where: { email } });
//         if (!user) {
//             return res.status(400).send("Օգտատերը չի գտնվել:");
//         }
//
//         // Ստուգում ենք գաղտնաբառի ճշտությունը
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).send("Սխալ գաղտնաբառ:");
//         }
//
//         console.log(`[MySQL Success] User logged in: ${email}`);
//         res.redirect('/');
//     } catch (error) {
//         console.error(error);
//         res.status(500).send("Սերվերային սխալ մուտքի ժամանակ:");
//     }
// });
//
// module.exports = router;
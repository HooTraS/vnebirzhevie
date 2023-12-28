const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email_1, role) => {
    return jwt.sign(
        {id, 
        email_1,
        role,
        //phone,
        name_company,
        bin,
        registered_address,
        actual_address,
        management_position,
        name_of_manager,
        contract_currency,
        account_number,
        name_of_the_bank,
        bik,
        kbe,
        kor_count,
        additional_information,
        name_person,
        position,
        work_phone,
        phone_person,
        name_bookkeeper,
        phone_bookkeeper,
        email_3,
        email_2,},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const { 
            name_company,
            bin,
            email_1,
            phone, 
            role,
            password,
            registered_address,
            actual_address,
            management_position,
            name_of_manager,
            contract_currency,
            account_number,
            name_of_the_bank,
            bik,
            kbe,
            kor_count,
            additional_information,
            name_person,
            position,
            work_phone,
            phone_person,
            name_bookkeeper,
            phone_bookkeeper,
            email_3,
            email_2} = req.body

        if (!email_1 || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await User.findOne({where: {email_1}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const name = await User.findOne({where: {name_company}})
        if (name) {
            return next(ApiError.badRequest('Пользователь с таким именем уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({
            name_company,
            bin,
            email_1,
            phone, 
            role,
            password: hashPassword,
            registered_address,
            actual_address,
            management_position,
            name_of_manager,
            contract_currency,
            account_number,
            name_of_the_bank,
            bik,
            kbe,
            kor_count,
            additional_information,
            name_person,
            position,
            work_phone,
            phone_person,
            name_bookkeeper,
            phone_bookkeeper,
            email_3,
            email_2,
           
            })
        //const pko = await PKO.create({userId: user.id})
        const token = generateJwt(
            user.id,
            user.email_1,
            user.role,
            user.phone,
            user.name_company,
            user.actual_address,
            user.management_position,
            user.name_of_manager,
            user.contract_currency,
            user.account_number,
            user.name_of_the_bank,
            user.bik,
            user.kbe,
            user.kor_count,
            user.additional_information,
            user.name_person,
            user.position,
            user.work_phone,
            user.phone_person,
            user.name_bookkeeper,
            user.phone_bookkeeper,
            user.email_3,
            user.email_2,)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email_1, password} = req.body
        const user = await User.findOne({where: {email_1}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(
            user.id,
            user.email_1,
            user.role,
            user.phone, 
            user.name_company,
            user.bin, 
            user.registered_address,
            user.actual_address,
            user.management_position,
            user.name_of_manager,
            user.contract_currency,
            user.account_number,
            user.name_of_the_bank,
            user.bik,
            user.kbe,
            user.kor_count,
            user.additional_information,
            user.name_person,
            user.position,
            user.work_phone,
            user.phone_person,
            user.name_bookkeeper,
            user.phone_bookkeeper,
            user.email_3,
            user.email_2,)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(
            req.user.id,
            req.user.email_1,
            req.user.role,
            req.user.phone,
            req.user.name_company,
            req.user.bin,
            req.user.actual_address,
            req.user.management_position,
            req.user.name_of_manager,
            req.user.contract_currency,
            req.user.account_number,
            req.user.name_of_the_bank,
            req.user.bik,
            req.user.kbe,
            req.user.kor_count,
            req.user.additional_information,
            req.user.name_person,
            req.user.position,
            req.user.work_phone,
            req.user.phone_person,
            req.user.name_bookkeeper,
            req.user.phone_bookkeeper,
            req.user.email_3,
            req.user.email_2,)
        return res.json({token})
    }
}

module.exports = new UserController()
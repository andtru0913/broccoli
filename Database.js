const { PrismaClient } = require('@prisma/client')
const bcrypt = require ('bcrypt');
const prisma = new PrismaClient()

export async function createNewUser(username, password, firstname, lastname, address, privatenumber, worknumber, company, admin) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname,
            address: address,
            privatenumber: privatenumber,
            worknumber: worknumber,
            company: company,
            admin: admin !== null,
            salt: salt,
        },
    })
}

export async function login(input_username, input_password) {
    const query = await prisma.user.findMany({
        where: {
            username: input_username
        },
        select: {
            id: true,
            password: true,
            salt: true,
        }
    })
    let salt = query[0].salt
    let id = query[0].id
    let account_password = query[0].password
    const hashedPassword = await bcrypt.hash(input_password, salt)
    if (hashedPassword === account_password) {
        return id
    }
    else {
        return null
    }
}

export async function getUserinfo(userid) {
    if (userid === undefined) return null;
    try {
        const query = await prisma.user.findMany({
            where: {
                id: userid
            },
            select: {
                username:true,
                password:true,
                firstname:true,
                lastname:true,
                address:true,
                privatenumber:true,
                worknumber:true,
                company:true,
                admin:true,
            }
        })
        return query[0]
    } catch(e) {
        return null
    }

}
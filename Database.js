const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

export async function createNewUser(username, password, firstname, lastname, address, privatenumber, worknumber, company, admin) {


    const query = await prisma.user.create({

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
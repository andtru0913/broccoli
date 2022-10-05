const { PrismaClient } = require('@prisma/client')
const bcrypt = require ('bcrypt');
const prisma = new PrismaClient()

export async function createNewUser(username, password, firstname, lastname, address, privatenumber, worknumber, company, admin) {
    let a = false
    if (admin === "true") {
        a = true;
    }
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
            admin: a,
            salt: salt,
        },
    })
}

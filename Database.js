const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

export async function createNewUser(username, password, firstname, lastname, address, privatenumber, worknumber, company, admin) {


    const query = await prisma.user.create({

    })
}

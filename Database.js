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
            admin: admin !== undefined,
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
    try {
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
    } catch {
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

export async function getAllUsers() {
    return await prisma.user.findMany({
        select: {
            username:true,
            firstname:true,
            lastname:true,
            email: true,
            address:true,
            privatenumber:true,
            worknumber:true,
            company:true,
            admin:true,
        }
    })
}

export async function isAdmin(userid) {
    if (userid === undefined) return false;
    try {
        const query = await prisma.user.findMany({
            where: {
                id: userid
            },
            select: {
                admin:true,
            }
        })
        return query[0].admin
    } catch(e) {
        return false
    }
}

export async function createEvent(title, description, start, end) {
    await prisma.event.create({
        data: {
            title: title,
            description: description,
            start: start,
            end: end,
        },
    })
}

export async function getEvents(id) {
    return await prisma.event.findMany({
        where: {
            id: id
        },
        select: {
            id:true,
            title:true,
            description:true,
            start:true,
            end:true,
        }
    })
}

export async function deleteEvent(id) {
    return await prisma.event.delete({
        where: {
            id:id
        }
    })
}

export async function updateEventDesc(id, title, description) {
    return await prisma.event.update({
        where: {
            id: id,
        },
        data: {
            title: title,
            description: description,
        },
    })
}

export async function updateEventDate(id, start, end) {
    return await prisma.event.update({
        where: {
            id: id,
        },
        data: {
            start: start,
            end: end,
        },
    })
}

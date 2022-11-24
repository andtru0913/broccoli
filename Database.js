import {lunchgroup} from "./defaultIDs";

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
const bcrypt = require ('bcrypt');

export async function createNewUser(username, password, firstname, lastname, gender, email, address, privatenumber, worknumber, company, admin, role) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            email: email,
            address: address,
            privatenumber: privatenumber,
            worknumber: worknumber,
            company: company,
            admin: admin !== undefined,
            salt: salt,
            lunchgroupID: '634e9876bf1fe7084e06634c',
            image: null,
            role: role
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
            firstname: true,
            lastname: true,
            password: true,
            salt: true,
        }
    })
    try {
        let salt = query[0].salt
        let id = query[0].id
        let account_password = query[0].password
        const hashedPassword = await bcrypt.hash(input_password, salt)
        console.log(hashedPassword)
        if (hashedPassword === account_password) {
            return {id: id, firstname: query[0].firstname, lastname: query[0].lastname}
        }
        else {
            return null
        }
    } catch (e) {
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
                firstname:true,
                lastname:true,
                admin:true,

            }
        })
        return query[0]
    } catch(e) {
        return null
    }
}

export async function getUserByEmail(email) {
    if (email === undefined) return null;
    try {
        const query = await prisma.user.findMany({
            where: {
                email: email
            },
            select: {
                firstname:true,
                lastname:true,
                address:true,
                privatenumber:true,
                worknumber:true,
                company:true,
                image:true,
                email:true,
                assignment:true,
                role:true
            }
        })
        return query[0]
    } catch(e) {
        return null
    }
}

export async function getUserProfile(userid) {
    try {
        const query = await prisma.user.findMany({
            where: {
                id: userid
            },
            select: {
                id:true,
                username: true,
                firstname:true,
                lastname:true,
                address:true,
                privatenumber:true,
                worknumber:true,
                company:true,
                image:true,
                email:true,
                assignment:true,
                description:true
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
            id:true,
            username:true,
            firstname:true,
            lastname:true,
            gender: true,
            email: true,
            address:true,
            privatenumber:true,
            worknumber:true,
            company:true,
            admin:true,
            assignment:true,
            role:true
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
            users: {
                select: {
                    user: {
                        select: {
                            firstname: true,
                            lastname: true,
                        }
                    },
                    coming:true,
                }
            }
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

export async function createGroup(name) {
    await prisma.lunchgroup.create({
        data: {
            title: name,
        },
    })
}

export async function getGroups(id) {
    return await prisma.lunchgroup.findMany({
        where: {
            id: id
        },
        select: {
            id:true,
            title:true,
            users:true,
        }
    })
}

export async function getAllLunchGroups() {
    return await prisma.lunchgroup.findMany({
        
        select: {
            id:true,
            title:true,
            users:true,
        }
    })
}

export async function setLunchgroup(userid, lunchgroupid) {
    return await prisma.lunchgroup.update({
        where: {
            id: lunchgroupid,
        },
        data: {
            users: {
                connect: {
                    id: userid,
                }
            }
        },
    })
}

export async function deleteLunchgroup(id) {
    await prisma.lunchgroup.delete({
        where: {
            id: id
        }
    })
    return await prisma.user.updateMany({
            where: {
                lunchgroupID: null,
            },
            data: {
                lunchgroupID: lunchgroup
            },
    })
}

export async function createCard(pageId, title, description, image) {
    await prisma.card.create({
        data: {
            title: title,
            description: description,
            page: {
                connect: {
                    id: pageId
                }
            },
            image: image,
        },
    })
}

export async function getPage(id) {
    return await prisma.page.findMany({
        where: {
            id: id
        },
        select: {
            id: true,
            title:true,
            description:true,
            cards: true,
        }
    })
}

export async function deleteCard(id) {
    return await prisma.card.delete({
        where: {
            id:id
        }
    })
}

export async function updateCard(id, title, description, image) {
    if (image.length === 0) {
        return await prisma.card.update({
            where: {
                id: id,
            },
            data: {
                title: title,
                description: description,
            },
        })
    }
    return await prisma.card.update({
        where: {
            id: id,
        },
        data: {
            title: title,
            description: description,
            image:image
        },
    })

}

export async function updatePage(id, title, description) {
    return await prisma.page.update({
        where: {
            id: id,
        },
        data: {
            title: title,
            description: description,
        },
    })
}

export async function joinEvent(userid, eventid) {
    try {
        return await prisma.UserOnEvent.upsert({
            where: {
                userId_eventId: {userId: userid, eventId: eventid}
            },
            update: {
                coming: true
            },
            create: {
                user: {
                    connect: {
                        id: userid,
                    }
                },
                event: {
                    connect: {
                        id: eventid
                    }
                },
                coming: true
            }
        })
    }
    catch (_) {
    }
}

export async function leaveEvent(userid, eventid) {
    try {
        return await prisma.UserOnEvent.upsert({
            where: {
                userId_eventId: {userId: userid, eventId: eventid}
            },
            update: {
                coming: false
            },
            create: {
                user: {
                    connect: {
                        id: userid,
                    }
                },
                event: {
                    connect: {
                        id: eventid
                    }
                },
                coming: false
            }
        })
    }
    catch (_) {
    }
}

export async function maybeEvent(userid, eventid) {
    try {
        return await prisma.UserOnEvent.delete({
            where: {
                userId_eventId: {userId: userid, eventId: eventid}
            },
        })
    }
    catch (_) {
    }
}

export async function deleteUser(id) {
    return await prisma.user.delete({
        where: {
            id:id
        }
    })
}

export async function modifyUser(id, username, email, password, firstname, lastname, gender, address, privatenumber, worknumber, company, admin, assignment,role) {
    console.log(role)
    if (password !== undefined) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                username: username,
                password: hashedPassword,
                firstname: firstname,
                lastname: lastname,
                email: email,
                gender: gender,
                address: address,
                privatenumber: privatenumber,
                worknumber: worknumber,
                company: company,
                admin: admin !== undefined ? admin : false,
                salt: salt,
                assignment: assignment,
                role: role
            },
        })
    }
    else {
        await prisma.user.update({
            where: {
                id: id
            },
            data: {
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                gender: gender,
                address: address,
                privatenumber: privatenumber,
                worknumber: worknumber,
                company: company,
                admin: admin !== undefined,
                assignment: assignment,
                role:role
            },
        })
    }
}

export async function getUserEvents(id) {
    return await prisma.event.findMany({
        where: {
            users: {
                some: {
                   AND: [{userId: id},{coming:true}]
                }
            }
        },
        select: {
            id:true,
            title:true,
            description:true,
            start:true,
            end:true,
            users: {
                select: {
                    user: {
                        select: {
                            firstname: true,
                            lastname: true,
                        }
                    },
                    coming:true
                }
            }
        }
    })
}

export async function createDocument(title, filename, date) {
    await prisma.document.create({
        data: {
            title: title,
            filename: filename,
            date: date
        },
    })
}

export async function getAllDocuments() {
    return await prisma.document.findMany({
        select: {
            id:true,
            title: true,
            date: true
        },
    })
}

export async function getDocument(id) {
    return (await prisma.document.findMany({
        where: {
            id: id
        },
        select: {
            id:true,
            title: true,
            filename:true,
            date: true
        },
    }))[0]
}

export async function getUserOverview() {
    return await prisma.user.findMany({
        select: {
            firstname: true,
            lastname:true,
            image: true,
            email: true,
            assignment:true,
            role:true,
            worknumber: true,
            description: true
        },
    })
}

export async function deleteDocument(id) {
    return await prisma.document.delete({
        where: {
            id:id
        }
    })
}

export async function getGenderCount() {
    const query = await prisma.user.findMany({
        select: {
            gender: true
        }
    })
    return [query.filter(user => user.gender === "man").length, query.filter(user => user.gender === "woman").length]
}

export async function editProfile(userid, username, password, email, address, privatenumber, worknumber, image, description) {
    if (!!password) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        await prisma.user.update({
            where: {
                id: userid
            },
            data: {
                username: username,
                password: hashedPassword,
                address: address,
                email: email,
                privatenumber: privatenumber,
                worknumber: worknumber,
                salt: salt,
                description: description
            },
        })
    }
    else {
        await prisma.user.update({
            where: {
                id: userid
            },
            data: {
                username: username,
                address: address,
                email: email,
                privatenumber: privatenumber,
                worknumber: worknumber,
                description: description
            },
        })
    }
    if(!!image) {
        await prisma.user.update({
            where: {
                id: userid
            },
            data: {
                image: userid,
            },
        })
    }
}


export async function deleteProfilePic(id) {
    return await prisma.user.update({
        where: {
            id: id,
        },
        data: {
            image: null,
        },
    })
}

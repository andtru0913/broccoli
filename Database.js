import { lunchgroup } from "./defaultIDs";

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

export async function createNewUser(
  username,
  password,
  firstname,
  lastname,
  gender,
  email,
  address,
  privatenumber,
  worknumber,
  company,
  admin,
  role
) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
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
      lunchgroupID: lunchgroup,
      image: null,
      role: role,
    },
  });
}

export async function login(input_username, input_password) {
  const query = await prisma.user.findMany({
    where: {
      username: input_username,
    },
    select: {
      id: true,
      firstname: true,
      lastname: true,
      password: true,
      salt: true,
      admin: true,
    },
  });
  try {
    let salt = query[0].salt;
    let id = query[0].id;
    let account_password = query[0].password;
    const hashedPassword = await bcrypt.hash(input_password, salt);
    if (hashedPassword === account_password) {
      return id;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}

export async function getUserinfo(userid) {
  if (userid === undefined) return null;
  try {
    const query = await prisma.user.findMany({
      where: {
        id: userid,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        admin: true,
        description: true,
        role: true,
        company: true,
        worknumber: true,
        privatenumber: true,
        assignment: true,
        address: true,
        username: true,
        email: true,
        lunchgroup: true,
      },
    });
    return query[0];
  } catch (e) {
    return null;
  }
}

export async function getUserProfile(userid) {
  try {
    const query = await prisma.user.findMany({
      where: {
        id: userid,
      },
      select: {
        id: true,
        username: true,
        firstname: true,
        lastname: true,
        address: true,
        privatenumber: true,
        worknumber: true,
        company: true,
        image: true,
        email: true,
        assignment: true,
        description: true,
        admin: true,
        birthday: true,
      },
    });
    return query[0];
  } catch (e) {
    return null;
  }
}

export async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      firstname: true,
      lastname: true,
      gender: true,
      email: true,
      address: true,
      privatenumber: true,
      worknumber: true,
      company: true,
      admin: true,
      assignment: true,
      role: true,
    },
  });
}

export async function getAllUsersEmail() {
  return await prisma.user.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });
}

export async function isAdmin(userid) {
  if (userid === undefined) return null;
  try {
    const query = await prisma.user.findMany({
      where: {
        id: userid,
      },
      select: {
        admin: true,
      },
    });
    return query[0].admin;
  } catch (e) {
    return null;
  }
}

export async function isUser(userid) {
  if (userid === undefined) return null;
  try {
    const query = await prisma.user.findMany({
      where: {
        id: userid,
      },
    });
    return !!query;
  } catch (e) {
    return null;
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
  });
}

export async function getEvents(id) {
  return await prisma.event.findMany({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      start: true,
      end: true,
      users: {
        select: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
            },
          },
          coming: true,
        },
      },
    },
  });
}

export async function upcomingEvents(n) {
  return await prisma.event.findMany({
    where: {
      end: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      start: true,
    },
    orderBy: {
      start: "asc",
    },
    take: n,
  });
}

export async function deleteEvent(id) {
  return await prisma.event.delete({
    where: {
      id: id,
    },
  });
}

export async function deleteNotification(id) {
  await prisma.UserNotifications.deleteMany({
    where: {
      notificationId: id,
    },
  });
  return await prisma.notifications.delete({
    where: {
      id: id,
    },
  });
}

export async function updateEvent(id, title, description, start, end) {
  return await prisma.event.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      description: description,
      start: start,
      end: end,
    },
  });
}

export async function modifyLunchgroup(id, title) {
  return await prisma.lunchgroup.update({
    where: {
      id: id,
    },
    data: {
      title: title,
    },
  });
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
  });
}

export async function createGroup(name) {
  await prisma.lunchgroup.create({
    data: {
      title: name,
    },
  });
}

export async function getGroups() {
  return await prisma.lunchgroup.findMany({
    select: {
      id: true,
      title: true,
      users: {
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
        },
      },
    },
  });
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
        },
      },
    },
  });
}

export async function deleteLunchgroup(id) {
  await prisma.user.updateMany({
    where: {
      lunchgroupID: id,
    },
    data: {
      lunchgroupID: lunchgroup,
    },
  });
  return await prisma.lunchgroup.delete({
    where: {
      id: id,
    },
  });
}

export async function createCard(
  pageId,
  title,
  description,
  requirements,
  location,
  startdate,
  enddate,
  contact
) {
  await prisma.card.create({
    data: {
      title: title,
      description: description,
      requirements: requirements,
      location: location,
      startdate: startdate,
      enddate: enddate,
      contact: contact,
      page: {
        connect: {
          id: pageId,
        },
      },
    },
  });
}

export async function getPage(id) {
  let result = await prisma.page.findMany({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      cards: true,
    },
  });
  result[0].cards.map((data) => {
    data.startdate = new Date(data.startdate).toLocaleString("default", {
      year: "numeric",
      day: "numeric",
      month: "long",
    });
    data.enddate = new Date(data.enddate).toLocaleString("default", {
      year: "numeric",
      day: "numeric",
      month: "long",
    });
  });
  return result;
}

export async function deleteCard(id) {
  return await prisma.card.delete({
    where: {
      id: id,
    },
  });
}

export async function deleteNews(id) {
  return await prisma.news.delete({
    where: {
      id: id,
    },
  });
}
export async function archiveNews(id) {
  return await prisma.news.update({
    where: {
      id: id,
    },
    data: {
      archive: true,
    },
  });
}

export async function removeArchive(id) {
  return await prisma.news.update({
    where: {
      id: id,
    },
    data: {
      archive: false,
    },
  });
}

export async function updateCard(
  id,
  title,
  description,
  requirements,
  location,
  startdate,
  enddate,
  contact
) {
  return await prisma.card.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      description: description,
      requirements: requirements,
      location: location,
      startdate: startdate,
      enddate: enddate,
      contact: contact,
    },
  });
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
  });
}

export async function joinEvent(userid, eventid) {
  try {
    return await prisma.UserOnEvent.upsert({
      where: {
        userId_eventId: { userId: userid, eventId: eventid },
      },
      update: {
        coming: true,
      },
      create: {
        user: {
          connect: {
            id: userid,
          },
        },
        event: {
          connect: {
            id: eventid,
          },
        },
        coming: true,
      },
    });
  } catch (_) {}
}

export async function leaveEvent(userid, eventid) {
  try {
    return await prisma.UserOnEvent.upsert({
      where: {
        userId_eventId: { userId: userid, eventId: eventid },
      },
      update: {
        coming: false,
      },
      create: {
        user: {
          connect: {
            id: userid,
          },
        },
        event: {
          connect: {
            id: eventid,
          },
        },
        coming: false,
      },
    });
  } catch (_) {}
}

export async function maybeEvent(userid, eventid) {
  try {
    return await prisma.UserOnEvent.delete({
      where: {
        userId_eventId: { userId: userid, eventId: eventid },
      },
    });
  } catch (_) {}
}

export async function deleteUser(id) {
  return await prisma.user.delete({
    where: {
      id: id,
    },
  });
}

export async function modifyUser(
  id,
  email,
  username,
  password,
  firstname,
  lastname,
  gender,
  address,
  privatenumber,
  worknumber,
  company,
  admin,
  assignment,
  role
) {
  if (password !== undefined) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.update({
      where: {
        id: id,
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
        role: role,
      },
    });
  } else {
    await prisma.user.update({
      where: {
        id: id,
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
        role: role,
      },
    });
  }
}

export async function getUserEvents(id) {
  return await prisma.event.findMany({
    where: {
      users: {
        some: {
          AND: [{ userId: id }, { coming: true }],
        },
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      start: true,
      end: true,
      users: {
        select: {
          user: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
            },
          },
          coming: true,
        },
      },
    },
  });
}

export async function createNews(title, filename, date, author) {
  console.log(author);
  await prisma.news.create({
    data: {
      title: title,
      file: filename,
      date: date,
      author: {
        connect: {
          id: author,
        },
      },
    },
  });
}
export async function getRecentNews(take) {
  return await prisma.news.findMany({
    where: {
      archive: false,
    },
    select: {
      id: true,
      title: true,
      file: true,
      date: true,
      author: {
        select: {
          firstname: true,
          lastname: true,
          email: true,
        },
      },
    },
    take: take,
    orderBy: {
      date: "desc",
    },
  });
}

export async function getAllNews(isArchive) {
  return await prisma.news.findMany({
    where: {
      archive: isArchive,
    },
    select: {
      id: true,
      title: true,
      file: true,
      date: true,
      archive: true,
      author: {
        select: {
          firstname: true,
          lastname: true,
          email: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function getUserNotifications() {
  return await prisma.user.findMany({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
    },
  });
}

export async function getGenderCount() {
  const query = await prisma.user.findMany({
    select: {
      gender: true,
    },
  });
  return [
    query.filter((user) => user.gender === "man").length,
    query.filter((user) => user.gender === "woman").length,
  ];
}

export async function editProfile(
  userid,
  username,
  password,
  email,
  address,
  privatenumber,
  worknumber,
  image,
  description,
  birthdate
) {
  if (!!password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await prisma.user.update({
      where: {
        id: userid,
      },
      data: {
        username: username,
        password: hashedPassword,
        address: address,
        email: email,
        privatenumber: privatenumber,
        worknumber: worknumber,
        salt: salt,
        description: description,
        birthday: birthdate,
      },
    });
  } else {
    await prisma.user.update({
      where: {
        id: userid,
      },
      data: {
        username: username,
        address: address,
        email: email,
        privatenumber: privatenumber,
        worknumber: worknumber,
        description: description,
        birthday: birthdate,
      },
    });
  }
  if (!!image) {
    await prisma.user.update({
      where: {
        id: userid,
      },
      data: {
        image: image,
      },
    });
  }
  return Promise.resolve();
}

export async function deleteProfilePic(id) {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      image: null,
    },
  });
}

export async function createNotification(
  userid,
  title,
  text,
  startdate,
  enddate,
  users
) {
  if (users.constructor.name === "Array") {
    let result = await prisma.notifications.create({
      data: {
        title: title,
        text: text,
        startDate: startdate,
        endDate: enddate,
        author: {
          connect: {
            id: userid,
          },
        },
      },
    });
    return await prisma.UserNotifications.createMany({
      data: users.map((u) => ({ notificationId: result.id, userId: u })),
    });
  } else {
    let result = await prisma.notifications.create({
      data: {
        title: title,
        text: text,
        startDate: startdate,
        endDate: enddate,
        author: {
          connect: {
            id: userid,
          },
        },
      },
    });
    return await prisma.UserNotifications.create({
      data: { notificationId: result.id, userId: users },
    });
  }
}

export async function modifyNotification(notifId, title, text, enddate, users) {
  await prisma.UserNotifications.deleteMany({
    where: {
      notificationId: notifId,
    },
  });
  if (users.constructor.name === "Array") {
    const result = await prisma.notifications.update({
      where: {
        id: notifId,
      },
      data: {
        title: title,
        text: text,
        endDate: enddate,
      },
    });
    return await prisma.UserNotifications.createMany({
      data: users.map((u) => ({ notificationId: result.id, userId: u })),
    });
  } else {
    const result = await prisma.notifications.create({
      data: {
        title: title,
        text: text,
        startDate: startdate,
        endDate: enddate,
        author: {
          connect: {
            id: userid,
          },
        },
      },
    });
    return await prisma.UserNotifications.create({
      data: { notificationId: result.id, userId: users },
    });
  }
}

export async function getAllNotifications() {
  let result = await prisma.notifications.findMany({
    select: {
      id: true,
      title: true,
      text: true,
      startDate: true,
      endDate: true,
      author: {
        select: {
          firstname: true,
          lastname: true,
        },
      },
      users: {
        select: {
          user: {
            select: {
              email: true,
            },
          },
        },
      },
    },
    orderBy: {
      endDate: "asc",
    },
  });
  result.map((data) => {
    data.startDate = new Date(data.startDate).toLocaleString("default", {
      year: "numeric",
      day: "numeric",
      month: "long",
    });
    data.endDate = new Date(data.endDate).toLocaleString("default", {
      year: "numeric",
      day: "numeric",
      month: "long",
    });
  });
  return result;
}

export async function getNotifications(userid) {
  let result = await prisma.UserNotifications.findMany({
    where: {
      notification: {
        endDate: {
          gt: new Date(),
        },
      },
      userId: userid,
    },
    select: {
      notification: {
        select: {
          id: true,
          title: true,
          text: true,
          startDate: true,
          endDate: true,
          author: {
            select: {
              firstname: true,
              lastname: true
            }
          },
        },
      },
    },
    orderBy: {
      notification: {
        startDate: "desc",
      },
    },
  });
  result.map((data) => {
    data.notification.startDate = new Date(
      data.notification.startDate
    ).toLocaleString("default", {
      year: "numeric",
      day: "numeric",
      month: "long",
    });
    data.notification.endDate = new Date(
      data.notification.endDate
    ).toLocaleString("default", {
      year: "numeric",
      day: "numeric",
      month: "long",
    });
  });
  return result;
}

export async function getEventNotReplied(eventid) {
  return await prisma.user.findMany({
    where: {
      events: {
        every: {
          NOT: {
            eventId: eventid,
          },
        },
      },
    },
    select: {
      firstname: true,
      lastname: true,
    },
  });
}

export async function getBirthdays() {
  return await prisma.user.findMany({
    select: {
      firstname: true,
      lastname: true,
      birthday: true,
    },
  });
}

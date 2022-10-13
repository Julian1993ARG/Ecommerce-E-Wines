const { User } = require('../db')
// const { Op } = require('sequelize')

const { v4: uuidv4 } = require('uuid')

const getUserById = async (id) => {
  try {
    const dbResult = await User.findByPk(id)

    if (!dbResult) return null

    const result = {
      id: dbResult.id,
      username: dbResult.username,
      email: dbResult.email,
      region: dbResult.region,
      image: dbResult.image,
      isBanned: dbResult.isBanned,
      isAdmin: dbResult.isAdmin,
      isSommelier: dbResult.isSommelier,
      balance: dbResult.balance
    }
    console.log(result)

    return result
  } catch (error) {
    throw new Error('Error finding a user by its ID!')
  }
}

const getAllUsers = async () => {
  const results = []

  try {
    const dbResults = await User.findAll()

    dbResults.forEach((r) => {
      results.push({
        id: r.id,
        username: r.username,
        email: r.email,
        region: r.region,
        image: r.image,
        isBanned: r.isBanned,
        isAdmin: r.isAdmin,
        isSommelier: r.isSommelier,
        balance: r.balance
      })
    })
    return results
  } catch (error) {
    throw new Error('Error trying to get all users from DB!')
  }
}

const getAllUsersBanned = async () => {
  const results = []

  try {
    const dbResults = await User.findAll({
      where: {
        isBanned: true
      }
    })

    dbResults.forEach((r) => {
      results.push({
        id: r.id,
        username: r.username,
        email: r.email,
        region: r.region,
        image: r.image,
        isBanned: r.isBanned,
        isAdmin: r.isAdmin,
        isSommelier: r.isSommelier,
        balance: r.balance
      })
    })
    return results
  } catch (error) {
    throw new Error('Error trying to get all users from DB!')
  }
}

const getAllUsersNotBanned = async () => {
  const results = []

  try {
    const dbResults = await User.findAll({
      where: {
        isBanned: false
      }
    })

    dbResults.forEach((r) => {
      results.push({
        id: r.id,
        username: r.username,
        email: r.email,
        region: r.region,
        image: r.image,
        isBanned: r.isBanned,
        isAdmin: r.isAdmin,
        isSommelier: r.isSommelier,
        balance: r.balance
      })
    })
    return results
  } catch (error) {
    throw new Error('Error trying to get all users from DB!')
  }
}

const createUser = async (username, email, password, region) => {
  try {
    const userCreated = await User.create({
      username,
      email,
      password,
      region,
      id: uuidv4()
    })

    return userCreated
  } catch (error) {
    throw new Error('Error trying to create a new User!')
  }
}

const setBanned = async (id, banned) => {
  try {
    const userUpdated = await User.update(
      {
        isBanned: banned
      },
      {
        where: {
          id
        }
      }
    )

    if (userUpdated) {
      const userById = await getUserById(id)
      return userById
    }
  } catch (error) {
    throw new Error('Error updating user!')
  }
}

const setSommelier = async (id, sommelier) => {
  try {
    const userUpdated = await User.update(
      {
        isSommelier: sommelier
      },
      {
        where: {
          id
        }
      }
    )

    if (userUpdated) {
      const userById = await getUserById(id)
      return userById
    }
  } catch (error) {
    throw new Error('Error updating user!')
  }
}

const setImage = async (id, url) => {
  try {
    const userUpdated = await User.update(
      {
        image: url
      },
      {
        where: {
          id
        }
      }
    )

    if (userUpdated) {
      const userById = await getUserById(id)
      return userById
    }
  } catch (error) {
    throw new Error('Error updating user!')
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getAllUsersBanned,
  getAllUsersNotBanned,
  getUserById,
  setBanned,
  setSommelier,
  setImage
}
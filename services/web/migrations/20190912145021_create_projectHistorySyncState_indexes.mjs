/* eslint-disable no-unused-vars */

import Helpers from './lib/helpers.mjs'

const tags = ['server-ce', 'server-pro', 'saas']

const indexes = [
  {
    key: {
      project_id: 1,
    },
    name: 'project_id_1',
  },
  {
    key: {
      expiresAt: 1,
    },
    name: 'expiresAt_1',
    expireAfterSeconds: 0,
  },
]

const migrate = async client => {
  const { db } = client

  await Helpers.addIndexesToCollection(db.projectHistorySyncState, indexes)
}

const rollback = async client => {
  const { db } = client

  try {
    await Helpers.dropIndexesFromCollection(db.projectHistorySyncState, indexes)
  } catch (err) {
    console.error('Something went wrong rolling back the migrations', err)
  }
}

export default {
  tags,
  migrate,
  rollback,
}

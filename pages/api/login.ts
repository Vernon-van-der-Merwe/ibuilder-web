import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

import { auth } from '../../src/config/firebaseConfig'
import { fire } from '../../src/config/firebaseConfig'

import * as UserService from '../../src/services/userService'

export default async function login(req, res) {
  const { email, id } = JSON.parse(req.body)
  try {
    let user = await UserService.get(fire, id)
    if (!user) {
      user = await UserService.create(fire, { id, email, name: email, role: "employee" })
    }
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ err })
  }
}

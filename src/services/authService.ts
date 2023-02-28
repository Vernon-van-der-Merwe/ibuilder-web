/* eslint-disable react-hooks/rules-of-hooks */
import {
  showError,
  showSuccess,
  showInfo,
} from "./notificationService";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NextRouter } from "next/router";
import * as UserService from "./userService";
import { auth } from '../../src/config/firebaseConfig'
import { fire } from '../../src/config/firebaseConfig'


export async function getUser(email, id) {
  try {
    let user = await UserService.get(fire, id)
    if (!user) {
      user = await UserService.create(fire, { id, email, name: email, role: "employee" })
    }
    return user
  } catch (err) {
    handleFirebaseError(err)
  }
}

export const login = async (auth, email: string, password: string, router: NextRouter) => {
  try {
    let response = await signInWithEmailAndPassword(auth, email, password)
    router.push('/dashboard')
    return response
  } catch (error) {
    handleFirebaseError(error)
  }
};

export const register = async (name, email, password, router, setLoading) => {
  setLoading(true)

  const res = await fetch("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password })
  })

  if (res.status !== 200) {
    handleError(res)
    setLoading(false)
    return
  }

  showSuccess("Profile created!", "Whoopty do!");
  showInfo("Please log in!", "Lets get started");

  router.push("/dashboard");
};

function handleError(error) {
  if (error.status == 500) {
    showError("Oops!", "Something went wrong 👀");
  } else {
    showError("Oops!", "Something went wrong 👀");
  }
}

function handleFirebaseError(res: Response) {
    showError("Oops!", "Something went wrong 👀");
}

// interface User {
//   name: string
//   id: number
// }

import { Session, AuthError } from "@supabase/supabase-js"
import { ValueOf } from "next/dist/shared/lib/constants"
import { Dispatch, SetStateAction } from "react"

type SIGN_IN = 'sign_in'
type SIGN_UP = 'sign_up'
type FORGOTTEN_PASSWORD = 'forgotten_password'
type UPDATE_PASSWORD = 'update_password'

export interface IViews {
  SIGN_IN: SIGN_IN
  SIGN_UP: SIGN_UP
  FORGOTTEN_PASSWORD: FORGOTTEN_PASSWORD
  UPDATE_PASSWORD: UPDATE_PASSWORD
}

export type Views = ValueOf<IViews>

export interface IAuthContext {
 initial:  boolean
 session: Session | null 
 user:    User | null
 view:    Views
 setView: Dispatch<SetStateAction<Views>>
 signOut: () => Promise<{ error: AuthError | null }>
}

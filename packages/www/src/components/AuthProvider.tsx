
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Session, User } from '@supabase/auth-helpers-react'
import { IAuthContext, IViews, Views } from '@/types/common/main'

// * REFERENCE FOR THIS *
// https://github.com/mryechkin/nextjs-supabase-auth/tree/main/src/components

export const EVENTS = {
  PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
  SIGNED_OUT: 'SIGNED_OUT',
  USER_UPDATED: 'USER_UPDATED',
}

export const VIEWS: IViews = {
  SIGN_IN: 'sign_in',
  SIGN_UP: 'sign_up',
  FORGOTTEN_PASSWORD: 'forgotten_password',
  // MAGIC_LINK: 'magic_link',
  UPDATE_PASSWORD: "update_password",
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = (props:any) => {
  const supabase = useSupabaseClient()
  const [session, setSession] = useState<IAuthContext["session"]>(null)
  const [initial, setInitial] = useState<IAuthContext["initial"]>(true)
  const [user, setUser] = useState<IAuthContext["user"]>(null)
  const [view, setView] = useState<Views>(VIEWS.SIGN_IN)
  const router = useRouter()
  const { accessToken, ...rest } = props

  useEffect(() => {
    async function getActiveSession() {
      const {
        data: { session: activeSession },
      } = await supabase.auth.getSession()
      setSession(activeSession)
      setUser(activeSession?.user ?? null)
      setInitial(false)
    }
    getActiveSession()

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh()
      }

      setSession(currentSession)
      setUser(currentSession?.user ?? null)

      switch (event) {
        case EVENTS.PASSWORD_RECOVERY:
          setView(VIEWS.UPDATE_PASSWORD)
          break
        case EVENTS.SIGNED_OUT:
        case EVENTS.USER_UPDATED:
          setView(VIEWS.SIGN_IN)
          break
        default:
      }
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      view,
      setView,
      signOut: () => supabase.auth.signOut(),
    }
  }, [initial, session, user, view])

  return <AuthContext.Provider value={value} {...rest} />
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
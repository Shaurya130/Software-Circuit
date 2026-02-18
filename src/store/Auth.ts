import { create } from "zustand";  // used to create a global store
import { immer } from "zustand/middleware/immer"; //  update state directly without returning new objects
import { persist } from "zustand/middleware"; // keeps data saved even after refresh (via localStorage)

import { AppwriteException, ID, Models } from "appwrite"
import { account } from "@/models/client/config"

// custom user preferences (can add more fields later if needed)
export interface UserPrefs {
  reputation: number
}

// structure of my auth store
interface IAuthStore {
  session: Models.Session | null; // appwrite session
  jwt: string | null; // appwrite jwt token
  user: Models.User<UserPrefs> | null; // logged in user + prefs
  hydrated: boolean; // to check if store is loaded from localStorage

  setHydrated(): void;
  verfiySession(): Promise<void>;
  login(email: string, password: string): Promise<{ success: boolean; error?: AppwriteException | null }>;
  createAccount(name: string, email: string, password: string): Promise<{ success: boolean; error?: AppwriteException | null }>;
  logout(): Promise<void>;
}

// zustand store for auth stuff
export const useAuthStore = create<IAuthStore>()(
  persist( // saves auth state in localStorage
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      // once state is loaded from storage, mark it as ready
      setHydrated() {
        set({ hydrated: true })
      },

      // checks if there's already a logged-in session
      async verfiySession() {
        try {
          const session = await account.getSession("current")
          set({ session })
        } catch (error) {
          console.log(error)
        }
      },

      // handles login
      async login(email: string, password: string) {
        try {
          // create a session
          const session = await account.createEmailPasswordSession(email, password)

          // get user info + jwt at the same time
          const [user, { jwt }] = await Promise.all([
            account.get<UserPrefs>(),
            account.createJWT()
          ])

          // if user has no reputation yet, set it to 0
          if (!user.prefs?.reputation) {
            await account.updatePrefs<UserPrefs>({ reputation: 0 })
          }

          // update store with user, session, and jwt
          set({ session, user, jwt })
          return { success: true }

        } catch (error) {
          console.log(error)
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          }
        }
      },

      // handles signup
      async createAccount(name: string, email: string, password: string) {
        try {
          await account.create(ID.unique(), email, password, name)
          return { success: true }
        } catch (error) {
          console.log(error)
          return {
            success: false,
            error: error instanceof AppwriteException ? error : null,
          }
        }
      },

      // logout and clear everything
      async logout() {
        try {
          await account.deleteSessions()
          set({ session: null, jwt: null, user: null })
        } catch (error) {
          console.log(error)
        }
      },
    })),
    {
      name: "auth", // name of localStorage key
      onRehydrateStorage() {
        // runs after state is loaded from localStorage
        return (state, error) => {
          if (!error) state?.setHydrated()
        }
      }
    }
  )
)

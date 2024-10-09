//File for declaring global types like Env files etc...

declare global {
    namespace NodeJS {
      interface ProcessEnv {
        MONGO_URL:string,
        SECRET:string,
        ADMIN_SECRET:string        
      }
    }
  }

export {}
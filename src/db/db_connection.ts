import dotenv from 'dotenv'
import pgPromise from 'pg-promise';
dotenv.config()
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
    }
  }
}


const pgp = pgPromise();
export const db = pgp('postgresql://postgres:gec2*fGfCDAC64BgdD2Af3BGA23eC6f5@viaduct.proxy.rlwy.net:16863/railway');

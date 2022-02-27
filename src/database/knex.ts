import { knex, Knex} from "knex";
import knexfile from "../../knexfile";


const environment = process.env.NODE_ENV;
const knexConfig: Knex.Config = knexfile[environment];



export default knex(knexConfig);
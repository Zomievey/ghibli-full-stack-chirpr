import { Query } from "./index";

const insert = (name, email, password) => Query("insert into users (name, email, password) values (?, ?, ?)", [name, email, password]);

export default {
    insert
}
import {writable} from "svelte/store";
import {getCookie} from "svelte-cookie";

const token = writable("")
const logedin = writable(false)

export {token, logedin}
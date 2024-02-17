import {writable} from "svelte/store";
import {getCookie} from "svelte-cookie";

const token = writable("")

export default token
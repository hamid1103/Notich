<script>
    import {lurl} from "../lib/url.js";
    import {logedin, token} from "../lib/auth.js";
    import {deleteCookie} from "svelte-cookie";
    import {navigate} from "svelte-routing";
    import {BroadcastMessage} from "../lib/Tools.js";
    import Editor from "./Components/Editor.svelte";
    import Sidebar_Popout from "./Components/Sidebar_Popout.svelte";

    export let id;
    let saveStatus = "", AIStatus = "";
    let forbidden = false;

    const getNote = async () => {
        const response = await fetch(`${lurl}/api/notes/${id}`, {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${$token}`},
        })
        if (!response.ok) {
            console.log(response.status)
            if (response.status === 401) {
                deleteCookie('loginBT')
                token.set('')
                logedin.set(false)
                BroadcastMessage.set({
                    "Color": "red",
                    "Show": true,
                    "Message": "You are not logged in!"
                })
                navigate('/SignIn')
            } else if (response.status === 403) {
                throw new Error("You do not have access to this note!")
            }
        } else {
            let data = response.json()
            console.log(data)
            return data;
        }
    }

    let notePromise = getNote()

</script>

{#await notePromise}
    <div class="h-screen w-screen flex flex-col justify-center align-middle items-center">
        <svg class="animate-spin -ml-1 mr-3 h-1/6 w-1/6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
             viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
{:then ed}
    <div class="flex justify-center w-screen">
        <div class="sticky top-1 bg-gray-100 rounded mb-4 mt-4 w-9/12 p-1">
            <input class="font-bold font-sans bg-gray-100 max-w-sm text-ellipsis" value="{ed.note.name}">

        </div>
    </div>
    <div class="flex flex-col justify-center align-middle items-center">
        <Editor data={ed.note}/>
    </div>

    <Sidebar_Popout direction="left">
        <h2 class="text-neutral-900 font-bold text-center">Advanced AI Settings</h2>

    </Sidebar_Popout>

    <Sidebar_Popout direction="right">
        <h2 class="text-neutral-900 font-bold text-center">Chat with the bot</h2>
    </Sidebar_Popout>
{:catch error}
    <div class="h-screen w-screen flex flex-col justify-center align-middle items-center">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="256" height="256" viewBox="0 0 256 256" xml:space="preserve">

<defs>
</defs>
            <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
	<path d="M 45 57.469 L 45 57.469 c -1.821 0 -3.319 -1.434 -3.399 -3.252 L 38.465 23.95 c -0.285 -3.802 2.722 -7.044 6.535 -7.044 h 0 c 3.813 0 6.82 3.242 6.535 7.044 l -3.137 30.267 C 48.319 56.036 46.821 57.469 45 57.469 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(229,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                <circle cx="45" cy="67.67" r="5.42" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(229,0,0); fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
                <path d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z M 45 6 C 23.495 6 6 23.495 6 45 s 17.495 39 39 39 s 39 -17.495 39 -39 S 66.505 6 45 6 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(229,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
</g>
</svg>
        <h2 class="font-bold text-red-50 text-2xl">{error}</h2>

    </div>
{/await}


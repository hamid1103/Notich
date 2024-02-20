<script>
    import {logedin, token} from "../lib/auth.js";
    import {navigate, link} from "svelte-routing";
    import {lurl} from "../lib/url.js";
    import {deleteCookie} from "svelte-cookie";
    import {BroadcastMessage} from "../lib/Tools.js";

    console.log($logedin)

    if (!$logedin)
        navigate("/SignIn", {replace: true})
    const getNotes = async () => {
        const response = await fetch(`${lurl}/api/notes/`, {
            method: "GET",
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${$token}`},
        })
        if (!response.ok) {
            console.log(response.status)
            if (response.status === 401) {
                logedin.set(false)
                deleteCookie('loginBT')
                token.set('')
                navigate('/SignIn')
            }
        } else {
            let data = response.json()
            console.log(data)
            return data
        }
    }

    let notesPromise = getNotes()

</script>

<div class="w-screen h-screen">

    {#await notesPromise}
        <div class="h-screen w-screen flex flex-col justify-center align-middle items-center">
            <svg class="animate-spin -ml-1 mr-3 h-1/6 w-1/6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    {:then notes}
        <div class="p-5 flex space-x-6 justify-center">
        {#each notes as note}
            <a href="/app/{note.Note._id}" use:link>
                <div role="button" class="hover:bg-gray-300 active:bg-gray-600 cursor-pointer bg-gray-100 min-w-56 min-h-12 rounded text-center flex flex-col justify-center">
                    {note.Note.name}
                </div>
            </a>
        {/each}
        </div>
    {:catch error}
    {/await}

</div>
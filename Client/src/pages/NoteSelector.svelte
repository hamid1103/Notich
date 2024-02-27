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
    let ModalNewNote = false;

    let newNoteName = "";
    let newNoteFetch = async (e) => {
        e.preventDefault()
        console.log("newNote")
        if (newNoteName !== "") {
            let data = {
                name: newNoteName
            }
            let config = {
                method: "POST",
                mode: "cors",
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${$token}`},
                body: JSON.stringify(data)
            }
            await fetch(`${lurl}/api/notes/`, config).then((response) => {
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
                    }
                }
                return response.json();
            }).then((data) => {
                navigate(`/app/${data.newNote._id}`)
            })
        }

        //Send Data
        //If good -> redirect to new note
        //If bad -> Show Toaster
    }

</script>

{#if ModalNewNote}
    <div class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0" on:click={(e)=>{
        if (e.currentTarget !== e.target) return;
        ModalNewNote = false
    }}>
        <div class="modal-overlay pointer-events-none fixed w-full h-full bg-gray-900 opacity-50"></div>
        <div class="bg-white w-full lg:h-max lg:w-1/2  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto">
            <div class="content p-8">
                <form on:submit="{newNoteFetch}">
                    <div class="flex flex-col space-y-3">
                        <div class="flex flex-col space-y-3">
                            <label for="name">Name</label>
                            <input id="name" required bind:value={newNoteName} name="name" type="text"
                                   class="border-2 rounded"/>
                        </div>
                        <div>
                            <input type="submit" value="Create"
                                   class="bg-green-400 rounded p-3 hover:bg-green-100 hover:border-green-400 cursor-pointer">
                        </div>
                    </div>

                </form>
            </div>
        </div>
    </div>
{/if}

<div class="w-screen h-screen">

    {#await notesPromise}
        <div class="h-screen w-screen flex flex-col justify-center align-middle items-center">
            <svg class="animate-spin -ml-1 mr-3 h-1/6 w-1/6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                 viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
    {:then notes}
        <div class="p-5 flex space-x-6 justify-center">
            {#each notes as note}
                <a href="/app/{note.Note._id}" use:link>
                    <div role="button"
                         class="hover:bg-gray-300 active:bg-gray-600 cursor-pointer bg-gray-100 min-w-56 min-h-12 rounded text-center flex flex-col justify-center">
                        {note.Note.name}
                    </div>
                </a>
            {/each}
            <div role="button"
                 on:click={()=>{ModalNewNote = !ModalNewNote}}
                 class="hover:bg-gray-600 active:bg-gray-750 cursor-pointer bg-gray-950 min-w-56 min-h-12 rounded text-center text-white text-4xl flex flex-col justify-center">
                +
            </div>
        </div>
    {:catch error}
    {/await}

</div>
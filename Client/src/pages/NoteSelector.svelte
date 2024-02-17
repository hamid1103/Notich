<script>
    import {logedin, token} from "../lib/auth.js";
    import {navigate} from "svelte-routing";
    import {lurl} from "../lib/url.js";

    console.log($logedin)

    if(!$logedin)
        navigate("/SignIn", {replace:true})
    const getNotes = async ()=>{
        const response = await fetch(`${lurl}/api/notes/`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${$token}`},
        })
        let data = response.json()
        console.log(data)
        return data
        //return response.json()
    }

    let notesPromise = getNotes()

</script>

{#await notesPromise}
    {:then notes}
    {#each notes as note}
        <div>
            {note.Note.name}
        </div>
    {/each}
    {:catch error}
{/await}
<script>
    import {logedin} from "../lib/auth.js";
    import {navigate} from "svelte-routing";
    import {lurl} from "../lib/url.js";

    console.log($logedin)

    if(!$logedin)
        navigate("/SignIn", {replace:true})
    const getNotes = async ()=>{
        const response = await fetch(`${lurl}/api/notes/`)
    }

    let notesPromise = getNotes()

</script>

{#await notesPromise}
    {:then notes}
    {:catch error}
{/await}
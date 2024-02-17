<script>
    import {fly, fade} from "svelte/transition";
    import {navigate, Router, Link, Route} from "svelte-routing";
    import {getCookie, setCookie, deleteCookie} from 'svelte-cookie';

    import Home from "./pages/Home.svelte";

    import "./app.css"
    import SignIn from "./pages/SignIn.svelte";
    import SignUp from "./pages/SignUp.svelte";
    import { token,logedin} from "./lib/auth.js";
    import NoteSelector from "./pages/NoteSelector.svelte";

    //Check Login
    let loCo = getCookie('loginBT')

    export let url = "";
    if (loCo !== "") {
        logedin.set(true)
        token.set(loCo)
        navigate("/app")
    }

</script>

<Router {url}>
        <Route path="/">
            <div>
                <Home/>
            </div>
        </Route>
        <Route path="/SignIn">
            <div>
                <SignIn/>
            </div>
        </Route>
        <Route path="/SignUp">
            <div>
                <SignUp/>
            </div>
        </Route>
        <Route path="/app">
            <div>
                <NoteSelector/>
            </div>
        </Route>
        <Route path="/app/:id">
            <div>
            </div>
        </Route>
</Router>
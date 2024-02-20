<script>
    //Styling
    import "./app.css"

    //Functional
    import {token, logedin} from "./lib/auth.js";
    import {navigate, Router, Link, link, Route} from "svelte-routing";
    import {getCookie, setCookie, deleteCookie} from 'svelte-cookie';

    //Components
    import Home from "./pages/Home.svelte";
    import SignIn from "./pages/SignIn.svelte";
    import SignUp from "./pages/SignUp.svelte";
    import NoteSelector from "./pages/NoteSelector.svelte";
    import Toaster from "./pages/Components/Toaster.svelte";
    import NoteWorkspace from "./pages/NoteWorkspace.svelte";

    //Check Login
    let loCo = getCookie('loginBT')

    export let url = window.location.pathname;
    if (loCo.length > 0) {
        logedin.set(true)
        token.set(loCo)
    }

</script>

<Toaster/>

<Router {url}>

    <Route path="/">
        <div>
            <header class="bg-gray-950 flex flex-col">
                <nav class="w-full sticky flex-grow lg:flex lg:items-center lg:w-auto min-h-12">
                    <div class="flex flex-1 space-x-6 text-white text-xl pl-3">
                        <a href="/#about" class="hover:text-amber-300 hover:underline hover:underline-offset-4">About</a>
                        <a href="/#get_started" class="hover:text-amber-300 hover:underline hover:underline-offset-4">Get
                            Started</a>
                        <a href="/#contact"
                           class="hover:text-amber-300 hover:underline hover:underline-offset-4">Contact</a>
                    </div>


                    <div class="flex space-x-6 text-white text-xl pr-3">
                        {#if $logedin}
                            <div class="bg-red-700 text-white p-2 hover:bg-red-500 rounded cursor-pointer" on:click={()=>{
                        token.set('')
                        logedin.set(false)
                        deleteCookie('loginBT')
                        navigate('/')
                    }}>
                                Logout
                            </div>
                        {:else }
                            <Link to="/SignIn">
                                <div class="bg-gray-700 text-white p-2 hover:bg-gray-600 rounded">
                                    Sign In
                                </div>
                            </Link>

                            <Link to="/SignUp">
                                <div class="bg-gray-200 hover:bg-gray-100 text-neutral-900 p-2 rounded">
                                    Sign Up
                                </div>
                            </Link>
                        {/if}

                    </div>
                </nav>
            </header>

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
        <header class="bg-gray-950 flex flex-col">
            <nav class="w-full sticky flex-grow lg:flex lg:items-center lg:w-auto min-h-12">
                <div class="flex flex-1 space-x-6 text-white text-xl pl-3">

                </div>

                <div class="flex space-x-6 text-white text-xl pr-3">
                    {#if $logedin}
                        <div class="bg-red-700 text-white p-2 hover:bg-red-500 rounded cursor-pointer" on:click={()=>{
                        token.set('')
                        logedin.set(false)
                        deleteCookie('loginBT')
                        navigate('/')
                    }}>
                            Logout
                        </div>
                    {:else }
                        <Link to="/SignIn">
                            <div class="bg-gray-700 text-white p-2 hover:bg-gray-600 rounded">
                                Sign In
                            </div>
                        </Link>

                        <Link to="/SignUp">
                            <div class="bg-gray-200 hover:bg-gray-100 text-neutral-900 p-2 rounded">
                                Sign Up
                            </div>
                        </Link>
                    {/if}

                </div>
            </nav>
        </header>

        <NoteSelector/>
    </Route>
    <Route path="/app/:id" let:params>
        <header class="bg-gray-950 flex flex-col">
            <nav class="w-full sticky flex-grow lg:flex lg:items-center lg:w-auto min-h-12">
                <div class="flex flex-1 space-x-6 text-white text-xl pl-3">
                    <a use:link href="/app" class="font-bold text-5xl text-center hover:text-gray-600 pl-4"> &#8592 </a>
                </div>

                <div class="flex space-x-6 text-white text-xl pr-3">
                    {#if $logedin}
                        <div class="bg-red-700 text-white p-2 hover:bg-red-500 rounded cursor-pointer" on:click={()=>{
                        token.set('')
                        logedin.set(false)
                        deleteCookie('loginBT')
                        navigate('/')
                    }}>
                            Logout
                        </div>
                    {:else }
                        <Link to="/SignIn">
                            <div class="bg-gray-700 text-white p-2 hover:bg-gray-600 rounded">
                                Sign In
                            </div>
                        </Link>

                        <Link to="/SignUp">
                            <div class="bg-gray-200 hover:bg-gray-100 text-neutral-900 p-2 rounded">
                                Sign Up
                            </div>
                        </Link>
                    {/if}

                </div>
            </nav>
        </header>
        <NoteWorkspace id="{params.id}"/>
    </Route>
</Router>
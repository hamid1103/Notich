<script>
    import {lurl} from "../lib/url.js";
    import {setCookie} from "svelte-cookie";
    import token from "../lib/auth.js";
    import FormLine from "./Components/FormLine.svelte";
    import {navigate} from "svelte-routing";

    let username = ""
    let password = ""

    const SignIn = async () =>{
        let body = {
            "username":username,
            "password":password
        }
        const response = await fetch(lurl+"/api/auth/login", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            if(!res.token){
                return
            }
            setCookie('loginBT', res.token, 30, true)
            token.set(res.token)
            navigate("/app")
        })

    }
</script>

<div class="w-screen h-screen flex justify-center items-center">
    <div class="rounded w-1/3 h-1/2 bg-white p-12">
        <form class="flex flex-col" on:submit|preventDefault={SignIn}>
            <FormLine>
                <label for="username">Username</label>
                <div class="mt-2">
                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input required bind:value={username} type="text" name="username" id="username" autocomplete="username" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="username">
                    </div>
                </div>
            </FormLine>

            <FormLine>
                <label for="password">Password</label>
                <div class="mt-2">
                    <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input required bind:value={password} type="password" name="password" id="password" autocomplete="password" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                    </div>
                </div>
            </FormLine>

            <div class="flex pt-6 justify-center">
                <input type="submit" value="Sign In" class="text-center min-w-2 max-w-24 p-4 rounded bg-gray-600 hover:bg-gray-500 cursor-pointer">
            </div>
        </form>
    </div>
</div>
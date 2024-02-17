<script>
    import {Link} from "svelte-routing";
</script>

<svelte:head>
    <title>Notich - Homepage</title>
</svelte:head>

<header class="bg-gray-950 flex flex-col">
    <noscript>
        <div class="bg-red-700 text-center text-white">Javascript is not enabled! Please enable it in order for this
            website to work correctly!
        </div>
    </noscript>

    <nav class="w-full sticky flex-grow lg:flex lg:items-center lg:w-auto min-h-12">
        <div class="flex flex-1 space-x-6 text-white text-xl pl-3">
            <a href="#about" class="hover:text-amber-300 hover:underline hover:underline-offset-4">About</a>
            <a href="#get_started" class="hover:text-amber-300 hover:underline hover:underline-offset-4">Get Started</a>
            <a href="#contact" class="hover:text-amber-300 hover:underline hover:underline-offset-4">Contact</a>
        </div>

        <div class="flex space-x-6 text-white text-xl pr-3">
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

        </div>
    </nav>
</header>

<header class="BG-Custom_Gradiant flex flex-col text-center items-center pt-3">
    <div class="flex justify-between w-1/2">
        <div class="flex flex-col justify-center">
            <h1 class="text-white xl:text-5xl xl:max-w-6xl font-sans font-bold md:max-w-4xl md:text-3xl pb-3">
                Notich
            </h1>
            <div class="text-center sm:text-xl md:text-2xl pb-3">
                <p class="text-white">
                    Take notes <span class="text-red-400">easily</span> and have an <span class="text-blue-500">AI teacher</span>
                    berate you for your <span class="text-amber-800">💩s^@$💩</span> notes!
                </p>
            </div>
            <div class="flex justify-center">
                <Link to="/app">
                    <div class="flex flex-col items-center align-middle justify-center w-32 h-11 bg-gray-50 rounded">
                        <span>Get Started!</span>
                    </div>
                </Link>


            </div>

        </div>

        <div class="max-w-xl">
            <img class="object-contain" src="/Anime_Teacher.png">
        </div>
    </div>
</header>

<div id="about" class="bg-gray-900 flex justify-center text-5xl text-white pb-7">
    <div class="flex flex-col text-center">
        <h2>About</h2>
        <div class="text-center sm:text-xl md:text-2xl pb-3">
            <p class="text-white max-w-6xl">
                Notich is an note taking app with an AI teacher assistant. She'll try to give you additional information
                which may be helpful, spellcheck your notes and check their validity!
                <br>
                The app is designed to give you all the tools you'll need to boost the productivity of your notes.
            </p>
        </div>
    </div>

</div>

<div id="get_started" class="bg-gray-900 flex justify-center text-5xl text-white pb-7">
    <div class="flex flex-col">
        <h2 class="pb-3 text-center">Get Started</h2>
        <div class="text-center sm:text-xl md:text-2xl pb-3">
            <p class="text-white">
                To get started, use the button bellow and login/signup!
            </p>
        </div>
        <div class="flex justify-center">
            <Link to="/app">
                <div class="flex flex-col items-center align-middle justify-center w-32 text-xl text-neutral-900 h-11 bg-gray-50 rounded">
                    Get Started!
                </div>
            </Link>
        </div>
    </div>
</div>

<div id="contact" class="bg-gray-900 flex justify-center text-5xl text-white pb-7 text-center">
    <div class="flex flex-col">
        <h2>Contact</h2>
        <div class="text-center sm:text-xl md:text-2xl pb-3">
            <span class="text-red-500">Email: </span> corvo@arcadianflame.nl
        </div>
    </div>
</div>
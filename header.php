<!DOCTYPE html>
<html lang="en">

<head>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="preload" as="image" href="<?= $root ?>sewa-logo.svg" />
    <link rel="preload" as="image" href="<?= $root ?>active-seniors-in-wellness-setting.jpg" />
    <link rel="preload" href="<?= $root ?>senior-adults-active-lifestyle.jpg" as="image" />
    <link rel="stylesheet" href="<?= $root ?>_next/static/chunks/6bd901fb0cea67fe.css" data-precedence="next" />
    <link rel="preload" as="script" fetchPriority="low" href="<?= $root ?>_next/static/chunks/1eadd8d9ec26edf9.js" />
    
    <script src="<?= $root ?>_next/static/chunks/911a6bc735af97f3.js" async=""></script>
    <script src="<?= $root ?>_next/static/chunks/turbopack-348ac5a662b51256.js" async=""></script>
    <script src="<?= $root ?>_next/static/chunks/3f626e3531cd0d9e.js" async=""></script>
    <script src="<?= $root ?>_next/static/chunks/aa2a7793dfecc554.js" async=""></script>
    <script src="<?= $root ?>_next/static/chunks/16ad6046bfc0f010.js" async=""></script>
    <script src="<?= $root ?>_next/static/chunks/91b4f0f28f9e2af5.js" async=""></script>
    <title><?= $pageTitle ?></title>
    <meta name="description" content="<?= $pageDescription ?>" />
    <link rel="shortcut icon" href="<?= $root ?>sewa-logo.svg" />
    <link rel="icon" href="<?= $root ?>sewa-logo.svg" />
    <link rel="apple-touch-icon" href="<?= $root ?>sewa-logo.svg" />
    <script src="<?= $root ?>_next/static/chunks/a6dad97d9634a72d.js" noModule=""></script>
    <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</head>

<?php
$currentPath = basename(dirname($_SERVER['PHP_SELF']));
if ($currentPath === '/' || $currentPath === '\\' || $currentPath === '.') $currentPath = '';
?>

<body style="--font-sans:&#x27;Poppins&#x27;, Arial, sans-serif;--font-serif:&#x27;Merriweather&#x27;, Georgia, serif"
    class="antialiased bg-slate-950 text-slate-100">
    <div hidden=""><!--$--><!--/$--></div>
    <main>
        <header class="fixed top-0 left-0 right-0 z-50">
            <nav class="bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
                <div class="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between"><a
                        class="flex items-center group" href="<?= $root ?>">
                        <div class="relative w-32 h-12 overflow-visible"><img alt="SEWA Expo Logo" decoding="async"
                                data-nimg="fill" class="object-contain object-left scale-150 origin-left"
                                style="position:absolute;height:100%;width:100%;left:0;top:0;right:0;bottom:0;color:transparent"
                                src="<?= $root ?>sewa-logo.svg" /></div>
                    </a>
                    <div class="hidden md:flex items-center gap-8"><a
                            class="text-sm font-sans tracking-wide transition-colors duration-300 relative group font-medium <?= $currentPath === '' ? 'text-[#D4A574]' : 'text-[#1A4D3E] hover:text-[#D4A574]' ?>"
                            href="<?= $root ?>">Home<span
                                class="absolute bottom-0 left-0 h-0.5 bg-[#D4A574] transition-all duration-300 <?= $currentPath === '' ? 'w-full' : 'w-0 group-hover:w-full' ?>"></span></a><a
                            class="text-sm font-sans tracking-wide transition-colors duration-300 relative group font-medium <?= $currentPath === 'about' ? 'text-[#D4A574]' : 'text-[#1A4D3E] hover:text-[#D4A574]' ?>"
                            href="<?= $root ?>about/">About<span
                                class="absolute bottom-0 left-0 h-0.5 bg-[#D4A574] transition-all duration-300 <?= $currentPath === 'about' ? 'w-full' : 'w-0 group-hover:w-full' ?>"></span></a>
                        <div class="relative group"><button
                                class="text-sm font-sans tracking-wide transition-colors flex items-center gap-1 font-medium cursor-pointer <?= $currentPath === 'exhibitor-profile' ? 'text-[#D4A574]' : 'text-[#1A4D3E] hover:text-[#D4A574]' ?>">Exhibition<span
                                    class="text-xs">▼</span></button>
                            <div
                                class="absolute left-0 mt-0 w-56 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                                <a class="block px-4 py-3 text-sm hover:bg-[#1A4D3E]/5 hover:text-[#D4A574] transition-colors text-[#1A4D3E]"
                                    href="#">Exhibitor Profile</a>
                            </div>
                        </div><a
                            class="text-sm font-sans tracking-wide transition-colors duration-300 relative group font-medium <?= $currentPath === 'visitor' ? 'text-[#D4A574]' : 'text-[#1A4D3E] hover:text-[#D4A574]' ?>"
                            href="<?= $root ?>visitor/">Visitor<span
                                class="absolute bottom-0 left-0 h-0.5 bg-[#D4A574] transition-all duration-300 <?= $currentPath === 'visitor' ? 'w-full' : 'w-0 group-hover:w-full' ?>"></span></a><a
                            class="text-sm font-sans tracking-wide transition-colors duration-300 relative group font-medium <?= $currentPath === 'registration' ? 'text-[#D4A574]' : 'text-[#1A4D3E] hover:text-[#D4A574]' ?>"
                            href="<?= $root ?>registration/">Registration<span
                                class="absolute bottom-0 left-0 h-0.5 bg-[#D4A574] transition-all duration-300 <?= $currentPath === 'registration' ? 'w-full' : 'w-0 group-hover:w-full' ?>"></span></a><a
                            class="text-sm font-sans tracking-wide transition-colors duration-300 relative group font-medium <?= $currentPath === 'contact' ? 'text-[#D4A574]' : 'text-[#1A4D3E] hover:text-[#D4A574]' ?>"
                            href="<?= $root ?>contact/">Contact<span
                                class="absolute bottom-0 left-0 h-0.5 bg-[#D4A574] transition-all duration-300 <?= $currentPath === 'contact' ? 'w-full' : 'w-0 group-hover:w-full' ?>"></span></a>
                    </div>
                    <div class="hidden md:flex gap-3"><a href="<?= $root ?>registration/"><button
                                class="border-2 border-[#1A4D3E] text-[#1A4D3E] px-6 py-2.5 rounded-lg text-sm font-sans font-medium tracking-wide hover:bg-[#1A4D3E] hover:text-white transition-colors duration-300 cursor-pointer">Register</button></a><a href="<?= $root ?>assets/sewaexpo_brochure.pdf" download><button
                                class="bg-[#D4A574] text-[#0F1419] px-6 py-2.5 rounded-lg text-sm font-sans font-medium tracking-wide hover:bg-[#E67E3B] transition-colors duration-300 cursor-pointer">Brochure</button></a>
                    </div><button class="md:hidden text-[#1A4D3E]"><svg xmlns="http://www.w3.org/2000/svg" width="24"
                            height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu w-6 h-6">
                            <line x1="4" x2="20" y1="12" y2="12"></line>
                            <line x1="4" x2="20" y1="6" y2="6"></line>
                            <line x1="4" x2="20" y1="18" y2="18"></line>
                        </svg></button>
                </div>
            </nav>
        </header>

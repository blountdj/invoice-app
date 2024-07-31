document.addEventListener('DOMContentLoaded', function() {
    console.log('home.js loaded')

    const htmlElem = document.querySelector('html');
    const toggleImgWrapper = document.querySelector('.toggle-img-wrapper')
    const darkIcon = document.getElementById('toggle-dark')
    const lightIcon = document.getElementById('toggle-light')

    let currentMode = 'light';

    function toggleUpdate() {
        console.log('lightDarkToggle')

        darkIcon.classList.toggle('hidden')
        lightIcon.classList.toggle('hidden')

        if (currentMode === 'light') {
            darkIcon.style.display = 'block'
            lightIcon.style.display = 'none'
            currentMode = 'dark';
        } 
        if (currentMode === 'dark') {
            darkIcon.style.display = 'none'
            lightIcon.style.display = 'dark'
            currentMode = 'light';
        } 

    }


    function checkInitialMode() {
        if (htmlElem.classList.contains('dark-mode')) {
            toggleUpdate();
        }
    }

    function init() {

        checkInitialMode()

        toggleImgWrapper.addEventListener('click', toggleUpdate)
    }

    init()

})
document.addEventListener('DOMContentLoaded', function() {
    console.log('modeToggle.js loaded')

    const htmlElem = document.querySelector('html');
    const toggleImgWrapper = document.querySelector('.toggle-img-wrapper')
    const darkIcon = document.getElementById('toggle-dark')
    const lightIcon = document.getElementById('toggle-light')
    let currentMode = 'light'

    function toggleUpdate() {

        if (currentMode === 'light') {
            darkIcon.classList.toggle('hidden')     
            setTimeout(() => {
                darkIcon.style.display = 'none'
                lightIcon.style.display = 'block'
                setTimeout(() => {
                    lightIcon.classList.toggle('hidden')
                }, 10)
            }, 200)

            currentMode = 'dark';

        } else if (currentMode === 'dark') {
            lightIcon.classList.toggle('hidden')
            setTimeout(() => {
                lightIcon.style.display = 'none'
                darkIcon.style.display = 'block'
                setTimeout(() => {
                    darkIcon.classList.toggle('hidden')
                }, 10)
            }, 200)
   
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



function hrefFinder(){
    const magicElements = document.querySelectorAll('.magic-html');
    const cubeElements = document.querySelectorAll('.cube-html');
    const wheelElements = document.querySelectorAll('.wheel-html');
    const indexElements = document.querySelectorAll('.header__logo-wrapper');
    console.log(23)
    magicElements.forEach(element => {
        element.addEventListener('click', () => {
            window.location.href = 'magicBall.html';
        });
    });


    wheelElements.forEach(element => {
        element.addEventListener('click', () => {
            window.location.href = 'wheelOfFortune.html';
        });
    });



    cubeElements.forEach(element => {
        element.addEventListener('click', () => {
            window.location.href = 'cube.html';
        });
    });

    indexElements.forEach(element => {
        element.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    });
}



window.addEventListener('load', () => {
    hrefFinder()
});

window.addEventListener('resize', () => {
    hrefFinder()
});
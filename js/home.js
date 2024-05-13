
function changeImageSource() {
    var screenWidth = window.innerWidth;
    var firstImage = document.getElementById('first-image');
    var secondImage = document.getElementById('second-image');
    var thirtImage = document.getElementById('thirt-image');



    var firstItem = document.getElementById('first-item');
    var secondItem = document.getElementById('second-item');
    var thirtIten = document.getElementById('thirt-item');



    if (screenWidth < 960) {
        firstImage.src = './icons/white-realistic-dice-png.webp';
        secondImage.src = './icons/wheelOfFortune.png';
        thirtImage.src = './icons/magicBall.png';
        
        firstItem.classList.add('cube-html')
        secondItem.classList.add('wheel-html')
        thirtIten.classList.add('magic-html')

        firstItem.classList.remove('magic-html')
        secondItem.classList.remove('cube-html')
        thirtIten.classList.remove('wheel-html')

        firstImage.classList.add('cube-html')
        secondImage.classList.add('wheel-html')
        thirtImage.classList.add('magic-html')

        firstImage.classList.remove('magic-html')
        secondImage.classList.remove('cube-html')
        thirtImage.classList.remove('wheel-html')


    } else {
        firstImage.src = './icons/magicBall.png';
        secondImage.src = './icons/white-realistic-dice-png.webp';
        thirtImage.src = './icons/wheelOfFortune.png';

        firstItem.classList.add('magic-html')
        secondItem.classList.add('cube-html')
        thirtIten.classList.add('wheel-html')

        firstItem.classList.remove('cube-html')
        secondItem.classList.remove('wheel-html')
        thirtIten.classList.remove('magic-html')

        firstImage.classList.add('cube-html')
        secondImage.classList.add('wheel-html')
        thirtImage.classList.add('magic-html')

        firstImage.classList.remove('magic-html')
        secondImage.classList.remove('cube-html')
        thirtImage.classList.remove('wheel-html')

    }
}

window.addEventListener('load', () => {
    changeImageSource()
});

window.addEventListener('resize', () => {
    changeImageSource()
});
$(document).ready(function() {
    var cube = $('.cube');
    let historyStates = [];

    function activateAll() {
        const xRotation = getRandom(1, 12);
        const yRotation = getRandom(1, 12);

        cube.css('transform', `rotateX(${xRotation * 90}deg) rotateY(${yRotation * 90}deg)`);

        // Сохраняем новое состояние
        const newState = { x: xRotation * 90, y: yRotation * 90 };
        historyStates.push(newState);
        const newStateIndex = historyStates.length - 1;

        window.history.pushState({ index: newStateIndex }, '', `#${newStateIndex}`);
    }

    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    cube.on('click', activateAll);

    $(window).on('popstate', function(event) {
        cube.css('transition', 'transform 0s');
        if (event.originalEvent.state) {
            const stateIndex = event.originalEvent.state.index;
            const savedState = historyStates[stateIndex];

            cube.css('transform', `rotateX(${savedState.x}deg) rotateY(${savedState.y}deg)`);
        }
        setTimeout(function() {
            cube.css('transition', 'transform 1s');
        }, 100);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    VANTA.CLOUDS({
        el: "#vanta-background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        speed: 1.50,    
    });
    
    document.querySelector('.sound-button').addEventListener('click', () => {
        const audio = document.getElementById('sound-effect');
        audio.play();
        document.location.href = 'option-page-html.html';
    });
});

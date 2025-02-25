document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const bgMusic = document.getElementById('bgMusic');
    const dinnerDetails = document.getElementById('dinner-details');
    const timer = document.getElementById('timer');
    const testBtn = document.getElementById('testBtn');
    const continueBtn = document.getElementById('continueBtn');
    const videoContainer = document.querySelector('.video-container');
    const videoPlayer = document.getElementById('video-player');
    
    // Initialize Lottie animation
    const heartAnimation = lottie.loadAnimation({
        container: document.getElementById('heart-animation'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'https://lottie.host/e675e9d3-dddc-42df-8fdb-10e454c98f19/2frV9R4AWJ.json'
    });

    // Play background music on first interaction
    document.body.addEventListener('click', () => {
        bgMusic.play();
    }, { once: true });

    // Make the No button move away from cursor
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
        const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${x}px`;
        noBtn.style.top = `${y}px`;
    });

    function createHeartAnimation() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: fixed;
            font-size: 24px;
            user-select: none;
            cursor: default;
            animation: float 4s ease-in forwards;
        `;
        heart.style.left = Math.random() * window.innerWidth + 'px';
        heart.style.top = window.innerHeight + 'px';
        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 4000);
    }

    function startHeartAnimation() {
        for (let i = 0; i < 20; i++) {
            setTimeout(createHeartAnimation, i * 200);
        }
    }

    // Show dinner details when Yes is clicked
    yesBtn.addEventListener('click', () => {
        // Start heart animation
        startHeartAnimation();
        
        // Change background to a romantic gradient
        document.body.style.background = 'linear-gradient(135deg, #ff758c, #ff7eb3)';
        
        // Hide the proposal elements
        document.querySelector('.proposal h1').style.display = 'none';
        document.querySelector('.buttons').style.display = 'none';
        
        // Make video fullscreen and ensure it plays
        videoContainer.classList.add('fullscreen');
        videoPlayer.play().catch(e => console.log('Error playing video:', e));
    });

    // Listen for video end
    videoPlayer.addEventListener('ended', () => {
        videoContainer.style.display = 'none';
        showDinnerInvitation();
    });

    function showDinnerInvitation() {
        // Hide video container and heart animation
        videoContainer.style.display = 'none';
        document.getElementById('heart-animation').style.display = 'none';
        
        // Show dinner invitation
        dinnerDetails.style.display = "block";
        dinnerDetails.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(255, 255, 255, 0.95);
            padding: 2em;
            border-radius: 20px;
            box-shadow: 0 0 30px rgba(255, 105, 180, 0.3);
            text-align: center;
            min-width: 80vw;
            max-width: 90vw;
            z-index: 1000;
        `;

        // Set up the static content first
        dinnerDetails.innerHTML = `
            <div class="fancy-invitation">
                <h2 style="font-size: 2.5em; color: #ff1493; margin-bottom: 0.5em;">Our Valentine's Date ❤️</h2>
                <p style="font-size: 1.8em; color: #ff69b4;"></p>
                <div style="margin: 2em 0; padding: 1em; background: rgba(255, 105, 180, 0.1); border-radius: 15px;">
                    <p style="font-size: 1.5em; color: #ff1493;">Until next Valentine's:</p>
                    <div id="countdown" style="font-size: 2em; color: #ff1493; margin: 0.5em 0;"></div>
                </div>
                <p style="font-size: 1.5em; color: #ff69b4; font-style: italic;">I can't wait to see you! 💝</p>
            </div>
        `;

        // Make sure the dinner details are visible and not hidden
        dinnerDetails.classList.remove('hidden');

        const countdownElement = document.getElementById('countdown');
        
        function updateCountdown() {
            const timeLeft = calculateTimeUntilDinner();
            countdownElement.textContent = `${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
        }

        // Update countdown immediately and then every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    function calculateTimeUntilDinner() {
        const now = new Date();
        const dinnerTime = new Date();
        dinnerTime.setHours(0, 0, 0); // 12:00am
        dinnerTime.setDate(2, 14, 2026);
        
        const diff = dinnerTime - now;
        
        if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        return { hours, minutes, seconds };
    }

    // Add event listener to test button
    testBtn.addEventListener('click', () => {
        showDinnerInvitation();
    });
});

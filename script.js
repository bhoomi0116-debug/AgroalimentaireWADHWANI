// Handle button click
function handleButtonClick() {
    alert('Welcome! Start building your amazing project now.');
    console.log('Get Started button clicked');
}

// Handle form submission with GetForm integration
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const successMessage = document.getElementById('successMessage');

    // GetForm endpoint
    const getformEndpoint = 'https://getform.io/f/bmdyqgra';

    fetch(getformEndpoint, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            form.reset();
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            console.log('Form submitted successfully to GetForm');
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } else {
            alert('There was an issue submitting your form. Please try again.');
            console.error('GetForm submission failed:', response.status);
        }
    })
    .catch(error => {
        alert('There was an error sending your message. Please try again.');
        console.error('Form submission error:', error);
    });
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Log when page loads
console.log('Website loaded successfully!');

// Falling leaves background (creates emoji leaves and animates them)
(function setupLeaves(){
    const container = document.getElementById('leaf-container');
    if (!container) return;

    const leafEmojis = ['🍃','🍂','🍁'];

    function rand(min, max){ return Math.random() * (max - min) + min; }

    function spawnLeaf(){
        const leaf = document.createElement('span');
        leaf.className = 'leaf';
        // size class
        const sizeRoll = Math.random();
        if (sizeRoll < 0.35) leaf.classList.add('small');
        else if (sizeRoll < 0.8) leaf.classList.add('medium');
        else leaf.classList.add('large');

        leaf.textContent = leafEmojis[Math.floor(Math.random()*leafEmojis.length)];

        // random horizontal start between 0% and 100%
        leaf.style.left = rand(-5, 95) + 'vw';

        // random durations
        const fallDuration = rand(7000, 13000); // ms
        const swayDuration = rand(3000, 6000);

        leaf.style.animationDuration = (fallDuration/1000) + 's, ' + (swayDuration/1000) + 's';

        // slight rotation offset
        leaf.style.transform = 'rotate(' + rand(-30,30) + 'deg)';

        container.appendChild(leaf);

        // remove after fall completes
        setTimeout(()=>{
            leaf.remove();
        }, fallDuration + 500);
    }

    // spawn periodically, but less on small screens
    const spawnInterval = window.innerWidth < 600 ? 900 : 600;
    const intervalId = setInterval(spawnLeaf, spawnInterval);

    // stop spawning if page is hidden to save CPU
    document.addEventListener('visibilitychange', ()=>{
        if (document.hidden) clearInterval(intervalId);
    });
})();

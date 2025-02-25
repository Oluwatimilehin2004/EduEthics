const navLink= document.querySelectorAll('.nav__link')
const goToTop= document.getElementById('go_to_top')
const topItSelf= document.getElementById('top')
const controlBtn= document.getElementById('control')
const reportBtn= document.querySelectorAll('.report__btn')
const textArea= document.getElementById('textarea')
const mobileAnonymousIcon= document.getElementById('mobAnoIcon')
const desktopAnonymousIcon= document.getElementById('desAnoBtn')
const slides = document.querySelectorAll('.slides');
const prevBtnMobile = document.getElementById('prevBtnMobile');
const nextBtnMobile = document.getElementById('nextBtnMobile');
const dotBar = document.getElementById('dot__bar');
const prevBtnDesktop = document.getElementById('prevBtnDesktop');
const nextBtnDesktop = document.getElementById('nextBtnDesktop');
const dotsDesktop = [document.getElementById('dot1'), document.getElementById('dot2'), document.getElementById('dot3')];
const dropdownToggle = document.getElementById('dropdownToggle');
const dropdownToggleMobile=  document.getElementById('dropdownToggleMobile')
const dropdownMenu = document.getElementById('dropdownMenu');
const dropdownMenuMobile = document.getElementById('dropdownMenuMobile');
const selectedAgency = document.getElementById('selectedAgency');
const selectedAgencyMobile = document.getElementById('selectedAgencyMobile');
const fileInput= document.getElementById('fileInput')
const fileIcon= document.getElementById('fileIcon')
const form = document.querySelector("form");
const contactForm = document.getElementById('contactForm')

const showNotification= (message) => {
    const notification= document.getElementById('notification')
    const messageSpan= document.getElementById('notification-message')
    const progressBar= document.getElementById('progress-bar')

    messageSpan.textContent= message

    progressBar.style.width = "100%";
    progressBar.style.transition = "width 3s linear";

    notification.classList.remove('hidden')
    notification.classList.add('opacity-100')

    setTimeout(() => { 
        dismissNotification()
    },3000)

    // setTimeout(() => {
    //     progressBar.style.width = "0%";
    // },50)
}

const dismissNotification= () => {
    const notification= document.getElementById('notification')

    notification.classList.add('hidden')
}

// contact us form
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.name.value;
    const email = contactForm.email.value;
    const subject = contactForm.subject.value;
    const message = contactForm.message.value;

    if (!name || !email || !subject || !message) {
        showNotification("Please fill out all required fields.");
        return;
    }

    // Formatting the message
    const formattedMessage = `
📩 **New Contact Form Submission**

🔹 **Name:** ${name}  
🔹 **Email:** ${email}  
🔹 **Subject:** ${subject}  
🔹 **Message:**  

${message}

🔹 **Submitted On:** ${new Date().toLocaleString()}
    `;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", formattedMessage);

    // Send the formatted message to the server
    async function sendFormData() {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/contact_me/", {
                method: "POST",
                body: formData,
                headers: {
                    "X-Requested-With": "XMLHttpRequest", // Helps Django recognize AJAX requests
                },
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                showNotification("Message sent successfully!");
                contactForm.reset();
            } else {
                showNotification(`Error: ${JSON.stringify(result)}`);
            }
        } catch (error) {
            console.error("Error sending message:", error);
            showNotification("Failed to send message. Please try again later.");
        }
    }

    sendFormData();
});

let selectedCategory= 'sexual_harassment';
let selectedAgencyValue= '';

fileInput.addEventListener('input', () => {
    if(fileInput.isDefaultNamespace.length > 0){
        fileIcon.src= './assets/icons/badge.png';
        fileIcon.classList.toggle('w-5')
        fileIcon.classList.toggle('h-5')
    }else{
        fileIcon.src= './assets/icons/paperClip.png';
    }
})

document.addEventListener('DOMContentLoaded', function () {
    const profileBtn = document.getElementById('profile-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');

    profileBtn.addEventListener('click', function (event) {
        event.stopPropagation();
        dropdownMenu.classList.toggle('hidden');
        setTimeout(() => {
            dropdownMenu.classList.toggle('opacity-0');
            dropdownMenu.classList.toggle('scale-90');
            dropdownMenu.classList.toggle('translate-y-5');
            dropdownMenu.classList.toggle('rotate-6');
            dropdownMenu.classList.toggle('skew-y-3');
        }, 2000);
    });

    document.addEventListener('click', function (event) {
        if (!dropdownMenu.contains(event.target) && !profileBtn.contains(event.target)) {
            dropdownMenu.classList.add('opacity-0', 'scale-90', 'translate-y-5', 'rotate-6', 'skew-y-3');
            setTimeout(() => {
                dropdownMenu.classList.add('hidden');
            }, 500);
        }
    });
});


document.querySelectorAll('.faq__btn').forEach(faq => {
    const button = faq.querySelector('button');
    const content = faq.querySelector('div');
    const icon = button.querySelector('svg');

    button.addEventListener('click', (e) => {
        e.stopPropagation();
        // Toggle visibility of the answer
        content.classList.toggle('hidden');
        //Change faq background-color
        faq.classList.toggle('bg-bgBlue')
        faq.classList.toggle('bg-faqGray')

        // Rotate the chevron icon
        icon.classList.toggle('rotate-180');
        icon.classList.toggle('text-white');

        // change question color
        icon.previousElementSibling.classList.toggle('text-white')
    });
});

// Navigations
navLink.forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault()

        const targetLink= link.getAttribute('href')
        const targetSection= document.querySelector(targetLink)

        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        })
    })
})

// Go To Top
goToTop.addEventListener('click', (e) => {
    e.stopPropagation()
    topItSelf.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})

// Bot/Message Btn Control
controlBtn.addEventListener('click', () => {
    const botBtn= document.getElementById('bot')
    const messageBtn= document.getElementById('message')

    botBtn.classList.toggle('hidden')
    messageBtn.classList.toggle('hidden')
    const controlIcon= controlBtn.firstElementChild

    if(controlIcon.getAttribute('src') == "./assets/icons/cancel_icon.png"){
        controlIcon.setAttribute('src', './assets/icons/plus_icon.png')
    }else{
        controlIcon.setAttribute('src', './assets/icons/cancel_icon.png')
    }
})

// selecting Agencies
// Toggle dropdown menu visibility
const dropdownToggle1 = () => {
    dropdownMenu.classList.toggle('hidden');
    dropdownMenuMobile.classList.toggle('hidden');
};

// Add event listeners to dropdown items
document.querySelectorAll('.dropdown-item').forEach(item => {
    item.addEventListener('click', (event) => {
        event.stopPropagation(); // Stop event propagation
        selectedAgencyValue= item.getAttribute('value')
        selectedAgency.textContent = item.textContent;
        selectedAgencyMobile.textContent = item.textContent.split(' ').slice(-1).join();
        dropdownMenuMobile.classList.add('hidden');
        dropdownMenu.classList.add('hidden');
    });
});


// Close dropdown menus when clicking outside
document.addEventListener('click', (event) => {
    if (!dropdownToggle.contains(event.target)) {
        dropdownMenu.classList.add('hidden');
    }
    if (!dropdownToggleMobile.contains(event.target)) {
        dropdownMenuMobile.classList.add('hidden');
    }
});

// Report category Active Focus
reportBtn.forEach((btn) => {
    btn.addEventListener('click', (event) => {
        event.stopPropagation()
        event.preventDefault()
        selectedCategory= btn.getAttribute('value') || 'Sexual';
        reportBtn.forEach((otherBtn) => {
            otherBtn.classList.remove('bg-mainGreen', 'text-white')
        })
        btn.classList.add('bg-mainGreen', 'text-white')
    })
})

// Word count and character count
textArea.addEventListener('input', () => {
    const characters= document.getElementById('characters')
    const words= document.getElementById('words')

    characters.textContent= textArea.value.length
    words.textContent= textArea.value.trim().split(' ').length

    // Enable submit button if text area is not empty
    const submitBtn= document.getElementById('submit')
    if(textArea.value.trim() !== ''){
        submitBtn.disabled= false
        submitBtn.parentElement.classList.remove('cursor-pointer')
    }else{
        submitBtn.disabled= true
        submitBtn.parentElement.classList.add('cursor-pointer')
    }
})

// mobile Anonymous Icon
let isAnonymous = false;

 mobileAnonymousIcon.addEventListener('click', (e) => {
    e.stopPropagation()
    isAnonymous= !isAnonymous
    if(mobileAnonymousIcon.getAttribute('src') == './assets/icons/hide.png'){
        mobileAnonymousIcon.setAttribute('src', './assets/icons/show.png')
        // mobileAnonymousIcon.classList.toggle('h-4')
        // mobileAnonymousIcon.classList.toggle('w-4')
    }else{
        mobileAnonymousIcon.setAttribute('src', './assets/icons/hide.png')
    }
})

// desktop anonymous icon and text
desktopAnonymousIcon.addEventListener('click', (e) => {
    e.stopPropagation()
    isAnonymous= !isAnonymous
    if(desktopAnonymousIcon.firstElementChild.nextElementSibling.getAttribute('src') == './assets/icons/show.png'){
        desktopAnonymousIcon.classList.add('lg:bg-bgBlue')
        desktopAnonymousIcon.firstElementChild.nextElementSibling.setAttribute('src', './assets/icons/hide.png')
    }else{
        desktopAnonymousIcon.firstElementChild.nextElementSibling.setAttribute('src', './assets/icons/show.png')
        desktopAnonymousIcon.classList.remove('lg:bg-bgBlue')
    }
})

//Report Form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let description = textArea.value;

    console.log({
        category: selectedCategory,
        description: description,  
        agency: selectedAgencyValue,
        anonymous: isAnonymous
    });

    if (!description || !selectedCategory || !selectedAgencyValue) {
        showNotification('Please fill out all required fields.');
        return;
    }

    const formData = new FormData();
    formData.append("category", selectedCategory);
    formData.append("agency", selectedAgencyValue);
    formData.append("description", description); 
    formData.append("anonymous", isAnonymous ? "true" : "false"); 

    if (fileInput.files.length > 0) {
        formData.append("attachments", fileInput.files[0]); 
    }

    // Log formData for debugging
    for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
    }

    // Send the form data to the server
    async function sendFormData() {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/create_report/', {
                method: 'POST',
                body: formData,
                headers: {
                    "X-Requested-With": "XMLHttpRequest" // Helps Django recognize AJAX requests
                },
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                showNotification('Report submitted successfully!')
                textArea.value = "";
                fileInput.value = "";
                fileIcon.src= './assets/icons/paperClip.png';
                selectedAgency.textContent = '';
                selectedAgencyMobile.textContent = '';
            } else {
                showNotification(`Error: ${JSON.stringify(result)}`);
            }
        } catch (error) {
            console.error("Error submitting report:", error);
            showNotification("Failed to send report. Please try again later.");
        }
    }

    sendFormData();
});


let slideIndex = 0;
let intervalId = null;

// Initialize the slider
document.addEventListener('DOMContentLoaded', initializeSlider);

function initializeSlider() {
    if (slides.length > 0) {
        // Show the first slide
        showSlides(slideIndex);

        // Start auto-slide
        intervalId = setInterval(nextSlide, 5000);
    }
}

// Show the slide at the given index
function showSlides(index) {
    // Ensure the index is within bounds
    if (index >= slides.length) {
        slideIndex = 0; // Reset to the first slide
    } else if (index < 0) {
        slideIndex = slides.length - 1; // Go to the last slide
    }

    // Hide all slides
    slides.forEach((slide) => {
        slide.classList.add('hidden');
    });

    // Show the current slide
    slides[slideIndex].classList.remove('hidden');

    // Update the dot bar
    updateDotBar();

    // Update the desktop dot bar
    updateDesktopDotBar();
}

// Go to the previous slide
function prevSlide() {
    slideIndex--;
    showSlides(slideIndex);
}

// Go to the next slide
function nextSlide() {
    slideIndex++;
    showSlides(slideIndex);
}

// Update the dot bar to reflect the current slide
function updateDotBar() {
    const dots = dotBar.querySelectorAll('div');
    dots.forEach((dot, index) => {
        if (index === slideIndex) {
            dot.classList.remove('bg-green-950', 'opacity-20');
            dot.classList.add('bg-white');
        } else {
            dot.classList.remove('bg-white');
            dot.classList.add('bg-green-950', 'opacity-20');
        }
    });
}

// Update the desktop dot bar to reflect the current slide
function updateDesktopDotBar() {
    dotsDesktop.forEach((dot, index) => {
        if (index === slideIndex) {
            dot.classList.remove('bg-green-950', 'opacity-20');
            dot.classList.add('bg-white');
        } else {
            dot.classList.remove('bg-white');
            dot.classList.add('bg-green-950', 'opacity-20');
        }
    });
}

// Add event listeners to desktop buttons
prevBtnDesktop.addEventListener('click', (e) => {
    e.stopPropagation()
    clearInterval(intervalId); // Stop auto-slide
    prevSlide();
    intervalId = setInterval(nextSlide, 5000); // Restart auto-slide
});

nextBtnDesktop.addEventListener('click', (e) => {
    e.stopPropagation()
    clearInterval(intervalId); // Stop auto-slide
    nextSlide();
    intervalId = setInterval(nextSlide, 5000); // Restart auto-slide
});

// Add event listeners to mobile buttons
prevBtnMobile.addEventListener('click', (e) => {
    e.stopPropagation()
    clearInterval(intervalId); // Stop auto-slide
    prevSlide();
    intervalId = setInterval(nextSlide, 5000); // Restart auto-slide
});

nextBtnMobile.addEventListener('click', (e) => {
    e.stopPropagation()
    clearInterval(intervalId); // Stop auto-slide
    nextSlide();
    intervalId = setInterval(nextSlide, 5000); // Restart auto-slide
});

 // Select the testimonies container
 const testimoniesContainer = document.getElementById('testimoniesContainer');

 // Duplicate the testimonies to create an infinite scroll effect
 const testimonies = testimoniesContainer.innerHTML;
 testimoniesContainer.innerHTML += testimonies; // Duplicate content

 // Scroll animation
 let scrollAmount = 0;
 const scrollSpeed = 1; // Adjust scroll speed (pixels per frame)

 function scrollTestimonies() {
     scrollAmount += scrollSpeed;
     testimoniesContainer.scrollLeft = scrollAmount;

     // Reset scroll position when reaching the end
     if (scrollAmount >= testimoniesContainer.scrollWidth / 2) {
         scrollAmount = 0;
     }

     requestAnimationFrame(scrollTestimonies);
 }

 // Start the scroll animation
 scrollTestimonies();





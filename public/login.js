const formField= document.getElementById('form__field')
const signIn= document.getElementById('sign__in')
const signUp= document.getElementById('sign__up')
const poster= document.getElementById('poster')
const signUpLayer= document.getElementById('signUpLayer')
const signInLayer= document.getElementById('signInLayer')
const leftBlock= document.getElementById('left__block')
const BASEURL= 'http://localhost:8000/api'

document.addEventListener('load', ()=> {
    window.location.href = "loginout.html";
})

const showNotification= (message) => {
    const notification= document.getElementById('notification')
    const messageSpan= document.getElementById('notification-message')
    const progressBar= document.getElementById('progress-bar')

    messageSpan.textContent= message

    // progressBar.style.width = "100%";
    // progressBar.style.transition = "width 3s linear";

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

const attachFormEventListener = () => {
    const signInForm = document.getElementById("signInForm");

    if (!signInForm) {
        console.log("Sign-in form not found!");
        return;
    }

    signInForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Sign-in form submission prevented!");

        const username = signInForm.username.value;
        const password = signInForm.password.value;

        console.log("Sign-in Values:", { username, password });

        try {
            const response = await signInUser(username, password);
            const data = await response.json();

            if (response.ok) {
                // Save tokens to localStorage (or sessionStorage)
                localStorage.setItem("accessToken", data.access_token);
                localStorage.setItem("refreshToken", data.refresh_token);

                showNotification("Sign-in successful!");
                window.location.href = "/public/main.html";    
            } else {
                showNotification(`Sign-in failed: ${data.error}`);
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            showNotification("An error occurred during sign-in. Please try again.");
        }
    });
};

// Function to sign in a user
const signInUser = async (username, password) => {
    const response = await fetch(`${BASEURL}/signin/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    return response;
};

// signUp
document.addEventListener("DOMContentLoaded", () => {
    const signUpForm = document.getElementById("signUpForm");

    if (!signUpForm) {
        console.log("Form not found!");
        return;
    }

    signUpForm.addEventListener("submit", (e) => {
        e.preventDefault()
        console.log("Form submission prevented!");

        const username = signUpForm.username.value;
        const password = signUpForm.password.value;
        const email = signUpForm.email.value;
        const first_name = signUpForm.first_name.value;
        const last_name = signUpForm.last_name.value;

        console.log("Form Values:", { username, password, email, first_name, last_name });

        registerUser(username, password, email, first_name, last_name);
    });
});
  
// signUp
const handleSignUp= () => {
    poster.setAttribute('src', './assets/4070895.jpg')
    signUpLayer.classList.remove('bg-stopGenderViolence')
    signUpLayer.classList.add('bg-noSexPurple')
    signInLayer.classList.remove('bg-stopGenderViolenceSkin') 
    signInLayer.classList.add('bg-noAbusePurple')
    leftBlock.classList.remove('bg-stopGenderViolenceSkin') 
    leftBlock.classList.add('bg-noAbusePurple')
    signUp.firstElementChild.classList.remove('text-[12px]', 'mt-2.5', 'text-slate-300')
    signUp.firstElementChild.classList.add('text-[14px]', 'mt-2', 'text-black')
    signUp.lastElementChild.classList.remove('hidden')
    signIn.firstElementChild.classList.add('text-[12px]', 'mt-2.5', 'text-slate-300')
    signIn.lastElementChild.classList.add('hidden')
    formField.innerHTML= `<form id="signUpForm" class="font-[Inter] space-y-4 m-auto font-extralight my-4">
                            <div class="flex flex-col border-b border-slate-300">
                                <label class="text-[12px] text-noSexPurple">First Name</label>
                                <input type="text" name="first_name" 
                                class="outline-none border-none placeholder:text-[10px]"
                                placeholder="First name here" required>
                            </div>
                            <div class="flex flex-col border-b border-slate-300">
                                <label class="text-[12px] text-noSexPurple">Last Name</label>
                                <input type="text" name="last_name" 
                                class="outline-none border-none placeholder:text-[10px]"
                                placeholder="Last name here" required>
                            </div>
                            <div class="flex flex-col border-b border-slate-300">
                                <label class="text-[12px] text-noSexPurple">Username</label>
                                <input type="text" name="username" 
                                class="outline-none border-none placeholder:text-[10px]"
                                placeholder="Enter username" required>
                            </div>
                            <div class="flex flex-col border-b border-slate-300">
                                <label class="text-[12px] text-noSexPurple">Email</label>
                                <input type="email" name="email" 
                                class="outline-none border-none placeholder:text-[10px]"
                                placeholder="eduethics@gmail.com" required>
                            </div>
                            <div class="flex flex-col border-b border-slate-300">
                                <label class="text-[12px] text-noSexPurple">Password</label>
                                <input type="password" name="password" 
                                class="outline-none border-none placeholder:text-[10px]"
                                placeholder="Enter password" required>
                            </div>
                            <button class="text-white bg-noAbusePurple rounded-sm w-full text-[12px] py-1 cursor-pointer hover:bg-noSexPurple">Sign Up</button>
                            <p onclick="handleSignIn()" class="text-center text-red-600 text-[9px] cursor-pointer">Have an Account?</p>
                        </form>`
}
window.handleSignUp = handleSignUp; // Makes the function global

const handleSignIn = () => {
    // Update the DOM as needed
    poster.setAttribute('src', './assets/4058402.jpg');
    signUpLayer.classList.remove('bg-noSexPurple');
    signUpLayer.classList.add('bg-stopGenderViolence');
    signInLayer.classList.remove('bg-noAbusePurple');
    signInLayer.classList.add('bg-stopGenderViolenceSkin');
    leftBlock.classList.remove('bg-noAbusePurple');
    leftBlock.classList.add('bg-stopGenderViolenceSkin');
    signUp.firstElementChild.classList.add('text-[12px]', 'mt-2.5', 'text-slate-300');
    signUp.lastElementChild.classList.remove('text-[14px]');
    signUp.lastElementChild.classList.add('hidden');
    signIn.firstElementChild.classList.remove('text-[12px]', 'mt-2.5', 'text-slate-300');
    signIn.firstElementChild.classList.add('text-[14px]', 'mt-2', 'text-black');
    signIn.lastElementChild.classList.remove('hidden');

    // Insert the form into the DOM
    formField.innerHTML = `
        <form id="signInForm" class="font-[Inter] space-y-4 m-auto font-extralight my-6 bg-white rounded-md">
            <div class="flex flex-col border-b border-slate-300">
                <label class="text-[12px] text-stopGenderViolenceWoman">Username</label>
                <input type="text" name="username" 
                    class="outline-none border-none placeholder:text-[10px]"
                    placeholder="Enter username">
            </div>
            <div class="flex flex-col border-b border-slate-300">
                <label class="text-[12px] text-stopGenderViolenceWoman">Password</label>
                <input type="password" name="password" 
                    class="outline-none border-none placeholder:text-[10px]"
                    placeholder="Enter password">
            </div>
            <button class="text-white bg-stopGenderViolenceWoman rounded-sm w-full text-[12px] py-1 cursor-pointer hover:bg-stopGenderViolenceSkin">Sign In</button>
            <div class="flex justify-between items-center">
                <p onclick="handleSignUp()" class="text-[11px] text-stopGenderViolenceWoman cursor-pointer">Sign Up</p>
                <a href="" class="text-[11px] text-stopGenderViolenceWoman">Forgotten password?</a>
            </div>
            <div class="w-full justify-center mt-5 py-3 space-x-10 flex">
                <a href="https://www.instagram.com/_ayomidelovestech_?igsh=MW12Y3Jpenk0ZG55NA%3D%3D&utm_source=qr">
                    <img class="w-7 h-7 rounded-md" src="./assets/icons/logininstagram.png" alt="Instagram icon">
                </a>
                <a href="https://www.facebook.com/share/14cZv6N1uc/?mibextid=wwXIfr">
                    <img class="w-7 h-7 rounded-md" src="./assets/icons/loginfacebook.png" alt="Facebook icon">
                </a>
                <a href="https://x.com/ayomidemustwin?s=21">
                    <img class="w-7 h-7 rounded-md" src="./assets/icons/logintwitter.png" alt="Twitter icon">
                </a>
            </div>
            <div>
                <p class="text-center text-[14px] text-stopGenderViolenceWoman font-medium italic cursor-none">EduEthics</p>
            </div>
        </form>
    `;

    // Attach the event listener to the form after it's inserted
    attachFormEventListener();
};


const registerUser= (username, password, email, first_name, last_name) => {
    fetch(`${BASEURL}/register/`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            email,
            first_name,
            last_name
        })
    }) 
        
    .then(response => {
        if (!response.ok) {
            throw new Error(`Username or Email Already Exist! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Actual Data:", data);
        showNotification("Registered Successfully!");
        handleSignIn();
    })
    .catch(error => {
        console.error("Error:", error);
        showNotification(error.message);
    });
}


const loginUser= (username, password) => {
    fetch(`${BASEURL}/signin/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
                password,
                username
            })
    })
    .then(response=> {
        if(!response){
            console.error(`Login Failed: Status ${response.status}`)
        }else{
            return response.json()
        }
    })
    .then(data =>{
        if(!data.access || !data.refresh){
            console.error(`Login Failed, No Access token recieved`)
        }else{
            localStorage.setItems('AccessToken', data.access)
            localStorage.setItems('RefreshToken', data.refresh)
            console.log(data.access)
            console.log(data.refresh)
            showNotification("Logged In Successfully!");
        }
    })
}





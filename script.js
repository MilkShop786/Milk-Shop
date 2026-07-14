// Default Password jo pehli dafa set hoga
const DEFAULT_PASSWORD = "milkshopadmin";

// Check if password or custom images are already saved on launch
window.addEventListener('DOMContentLoaded', () => {
    // 1. Password check
    if (!localStorage.getItem('adminPass')) {
        localStorage.setItem('adminPass', DEFAULT_PASSWORD);
    }

    // 2. Images check
    const savedImg1 = localStorage.getItem('milkShopImg1');
    const savedImg2 = localStorage.getItem('milkShopImg2');

    if (savedImg1) {
        document.getElementById('shopImg1').src = savedImg1;
    }
    if (savedImg2) {
        document.getElementById('shopImg2').src = savedImg2;
    }
});

// Show & Hide Login Popup
function showLogin() {
    document.getElementById('loginModal').classList.remove('hidden');
}

function closeLogin() {
    document.getElementById('loginModal').classList.add('hidden');
    document.getElementById('adminPassword').value = '';
}

// Verify Password
function verifyPassword() {
    const enteredPass = document.getElementById('adminPassword').value;
    const correctPass = localStorage.getItem('adminPass');

    if (enteredPass === correctPass) {
        // Hide Main storefront & Login popup
        document.getElementById('storefront').classList.add('hidden');
        document.getElementById('loginModal').classList.add('hidden');
        
        // Show Secret Admin page
        document.getElementById('adminPanel').classList.remove('hidden');
    } else {
        alert("Ghalat Password! Dobara koshish karein.");
    }
}

// Change Password from Admin Panel
function changePassword() {
    const newPass = document.getElementById('newPassInput').value;
    
    if (newPass.trim() === "") {
        alert("Password khali nahi ho sakta!");
        return;
    }

    localStorage.setItem('adminPass', newPass);
    alert("Kamyabi! Admin Panel ka password badal diya gaya hai.");
    document.getElementById('newPassInput').value = '';
}

// Upload & Save Images using LocalStorage
function saveImages() {
    const file1 = document.getElementById('imageInput1').files[0];
    const file2 = document.getElementById('imageInput2').files[0];

    let p1 = new Promise((resolve) => {
        if (file1) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('milkShopImg1', e.target.result);
                document.getElementById('shopImg1').src = e.target.result;
                resolve();
            }
            reader.readAsDataURL(file1);
        } else {
            resolve();
        }
    });

    let p2 = new Promise((resolve) => {
        if (file2) {
            const reader = new FileReader();
            reader.onload = function(e) {
                localStorage.setItem('milkShopImg2', e.target.result);
                document.getElementById('shopImg2').src = e.target.result;
                resolve();
            }
            reader.readAsDataURL(file2);
        } else {
            resolve();
        }
    });

    Promise.all([p1, p2]).then(() => {
        alert("Images kamyabi se upload ho kar website par lag chuki hain!");
    });
}

// Exit Admin Panel & Go back to Storefront
function logoutAdmin() {
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('storefront').classList.remove('hidden');
}

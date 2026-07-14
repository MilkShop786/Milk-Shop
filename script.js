// Secret Key/Password for Store Settings
const ADMIN_PASSWORD = "milkshopadmin";

// Load saved images from LocalStorage on startup
window.addEventListener('DOMContentLoaded', () => {
    const savedImg1 = localStorage.getItem('milkShopImg1');
    const savedImg2 = localStorage.getItem('milkShopImg2');

    if (savedImg1) {
        document.getElementById('shopImg1').src = savedImg1;
    }
    if (savedImg2) {
        document.getElementById('shopImg2').src = savedImg2;
    }
});

// Modal triggers
function openAdminModal() {
    document.getElementById('adminModal').classList.remove('hidden');
}

// Close Admin Modal
function closeAdminModal() {
    document.getElementById('adminModal').classList.add('hidden');
    // Reset input fields
    document.getElementById('adminPassword').value = '';
    document.getElementById('authSection').classList.remove('hidden');
    document.getElementById('uploadSection').classList.add('hidden');
}

// Verify Password Step
function verifyPassword() {
    const enteredPass = document.getElementById('adminPassword').value;
    if (enteredPass === ADMIN_PASSWORD) {
        document.getElementById('authSection').classList.add('hidden');
        document.getElementById('uploadSection').classList.remove('hidden');
    } else {
        alert("Ghalat Password! Dobara koshish karein.");
    }
}

// Save Images from Admin Panel to local storage
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

    // Trigger when both images are loaded and stored
    Promise.all([p1, p2]).then(() => {
        alert("Shabaash! Images kamyabi se badal di gayi hain.");
        closeAdminModal();
    });
}

// Custom design page functionality
document.addEventListener('DOMContentLoaded', function() {
    let currentStep = 1;
    let uploadedImage = null;
    let selectedStyle = null;
    let selectedSize = 'L';

    const uploadArea = document.getElementById('uploadArea');
    const photoUpload = document.getElementById('photoUpload');
    const uploadedPreview = document.getElementById('uploadedPreview');
    const previewImage = document.getElementById('previewImage');
    const changePhoto = document.getElementById('changePhoto');
    const continueStep1 = document.getElementById('continueStep1');

    const styleOptions = document.querySelectorAll('.style-option');
    const continueStep2 = document.getElementById('continueStep2');
    const backStep2 = document.getElementById('backStep2');

    const sizeButtons = document.querySelectorAll('.size-btn');
    const finalPreview = document.getElementById('finalPreview');
    const selectedStyleInfo = document.getElementById('selectedStyleInfo');
    const backStep3 = document.getElementById('backStep3');
    const addToCartCustom = document.getElementById('addToCartCustom');

    // Step 1: Upload Photo
    uploadArea.addEventListener('click', () => photoUpload.click());

    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImage = e.target.result;
                previewImage.src = uploadedImage;
                uploadArea.style.display = 'none';
                uploadedPreview.style.display = 'block';
                continueStep1.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });

    changePhoto.addEventListener('click', function() {
        uploadArea.style.display = 'block';
        uploadedPreview.style.display = 'none';
        continueStep1.style.display = 'none';
        photoUpload.value = '';
    });

    continueStep1.addEventListener('click', () => goToStep(2));

    // Step 2: Choose Style
    styleOptions.forEach(option => {
        option.addEventListener('click', function() {
            styleOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedStyle = this.dataset.style;
            continueStep2.disabled = false;
        });
    });

    backStep2.addEventListener('click', () => goToStep(1));
    continueStep2.addEventListener('click', () => goToStep(3));

    // Step 3: Size Selection & Review
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.dataset.size;
        });
    });

    backStep3.addEventListener('click', () => goToStep(2));

    addToCartCustom.addEventListener('click', function() {
        const styleName = document.querySelector('.style-option.selected h3').textContent;
        
        const product = {
            id: 'custom-' + Date.now(),
            name: 'Custom Pet Design',
            price: 34.99,
            image: uploadedImage,
            size: selectedSize,
            style: styleName,
            type: 'custom'
        };

        addToCart(product);
        
        // Redirect to cart
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 500);
    });

    function goToStep(step) {
        // Hide all steps
        document.querySelectorAll('.step-content').forEach(s => s.classList.remove('active'));
        document.querySelectorAll('.steps-indicator .step').forEach(s => s.classList.remove('active'));

        // Show current step
        document.getElementById('step' + step).classList.add('active');
        document.getElementById('stepIndicator' + step).classList.add('active');

        // Update step 3 preview
        if (step === 3) {
            finalPreview.src = uploadedImage;
            const styleName = document.querySelector('.style-option.selected h3').textContent;
            selectedStyleInfo.textContent = 'Style: ' + styleName;
        }

        currentStep = step;
    }
});
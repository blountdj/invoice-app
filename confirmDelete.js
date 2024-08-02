document.addEventListener('DOMContentLoaded', function() {

    // Buttons
    const cancelBtn = document.getElementById('confirm-delete-cancel-btn');
    const deleteBtn = document.getElementById('confirm-delete-delete-btn');

    // Elements
    
    

    function closeConfirmation() {
        closeElemTransition(overlay)
        closeElemTransition(confirmDeleteWrapper)
    }

    function deleteItem() {
        const invoiceNumber = document.getElementById('view-invoice-invoice-number').innerHTML;
        console.log(`Delete Item ... ${invoiceNumber}`)
    }

    function init() {
        cancelBtn.addEventListener('click', closeConfirmation)
        deleteBtn.addEventListener('click', deleteItem)
    }
    init()
})
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

        let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
        // console.log(invoices)
        invoices = invoices.filter(item => item.id !== invoiceNumber);
        // console.log(invoices)
        localStorage.setItem('invoices', JSON.stringify(invoices));

        closeConfirmation()
        closeViewInvoice()
        loadDataFromStorage()
    }

    function init() {
        cancelBtn.addEventListener('click', closeConfirmation)
        deleteBtn.addEventListener('click', deleteItem)
    }
    init()
})
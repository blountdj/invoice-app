document.addEventListener('DOMContentLoaded', function() {

    const loadingSpinner = document.getElementById('loading-spinner');
    const overlay = document.getElementById('overlay');
    const mainContainer = document.getElementById('main-container');
    const confirmDeleteWrapper = document.getElementById('confirm-delete-wrapper');
    const emptyInvoicesWrapper = document.querySelector('.empty-invoices-wrapper');
    const invoicesList = document.querySelector('.invoices-list');
    
    let currentInvoiceId;
    let invoiceFilter = ['draft', 'pending', 'paid'];
    
    function convertDate(dateString) {
        // Parse the input date string
        const date = new Date(dateString);

        // Check if the date is valid
        if (isNaN(date)) {
            console.error("Invalid date");
            return null;
        }

        // Get the day, month, and year
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        // Construct the new date string
        const newDateString = `${day} ${month} ${year + 3}`;

        return newDateString;
    }

    function closeElemTransition(elem) {

        elem.classList.add('hidden');

        setTimeout(() => {
            elem.style.display = 'none'
        }, 250)
    }

    function openElemTransition(elem, type = 'block') {
        elem.style.display = type
        
        setTimeout(() => {
            elem.classList.remove('hidden');
        }, 10)
    }

    function getInvoiceDataById(data, id) {
        return data.find(item => item.id === id);
    }


    window.convertDate = convertDate;
    window.closeElemTransition = closeElemTransition;
    window.openElemTransition = openElemTransition;
    window.getInvoiceDataById = getInvoiceDataById;
    window.overlay = overlay;
    window.mainContainer = mainContainer;
    window.confirmDeleteWrapper = confirmDeleteWrapper;
    window.currentInvoiceId = currentInvoiceId;
    window.emptyInvoicesWrapper = emptyInvoicesWrapper;
    window.invoicesList = invoicesList;
    window.invoiceFilter = invoiceFilter;

    window.loadingSpinner = loadingSpinner;
})
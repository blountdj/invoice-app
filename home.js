document.addEventListener('DOMContentLoaded', function() {
    console.log('home.js loaded')

    const jsonUrl = 'https://raw.githubusercontent.com/blountdj/invoice-app/main/data.json';
    
    const statusFilterWrapper = document.querySelector('.status-filter-wrapper');
    const filterDropdown = document.querySelector('.filter-dropdown');
    
    // Buttons
    const loadDummyInvoicesBtn = document.getElementById('dummy-invoices-btn');

    // Checkboxes
    const filterDraftCheckbox = document.getElementById('checkbox-draft');
    const filterPendingCheckbox = document.getElementById('checkbox-pending');
    const filterPaidCheckbox = document.getElementById('checkbox-paid');
    const filterIcon = document.querySelector('.filter-icon');
    
    let invoiceCount = 0;
    let loadedData;

    
    function loadDataFromUrl() {
    
        // Fetch the JSON data
        fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            loadingSpinner.classList.remove('block');
            hideEmptyInvoicesWrapper()

            invoiceCount = 0;
            invoicesList.innerHTML = '';
            loadedData = data;

            localStorage.setItem('invoices', JSON.stringify(loadedData));

            for (let i = 0; i < data.length; i++) {
                console.log('data[i]:', data[i])
                addInvoicesToInvoices(data[i])
                invoiceCount++;
            }
    
            invoicesTotalText.textContent = `There are ${invoiceCount} total invoices`;
            addInvoicesEventListeners()
    
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
            loadingSpinner.classList.add('block');
        });
    }

    function showEmptyInvoicesWrapper() {
        invoicesTotalText.textContent = `No invoices`;
        invoicesList.classList.add('hidden')
        openElemTransition(emptyInvoicesWrapper, 'flex') 
    }

    function filterInvoices() {
        console.log('filterInvoices')

        if (filterDropdown.classList.contains('hidden')) {
            openElemTransition(filterDropdown, 'flex')
            filterIcon.classList.add('rotate')
        } else {
            closeElemTransition(filterDropdown)
            filterIcon.classList.remove('rotate')
        }
    }


    function filterCheckboxEvent(event, name) {
        if (event.target.checked) {
            console.log(`${name} Checkbox is checked`);
            invoiceFilter.push(name)
        } else {
            console.log(`${name} Checkbox is unchecked`);
            invoiceFilter = invoiceFilter.filter(listItem => listItem !== name);
        }
        loadDataFromStorage()
        console.log('invoiceFilter:', invoiceFilter)
    };
    

    function init() {
        loadingSpinner.classList.add('block');

        let invoices = JSON.parse(localStorage.getItem('invoices')) || [];
        console.log('invoices:', invoices)
        invoices.length !== 0 ? loadDataFromStorage(invoices) : showEmptyInvoicesWrapper();    
        loadDummyInvoicesBtn.addEventListener('click', loadDataFromUrl);
        statusFilterWrapper.addEventListener('click', filterInvoices);
        filterDraftCheckbox.addEventListener('change', () => filterCheckboxEvent(event, 'draft'))
        filterPendingCheckbox.addEventListener('change', () => filterCheckboxEvent(event, 'pending'))
        filterPaidCheckbox.addEventListener('change', () => filterCheckboxEvent(event, 'paid'))
    }

    init()
})
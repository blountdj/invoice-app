document.addEventListener('DOMContentLoaded', function() {
    console.log('home.js loaded')

    const jsonUrl = 'https://raw.githubusercontent.com/blountdj/invoice-app/main/data.json';

    const loadingSpinner = document.getElementById('loading-spinner');
    const invoicesTotalText = document.getElementById('invoices-count-text');
    const invoicesList = document.querySelector('.invoices-list');
    const emptyInvoicesWrapper = document.querySelector('.empty-invoices-wrapper');
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
    let invoiceFilter = ['draft', 'pending', 'paid'];

    function addInvoicesEventListeners() {
        const invoices = document.querySelectorAll('.invoice');
        invoices.forEach(invoice => {
            invoice.addEventListener('click', invoiceClick);
        });
    }
    
    function addInvoicesToInvoices(data) {
    
        const gridNodeId = 'w-node-e333d152-b594-a033-d7d5-cbe5902682bb-67cb1b90'
        const totalId = 'w-node-_594f6a34-daa0-408b-a853-79d888fe65d5-67cb1b90'
    
        const id = data.id;
        const paymentDue = convertDate(data.paymentDue);
        const status = data.status;
        const total = data.total;
        const clientName = data.clientName;
    
    
        let invoice = document.createElement('div');
        invoice.className = 'w-layout-grid invoice';
        invoice.dataset.id = `${id}`;
        invoice.innerHTML = `
            <div id="${gridNodeId}" class="invoice-number">
                <span class="text-span">#</span>${id}
            </div>
            <div id="${gridNodeId}" class="invoice-text">Due ${paymentDue}</div>
            <div id="${gridNodeId}" class="invoice-text">${clientName}</div>
            <div id="${totalId}" class="invoice-list-value">£ ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <div id="${gridNodeId}" class="invoice-list-status is-${status}">
                <div class="invoice-list-status-circle is-${status}"></div>
                <div class="invoice-list-status-text is-${status}">${status}</div>
            </div>
            <img id="${gridNodeId}" src="https://cdn.prod.website-files.com/66a8034ff65d86c967cb1b89/66a8064bc8e3b207313f122c_icon-arrow-right.svg" loading="lazy" alt="" class="image-4">
        `;
    
        invoicesList.appendChild(invoice);
    }
    
    function loadDataFromUrl() {
    
        // Fetch the JSON data
        fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            loadingSpinner.classList.remove('block');
            hideEmptyInvoicesWrapper()

            invoicesList.innerHTML = '';
            loadedData = data;

            localStorage.setItem('invoices', JSON.stringify(loadedData));

            for (let i = 0; i < data.length; i++) {
                addInvoicesToInvoices(data[i])
                invoiceCount++;
            }
    
            invoicesTotalText.textContent = `There are ${invoiceCount} total invoices`;
    
            // currentNoJobs = noJobsVar;
            // for (let i = 0; i < noJobsVar; i++) {
            //     addJobCard(filteredData[i])
            //     fetchedData.filteredData[filteredData[i].id] = filteredData[i];
            // }
    
            // if (noJobsVar >= filteredData.length) {
            //     loadMoreBtn.classList.add('hidden');
            // } else {
            //     loadMoreBtn.classList.remove('hidden');
            // }
    
            // addJobCardEventListeners();
            addInvoicesEventListeners()
    
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
            loadingSpinner.classList.add('block');
        });
    }

    function loadDataFromStorage(invoices) {
        console.log('loadDataFromStorage')
        loadingSpinner.classList.remove('block');
        hideEmptyInvoicesWrapper()
        invoicesList.innerHTML = '';
        loadedData = invoices;

        for (let i = 0; i < invoices.length; i++) {
            addInvoicesToInvoices(invoices[i])
            invoiceCount++;
        }

        invoicesTotalText.textContent = `There are ${invoiceCount} total invoices`;

        // currentNoJobs = noJobsVar;
        // for (let i = 0; i < noJobsVar; i++) {
        //     addJobCard(filteredData[i])
        //     fetchedData.filteredData[filteredData[i].id] = filteredData[i];
        // }

        // if (noJobsVar >= filteredData.length) {
        //     loadMoreBtn.classList.add('hidden');
        // } else {
        //     loadMoreBtn.classList.remove('hidden');
        // }

        // addJobCardEventListeners();
        addInvoicesEventListeners()
    }

    function invoiceClick() {
        const id = this.dataset.id;
        currentInvoiceId = id;
        console.log('invoice click', id)
        openViewInvoice(loadedData, id)
    }

    function showEmptyInvoicesWrapper() {
        invoicesTotalText.textContent = `No invoices`;
        invoicesList.classList.add('hidden')
        openElemTransition(emptyInvoicesWrapper, 'flex') 
    }

    function hideEmptyInvoicesWrapper() {
        closeElemTransition(emptyInvoicesWrapper) 
        invoicesList.classList.remove('hidden')
    }

    function filterInvoices() {
        console.log('filterInvoices')
        filterDraftCheckbox.checked = true;
        filterPendingCheckbox.checked = true;
        filterPaidCheckbox.checked = true;

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
    };
    

    function init() {
        loadingSpinner.classList.add('block');
        // const filterDraftCheckbox = document.getElementById('checkbox-draft');
        // filterDraftCheckbox.checked = true;
        // filterPendingCheckbox.checked = true;
        // filterPaidCheckbox.checked = true;

        // filterDraftCheckbox.classList.add('checkbox')
        // filterDraftCheckbox.classList.add('w--redirected-checked')
        // // <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox w--redirected-checked"></div>
        // // <div class="w-checkbox-input w-checkbox-input--inputType-custom checkbox"></div>

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
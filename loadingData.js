document.addEventListener('DOMContentLoaded', function() {

    const invoicesTotalText = document.getElementById('invoices-count-text');

    function invoiceClick() {
        const id = this.dataset.id;
        currentInvoiceId = id;
        console.log('invoice click', id)
        openViewInvoice(id)
    }

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

    function hideEmptyInvoicesWrapper() {
        closeElemTransition(emptyInvoicesWrapper) 
        invoicesList.classList.remove('hidden')
    }


    function loadDataFromStorage(invoices) {
        console.log('loadDataFromStorage')
        loadingSpinner.classList.remove('block');

        if (!invoices) invoices = JSON.parse(localStorage.getItem('invoices'))

        hideEmptyInvoicesWrapper()
        invoiceCount = 0;
        invoicesList.innerHTML = '';
        loadedData = invoices;

        for (let i = 0; i < invoices.length; i++) {
            if (invoiceFilter.includes(invoices[i].status)) {
                addInvoicesToInvoices(invoices[i])
                invoiceCount++;
            }
        }

        invoicesTotalText.textContent = `There are ${invoiceCount} total invoices`;

        addInvoicesEventListeners()
    }

    window.loadDataFromStorage = loadDataFromStorage;
})
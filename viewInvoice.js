document.addEventListener('DOMContentLoaded', function() {

    // Wrappers
    const invoicesWrapper = document.querySelector('.invoices-wrapper');
    const viewInvoicesWrapper = document.querySelector('.view-invoices-wrapper');
    const itemsGrid = document.getElementById('view-invoice-items-grid');
    
    // Buttons
    const goBackElem = document.querySelector('.go-back-wrapper');
    const editBtn = document.getElementById('view-invoice-edit-btn');
    const deleteBtn = document.getElementById('view-invoice-delete-btn');
    const paidBtn = document.getElementById('view-invoice-paid-btn'); 

    // Text Details
    const invoiceNumberText = document.getElementById('view-invoice-invoice-number');
    const invoiceDescriptionText = document.getElementById('view-invoice-description');
    const invoiceSenderStreetText = document.getElementById('view-invoice-sender-street');
    const invoiceSenderCityText = document.getElementById('view-invoice-sender-city');
    const invoiceSenderPostcodeText = document.getElementById('view-invoice-sender-postcode');
    const invoiceSenderCountryText = document.getElementById('view-invoice-sender-country');
    const invoiceDateText = document.getElementById('view-invoice-invoice-date');
    const invoicePaymentDueText = document.getElementById('view-invoice-payment-due');
    const invoiceClientNameText = document.getElementById('view-invoice-client-name');
    const invoiceEmailText = document.getElementById('view-invoice-email');
    const invoiceToStreetText = document.getElementById('view-invoice-to-street');
    const invoiceToCityText = document.getElementById('view-invoice-to-city');
    const invoiceToPostcodeText = document.getElementById('view-invoice-to-postcode');
    const invoiceToCountryText = document.getElementById('view-invoice-to-country');
    const invoiceTotalText = document.getElementById('view-invoice-total');

    let invoiceData;

    function addItem(name='', quantity='', price='', total='') {

        let itemNameInput = document.createElement('div');
        itemNameInput.className = 'invoice-details-text-variant';
        itemNameInput.id = 'w-node-_77e6bafb-4a3a-d3d9-5331-59486b53e60b-67cb1b90';
        itemNameInput.innerHTML = name
        itemsGrid.appendChild(itemNameInput)

        let itemQtyInput = document.createElement('div');
        itemQtyInput.className = 'invoice-text-variant';
        itemQtyInput.id = 'w-node-_2afeffeb-ffe8-406f-3192-69e33d19edbd-67cb1b90';
        itemQtyInput.innerHTML = quantity
        itemsGrid.appendChild(itemQtyInput)

        let itemPriceInput = document.createElement('div');
        itemPriceInput.className = 'invoice-text-variant';
        itemPriceInput.id = 'w-node-bcae8a41-de94-0519-5b29-90377fe9bec8-67cb1b90';
        itemPriceInput.innerHTML = `£ ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        itemsGrid.appendChild(itemPriceInput)

        let itemTotalText = document.createElement('div');
        itemTotalText.className = 'invoice-text-variant is-bold';
        itemTotalText.id = 'w-node-_5049caba-76d7-57a7-5652-c46a0d9b69d5-67cb1b90';
        itemTotalText.innerHTML = `£ ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        itemsGrid.appendChild(itemTotalText)
    }

    function updateViewInvoiceDetails(data) {
        invoiceData = getInvoiceDataById(data, currentInvoiceId);

        invoiceNumberText.innerHTML = currentInvoiceId;
        invoiceDescriptionText.innerHTML = invoiceData.description;
        invoiceSenderStreetText.innerHTML = invoiceData.senderAddress.street;
        invoiceSenderCityText.innerHTML = invoiceData.senderAddress.city;
        invoiceSenderPostcodeText.innerHTML = invoiceData.senderAddress.postCode;
        invoiceSenderCountryText.innerHTML = invoiceData.senderAddress.country;
        invoiceDateText.innerHTML = invoiceData.createdAt;
        invoicePaymentDueText.innerHTML = invoiceData.paymentDue;  
        invoiceClientNameText.innerHTML = invoiceData.clientName;
        invoiceEmailText.innerHTML = invoiceData.clientEmail;
        invoiceToStreetText.innerHTML = invoiceData.clientAddress.street;
        invoiceToCityText.innerHTML = invoiceData.clientAddress.city;
        invoiceToPostcodeText.innerHTML = invoiceData.clientAddress.postCode;
        invoiceToCountryText.innerHTML = invoiceData.clientAddress.country;
        invoiceTotalText.innerHTML = `£ ${invoiceData.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

        for (let i = 0; i < invoiceData.items.length; i++) {
            let item = invoiceData.items[i];
            addItem(item.name, item.quantity, item.price, item.total)
        }
    }

    function closeViewInvoice() {
        closeElemTransition(viewInvoicesWrapper)
        openElemTransition(invoicesWrapper)
    }

    function openViewInvoice(data) {
        invoiceData = data;
        updateViewInvoiceDetails(data)
        closeElemTransition(invoicesWrapper)
        openElemTransition(viewInvoicesWrapper)
    }

    function editBtnClick() {
        console.log('Edit Btn Click')

        // invoiceData = getInvoiceDataById(data, currentInvoiceId);
        addDataToEditForm(invoiceData)
        openElemTransition(overlay)
        openElemTransition(editInvoiceElem)
        editInvoiceElem.scrollTop = mainContainer.offsetTop;
        editInvoiceAddBinBtnListeners()

    }

    function deleteBtnClick() {
        console.log('Delete Btn Click')
        openElemTransition(overlay)
        openElemTransition(confirmDeleteWrapper, 'flex')
    }

    function paidBtnClick() {
        console.log('Paid Btn Click')
    }

    function init() {
        goBackElem.addEventListener('click', closeViewInvoice)
        editBtn.addEventListener('click', editBtnClick)
        deleteBtn.addEventListener('click', deleteBtnClick)
        paidBtn.addEventListener('click', paidBtnClick)
    }

    init()

    window.openViewInvoice = openViewInvoice;
})
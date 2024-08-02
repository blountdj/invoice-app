document.addEventListener('DOMContentLoaded', function() {

    const editInvoiceElem = document.querySelector('.edit-invoice-form-block');
    const editInvoiceCancelBtn = document.getElementById('edit-cancel');
    const editAddNewItemBtn = document.getElementById('edit-add-new-item-btn');
    const editInvoiceSaveBtn = document.getElementById('edit-save');
    const senderStreetInput = document.getElementById('edit-sender-street');
    const senderCityInput = document.getElementById('edit-sender-city');
    const senderPostCodeInput = document.getElementById('edit-sender-postcode');
    const senderCountryInput = document.getElementById('edit-sender-country');
    const clientNameInput = document.getElementById('edit-client-name');
    const clientEmailInput = document.getElementById('edit-client-email');
    const clientStreetInput = document.getElementById('edit-client-street');
    const clientCityInput = document.getElementById('edit-client-city');
    const clientPostcodeInput = document.getElementById('edit-client-postcode');
    const clientCountryInput = document.getElementById('edit-client-country');
    const invoiceDateInput = document.getElementById('edit-invoice-date');
    const paymentTermsInput = document.getElementById('edit-payment-terms');
    const projectDecriptionInput = document.getElementById('edit-project-description');
    const editInvoiceListItemWrapper = document.getElementById('edit-item-list');
    
    function addDataToEditForm(invoiceData) {
        
        senderStreetInput.value = invoiceData.senderAddress.street;
        senderCityInput.value = invoiceData.senderAddress.city;
        senderPostCodeInput.value = invoiceData.senderAddress.postCode;
        senderCountryInput.value = invoiceData.senderAddress.country;
        clientNameInput.value = invoiceData.clientName;        
        clientEmailInput.value = invoiceData.clientEmail;
        clientStreetInput.value = invoiceData.clientAddress.street;
        clientCityInput.value = invoiceData.clientAddress.city;
        clientPostcodeInput.value = invoiceData.clientAddress.postCode;
        clientCountryInput.value = invoiceData.clientAddress.country;
        invoiceDateInput.value = invoiceData.createdAt;
        paymentTermsInput.value = invoiceData.paymentDue;        
        projectDecriptionInput.value = invoiceData.description;

        // console.log(invoiceData.items)

        for (let i = 0; i < invoiceData.items.length; i++) {
            let item = invoiceData.items[i];
            // console.log(i, '-invoiceData.items[i]:', invoiceData.items[i])
            editInvoiceAddNewItem(item.name, item.quantity, item.price, item.total)
        }
    }


    editInvoiceCancelBtn.addEventListener('click', () => {
        closeElemTransition(overlay)
        closeElemTransition(editInvoiceElem)
    })

    editInvoiceSaveBtn.addEventListener('click', () => {
        console.log('Edit Invoice Save')
    })

    function editInvoiceAddNewItem(name='', quantity='', price='', total='') {
        
        if (name instanceof Event) {
            name = '';
            quantity = '';
            price = '';
            total = '';
        }

        const uniqueId = uuid.v4();

        let itemNameInput = document.createElement('input');
        itemNameInput.dataset.row = uniqueId
        itemNameInput.className = 'text-field w-input';
        itemNameInput.maxlength = '256';
        itemNameInput.type = 'text';
        itemNameInput.id = 'w-node-_78b83e84-927c-e44b-80e3-a091c4c59c7a-67cb1b90';
        itemNameInput.value = name
        editInvoiceListItemWrapper.appendChild(itemNameInput)

        let itemQtyInput = document.createElement('input');
        itemQtyInput.dataset.row = uniqueId
        itemQtyInput.className = 'text-field w-input';
        itemQtyInput.maxlength = '256';
        itemQtyInput.type = 'text';
        itemQtyInput.id = 'w-node-_9d4027a0-2272-1573-8cde-1c82d6d0d654-67cb1b90';
        itemQtyInput.value = quantity
        editInvoiceListItemWrapper.appendChild(itemQtyInput)

        let itemPriceInput = document.createElement('input');
        itemPriceInput.dataset.row = uniqueId
        itemPriceInput.className = 'text-field w-input';
        itemPriceInput.maxlength = '256';
        itemPriceInput.type = 'text';
        itemPriceInput.id = 'w-node-c3e79819-e6b9-97ff-82a4-d78fd68010eb-67cb1b90';
        itemPriceInput.value = price
        editInvoiceListItemWrapper.appendChild(itemPriceInput)

        let itemTotalText = document.createElement('div');
        itemTotalText.dataset.row = uniqueId
        itemTotalText.className = 'invoice-total-grey';
        itemTotalText.id = 'w-node-_31bfba68-c451-9ba4-a396-c063706d049d-67cb1b90';
        itemTotalText.innerHTML = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        editInvoiceListItemWrapper.appendChild(itemTotalText)

        let itemBinImg = document.createElement('img');
        itemBinImg.dataset.row = uniqueId
        itemBinImg.className = 'edit-bin-icon';
        itemBinImg.alt = '';
        itemBinImg.loading = 'lazy';
        itemBinImg.id = 'w-node-dd459cca-718f-a040-f266-01aff2de4312-67cb1b90';
        itemBinImg.src = "https://cdn.prod.website-files.com/66a8034ff65d86c967cb1b89/66a8064bccb3ad087bd75256_icon-delete.svg"
        itemBinImg.innerHTML = total
        editInvoiceListItemWrapper.appendChild(itemBinImg)

        editInvoiceAddBinBtnListeners()
    }

    function deleteEditInvoiceItemRow() {
        console.log('deleteEditInvoiceItemRow')
        console.log(this.dataset.row)
        const idToDelete = this.dataset.row


        const elementsToDelete = document.querySelectorAll(`[data-row="${idToDelete}"]`);
        console.log(elementsToDelete.length)
        elementsToDelete.forEach(element => {
            element.remove();
        });
    }

    function editInvoiceAddBinBtnListeners() {
        const binImgs = document.querySelectorAll('.edit-bin-icon')
        binImgs.forEach(binImg => {
            binImg.addEventListener('click', deleteEditInvoiceItemRow);
        });
    }

    function init() {
        editAddNewItemBtn.addEventListener('click', editInvoiceAddNewItem)
    }

    init()

    window.addDataToEditForm = addDataToEditForm;
    window.editInvoiceAddBinBtnListeners = editInvoiceAddBinBtnListeners;
    window.editInvoiceElem = editInvoiceElem;
})
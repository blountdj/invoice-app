document.addEventListener('DOMContentLoaded', function() {

    const newInvoiceBtn = document.getElementById('new-invoice-btn');
    const newInvoiceFormBlock = document.querySelector('.new-invoice-form-block');
    const mainContainer = document.getElementById('main-container');

    const newInvoiceDiscardBtn = document.getElementById('new-invoice-discard-btn');
    const newInvoiceSaveDraftBtn = document.getElementById('new-invoice-save-draft-btn');
    const newInvoiceSaveSendBtn = document.getElementById('new-invoice-save-send-btn');

    const newInvoiceSenderStreetInput = document.getElementById('new-invoice-from-street');
    const newInvoiceSenderCityInput = document.getElementById('new-invoice-from-city');
    const newInvoiceSenderPostcodeInput = document.getElementById('new-invoice-from-postcode');
    const newInvoiceToNameInput = document.getElementById('new-invoice-to-name');
    const newInvoiceToEmailInput = document.getElementById('new-invoice-to-email');
    const newInvoiceToStreetInput = document.getElementById('new-invoice-to-street');
    const newInvoiceToCityInput = document.getElementById('new-invoice-to-city');
    const newInvoiceToPostcodeInput = document.getElementById('new-invoice-to-postcode');
    const newInvoiceToCountryInput = document.getElementById('new-invoice-to-country');
    const newInvoiceInvoiceDateInput = document.getElementById('new-invoice-invoice-date');
    const newInvoicePaymentTermsInput = document.getElementById('new-invoice-payment-terms');
    const newInvoiceProjectDescriptionInput = document.getElementById('new-invoice-project-description');
    const newInvoiceInputs = [
        newInvoiceSenderStreetInput,
        newInvoiceSenderCityInput,
        newInvoiceSenderPostcodeInput,
        newInvoiceToNameInput,
        newInvoiceToEmailInput,
        newInvoiceToStreetInput,
        newInvoiceToCityInput,
        newInvoiceToPostcodeInput,
        newInvoiceToCountryInput,
        newInvoiceInvoiceDateInput,
        newInvoicePaymentTermsInput,
        newInvoiceProjectDescriptionInput
    ]

    function clearNewInvoiceForm() {
        newInvoiceInputs.forEach(input => {
            input.value = '';
        })
    }

    function newInvoiceBtnClick() {
        openElemTransition(overlay)
        openElemTransition(newInvoiceFormBlock)
        newInvoiceFormBlock.scrollTop = mainContainer.offsetTop;
    }

    newInvoiceDiscardBtn.addEventListener('click', () => {
        clearNewInvoiceForm()
        closeElemTransition(overlay)
        closeElemTransition(newInvoiceFormBlock)
    })

    function init() {
        newInvoiceBtn.addEventListener('click', newInvoiceBtnClick)
    }

    init()

})
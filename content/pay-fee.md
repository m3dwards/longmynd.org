---
title: Pay Day Fee
date: 2023-03-16T14:37:51.677Z
---
Non members must pay £3 to use the Long Mynd site.

There is an honesty box onsite but if you prefer to pay online you may do so using either:

Paypal 
<form action=https://www.paypal.com/cgi-bin/webscr method="post" target="_top">

<input type="hidden" name="cmd" value="_s-xclick">

<input type="hidden" name="hosted_button_id" value="TDDMBGAYRVP2N">

<input type="image" src=https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif border="0" name="submit" alt="PayPal – The safer, easier way to pay online!">

<img alt="" border="0" src=https://www.paypalobjects.com/en_GB/i/scr/pixel.gif width="1" height="1">

</form>              


\
[Webcollect](https://webcollect.org.uk/lmsc/subscription)

Please make sure you familiarise yourself with our [site guide](/sites/long-mynd) before flying Long Mynd.

<div id="smart-button-container"> <div style="text-align: center;"> <div style="margin-bottom: 1.25rem;"> <p>Day Fee</p> <select id="item-options"><option value="" price="3"> - 3 GBP</option><option value="" price=""> - GBP</option></select> <select style="visibility: hidden" id="quantitySelect"></select> </div> <div id="paypal-button-container"></div> </div> </div> <script src="https://www.paypal.com/sdk/js?client-id=sb&enable-funding=venmo&currency=GBP" data-sdk-integration-source="button-factory"></script> <script> function initPayPalButton() { var shipping = 0; var itemOptions = document.querySelector("#smart-button-container #item-options"); var quantity = parseInt(); var quantitySelect = document.querySelector("#smart-button-container #quantitySelect"); if (!isNaN(quantity)) { quantitySelect.style.visibility = "visible"; } var orderDescription = 'Day Fee'; if(orderDescription === '') { orderDescription = 'Item'; } paypal.Buttons({ style: { shape: 'rect', color: 'gold', layout: 'vertical', label: 'paypal', }, createOrder: function(data, actions) { var selectedItemDescription = itemOptions.options[itemOptions.selectedIndex].value; var selectedItemPrice = parseFloat(itemOptions.options[itemOptions.selectedIndex].getAttribute("price")); var tax = (0 === 0 || false) ? 0 : (selectedItemPrice * (parseFloat(0)/100)); if(quantitySelect.options.length > 0) { quantity = parseInt(quantitySelect.options[quantitySelect.selectedIndex].value); } else { quantity = 1; } tax *= quantity; tax = Math.round(tax * 100) / 100; var priceTotal = quantity * selectedItemPrice + parseFloat(shipping) + tax; priceTotal = Math.round(priceTotal * 100) / 100; var itemTotalValue = Math.round((selectedItemPrice * quantity) * 100) / 100; return actions.order.create({ purchase_units: [{ description: orderDescription, amount: { currency_code: 'GBP', value: priceTotal, breakdown: { item_total: { currency_code: 'GBP', value: itemTotalValue, }, shipping: { currency_code: 'GBP', value: shipping, }, tax_total: { currency_code: 'GBP', value: tax, } } }, items: [{ name: selectedItemDescription, unit_amount: { currency_code: 'GBP', value: selectedItemPrice, }, quantity: quantity }] }] }); }, onApprove: function(data, actions) { return actions.order.capture().then(function(orderData) { // Full available details console.log('Capture result', orderData, JSON.stringify(orderData, null, 2)); // Show a success message within this page, e.g. const element = document.getElementById('paypal-button-container'); element.innerHTML = ''; element.innerHTML = '<h3>Thank you for your payment!</h3>'; // Or go to another URL: actions.redirect('thank_you.html'); }); }, onError: function(err) { console.log(err); }, }).render('#paypal-button-container'); } initPayPalButton(); </script>
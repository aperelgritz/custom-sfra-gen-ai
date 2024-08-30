'use strict';

/**
 * Generates the modal window on the first call.
 *
 */
function getModalHtmlElement() {
	if ($('#quickViewModal').length !== 0) {
		$('#quickViewModal').remove();
	}
	var htmlString =
		'<!-- Modal -->' +
		'<div class="modal fade" id="quickViewModal" role="dialog">' +
		'<span class="enter-message sr-only" ></span>' +
		'<div class="modal-dialog quick-view-dialog">' +
		'<!-- Modal content-->' +
		'<div class="modal-content basket-check">' +
		'<div class="modal-header basket-check">' +
		'    <h3>Basket Check</h3>' +
		'    <button type="button" class="close pull-right basket-check-close" data-dismiss="modal">' +
		'        <span aria-hidden="true">&times;</span>' +
		'        <span class="sr-only"> </span>' +
		'    </button>' +
		'</div>' +
		'<div class="modal-body basket-check" style="min-height:100px"></div>' +
		'<div class="modal-footer basket-check"></div>' +
		'</div>' +
		'</div>' +
		'</div>';
	$('body').append(htmlString);
}

/**
 * replaces the content in the modal window on for the selected product variation.
 * @param {string} basketCheckUrl - url to be used to perform the Basket Check
 */
function fillModalElement(basketCheckUrl) {
	// $('.modal-body').spinner().start();
	// Messages to display while waiting
	var messages = [
		'Grabbing your data',
		'Amazing things are happening...',
		"We're almost there...",
		'Just a few more moments...',
		'Hold tight',
		'Patience is key',
	];
	var emojis = [
		'&#x1F50E;',
		'&#x2B50;',
		'&#x1F913;',
		'&#x1F638;',
		'&#x1F609;',
		'&#x23F3;',
	];
	var messageIndex = 0;

	// Function to update the message
	function showNextMessage() {
		if (messageIndex < messages.length) {
			$('.modal-body.basket-check').append(
				'<div>' + emojis[messageIndex] + ' ' + messages[messageIndex] + '</div>'
			);
			messageIndex++;
		} else {
			clearInterval(messageInterval);
		}
	}

	// Set interval to change the message every 3 seconds
	var messageInterval = setInterval(showNextMessage, 2000);
	$('.modal-body.basket-check').html("<div>&#x1F44D; We're on it!</div>");

	$.ajax({
		url: basketCheckUrl,
		method: 'GET',
		// dataType: 'json',
		dataType: 'html',
		success: function (data) {
			$('.modal-body.basket-check').empty();

			// $('.modal-body').text(data.data.generations[0].text);
			// $('.modal-body').html('<pre>' + data.data.generations[0].text + '</pre>');
			$('.modal-body.basket-check').html(data);

			$('#quickViewModal').modal('show');
			$('body').trigger('quickview:ready');

			// $.spinner().stop();
			clearInterval(messageInterval);
		},
		error: function () {
			// $.spinner().stop();
			clearInterval(messageInterval);
		},
	});
}

function handleBasketCheckPostCartAdd(response) {
	var messageType = response.error ? 'alert-danger' : 'alert-success';
	// show add to cart toast
	if ($('.add-to-cart-messages').length === 0) {
		$('body').append(
			'<div class="add-to-cart-messages" style="left: 85%; z-index: 2000;"></div>'
		);
	}

	$('.add-to-cart-messages').append(
		'<div class="alert ' +
			messageType +
			' add-to-basket-alert text-center" role="alert">' +
			response.message +
			'</div>'
	);

	setTimeout(function () {
		$('.add-to-basket-alert').remove();
	}, 5000);
}

module.exports = {
	showBasketCheck: function () {
		$('body').on('click', '#basket-check', function (e) {
			e.preventDefault();
			var basketCheckUrl = $(this).closest('a#basket-check').attr('href');
			$(e.target).trigger('quickview:show');
			getModalHtmlElement();
			fillModalElement(basketCheckUrl);
		});
	},
	addToCartFromBasketCheck: function () {
		$(document).on('click', 'button.add-to-cart-basket-check', function () {
			var addToCartUrl;
			var pid;

			$('body').trigger('product:beforeAddToCart', this);

			pid = $(this).data('pid');

			addToCartUrl = $(this).siblings('.add-to-cart-url').val();

			var form = {
				pid: pid,
				quantity: 1,
			};

			$(this).trigger('updateAddToCartFormData', form);
			if (addToCartUrl) {
				$.ajax({
					url: addToCartUrl,
					method: 'POST',
					data: form,
					success: function (data) {
						//handleBasketCheckPostCartAdd(data);
						$('body').trigger('product:afterAddToCart', data);
						$.spinner().stop();
					},
					error: function () {
						$.spinner().stop();
					},
				});
			}
		});
	},
	closeBasketCheckModal: function () {
		$('body').on('click', '.basket-check-close', function (e) {
			e.preventDefault();
			$('.modal-body.basket-check').empty();
			$('#quickViewModal').modal('hide');
		});
	},
};

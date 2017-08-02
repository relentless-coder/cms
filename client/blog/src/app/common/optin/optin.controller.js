function optinFunction(optinFactory) {

	const ctrl = this;
	ctrl.subscriber = {};
	ctrl.info = {};
	ctrl.info.message = 'Hey, if you enjoyed this post, then I can drop you an email everytime I write a new post. Your information will not shared with anyone.';

	ctrl.subscribe = function subscribe() {
		if (ctrl.subscriber) {
			optinFactory.submitOptin(ctrl.subscriber).then((data) => {
				ctrl.subscriber = {};
				ctrl.info.message = 'Thank you. You\'ll hear from me soon.'
			}).catch((err) => {
				ctrl.info.message = 'Something went wrong, please try again.'
			})
		} else {
			ctrl.info.message = 'Come on, just two fields.'
		}

	}
}

export default optinFunction
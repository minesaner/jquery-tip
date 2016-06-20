(function () {
	function Tip(element, options) {
		this.options = $.extend({}, Tip.DEFAULT, options);
		this.$element = $(element);
		this.$tip = $(this.options.template);
		this.$arrow = this.$tip.find('.arrow');
		this.$body = $('body');
		this.tip = this.$element.attr(this.options.tip);
		this.tipped = false;
		this.init();
	}
	Tip.DEFAULT = {
		fadeDelay: 200,
		offset: 5,
		position: 'top',
		template: '<div class="tip"><div class="arrow"></div></div>',
		tip: 'tip'
	};

	Tip.prototype.init = function () {
		this.$tip.addClass(this.options.position + '-tip');
		this.$tip.append(this.tip);
		this.$element.hover($.proxy(this.enter, this), $.proxy(this.leave, this));
	};

	Tip.prototype.enter = function () {
		this.$tip.stop(true, true);
		if (!this.tipped) {
			this.appendTip();
			this.tipped = true;
		}
		this.$tip.appendTo(this.$body);
		this.$tip.fadeIn(this.options.fadeDelay);
	};

	Tip.prototype.leave = function () {
		this.$tip.stop(true, true);
		this.$tip.fadeOut(this.options.fadeDelay,$.proxy(function(){
			this.$tip.detach();
		},this));
	};

	Tip.prototype.appendTip = function () {
		var tipOffset = {},
				tipDimension = {},
				elementDimension = {};
		this.$tip.appendTo(this.$body);
		tipDimension.width = this.$tip.outerWidth();
		tipDimension.height = this.$tip.outerHeight();
		elementDimension.width = this.$element.outerWidth();
		elementDimension.height = this.$element.outerHeight();
		elementDimension.left = this.$element.offset().left;
		elementDimension.top = this.$element.offset().top;
		if (this.options.position === 'top' || this.options.position === 'bottom') {
			tipOffset['left'] = elementDimension.left - (tipDimension.width - elementDimension.width)/2;
			tipOffset['top'] = this.options.position === 'top' ? elementDimension.top - tipDimension.height - this.$arrow.outerHeight() - this.options.offset :
				elementDimension.top + elementDimension.height + this.$arrow.outerHeight() + this.options.offset;
		} else {
			tipOffset['top'] = elementDimension.top - (tipDimension.height - elementDimension.height)/2;
			tipOffset['left'] = this.options.position === 'left' ? elementDimension.left - tipDimension.width - this.$arrow.outerWidth() - this.options.offset :
				elementDimension.left + elementDimension.width + this.$arrow.outerWidth() + this.options.offset;
		}
		this.$tip.offset(tipOffset);
	};

	function Plugin(options) {
		return this.each(function () {
			new Tip(this, options);
		});
	}
	$.fn.tip = Plugin;
})();
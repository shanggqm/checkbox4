
(function() {
	//4态复选框  1）未勾选；2）勾选；3）部分勾选；4）不可用（含前三种情况）
    jQuery.fn.checkbox4 = function(options) {
        options = options || {};
    	    
        var fun;

        if(typeof options === 'string'){
            fun = options;
            var args = arguments[1], obj = {};
            args !== undefined && (obj[options] = args);
            options = obj;
        }

        var settings = jQuery.extend(defaults, options); 
                    
        function check(){
            this.prop('checked', settings.check).trigger('change');
        }

        function partialCheck(){
            this.siblings('span').removeClass().addClass(settings.partialCheckedClass);
            //partial is another kind status of unchecked
            this.prop('checked', false).attr('data-partial', settings.partialCheck.join('|'));
        }

        function disabled(){
            this.prop('disabled', settings.disabled);
            var root = this.parent(),
                cls = settings.disabledClass;

            settings.disabled ? root.addClass(cls) :root.removeClass(cls);
        }

        return this.each(function() {
            var me = jQuery(this);

            //only do partialCheck
            if(fun){
                eval(fun + '.call(me)');
            	return;
            }
            me.removeAttr('data-partial');
            
            var replacement = jQuery('<div class="' + settings.className + '"><span></span></div>');
            var element = jQuery('span', replacement);
            
            me.prop('checked') && element.addClass(settings.checkedClass);
            me.prop('disabled') && replacement.addClass(settings.disabledClass);
            
            
            element.on('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                if(me.parent().is('.' + settings.disabledClass)){
                    return;
                }
                var input = jQuery('input', replacement);
                input.prop('checked',!input.prop('checked'))
                	 .trigger('change');
                
                return false;
            });
            
            me.on('change', function(event) {
                var input = jQuery(this);
                input.removeAttr('data-partial');
                element.removeClass(settings.partialCheckedClass);
                
                if (input.prop('checked')) {
                    element.addClass(settings.checkedClass);
                } else {
                    element.removeClass(settings.checkedClass);
                }
                
                return true;
            });
            me.before(replacement).insertAfter(element);
        });
    }

    var defaults = {
        'className': 'jquery-checkbox4',
        'checkedClass': 'checked',
        'partialCheckedClass':'partial-checked',
        'disabledClass':'jquery-checkbox4-disabled'
    };
})();
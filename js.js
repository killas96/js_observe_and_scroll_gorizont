$(document).ready(function() {
	if(window.innerWidth < 768){
		//количетсво товаров и след/пред старт
		var parent = $(".result-list"), 
		wrapper = $('.catalog-wrapper.row', parent), 
		count = wrapper.children().length,
		step = 1,
		scrollbar = '<div class="scrollbar row"><div class="prevEl col-xs-2"><</div><div class="center col-xs-8">' + step + '/' + count + '</div><div class="nextEl col-xs-2">></div></div>',
		itemWidth = $('.cb-b01__item', parent).width(),
		fixScroll = 25;
		
		parent.prepend(scrollbar);
		parent.on('click', '.nextEl', function(){
			wrapper.scrollLeft(wrapper.scrollLeft() + itemWidth + fixScroll);	
			/*
			if(step < count) {
				step++;
				$('.scrollbar .center', parent).text(step + '/' + count );
			}
			*/
		});
		parent.on('click', '.prevEl', function(){
			wrapper.scrollLeft(wrapper.scrollLeft() - (itemWidth + fixScroll));
			/*
			if(step > 1) {
				step--;
				$('.scrollbar .center', parent).text(step + '/' + count );
			}
			*/
		});		
		wrapper.on( 'scroll', function(){
			var scroll = wrapper.scrollLeft();
			step = Math.ceil(scroll / (itemWidth));
			if(step == 0)
				step = 1;
			$('.scrollbar .center', parent).text(step + '/' + count );
		});
		//количетсво товаров и след/пред конец
		
		// кнопка оформить заказ внизу старт
		var btnOrdering = $('.btnOrdering'), footer = $('footer'), cloneBtnOrdering;
		cloneBtnOrdering = btnOrdering.clone();
		cloneBtnOrdering.addClass('cloneBtnOrdering');
		cloneBtnOrdering.appendTo("body");
		cloneBtnOrdering.css({'position' : 'fixed', 'bottom':'0', "z-index":"999"}).hide();	
		if (window.IntersectionObserver) {
			console.log('window.IntersectionObserver');
			var options = {
				rootMargin: '20px 0px 500px 0px',
				threshold: 1.0
			}
			var 
				callback = 
					function(entries, observer) {
						entries.forEach(entry => {
							if (entry.isIntersecting) {
								//console.log('entry', entry);
								cloneBtnOrdering.hide();
								footer.css({'padding-bottom' : '0px'})					
							} else {					
								cloneBtnOrdering.show();
								footer.css({'padding-bottom' : '50px'})		
							}
						  });
					},
				observer = new IntersectionObserver(callback, options);
			observer.observe(btnOrdering[0]);
		}
		// кнопка оформить заказ внизу конец
	}
});

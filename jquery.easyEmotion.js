// Easy Emotion plugin for Jquery
(function($){  
	$.fn.easyEmotion = function(options){
		var defaults = {
			boxboxId : 'facebox',
			path : 'emotion/',
			bind : '#content',
			startIndex:1,
			endIndex:54,
			columns:9,
			tip : '表情',
			showImgClass:'showImg'
		},
		option = $.extend(defaults, options),
		bind = $(option.bind),
		boxId = option.boxId,
		path = option.path,
		startIndex = option.startIndex,
		endIndex = option.endIndex,
		columns = startIndex-1 + option.columns,
		showImgClass = option.showImgClass;
		tip = option.tip;
		
		
		if(bind.length<=0){
			alert('找不到bind配置组件');
			return false;
		}
		
		$(this).click(function(e){
			var strFace, labFace;
			if($('#'+boxId).length<=0){
				strFace = '<div id="'+boxId+'" style="position:absolute;display:none;z-index:1000;">' +
							  '<table border="0" cellspacing="0" cellpadding="0"><tr>';
				for(var i=startIndex; i<=endIndex; i++){
					labFace = '[/'+tip+i+']';
					strFace += '<td><img class="smallImg" src="'+path+i+'.gif" onclick="$(\''+option.bind+'\').setCaret();$(\''+option.bind+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
					if( i % columns == 0 ) strFace += '</tr><tr>';
				}
				strFace += '</tr></table></div>';
			}
			$('body').append(strFace);
			var offset = $(this).position(),
			top = offset.top + $(this).outerHeight(),
			$box = $('#'+boxId);
			$box.css('top',top);
			$box.css('left',offset.left);
			$box.show();
			e.stopPropagation();
		});

		$(document).click(function(){
			$('#'+boxId).hide();
			$('#'+boxId).remove();
		});
		return {
			
			getEmotionValue:function() {
				var str = bind.val();
				str = str.replace(/\</g,'&lt;');
				str = str.replace(/\>/g,'&gt;');
				str = str.replace(/\n/g,'<br/>');
				str = str.replace(/\[\/表情([0-9]*)\]/g,'<img class="'+showImgClass+'" src="'+path+'$1.gif" border="0" />');
				//$('#result').html($('#result').html() + str);
				return str;
			}
		}
	};

})(jQuery);

jQuery.extend({ 
unselectContents: function(){ 
	if(window.getSelection) 
		window.getSelection().removeAllRanges(); 
	else if(document.selection) 
		document.selection.empty(); 
	} 
}); 
jQuery.fn.extend({ 
	selectContents: function(){ 
		$(this).each(function(i){ 
			var node = this; 
			var selection, range, doc, win; 
			if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){ 
				range = doc.createRange(); 
				range.selectNode(node); 
				if(i == 0){ 
					selection.removeAllRanges(); 
				} 
				selection.addRange(range); 
			} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){ 
				range.moveToElementText(node); 
				range.select(); 
			} 
		}); 
	}, 

	setCaret: function(){ 
		if(!$.browser.msie) return; 
		var initSetCaret = function(){ 
			var textObj = $(this).get(0); 
			textObj.caretPos = document.selection.createRange().duplicate(); 
		}; 
		$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret); 
	}, 

	insertAtCaret: function(textFeildValue){ 
		var textObj = $(this).get(0); 
		if(document.all && textObj.createTextRange && textObj.caretPos){ 
			var caretPos=textObj.caretPos; 
			caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ? 
			textFeildValue+'' : textFeildValue; 
		} else if(textObj.setSelectionRange){ 
			var rangeStart=textObj.selectionStart; 
			var rangeEnd=textObj.selectionEnd; 
			var tempStr1=textObj.value.substring(0,rangeStart); 
			var tempStr2=textObj.value.substring(rangeEnd); 
			textObj.value=tempStr1+textFeildValue+tempStr2; 
			textObj.focus(); 
			var len=textFeildValue.length; 
			textObj.setSelectionRange(rangeStart+len,rangeStart+len); 
			textObj.blur(); 
		}else{ 
			textObj.value+=textFeildValue; 
		} 
	} 
});
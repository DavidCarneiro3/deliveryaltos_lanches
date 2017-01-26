
var info="";

$.ajax({
        type: "GET",
        url: "http://altoslanches.com.br/webservice/produtos.php",
        timeout: 8000,
		crossDomain: true,
        //contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
		error: function (request, status, erro) {
            alert("Problema ocorrido: " + status + "\nDescrição: " + erro);
            //Abaixo está listando os header do conteudo que você requisitou, só para confirmar se você setou os header e dataType corretos
            alert("Informações da requisição: \n" + request.getAllResponseHeaders());
        },
        success: function (result) {
           //alert(result);
            // Interpretando retorno JSON...
            info = (result);
			$(document).ready(function(){
				listaItens(info);
			});
			
		}
});


function listaItens(objeto){    
   var li = "";
   var cont = 0;
   $.each(objeto, function (i, name) {
        //add the <li> to "li" variable
        //note the use of += in the variable
        //meaning I'm adding to the existing data. not replacing it.
        //store index value in array as id of the <a> tag
	
		if(name.entrega == 0){
			if(cont == 0){
				alert("Desculpe, estamos fechados, confira nosso cardápio e faça seu pedido mais tarde. ;)");
			}
			if(name.cat.indexOf('Pizza') != -1){
			if(name.promo == 1){
				var promocao = "- Promo."
			}
			else{
				promocao = "";
			}
			li += '<li>'+ 
			'<img src="http://altoslanches.com.br/css/produtos/'+name.img+'" width="100%" height="100%" class="ui-li-thumb"><h2 class="controler">'+name.nome+' '+ promocao +'</h1>'+
			'<p id="texto">'+name.desc+'</p>'+
			'<p>R$'+name.valorb+'B R$'+name.valorp+'P R$'+name.valorm+'M R$'+name.valorg+'G</p>'+
			'</li>';
			}
			else{
				li += '<li>' + 
				'<img src="http://altoslanches.com.br/css/produtos/'+name.img+'" width="100%" height="100%" class="ui-li-thumb"><h2 class="controler">'+name.nome + '</h1>'+
				'<p id="texto">'+name.desc+'</p>'+
				'<p>R$'+name.valorp+'</p>'+
				'</li>';
			}
		}
		else{
			if(name.cat.indexOf('Pizza') != -1){
			if(name.promo == 1){
				var promocao = "- Promo."
			}
			else{
				promocao = "";
			}
			li += '<li><a href="#" id="' + i + '" class="info-go">' + 
			'<img src="http://altoslanches.com.br/css/produtos/'+name.img+'" width="100%" height="100%" class="ui-li-thumb"><h2 class="controler">'+name.nome+' '+ promocao +'</h1>'+
			'<p id="texto">'+name.desc+'</p>'+
			'<p>R$'+name.valorb+'B R$'+name.valorp+'P R$'+name.valorm+'M R$'+name.valorg+'G</p>'+
			'</a></li>';
			}
			else{
				li += '<li><a href="#" id="' + i + '" class="info-go">' + 
				'<img src="http://altoslanches.com.br/css/produtos/'+name.img+'" width="100%" height="100%" class="ui-li-thumb"><h2 class="controler">'+name.nome + '</h1>'+
				'<p id="texto">'+name.desc+'</p>'+
				'<p>R$'+name.valorp+'</p>'+
				'</a></li>';
			}
		}
        cont = cont + 1;
    });
	
    /*for(var ind in objeto){
       li += '<li><a class="info-go" href="#" id="'+objeto[ind]['id']+'">'+
              '<img src="'+objeto[ind]['img']+'" class="ui-li-thumb">'+
              '<h2>'+objeto[ind]['id']+' - '+objeto[ind]['nome']+'</h2>'+
              '<p>Descrição: '+objeto[ind]['desc']+'</p>'+
              '<p>Valor: '+objeto[ind]['valor']+'</p>'+
              '</a></li>';
    }*/
	$('#prof-list').append(li).promise().done(function () {
			//wait for append to finish - thats why you use a promise()
			//done() will run after append is done
			//add the click event for the redirection to happen to #details-page
			$(this).on("click", ".info-go", function (e) {
				e.preventDefault();
				var valor = $('#inp-info').val();
				//store the information in the next page's data
				$("#ped-page").data("info", info[this.id]);
				//$('#infor2').html("pedido N.: "+$('#inp-info').val());
				$('#inp-info1').val(valor);
				//change the page # to second page. 
				//Now the URL in the address bar will read index.html#details-page
				//where #details-page is the "id" of the second page
				//we're gonna redirect to that now using changePage() method
				$.mobile.changePage("#ped-page");
			});

			//refresh list to enhance its styling.
			$(this).listview("refresh");
		});
	//use pagebeforeshow
	//DONT USE PAGEINIT! 
	//the reason is you want this to happen every single time
	//pageinit will happen only once
	$(document).on("pagebeforeshow", "#ped-page", function () {
		//get from data - you put this here when the "a" wa clicked in the previous page
		var info = $(this).data("info");
		//alert(info[nome]);
		//string to put HTML in
		var info_view = '<option value="">Metade</option>';
		$('#select-metade').html(info_view);
		//use for..in to iterate through object
		for (var key in info) {
			//Im using grid layout here.
			//use any kind of layout you want.
			//key is the key of the property in the object 
			//if obj = {name: 'k'}
			//key = name, value = k
				
		}
		for(var ind in objeto){
			var str = objeto[ind]['cat'];
			if(str.match(/Pizza/))
			  info_view += '<option value="'+objeto[ind]['nome']+'">' + objeto[ind]['nome'] + '</option>';
			
		}
		$('#select-metade').html(info_view);
		//add this to html
		var inp = '<input type="hidden" name="id-prod" id="id-prod" value="'+info['id']+'">';
		var button = '<a href="#" class="ui-btn ui-btn-b">Finalizar Pedido</a>';
		var control = '<form><fieldset data-role="controlgroup" data-type="horizontal"><legend>Borda</legend><input type="radio" name="radio" id="a" value="Catupiry"><label for="a">Catupiry</label><input type="radio" name="radio" id="b" value="Cheddar"><label for="b">Cheddar</label><input type="radio" name="radio" id="c" value="Chocolate"><label for="c">Chocolate</label></fieldset></form>';
		//$(this).find("[data-role=content]").html(info['nome']);
		if(info['promo'] == 1){
					var promocao = '- Promo.';
				}
				else{
					promocao = "";
				}
		$('#control').html('<b style="font-size:14px;">'+info['nome']+' '+promocao+'</b><br>'+info['desc']+'<br>');
		$('#control').addClass('vermelho');
		$('#nome').val(info['nome']);
		$('#categ').val(info['cat']);
		$('#valor').val(info['valor']);
		//$('#control2').append(inp);
		document.getElementById('id-prod').value = info['id'];
		document.getElementById('tipo').value = info['tipo'];
		if(info['cat'] == 2){
			$('#select-borda').val("nenhum");
			$('#select-metade').val("0");
			$('#borda').removeClass('ui-field-contain').addClass('esconder');
			$('#metade').removeClass('ui-field-contain').addClass('esconder');
		}
		if(info['cat'] == "Pizzas"){
			$('#beb').hide();
			$('#esconde').removeClass('esconder').addClass('ui-field-contain');
			$('#esconde2').removeClass('esconder').addClass('ui-field-contain');
		}
		
		if(info['cat'].indexOf('Promo') != -1){
			$('#esconde').removeClass('ui-field-contain').addClass('esconder');
			$('#esconde2').removeClass('esconder').addClass('ui-field-contain');
			$('#beb').show();
		}
		if(info['cat'].indexOf('Promo') == -1 && info['cat'].indexOf('Pizza') == -1){
			$('#esconde').removeClass('ui-field-contain').addClass('esconder');
			$('#esconde2').removeClass('ui-field-contain').addClass('esconder');
			$('#beb').show();
		}
		
		function pega(){
			var val = document.getElementById('opcao2').value;
			alert(val);
			$("#obs2").attr("placeholder", "Observação "+val+" Ex: Sem cebola, sem milho...");
		}
		
			//var valor = document.getElementById('select-tam').value;
			/*alert(valor);
			if(info['cat'].indexOf('Promoções') != -1){
				alert(valor);
				$('#beb').show();
			}else{
				$('#beb').hide();
			}*/
		
		
	
		

	});	
     	
  
}








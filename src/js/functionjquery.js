var type;
var typed;
var message;

function selectedType(id){
	type = $("#"+id).html();
	$("#type").html(type);
	typed = id;
}

function forgotPwd(){
	alert("recuperar contraseña");
}

function sendData(){
	//$(".modal-dialog").css({'margin-left':'10px','margin-top':'25px'});
	if(type == "" || type == undefined){
		message = "Seleccione identidad";
		messageModal(message);
	}else if($("#usr").val() == "" || $("#usr").val() == undefined){
		message = "Ingrese su usuario";
		messageModal(message);
	}else if($("#pswd").val() == "" || $("#pswd").val() == undefined){
		message = "Ingrese su contraseña";
		messageModal(message);
	}else{
		executeSendData();
	}
}

function messageModal(message){
	$(".modal").fadeIn(300);
	$(".contenido_modal").html(message);
	$(".modal-footer").html('<button type="button" onclick="ocultarVentanaModal();" class="btn btn-info" data-dismiss="modal">Cerrar</button>');
			$(".modal-header").html('<span id="htit"><strong></strong></span><button type="button" class="close" onclick="ocultarVentanaModal();"  data-dismiss="modal" aria-hidden="true">&times;</button>');
}

function ocultarVentanaModal(){
	$(".modal").fadeOut(300);
}

function executeSendData(){
	angular.element(document.getElementById('wrapper')).scope().initSession(typed);
}
$(document).ready(function() {

	$('#formulario').on('submit', function(e) {
		e.preventDefault();
		
		var nombre = $('#nombre').val();

		var apellido = $('#apellido').val();

		var celular = $('#celular').val();
        
		var email = $('#email').val();
	
		var comentario = $('#comentario').val();
					
		
		$.ajax({
			url:'https://formspree.io/f/xknybejj',
			method:'POST',
			data:{
				nombre:nombre,
				apellido:apellido,
				celular:celular,
                _replyto:email,
				 email:email,
				comentario:comentario,
				_subject:'Formulario de Consultas',
			},
			dataType:"json",
			success:function() {
				console.log('success');	
			
            document.getElementById("formulario").reset();
				$('#thankyouBlock').show();
               
                
                  
			}	

		});		
		
	});

});	


function eliminarAlerta() {
    let alert = document.getElementById("thankyouBlock");
    if (alert) {
        alert.remove() 
    }
}

$("#cerrar").click(() => {
    eliminarAlerta();
})
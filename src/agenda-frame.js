/*********************************************************************/
/*******Variárives Globais********************************************/

var addAt = document.getElementById('btAdd');//bt incluir atividade
var addConf = document.getElementById('btConf');//bt confirmar inclusão
var addCanc = document.getElementById('btCanc');//bt cancelar inclusão
var bdAgenda = []; // banco de dados da agenda


/*********************************************************************/
/*******Funcionalidades dos Botões************************************/
//Acção para pŕeencher da data atual qdo carregar a página.
window.addEventListener('pageshow', (event) => {
	hj = new Date;
	document.getElementById('diaAtual').textContent = `Agenda dia ${hj.getDate()}
	 / ${hj.getMonth()+1} / ${hj.getFullYear()}`;	 
});

// Ação do Botão para incluir atividade
addAt.addEventListener('click', 
	function (){
		this.hidden = true;
		document.getElementById('addTable').hidden = false;			
	});
	
//Ação do Botão Confirmar (confirma a inclusão de dados no formulário)	
addConf.addEventListener('click', 
	function (){		
		document.getElementById('addTable').hidden = true;
		addAt.hidden = false;
		
		let hInicio =  parseInt(document.getElementById('hAtivInicio').value);
		let mInicio = parseInt(document.getElementById('mAtivInicio').value);
		let hFim = parseInt(document.getElementById('hAtivFim').value);
		let mFim = parseInt(document.getElementById('mAtivFim').value);
		//let tInicio =  hInicio * 60 + mInicio; /tempo em minutos
		//let tFim = hFim * 60 + mFim;	/tempo em ninutos
		
		tempItem = {
		nome:   document.getElementById('ativNome').value,
		inicio: {
			hora:  hInicio,
			minuto: mInicio,
			//tempoInicio: tInicio,
		},
		fim: {
			hora: hFim,
			minuto: mFim,
			//tempoFim: tFim,
		},
		status: 0,
		progress: 0,
		};
		bdAgenda[bdAgenda.length] = tempItem;
		alert("Inclusão de dados realizada");
		document.getElementById("ativNome").value = null; // LIMPA O INPUT	
		ExibeAgenda ();
		
	});

//Ação do Botão Cancelar (cancela a inclusão de dados no formulário)	
addCanc.addEventListener('click', 
	function (){		
		document.getElementById('addTable').hidden = true;
		addAt.hidden = false;		
	});
	
//Função para exibir tabela da agenda:
function ExibeAgenda () {
	var tabela = document.getElementById('tabelaAgenda');
	var textoHTML = `
	<table class="table">
		  <thead>
			<tr>
			  <th scope="col">#</th>
			  <th scope="col">Descrição</th>
			  <th scope="col">Inicio</th>
			  <th scope="col">Fim</th>
			</tr>
		  </thead>
		  <tbody>
	`; //Preencher o HEADER da Tabela.
	
	if (bdAgenda.length == 0){//se não tem atidivada programada	
		tabela.innerHTML = textoHTML + `
		<tr>		  
			<td colspan="4"><i>Nenhuma Atividade Cadastrada</i></td>
		</tr>
		`;//preenche uma linha dizendo que não tem atividade programada
	} else {
		
		for (var i = 0; i < bdAgenda.length; i++){
			console.log("chegou no FOR");
			textoHTML +=`
						<tr>
							  <th scope="row">${i+1}</th>
							  <td>${bdAgenda[i].nome}</td>
							  <td>${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].inicio.hora) } : ${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].inicio.minuto)}</td>
							  <td>${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].fim.hora) } : ${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].fim.minuto)}</td>
							 						  
						</tr>							
						`;						
		}//fim do for
		tabela.innerHTML = textoHTML; //imprime a tabela.
	} //fim do else
		
}//fim da função ExibeAgenda


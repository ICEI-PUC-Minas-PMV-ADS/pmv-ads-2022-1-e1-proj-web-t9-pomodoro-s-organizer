/*********************************************************************/
/*******Variárives Globais********************************************/

var addAt = document.getElementById('btAdd');//bt incluir atividade
var addConf = document.getElementById('btConf');//bt confirmar inclusão
var addCanc = document.getElementById('btCanc');//bt cancelar inclusão
var bdAgenda = JSON.parse(localStorage.getItem("bdAgenda")); // banco de dados da agenda
var bdTemp = [];

//ação que trata o bdAgenda e exibe a tabela de atividades no momento do carregamento.	
window.onload = function(){
		if(bdAgenda == null)
		bdAgenda = [];
		ExibeAgenda ();
	};

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
		carregaTemp(); //carrega dados temporarios nos forms (se tiver).
		exibeConfirma(); // verificar condições para habilitar botão confirma.
	});	
	
	
//Ação do Botão Confirmar (confirma a inclusão de dados no formulário)	
addConf.addEventListener('click', 
	function (){		
		
		document.getElementById('addTable').hidden = true;//esconde o botão incluir
		addAt.hidden = false;//exibe a tabela para inclusão	
		if (dadovazio() && maxtemp() && mintemp() && validatemp()){//se não existir nenhum erro.
			incluir();//faz a inclusão
			alert("Inclusão de dados realizada");
			bdTemp = []; //reinicia a arrey temporária.
			ExibeAgenda ();//atualiza a tabela da agenda.
		} else {
			gravaTemp(); // grava os dados do formulário para reexibição.
		}			
	});

//Ação do Botão Cancelar (cancela a inclusão de dados no formulário)	
addCanc.addEventListener('click', 
	function (){
		document.getElementById('addTable').hidden = true;
		addAt.hidden = false;
		bdTemp = [];
		exibeConfirma();	
	});	

/*********************************************************************/
/*************************FUNÇÕES************************************/

//grava os dados do formulário em uma variável temporária.
function gravaTemp(){
		var nome = document.getElementById('ativNome').value;	
		var hIni=  parseInt(document.getElementById('hAtivInicio').value);
		var mIni = parseInt(document.getElementById('mAtivInicio').value);
		var hF = parseInt(document.getElementById('hAtivFim').value);
		var mF= parseInt(document.getElementById('mAtivFim').value);
				
		//cria variável no formato para ser incluído no Bd
		bdTemp = [
		nome,
		hIni,
		mIni,			
		hF,
		mF]		
}

function carregaTemp (){//carrega o formulário com os dados temporários guardado.
		if (bdTemp.length > 0){
			document.getElementById('ativNome').value = bdTemp[0];
			document.getElementById('hAtivInicio').value = bdTemp[1];
			document.getElementById('mAtivInicio').value = bdTemp[2];
			document.getElementById('hAtivFim').value = bdTemp[3];
			document.getElementById('mAtivFim').value = bdTemp[4];
		}
}

//carrega os dados temporários nos campos do formulário.
function maxtemp (){
		let nomeAtivi = document.getElementById('ativNome').value;	
		let hInicio =  parseInt(document.getElementById('hAtivInicio').value);
		let mInicio = parseInt(document.getElementById('mAtivInicio').value);
		let hFim = parseInt(document.getElementById('hAtivFim').value);
		let mFim = parseInt(document.getElementById('mAtivFim').value);
		let tInicio =  hInicio * 60 + mInicio; //tempo em minutos
		let tFim = hFim * 60 + mFim;	//tempo em ninutos
	
	if (tFim- tInicio > 120){//atividaed ultrapassa 2h
		alert("Atividade não pode exceder 2 horas");
		gravaTemp();
		
		return false; // retorna zero para falso (ERRO)
	} else {
		return true;
	}
	
}//fim da função max2h

function mintemp(){
		let nomeAtivi = document.getElementById('ativNome').value;	
		let hInicio =  parseInt(document.getElementById('hAtivInicio').value);
		let mInicio = parseInt(document.getElementById('mAtivInicio').value);
		let hFim = parseInt(document.getElementById('hAtivFim').value);
		let mFim = parseInt(document.getElementById('mAtivFim').value);
		let tInicio =  hInicio * 60 + mInicio; //tempo em minutos
		let tFim = hFim * 60 + mFim;	//tempo em ninutos
	
	if (tFim- tInicio < 30){//atividaed tem que tempo superia a 30 min
		alert("Atividade deve ter no mínimo 30 min");
		gravaTemp();		
		
		return false; // retorna zero para falso (ERRO)
	} else {
		return true;
	}
	
}// fim da função min temp.
	
//Função para exibir tabela da agenda:
function ExibeAgenda () {
	var tabela = document.getElementById('tabelaAgenda');
	var textoHTML = `
	<table class = "table table-bordered">
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
		</tbody>
		</table>
		`;//preenche uma linha dizendo que não tem atividade programada
	} else {
		
		//preencher cada linha da tabela com os dados que foram inseridos pelo usuário.
		for (var i = 0; i < bdAgenda.length; i++){
			textoHTML +=`
						<tr>
							  <th scope="row" rowspan = "2" class="align-middle">${i+1}</br>
							  </th>
							  <td class="align-middle"><b>${bdAgenda[i].nome}</b></td>
							  <td>${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].inicio.hora) } : ${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].inicio.minuto)}</td>
							  <td>${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].fim.hora) } : ${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].fim.minuto)}</td>
							  
						</tr>
						<tr>
							
							<td class="align-middle"> 
							
								<form>
														
								 <input type="range" id = "statusbar${i}" name = "${i}" min = "0" max = "100" step = "1" value = "${bdAgenda[i].progress}">
								</form>
							
							</td>
							
							<td colspan="3">
								<div class = "btn-group">
									<button type="button" class="btn btn-outline-secondary">
										<span id = "btn-play-${i}" name = "${i}">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
												<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
												<path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
											</svg>	
										</span>
									
									<button type="button" class="btn btn-outline-secondary" onclick = perExc(${i})>
										<span id = "btn-exc-${i}" name = "${i}">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
												<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
												<path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
											</svg>
										 </span>
									</button>
									
										
									<button type="button" class="btn btn-outline-secondary">
										<span id = "btn-alt-${i}" name = "${i}">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
												path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
												<path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
											</svg>
										</span>
									</button>
									
								</div>								
							</td>
						</tr>
						
						<tr id = "interation-table-${i}" hidden>
						
						</tr>
							
						`;						
		}//fim do for
		textoHTML +=`</tbody>
						</table>`
		tabela.innerHTML = textoHTML; //imprime a tabela.
	} //fim do else
		
}//fim da função ExibeAgenda

//função para incluir item
function incluir (){
		var nomeAtivi = document.getElementById('ativNome').value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio').value);
		var mInicio = parseInt(document.getElementById('mAtivInicio').value);
		var hFim = parseInt(document.getElementById('hAtivFim').value);
		var mFim = parseInt(document.getElementById('mAtivFim').value);
		var tInicio =  hInicio * 60 + mInicio; //tempo em minutos
		var tFim = hFim * 60 + mFim;	//tempo em ninutos
		
		//cria variável no formato para ser incluído no Bd
		tempItem = {
		nome:   nomeAtivi,
		inicio: {
			hora:  hInicio,
			minuto: mInicio,
			tempo: tInicio,
		},
		fim: {
			hora: hFim,
			minuto: mFim,
			tempo: tFim,
		},
		status: 0,
		progress: 0,
		};		
		//inclui o item no BD Agenda
		bdAgenda[bdAgenda.length] = tempItem;
		ordenar();
		localStorage.setItem("bdAgenda", JSON.stringify(bdAgenda));
}//fim da função incluir

//função para ordenar o lista de avtividades (bubble sort).
function ordenar(){
	var bdSize = bdAgenda.length;
	
	if (bdSize > 0) {		
		for (var i = 1; i < bdSize; i++){
			for (var j = 0; j < bdSize - 1; j++){
				if (bdAgenda[j].inicio.tempo > bdAgenda[j+1].inicio.tempo){
					var hold = bdAgenda[j];
					bdAgenda[j] = bdAgenda[j+1];
					bdAgenda[j+1] = hold;					
				}
			}			
		}	
	}	
}// fim da função ordenar.


//função exibe botão de confirmar (só exibe qdo todos os dados estão preenchidos)
function exibeConfirma(){
		var nomeAtivi = document.getElementById('ativNome').value;
		var hInicio =  document.getElementById('hAtivInicio').value;
		var mInicio = document.getElementById('mAtivInicio').value;
		var hFim = document.getElementById('hAtivFim').value;
		var mFim = document.getElementById('mAtivFim').value;	
		
		if (nomeAtivi == "" || hInicio == "-1" || mInicio == "-1" || hFim == "-1" || mFim == "-1"){
			addConf.disabled = true;		
			
		}
		else {
			addConf.disabled = false;
				
		}
}//fim da função exibeConfirma

//função valida tempo repetido
function validatemp(){
	
		var nomeAtivi = document.getElementById('ativNome').value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio').value);
		var mInicio = parseInt(document.getElementById('mAtivInicio').value);
		var hFim = parseInt(document.getElementById('hAtivFim').value);
		var mFim = parseInt(document.getElementById('mAtivFim').value);
		var tInicio =  hInicio * 60 + mInicio; //tempo em minutos
		var tFim = hFim * 60 + mFim;	//tempo em ninutos
		
		var tamanhoBD = bdAgenda.length;
		
		var result = false;
		
		if (tamanhoBD == 0){
			result = true;
			
		} else {
			for (var i = 0; i < tamanhoBD; i++){
				if( tInicio > bdAgenda[i].inicio.tempo && tInicio < bdAgenda[i].fim.tempo){
					alert ("O inicio da atividade coincide com outra atividade já programada");
					result = false;
					break;
					
				} else if( tFim > bdAgenda[i].inicio.tempo && tFim < bdAgenda[i].fim.tempo){
					alert ("O Fim da atividade coincide com outra atividade já programada");
					result = false;
					break;
					
				} else if(bdAgenda[i].inicio.tempo > tInicio && bdAgenda[i].inicio.tempo < tFim) {
					alert ("Já existe atividade programada neste horário");
					result = false;
					break;
					
				} else if(bdAgenda[i].fim.tempo > tInicio && bdAgenda[i].fim.tempo < tFim){
					alert ("Já existe atividade programada neste horário");
					result = false;
					break;
					
				} else {
					result = true;
				}
			} // fim do for
		
		}
		return result;		
} // fim da função de validar tempo.

//função - check dado vazio
function dadovazio(){
		
		let nomeAtivi = document.getElementById('ativNome').value;
		let hInicio =  document.getElementById('hAtivInicio').value;
		let mInicio = document.getElementById('mAtivInicio').value;
		let hFim = document.getElementById('hAtivFim').value;
		let mFim = document.getElementById('mAtivFim').value;
		
		if (nomeAtivi == "" || hInicio == "-1" ||  mInicio == "-1" || hFim == "-1" || mFim == "-1"){
			alert("Favor preencher todos os dados");
			return false;			
		} else {
			return true;
			}//fim do else
}// fim da função dadovazio

//função timer (Protótipo)
var tempoEmMinutos = 25;
var expiracao = new  Date(new Date().getTime() + tempoEmMinutos * 60000);

//função para exibir pergunta exclusão
function perExc(element) {
	var tdBOX = document.getElementById("interation-table-"+element)
	
	tdBOX.hidden = false;
	
	tdBOX.innerHTML = `
							<td colspan = "4">
							
							<button type="reset" id="btConfExc-${element}" class="btn btn-dark" onclick = "excluir(${element})"> Confirmar Exclusão</button>				
							
							
							<button type="reset" id="btCancExc-${element}" class="btn btn-dark" onclick = "ExibeAgenda ()"> Cancelar</button>				
						
							</td>
						
						`;
}

//função para excluir item da agenda.
function excluir(element){
	bdAgenda.splice(element, 1);	
	localStorage.setItem("bdAgenda", JSON.stringify(bdAgenda));
	ExibeAgenda ();	
}

//=================================================================================
//Relógio temporário

contador = window.setInterval(function(){
    faltam = expiracao - new Date();
    if (faltam <= 0){
        window.clearInerval(contador);
        //console.log("Prazo expirado");
    }
    minutos = Math.floor(faltam / 60000);
    segundos = faltam % 60000;
    tempoRestante = `${minutos}:${segundos.toString().substring(0,2)}`;

    //abaixo, coloque no lugar de 'tempo' o id do elemento do html que contem o timer
    document.getElementById('timer').innerHTML = `<h3>${tempoRestante}</h3>`;
    //console.log(tempoRestante);
}, 1000);

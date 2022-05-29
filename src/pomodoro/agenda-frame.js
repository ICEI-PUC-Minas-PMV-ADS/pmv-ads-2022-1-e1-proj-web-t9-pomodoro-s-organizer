/*********************************************************************/
/*******Variárives Globais********************************************/

var addAt = document.getElementById('btAdd');//bt incluir atividade
var addConf = document.getElementById('btConf-i');
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
		carregaTemp('i'); //carrega dados temporarios nos forms (se tiver).
		exibeConfirma('i'); // verificar condições para habilitar botão confirma.
	});	
	
	
//Ação do Botão Confirmar (confirma a inclusão de dados no formulário)	
addConf.addEventListener('click', 
	function (){		
		// 'i' como parâmetro se refere ao botão de inclusão.
		document.getElementById('addTable').hidden = true;//esconde o botão incluir
		addAt.hidden = false;//exibe a tabela para inclusão	
		if (dadovazio('i') && maxtemp('i') && mintemp('i') && validatemp('i', bdAgenda)){//se não existir nenhum erro.
			incluir('i',bdAgenda);//faz a inclusão
			alert("Inclusão de dados realizada");
			ordenar(bdAgenda);		
			localStorage.setItem("bdAgenda", JSON.stringify(bdAgenda));
			bdTemp = []; //reinicia a arrey temporária.
			
			ExibeAgenda ();//atualiza a tabela da agenda.
		} else {
			gravaTemp('i'); // grava os dados do formulário para reexibição.
		}			
	});

//Ação do Botão Cancelar (cancela a inclusão de dados no formulário)	
addCanc.addEventListener('click', 
	function (){
		document.getElementById('addTable').hidden = true;
		addAt.hidden = false;
		bdTemp = [];
		exibeConfirma('i');	
	});	

/*********************************************************************/
/*************************FUNÇÕES************************************/

//grava os dados do formulário em uma variável temporária.
function gravaTemp(indice){
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
				
		//cria variável no formato para ser incluído no Bd
		bdTemp = [
		nomeAtivi,
		hInicio,
		mInicio,			
		hFim,
		mFim]		
}

//grava uma array temporária com os dados de 1 elemendo do BdAgenda
function gravaTempBD(indice){
		var nomeAtivi = bdAgenda[indice].nome;	
		var hInicio =  bdAgenda[indice].inicio.hora;
		var mInicio = bdAgenda[indice].inicio.minuto;
		var hFim = bdAgenda[indice].fim.hora
		var mFim = bdAgenda[indice].fim.minuto;
				
		//cria variável no formato para ser incluído no Bd
		bdTemp = [
		nomeAtivi,
		hInicio,
		mInicio,			
		hFim,
		mFim]		
}

//carrega o formulário com os dados temporários guardado.
function carregaTemp(indice){
		if (bdTemp.length > 0){
			
			document.getElementById('ativNome-'+indice).value = bdTemp[0];
			document.getElementById('hAtivInicio-'+indice).value = bdTemp[1];
			document.getElementById('mAtivInicio-'+indice).value = bdTemp[2];
			document.getElementById('hAtivFim-'+indice).value = bdTemp[3];
			document.getElementById('mAtivFim-'+indice).value = bdTemp[4];
		}
}

//verifica se atividade não excede o tempo máximo.
function maxtemp (indice){
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
		var tInicio =  hInicio * 60 + mInicio; //tempo em minutos
		var tFim = hFim * 60 + mFim;	//tempo em ninutos
	
	if (tFim- tInicio > 120){//atividaed ultrapassa 2h
		alert("Atividade não pode exceder 2 horas");
		gravaTemp(indice);
		
		return false; // retorna zero para falso (ERRO)
	} else {
		return true;
	}
	
}//fim da função max2h

//verifica se atividade não não é menor que o tempo mínimo.
function mintemp(indice){
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
		var tInicio =  hInicio * 60 + mInicio; //tempo em minutos
		var tFim = hFim * 60 + mFim;	//tempo em ninutos
	
	if (tFim- tInicio < 30){//atividaed tem que tempo superia a 30 min
		alert("Atividade deve ter no mínimo 30 min");
		gravaTemp(indice);		
		
		return false; // retorna zero para falso (ERRO)
	} else {
		return true;
	}
	
}// fim da função min temp.
	
//Função para exibir tabela da agenda:
function ExibeAgenda() {
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
							 
							  <td class="align-middle"><b>${bdAgenda[i].nome}</b></td>
							  <td>${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].inicio.hora) } : ${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].inicio.minuto)}</td>
							  <td>${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].fim.hora) } : ${new Intl.NumberFormat('en-IN', { minimumIntegerDigits: 2 }).format(bdAgenda[i].fim.minuto)}</td>
							 </th>
						</tr>
						<tr>
							
							<td class="align-middle"> 
							
								<form>
														
								 <input type="range" id = "statusbar${i}" name = "${i}" min = "0" max = "100" step = "1" value = "${bdAgenda[i].progress}" oninput = "frameRange(${i})">
								</form>
							
							</td>
							
							<td colspan="3">
								<div class = "btn-group">
									<button type="button" class="btn btn-outline-secondary">
										<span id = "btn-play-${i}" name = "${i}">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
												<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
											</svg>
										</span>
									
									<button type="button" class="btn btn-outline-secondary" onclick = frameExc(${i})>
										<span id = "btn-exc-${i}" name = "${i}">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
											  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
											</svg>
										</span>
									</button>
									
										
									<button type="button" class="btn btn-outline-secondary" onclick = altFrame(${i})>
										<span id = "btn-alt-${i}" name = "${i}">
											<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
											  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
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
function incluir (indice, arrayTemp){
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
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
		arrayTemp[arrayTemp.length] = tempItem;
}//fim da função incluir

//função para ordenar o lista de avtividades (bubble sort).
function ordenar(arrayTemp1){
	var bdSize = arrayTemp1.length;
	
	if (bdSize > 0) {		
		for (var i = 1; i < bdSize; i++){
			for (var j = 0; j < bdSize - 1; j++){
				if (arrayTemp1[j].inicio.tempo > arrayTemp1[j+1].inicio.tempo){
					var hold = arrayTemp1[j];
					arrayTemp1[j] = arrayTemp1[j+1];
					arrayTemp1[j+1] = hold;					
				}
			}			
		}	
	}	
}// fim da função ordenar.


//função exibe botão de confirmar (só exibe qdo todos os dados estão preenchidos)
function exibeConfirma(indice){
		var addConfi = document.getElementById('btConf-'+indice);
	
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
		
		if (nomeAtivi == "" || hInicio == "-1" || mInicio == "-1" || hFim == "-1" || mFim == "-1"){
			addConfi.disabled = true;		
			
		}
		else {
			addConfi.disabled = false;
				
		}
}//fim da função exibeConfirma

//função valida tempo repetido
function validatemp(indice, bdAgenda){
	
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
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
function dadovazio(indice){
		
		var nomeAtivi = document.getElementById('ativNome-'+indice).value;	
		var hInicio =  parseInt(document.getElementById('hAtivInicio-'+indice).value);
		var mInicio = parseInt(document.getElementById('mAtivInicio-'+indice).value);
		var hFim = parseInt(document.getElementById('hAtivFim-'+indice).value);
		var mFim = parseInt(document.getElementById('mAtivFim-'+indice).value);
		
		if (nomeAtivi == "" || hInicio == "-1" ||  mInicio == "-1" || hFim == "-1" || mFim == "-1"){
			alert("Favor preencher todos os dados");
			return false;			
		} else {
			return true;
			}//fim do else
}// fim da função dadovazio

//função para exibir frame para exclusão
function frameExc(element) {
	var tdBOX = document.getElementById("interation-table-"+element);
	
	tdBOX.hidden = false;
	
	tdBOX.innerHTML = `
							<td colspan = "4">
							
							<button type="reset" id="btConfExc-${element}" class="btn btn-secondary" onclick = "excluir(${element})"> Confirmar Exclusão</button>				
							<button type="reset" id="btCancExc-${element}" class="btn btn-secondary" onclick = "cancAlt(${element})"> Cancelar</button>				
						
							</td>
						
						`;
}

//função para excluir item da agenda.
function excluir(element){
	bdAgenda.splice(element, 1);	
	localStorage.setItem("bdAgenda", JSON.stringify(bdAgenda));
	ExibeAgenda ();	
}

//função para exibir frame de alteração
function altFrame(indice) {

	var tdBOX = document.getElementById("interation-table-"+indice);
	
	tdBOX.hidden = false;
	
	tdBOX.innerHTML = `
				<td colspan = "4">
					
					<p><label for="ativNome-${indice}">Atividade:</label>
					<input type = "text" id="ativNome-${indice}" step="2"  maxlength="30" required oninput = "exibeConfirma(${indice})"></p>									
				
			
				
					<p><label for="hAtivInicio-${indice}">Hora Inicio: </label>
					<select name="Hora Inicio" id="hAtivInicio-${indice}" required onchange = "exibeConfirma(${indice})">
					 <option value= -1>-</option>
					 <option value= 0 >0</option>
					 <option value= 1 >1</option>
					 <option value= 2 >2</option>
					 <option value= 3 >3</option>
					 <option value= 4 >4</option>
					 <option value= 5 >5</option>
					 <option value= 6 >6</option>
					 <option value= 7 >7</option>
					 <option value= 8 >8</option>
					 <option value= 9 >9</option>
					 <option value= 10 >10</option>
					 <option value= 11 >11</option>
					 <option value= 12 >12</option>
					 <option value= 13 >13</option>
					 <option value= 14 >14</option>
					 <option value= 15 >15</option>
					 <option value= 16 >16</option>
					 <option value= 17 >17</option>
					 <option value= 18 >18</option>
					 <option value= 19 >19</option>
					 <option value= 20 >20</option>
					 <option value= 21 >21</option>
					 <option value= 22 >22</option>
					 <option value= 23 >23</option>
					 <option value= 24 >24</option>	
					</select>
					
					<label for="mAtivInicio-${indice}">Minuto Inicio:	</label>
					<select name="Minuto Inicio" id="mAtivInicio-${indice}" required onchange = "exibeConfirma(${indice})">
					 <option value= -1 >-</option>
					 <option value= 0 >0</option>
					 <option value= 1 >1</option>
					 <option value= 2 >2</option>
					 <option value= 3 >3</option>
					 <option value= 4 >4</option>
					 <option value= 5 >5</option>
					 <option value= 6 >6</option>
					 <option value= 7 >7</option>
					 <option value= 8 >8</option>
					 <option value= 9 >9</option>
					 <option value= 10 >10</option>
					 <option value= 11 >11</option>
					 <option value= 12 >12</option>									 
					 <option value= 13 >13</option>
					 <option value= 14 >14</option>
					 <option value= 15 >15</option>
					 <option value= 16 >16</option>
					 <option value= 17 >17</option>
					 <option value= 18 >18</option>
					 <option value= 19 >19</option>
					 <option value= 20 >20</option>
					 <option value= 21 >21</option>
					 <option value= 22 >22</option>
					 <option value= 23 >23</option>
					 <option value= 24 >24</option>
					 <option value= 25 >25</option>
					 <option value= 26 >26</option>
					 <option value= 27 >27</option>
					 <option value= 28 >28</option>
					 <option value= 29 >29</option>
					 <option value= 30 >30</option>
					 <option value= 31 >31</option>
					 <option value= 32 >32</option>
					 <option value= 33 >33</option>
					 <option value= 34 >34</option>
					 <option value= 35 >35</option>
					 <option value= 36 >36</option>
					 <option value= 37 >37</option>
					 <option value= 38 >38</option>
					 <option value= 39 >39</option>
					 <option value= 40 >40</option>
					 <option value= 41 >41</option>
					 <option value= 42 >42</option>
					 <option value= 43 >43</option>
					 <option value= 44 >44</option>
					 <option value= 45 >45</option>
					 <option value= 46 >46</option>
					 <option value= 47 >47</option>
					 <option value= 48 >48</option>
					 <option value= 49 >49</option>
					 <option value= 50 >50</option>
					 <option value= 51 >51</option>
					 <option value= 52 >52</option>
					 <option value= 53 >53</option>
					 <option value= 54 >54</option>
					 <option value= 55 >55</option>
					 <option value= 56 >56</option>
					 <option value= 57 >57</option>
					 <option value= 58 >58</option>
					 <option value= 59 >59</option>
					</select>																	
					</p>
				
	
				
					<label for="hAtivFim-${indice}">Hora Fim: </label>
					<select name="Hora Fim" id="hAtivFim-${indice}" required onchange = "exibeConfirma(${indice})">
					  <option value= -1 >-</option>		
					 <option value= 0 >0</option>
					 <option value= 1 >1</option>
					 <option value= 2 >2</option>
					 <option value= 3 >3</option>
					 <option value= 4 >4</option>
					 <option value= 5 >5</option>
					 <option value= 6 >6</option>
					 <option value= 7 >7</option>
					 <option value= 8 >8</option>
					 <option value= 9 >9</option>
					 <option value= 10 >10</option>
					 <option value= 11 >11</option>
					 <option value= 12 >12</option>
					 <option value= 13 >13</option>
					 <option value= 14 >14</option>
					 <option value= 15 >15</option>
					 <option value= 16 >16</option>
					 <option value= 17 >17</option>
					 <option value= 18 >18</option>
					 <option value= 19 >19</option>
					 <option value= 20 >20</option>
					 <option value= 21 >21</option>
					 <option value= 22 >22</option>
					 <option value= 23 >23</option>
					 <option value= 24 >24</option>		 
					</select>
					
					<label for="mAtivFim-${indice}">Minuto Fim: </label>
					<select name="Minuto Fim" id="mAtivFim-${indice}" required onchange = "exibeConfirma(${indice})">
					  <option value= -1 >-</option>	
					 <option value= 0 >0</option>
					 <option value= 1 >1</option>
					 <option value= 2 >2</option>
					 <option value= 3 >3</option>
					 <option value= 4 >4</option>
					 <option value= 5 >5</option>
					 <option value= 6 >6</option>
					 <option value= 7 >7</option>
					 <option value= 8 >8</option>
					 <option value= 9 >9</option>
					 <option value= 10 >10</option>
					 <option value= 11 >11</option>
					 <option value= 12 >12</option>									 
					 <option value= 13 >13</option>
					 <option value= 14 >14</option>
					 <option value= 15 >15</option>
					 <option value= 16 >16</option>
					 <option value= 17 >17</option>
					 <option value= 18 >18</option>
					 <option value= 19 >19</option>
					 <option value= 20 >20</option>
					 <option value= 21 >21</option>
					 <option value= 22 >22</option>
					 <option value= 23 >23</option>
					 <option value= 24 >24</option>
					 <option value= 25 >25</option>
					 <option value= 26 >26</option>
					 <option value= 27 >27</option>
					 <option value= 28 >28</option>
					 <option value= 29 >29</option>
					 <option value= 30 >30</option>
					 <option value= 31 >31</option>
					 <option value= 32 >32</option>
					 <option value= 33 >33</option>
					 <option value= 34 >34</option>
					 <option value= 35 >35</option>
					 <option value= 36 >36</option>
					 <option value= 37 >37</option>
					 <option value= 38 >38</option>
					 <option value= 39 >39</option>
					 <option value= 40 >40</option>
					 <option value= 41 >41</option>
					 <option value= 42 >42</option>
					 <option value= 43 >43</option>
					 <option value= 44 >44</option>
					 <option value= 45 >45</option>
					 <option value= 46 >46</option>
					 <option value= 47 >47</option>
					 <option value= 48 >48</option>
					 <option value= 49 >49</option>
					 <option value= 50 >50</option>
					 <option value= 51 >51</option>
					 <option value= 52 >52</option>
					 <option value= 53 >53</option>
					 <option value= 54 >54</option>
					 <option value= 55 >55</option>
					 <option value= 56 >56</option>
					 <option value= 57 >57</option>
					 <option value= 58 >58</option>
					 <option value= 59 >59</option>
					</select>																	
					</p>
		
					<button type="reset" id="btConf-${indice}" class="btn btn-secondary" disabled onclick = "altera(${indice})" >Confirmar Alteração</button>				
					
					<button type="reset" id="btCanc-${indice}" class="btn btn-secondary" onclick = "cancAlt(${indice})">Cancelar</button>				
					</form>
				
				</td>						
						`;
		gravaTempBD(indice);				
		carregaTemp(indice);
		bdTemp = [];
}

//função para gravar alteração.
function altera(indice){
	var altBD =[];
	
	//faz uma cópía do banco de dados
	for (var i = 0; i < bdAgenda.length; i++){
		altBD[i] = bdAgenda[i];
	}
	
	var altEle = altBD.splice(indice, 1);
	var tdBOX = document.getElementById("interation-table-"+indice);
	
	//se não existir nenhum erro.
	if (dadovazio(indice) && maxtemp(indice) && mintemp(indice) && validatemp(indice, altBD)){
		bdAgenda.splice(indice, 1); // excui o elemento sem alteração.
		incluir(indice,bdAgenda);//faz a inclusão dos dados alterados.
		alert("Inclusão de dados realizada");
		ordenar(bdAgenda); // ordena		
		localStorage.setItem("bdAgenda", JSON.stringify(bdAgenda)); // grava no local storage
		bdTemp = []; //reinicia a arrey temporária.
		tdBOX.innerHTML = "";
	} else{
		bdTemp = [];
		tdBOX.innerHTML = "";
	}
	
	ExibeAgenda();	
}

//função para os botões cancelar.
function cancAlt(indice){
	var tdBOX = document.getElementById("interation-table-"+indice);
	tdBOX.innerHTML = "";
	bdTemp = [];
	tdBOX.hidden = true;
}

//exibir frame de interação na mudança do range.
function frameRange(indice){

	var tdBOX = document.getElementById("interation-table-"+indice);
	
	tdBOX.hidden = false;
	
	tdBOX.innerHTML = `
		<td colspan = "4">
			<button type="reset" id="btConfRange-${indice}" class="btn btn-secondary" onclick = "mudaRange(${indice}, bdAgenda)">Gravar progresso</button>				
			<button type="reset" id="btCancRange-${indice}" class="btn btn-secondary" onclick = "cancRange(${indice}, bdAgenda)"> Cancelar</button>
		</td>						
						`;	
}

//grava qdo o usuário mudar o range na agenda
function mudaRange(indice, bdAgenda){
	var tdBOX = document.getElementById("interation-table-"+indice);
	var newrange = document.getElementById("statusbar"+indice).value;
	
	bdAgenda[indice].progress = newrange;
	localStorage.setItem("bdAgenda", JSON.stringify(bdAgenda)); // grava no local storage
	tdBOX.innerHTML = "";
	tdBOX.hidden = true;
}

//cancela a mudança do range e carrega valor original.
function cancRange (indice, bdAgenda){
	document.getElementById("statusbar"+indice).value = bdAgenda[indice].progress;	
	cancAlt(indice);
}

//=================================================================================
//Relógio temporário

//função timer (Protótipo)
var tempoEmMinutos = 25;
var expiracao = new  Date(new Date().getTime() + tempoEmMinutos * 60000);


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

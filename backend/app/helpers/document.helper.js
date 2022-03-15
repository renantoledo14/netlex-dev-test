module.exports = {
	wordFrequency: function (doc, word) {
		try {
			const palavras = this.stringToWordsArray(doc);
			const frequency = palavras.filter((value) => {
				return value.toLowerCase() === word.toLowerCase();
			});
			return !!frequency ? frequency.length : 0;
		} catch (error) {
			throw new Error(error);
		}
	},

	wordSentences: function (doc, word) {
		try {
			const palavras = this.stringToWordsArray(doc);
			const frequency = palavras.filter((value) => {
				return value.toLowerCase() === word.toLowerCase();
			});

			const texto = doc.split('')

			var frases = [];
			var frase = '';
			var testeComeco = false;

			texto.forEach((caracter) => {
				
				if (caracter.match(/[A-Z]/g)) 
					testeComeco = true;
				
				if (testeComeco === true){
					if (caracter.match(/[.:;\r\n]/gim)){
						frase += caracter;
						frases.push(frase);

						testeComeco = false;
						frase = '';
					}
					else {
						frase += caracter;
					}	
				}
			});
			if (!!frequency && frequency.length > 0){
				const wordRegEx = new RegExp(word,'gim')
				frases = frases.filter((frase) => {
					return frase.match(wordRegEx);
				});
	
				return !!frases ? frases : false;
			}
			else {
				return false;
			}
		} catch (error) {
			throw new Error(error);
		}
	},

	topWords: function (doc, count, minWordLength) {
		try {
			const palavras = this.stringToWordsArray(doc);
			var lista = [];

			palavras.map((value, key) => {
				value = value.toLowerCase();
				if (value.length >= minWordLength) {
					const index = lista.findIndex(element => element.word === value);
					if (index !== -1)
						lista[index] = {
							"word" : value,
							"count": !!lista[index] ? lista[index].count + 1 : 1,
							"pos"  : !!lista[index] ? lista[index].pos : key
						};
					else
						lista.push({
							"word" : value,
							"count": 1,
							"pos"  : key
						});
				}
			});

			// Ordenando
			var aux = Math.floor(lista.length / 2);

			while (aux > 0) {
				for (var i = aux; i < lista.length; i++) {
					var temp = lista[i];
					var x = i;
	
					while (x >= aux && 
										parseFloat(lista[x - aux].count + '.' + lista[x - aux].pos) < 
										parseFloat(temp.count + '.' + temp.pos)
					) {
						lista[x] = lista[x - aux];
						x -= aux;
					}
					lista[x] = temp;
				}
				aux = Math.floor(aux / 2);
			}

			lista = lista.slice(0, count);//retorna a quantidade de selecionada

			lista.map((value, index) => {//retiro a propriedade pos usa para ordenar
				delete value.pos;
			});
			
			return lista;
			
		} catch (error) {
			throw new Error(error);
		}
	},

	stringToWordsArray: function (text) {
		return text.match(/[a-zÀ-ú]+/gimu);
	}
}


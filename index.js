const fs = require('fs'), prompt = require('prompt-sync')();
let vars = {}, currentVarType = ""
let translations = JSON.parse(fs.readFileSync("translations.json", "utf-8"));

function shell() {
	var a = prompt('>>> ')
	if (a.indexOf(translations.murcav) !== -1) {
		if (a.indexOf(translations.compile) !== -1) {
			compile(fs.readFileSync(a.slice(9)+'.mch', 'utf-8'))
		}
	}
}

function compile(input){
	input.split(";").forEach((l=>{
		// Check for variable instantiation
		if (l.indexOf("var") !== -1) {
			currentVarType = l.slice(l.indexOf(translations.var)+4, l.indexOf(translations.var)+7);
			vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)] = {
				type: currentVarType,
				value: "nil"
			}
			if (vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)].type == translations.str) {
				vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)].value = l.split("\"")[1]
			} else if (vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)].type == translations.int) {
				vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)].value = Number(l.split("\\")[1])
			} else if (vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)].type == translations.dec) {
				vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)].value = Number(l.split("\\")[1])
			}
			console.dir(vars)
		}
		// Const variables
		if (l.indexOf(translations.const) !== -1) {
			currentVarType = l.slice(l.indexOf(translations.const)+6, l.indexOf(translations.const)+9);
			vars[l.slice(l.indexOf(translations.const)+8,l.indexOf("=")-1)] = {
				type: currentVarType,
				value: translations.nil
			}
			if (vars[l.slice(l.indexOf(translations.const)+8,l.indexOf("=")-1)].type == translations.str) {
				vars[l.slice(l.indexOf(translations.const)+8,l.indexOf("=")-1)].value = l.split("\"")[1]
			} else if (vars[l.slice(l.indexOf(translations.const)+8,l.indexOf("=")-1)].type == translations.int) {
				vars[l.slice(l.indexOf(translations.const)+8,l.indexOf("=")-1)].value = Number(l.split("\\")[1])
			} else if (vars[l.slice(l.indexOf(translations.const)+8,l.indexOf("=")-1)].type == translations.dec) {
				vars[l.slice(l.indexOf(translations.const)+8,l.indexOf("=")-1)].value = Number(l.split("\\")[1])
			}
			// REMOVE AFTER ALPHA
			console.dir(vars)
		}
		// Print statements
		if (l.indexOf(translations.print) !== -1) {
			if (l.indexOf("\"") !== -1) {
				console.log(l.split("\"")[1])
			} 
			else if (l.indexOf("\\") !== -1) {
				console.log(Number(l.split("\\")[1]))
			} 
			else if (l.indexOf("$") !== -1 && vars["c:" + l.slice(l.indexOf("$")+1)] == undefined) {
				console.log(vars[l.slice(l.indexOf("$")+1)].value)
			} 
			else if (l.indexOf("$") !== -1 && vars["c:" + l.slice(l.indexOf("$")+1)] !== undefined) {
				console.log(vars["c:" + l.slice(l.indexOf("$")+1)].value)
			}
		}
		// VARIABLE CHANGING
		if (l.indexOf("$") !== -1 && l.indexOf("=") !== -1) {
			currentVarType = l.slice(l.indexOf(translations.var)+4, l.indexOf(translations.var)+7);
			vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)] = {
				type: currentVarType,
				value: "nil"
			}
			if (vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)].type == translations.str) {
				vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)].value = l.split("\"")[1]
			} else if (vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)].type == translations.int) {
				vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)].value = Number(l.split("\\")[1])
			} else if (vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)].type == translations.dec) {
				vars[l.slice(l.indexOf(translations.var)+8,l.indexOf("=")-1)].value = Number(l.split("\\")[1])
			}
			console.dir(vars)
		}
	}))
}

function run(file) {
	
}

shell()
/*
Deixa a primeira letra de uma palavra em maiusculo
exemplo -> Exemplo
*/

const captalizeFirstLetter = string => {
    return string[0].toUpperCase()+ string.slice(1)
}

export default captalizeFirstLetter
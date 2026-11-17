var UtilsTools = UtilsTools || {};

UtilsTools.generateUniqueRandomNumbers = function(quantity, maxValue, minValue) {
    var numbers = [];

    if (minValue == null) {
        minValue = 1;
    }

    if (quantity > maxValue) {
        throw new Error("La quantitat de nombres no pot superar el rang disponible.");
    }

    while (numbers.length < quantity) {
        var random = Math.floor(Math.random() * maxValue) + minValue;
        var isUnique = true;

        for (var i = 0; i < numbers.length; i++) {
            if (numbers[i] === random) {
                isUnique = false;
                break;
            }
        }

        if (isUnique) {
            numbers.push(random);
        }
    }

    return numbers;
}
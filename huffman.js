var freequency = function(str)
{
    var freq = {}
    for( ch in str)
    {
        if(freq[str[ch]] == undefined){
        freq[str[ch]] = 1;}
        else{
        freq[str[ch]]++;}       
    }
    return(freq)
}


var sortFreq = function(freq)
{
    tuples = []
    for( key in freq){
    tuples.push([freq[key],key])}
    return tuples.sort()

}

var buildTree = function(tuples)
{   
    while(tuples.length > 1)
    {
    var leastTwo = [tuples[0],tuples[1]];
    var theRest = tuples.slice(2,tuples.length);
    var combFreq = leastTwo[0][0] + leastTwo[1][0];
    tuples = theRest;
    tuples.push([combFreq, leastTwo]);
    tuples.sort();
    }
    return tuples
}

var trimTree = function(tuples)
{
    return tuples[0][1];
}

    
freq = freequency('nitheesh');
//console.log(freq);
s=sortFreq(freq)
b=buildTree(s);
console.log(trimTree(b))

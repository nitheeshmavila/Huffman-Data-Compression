// Huffman data compression


var codes = {};
var freequency = function(str){
// str is a string, this function creates a dict with character in str as keys and  population count of that character in str as values 

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


var sortFreq = function(freq){
// This function convert the dict in to list  of key value pair and  sort the list

        tuples = []
                for( key in freq){
                        tuples.push(Array(freq[key],key))}
        return tuples.sort()

}

var buildTree = function(tuples){
//buiding a tree using the list of key, value pairs.   

        while(tuples.length > 1)
        {
                var leastTwo = tuples.slice(0,2);
         //       console.log(leastTwo);
                var theRest = tuples.slice(2,tuples.length);
                var combFreq = leastTwo[0][0] + leastTwo[1][0];
                tuples = theRest;
                tuples.push(Array(combFreq, leastTwo));
                tuples.sort();
        }
        return tuples[0];
}

var trimTree = function(tree){
// It will remove  population count

       // console.log(tree[1]);
        var t = tree[1]
                if(typeof t == 'string'){
                        return t;}
                else
                        return Array(trimTree(t[0]), trimTree(t[1]))

}

var assignCodes = function(node, pat){
// assigning codes to each letter

      if(typeof node == 'string'){
        codes[node] = pat;}
      else{
        assignCodes(node[0],pat+"0");
        assignCodes(node[1],pat+"1");
        }
      return codes;        
}


var encode = function(str){
// encoding the whole string

    var output ='';
    
    for(ch in str){
        //console.log(ch);
        output = output + codes[str[ch]];
    }
    return output;
}

var decode = function(tree, code){
 // decoding the code in to string
    var str = ''
    var t = tree;
    for(bit in code){
        if(code[bit] == '0'){
            t = t[0];
        }
        else{
            t = t[1];
        }
        if(typeof t == 'string'){
            str = str + t;
           t = tree;
        }
      }
    return str;
}
                  
var tree =buildTree(sortFreq(freequency('nitheesh')));
var stripTree = trimTree(tree);
assignCodes(stripTree, '');
console.log(codes);
var code = encode('nitheesh');
var str = decode(stripTree,code);
if('nitheesh' == str){
    console.log('restored matched original');
}

function renderEmailLinks(){
    const allElements = document.getElementsByClassName("eml-protected");   
    for (let element of allElements) {
       try{ 
           updateAnchor(element);
        }
        catch(exception){}
    }
}


function decode(encodedString) {  
    let decodedEmail = '';
    try{
        if(typeof encodedString == 'string') {
            let email = ""; 
            let keyInHex = encodedString.substring(0, 2);
            const key = parseInt(keyInHex, 16);
            for (let n = 2; n < encodedString.length; n += 2) {
                let charInHex = encodedString.substring(n, n+2)
                let char = parseInt(charInHex, 16);
                let output = char ^ key;
                email += String.fromCharCode(output);
            }
            decodedEmail =  email;
        }  
    }catch(exception){
        decodedEmail = "";
    }

    return decodedEmail;    
}

function pad(value){
    return value.length === 1  ? '0' + value: value;
}

function updateAnchor(el) {    
    if(el.tagName === 'A'){
        const decoded = decode(el.innerHTML);  
        el.textContent = decoded;
        el.href = 'mailTo:'+decoded+'?subject=Contact Theta'; 
    } 
}

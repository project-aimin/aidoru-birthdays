function toggleVisiblities(id_element,display_type){
 var eTarget = document.getElementById(id_element);
 if(eTarget.style.display != "none"){eTarget.style.display = "none";}
 else{eTarget.style.display = display_type;}
}

function openMailAddr(elem){
 var mailaddr = elem.dataset.name +"@"+ elem.dataset.domain +"."+ elem.dataset.tld;
 window.location.href = "mailto:"+ mailaddr;
 return;
}
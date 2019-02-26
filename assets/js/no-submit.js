function noSubmit(key){
    if(key == 13){
        return (!window.event && window.event.keyCode == 13);
    } else {
        return;
    }
}
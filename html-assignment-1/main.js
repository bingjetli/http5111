//The button of the sidebar
const le_bouton_du_encadre = document.getElementById('sidebar-button');
//The sidebar
const le_encadre = document.getElementById('sidebar');
let cest_visible = false;

le_bouton_du_encadre.onclick = e => {
    if(cest_visible){
        le_encadre.style = 'display:none;';
        cest_visible = false;
    }
    else{
        le_encadre.style = 'display:initial;';
        cest_visible = true;
    }
};
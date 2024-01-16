const validate = ({name, lastname, nationality, image, birthdate, description, team}) => {
    let errors = {}
    let regexNotNumbers = /([0-9])+/;
    let regexImg= (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);

    if(!name){
        errors.name = 'Por favor, ingrese un nombre'
    }else if(name.length > 40 || name.length < 2){
        errors.name = 'El nombre debe contener mas de 2 caracteres y menos de 40'
    }else if(regexNotNumbers.test(name.trim())){
        errors.name = 'No se permiten números'
    }

    if(!lastname){
        errors.lastname = 'Por favor, ingrese un apellido'
    }else if(lastname.length < 2 || lastname.length > 40 ){
        errors.lastname = 'El apellido debe contener mas de 2 caracteres y menos de 40'
    }else if(regexNotNumbers.test(name.trim())){
        errors.lastname = 'No se permiten números'
    }

    if(!nationality){
        errors.nationality = 'Por favor, ingrese una nacionalidad'
    }

    if (!image) {
        errors.image= "Por favor, inserta una imagen"
    } else if (!regexImg.test(image.trim())) {
        errors.image= "Por favor, ingrese un formato válido"
    }

    if(!birthdate){
        errors.birthdate = 'Por favor, ingrese una fecha de nacimiento'
    }


    if(!description){
        errors.description = 'Por favor, ingrese una descripción'
    }else if(description.trim().length < 10) {
        errors.description = 'La descripción debe contener al menos 10 caracteres'
    }

    if(team === null){
        errors.team = 'Por favor, seleccione al menos un equipo'
    }



    return errors
}




export default validate
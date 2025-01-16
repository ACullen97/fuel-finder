export const validateLocation = (input) => {
    const locationReg = /^[a-zA-Z0-9 \s,'-]+$/; //allows for towns, cities and postcode

    if(!input.trim()){
        return 'Please enter a valid location';
    }

    if(!locationReg.test(input)){
        return 'There are invalid characters in location. (only, letters, spaces, hyphens & commas are allowed.';
    }

    return null;
}
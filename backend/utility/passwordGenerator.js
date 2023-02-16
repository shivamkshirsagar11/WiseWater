import generator from "generate-password";

export function passwordGen( len ) {
    var password = generator.generate({
        length: len,
        numbers: true,
        lowercase: true,
        uppercase: true,
        excludeSimilarCharacters: true,
        strict:true
    });
    return password;
}